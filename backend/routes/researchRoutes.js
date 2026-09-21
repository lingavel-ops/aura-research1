/**
 * Research API Routes
 * Mounts all research endpoints: search, paper details, library, AI chat,
 * and researcher networking.
 */

import { Router } from 'express';
import {
  searchPapers,
  getPaperById,
  savePaper,
  getLibrary,
  deleteLibraryItem,
  chatWithPaper,
  getProfile,
  saveProfile,
  getUsers,
  getSuggestions,
  requestConnection,
  acceptConnection,
  declineConnection,
  getConnections,
  getMessages,
  sendMessage,
  blockUser,
  reportUser
} from '../controllers/researchController.js';

const router = Router();

// ==========================================
// 1. RESEARCH PAPER & LITERATURE ENDPOINTS
// ==========================================

// GET /api/research/search?q=machine+learning
router.get('/search', searchPapers);

// Also support /api/research/openalex/search for seamless backward compatibility
router.get('/openalex/search', searchPapers);

// GET /api/research/paper/:id
router.get('/paper/:id', getPaperById);

// POST /api/research/save
router.post('/save', savePaper);

// GET /api/research/library
router.get('/library', getLibrary);

// DELETE /api/research/library/:id
router.delete('/library/:id', deleteLibraryItem);

// POST /api/research/chat
router.post('/chat', chatWithPaper);

// ==========================================
// 2. RESEARCHER NETWORKING ENDPOINTS
// ==========================================

// Profile
router.get('/profile', getProfile);
router.post('/profile', saveProfile);

// Researchers discovery & recommendations
router.get('/users', getUsers);
router.get('/users/suggestions', getSuggestions);

// Connections
router.post('/connections/request', requestConnection);
router.post('/connections/accept', acceptConnection);
router.post('/connections/decline', declineConnection);
router.get('/connections', getConnections);

// Private Messages
router.get('/messages/:userId', getMessages);
router.post('/messages', sendMessage);

// Safety & Moderation
router.post('/users/:userId/block', blockUser);
router.post('/users/:userId/report', reportUser);

export default router;
