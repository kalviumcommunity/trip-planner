// One-shot prompting module
// This module handles one-shot prompting with a single example

export class OneShotPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) 
      ? interests.join(', ') 
      : String(interests);

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

    try {
      const result = await this.model.generateContent(prompt);
      return {
        type: 'one-shot',
        plan: result.response.text(),
        prompt: prompt
      };
    } catch (error) {
      throw new Error(`One-shot prompting failed: ${error.message}`);
    }
  }

  getPromptType() {
    return 'one-shot';
  }
}
