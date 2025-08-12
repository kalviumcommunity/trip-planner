// Test file for System-User Prompting
// This demonstrates the RTFC framework implementation

import { SystemUserPrompting } from './system-user.js';

// Mock AI model for testing
const mockModel = {
  generateContent: async (prompt) => ({
    response: {
      text: () => `# 3-Day Tokyo Adventure: Food & Culture Lover's Guide

Based on your interests in food and culture, I've created a comprehensive itinerary that balances must-see attractions with authentic local experiences.

## Day 1: Traditional Tokyo
**Morning (8:00 AM - 12:00 PM): Senso-ji Temple & Asakusa District**
- **8:00 AM - 10:00 AM:** Senso-ji Temple (Free entry, arrive early to avoid crowds)
  - Cultural Context: This is Tokyo's oldest temple, dating back to 628 AD
  - Practical Tips: Remove shoes before entering, bow respectfully, avoid photography inside
  - Local Secret: Visit the nearby Asakusa Shrine for a quieter spiritual experience
  - Safety Note: Be mindful of the large crowds and keep belongings secure

- **10:00 AM - 12:00 PM:** Asakusa District Exploration
  - Cultural Context: Traditional neighborhood preserving Edo-period atmosphere
  - Practical Tips: Try street food like ningyo-yaki (sweet bean cakes) and senbei (rice crackers)
  - Local Secret: Visit the Asakusa Culture Tourist Information Center rooftop for free city views
  - Cost: Street food ¥200-500, souvenirs ¥500-2000

**Afternoon (1:00 PM - 6:00 PM): Tsukiji Outer Market & Hama-rikyu Gardens**
- **1:00 PM - 4:00 PM:** Tsukiji Outer Market
  - Cultural Context: World-famous fish market showcasing Japanese food culture
  - Practical Tips: Many shops close by 2:00 PM, arrive early for lunch
  - Local Secret: Try the fresh sushi at Sushi Dai or Daiwa Sushi (¥3000-5000)
  - Safety Note: Be careful of moving vehicles and slippery surfaces

- **4:00 PM - 6:00 PM:** Hama-rikyu Gardens
  - Cultural Context: Traditional Japanese garden with tea house
  - Practical Tips: Tea ceremony costs ¥500, garden entry ¥300
  - Local Secret: Visit during cherry blossom season (late March-early April)
  - Accessibility: Wheelchair accessible paths available

**Evening (7:00 PM - 10:00 PM): Shinjuku Izakaya Experience**
- **7:00 PM - 10:00 PM:** Traditional Izakaya in Shinjuku
  - Cultural Context: Japanese pub culture with shared plates and social dining
  - Practical Tips: Book ahead for popular places, expect ¥3000-5000 per person
  - Local Secret: Try Omoide Yokocho (Memory Lane) for authentic atmosphere
  - Safety Note: Be aware of your alcohol consumption and surroundings

## Day 2: Modern Tokyo
**Morning (9:00 AM - 12:00 PM): Meiji Shrine & Harajuku**
- **9:00 AM - 11:00 AM:** Meiji Shrine
  - Cultural Context: Dedicated to Emperor Meiji and Empress Shoken
  - Practical Tips: Free entry, arrive early for peaceful experience
  - Local Secret: Visit the inner garden (¥500) for seasonal flowers
  - Safety Note: Respectful behavior required, no photography of ceremonies

- **11:00 AM - 12:00 PM:** Harajuku Fashion District
  - Cultural Context: Center of Japanese youth culture and fashion trends
  - Practical Tips: Shops open around 11:00 AM, Takeshita Street gets crowded
  - Local Secret: Visit on Sunday for cosplay enthusiasts
  - Cost: Fashion items ¥1000-10000, crepes ¥300-800

**Afternoon (2:00 PM - 6:00 PM): Shibuya Crossing & Food Tour**
- **2:00 PM - 4:00 PM:** Shibuya Crossing Experience
  - Cultural Context: World's busiest pedestrian crossing, symbol of Tokyo
  - Practical Tips: Best photos from Starbucks 2nd floor or Shibuya Sky rooftop
  - Local Secret: Visit the Hachiko statue for photo opportunities
  - Safety Note: Be careful crossing, follow pedestrian signals

- **4:00 PM - 6:00 PM:** Shibuya Food Tour
  - Cultural Context: Diverse dining options reflecting Tokyo's international nature
  - Practical Tips: Try ramen at Ichiran (¥1000) or udon at Tsuru Ton Tan (¥800)
  - Local Secret: Visit the food floor of department stores for samples
  - Cost: Meals ¥800-2000 per person

**Evening (7:00 PM - 10:00 PM): Roppongi Dining & Views**
- **7:00 PM - 10:00 PM:** International Cuisine in Roppongi
  - Cultural Context: Tokyo's international district with diverse dining options
  - Practical Tips: Book rooftop restaurants for city views
  - Local Secret: Try the Roppongi Hills Mori Tower for sunset views
  - Safety Note: Be aware of nightlife atmosphere, use well-lit streets

## Day 3: Cultural Immersion
**Morning (8:00 AM - 12:00 PM): Imperial Palace & Traditional Arts**
- **8:00 AM - 10:00 AM:** Imperial Palace East Gardens
  - Cultural Context: Former Edo Castle, symbol of Japanese history
  - Practical Tips: Free entry, arrive early for peaceful experience
  - Local Secret: Visit during cherry blossom or autumn foliage seasons
  - Accessibility: Limited wheelchair access, mostly walking paths

- **10:00 AM - 12:00 PM:** Traditional Arts Workshop
  - Cultural Context: Learn about Japanese cultural practices
  - Practical Tips: Book workshops in advance, costs vary ¥2000-5000
  - Local Secret: Try calligraphy, tea ceremony, or origami classes
  - Safety Note: Follow instructor guidance for proper technique

**Afternoon (1:00 PM - 6:00 PM): Akihabara & Tea Ceremony**
- **1:00 PM - 4:00 PM:** Akihabara Electronics District
  - Cultural Context: Center of Japanese pop culture and technology
  - Practical Tips: Many shops open late, best deals on weekdays
  - Local Secret: Visit the AKB48 theater for idol culture experience
  - Cost: Electronics vary, souvenirs ¥500-5000

- **4:00 PM - 6:00 PM:** Traditional Tea Ceremony
  - Cultural Context: Ancient Japanese ritual emphasizing harmony and respect
  - Practical Tips: Book through cultural centers, wear comfortable clothes
  - Local Secret: Try matcha sweets and learn proper etiquette
  - Cost: ¥3000-5000 per person

**Evening (7:00 PM - 10:00 PM): Final Dinner & Cultural Experience**
- **7:00 PM - 10:00 PM:** Michelin-Starred Kaiseki Dinner
  - Cultural Context: Traditional multi-course Japanese dining
  - Practical Tips: Book 2-3 months in advance, formal dress code
  - Local Secret: Try seasonal specialties and ask about ingredients
  - Cost: ¥15000-30000 per person

## Cultural Tips & Local Customs
- **Bowing:** Bow slightly when greeting, deeper for respect
- **Shoes:** Remove shoes when entering temples and traditional buildings
- **Chopsticks:** Don't stick chopsticks upright in rice, pass food with serving utensils
- **Tipping:** Not expected in Japan, excellent service is standard
- **Queuing:** Always form orderly lines, respect personal space

## Safety & Accessibility Notes
- **Emergency:** Dial 110 for police, 119 for ambulance
- **Transportation:** Use IC cards (Pasmo/Suica) for convenience
- **Medical:** English-speaking doctors available at major hospitals
- **Accessibility:** Many attractions have wheelchair access, check in advance
- **Weather:** Check forecasts, bring appropriate clothing

This itinerary provides a perfect balance of traditional culture and modern Tokyo experiences, respecting local customs while maximizing your cultural immersion.`
    }
  })
};

describe('System-User Prompting', () => {
  let systemUser;

  beforeEach(() => {
    systemUser = new SystemUserPrompting(mockModel);
  });

  test('should generate trip plan using RTFC framework', async () => {
    const result = await systemUser.generateTripPlan('Tokyo', 3, ['food', 'culture']);
    
    expect(result.type).toBe('system-user');
    expect(result.framework).toBe('RTFC (Role, Task, Format, Context)');
    expect(result.plan).toContain('3-Day Tokyo Adventure');
    expect(result.plan).toContain('Cultural Context:');
    expect(result.plan).toContain('Practical Tips:');
    expect(result.plan).toContain('Local Secret:');
    expect(result.plan).toContain('Safety Note:');
  });

  test('should include comprehensive metadata', async () => {
    const result = await systemUser.generateTripPlan('Paris', 2, ['art']);
    
    expect(result.metadata.method).toBe('system-user');
    expect(result.metadata.framework).toBe('RTFC');
    expect(result.metadata.role).toContain('Expert travel planner');
    expect(result.metadata.task).toContain('Create 2-day trip plan for Paris');
    expect(result.metadata.format).toContain('Daily structure with timing');
    expect(result.metadata.context).toContain('Comprehensive, practical guide');
  });

  test('should provide framework information', async () => {
    const framework = systemUser.getFramework();
    
    expect(framework.name).toBe('RTFC Framework');
    expect(framework.components.role).toContain('Clear definition of AI assistant');
    expect(framework.components.task).toContain('Specific, actionable requirements');
    expect(framework.components.format).toContain('Detailed structure and organization');
    expect(framework.components.context).toContain('Background information');
    expect(framework.benefits).toHaveLength(4);
  });

  test('should return correct prompt type', () => {
    expect(systemUser.getPromptType()).toBe('system-user');
  });

  test('should provide description', () => {
    const description = systemUser.getDescription();
    expect(description).toContain('System and user prompts using RTFC framework');
    expect(description).toContain('clear role definition and specific task requirements');
  });

  test('should return role definition', () => {
    const role = systemUser.getRoleDefinition();
    
    expect(role.expertise).toContain('Global destinations knowledge');
    expect(role.expertise).toContain('Cultural sensitivity');
    expect(role.approach).toContain('Cultural consideration first');
    expect(role.approach).toContain('Safety and accessibility focus');
  });

  test('should return task requirements', () => {
    const requirements = systemUser.getTaskRequirements();
    
    expect(requirements.structure).toContain('Daily breakdown with timing');
    expect(requirements.content).toContain('Cultural context and practical tips');
    expect(requirements.quality).toContain('Comprehensive and actionable');
    expect(requirements.format).toContain('Clear and organized presentation');
  });

  test('should handle different destinations and interests', async () => {
    const result = await systemUser.generateTripPlan('Bali', 4, ['wellness', 'nature']);
    
    expect(result.plan).toContain('Based on your interests');
    expect(result.plan).toContain('Bali');
    expect(result.plan).toContain('wellness');
    expect(result.plan).toContain('nature');
  });

  test('should include cultural context and practical tips', async () => {
    const result = await systemUser.generateTripPlan('London', 3, ['history', 'theater']);
    
    expect(result.plan).toContain('Cultural Context:');
    expect(result.plan).toContain('Practical Tips:');
    expect(result.plan).toContain('Local Secret:');
    expect(result.plan).toContain('Safety Note:');
  });
});

// Example usage demonstration
console.log('🧪 System-User Prompting Test Suite');
console.log('This module demonstrates the RTFC framework implementation.');
console.log('Key benefits:');
console.log('- Clear role definition prevents confusion');
console.log('- Specific task requirements ensure quality');
console.log('- Structured format improves consistency');
console.log('- Context provides necessary background');
console.log('- Cultural sensitivity and practical guidance');
