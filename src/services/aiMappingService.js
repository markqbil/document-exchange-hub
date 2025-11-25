/**
 * AI Mapping Service - AWS Bedrock Integration
 *
 * This service provides intelligent mapping suggestions using:
 * 1. Phase 1: Embeddings for semantic similarity (cost-effective)
 * 2. Phase 2: LLM for complex cases (optional, higher cost)
 *
 * Cost breakdown (AWS Bedrock):
 * - Titan Embeddings: $0.0001 per 1K tokens (~$0.01 per 1000 mappings)
 * - Claude Haiku: $0.003 per 1K tokens (~$0.30 per 1000 mappings)
 */

const USE_AI_MAPPING = process.env.REACT_APP_USE_AI_MAPPING === 'true';
const AWS_REGION = process.env.REACT_APP_AWS_REGION || 'us-east-1';

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const norm = Math.sqrt(normA) * Math.sqrt(normB);
  return norm === 0 ? 0 : dotProduct / norm;
}

/**
 * Simple fuzzy matching fallback (when AI is disabled)
 */
function fuzzyMatch(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 1.0;

  // Contains match
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.85;
  }

  // Calculate Levenshtein distance similarity
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Get embedding from AWS Bedrock Titan Embeddings
 * Cost: $0.0001 per 1K tokens (very cheap)
 */
async function getEmbedding(text) {
  if (!USE_AI_MAPPING) {
    return null;
  }

  try {
    // This would use AWS SDK in production
    // For now, we'll simulate it
    console.log('[AI] Would get embedding for:', text);

    // In production, use:
    /*
    const { BedrockRuntimeClient, InvokeModelCommand } = await import('@aws-sdk/client-bedrock-runtime');

    const client = new BedrockRuntimeClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
      }
    });

    const command = new InvokeModelCommand({
      modelId: "amazon.titan-embed-text-v1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: text
      })
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.embedding; // Array of 1536 numbers
    */

    return null;
  } catch (error) {
    console.error('[AI] Embedding error:', error);
    return null;
  }
}

/**
 * Get LLM suggestion from AWS Bedrock Claude
 * Cost: $0.003 per 1K tokens (use sparingly)
 */
async function getLLMSuggestion(theirItem, availableOptions, mappingType) {
  if (!USE_AI_MAPPING) {
    return null;
  }

  try {
    console.log('[AI] Would get LLM suggestion for:', theirItem.code);

    // In production, use:
    /*
    const { BedrockRuntimeClient, InvokeModelCommand } = await import('@aws-sdk/client-bedrock-runtime');

    const client = new BedrockRuntimeClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
      }
    });

    const prompt = `You are a B2B data mapping expert. Find the best match for this ${mappingType}.

Supplier's ${mappingType}:
Code: "${theirItem.code}"
Description: "${theirItem.description}"

Available internal ${mappingType}s:
${availableOptions.slice(0, 20).map((opt, i) =>
  `${i + 1}. Code: ${opt.code}, Description: ${opt.description}`
).join('\n')}

Respond in JSON format:
{
  "matchedCode": "best matching code or null",
  "confidence": 85,
  "reasoning": "brief explanation"
}`;

    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 500,
        messages: [{
          role: "user",
          content: prompt
        }],
        temperature: 0.3
      })
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const result = JSON.parse(responseBody.content[0].text);
    return result;
    */

    return null;
  } catch (error) {
    console.error('[AI] LLM error:', error);
    return null;
  }
}

/**
 * Suggest mapping using hybrid approach:
 * 1. Try exact match (free, instant)
 * 2. Try fuzzy match (free, fast)
 * 3. Try embeddings if available (cheap, accurate)
 * 4. Try LLM for low confidence cases (expensive, very accurate)
 */
export async function suggestMapping(theirItem, availableOptions, mappingType = 'product', existingMappings = []) {
  // Build search text
  const theirText = `${theirItem.code} ${theirItem.description}`.toLowerCase();

  // Step 1: Exact match (free)
  const exactMatch = availableOptions.find(opt =>
    opt.code.toLowerCase() === theirItem.code.toLowerCase()
  );

  if (exactMatch) {
    return {
      matched: exactMatch,
      confidence: 100,
      method: 'exact',
      reasoning: 'Exact code match'
    };
  }

  // Step 2: Check historical mappings (free, high confidence)
  const historical = existingMappings.find(m =>
    m.mappingType === mappingType &&
    (m.theirCode.toLowerCase() === theirItem.code.toLowerCase() ||
     m.theirDescription.toLowerCase() === theirItem.description.toLowerCase())
  );

  if (historical) {
    const matched = availableOptions.find(opt => opt.id === historical.ourRootDataId);
    if (matched) {
      return {
        matched,
        confidence: Math.min(historical.confidence + 5, 100), // Boost confidence
        method: 'historical',
        reasoning: `Previously mapped ${historical.usage} times`
      };
    }
  }

  // Step 3: Fuzzy matching (free, medium confidence)
  let bestMatch = null;
  let bestScore = 0;

  for (const option of availableOptions) {
    const optionText = `${option.code} ${option.description}`.toLowerCase();

    // Calculate similarity
    const codeSimilarity = fuzzyMatch(theirItem.code, option.code);
    const descSimilarity = fuzzyMatch(theirItem.description, option.description);

    // Weight: code 40%, description 60%
    const score = (codeSimilarity * 0.4) + (descSimilarity * 0.6);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = option;
    }
  }

  // If fuzzy match is good enough, return it
  if (bestScore >= 0.8) {
    return {
      matched: bestMatch,
      confidence: Math.round(bestScore * 100),
      method: 'fuzzy',
      reasoning: 'High similarity match'
    };
  }

  // Step 4: Embeddings (cheap, if enabled)
  if (USE_AI_MAPPING && bestScore < 0.8) {
    const embedding = await getEmbedding(theirText);
    if (embedding) {
      // Calculate similarity with all options
      for (const option of availableOptions) {
        const optionEmbedding = await getEmbedding(`${option.code} ${option.description}`);
        if (optionEmbedding) {
          const similarity = cosineSimilarity(embedding, optionEmbedding);
          if (similarity > bestScore) {
            bestScore = similarity;
            bestMatch = option;
          }
        }
      }

      if (bestScore >= 0.75) {
        return {
          matched: bestMatch,
          confidence: Math.round(bestScore * 100),
          method: 'embedding',
          reasoning: 'Semantic similarity match'
        };
      }
    }
  }

  // Step 5: LLM for difficult cases (expensive, use sparingly)
  if (USE_AI_MAPPING && bestScore < 0.7) {
    const llmResult = await getLLMSuggestion(theirItem, availableOptions, mappingType);
    if (llmResult && llmResult.matchedCode) {
      const matched = availableOptions.find(opt => opt.code === llmResult.matchedCode);
      if (matched) {
        return {
          matched,
          confidence: llmResult.confidence,
          method: 'llm',
          reasoning: llmResult.reasoning
        };
      }
    }
  }

  // Return best fuzzy match even if confidence is low
  if (bestMatch) {
    return {
      matched: bestMatch,
      confidence: Math.round(bestScore * 100),
      method: 'fuzzy',
      reasoning: 'Best available match (manual review recommended)'
    };
  }

  // No match found
  return {
    matched: null,
    confidence: 0,
    method: 'none',
    reasoning: 'No suitable match found'
  };
}

/**
 * Batch suggest mappings for multiple items
 */
export async function batchSuggestMappings(items, availableOptions, mappingType = 'product', existingMappings = []) {
  const results = [];

  for (const item of items) {
    const suggestion = await suggestMapping(item, availableOptions, mappingType, existingMappings);
    results.push({
      item,
      suggestion
    });
  }

  return results;
}

/**
 * Learn from user corrections
 */
export async function learnFromCorrection(originalMapping, correctedCode, userId) {
  console.log('[AI] Learning from correction:', {
    original: originalMapping.ourCode,
    corrected: correctedCode,
    user: userId
  });

  // In production, this would:
  // 1. Log the correction to a database
  // 2. Update confidence scores
  // 3. Optionally: queue for model fine-tuning

  return {
    success: true,
    message: 'Correction logged for future learning'
  };
}

export default {
  suggestMapping,
  batchSuggestMappings,
  learnFromCorrection
};
