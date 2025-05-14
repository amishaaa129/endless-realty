const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

console.log('registerUser:', registerUser);

router.post('/signup', registerUser);
router.post('/signin', loginUser);

module.exports = router;
