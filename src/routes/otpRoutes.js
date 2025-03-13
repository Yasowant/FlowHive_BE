const express = require('express');
const { verifyOtp } = require('../controllers/otpController');

const router = express.Router();

router.post('/verify', verifyOtp);

module.exports = router;
