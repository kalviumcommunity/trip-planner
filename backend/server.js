const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/generate-plan', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// Zero-shot AI Trip Plan generation
app.post('/generate-plan', async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY in environment' });
    }

    const { destination, days, interests } = req.body || {};

    if (!destination || !days || !interests) {
      return res.status(400).json({ error: 'destination, days, and interests are required' });
    }

    const interestsText = Array.isArray(interests) ? interests.join(', ') : String(interests);
    const prompt = `Plan a ${days}-day trip to ${destination} for someone interested in ${interestsText}. Provide a concise daily itinerary with highlights, food suggestions, and tips. Keep it practical and well-structured.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const plan = response.choices?.[0]?.message?.content?.trim() || 'No plan generated.';
    res.json({ plan });
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Generate plan (GET): http://localhost:${PORT}/generate-plan`);
  console.log(`🎯 Generate plan (POST): http://localhost:${PORT}/generate-plan`);
});
