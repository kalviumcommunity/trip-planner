export function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error('cosineSimilarity expects two numeric arrays');
  }
  if (a.length === 0 || b.length === 0) return 0;
  const len = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < len; i++) {
    const va = Number(a[i]) || 0;
    const vb = Number(b[i]) || 0;
    dot += va * vb;
    normA += va * va;
    normB += vb * vb;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function rankBySimilarity(queryEmbedding, items, getEmbedding) {
  return items
    .map((item) => {
      const emb = getEmbedding(item);
      return { item, score: cosineSimilarity(queryEmbedding, emb) };
    })
    .sort((a, b) => b.score - a.score);
} 