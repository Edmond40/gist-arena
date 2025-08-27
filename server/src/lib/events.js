/* global process */
import jwt from 'jsonwebtoken';

// Very small in-memory SSE broker
const clients = new Set();

export function addClient(res) {
  clients.add(res);
  res.on('close', () => {
    clients.delete(res);
  });
}

export function sendEvent(event, data = {}) {
  const payload = JSON.stringify({ event, data, ts: Date.now() });
  for (const res of clients) {
    try {
      res.write(`data: ${payload}\n\n`);
    } catch {
      clients.delete(res);
    }
  }
}

// Helper to validate token passed via query (?token=...)
export function verifyTokenFromQuery(req) {
  const token = req.query.token || '';
  if (!token || typeof token !== 'string') return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
