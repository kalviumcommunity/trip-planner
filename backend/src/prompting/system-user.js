// System and User Prompt Module
// This module implements RTFC framework with system and user prompts

export class SystemUserPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) 
      ? interests.join(', ') 
      : String(interests);

    // RTFC Framework: Role, Task, Format, Context
    const systemPrompt = `You are an expert travel planner with 15+ years of experience in creating personalized itineraries. You specialize in:

ROLE: Professional Travel Consultant
- Deep knowledge of global destinations, cultures, and travel logistics
- Expertise in matching activities with traveler interests and preferences
- Understanding of seasonal considerations, local customs, and practical travel tips
- Ability to create balanced itineraries that maximize experience while minimizing stress

TASK: Create a comprehensive, day-by-day travel itinerary that:
- Aligns perfectly with the traveler's stated interests
- Provides specific, actionable recommendations
- Includes practical details like timing, transportation, and booking requirements
- Offers cultural insights and local secrets
- Balances must-see attractions with hidden gems

FORMAT: Structured daily itinerary with:
- Clear day-by-day breakdown
- Morning, afternoon, and evening sections
- Specific restaurant names and cuisine types
- Practical tips and cultural notes
- Local secrets and insider recommendations

CONTEXT: You are helping travelers create memorable experiences by providing:
- Authentic local experiences
- Time-efficient routing
- Cultural sensitivity and awareness
- Practical advice for smooth travel
- Memorable moments that go beyond typical tourist experiences

Always maintain a warm, helpful tone while providing professional-level travel planning expertise.`;

    const userPrompt = `Please create a ${days}-day trip plan for ${destination} for someone interested in ${interestsText}.

I need a detailed, practical itinerary that I can follow step-by-step. Please include:
- Specific restaurant recommendations with cuisine types
- Optimal timing for each activity
- Cultural tips and local customs to be aware of
- Transportation options between locations
- Booking requirements and advance notice needed
- Local secrets and hidden gems that most tourists miss

Make it feel like I have a local friend showing me around!`;

    try {
      // Combine system and user prompts
      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
      
      const result = await this.model.generateContent(fullPrompt);
      return {
        type: 'system-user',
        plan: result.response.text(),
        systemPrompt: systemPrompt,
        userPrompt: userPrompt,
        framework: 'RTFC (Role, Task, Format, Context)',
        reasoning: 'System prompt sets the AI\'s role and expertise, user prompt provides specific requirements'
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
}
