import { prisma } from '../lib/prisma.js';
import slugify from 'slugify';

export async function listPosts({ published, isTrending, sortBy = 'createdAt', order = 'desc' } = {}) {
  const where = {
    published: published ?? undefined,
    isTrending: isTrending ?? undefined,
  };
  const orderBy = {};
  orderBy[sortBy] = order === 'asc' ? 'asc' : 'desc';
  return prisma.post.findMany({
    where,
    orderBy,
    include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } }
  });
}

export async function getPost(id) {
  return prisma.post.findUnique({ where: { id: Number(id) }, include: { author: true, category: true, tags: { include: { tag: true } }, comments: true, likes: true, media: true } });
}

export async function createPost(authorId, { title, content, categoryId, tagIds = [], published = false, summary, heroImageUrl, minutesRead, publishedAt, isTrending = false, trendingScore = 0 }) {
  const slug = slugify(title, { lower: true, strict: true });
  return prisma.post.create({
    data: {
      title,
      slug,
      content,
      published,
      authorId,
      categoryId: categoryId ?? null,
      summary: summary ?? null,
      heroImageUrl: heroImageUrl ?? null,
      minutesRead: minutesRead ?? null,
      publishedAt: published ? (publishedAt ?? new Date()) : null,
      isTrending,
      trendingScore,
      tags: { create: tagIds.map((tagId) => ({ tagId })) }
    },
  });
}

export async function updatePost(id, { title, content, categoryId, tagIds, published, summary, heroImageUrl, minutesRead, publishedAt, isTrending, trendingScore }) {
  const data = {};
  if (title) data.title = title, data.slug = slugify(title, { lower: true, strict: true });
  if (content !== undefined) data.content = content;
  if (published !== undefined) data.published = published;
  if (categoryId !== undefined) data.categoryId = categoryId;
  if (summary !== undefined) data.summary = summary;
  if (heroImageUrl !== undefined) data.heroImageUrl = heroImageUrl;
  if (minutesRead !== undefined) data.minutesRead = minutesRead;
  if (publishedAt !== undefined) data.publishedAt = publishedAt;
  if (isTrending !== undefined) data.isTrending = isTrending;
  if (trendingScore !== undefined) data.trendingScore = trendingScore;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.post.update({ where: { id: Number(id) }, data });
    if (Array.isArray(tagIds)) {
      await tx.postTag.deleteMany({ where: { postId: updated.id } });
      await tx.postTag.createMany({ data: tagIds.map((tagId) => ({ postId: updated.id, tagId })) });
    }
    return updated;
  });
}

export async function deletePost(id) {
  return prisma.post.delete({ where: { id: Number(id) } });
}

export async function incrementViews(id) {
  const p = await prisma.post.update({ where: { id: Number(id) }, data: { viewCount: { increment: 1 } } });
  return p.viewCount;
}

export async function incrementShare(id) {
  const p = await prisma.post.update({ where: { id: Number(id) }, data: { shareCount: { increment: 1 } } });
  return p.shareCount;
}

export async function countRecentPosts(hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  return prisma.post.count({ where: { createdAt: { gte: since } } });
}
