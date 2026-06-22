import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required to power the AI Career Advisor.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000; // Hardcoded port 3000 as mandated by environment constraints

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json());

  // API Route: AI Career Advisor Chat
  app.post('/api/advisor/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Invalid message request payload' });
        return;
      }

      const client = getGeminiClient();

      // CyberWise Skillversity Knowledge Base Core System Prompt
      const systemInstruction = `You are "WiseBot", the brilliant, friendly, and highly professional AI Career Advisor and Academic Counselor for CyberWise Skillversity in Perinthalmanna, Kerala.
Your tone is welcoming, tech-savvy, encouraging, and inspirational.

Core Facts about CyberWise Skillversity:
- Location: Perinthalmanna, Kerala, (near Calicut Road, a premium educational hub).
- Concept: "Bridging Academic Learning with Real Industry Careers". We bridge the traditional university pathway with practical digital skills so graduates are actually prepared with job-ready portfolios.
- Key Advantage: Students don't have to choose between a university degree or skill education. They can pursue UGC-Accredited Degree Pathways (such as BCA, BBA, B.Com, BSc, or BA) while attending practical training at CyberWise Skillversity.

Course Details to explain when asked:
1. AI-Driven Digital Marketing: Covers Search Engine Optimization (SEO), Social Media Marketing (SMM), Content Strategy, AI Content Tools, Online Branding, and Digital Advertising. Great for aspiring marketers, entrepreneurs, and remote workers.
2. Professional Videography & Content Creation: Camera handling, cinematography, studio lighting, studio audio recording, advanced video editing, and visual storytelling. Features high-tech cameras, drone workshops, and professional studio equipment.
3. E-Commerce & Online Business: online store building, drop-shipping, product research, sales funnels, digital sales techniques, and automated checkout funnels.
4. Spoken English & Personality Development: public speaking, corporate communication, professional etiquette, job interview preparation, resume building, and confidence boosters.

When explaining career paths, always highlight that we provide:
- Hands-on practical assignments (no boring exams, pure project submissions)
- Personal mentorship by industry experts
- Professional labs and ultra-high-definition videography gear
- Job placements and resume grooming support

Reply directly, concisely, and with genuine helpfulness. Avoid lengthy jargon. Format with clean bullet points. Write to represent the future of education in Kerala! Keep responses friendly and professional.`;

      // Structure messages for @google/genai SDK
      // The current SDK supports a simple contents parameter
      // We translate the incoming standard React chatbot payload (role: 'user' | 'assistant', text)
      // to the format compatible with the SDK generateContent.
      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // If contents are empty, provide a default
      if (contents.length === 0) {
        contents.push({ role: 'user', parts: [{ text: 'Hello' }] });
      }

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm having trouble thinking of a response right now. How can I help you regarding CyberWise Skillversity's modern programs?";
      res.json({ content: replyText });
    } catch (error: any) {
      console.error('Advisor API Error:', error);
      res.status(500).json({ 
        error: error.message || 'Server-side error in AI Advisor',
        suggestedResponse: "Hello! Our AI Advisor is warming up. Feel free to ask about our premium courses in Digital Marketing, Videography, or UGC-Accredited Degree Pathways!" 
      });
    }
  });

  // Client-side Router mapping
  if (!isProd) {
    console.log('Starting Vite in development server middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    console.log('Serving built static files in production mode...');
    const distPath = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
      console.warn('Production build dist/ directory not found. Express will fall back.');
    }
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server launched successfully. Listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
