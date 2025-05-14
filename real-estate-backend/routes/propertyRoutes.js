const express = require('express');
const router = express.Router();
const { searchProperties } = require('../controllers/propertyController');

// GET /api/properties/search?city=&type=&min=&max=
router.get('/search', searchProperties);

module.exports = router;
