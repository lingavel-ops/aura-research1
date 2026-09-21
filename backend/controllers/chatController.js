/**
 * AI Research - Central Chat & AI Controller
 * Handles intelligent routing between Google Gemini API and OpenAlex API.
 * Features multi-turn context resolution, academic literature synthesis, and error resilience.
 */

import {
  generateResponse,
  synthesizeResearchAnswer,
  sendMessage,
  summarizeText,
  analyzeText
} from '../services/aiService.js';
import { searchOpenAlexPapers } from '../services/openalexService.js';

/**
 * Regex patterns identifying academic and research paper retrieval intent.
 */
const RESEARCH_INTENT_PATTERNS = [
  /\b(?:research|academic|scholarly|scientific)\s+(?:papers?|articles?|studies|publications?|literature|works?)\b/i,
  /\b(?:find|search|get|show|list|recommend|give\s+me|provide)\s+(?:(?:some|recent|top|major|latest|all)\s+)?(?:papers?|articles?|publications?|studies|sources?|literature)\b/i,
  /\b(?:who\s+(?:are|wrote|authored)|authors?|researchers?|scientists?)\s+(?:researching|studying|working\s+on|publishing|writing\s+about)\b/i,
  /\b(?:literature\s+review|state\s+of\s+the\s+art|sota|bibliograph(?:y|ic))\b/i,
  /\b(?:citations?|cited\s+by|h-index|impact\s+factor|doi)\b/i,
  /\b(?:journals?|proceedings?|conferences?|peer-reviewed|ieee|acm|nature|springer|arxiv|openalex)\b/i,
  /\b(?:research\s+topics?|research\s+directions?|research\s+questions?|research\s+methodolog(?:y|ies))\b/i,
  /\b(?:recent|latest)\s+research\b/i,
  /\b(?:papers?\s+about|papers?\s+on|studies\s+on|studies\s+about|publications?\s+on)\b/i,
  /\b(?:research\s+papers?|academic\s+sources?)\b/i
];

/**
 * Determine if a user query requires scholarly literature retrieval from OpenAlex.
 */
function isResearchIntent(text) {
  if (!text || typeof text !== 'string') return false;
  return RESEARCH_INTENT_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Extract clean academic topic keywords for OpenAlex search, resolving multi-turn context.
 */
function extractSearchTopic(query, history = []) {
  // Strip punctuation and normalize whitespace
  let cleaned = (query || '')
    .replace(/[?!.,;:"'()[\]{}]/g, ' ')
    .replace(/\b(?:find|search|get|show|list|give\s+me|recommend|provide|tell\s+me\s+about|can\s+you\s+find|give\s+me\s+recent|find\s+papers\s+about|find\s+papers\s+on)\b/gi, ' ')
    .replace(/\b(?:research\s+papers?|academic\s+papers?|scholarly\s+articles?|recent\s+papers?|papers?|articles?|publications?|studies|literature)\b/gi, ' ')
    .replace(/\b(?:who\s+are\s+the\s+major\s+authors\s+researching|major\s+authors\s+in|authors\s+researching|authors\s+of|authors?|researchers?)\b/gi, ' ')
    .replace(/\b(?:about|on|for|regarding|in\s+the\s+field\s+of|related\s+to)\b/gi, ' ')
    .replace(/[^\w\s\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Check if query is anaphoric (e.g. "it", "this", "that", "these", "them", "recent", empty)
  const isAnaphoric = !cleaned || /^(?:it|this|that|these|them|the\s+same|above|previous|recent|latest|more|more\s+about\s+it)$/i.test(cleaned);

  if (isAnaphoric && Array.isArray(history) && history.length > 0) {
    // 1. Scan backwards for the most recent user prompt to extract the primary subject
    for (let i = history.length - 1; i >= 0; i--) {
      const item = history[i];
      const isUser = (typeof item !== 'string') && (item.role === 'user' || item.sender === 'user');
      if (isUser) {
        const text = item.content || item.text || '';
        const subject = text
          .replace(/[?!.,;:"'()[\]{}]/g, ' ')
          .replace(/^(?:what\s+is|what\s+are|explain|describe|tell\s+me\s+about|how\s+does|how\s+do|can\s+you\s+explain|give\s+me|show\s+me)\s+/i, ' ')
          .replace(/\b(?:in\s+detail|briefly|in\s+simple\s+words|in\s+tamil|overview|summary)\b/gi, ' ')
          .replace(/[^\w\s\-]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (subject && subject.length >= 2 && !/^(?:it|this|that|yes|no|ok|thanks|hello|hi)$/i.test(subject)) {
          cleaned = subject;
          break;
        }
      }
    }

    // 2. If no user message subject found, extract the concise title phrase from assistant message
    if (!cleaned || isAnaphoric) {
      for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        let prevText = typeof item === 'string' ? item : (item.content || item.text || '');
        if (!prevText) continue;

        const firstSentence = prevText.split(/[.\n!?;]/)[0] || '';
        const subject = firstSentence
          .replace(/[*#_`]/g, '')
          .replace(/^(?:what\s+is|what\s+are|explain|describe|tell\s+me\s+about)\s+/i, '')
          .replace(/[^\w\s\-]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .slice(0, 5)
          .join(' ');

        if (subject && subject.length >= 2 && !/^(?:it|this|that|yes|no|ok|thanks|hello|hi)$/i.test(subject)) {
          cleaned = subject;
          break;
        }
      }
    }
  }

  // Ensure topic is clean and bounded to max 8 words for accurate OpenAlex indexing
  const words = (cleaned || query).replace(/[?!.,;:"'()[\]{}]/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
  return words.slice(0, 8).join(' ');
}

/**
 * Handle general conversation and research queries with intelligent routing and multi-turn context.
 * POST /api/chat or POST /api/chat/message
 */
export async function handleChat(req, res) {
  const { message, prompt, domain, folderName, paperContext, history, temperature, maxTokens } = req.body;
  const userText = message || prompt;

  if (!userText || typeof userText !== 'string' || !userText.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Chat message or prompt is required.'
    });
  }

  const cleanMessage = userText.trim();
  const normalizedHistory = Array.isArray(history) ? history : [];
  const activeDomain = domain || 'AI & Computer Science';
  const activeFolder = folderName || 'AI Research';

  // 1. INTELLIGENT ROUTING: Determine if academic/research retrieval is needed
  const isAcademic = isResearchIntent(cleanMessage);

  if (isAcademic) {
    // Academic & Research Workflow: OpenAlex API -> Gemini API
    const topic = extractSearchTopic(cleanMessage, normalizedHistory);
    console.log(`[chatController] Research query detected: "${cleanMessage}" -> Resolved Topic: "${topic}"`);

    let openAlexResults = [];
    let openAlexError = null;

    try {
      const searchRes = await searchOpenAlexPapers(topic, 8);
      openAlexResults = searchRes.works || [];
    } catch (oaErr) {
      console.warn('[chatController] OpenAlex fetch warning:', oaErr.message);
      openAlexError = oaErr.message;
    }

    // Pass retrieved OpenAlex literature as rich research context to Google Gemini
    try {
      const geminiResult = await synthesizeResearchAnswer({
        query: cleanMessage,
        papers: openAlexResults,
        domain: activeDomain,
        folderName: activeFolder,
        history: normalizedHistory,
        temperature: typeof temperature === 'number' ? temperature : 0.6
      });

      if (geminiResult.success) {
        return res.status(200).json({
          success: true,
          reply: geminiResult.reply,
          sources: openAlexResults,
          isResearch: true,
          topic,
          provider: geminiResult.provider,
          model: geminiResult.model,
          timestamp: geminiResult.timestamp
        });
      } else {
        // If Gemini failed but OpenAlex succeeded, return retrieved papers gracefully
        if (openAlexResults.length > 0) {
          const fallbackSummary = `### Retrieved Academic Literature for "${topic}"\n\n` +
            `We retrieved ${openAlexResults.length} peer-reviewed papers from OpenAlex:\n\n` +
            openAlexResults.map((p, i) => `${i + 1}. **${p.title}** (${p.year}) - *${p.authors}*\n   Venue: ${p.journal} | [View Paper](${p.openAccessUrl || p.url})`).join('\n\n');

          return res.status(200).json({
            success: true,
            reply: fallbackSummary,
            sources: openAlexResults,
            isResearch: true,
            topic,
            provider: 'OpenAlex Academic Index',
            timestamp: new Date().toISOString()
          });
        }

        return res.status(500).json({
          success: false,
          message: geminiResult.reply || 'Failed to synthesize research response.'
        });
      }
    } catch (geminiErr) {
      console.error('[chatController] Gemini synthesis error:', geminiErr);
      
      // Resilient fallback: Return OpenAlex sources if available
      if (openAlexResults.length > 0) {
        const fallbackSummary = `### Retrieved Academic Sources for "${topic}"\n\n` +
          `Found ${openAlexResults.length} relevant scholarly publications via OpenAlex:\n\n` +
          openAlexResults.map((p, i) => `- **${p.title}** (${p.year}) by ${p.authors} (*${p.journal}*)`).join('\n');

        return res.status(200).json({
          success: true,
          reply: fallbackSummary,
          sources: openAlexResults,
          isResearch: true,
          provider: 'OpenAlex Scholarly Engine',
          timestamp: new Date().toISOString()
        });
      }

      return res.status(500).json({
        success: false,
        message: 'An error occurred while generating the research synthesis.'
      });
    }
  }

  // 2. GENERAL WORKFLOW: Direct Google Gemini Chat
  try {
    const result = await generateResponse({
      message: cleanMessage,
      history: normalizedHistory,
      context: {
        domain: activeDomain,
        folderName: activeFolder,
        paperContext: paperContext || null
      },
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      maxTokens: typeof maxTokens === 'number' ? maxTokens : 2048
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        reply: result.reply,
        sources: [],
        isResearch: false,
        provider: result.provider,
        model: result.model,
        timestamp: result.timestamp
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.reply || 'AI generation failed.'
      });
    }
  } catch (error) {
    console.error('[chatController] General Chat error:', error.message);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your request: ${error.message}`
    });
  }
}

/**
 * Handle text summarization requests.
 * POST /api/chat/summarize
 */
export async function handleSummarize(req, res) {
  const { text, targetLength, focus } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Content text to summarize is required.'
    });
  }

  try {
    const result = await summarizeText({
      text: text.trim(),
      targetLength: targetLength || 'concise',
      focus: focus || 'key points and methodology'
    });

    return res.status(200).json({
      success: result.success,
      reply: result.reply,
      provider: result.provider,
      model: result.model,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('[chatController] Summarize error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to summarize text.'
    });
  }
}

/**
 * Handle text/code analysis requests.
 * POST /api/chat/analyze
 */
export async function handleAnalyze(req, res) {
  const { text, instructions, domain } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Content text to analyze is required.'
    });
  }

  try {
    const result = await analyzeText({
      text: text.trim(),
      instructions: instructions || 'Provide a structured technical analysis with key strengths and improvement opportunities',
      domain: domain || 'Computer Science'
    });

    return res.status(200).json({
      success: result.success,
      reply: result.reply,
      provider: result.provider,
      model: result.model,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('[chatController] Analyze error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to analyze text.'
    });
  }
}

/**
 * Handle AI writing completion / paragraph continuation.
 * POST /api/chat/complete
 */
export async function handleAiCompletion(req, res) {
  const { prompt, currentContent, domain, folderName } = req.body;
  const userPrompt = prompt || `Continue writing the research document based on the preceding text.`;

  try {
    const result = await generateResponse({
      message: `Writing task: ${userPrompt}\n\nPreceding document content:\n"""\n${currentContent || ''}\n"""\n\nGenerate the next natural, high quality paragraph or section to continue this work seamlessly.`,
      context: {
        domain: domain || 'AI & Computer Science',
        folderName: folderName || 'AI Research'
      },
      temperature: 0.7,
      maxTokens: 600
    });

    return res.status(200).json({
      success: result.success,
      reply: result.reply,
      provider: result.provider,
      model: result.model,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('[chatController] Completion error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate AI completion.'
    });
  }
}

export default {
  handleChat,
  handleSummarize,
  handleAnalyze,
  handleAiCompletion
};
