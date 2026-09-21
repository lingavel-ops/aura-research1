/**
 * AI Research - Backend Server
 * Express-based backend API with OpenAlex integration, AI research synthesis,
 * and private researcher networking.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import researchRoutes from './routes/researchRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env and fallback to .env
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend clients (e.g. Vite on http://localhost:5173)
app.use(cors({
  origin: true, // Allow all local development origins
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// Request logging in development
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'AI Research Backend Engine',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/research', researchRoutes);
app.use('/api/chat', chatRoutes);

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` 🚀 AI Research Backend Server Active `);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Research Search: http://localhost:${PORT}/api/research/search?q=machine+learning`);
  console.log(` AI Chat:        http://localhost:${PORT}/api/chat`);
  console.log(` Health Check:   http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

export default app;
