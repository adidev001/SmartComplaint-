const express = require('express');
const { analyzeComplaint } = require('../controllers/aiController');

const router = express.Router();

// Maps to POST /api/ai/analyze
router.post('/analyze', analyzeComplaint);

module.exports = router;
