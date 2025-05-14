const express = require('express');
const cors = require('cors');
require('dotenv').config();

const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => res.send('Real Estate API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
