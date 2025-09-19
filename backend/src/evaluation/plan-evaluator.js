import { GoogleGenerativeAI } from '@google/generative-ai';

export class PlanEvaluator {
  constructor(apiKey) {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  basicHeuristics(planText) {
    const score = {
      structure: 0,
      detail: 0,
      practicality: 0,
      tips: 0
    };
    if (/##\s*Day\s*1/i.test(planText)) score.structure += 0.5;
    if (/Morning:/i.test(planText) && /Afternoon:/i.test(planText) && /Evening:/i.test(planText)) score.structure += 0.5;
    const bulletCount = (planText.match(/^-\s/mg) || []).length;
    score.detail = Math.min(1, bulletCount / 12);
    if (/Tip:/i.test(planText) || /Tips:/i.test(planText)) score.tips = 1;
    if (/book|tickets|timing|weather|transport|metro|reservation|budget/i.test(planText)) score.practicality = 1;
    const total = (score.structure + score.detail + score.practicality + score.tips) / 4;
    return { score: Number(total.toFixed(2)), breakdown: score };
  }

  async llmCritique(planText, userContext) {
    const prompt = `You are an expert travel planner. Critique the following itinerary for quality, practicality, and completeness.

User context: ${JSON.stringify(userContext || {})}

Itinerary:
${planText}

Provide JSON with fields: overallScore (0-1), strengths (array), weaknesses (array), suggestions (array). Keep it concise.`;
    const res = await this.model.generateContent(prompt);
    return res.response.text();
  }

  async evaluate(planText, userContext) {
    const heur = this.basicHeuristics(planText);
    let critique;
    try {
      critique = await this.llmCritique(planText, userContext);
    } catch (e) {
      critique = JSON.stringify({ overallScore: heur.score, strengths: [], weaknesses: [], suggestions: ['LLM critique unavailable'] });
    }
    return { heuristics: heur, critique };
  }
} 