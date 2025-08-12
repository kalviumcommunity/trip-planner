// Multi-shot Prompting Module
// This module implements multi-shot prompting with multiple examples

export class MultiShotPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) ? interests.join(', ') : interests;
    
    const prompt = `I want you to create trip plans by learning from multiple examples. Here are different types of trip plans to learn from:

EXAMPLE 1 - CULTURE & HISTORY TRIP (3 days, Paris):
# 3-Day Paris Adventure: Culture & History Lover's Guide

**Day 1: Classic Paris**
🌅 Morning: Eiffel Tower (8:00 AM - 10:00 AM)
- Start early to avoid crowds
- Take photos from Trocadéro Gardens
- Visit nearby Arc de Triomphe

☀️ Afternoon: Louvre Museum (1:00 PM - 5:00 PM)
- Book timed entry online
- Focus on Mona Lisa, Venus de Milo
- Take breaks in the beautiful courtyards

🌙 Evening: Seine River Cruise (7:00 PM)
- Sunset views of illuminated monuments
- Dinner at Le Comptoir du Relais (book ahead)

**Day 2: Artistic Paris**
🌅 Morning: Montmartre & Sacré-Cœur (9:00 AM)
- Climb the hill for panoramic views
- Visit Place du Tertre artists' square
- Explore charming cobblestone streets

☀️ Afternoon: Musée d'Orsay (2:00 PM - 6:00 PM)
- Impressionist masterpieces
- Beautiful Belle Époque architecture
- Café on the top floor

🌙 Evening: Latin Quarter (7:00 PM)
- Dinner at traditional bistro
- Walk through historic streets
- Optional: Jazz at Le Caveau de la Huchette

**Day 3: Royal Paris**
🌅 Morning: Palace of Versailles (9:00 AM - 1:00 PM)
- Take RER C train from Paris
- Visit Hall of Mirrors, gardens
- Lunch at La Flotille restaurant

☀️ Afternoon: Return to Paris (3:00 PM)
- Shopping at Galeries Lafayette
- Visit Opéra Garnier
- High tea at Ladurée

🌙 Evening: Final Night (7:00 PM)
- Dinner at Michelin-starred restaurant
- Walk along Champs-Élysées
- Optional: Moulin Rouge show

---
EXAMPLE 2 - ADVENTURE & NATURE TRIP (4 days, New Zealand):
# 4-Day New Zealand Adventure: Nature & Thrill Seeker's Guide

**Day 1: Auckland Arrival**
🌅 Morning: Sky Tower & City Views (9:00 AM)
- 360° views from observation deck
- Optional: SkyWalk or SkyJump for thrill-seekers
- Visit nearby Auckland War Memorial Museum

☀️ Afternoon: Waiheke Island (1:00 PM - 6:00 PM)
- 40-minute ferry ride
- Wine tasting at multiple vineyards
- Hiking trails with coastal views

🌙 Evening: Return to Auckland (7:00 PM)
- Dinner at Viaduct Harbour
- Walk along waterfront
- Optional: Night kayaking

**Day 2: Rotorua Adventure**
🌅 Morning: Drive to Rotorua (8:00 AM - 10:00 AM)
- Stop at Waitomo Glowworm Caves
- Guided tour through magical caves
- Optional: Black water rafting

☀️ Afternoon: Rotorua Activities (2:00 PM - 6:00 PM)
- Te Puia geothermal park
- Māori cultural performance
- Redwood Forest mountain biking

🌙 Evening: Rotorua (7:00 PM)
- Traditional hangi dinner
- Stargazing at dark sky reserve
- Stay at geothermal hot spring resort

**Day 3: Queenstown Thrills**
🌅 Morning: Flight to Queenstown (8:00 AM)
- Scenic flight over Southern Alps
- Arrive in adventure capital
- Breakfast with mountain views

☀️ Afternoon: Adventure Activities (1:00 PM - 6:00 PM)
- Bungee jumping at Kawarau Bridge
- Jet boat ride on Shotover River
- Optional: Skydiving or paragliding

🌙 Evening: Queenstown (7:00 PM)
- Fergburger for dinner
- Walk around Lake Wakatipu
- Optional: Night zip-lining

**Day 4: Milford Sound**
🌅 Morning: Milford Sound Cruise (9:00 AM - 1:00 PM)
- Scenic drive through Fiordland
- Cruise through majestic fjords
- See waterfalls, dolphins, seals

☀️ Afternoon: Return Journey (2:00 PM - 6:00 PM)
- Stop at Mirror Lakes
- Visit Te Anau glowworm caves
- Return to Queenstown

🌙 Evening: Final Night (7:00 PM)
- Farewell dinner at Rata
- Optional: Stargazing tour
- Pack for departure

---
EXAMPLE 3 - FOOD & WELLNESS TRIP (5 days, Bali):
# 5-Day Bali Journey: Food & Wellness Enthusiast's Guide

**Day 1: Ubud Arrival**
🌅 Morning: Arrive in Ubud (9:00 AM)
- Check into wellness resort
- Morning yoga session
- Healthy breakfast with local fruits

☀️ Afternoon: Ubud Market & Cooking Class (2:00 PM - 6:00 PM)
- Visit traditional market
- Learn to cook Balinese dishes
- Visit rice terraces

🌙 Evening: Wellness (7:00 PM)
- Traditional Balinese massage
- Meditation session
- Light dinner at resort

**Day 2: Spiritual Ubud**
🌅 Morning: Sacred Monkey Forest (8:00 AM - 10:00 AM)
- Early visit to avoid crowds
- Temple exploration
- Monkey watching (keep distance)

☀️ Afternoon: Water Temple & Rice Fields (1:00 PM - 6:00 PM)
- Tirta Empul water purification
- Rice terrace hiking
- Traditional dance performance

🌙 Evening: Wellness (7:00 PM)
- Sound healing session
- Balinese tea ceremony
- Healthy dinner

**Day 3: Beach & Ocean**
🌅 Morning: Drive to Nusa Penida (8:00 AM)
- Early start for island adventure
- Snorkeling at Crystal Bay
- Visit Kelingking Beach

☀️ Afternoon: Island Exploration (2:00 PM - 6:00 PM)
- Angel's Billabong natural pool
- Broken Beach viewpoint
- Sunset at Diamond Beach

🌙 Evening: Return to Ubud (7:00 PM)
- Seafood dinner
- Relaxation at resort
- Optional: Night meditation

**Day 4: Cultural Immersion**
🌅 Morning: Traditional Village (9:00 AM - 12:00 PM)
- Visit local family compound
- Learn traditional crafts
- Participate in ceremonies

☀️ Afternoon: Art & Creativity (2:00 PM - 6:00 PM)
- Batik painting workshop
- Silver jewelry making
- Visit art galleries

🌙 Evening: Cultural Dinner (7:00 PM)
- Traditional Balinese feast
- Live gamelan music
- Cultural storytelling

**Day 5: Wellness & Departure**
🌅 Morning: Final Wellness (8:00 AM - 11:00 AM)
- Sunrise yoga
- Spa treatment
- Healthy brunch

☀️ Afternoon: Last Activities (1:00 PM - 5:00 PM)
- Visit local healer
- Final shopping
- Sunset meditation

🌙 Evening: Departure (7:00 PM)
- Farewell dinner
- Pack and prepare
- Optional: Night spa treatment

---
Now, based on these examples, create a ${days}-day trip plan for ${destination} for someone interested in ${interestsText}. 

Choose the most relevant example style and adapt it to your destination. Make sure to:
1. Follow the exact format and structure of the chosen example
2. Include specific timing, locations, and practical tips
3. Adapt activities to match the destination's unique features
4. Maintain the same level of detail and organization
5. Include cultural context and local insights

Provide a comprehensive, detailed itinerary that matches the quality and structure of the examples above.`;

    try {
      const result = await this.model.generateContent(prompt);
      return {
        type: 'multi-shot',
        plan: result.response.text(),
        prompt: prompt,
        examples: 'This approach provides multiple examples to help the AI understand different patterns and adapt to various trip types.',
        metadata: {
          method: 'multi-shot',
          examplesProvided: 3,
          exampleTypes: ['culture-history', 'adventure-nature', 'food-wellness'],
          adaptation: 'AI adapts the most relevant example style to the requested destination'
        }
      };
    } catch (error) {
      throw new Error(`Multi-shot prompting failed: ${error.message}`);
    }
  }

  getPromptType() {
    return 'multi-shot';
  }

  getDescription() {
    return 'Multi-shot prompting provides multiple examples to help the AI understand different patterns and adapt to various trip types.';
  }

  getExamples() {
    return {
      cultureHistory: 'Paris 3-day culture trip with detailed timing and cultural context',
      adventureNature: 'New Zealand 4-day adventure with thrill activities and nature exploration',
      foodWellness: 'Bali 5-day wellness journey with spiritual and cultural immersion'
    };
  }
}
