const pool = require('../models/db');
const QRCode = require('qrcode');

const brokers = [
  { name: 'Abhjeet Geete' },
  { name: 'Prateek Sahu' },
  { name: 'Lalit Sahu' },
  { name: 'Abhishek Sahu' },
  { name: 'Sachin Sahu' },
  { name: 'Abhishek Mishra' }
];

(async () => {
  await pool.query('DELETE FROM referrals');
  await pool.query('DELETE FROM customers');
  await pool.query('DELETE FROM brokers');

  for (const b of brokers) {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&background=random&color=fff&size=150`;
    const result = await pool.query(
      'INSERT INTO brokers (name, image_url, score) VALUES ($1, $2, $3) RETURNING id',
      [b.name, avatar, 0]
    );

    const id = result.rows[0].id;
    const qrCode = await QRCode.toDataURL(`https://yourdomain.com/ourassociates/${id}`);
    await pool.query('UPDATE brokers SET qr_code_url = $1 WHERE id = $2', [qrCode, id]);
  }

  console.log('Seeded successfully');
})();
