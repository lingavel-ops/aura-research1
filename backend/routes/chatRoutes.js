/**
 * AI Research - Dedicated Global Chat & AI Routes
 * Mounts endpoints for /api/chat
 */

import { Router } from 'express';
import {
  handleChat,
  handleSummarize,
  handleAnalyze,
  handleAiCompletion
} from '../controllers/chatController.js';

const router = Router();

// POST /api/chat & POST /api/chat/message
router.post('/', handleChat);
router.post('/message', handleChat);

// Specialized AI Tasks
router.post('/summarize', handleSummarize);
router.post('/analyze', handleAnalyze);
router.post('/complete', handleAiCompletion);

export default router;

