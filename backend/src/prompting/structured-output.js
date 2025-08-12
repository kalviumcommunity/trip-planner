// Structured Output Module
// This module implements structured output with JSON schema

export class StructuredOutputPrompting {
  constructor(aiModel) {
    this.model = aiModel;
  }

  async generateTripPlan(destination, days, interests) {
    const interestsText = Array.isArray(interests) 
      ? interests.join(', ') 
      : String(interests);

    const prompt = `Create a ${days}-day trip plan for ${destination} for someone interested in ${interestsText}.

IMPORTANT: You must respond with ONLY valid JSON in the exact format specified below. Do not include any other text, explanations, or markdown formatting.

Required JSON Schema:
{
  "tripPlan": {
    "destination": "${destination}",
    "duration": ${days},
    "interests": "${interestsText}",
    "summary": "Brief overview of the trip",
    "days": [
      {
        "day": 1,
        "theme": "Theme for this day",
        "morning": {
          "activities": [
            {
              "time": "09:00",
              "activity": "Activity description",
              "location": "Location name",
              "duration": "2 hours",
              "tips": "Any tips or notes"
            }
          ],
          "lunch": {
            "time": "12:00",
            "restaurant": "Restaurant name",
            "cuisine": "Cuisine type",
            "specialty": "What they're known for",
            "booking": "Booking requirements"
          }
        },
        "afternoon": {
          "activities": [
            {
              "time": "14:00",
              "activity": "Activity description",
              "location": "Location name",
              "duration": "1.5 hours",
              "tips": "Any tips or notes"
            }
          ]
        },
        "evening": {
          "activities": [
            {
              "time": "18:00",
              "activity": "Activity description",
              "location": "Location name",
              "duration": "1 hour",
              "tips": "Any tips or notes"
            }
          ],
          "dinner": {
            "time": "19:00",
            "restaurant": "Restaurant name",
            "cuisine": "Cuisine type",
            "specialty": "What they're known for",
            "booking": "Booking requirements"
          }
        },
        "dailyTip": "A practical tip for this day",
        "localSecret": "A hidden gem or local secret for this day"
      }
    ],
    "generalTips": [
      "General travel tip 1",
      "General travel tip 2"
    ],
    "culturalNotes": [
      "Cultural consideration 1",
      "Cultural consideration 2"
    ],
    "budgetEstimates": {
      "accommodation": "Budget range per night",
      "food": "Daily food budget",
      "activities": "Daily activity budget",
      "transportation": "Daily transportation budget"
    }
  }
}

Remember: Respond with ONLY the JSON object. No additional text, no markdown, no explanations.`;

    try {
      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Try to parse the JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (parseError) {
        // If parsing fails, try to extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to generate valid JSON response');
        }
      }

      return {
        type: 'structured-output',
        plan: parsedResponse,
        rawResponse: responseText,
        prompt: prompt,
        format: 'JSON',
        reasoning: 'Structured output provides machine-readable data that can be easily parsed and displayed'
      };
    } catch (error) {
      throw new Error(`Structured output prompting failed: ${error.message}`);
    }
  }

  getPromptType() {
    return 'structured-output';
  }

  getDescription() {
    return 'Structured output returns data in JSON format for easy parsing and programmatic use.';
  }
}
