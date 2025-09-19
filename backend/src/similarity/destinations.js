import { GeminiEmbeddings } from '../embeddings/gemini.js';
import { rankBySimilarity } from '../utils/similarity.js';

const DEFAULT_DESTINATIONS = [
  { id: 'paris', name: 'Paris, France', summary: 'Art, cuisine, museums, romantic city walks, historic landmarks like Eiffel Tower and Louvre.' },
  { id: 'rome', name: 'Rome, Italy', summary: 'Ancient history, architecture, Italian cuisine, Vatican, Colosseum, lively piazzas.' },
  { id: 'tokyo', name: 'Tokyo, Japan', summary: 'Modern tech, traditional culture, sushi, anime, shrines, neon districts.' },
  { id: 'kyoto', name: 'Kyoto, Japan', summary: 'Temples, tea houses, geisha districts, gardens, cultural heritage.' },
  { id: 'barcelona', name: 'Barcelona, Spain', summary: 'Gaudí architecture, beaches, tapas, vibrant nightlife, art and design.' },
  { id: 'bali', name: 'Bali, Indonesia', summary: 'Beaches, temples, surfing, yoga, rice terraces, wellness retreats.' },
  { id: 'new-york', name: 'New York, USA', summary: 'Skyscrapers, museums, Broadway, diverse food, fast-paced urban life.' }
];

export class DestinationSimilarityService {
  constructor({ apiKey, destinations = DEFAULT_DESTINATIONS } = {}) {
    this.embeddings = new GeminiEmbeddings(apiKey);
    this.destinations = destinations;
    this.destinationEmbeddings = new Map();
  }

  async ensureCatalogEmbeddings() {
    if (this.destinationEmbeddings.size === this.destinations.length) return;
    for (const dest of this.destinations) {
      if (!this.destinationEmbeddings.has(dest.id)) {
        const emb = await this.embeddings.embedText(`${dest.name}. ${dest.summary}`);
        this.destinationEmbeddings.set(dest.id, emb);
      }
    }
  }

  async findSimilar({ query, topK = 5 }) {
    await this.ensureCatalogEmbeddings();
    const queryEmbedding = await this.embeddings.embedText(query);
    const ranked = rankBySimilarity(queryEmbedding, this.destinations, d => this.destinationEmbeddings.get(d.id) || []);
    return ranked.slice(0, topK);
  }
} 