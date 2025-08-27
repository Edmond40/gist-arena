/* eslint-env node */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

export async function register({ email, name, password, adminCode }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 400 });
  const passwordHash = await bcrypt.hash(password, 10);
  const role = adminCode && process.env.ADMIN_AUTH_CODE && adminCode === process.env.ADMIN_AUTH_CODE
    ? 'ADMIN'
    : 'USER';
  const user = await prisma.user.create({
    data: { email, name, passwordHash, role },
    select: { id: true, email: true, name: true, role: true }
  });
  return user;
}

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}
