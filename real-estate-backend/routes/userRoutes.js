const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const { registerUser, loginUser } = require('../controllers/userController');

console.log('registerUser:', registerUser);

router.post('/signup', registerUser);
router.post('/signin', loginUser);

router.get('/role/:role', async (req, res) => {
  const { role } = req.params;
  try {
    const result = await pool.query(
      'SELECT name, email, phone FROM users WHERE role = $1',
      [role]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
