// Test file for Chain of Thought Prompting
// This demonstrates the step-by-step reasoning approach

import { ChainOfThoughtPrompting } from './chain-of-thought.js';

// Mock AI model for testing
const mockModel = {
  generateContent: async (prompt) => ({
    response: {
      text: () => `Step-by-step reasoning for Tokyo trip:
      
**Step 1: Understanding Tokyo for food and culture**
Tokyo is known for its unique blend of traditional Japanese culture and modern innovation. The key attractions that align with these interests are: traditional temples, modern districts, and diverse culinary scene.

**Step 2: Activity Planning Logic**
- Morning activities should focus on visiting temples and cultural sites when they're less crowded
- Afternoon should include exploring food districts and trying local specialties
- Evening activities should consider the vibrant nightlife and dining culture

**Step 3: Cultural and Practical Considerations**
- Local customs to be aware of: bowing, removing shoes at temples, using chopsticks properly
- Best times to visit attractions: early morning for temples, lunch time for food districts
- Transportation considerations: efficient subway system, walking between nearby attractions

**Step 4: Final Organized Itinerary**

# 3-Day Tokyo Adventure: Food & Culture Guide

## Day 1: Traditional Tokyo
**Morning:** Senso-ji Temple, Asakusa district
**Afternoon:** Tsukiji Outer Market for street food
**Evening:** Traditional izakaya in Shinjuku

## Day 2: Modern Tokyo
**Morning:** Meiji Shrine, Harajuku fashion district
**Afternoon:** Shibuya crossing, food tour
**Evening:** Roppongi nightlife and dining

## Day 3: Cultural Immersion
**Morning:** Imperial Palace gardens
**Afternoon:** Akihabara electronics, traditional tea ceremony
**Evening:** Final dinner at a Michelin-starred restaurant`
    }
  })
};

describe('Chain of Thought Prompting', () => {
  let chainOfThought;

  beforeEach(() => {
    chainOfThought = new ChainOfThoughtPrompting(mockModel);
  });

  test('should generate trip plan with step-by-step reasoning', async () => {
    const result = await chainOfThought.generateTripPlan('Tokyo', 3, ['food', 'culture']);
    
    expect(result.type).toBe('chain-of-thought');
    expect(result.plan).toContain('Step-by-step reasoning');
    expect(result.plan).toContain('Step 1: Understanding Tokyo');
    expect(result.plan).toContain('Step 2: Activity Planning Logic');
    expect(result.plan).toContain('Step 3: Cultural and Practical Considerations');
    expect(result.plan).toContain('Step 4: Final Organized Itinerary');
  });

  test('should include reasoning in metadata', async () => {
    const result = await chainOfThought.generateTripPlan('Paris', 2, ['art']);
    
    expect(result.reasoning).toBe('This approach shows step-by-step thinking process');
  });

  test('should handle different destinations and interests', async () => {
    const result = await chainOfThought.generateTripPlan('Bali', 4, ['wellness', 'nature']);
    
    expect(result.plan).toContain('Step-by-step reasoning');
    expect(result.plan).toContain('Bali');
    expect(result.plan).toContain('wellness');
  });

  test('should return correct prompt type', () => {
    expect(chainOfThought.getPromptType()).toBe('chain-of-thought');
  });

  test('should provide description', () => {
    const description = chainOfThought.getDescription();
    expect(description).toContain('Chain-of-thought prompting');
    expect(description).toContain('step-by-step thinking process');
  });
});

// Example usage demonstration
console.log('🧪 Chain of Thought Prompting Test Suite');
console.log('This module demonstrates step-by-step reasoning before generating trip plans.');
console.log('Key benefits:');
console.log('- Transparent AI thinking process');
console.log('- Logical reasoning flow');
console.log('- Better understanding of AI decisions');
console.log('- More structured and thoughtful responses');
