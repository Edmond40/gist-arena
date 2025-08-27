import { Router } from 'express';
import { z } from 'zod';
import { authRequired } from '../../middleware/auth.js';
import { bookmarkPost, unbookmarkPost, listUserBookmarks } from '../../services/bookmark.service.js';
import { sendEvent } from '../../lib/events.js';

const router = Router();

// List current user's bookmarks
router.get('/', authRequired, async (req, res, next) => {
  try {
    const list = await listUserBookmarks(req.user.id);
    res.json(list);
  } catch (err) { next(err); }
});

// Bookmark a post
router.post('/:postId', authRequired, async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    const b = await bookmarkPost(req.user.id, postId);
    // notify admins
    sendEvent('bookmark', { postId, userId: req.user.id });
    res.status(201).json(b);
  } catch (err) { next(err); }
});

// Remove bookmark
router.delete('/:postId', authRequired, async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    await unbookmarkPost(req.user.id, postId);
    // notify admins
    sendEvent('unbookmark', { postId, userId: req.user.id });
    res.status(204).send();
  } catch (err) { next(err); }
});

export default router;
