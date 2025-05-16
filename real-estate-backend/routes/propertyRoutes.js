const express = require('express');
const router = express.Router();
const { searchProperties } = require('../controllers/propertyController');
const pool = require('../models/db');

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    console.error('DB connection failed:', err.message);
    res.status(500).json({ connected: false, error: err.message });
  }
});

// GET /api/properties/search?city=&type=&min=&max=
router.get('/search', searchProperties);

module.exports = router;
