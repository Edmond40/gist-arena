import { prisma } from '../lib/prisma.js';

export async function bookmarkPost(userId, postId) {
  return prisma.bookmark.create({
    data: { userId: Number(userId), postId: Number(postId) },
  });
}

export async function unbookmarkPost(userId, postId) {
  return prisma.bookmark.delete({
    where: { userId_postId: { userId: Number(userId), postId: Number(postId) } },
  });
}

export async function listUserBookmarks(userId) {
  return prisma.bookmark.findMany({
    where: { userId: Number(userId) },
    include: {
      post: {
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
          tags: { include: { tag: true } },
        },
      },
    },
  });
}

export async function countRecentBookmarks(hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  return prisma.bookmark.count({ where: { createdAt: { gte: since } } });
}
