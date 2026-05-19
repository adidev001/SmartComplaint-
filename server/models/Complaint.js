const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  title: {
    type: String,
    required: [true, 'Complaint title is required']
  },
  description: {
    type: String,
    required: [true, 'Complaint description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  status: {
    type: String,
    default: "Pending"
  },
  aiAnalysis: {
    priority: String,
    department: String,
    urgency_score: Number,
    sentiment: String,
    summary: String,
    auto_response: String,
    estimated_resolution_days: Number,
    tags: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
