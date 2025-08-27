import slugify from 'slugify';
import { prisma } from '../lib/prisma.js';

export async function listCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function createCategory({ name }) {
  const slug = slugify(name, { lower: true, strict: true });
  return prisma.category.create({ data: { name, slug } });
}

export async function updateCategory(id, { name }) {
  const data = {};
  if (name) {
    data.name = name;
    data.slug = slugify(name, { lower: true, strict: true });
  }
  return prisma.category.update({ where: { id: Number(id) }, data });
}

export async function deleteCategory(id) {
  return prisma.category.delete({ where: { id: Number(id) } });
}
