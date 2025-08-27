import { prisma } from '../lib/prisma.js';

export async function getUsers() {
  return prisma.user.findMany();
}
