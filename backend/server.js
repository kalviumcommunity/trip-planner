import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/generate-plan', async (req, res) => {
  try {
    const { destination, days, interests } = req.body;
    const interestsText = Array.isArray(interests)
      ? interests.join(', ')
      : String(interests);

    // One-shot prompting: Provide an example of the desired output format
    const prompt = `I want you to create trip plans in a very specific format. Here's an example of how to structure a 3-day trip to Paris for someone interested in art and food:

EXAMPLE OUTPUT FORMAT:
# 3-Day Paris Adventure: Art & Food Lover's Guide

## Day 1: Arrival & Iconic Landmarks
**Morning:**
- Arrive in Paris and check into your hotel
- Visit the Louvre Museum (book tickets in advance)
- Lunch at Le Comptoir du Relais (traditional French bistro)

**Afternoon:**
- Walk along the Seine River
- Visit Notre-Dame Cathedral (currently under restoration)
- Explore the Latin Quarter

**Evening:**
- Dinner at L'Arpège (Michelin-starred, book 3 months ahead)
- Evening stroll along the Champs-Élysées

**Food Tip:** Try authentic croissants at Du Pain et des Idées bakery

## Day 2: Art & Culture Deep Dive
**Morning:**
- Visit Musée d'Orsay (impressionist masterpieces)
- Coffee break at Café de Flore (historic literary café)

**Afternoon:**
- Explore Montmartre and Sacré-Cœur
- Visit the Picasso Museum
- Walk through the Marais district

**Evening:**
- Dinner at Frenchie (modern French cuisine)
- Optional: Moulin Rouge show

**Cultural Tip:** Many museums are free on the first Sunday of each month

## Day 3: Hidden Gems & Farewell
**Morning:**
- Visit the Rodin Museum and gardens
- Explore the Luxembourg Gardens

**Afternoon:**
- Shopping at Le Bon Marché
- Visit the Catacombs (unique underground experience)

**Evening:**
- Final dinner at Septime (contemporary French)
- Sunset at Trocadéro for Eiffel Tower views

**Local Secret:** Visit Marché d'Aligre for authentic local market experience

---
Now create a ${days}-day trip plan for ${destination} for someone interested in ${interestsText}. Follow the EXACT same format as the example above, with the same structure, detail level, and sections. Make sure to include specific restaurant names, timing, and practical tips.`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.3, // Lower temperature for more consistent formatting
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000, // Ensure we get complete, detailed plans
      }
    });
    
    const result = await model.generateContent(prompt);

    res.json({ plan: result.response.text() });
  } catch (error) {
    console.error('Error generating trip plan:', error);
    
    // Handle specific Google AI errors
    if (error.message && error.message.includes('API_KEY')) {
      return res.status(401).json({ 
        error: 'Invalid Google AI API key. Please check your GOOGLE_API_KEY in .env' 
      });
    }
    
    if (error.message && error.message.includes('quota')) {
      return res.status(429).json({ 
        error: 'Google AI quota exceeded. Please check your billing and try again.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate trip plan. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running with one-shot prompting',
    model: 'gemini-1.5-flash'
  });
});

app.listen(5000, () => {
  console.log('🚀 Backend server running on port 5000');
  console.log('📍 Health check: http://localhost:5000/health');
  console.log('🎯 Generate plan (POST): http://localhost:5000/generate-plan');
  console.log('✨ Using one-shot prompting for consistent trip plan formatting');
});
