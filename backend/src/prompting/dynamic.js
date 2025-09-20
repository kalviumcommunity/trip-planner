// Dynamic Prompting Module
// This module implements dynamic prompting that adapts based on various factors

export class DynamicPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan (destination, days, interests, budget = 'medium', season = 'any', groupSize = 1) {
    const interestsText = Array.isArray(interests) 
      ? interests.join(', ') 
      : String(interests);

    // Dynamic prompt construction based on parameters
    const budgetContext =this.getBudgetContext(budget);
    const seasonContext =this.getSeasonContext(season);
    const groupContext = this.getGroupContext(groupSize);
    const durationContext = this.getDurationContext(days);

    const prompt = `Create a ${days}-day trip plan for ${destination} for someone interested in ${interestsText}.

${budgetContext}

${seasonContext}

${groupContext}

${durationContext}

**Special Considerations:**
- Adapt the activities based on the above factors
- Also include budget-friendly alternatives if applicable
- Consider seasonal availability and weather
- Adjust recommendations for group dynamics
- Provide flexible options for different preferences

**Required Format:**
# ${days}-Day ${destination} Adventure: ${interestsText} Guide

[AI will now create a detailed itinerary that considers all the dynamic factors above]`;

    try {
      const result = await this.model.generateContent(prompt);
      return {
        type: 'dynamic',
        plan: result.response.text(),
        prompt: prompt,
        parameters: {
          destination,
          days,
          interests,
          budget,
          season,
          groupSize
        },
        reasoning: 'Dynamic prompting adapts the output based on multiple contextual factors'
      };
    } catch (error) {
      throw new Error(`Dynamic prompting failed: ${error.message}`);
    }
  }

  getBudgetContext(budget) {
    const contexts = {
      low: '**Budget Level: Low** - Focus on free/affordable activities, budget accommodations, local eateries, and public transportation. Include money-saving tips and alternative options.',
      medium: '**Budget Level: Medium** - Mix of free and paid activities, mid-range restaurants, comfortable accommodations, and a balance of public and private transportation.',
      high: '**Budget Level: High** - Premium experiences, fine dining, luxury accommodations, private tours, and exclusive access to attractions.'
    };
    return contexts[budget] || contexts.medium;
  }

  getSeasonContext(season) {
    const contexts = {
      spring: '**Season: Spring** - Consider blooming flowers, mild weather, spring festivals, and outdoor activities. Include seasonal attractions and weather-appropriate recommendations.',
      summer: '**Season: Summer** - Focus on outdoor activities, beach destinations, summer festivals, and activities that take advantage of longer daylight hours.',
      autumn: '**Season: Autumn** - Consider fall foliage, harvest festivals, indoor activities for cooler weather, and seasonal food specialties.',
      winter: '**Season: Winter** - Include indoor attractions, winter sports if applicable, holiday events, and weather-appropriate clothing recommendations.',
      any: '**Season: Any** - Provide year-round recommendations with seasonal variations and best times to visit specific attractions.'
    };
    return contexts[season] || contexts.any;
  }

  getGroupContext(groupSize) {
    if (groupSize === 1) {
      return '**Group Size: Solo Traveler** - Focus on activities suitable for solo exploration, safety considerations, and opportunities to meet locals and other travelers.';
    } else if (groupSize <= 4) {
      return '**Group Size: Small Group (${groupSize} people)** - Include activities that work well for small groups, restaurant recommendations for group dining, and shared transportation options.';
    } else {
      return '**Group Size: Large Group (${groupSize} people)** - Consider group dynamics, activities that can accommodate larger numbers, advance booking requirements, and group discounts.';
    }
  }

  getDurationContext(days) {
    if (days <= 2) {
      return '**Duration: Short Trip (${days} days)** - Focus on must-see highlights, efficient routing between attractions, and making the most of limited time. Include quick meal options and time-saving tips.';
    } else if (days <= 5) {
      return '**Duration: Medium Trip (${days} days)** - Balance between major attractions and hidden gems. Include some relaxation time and deeper cultural experiences.';
    } else {
      return '**Duration: Extended Trip (${days} days)** - Include comprehensive exploration, off-the-beaten-path destinations, multiple day trips, and opportunities for deeper cultural immersion.';
    }
  }

  getPromptType() {
    return 'dynamic';
  }

  getDescription() {
    return 'Dynamic prompting adapts the output based on multiple contextual factors like budget, season, group size, and duration.';
  }
}
