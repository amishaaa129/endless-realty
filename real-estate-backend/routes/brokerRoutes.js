const express = require('express');
const router = express.Router();
const { getAllBrokers, getBrokerDetails, registerCustomer } = require('../controllers/brokerController');

router.get('/', getAllBrokers);
router.get('/:id', getBrokerDetails);
router.post('/customers', registerCustomer);

module.exports = router;
