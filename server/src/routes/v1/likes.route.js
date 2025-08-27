import { Router } from 'express';
import { z } from 'zod';
import { authRequired } from '../../middleware/auth.js';
import { countLikes, likePost, unlikePost } from '../../services/like.service.js';
import { sendEvent } from '../../lib/events.js';

const router = Router();

router.get('/:postId/count', async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    const count = await countLikes(postId);
    res.json({ postId, count });
  } catch (err) {
    next(err);
  }
});

router.post('/:postId', authRequired, async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    const like = await likePost(req.user.id, postId);
    // notify admins in real-time
    sendEvent('like', { postId, userId: req.user.id });
    res.status(201).json(like);
  } catch (err) {
    // if already liked, Prisma will throw due to PK; return 409
    if (err.code === 'P2002') return res.status(409).json({ message: 'Already liked' });
    next(err);
  }
});

router.delete('/:postId', authRequired, async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    await unlikePost(req.user.id, postId);
    // notify admins
    sendEvent('unlike', { postId, userId: req.user.id });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
