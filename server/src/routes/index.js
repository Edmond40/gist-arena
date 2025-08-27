import { Router } from 'express';
import healthRouter from './v1/health.route.js';
import authRouter from './v1/auth.route.js';
import usersRouter from './v1/users.route.js';
import postsRouter from './v1/posts.route.js';
import categoriesRouter from './v1/categories.route.js';
import tagsRouter from './v1/tags.route.js';
import commentsRouter from './v1/comments.route.js';
import likesRouter from './v1/likes.route.js';
import bookmarksRouter from './v1/bookmarks.route.js';
import uploadsRouter from './v1/uploads.route.js';
import metricsRouter from './v1/metrics.route.js';
import eventsRouter from './v1/events.route.js';
import publicEventsRouter from './v1/public-events.route.js';

const router = Router();

router.use('/v1/health', healthRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/users', usersRouter);
router.use('/v1/posts', postsRouter);
router.use('/v1/categories', categoriesRouter);
router.use('/v1/tags', tagsRouter);
router.use('/v1/comments', commentsRouter);
router.use('/v1/likes', likesRouter);
router.use('/v1/bookmarks', bookmarksRouter);
router.use('/v1/uploads', uploadsRouter);
router.use('/v1/metrics', metricsRouter);
router.use('/v1/events', eventsRouter);
router.use('/v1/public-events', publicEventsRouter);

export default router;
