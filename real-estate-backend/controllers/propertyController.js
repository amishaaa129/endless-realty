const pool = require('../models/db');

// GET /api/properties/search?city=&type=&min=&max=
const searchProperties = async (req, res) => {
  const { city, type, min, max } = req.query;

  try {
    const conditions = [];
    const values = [];

    if (city) {
      conditions.push(`LOWER(city) = LOWER($${values.length + 1})`);
      values.push(city);
    }

    if (type) {
      conditions.push(`LOWER(type) = LOWER($${values.length + 1})`);
      values.push(type);
    }

    if (min) {
      conditions.push(`price >= $${values.length + 1}`);
      values.push(Number(min));
    }

    if (max) {
      conditions.push(`price <= $${values.length + 1}`);
      values.push(Number(max));
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM properties ${whereClause} ORDER BY created_at DESC`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ error: 'Server error while fetching properties' });
  }
};

module.exports = { searchProperties };
