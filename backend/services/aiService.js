/**
 * AI Research - Centralized Google Gemini AI Service
 * 
 * Provides unified, dynamic AI processing for the entire AI Research application.
 * Utilizes Google Gemini API as the primary AI engine with ultra-fast model failover:
 * - gemini-3.5-flash (Primary, fast & reliable)
 * - gemini-3.6-flash
 * - gemini-3.5-flash-lite
 * - gemini-flash-latest
 * - gemini-3.7-flash
 * - gemini-pro-latest
 * 
 * Real, dynamic Gemini-generated responses with zero hardcoded canned replies.
 */

import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure env variables are loaded from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

// Prioritized list of active Gemini models
const GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest',
  'gemini-3.7-flash',
  'gemini-pro-latest'
];

/**
 * Detect the active AI API configuration from the backend environment.
 */
export function getAiConfig() {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.GROQ_API_KEY ||
    ''
  ).trim();

  let provider = (process.env.AI_PROVIDER || '').toLowerCase().trim();
  let model = (process.env.AI_MODEL || '').trim();
  let baseUrl = (process.env.AI_BASE_URL || '').trim();

  // If no explicit provider, identify from key or default to gemini
  if (!provider) {
    if (apiKey.startsWith('gsk_')) {
      provider = 'groq';
    } else if (apiKey.startsWith('sk-ant-')) {
      provider = 'anthropic';
    } else if (apiKey.startsWith('sk-proj-') || apiKey.startsWith('sk-')) {
      provider = 'openai';
    } else {
      provider = 'gemini'; // Default & primary engine
    }
  }

  if (!model) {
    model = provider === 'gemini' ? GEMINI_MODELS[0] : (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');
  }

  return {
    apiKey,
    provider,
    model,
    baseUrl
  };
}

/**
 * Format conversation history into standard message objects { role: 'user'|'model', text: string }.
 * Formats properly for Gemini contents API.
 * @param {Array} history 
 * @returns {Array<{ role: string, parts: Array<{ text: string }> }>}
 */
function formatGeminiContents(history = [], currentMessage = '') {
  const contents = [];

  if (Array.isArray(history)) {
    const recent = history.slice(-10); // Maintain last 10 messages for rich multi-turn context
    for (const item of recent) {
      if (!item) continue;
      let role = 'user';
      let text = '';

      if (typeof item === 'string') {
        text = item;
      } else if (item.role) {
        role = (item.role === 'assistant' || item.role === 'model' || item.role === 'ai') ? 'model' : 'user';
        text = item.content || item.text || '';
      } else if (item.sender) {
        role = (item.sender === 'assistant' || item.sender === 'ai' || item.sender === 'model') ? 'model' : 'user';
        text = item.text || item.content || '';
      }

      text = (text || '').trim();
      if (!text) continue;

      // Gemini requires alternating roles. If two consecutive roles match, merge parts
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts.push({ text });
      } else {
        contents.push({
          role,
          parts: [{ text }]
        });
      }
    }
  }

  // Ensure last message is current user message
  const cleanCurrent = (currentMessage || '').trim();
  if (cleanCurrent) {
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts.push({ text: cleanCurrent });
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: cleanCurrent }]
      });
    }
  }

  return contents;
}

/**
 * Normalize history for OpenAI-compatible providers if needed.
 */
function normalizeStandardHistory(history = []) {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-10)
    .map(item => {
      if (!item) return null;
      let role = 'user';
      let content = '';
      if (typeof item === 'string') content = item;
      else if (item.role) {
        role = (item.role === 'assistant' || item.role === 'model' || item.role === 'ai') ? 'assistant' : 'user';
        content = item.content || item.text || '';
      } else if (item.sender) {
        role = (item.sender === 'assistant' || item.sender === 'ai') ? 'assistant' : 'user';
        content = item.text || item.content || '';
      }
      content = (content || '').trim();
      if (!content) return null;
      return { role, content };
    })
    .filter(Boolean);
}

/**
 * Build a comprehensive system prompt for the AI Research engine.
 */
function buildSystemPrompt(context = {}) {
  const domain = context.domain || 'AI & Computer Science';
  const folderName = context.folderName || 'General Workspace';
  const paperContext = context.paperContext;

  let paperSummary = '';
  if (paperContext) {
    if (typeof paperContext === 'object') {
      const title = paperContext.title || '';
      const authors = paperContext.authors || '';
      const year = paperContext.year || '';
      const abstract = paperContext.abstract || paperContext.description || '';
      paperSummary = `\nActive Research Reference: "${title}" by ${authors} (${year}). Abstract snippet: ${abstract.substring(0, 500)}`;
    } else if (typeof paperContext === 'string') {
      paperSummary = `\nActive Research Context: ${paperContext.substring(0, 500)}`;
    }
  }

  return `You are AI Research (powered by Google Gemini), an intelligent academic and scientific research assistant.

Core Principles:
1. General Intelligence & Q&A: Answer any general knowledge, coding, science, education, and technical questions with deep accuracy and clarity.
2. Coding & Technical Solutions: Provide complete, runnable code examples (Python, Java, C++, JavaScript, TypeScript, Go, Rust, SQL, etc.) with step-by-step logic, edge-case coverage, and complexity analysis.
3. Bilingual Support: Fluently respond in English and Tamil (தமிழ்) whenever requested.
4. Academic Rigor: When answering research queries, synthesize methodologies, explain key findings, evaluate benchmarks, and format citations clearly.
5. Markdown Formatting: Use clean GitHub-flavored Markdown with structured sections (###), bullet points, and syntax-highlighted code blocks.
6. Tone: Professional, authoritative, insightful, and helpful.

Current Workspace Context:
- Domain: ${domain}
- Project Folder: ${folderName}${paperSummary}`;
}

/**
 * Call Google Gemini REST API with model fallback.
 */
async function callGeminiApi({
  apiKey,
  systemPrompt,
  contents,
  preferredModel = 'gemini-3.5-flash',
  temperature = 0.7,
  maxTokens = 2048
}) {
  const candidateModels = [
    preferredModel,
    ...GEMINI_MODELS.filter(m => m !== preferredModel)
  ];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const payload = {
        contents,
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens
        }
      };

      if (systemPrompt) {
        payload.systemInstruction = {
          parts: [{ text: systemPrompt }]
        };
      }

      const res = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 25000
      });

      const candidate = res.data?.candidates?.[0];
      const reply = candidate?.content?.parts?.[0]?.text;

      if (reply && typeof reply === 'string' && reply.trim()) {
        return {
          reply: reply.trim(),
          provider: `Google Gemini (${model})`,
          model
        };
      }
    } catch (err) {
      const status = err.response?.status;
      const errMsg = err.response?.data?.error?.message || err.message;
      lastError = err;

      // If key is invalid (400 / 403), fail fast
      if (status === 400 && errMsg.includes('API_KEY_INVALID')) {
        throw new Error(`Invalid Google Gemini API Key: ${errMsg}`);
      }
      if (status === 403) {
        throw new Error(`Gemini API Forbidden (check API key permissions): ${errMsg}`);
      }
    }
  }

  throw lastError || new Error('All Gemini models failed to generate content.');
}

/**
 * Call alternate OpenAI-compatible provider if configured.
 */
async function callOtherProvider({ config, systemPrompt, normalizedHistory, cleanMessage, temperature, maxTokens }) {
  const { apiKey, provider, model, baseUrl } = config;
  const targetUrl = baseUrl || (provider === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...normalizedHistory,
    { role: 'user', content: cleanMessage }
  ];

  const res = await axios.post(
    targetUrl,
    {
      model: model || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'),
      messages,
      temperature,
      max_tokens: maxTokens
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 25000
    }
  );

  const reply = res.data?.choices?.[0]?.message?.content;
  if (reply) {
    return {
      reply: reply.trim(),
      provider: `${provider.toUpperCase()} (${model})`,
      model
    };
  }

  throw new Error('No reply from alternative AI provider.');
}

/**
 * Primary LLM response generation function.
 * Connects directly to Google Gemini API with multi-turn history and system instructions.
 */
export async function generateResponse({
  message,
  history = [],
  context = {},
  systemPrompt = null,
  temperature = 0.7,
  maxTokens = 2048
}) {
  const cleanMessage = (message || '').trim();
  if (!cleanMessage) {
    return {
      success: false,
      reply: 'Please provide a valid question or prompt.',
      provider: 'Google Gemini',
      timestamp: new Date().toISOString()
    };
  }

  const config = getAiConfig();

  if (!config.apiKey) {
    return {
      success: false,
      reply: 'Google Gemini API key is missing. Please configure GEMINI_API_KEY in your backend/.env file to activate live AI answers.',
      provider: 'Google Gemini (Not Configured)',
      timestamp: new Date().toISOString()
    };
  }

  const promptToUse = systemPrompt || buildSystemPrompt(context);

  try {
    if (config.provider === 'gemini') {
      const contents = formatGeminiContents(history, cleanMessage);
      const result = await callGeminiApi({
        apiKey: config.apiKey,
        systemPrompt: promptToUse,
        contents,
        preferredModel: config.model || 'gemini-3.5-flash',
        temperature,
        maxTokens
      });

      return {
        success: true,
        reply: result.reply,
        provider: result.provider,
        model: result.model,
        timestamp: new Date().toISOString()
      };
    } else {
      const normalizedHistory = normalizeStandardHistory(history);
      const result = await callOtherProvider({
        config,
        systemPrompt: promptToUse,
        normalizedHistory,
        cleanMessage,
        temperature,
        maxTokens
      });

      return {
        success: true,
        reply: result.reply,
        provider: result.provider,
        model: result.model,
        timestamp: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('[aiService] Generation error:', error.message);
    return {
      success: false,
      reply: `Gemini API Error: ${error.message}. Please check your Gemini API key and network connection.`,
      provider: 'Google Gemini',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Synthesize an evidence-grounded academic research answer using OpenAlex literature context and Gemini.
 */
export async function synthesizeResearchAnswer({
  query,
  papers = [],
  domain = 'AI & Computer Science',
  folderName = 'AI Research',
  history = [],
  temperature = 0.6
}) {
  const cleanQuery = (query || '').trim();
  const config = getAiConfig();

  if (!config.apiKey) {
    return {
      success: false,
      reply: 'Google Gemini API key is missing. Please configure GEMINI_API_KEY in your backend/.env file to enable research paper synthesis.',
      provider: 'Google Gemini (Not Configured)',
      timestamp: new Date().toISOString()
    };
  }

  // Format retrieved OpenAlex papers for Gemini's research context
  let papersContext = '';
  if (Array.isArray(papers) && papers.length > 0) {
    papersContext = papers.map((p, idx) => {
      const title = p.title || 'Untitled Publication';
      const authors = p.authors || 'Academic Researchers';
      const year = p.year || 'Recent';
      const venue = p.journal || p.source || p.hostVenue || 'Peer-Reviewed Venue';
      const citations = p.citations || p.citedByCount || 0;
      const doi = p.doi ? `DOI: ${p.doi}` : '';
      const url = p.openAccessUrl || p.downloadUrl || p.url || '';
      const abstract = p.abstract || p.description || 'No abstract text available.';

      return `[Paper ${idx + 1}]
Title: "${title}"
Authors: ${authors}
Year: ${year}
Venue/Journal: ${venue}
Citations: ${citations}
${doi}
URL: ${url}
Abstract: ${abstract}
-------------------`;
    }).join('\n\n');
  } else {
    papersContext = 'No specific academic papers were retrieved from OpenAlex for this query.';
  }

  const researchSystemPrompt = `You are AI Research, an expert academic researcher and literature synthesis engine powered by Google Gemini.

Your Task:
1. Provide a comprehensive, rigorous, and clear answer to the user's research question: "${cleanQuery}".
2. Ground your answer in the retrieved OpenAlex academic papers provided in the context below.
3. Cite the relevant papers by author, year, and title (e.g., "As demonstrated by Vaswani et al. (2017) in 'Attention Is All You Need'...").
4. Highlight the key methodologies, theoretical insights, empirical findings, and scientific consensus across the literature.
5. If the retrieved papers do not fully cover an aspect of the question, clearly distinguish between facts established by the retrieved papers and general scientific knowledge.
6. Do NOT invent fake paper titles, authors, or statistics. Use only verified facts from the provided papers and accurate domain knowledge.
7. Use structured GitHub-flavored Markdown with clear headings (###), summary bullet points, and key takeaways.
8. If the user asks in Tamil or asks for explanation in Tamil, provide the answer in high-quality, authentic Tamil (தமிழ்).

Retrieved Academic Literature (OpenAlex):
${papersContext}

Workspace Context:
- Domain: ${domain}
- Research Folder: ${folderName}`;

  try {
    const contents = formatGeminiContents(history, cleanQuery);

    const result = await callGeminiApi({
      apiKey: config.apiKey,
      systemPrompt: researchSystemPrompt,
      contents,
      preferredModel: config.model || 'gemini-3.5-flash',
      temperature,
      maxTokens: 3000
    });

    return {
      success: true,
      reply: result.reply,
      provider: result.provider,
      model: result.model,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('[aiService] Research synthesis error:', error.message);
    return {
      success: false,
      reply: `Gemini Research Synthesis Error: ${error.message}`,
      provider: 'Google Gemini',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Conversational helper method.
 */
export async function sendMessage({
  message,
  history = [],
  domain = 'AI & Computer Science',
  folderName = 'AI Research',
  paperContext = null
}) {
  return generateResponse({
    message,
    history,
    context: { domain, folderName, paperContext }
  });
}

/**
 * Text & Code Analysis method.
 */
export async function analyzeText({ text, instructions = 'Provide a structured technical analysis', domain = 'Computer Science' }) {
  const prompt = `${instructions}:\n\n"""\n${text}\n"""`;
  return generateResponse({
    message: prompt,
    context: { domain }
  });
}

/**
 * Text Summarization method.
 */
export async function summarizeText({ text, targetLength = 'concise', focus = 'key insights' }) {
  const prompt = `Please provide a ${targetLength} summary focusing on ${focus} for the following content:\n\n"""\n${text}\n"""`;
  return generateResponse({
    message: prompt
  });
}

/**
 * Backward-compatible adapter for research callers.
 */
export async function generateResearchChatReply({
  message,
  domain = 'AI & Machine Learning',
  folderName = 'AI Research',
  paperContext = null,
  history = []
}) {
  const result = await sendMessage({
    message,
    history,
    domain,
    folderName,
    paperContext
  });

  return {
    reply: result.reply,
    provider: result.provider,
    timestamp: result.timestamp
  };
}

export default {
  getAiConfig,
  generateResponse,
  synthesizeResearchAnswer,
  sendMessage,
  analyzeText,
  summarizeText,
  generateResearchChatReply
};
