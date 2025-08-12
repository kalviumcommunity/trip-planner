// Test script to demonstrate one-shot prompting
// Run with: node test-oneshot.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function testOneShotPrompting() {
  try {
    console.log('🧪 Testing One-Shot Prompting...\n');
    
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
Now create a 2-day trip plan for Tokyo for someone interested in technology and anime. Follow the EXACT same format as the example above, with the same structure, detail level, and sections. Make sure to include specific restaurant names, timing, and practical tips.`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000,
      }
    });
    
    console.log('📤 Sending one-shot prompt to Gemini...\n');
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log('📋 Generated Response:\n');
    console.log('='.repeat(60));
    console.log(response);
    console.log('='.repeat(60));
    
    console.log('\n✅ One-shot prompting test completed successfully!');
    console.log('\n🎯 Key Benefits of One-Shot Prompting:');
    console.log('   • Consistent formatting across all responses');
    console.log('   • Specific structure with clear sections');
    console.log('   • Detailed examples of what we want');
    console.log('   • Practical tips and local secrets included');
    console.log('   • Restaurant names and timing details');
    
  } catch (error) {
    console.error('❌ Error testing one-shot prompting:', error.message);
    if (error.message.includes('API_KEY')) {
      console.log('\n💡 Make sure to set GOOGLE_API_KEY in your .env file');
    }
  }
}

testOneShotPrompting();
