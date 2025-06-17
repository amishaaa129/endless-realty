const pool = require('./models/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("✅ DB Connected:", res.rows[0]);
    process.exit();
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
})();