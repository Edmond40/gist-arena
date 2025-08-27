import { Router } from 'express';
import { z } from 'zod';
import { authRequired, requireRole } from '../../middleware/auth.js';
import { createPost, deletePost, getPost, listPosts, updatePost, incrementViews, incrementShare } from '../../services/post.service.js';
import { sendEvent } from '../../lib/events.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const querySchema = z.object({
      published: z.enum(['true','false']).optional(),
      isTrending: z.enum(['true','false']).optional(),
      sortBy: z.enum(['createdAt','trendingScore','viewCount','shareCount','publishedAt']).optional(),
      order: z.enum(['asc','desc']).optional(),
    });
    const q = querySchema.parse(req.query);
    const published = q.published === undefined ? undefined : q.published === 'true';
    const isTrending = q.isTrending === undefined ? undefined : q.isTrending === 'true';
    const sortBy = q.sortBy || 'createdAt';
    const order = q.order || 'desc';
    const posts = await listPosts({ published, isTrending, sortBy, order });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const post = await getPost(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

const upsertSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  categoryId: z.number().int().optional().nullable(),
  tagIds: z.array(z.number().int()).optional(),
  published: z.boolean().optional(),
  summary: z.string().optional().nullable(),
  heroImageUrl: z.string().min(1).optional().nullable(),
  minutesRead: z.number().int().optional().nullable(),
  publishedAt: z.coerce.date().optional().nullable(),
  isTrending: z.boolean().optional(),
  trendingScore: z.number().int().optional(),
});

router.post('/', authRequired, async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body);
    const post = await createPost(req.user.id, data);
    if (post.published) {
      // notify clients that a new post is live
      sendEvent('post_published', { postId: post.id, title: post.title });
    }
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authRequired, async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const data = upsertSchema.partial().parse(req.body);
    // check previous publish state to detect publish transitions
    const before = await getPost(id);
    const post = await updatePost(id, data);
    if (before && before.published === false && post.published === true) {
      sendEvent('post_published', { postId: id, title: post.title });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    await deletePost(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.post('/:id/views', async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const count = await incrementViews(id);
    res.json({ viewCount: count });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/share', async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const count = await incrementShare(id);
    // notify admins in real-time
    sendEvent('share', { postId: id });
    res.json({ shareCount: count });
  } catch (err) {
    next(err);
  }
});

export default router;
