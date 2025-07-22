const pool = require('../models/db');

// GET /api/properties/search?city=&type=&min=&max=
const searchProperties = async (req, res) => {
  const { location, type, min, max } = req.query;

  try {
    const conditions = [];
    const values = [];

    if (location) {
      conditions.push(
        `EXISTS (
          SELECT 1 FROM unnest(location) AS c 
          WHERE REPLACE(LOWER(c), ' ', '-') = $${values.length + 1}
        )`
      );
      values.push(location.toLowerCase());
    }

    if (type) {
  conditions.push(`(
    REPLACE(LOWER(type), ' ', '-') = $${values.length + 1}
  )`);
  values.push(type.toLowerCase());
}

    if (min && max) {
  conditions.push(`
    (price_value IS NULL OR 
    (price_value IS NOT NULL AND price_value >= $${values.length + 1} AND price_value <= $${values.length + 2}))
  `);
  values.push(Number(min), Number(max));
}

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM properties ${whereClause} ORDER BY created_at ASC`;

    const result = await pool.query(query, values);
    res.json(result.rows);

    console.log('🔍 Backend search triggered');
console.log('city:', location);
console.log('Final query:', query);
console.log('Values:', values);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ error: 'Server error while fetching properties' });
  }
};

module.exports = { searchProperties };
