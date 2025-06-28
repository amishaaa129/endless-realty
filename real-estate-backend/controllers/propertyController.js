const pool = require('../models/db');

// GET /api/properties/search?city=&type=&min=&max=
const searchProperties = async (req, res) => {
  const { city, type, min, max } = req.query;

  try {
    const conditions = [];
    const values = [];

    if (city) {
      conditions.push(
        `EXISTS (
          SELECT 1 FROM unnest(city) AS c 
          WHERE REPLACE(LOWER(c), ' ', '-') = $${values.length + 1}
        )`
      );
      values.push(city.toLowerCase());
    }

    if (type) {
      conditions.push(`REPLACE(LOWER(type), ' ', '-') = $${values.length + 1}`);
      values.push(type.toLowerCase());  
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
