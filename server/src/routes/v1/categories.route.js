import { Router } from 'express';
import { z } from 'zod';
import { authRequired, requireRole } from '../../middleware/auth.js';
import { createCategory, deleteCategory, listCategories, updateCategory } from '../../services/category.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const cats = await listCategories();
    res.json(cats);
  } catch (err) {
    next(err);
  }
});

const upsertSchema = z.object({ name: z.string().min(1) });

router.post('/', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body);
    const cat = await createCategory(data);
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const data = upsertSchema.partial().parse(req.body);
    const cat = await updateCategory(id, data);
    res.json(cat);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    await deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
