import { prisma } from '../lib/prisma.js';

export async function listComments(postId) {
  return prisma.comment.findMany({
    where: { postId: Number(postId), status: 'APPROVED' },
    orderBy: { createdAt: 'asc' },
    include: { author: { select: { id: true, name: true } } }
  });
}

export async function getComment(id) {
  return prisma.comment.findUnique({ where: { id: Number(id) }, include: { author: { select: { id: true, name: true } } } });
}

export async function addComment(userId, postId, content, guestName = null, guestEmail = null) {
  return prisma.comment.create({
    data: {
      content,
      authorId: userId ?? null,
      guestName,
      guestEmail,
      postId: Number(postId),
      // Immediately visible; admin can moderate later
      status: 'APPROVED',
    },
  });
}

export async function deleteComment(id) {
  return prisma.comment.delete({ where: { id: Number(id) } });
}

export async function addReply(userId, postId, parentId, content, guestName = null, guestEmail = null) {
  return prisma.comment.create({
    data: {
      content,
      authorId: userId ?? null,
      guestName,
      guestEmail,
      postId: Number(postId),
      parentId: Number(parentId),
      // Immediately visible; admin can moderate later
      status: 'APPROVED',
    },
  });
}

export async function updateComment(id, content) {
  return prisma.comment.update({ where: { id: Number(id) }, data: { content, editedAt: new Date() } });
}

export async function countAllComments() {
  return prisma.comment.count();
}

export async function countRecentComments(hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  return prisma.comment.count({ where: { createdAt: { gte: since } } });
}

export async function listRecentComments(limit = 10) {
  return prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    take: Number(limit),
    include: {
      author: { select: { id: true, name: true, email: true } },
      post: { select: { id: true, title: true } },
    },
  });
}

// Admin: list with filters and pagination
export async function adminListComments({ postId, status, q, page = 1, pageSize = 20, from, to }) {
  const where = {};
  if (postId) where.postId = Number(postId);
  if (status) where.status = status;
  if (from || to) where.createdAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) };
  if (q) where.content = { contains: String(q), mode: 'insensitive' };

  const take = Math.min(Math.max(Number(pageSize) || 20, 1), 100);
  const skip = (Math.max(Number(page) || 1, 1) - 1) * take;

  const [items, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
      include: {
        author: { select: { id: true, name: true, email: true } },
        post: { select: { id: true, title: true } },
        parent: { select: { id: true, content: true, createdAt: true, author: { select: { id: true, name: true } }, guestName: true } },
        replies: { select: { id: true, content: true, createdAt: true, status: true, author: { select: { id: true, name: true } }, guestName: true } },
        moderatedBy: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.comment.count({ where }),
  ]);

  return { items, page: Math.floor(skip / take) + 1, pageSize: take, total, totalPages: Math.ceil(total / take) };
}

// Admin: update status with moderation metadata
export async function adminUpdateStatus(id, status, moderatedById, reason) {
  return prisma.comment.update({
    where: { id: Number(id) },
    data: {
      status,
      moderatedById: moderatedById ?? null,
      moderatedAt: new Date(),
      moderationReason: reason ?? null,
    },
  });
}

// Admin: pin/unpin
export async function adminSetPin(id, isPinned) {
  return prisma.comment.update({ where: { id: Number(id) }, data: { isPinned: Boolean(isPinned) } });
}

// Admin: bulk actions (status or delete)
export async function adminBulkAction(ids, action, moderatedById, reason) {
  const idList = (ids || []).map((x) => Number(x)).filter(Boolean);
  if (!idList.length) return { count: 0 };

  if (action === 'DELETE') {
    const res = await prisma.comment.deleteMany({ where: { id: { in: idList } } });
    return { count: res.count };
  }

  const statusMap = { APPROVE: 'APPROVED', HIDE: 'HIDDEN', SPAM: 'SPAM' };
  const nextStatus = statusMap[action];
  if (!nextStatus) return { count: 0 };

  const res = await prisma.comment.updateMany({
    where: { id: { in: idList } },
    data: {
      status: nextStatus,
      // Note: updateMany can't set different moderatedBy per row timestamp; acceptable for bulk
      moderatedById: moderatedById ?? null,
      moderatedAt: new Date(),
      moderationReason: reason ?? null,
    },
  });
  return { count: res.count };
}

