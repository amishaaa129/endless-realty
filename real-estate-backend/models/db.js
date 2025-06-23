const { Pool } = require('pg');

const URL = process.env.DATABASE_URL || "postgresql://endlessrealty_db_78ul_user:5P7pmMzW1X5hwz1RpvLBBCSOqxoPke73@dpg-d1cnbe2li9vc73du84a0-a.singapore-postgres.render.com/endlessrealty_db_78ul";

// Check if you're running locally
const isLocal = URL.includes('localhost') || URL.includes('127.0.0.1');

const pool = new Pool({
  connectionString: URL,
  ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } })
});

module.exports = pool;
