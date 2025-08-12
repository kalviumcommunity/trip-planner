// Chain of Thought Prompting Module
// This module implements chain-of-thought prompting to show step-by-step reasoning

export class ChainOfThoughtPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) 
      ? interests.join(', ') 
      : String(interests);

    const prompt = `Let me plan a ${days}-day trip to ${destination} for someone interested in ${interestsText}.

Let me think through this step by step:

1. First, I need to understand what makes ${destination} special for ${interestsText} interests.
2. Then, I'll consider the optimal order of activities based on location and timing.
3. Next, I'll think about cultural context and local customs.
4. Finally, I'll organize everything into a practical daily schedule.

Let me start planning:

**Step 1: Understanding ${destination} for ${interestsText}**
${destination} is known for [AI will fill this based on destination and interests]. The key attractions that align with these interests are:

**Step 2: Activity Planning Logic**
- Morning activities should focus on [AI will reason about optimal timing]
- Afternoon should include [AI will explain the reasoning]
- Evening activities should consider [AI will think about practical factors]

**Step 3: Cultural and Practical Considerations**
- Local customs to be aware of: [AI will identify cultural aspects]
- Best times to visit attractions: [AI will reason about timing]
- Transportation considerations: [AI will think about logistics]

**Step 4: Final Organized Itinerary**

Now, based on this reasoning, here's the complete ${days}-day trip plan:

[AI will now provide the detailed itinerary following the above reasoning]`;

    try {
      const result = await this.model.generateContent(prompt);
      return {
        type: 'chain-of-thought',
        plan: result.response.text(),
        prompt: prompt,
        reasoning: 'This approach shows step-by-step thinking process'
      };
    } catch (error) {
      throw new Error(`Chain-of-thought prompting failed: ${error.message}`);
    }
  }

  getPromptType() {
    return 'chain-of-thought';
  }

  getDescription() {
    return 'Chain-of-thought prompting shows the AI\'s reasoning process step-by-step, making the output more transparent and logical.';
  }
}
