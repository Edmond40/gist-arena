import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

export async function listUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });
}

export async function createUser({ email, name, password, role = 'USER' }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 400 });
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, name, passwordHash, role },
    select: { id: true, email: true, name: true, role: true }
  });
}

export async function updateUserRole(id, role) {
  return prisma.user.update({
    where: { id: Number(id) },
    data: { role },
    select: { id: true, email: true, name: true, role: true }
  });
}

export async function removeUser(id) {
  const userId = Number(id);
  // Do not allow deleting users who authored posts (to preserve content ownership)
  const postsCount = await prisma.post.count({ where: { authorId: userId } });
  if (postsCount > 0) {
    throw Object.assign(new Error('Cannot delete user who authored posts. Reassign or delete their posts first.'), { status: 400 });
  }

  // Clean up/neutralize relations that reference the user to avoid FK errors
  await prisma.$transaction(async (tx) => {
    // Remove simple join relations
    await tx.like.deleteMany({ where: { userId } });
    await tx.bookmark.deleteMany({ where: { userId } });

    // Null out optional relations on comments (author and moderator)
    await tx.comment.updateMany({ where: { authorId: userId }, data: { authorId: null } });
    await tx.comment.updateMany({ where: { moderatedById: userId }, data: { moderatedById: null } });

    // Finally delete the user
    await tx.user.delete({ where: { id: userId } });
  });
}

export async function reassignUserPosts(fromUserId, toUserId) {
  const fromId = Number(fromUserId);
  const toId = Number(toUserId);
  if (!toId || fromId === toId) {
    throw Object.assign(new Error('Invalid target user'), { status: 400 });
  }
  const target = await prisma.user.findUnique({ where: { id: toId } });
  if (!target) throw Object.assign(new Error('Target user not found'), { status: 404 });
  await prisma.post.updateMany({ where: { authorId: fromId }, data: { authorId: toId } });
  return { ok: true };
}
