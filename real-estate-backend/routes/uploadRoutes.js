const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const allowedCategories = ['gallery', 'activities', 'property-news', 'updates'];

// Create folders if not exist
allowedCategories.forEach(category => {
  const dir = path.join(__dirname, '..', '..', 'public', 'uploads', category);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category } = req.params;
    cb(null, path.join(__dirname, '..', '..', 'public', 'uploads', category));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// Upload Route
router.post('/:category', (req, res, next) => {
  const { category } = req.params;
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid upload category' });
  }
  next();
}, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({
    message: 'Upload successful',
    fileUrl: `/uploads/${req.params.category}/${req.file.filename}`,
  });
});

// Get Files Route
router.get('/:category', (req, res) => {
  const { category } = req.params;
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const dirPath = path.join(__dirname, '..', '..', 'public', 'uploads', category);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not list files' });
    }

    const fileUrls = files.map(filename => `uploads/${category}/${filename}`);
    res.json(fileUrls);
  });
});

module.exports = router;
