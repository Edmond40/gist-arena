import { Router } from 'express';
import { z } from 'zod';
import { authRequired, requireRole } from '../../middleware/auth.js';
import { countRecentPosts } from '../../services/post.service.js';
import { countRecentComments } from '../../services/comment.service.js';
import { countRecentLikes } from '../../services/like.service.js';
import { countRecentBookmarks } from '../../services/bookmark.service.js';

const router = Router();

// GET /api/v1/metrics/recent?hours=24
router.get('/recent', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const hours = req.query.hours ? z.coerce.number().int().positive().parse(req.query.hours) : 24;
    const [posts, comments, likes, bookmarks] = await Promise.all([
      countRecentPosts(hours),
      countRecentComments(hours),
      countRecentLikes(hours),
      countRecentBookmarks(hours),
    ]);
    const total = posts + comments + likes + bookmarks;
    res.json({ hours, posts, comments, likes, bookmarks, total });
  } catch (err) { next(err); }
});

export default router;
