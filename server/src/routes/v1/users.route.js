import { Router } from 'express';
import { z } from 'zod';
import { authRequired, requireRole } from '../../middleware/auth.js';
import { createUser, listUsers, removeUser, updateUserRole, reassignUserPosts } from '../../services/user.service.js';

const router = Router();

// Admin only
router.use(authRequired, requireRole('ADMIN'));

router.get('/', async (req, res, next) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'USER']).optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const data = createSchema.parse(req.body);
    const user = await createUser(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/role', async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const role = z.enum(['ADMIN', 'USER']).parse(req.body.role);
    const user = await updateUserRole(id, role);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    await removeUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.post('/:id/reassign-posts', async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const toUserId = z.coerce.number().parse(req.body.toUserId);
    const result = await reassignUserPosts(id, toUserId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
