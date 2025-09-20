// Zero-shot prompting module
// This module handles zero-shot prompting without providing examples

export class ZeroShotPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) 
      ? interests.join(', ') 
      : String(interests);

    const prompt = `Plan a ${days}-day trip to ${destination} for someone interested in ${interestsText}. 
    
Provide a comprehensive daily itinerary with:
- Morning, afternoon, and evening activities
- Restaurant recommendations with cuisine types
- Cultural tips and local insights
- Practical travel advice
- Must-see attractions and hidden gems

Make it detailed, practical, and well-structured for travelers.`;

    try {
      const result = await this.model.generateContent(prompt);
      return {
        type: 'zero-shot',
        plan: result.response.text(),
        prompt: prompt
      };
    } catch (error) {
      throw new Error(`Zero-shot prompting failed: ${error.message}`);
    }
  }

  getPromptType() {
    return 'zero-shot';
  }
}
