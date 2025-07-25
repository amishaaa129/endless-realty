const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const pool = require('../models/db');

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, phone, email, password, referral_broker_id, user_type } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = user_type?.toLowerCase() || 'buyer'; // fallback just in case

    const newUser = await pool.query(
      `INSERT INTO users (name, phone, email, password, referral_broker_id, role) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, phone, email, referral_broker_id, registration_date, role`,
      [name, phone, email, hashedPassword, referral_broker_id, role]
    );

    // Update broker score (only if referral is provided)
    if (referral_broker_id) {
      await pool.query(
        'UPDATE brokers SET score = score + 10 WHERE id = $1',
        [referral_broker_id]
      );
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { registerUser, loginUser };
