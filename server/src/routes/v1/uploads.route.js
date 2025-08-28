import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import process from 'node:process';
import { authRequired } from '../../middleware/auth.js';

// Use in-memory storage; we'll upload buffers directly to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

// Cloudinary config via env:
// Either CLOUDINARY_URL or cloud_name/api_key/api_secret must be set
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const router = Router();

// List uploaded files: not tracked locally when using Cloudinary
router.get('/', authRequired, async (_req, res) => {
  // Optional: integrate Cloudinary Admin API to list resources
  // For now, return an empty list to keep endpoint stable
  res.json([]);
});

// Single file upload: field name 'file'
router.post('/', authRequired, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const folder = process.env.CLOUDINARY_FOLDER || 'gist-arena';
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      filename_override: req.file.originalname,
    });

    return res.status(201).json({
      url: result.secure_url,
      public_id: result.public_id,
      bytes: result.bytes,
      format: result.format,
      width: result.width,
      height: result.height,
      folder,
      provider: 'cloudinary',
    });
  } catch (e) {
    return res.status(500).json({ message: 'Upload failed', error: e?.message || 'unknown' });
  }
});

export default router;
