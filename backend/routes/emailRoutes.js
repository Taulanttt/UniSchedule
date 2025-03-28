const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

// POST /api/email/send
router.post('/send', sendEmail);

module.exports = router;
