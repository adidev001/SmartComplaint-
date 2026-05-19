const Groq = require('groq-sdk');
const { SYSTEM_PROMPT } = require('../prompts/systemPrompt');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const buildUserMessage = (complaint) =>
  `Analyze this citizen complaint:

Title: ${complaint.title}
Category: ${complaint.category}
Location: ${complaint.location}
Description: ${complaint.description}

Provide your JSON analysis now.`;

const analyzeComplaint = async (req, res) => {
  try {
    const complaint = req.body;
    
    if (!complaint || !complaint.title || !complaint.description) {
        return res.status(400).json({ error: "Missing required fields in complaint" });
    }

    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: buildUserMessage(complaint) }
      ],
      temperature: 0.2,                        // Low temp → consistent JSON
      max_tokens: 600,                         // Enough for full response
      response_format: { type: 'json_object' } // Groq JSON mode — no fences
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return res.status(200).json(analysis);
  } catch (error) {
    console.error("Error analyzing complaint:", error);
    return res.status(500).json({ error: "Failed to analyze complaint" });
  }
};

module.exports = {
  analyzeComplaint
};
