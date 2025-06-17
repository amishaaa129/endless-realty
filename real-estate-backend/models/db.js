const { Pool } = require('pg');

const URL = process.env.DATABASE_URL || "postgresql://endlessrealty_db_user:3fNzqIZY65RJAyDNGXV1JYSPEczYw1cZ@dpg-d0iofj3e5dus739qhktg-a.singapore-postgres.render.com/endlessrealty_db";

// Check if you're running locally
const isLocal = URL.includes('localhost') || URL.includes('127.0.0.1');

const pool = new Pool({
  connectionString: URL,
  ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } })
});

module.exports = pool;
