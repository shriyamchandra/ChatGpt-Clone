const express = require('express');
const router = express.Router();
const { chatWithGemini } = require('../controllers/chatController');

// POST request to handle chat messages
router.post('/', chatWithGemini);

module.exports = router;
