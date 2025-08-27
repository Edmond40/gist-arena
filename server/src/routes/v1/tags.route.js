import { Router } from 'express';
import { z } from 'zod';
import { authRequired, requireRole } from '../../middleware/auth.js';
import { createTag, deleteTag, listTags } from '../../services/tag.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const tags = await listTags();
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

const upsertSchema = z.object({ name: z.string().min(1) });

router.post('/', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body);
    const tag = await createTag(data);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    await deleteTag(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
