import { prisma } from '../lib/prisma.js';

export async function likePost(userId, postId) {
  return prisma.like.create({
    data: { userId: Number(userId), postId: Number(postId) }
  });
}

export async function unlikePost(userId, postId) {
  return prisma.like.delete({
    where: { userId_postId: { userId: Number(userId), postId: Number(postId) } }
  });
}

export async function countLikes(postId) {
  return prisma.like.count({ where: { postId: Number(postId) } });
}

export async function countRecentLikes(hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  return prisma.like.count({ where: { createdAt: { gte: since } } });
}
