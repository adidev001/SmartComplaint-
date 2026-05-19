const express = require('express');
const {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  searchComplaintByLocation
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to submit complaints
router.post('/', addComplaint);

// Protected routes to track and manage complaints
router.get('/', protect, getAllComplaints);
router.put('/:id', protect, updateComplaintStatus);
router.get('/search', protect, searchComplaintByLocation);

module.exports = router;
