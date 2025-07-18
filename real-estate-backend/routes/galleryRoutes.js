const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/api/uploads/:category', (req, res) => {
  const { category } = req.params;
  const directoryPath = path.join(__dirname, '..', 'public', 'uploads', category);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan files' });
    }

    const urls = files.map(filename => `/uploads/${category}/${filename}`);
    res.json(urls);
  });
});

module.exports = router;
