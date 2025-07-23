const express = require('express');
const router = express.Router();
const { searchProperties } = require('../controllers/propertyController');

const multer = require('multer');
const supabase = require('../utils/supabaseClient');
const pool = require('../models/db');
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Add Property
router.post('/add', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 100 },
]), async (req, res) => {
  try {
    const {
      title, type, organization, price, status, location, address, description,
      bedrooms, bathrooms, area, floors,
      amenities, youtube
    } = req.body;

    const files = req.files;
    if (!files || (!files.images && !files.thumbnail)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const folderName = `${Date.now()}_${title.replace(/\s+/g, '_')}`;
    const uploadedUrls = [];

    // ✅ Convert location to array
    const locationArray = Array.isArray(location) ? location : [location];

    // ✅ Handle Thumbnail Upload
    let thumbnailUrl = null;
    const thumbnailFile = files?.thumbnail?.[0];
    if (thumbnailFile) {
      const thumbFileName = `${folderName}/thumbnail_${Date.now()}_${thumbnailFile.originalname.replace(/\s+/g, '_')}`;
      const { error: thumbError } = await supabase.storage
        .from('properties')
        .upload(thumbFileName, thumbnailFile.buffer, {
          contentType: thumbnailFile.mimetype,
        });

      if (thumbError) {
        console.error('Thumbnail upload error:', thumbError.message);
      } else {
        const { data } = supabase.storage.from('properties').getPublicUrl(thumbFileName);
        thumbnailUrl = data?.publicUrl || null;
      }
    }

    // ✅ Handle Gallery Images Upload
    for (const file of files.images || []) {
      const cleanedFileName = file.originalname.replace(/\s+/g, '_');
      const fileName = `${folderName}/${Date.now()}_${cleanedFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('properties')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        continue;
      }

      const { data } = supabase.storage.from('properties').getPublicUrl(fileName);
      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      }
    }

    // ✅ Insert into PostgreSQL
    const result = await pool.query(`
      INSERT INTO properties (
        title, type, organization, price_value, status, location, address,
        description, bhk, bathrooms, area_sqft, floors, amenities,
        youtube, images, folder, thumbnail_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17
      )
      RETURNING *;
    `, [
      title,
      type,
      organization,
      price,
      status,
      locationArray,
      address,
      description,
      bedrooms,
      bathrooms,
      area,
      floors,
      amenities,
      youtube,
      JSON.stringify(uploadedUrls),
      folderName,
      thumbnailUrl
    ]);

    return res.json({
      message: 'Property added successfully',
      property: result.rows[0]
    });

  } catch (err) {
    console.error('Property Upload Error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
});


// ✅ Fetch All Properties
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
    return res.json(result.rows);
  } catch (err) {
    console.error('Fetch properties error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// ✅ Search Properties
router.get('/search', searchProperties);

module.exports = router;
