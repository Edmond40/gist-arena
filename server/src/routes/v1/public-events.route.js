import { Router } from 'express';
import { addClient } from '../../lib/events.js';

const router = Router();

// Public SSE: GET /api/v1/public-events
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  // initial hello
  res.write(`data: ${JSON.stringify({ event: 'hello', ts: Date.now() })}\n\n`);

  // keep alive
  const interval = setInterval(() => {
    res.write(': ping\n\n');
  }, 25000);
  res.on('close', () => clearInterval(interval));

  addClient(res);
});

export default router;
