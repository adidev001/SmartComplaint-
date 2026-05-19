const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Mount Routes
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SmartComplaint API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`AI Endpoint: POST http://localhost:${PORT}/api/ai/analyze`);
});
