import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import process from 'node:process';
import { authRequired } from '../../middleware/auth.js';

// Configure multer for local file storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.resolve(process.cwd(), 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

const router = Router();

// List uploaded files from local uploads directory
router.get('/', authRequired, async (_req, res) => {
  try {
    const uploadDir = path.resolve(process.cwd(), 'uploads');
    const files = await fs.readdir(uploadDir);
    const fileList = files.map(filename => ({
      filename,
      url: `/uploads/${filename}`
    }));
    res.json(fileList);
  } catch (error) {
    res.json([]);
  }
});

// Single file upload: field name 'file'
router.post('/', authRequired, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileUrl = `/uploads/${req.file.filename}`;
    
    return res.status(201).json({
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      provider: 'local',
    });
  } catch (e) {
    return res.status(500).json({ message: 'Upload failed', error: e?.message || 'unknown' });
  }
});

export default router;
