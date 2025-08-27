import { Router } from 'express';
import { addClient, verifyTokenFromQuery } from '../../lib/events.js';

const router = Router();

// GET /api/v1/events?token=<JWT>
router.get('/', (req, res) => {
  // only allow authenticated ADMIN listeners
  const payload = verifyTokenFromQuery(req);
  if (!payload || payload.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  // initial event
  res.write(`data: ${JSON.stringify({ event: 'hello', ts: Date.now() })}\n\n`);

  // keep alive
  const interval = setInterval(() => {
    res.write(': ping\n\n');
  }, 25000);
  res.on('close', () => clearInterval(interval));

  addClient(res);
});

export default router;
