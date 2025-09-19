import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = 'text-embedding-004';

export class GeminiEmbeddings {
  constructor(apiKey) {
    if (!apiKey) throw new Error('Missing GOOGLE_API_KEY for embeddings');
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({ model: MODEL_NAME });
  }

  async embedText(text) {
    if (!text || typeof text !== 'string') return [];
    const result = await this.model.embedContent(text);
    return result?.embedding?.values || [];
  }

  async embedMany(texts) {
    const outputs = [];
    for (const t of texts) {
      // Sequential to avoid rate limits; can be parallelized with care
      const emb = await this.embedText(t);
      outputs.push(emb);
    }
    return outputs;
  }
} 