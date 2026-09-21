/**
 * Research Controller
 * Handles incoming HTTP requests for research search, papers, library, AI chat,
 * and researcher networking.
 */

import { searchOpenAlexPapers, getPaperDetails } from '../services/openalexService.js';
import { generateResearchChatReply } from '../services/aiService.js';

// ==========================================
// IN-MEMORY DATA STORE (Database-Ready)
// ==========================================

const SEED_RESEARCHERS = [
  {
    id: 'res-arun-kumar',
    name: 'Arun Kumar',
    professionalRole: 'AI Research Scientist',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Chennai',
    institution: 'IIT Madras · Center for AI & NLP',
    email: 'arun.k@research.iitm.ac.in',
    userId: '@arunkumar_ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#4f46e5',
    bio: 'Working on Multimodal Transformers, healthcare AI diagnostics, and low-resource Indic language reasoning.',
    researchInterests: ['Artificial Intelligence', 'Machine Learning', 'NLP', 'Healthcare AI'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['Clinical Diagnostic Foundation Models', 'Indic Language LLM Tokenizers', 'Chest X-ray Multi-label Classification'],
    isOnline: true
  },
  {
    id: 'res-priya-sundaram',
    name: 'Dr. Priya Sundaram',
    professionalRole: 'Bioinformatics & Clinical AI Lead',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    institution: 'PSG Institute of Medical Sciences & Research',
    email: 'priya.sundaram@psgimsr.ac.in',
    userId: '@priya_bioai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#059669',
    bio: 'Pioneering predictive deep learning for oncology triaging and CRISPR off-target cleavage sequence verification.',
    researchInterests: ['Healthcare AI', 'Bioinformatics', 'Machine Learning', 'Medical Technology'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['Radiology AI Workflow Integration', 'CRISPR Target Prediction Neural Nets', 'Electronic Health Record Summarization'],
    isOnline: true
  },
  {
    id: 'res-rajesh-raman',
    name: 'Rajesh Raman',
    professionalRole: 'Quantum Cryptography Researcher',
    country: 'India',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    institution: 'IISc Bangalore · Quantum Computing Lab',
    email: 'rajesh.raman@iisc.ac.in',
    userId: '@rajesh_pqc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#2563eb',
    bio: 'Investigating post-quantum lattice-based key encapsulation protocols (ML-KEM, ML-DSA) for secure communications.',
    researchInterests: ['Computer Science', 'Quantum Computing', 'Cryptography', 'Algorithms'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['NIST FIPS 203 Hybrid Handshakes', 'Lattice Cryptoprocessors for TLS 1.3', 'Fault-Tolerant Quantum Error Correction'],
    isOnline: false
  },
  {
    id: 'res-ananya-sharma',
    name: 'Ananya Sharma',
    professionalRole: 'EdTech Cognitive Scientist',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Madurai',
    institution: 'Madurai Kamaraj University',
    email: 'ananya.s@mku.ac.in',
    userId: '@ananya_edtech',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#7c3aed',
    bio: 'Focusing on Socratic AI dialogue agents, cognitive load optimization, and adaptive spaced-repetition algorithms in classrooms.',
    researchInterests: ['Education', 'EdTech', 'Adaptive Learning', 'Artificial Intelligence'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['SocraticLM Dialectical Tutoring Evaluation', 'Student Anxiety Reduction via AI Feedback', 'AI Literacy in Higher Ed'],
    isOnline: true
  },
  {
    id: 'res-karthik-selvam',
    name: 'Karthik Selvam',
    professionalRole: 'Robotics & Autonomous Systems Fellow',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Tiruchirappalli',
    institution: 'National Institute of Technology (NIT) Trichy',
    email: 'karthik.s@nitt.edu',
    userId: '@karthik_robotics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#dc2626',
    bio: 'Specializing in Real-time 3D Gaussian Splatting and NeRF models for zero-latency robotic navigation in degraded environments.',
    researchInterests: ['Engineering', 'Robotics', 'Computer Vision', 'Autonomous Vehicles'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['Edge LiDAR Fusion on Embedded NPUs', 'SLAM with Neural Radiance Fields', 'Autonomous Warehouse AGVs'],
    isOnline: false
  },
  {
    id: 'res-meenakshi-iyer',
    name: 'Dr. Meenakshi Iyer',
    professionalRole: 'Genomics & Computational Biology Chair',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Salem',
    institution: 'Biomedical Research Center',
    email: 'meenakshi.iyer@biores.org',
    userId: '@meenakshi_genomics',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#0891b2',
    bio: 'Applying deep attention networks to genomic sequence alignment and structural protein folding prediction.',
    researchInterests: ['Science', 'Genomics', 'Bioinformatics', 'Machine Learning'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['Attention Mechanisms in Metagenomics', 'Predicting Off-Target Cas12 Cleavage', 'Protein Ligand Interaction Models'],
    isOnline: true
  }
];

const db = {
  currentUserProfile: {
    fullName: 'Lingavel',
    professionalRole: 'AI Research Scholar',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Chennai',
    email: 'lingavel@thamili.ai',
    userId: '@lingavel_ai',
    profileImage: '',
    institution: 'THAMILI Research Lab',
    shortBio: 'Exploring multilingual reasoning, adaptive retrieval augmented generation, and conversational research agents.',
    researchInterests: ['Artificial Intelligence', 'Machine Learning', 'Healthcare AI'],
    profileVisibility: 'Researchers Only',
    recentResearchTopics: ['Impact of AI on Education', 'Multimodal Diagnostics', 'Clinical AI Protocols'],
    createdAt: new Date().toISOString()
  },
  users: [...SEED_RESEARCHERS],
  connections: [
    {
      id: 'conn-seed-1',
      userId1: 'current_user',
      userId2: 'res-arun-kumar',
      status: 'pending',
      requestedBy: 'res-arun-kumar',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'conn-seed-2',
      userId1: 'current_user',
      userId2: 'res-priya-sundaram',
      status: 'connected',
      requestedBy: 'res-priya-sundaram',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  messages: [
    {
      id: 'msg-seed-1',
      senderId: 'res-priya-sundaram',
      receiverId: 'current_user',
      text: 'Vanakkam Lingavel! I saw your recent research notes on clinical machine learning protocols.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    },
    {
      id: 'msg-seed-2',
      senderId: 'current_user',
      receiverId: 'res-priya-sundaram',
      text: 'Vanakkam Dr. Priya! Yes, I was reviewing your papers on oncology diagnostic pipelines. Very insightful methodology!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    }
  ],
  savedPapers: [],
  librarySources: [],
  blocks: [],
  reports: []
};

// Utilities
function sanitizeText(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function sanitizePublicUser(user, connectionStatus = 'none') {
  return {
    id: user.id,
    name: user.name,
    userId: user.userId || '',
    professionalRole: user.professionalRole,
    country: user.country,
    state: user.state || '',
    district: user.district,
    institution: user.institution || '',
    avatar: user.avatar || '',
    avatarBg: user.avatarBg || '#4f46e5',
    bio: user.bio || '',
    researchInterests: user.researchInterests || [],
    recentResearchTopics: user.recentResearchTopics || [],
    profileVisibility: user.profileVisibility || 'Researchers Only',
    isOnline: !!user.isOnline,
    connectionStatus
  };
}

function getConnection(targetUserId) {
  return db.connections.find(c => 
    !c.declined &&
    ((c.userId1 === 'current_user' && c.userId2 === targetUserId) ||
     (c.userId2 === 'current_user' && c.userId1 === targetUserId))
  );
}

function calculateSimilarity(currentUser, candidate) {
  let score = 0;
  const currentInterests = (currentUser.researchInterests || []).map(i => i.toLowerCase().trim());
  const candidateInterests = (candidate.researchInterests || []).map(i => i.toLowerCase().trim());

  candidateInterests.forEach(cInterest => {
    if (currentInterests.includes(cInterest)) {
      score += 40;
    } else {
      const isRelated = currentInterests.some(cur => 
        cur.includes(cInterest) || cInterest.includes(cur) ||
        (cur.includes('ai') && cInterest.includes('machine learning')) ||
        (cur.includes('machine learning') && cInterest.includes('ai')) ||
        (cur.includes('medical') && cInterest.includes('health')) ||
        (cur.includes('health') && cInterest.includes('medical'))
      );
      if (isRelated) score += 20;
    }
  });

  if (currentUser.professionalRole && candidate.professionalRole) {
    const curRole = currentUser.professionalRole.toLowerCase();
    const candRole = candidate.professionalRole.toLowerCase();
    if (curRole.includes('ai') && candRole.includes('ai')) score += 15;
    else if (curRole.includes('research') && candRole.includes('research')) score += 10;
  }

  if (currentUser.country && candidate.country &&
      currentUser.country.toLowerCase() === candidate.country.toLowerCase()) {
    score += 5;
    if (currentUser.district && candidate.district &&
        currentUser.district.toLowerCase() === candidate.district.toLowerCase()) {
      score += 5;
    }
  }

  return score;
}

// ==========================================
// RESEARCH API CONTROLLER METHODS
// ==========================================

/**
 * 1. GET /api/research/search?q=machine+learning
 * Search research papers from OpenAlex.
 */
export async function searchPapers(req, res) {
  const query = req.query.q || req.query.query || req.query.search;
  const limit = parseInt(req.query.limit, 10) || 10;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Search query parameter "q" is required.'
    });
  }

  try {
    const { works, total, provider } = await searchOpenAlexPapers(query.trim(), limit);
    return res.status(200).json({
      success: true,
      query: query.trim(),
      total,
      count: works.length,
      provider,
      results: works,
      works // Backward compatibility for existing frontends
    });
  } catch (error) {
    console.error('[researchController] Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete research search.',
      error: error.message,
      results: []
    });
  }
}

/**
 * 2. GET /api/research/paper/:id
 * Retrieve individual research paper metadata.
 */
export async function getPaperById(req, res) {
  const paperId = req.params.id;
  if (!paperId) {
    return res.status(400).json({
      success: false,
      message: 'Paper ID is required.'
    });
  }

  try {
    const paper = await getPaperDetails(paperId);
    if (!paper) {
      return res.status(404).json({
        success: false,
        message: 'Research paper not found.'
      });
    }

    return res.status(200).json({
      success: true,
      paper
    });
  } catch (error) {
    console.error('[researchController] Get paper error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve paper details.'
    });
  }
}

/**
 * 3. POST /api/research/save
 * Save a research paper to the user library.
 */
export async function savePaper(req, res) {
  const paper = req.body;
  if (!paper || !paper.title) {
    return res.status(400).json({
      success: false,
      message: 'Invalid paper payload. Title is required.'
    });
  }

  const paperId = paper.id || `paper-saved-${Date.now()}`;
  const existingIdx = db.savedPapers.findIndex(p => p.id === paperId || p.title === paper.title);

  if (existingIdx >= 0) {
    return res.status(200).json({
      success: true,
      message: 'Paper is already saved in your research library.',
      paper: db.savedPapers[existingIdx]
    });
  }

  const savedItem = {
    ...paper,
    id: paperId,
    savedAt: new Date().toISOString()
  };
  db.savedPapers.unshift(savedItem);

  return res.status(201).json({
    success: true,
    message: 'Paper saved successfully to research library.',
    paper: savedItem
  });
}

/**
 * 4. GET /api/research/library
 * Retrieve saved papers and library sources.
 */
export async function getLibrary(req, res) {
  return res.status(200).json({
    success: true,
    count: db.savedPapers.length,
    results: db.savedPapers,
    sources: db.librarySources
  });
}

/**
 * 5. DELETE /api/research/library/:id
 * Remove a paper from the research library.
 */
export async function deleteLibraryItem(req, res) {
  const id = req.params.id;
  const initialLength = db.savedPapers.length;
  db.savedPapers = db.savedPapers.filter(p => p.id !== id && p.openAlexId !== id);

  if (db.savedPapers.length === initialLength) {
    return res.status(404).json({
      success: false,
      message: 'Paper not found in library.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Paper removed from research library successfully.'
  });
}

/**
 * 6. POST /api/research/chat
 * AI Research Chat assistant endpoint.
 */
export async function chatWithPaper(req, res) {
  const { message, prompt, domain, folderName, paperContext, history } = req.body;
  const query = message || prompt;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      success: false,
      message: 'A message or query string is required.'
    });
  }

  try {
    const result = await generateResearchChatReply({
      message: query.trim(),
      domain: domain || 'AI & Machine Learning',
      folderName: folderName || 'AI Research',
      paperContext,
      history: Array.isArray(history) ? history : []
    });

    return res.status(200).json({
      success: true,
      reply: result.reply,
      provider: result.provider,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('[researchController] Chat error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate AI research response.'
    });
  }
}

// ==========================================
// RESEARCHER NETWORKING CONTROLLER METHODS
// ==========================================

export function getProfile(req, res) {
  if (!db.currentUserProfile) {
    return res.status(404).json({ exists: false, message: 'No profile found' });
  }
  return res.json({
    exists: true,
    profile: db.currentUserProfile
  });
}

export function saveProfile(req, res) {
  const { fullName, professionalRole, country, state, district, email, userId, profileImage, researchInterests, institution, shortBio, profileVisibility } = req.body;

  if (!fullName || !professionalRole || !country || !district || !email || !userId) {
    return res.status(400).json({ error: 'All required fields (Name, Professional Role, Country, District, Email, User ID) must be filled.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const cleanUserId = userId.trim().startsWith('@') ? userId.trim() : '@' + userId.trim();
  const duplicateId = db.users.some(u => u.userId.toLowerCase() === cleanUserId.toLowerCase());
  if (duplicateId) {
    return res.status(400).json({ error: 'This User ID is already taken. Please choose another.' });
  }

  let parsedInterests = [];
  if (Array.isArray(researchInterests)) {
    parsedInterests = researchInterests;
  } else if (typeof researchInterests === 'string') {
    parsedInterests = researchInterests.split(',').map(s => s.trim()).filter(Boolean);
  }

  db.currentUserProfile = {
    fullName: sanitizeText(fullName.trim()),
    professionalRole: sanitizeText(professionalRole.trim()),
    country: sanitizeText(country.trim()),
    state: sanitizeText((state || '').trim()),
    district: sanitizeText(district.trim()),
    email: email.trim().toLowerCase(),
    userId: cleanUserId,
    profileImage: profileImage || '',
    institution: sanitizeText((institution || '').trim()),
    shortBio: sanitizeText((shortBio || '').trim()),
    researchInterests: parsedInterests.length > 0 ? parsedInterests : ['Artificial Intelligence', 'Machine Learning'],
    profileVisibility: profileVisibility || 'Researchers Only',
    recentResearchTopics: db.currentUserProfile?.recentResearchTopics || ['Artificial Intelligence Exploration'],
    updatedAt: new Date().toISOString()
  };

  return res.status(200).json({
    success: true,
    message: 'Research profile saved successfully.',
    profile: db.currentUserProfile
  });
}

export function getUsers(req, res) {
  const sanitized = db.users.map(u => {
    const conn = getConnection(u.id);
    let status = 'none';
    if (conn) {
      if (conn.status === 'connected') status = 'connected';
      else if (conn.requestedBy === 'current_user') status = 'request_sent';
      else status = 'request_received';
    }
    return sanitizePublicUser(u, status);
  });
  return res.json({ users: sanitized });
}

export function getSuggestions(req, res) {
  const profile = db.currentUserProfile || { researchInterests: ['Artificial Intelligence', 'Machine Learning'] };
  const blockedIds = db.blocks.map(b => b.blockedId);
  const candidates = db.users.filter(u => !blockedIds.includes(u.id));

  const ranked = candidates.map(u => {
    const score = calculateSimilarity(profile, u);
    const conn = getConnection(u.id);
    let status = 'none';
    if (conn) {
      if (conn.status === 'connected') status = 'connected';
      else if (conn.requestedBy === 'current_user') status = 'request_sent';
      else status = 'request_received';
    }
    return {
      ...sanitizePublicUser(u, status),
      matchScore: score
    };
  });

  ranked.sort((a, b) => b.matchScore - a.matchScore);
  return res.json({ suggestions: ranked });
}

export function requestConnection(req, res) {
  const { targetUserId } = req.body;
  if (!targetUserId) return res.status(400).json({ error: 'targetUserId is required' });

  const existing = getConnection(targetUserId);
  if (existing) {
    if (existing.status === 'connected') {
      return res.status(400).json({ error: 'You are already connected with this researcher.' });
    }
    if (existing.status === 'pending') {
      return res.status(400).json({ error: 'A connection request is already pending.' });
    }
  }

  const newConn = {
    id: 'conn-' + Date.now(),
    userId1: 'current_user',
    userId2: targetUserId,
    status: 'pending',
    requestedBy: 'current_user',
    createdAt: new Date().toISOString()
  };
  db.connections.push(newConn);

  return res.json({
    success: true,
    message: 'Connection request sent successfully.',
    connection: newConn
  });
}

export function acceptConnection(req, res) {
  const { targetUserId } = req.body;
  const conn = db.connections.find(c => 
    c.status === 'pending' &&
    ((c.userId1 === targetUserId && c.userId2 === 'current_user') ||
     (c.userId2 === targetUserId && c.userId1 === 'current_user'))
  );

  if (!conn) {
    return res.status(404).json({ error: 'No pending connection request found.' });
  }

  conn.status = 'connected';
  conn.connectedAt = new Date().toISOString();

  return res.json({
    success: true,
    message: 'Connection request accepted. You can now message each other.',
    connection: conn
  });
}

export function declineConnection(req, res) {
  const { targetUserId } = req.body;
  const index = db.connections.findIndex(c => 
    c.status === 'pending' &&
    ((c.userId1 === targetUserId && c.userId2 === 'current_user') ||
     (c.userId2 === targetUserId && c.userId1 === 'current_user'))
  );

  if (index === -1) {
    return res.status(404).json({ error: 'No pending request to decline.' });
  }

  db.connections.splice(index, 1);
  return res.json({
    success: true,
    message: 'Connection request declined.'
  });
}

export function getConnections(req, res) {
  const myConnections = [];
  const incomingRequests = [];
  const outgoingRequests = [];

  db.connections.forEach(conn => {
    const otherId = conn.userId1 === 'current_user' ? conn.userId2 : conn.userId1;
    const otherUser = db.users.find(u => u.id === otherId);
    if (!otherUser) return;

    if (conn.status === 'connected') {
      myConnections.push(sanitizePublicUser(otherUser, 'connected'));
    } else if (conn.status === 'pending') {
      if (conn.requestedBy === 'current_user') {
        outgoingRequests.push(sanitizePublicUser(otherUser, 'request_sent'));
      } else {
        incomingRequests.push(sanitizePublicUser(otherUser, 'request_received'));
      }
    }
  });

  return res.json({
    connections: myConnections,
    incomingRequests,
    outgoingRequests,
    totalConnections: myConnections.length,
    pendingCount: incomingRequests.length
  });
}

export function getMessages(req, res) {
  const targetUserId = req.params.userId;
  const conn = getConnection(targetUserId);
  if (!conn || conn.status !== 'connected') {
    return res.status(403).json({
      error: 'Connect with this researcher to start a conversation.',
      connected: false
    });
  }

  const thread = db.messages.filter(m =>
    (m.senderId === 'current_user' && m.receiverId === targetUserId) ||
    (m.senderId === targetUserId && m.receiverId === 'current_user')
  );

  thread.forEach(m => {
    if (m.receiverId === 'current_user') m.read = true;
  });

  const otherUser = db.users.find(u => u.id === targetUserId);

  return res.json({
    connected: true,
    messages: thread,
    recipient: otherUser ? sanitizePublicUser(otherUser, 'connected') : null
  });
}

export function sendMessage(req, res) {
  const { receiverId, text } = req.body;
  if (!receiverId || !text) {
    return res.status(400).json({ error: 'receiverId and text are required.' });
  }

  const conn = getConnection(receiverId);
  if (!conn || conn.status !== 'connected') {
    return res.status(403).json({
      error: 'You can only message researchers you are connected with.'
    });
  }

  const words = countWords(text);
  if (words > 100) {
    return res.status(400).json({
      error: 'Your message must be 100 words or less.',
      wordCount: words,
      maxWords: 100
    });
  }

  if (words === 0) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  const sanitizedText = sanitizeText(text.trim());
  const newMsg = {
    id: 'msg-' + Date.now(),
    senderId: 'current_user',
    receiverId,
    text: sanitizedText,
    timestamp: new Date().toISOString(),
    read: false
  };

  db.messages.push(newMsg);

  return res.status(201).json({
    success: true,
    message: newMsg,
    wordCount: words
  });
}

export function blockUser(req, res) {
  const targetUserId = req.params.userId;
  db.blocks.push({
    blockerId: 'current_user',
    blockedId: targetUserId,
    timestamp: new Date().toISOString()
  });

  const connIndex = db.connections.findIndex(c => 
    (c.userId1 === 'current_user' && c.userId2 === targetUserId) ||
    (c.userId2 === 'current_user' && c.userId1 === targetUserId)
  );
  if (connIndex !== -1) {
    db.connections.splice(connIndex, 1);
  }

  return res.json({
    success: true,
    message: 'User blocked successfully.'
  });
}

export function reportUser(req, res) {
  const targetUserId = req.params.userId;
  const { reason } = req.body;
  db.reports.push({
    id: 'rep-' + Date.now(),
    reporterId: 'current_user',
    reportedUserId: targetUserId,
    reason: sanitizeText(reason || 'Inappropriate behavior or spam'),
    timestamp: new Date().toISOString()
  });

  return res.json({
    success: true,
    message: 'Report submitted. Our research safety team will review it.'
  });
}
