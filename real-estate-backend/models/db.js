const { Pool } = require('pg');
const URL = "postgresql://postgres:strangert3@localhost:5432/endless_realty" || process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
