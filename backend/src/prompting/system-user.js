// System and User Prompt Module
// This module implements RTFC framework with system and user prompts

export class SystemUserPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) ? interests.join(', ') : interests;
    
    // RTFC Framework: Role, Task, Format, Context
    const systemPrompt = `You are an expert travel planner with deep knowledge of global destinations, cultural practices, and practical travel logistics. Your role is to create comprehensive, personalized trip itineraries that balance must-see attractions with authentic local experiences.

**Your Expertise:**
- Cultural sensitivity and local customs understanding
- Practical travel logistics and timing optimization
- Insider knowledge of destinations and hidden gems
- Budget-conscious yet quality-focused recommendations
- Safety and accessibility considerations

**Your Approach:**
- Always consider local culture, customs, and etiquette
- Provide practical tips for each activity (booking, timing, costs)
- Include both popular attractions and off-the-beaten-path experiences
- Consider seasonal factors and local events
- Balance structured activities with free time for exploration

**Output Quality Standards:**
- Detailed daily schedules with specific timing
- Realistic activity durations and travel times
- Practical booking information and costs
- Cultural context and local insights
- Safety tips and accessibility notes`;

    const userPrompt = `**TASK:** Create a comprehensive ${days}-day trip plan for ${destination} specifically designed for someone interested in ${interestsText}.

**REQUIREMENTS:**
1. **Daily Structure:** Organize each day with morning, afternoon, and evening sections
2. **Timing Details:** Include specific times, durations, and travel logistics
3. **Cultural Context:** Explain why each activity is recommended for this destination
4. **Practical Tips:** Provide booking information, costs, and insider advice
5. **Local Insights:** Include cultural customs, etiquette, and local secrets
6. **Safety & Accessibility:** Note any important considerations for travelers

**FORMAT:**
- Clear day-by-day breakdown
- Specific timing for each activity
- Practical booking and cost information
- Cultural context and local insights
- Safety tips and accessibility notes
- Optional activities and alternatives

**CONTEXT:** This should be a comprehensive, practical guide that someone could follow step-by-step while respecting local culture and maximizing their experience in ${destination}.`;

    const fullPrompt = `${systemPrompt}

---

${userPrompt}

Please provide a detailed, practical itinerary that follows these requirements exactly.`;

    try {
      const result = await this.model.generateContent(fullPrompt);
      return {
        type: 'system-user',
        plan: result.response.text(),
        prompt: fullPrompt,
        framework: 'RTFC (Role, Task, Format, Context)',
        metadata: {
          method: 'system-user',
          framework: 'RTFC',
          role: 'Expert travel planner with cultural expertise',
          task: `Create ${days}-day trip plan for ${destination}`,
          format: 'Daily structure with timing, cultural context, and practical tips',
          context: 'Comprehensive, practical guide respecting local culture'
        }
      };
    } catch (error) {
      throw new Error(`System-user prompting failed: ${error.message}`);
    }
  }

  getPromptType() {
    return 'system-user';
  }

  getDescription() {
    return 'System and user prompts using RTFC framework provide clear role definition and specific task requirements.';
  }

  getFramework() {
    return {
      name: 'RTFC Framework',
      components: {
        role: 'Clear definition of AI assistant capabilities and expertise',
        task: 'Specific, actionable requirements for the output',
        format: 'Detailed structure and organization guidelines',
        context: 'Background information and constraints'
      },
      benefits: [
        'Clear role definition prevents confusion',
        'Specific task requirements ensure quality',
        'Structured format improves consistency',
        'Context provides necessary background'
      ]
    };
  }

  getRoleDefinition() {
    return {
      expertise: [
        'Global destinations knowledge',
        'Cultural sensitivity',
        'Practical travel logistics',
        'Local customs understanding',
        'Budget-conscious recommendations'
      ],
      approach: [
        'Cultural consideration first',
        'Practical tips included',
        'Balanced recommendations',
        'Seasonal awareness',
        'Safety and accessibility focus'
      ]
    };
  }

  getTaskRequirements() {
    return {
      structure: 'Daily breakdown with timing',
      content: 'Cultural context and practical tips',
      quality: 'Comprehensive and actionable',
      format: 'Clear and organized presentation'
    };
  }
}
