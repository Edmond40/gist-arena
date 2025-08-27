import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

export default router;
