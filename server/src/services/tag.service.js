import slugify from 'slugify';
import { prisma } from '../lib/prisma.js';

export async function listTags() {
  return prisma.tag.findMany({ orderBy: { name: 'asc' } });
}

export async function createTag({ name }) {
  const slug = slugify(name, { lower: true, strict: true });
  return prisma.tag.create({ data: { name, slug } });
}

export async function deleteTag(id) {
  return prisma.tag.delete({ where: { id: Number(id) } });
}
