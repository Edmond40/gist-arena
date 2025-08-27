import { Router } from 'express';
import { z } from 'zod';
import { login, register } from '../../services/auth.service.js';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  password: z.string().min(6),
  adminCode: z.string().min(1).optional(),
});

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await register(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Admin-only registration endpoint (requires valid adminCode)
const adminRegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  password: z.string().min(6),
  adminCode: z.string().min(1),
});

router.post('/admin/register', async (req, res, next) => {
  try {
    const data = adminRegisterSchema.parse(req.body);
    const user = await register(data);
    if (user.role !== 'ADMIN') {
      return res.status(400).json({ message: 'Invalid admin code' });
    }
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await login(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
