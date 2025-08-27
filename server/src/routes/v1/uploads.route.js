import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import process from 'node:process';
import { authRequired } from '../../middleware/auth.js';

const uploadDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const name = `${base}_${Date.now()}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

const router = Router();

// List uploaded files (basic gallery)
router.get('/', authRequired, (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir)
      .filter((f) => !f.startsWith('.'))
      .map((filename) => {
        const full = path.join(uploadDir, filename);
        const stat = fs.statSync(full);
        return {
          filename,
          url: `/uploads/${filename}`,
          size: stat.size,
          mtime: stat.mtime,
        };
      })
      .sort((a, b) => b.mtime - a.mtime);
    res.json(files);
  } catch (e) {
    res.status(500).json({ message: 'Failed to list uploads' });
  }
});

// Single file upload: field name 'file'
router.post('/', authRequired, upload.single('file'), (req, res) => {
  const filename = req.file.filename;
  const url = `/uploads/${filename}`; // served statically by express
  res.status(201).json({ url, filename });
});

export default router;
