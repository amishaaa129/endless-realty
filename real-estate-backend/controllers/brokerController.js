const pool = require('../models/db');
const QRCode = require('qrcode');

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';

const getAllBrokers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM brokers');
    const brokers = result.rows;

    // For each broker, generate QR code
    const brokersWithQr = await Promise.all(
      brokers.map(async (broker) => {
        const qrData = `${FRONTEND_BASE_URL}/signup`;  // or your actual frontend route
        const qrCodeUrl = await QRCode.toDataURL(qrData); // base64 image

        return {
          ...broker,
          qr_code_url: qrCodeUrl, // override or add to existing
        };
      })
    );

    res.json(brokersWithQr);
  } catch (err) {
    console.error('Error fetching brokers:', err);
    res.status(500).json({ error: 'Failed to fetch brokers' });
  }
};

const getBrokerDetails = async (req, res) => {
  const brokerId = req.params.id;
  try {
    const brokerResult = await pool.query('SELECT * FROM brokers WHERE id = $1', [brokerId]);
    const broker = brokerResult.rows[0];

    if (!broker) {
      return res.status(404).json({ error: 'Broker not found' });
    }

    const usersQuery = await pool.query(
      'SELECT name, phone, email, registration_date FROM users WHERE referral_broker_id = $1 ORDER BY created_at DESC',
      [brokerId]
    );

    const qrData = `${FRONTEND_BASE_URL}/signup`;
    const qrCodeUrl = await QRCode.toDataURL(qrData); // base64 image

    res.json({
      broker: {
        ...broker,
        qr_code_url: qrCodeUrl,
      },
      customers: usersQuery.rows
    });
  } catch (err) {
    console.error('Error fetching broker details:', err);
    res.status(500).json({ error: 'Failed to fetch broker details' });
  }
};

const registerCustomer = async (req, res) => {
  const { name, contact_number, email, broker_id } = req.body;
  try {
    const existing = await pool.query(
      'SELECT * FROM customers WHERE contact_number = $1 OR email = $2',
      [contact_number, email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    const insertCustomer = await pool.query(
      'INSERT INTO customers (name, contact_number, email, broker_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, contact_number, email, broker_id]
    );

    const customerId = insertCustomer.rows[0].id;

    await pool.query(
      'INSERT INTO referrals (broker_id, customer_id) VALUES ($1, $2)',
      [broker_id, customerId]
    );

    await pool.query(
      'UPDATE brokers SET score = score + 1 WHERE id = $1',
      [broker_id]
    );

    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllBrokers,
  getBrokerDetails,
  registerCustomer,
};
