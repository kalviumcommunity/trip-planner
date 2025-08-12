// Test file for Multi-shot Prompting
// This demonstrates how multiple examples help AI understand different patterns

import { MultiShotPrompting } from './multi-shot.js';

// Mock AI model for testing
const mockModel = {
  generateContent: async (prompt) => ({
    response: {
      text: () => `Based on the examples provided, here's a 3-day Tokyo trip for food and culture enthusiasts:

# 3-Day Tokyo Adventure: Food & Culture Lover's Guide

**Day 1: Traditional Tokyo**
🌅 Morning: Senso-ji Temple (8:00 AM - 10:00 AM)
- Start early to avoid crowds
- Visit Asakusa district
- Try traditional street food

☀️ Afternoon: Tsukiji Outer Market (1:00 PM - 5:00 PM)
- Explore fish market area
- Sample fresh sushi and street food
- Visit nearby Hama-rikyu Gardens

🌙 Evening: Shinjuku Izakaya (7:00 PM)
- Traditional Japanese pub experience
- Try local sake and small plates
- Experience vibrant nightlife district

**Day 2: Modern Tokyo**
🌅 Morning: Meiji Shrine (9:00 AM - 11:00 AM)
- Peaceful shrine in forest setting
- Visit Harajuku fashion district
- Try trendy cafes and crepes

☀️ Afternoon: Shibuya Crossing (2:00 PM - 6:00 PM)
- Experience famous intersection
- Shopping at department stores
- Food tour of local specialties

🌙 Evening: Roppongi Dining (7:00 PM)
- International cuisine options
- Rooftop bar views
- Optional: Tokyo Tower visit

**Day 3: Cultural Immersion**
🌅 Morning: Imperial Palace (8:00 AM - 11:00 AM)
- East Gardens tour
- Photo opportunities
- Traditional architecture

☀️ Afternoon: Akihabara & Tea Ceremony (1:00 PM - 6:00 PM)
- Electronics district exploration
- Traditional tea ceremony experience
- Cultural workshop

🌙 Evening: Final Dinner (7:00 PM)
- Michelin-starred restaurant
- Traditional kaiseki meal
- Optional: Sumo wrestling match

This itinerary follows the cultural example structure while adapting to Tokyo's unique features.`
    }
  })
};

describe('Multi-shot Prompting', () => {
  let multiShot;

  beforeEach(() => {
    multiShot = new MultiShotPrompting(mockModel);
  });

  test('should generate trip plan based on multiple examples', async () => {
    const result = await multiShot.generateTripPlan('Tokyo', 3, ['food', 'culture']);
    
    expect(result.type).toBe('multi-shot');
    expect(result.plan).toContain('Based on the examples provided');
    expect(result.plan).toContain('3-Day Tokyo Adventure');
    expect(result.plan).toContain('Traditional Tokyo');
    expect(result.plan).toContain('Modern Tokyo');
    expect(result.plan).toContain('Cultural Immersion');
  });

  test('should include metadata about examples', async () => {
    const result = await multiShot.generateTripPlan('Paris', 2, ['art']);
    
    expect(result.metadata.method).toBe('multi-shot');
    expect(result.metadata.examplesProvided).toBe(3);
    expect(result.metadata.exampleTypes).toContain('culture-history');
    expect(result.metadata.exampleTypes).toContain('adventure-nature');
    expect(result.metadata.exampleTypes).toContain('food-wellness');
  });

  test('should provide examples information', async () => {
    const result = await multiShot.generateTripPlan('Bali', 4, ['wellness', 'nature']);
    
    expect(result.examples).toContain('multiple examples to help the AI understand');
    expect(result.examples).toContain('different patterns and adapt');
  });

  test('should return correct prompt type', () => {
    expect(multiShot.getPromptType()).toBe('multi-shot');
  });

  test('should provide description', () => {
    const description = multiShot.getDescription();
    expect(description).toContain('Multi-shot prompting');
    expect(description).toContain('multiple examples');
    expect(description).toContain('different patterns');
  });

  test('should return example details', () => {
    const examples = multiShot.getExamples();
    
    expect(examples.cultureHistory).toContain('Paris 3-day culture trip');
    expect(examples.adventureNature).toContain('New Zealand 4-day adventure');
    expect(examples.foodWellness).toContain('Bali 5-day wellness journey');
  });

  test('should handle different destinations and interests', async () => {
    const result = await multiShot.generateTripPlan('New York', 5, ['shopping', 'entertainment']);
    
    expect(result.plan).toContain('Based on the examples provided');
    expect(result.plan).toContain('New York');
    expect(result.plan).toContain('shopping');
    expect(result.plan).toContain('entertainment');
  });

  test('should include timing and practical tips', async () => {
    const result = await multiShot.generateTripPlan('London', 3, ['history', 'theater']);
    
    expect(result.plan).toContain('8:00 AM');
    expect(result.plan).toContain('Practical tips');
    expect(result.plan).toContain('Book ahead');
    expect(result.plan).toContain('Optional:');
  });
});

// Example usage demonstration
console.log('🧪 Multi-shot Prompting Test Suite');
console.log('This module demonstrates how multiple examples help AI understand different patterns.');
console.log('Key benefits:');
console.log('- Multiple example types (culture, adventure, wellness)');
console.log('- Pattern recognition and adaptation');
console.log('- Consistent formatting across different trip styles');
console.log('- Better understanding of user preferences');
console.log('- Cultural context and local insights');
