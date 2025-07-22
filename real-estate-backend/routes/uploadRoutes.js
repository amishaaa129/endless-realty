const express = require('express');
const multer = require('multer');
const supabase = require('../utils/supabaseClient');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const allowedCategories = ['gallery', 'activities', 'property-news', 'updates'];

// UPLOAD IMAGE TO SUPABASE
router.post('/:category', upload.single('image'), async (req, res) => {
  const { category } = req.params;

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid upload category' });
  }

  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const cleanFileName = file.originalname.split('\\').pop().split('/').pop();
  const fileName = `${Date.now()}-${cleanFileName}`;

  const { error: uploadError } = await supabase.storage
    .from(category)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    console.error(uploadError);
    return res.status(500).json({ error: 'Upload failed' });
  }

  const { data } = supabase.storage.from(category).getPublicUrl(fileName);
  return res.json({ message: 'Upload successful', fileUrl: data.publicUrl });
});

// GET LIST OF IMAGE URLS
router.get('/:category', async (req, res) => {
  const { category } = req.params;

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const { data, error } = await supabase.storage
    .from(category)
    .list('', { limit: 100, offset: 0, sortBy: { column: 'created_at', order: 'desc' } });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not list images' });
  }

  const urls = data.map(file =>
    supabase.storage.from(category).getPublicUrl(file.name).data.publicUrl
  );

  return res.json(urls);
});

// DELETE IMAGE FROM SUPABASE (fixed route)
router.delete('/:category', async (req, res) => {
  const { category } = req.params;
  const { filename } = req.query; // <-- now send filename as query param
  console.log("📛 Filename to delete:", filename);

  if (!category || !filename) {
    return res.status(400).json({ error: 'Missing category or filename' });
  }

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const { error } = await supabase.storage.from(category).remove([filename]);

  if (error) {
    console.error("❌ Delete error:", error);
    return res.status(500).json({ error: 'Delete failed' });
  }

  return res.json({ message: 'Image deleted successfully' });
});

module.exports = router;
