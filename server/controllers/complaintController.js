const Complaint = require('../models/Complaint');
const Groq = require('groq-sdk');
const { SYSTEM_PROMPT } = require('../prompts/systemPrompt');

// Initialize Groq if Key exists
let groq = null;
if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

const buildUserMessage = (complaint) =>
  `Analyze this citizen complaint:

Title: ${complaint.title}
Category: ${complaint.category}
Location: ${complaint.location}
Description: ${complaint.description}

Provide your JSON analysis now.`;

// @desc    Add new complaint
// @route   POST /api/complaints
const addComplaint = async (req, res) => {
  const { name, email, title, description, category, location } = req.body;

  try {
    // Basic validation
    if (!name || !email || !title || !description || !category || !location) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    let aiAnalysis = null;

    // Run Groq AI Analysis if configured
    if (groq) {
      try {
        const response = await groq.chat.completions.create({
          model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user',   content: buildUserMessage({ title, category, location, description }) }
          ],
          temperature: 0.2,
          max_tokens: 600,
          response_format: { type: 'json_object' }
        });
        aiAnalysis = JSON.parse(response.choices[0].message.content);
      } catch (aiErr) {
        console.error("AI Analysis failed but continuing saving: ", aiErr);
      }
    }

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
      aiAnalysis
    });

    res.status(201).json({
      message: 'Complaint stored successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
const getAllComplaints = async (req, res) => {
  const { category } = req.query;
  
  try {
    let query = {};
    if (category) {
      query.category = category;
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
const updateComplaintStatus = async (req, res) => {
  const { status } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({
      message: 'Updated status successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Search complaint by location
// @route   GET /api/complaints/search
const searchComplaintByLocation = async (req, res) => {
  const { location } = req.query;

  try {
    if (!location) {
      return res.status(400).json({ error: 'Location query parameter is required' });
    }

    // Case-insensitive regex search
    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' }
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  searchComplaintByLocation
};
