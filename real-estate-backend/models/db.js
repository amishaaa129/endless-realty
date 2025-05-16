const { Pool } = require('pg');
const URL = process.env.DATABASE_URL || "postgresql://postgres:strangert3@localhost:5432/endless_realty";
const pool = new Pool({
  connectionString: URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
