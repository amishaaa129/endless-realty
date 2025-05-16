const express = require('express');
const cors = require('cors');
require('dotenv').config();

const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Your React frontend domain
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => res.send('Real Estate API Running'));

const pool = require('./models/db');

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    console.error('DB connection failed:', err); // full error object
    res.status(500).json({ connected: false, error: err.message || 'Unknown error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
