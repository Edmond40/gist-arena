import { Router } from 'express';
import { z } from 'zod';
import { authRequired, authOptional, requireRole } from '../../middleware/auth.js';
import { addComment, addReply, deleteComment, listComments, countAllComments, countRecentComments, listRecentComments, getComment, updateComment, adminListComments, adminUpdateStatus, adminSetPin, adminBulkAction } from '../../services/comment.service.js';
import { sendEvent } from '../../lib/events.js';

const router = Router();

// Total comments count
router.get('/count', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const count = await countAllComments();
    res.json({ count });
  } catch (err) { next(err); }
});

// Recent comments count (last N hours, default 24)
router.get('/recent-count', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const hours = req.query.hours ? z.coerce.number().int().positive().parse(req.query.hours) : 24;
    const count = await countRecentComments(hours);
    res.json({ hours, count });
  } catch (err) { next(err); }
});

// Recent comments list for admin dropdown
router.get('/recent', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const limit = req.query.limit ? z.coerce.number().int().positive().max(100).parse(req.query.limit) : 10;
    const list = await listRecentComments(limit);
    res.json(list);
  } catch (err) { next(err); }
});

// Admin: list with filters & pagination
router.get('/admin', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const postId = req.query.postId ? z.coerce.number().parse(req.query.postId) : undefined;
    const status = req.query.status ? z.enum(['PENDING','APPROVED','HIDDEN','SPAM']).parse(req.query.status) : undefined;
    const q = req.query.q ? z.string().parse(req.query.q) : undefined;
    const page = req.query.page ? z.coerce.number().int().positive().parse(req.query.page) : 1;
    const pageSize = req.query.pageSize ? z.coerce.number().int().positive().max(100).parse(req.query.pageSize) : 20;
    const from = req.query.from ? z.string().datetime().parse(req.query.from) : undefined;
    const to = req.query.to ? z.string().datetime().parse(req.query.to) : undefined;
    const data = await adminListComments({ postId, status, q, page, pageSize, from, to });
    res.json(data);
  } catch (err) { next(err); }
});

router.get('/:postId', async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    const comments = await listComments(postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// Admin: update status
router.patch('/:id/status', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const status = z.enum(['PENDING','APPROVED','HIDDEN','SPAM']).parse(req.body.status);
    const reason = req.body.reason ? z.string().max(500).parse(req.body.reason) : undefined;
    const updated = await adminUpdateStatus(id, status, req.user.id, reason);
    res.json(updated);
  } catch (err) { next(err); }
});

// Admin: pin/unpin
router.patch('/:id/pin', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const isPinned = z.coerce.boolean().parse(req.body.isPinned);
    const updated = await adminSetPin(id, isPinned);
    res.json(updated);
  } catch (err) { next(err); }
});

// Admin: bulk actions
router.post('/bulk', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const ids = z.array(z.coerce.number()).nonempty().parse(req.body.ids);
    const action = z.enum(['APPROVE','HIDE','SPAM','DELETE']).parse(req.body.action);
    const reason = req.body.reason ? z.string().max(500).parse(req.body.reason) : undefined;
    const result = await adminBulkAction(ids, action, req.user.id, reason);
    res.json(result);
  } catch (err) { next(err); }
});

router.post('/:postId', authOptional, async (req, res, next) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    const content = z.string().min(1).parse(req.body.content);
    const parentId = req.body.parentId !== undefined && req.body.parentId !== null
      ? z.coerce.number().parse(req.body.parentId)
      : undefined;
    const asGuest = req.body.asGuest === true;
    const isGuest = asGuest || !req.user;
    const guestName = isGuest ? (req.body.guestName ? z.string().min(1).parse(req.body.guestName) : null) : undefined;
    const guestEmail = isGuest ? (req.body.guestEmail ? z.string().email().parse(req.body.guestEmail) : null) : undefined;
    const userId = isGuest ? null : req.user.id;
    const comment = parentId
      ? await addReply(userId, postId, parentId, content, guestName, guestEmail)
      : await addComment(userId, postId, content, guestName, guestEmail);
    // notify admins in real-time
    sendEvent('comment', { postId, commentId: comment.id, userId: userId ?? null, guest: isGuest });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authRequired, async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    const content = z.string().min(1).parse(req.body.content);
    const existing = await getComment(id);
    if (!existing) return res.status(404).json({ message: 'Not found' });
    const isAdmin = req.user.role === 'ADMIN';
    const isOwner = existing.authorId === req.user.id;
    if (!isAdmin && !isOwner) return res.status(403).json({ message: 'Forbidden' });
    const updated = await updateComment(id, content);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/:id', authRequired, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    await deleteComment(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
