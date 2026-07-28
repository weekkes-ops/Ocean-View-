import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    resort: 'OceanView Country Club & Resort',
    location: '10 Sweds Free Avenue, Sussex Village',
    phone: '+232-76-862043',
    aiEnabled: !!ai,
  });
});

// AI Resort Assistant API
app.post('/api/gemini/assistant', async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in process.env.GEMINI_API_KEY.',
        reply: 'The AI Assistant is operating in fallback mode. Please configure your GEMINI_API_KEY in the Secrets panel to activate full intelligent resort operations.',
      });
    }

    const systemInstruction = `You are "Aura", the Chief AI Hospitality & Operations Assistant for OceanView Country Club & Resort.
OceanView Country Club & Resort details:
- Location: 10 Sweds Free Avenue, Sussex Village (+232-76-862043).
- Amenities & Features: Accommodations (Villas, Suites, Cabanas, Penthouses), VIP Lounge, Event Venue (Weddings, Corporate Galas), Fitness Club, Movie Theater, Multipurpose Court, Conference Rooms, Water Sports (Jet Ski, Kayaks, Paddleboards, Speedboats), Restaurants (Ocean Breeze Fine Dining, Sunset Terrace Grill), and Beachfront Cafe.

Your objective is to assist resort managers, front-desk staff, concierge teams, and guests with:
1. Intelligent guest recommendations and custom daily itineraries.
2. Staff task dispatching and resolution strategies.
3. Hospitality event planning and catering ideas.
4. Professional guest email or message drafts (complaints, VIP greetings, booking confirmations).
5. Revenue optimization and pricing strategies.

Context provided: ${JSON.stringify(context || {})}
Be warm, ultra-professional, concise, and helpful. Use clear bullet points and bold highlights.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({
      reply: response.text || 'I apologize, I could not generate a response at this moment.',
    });
  } catch (error: any) {
    console.error('Gemini Assistant Error:', error);
    return res.status(500).json({
      error: error.message || 'Internal AI service error',
      reply: 'An error occurred while communicating with the AI Assistant service. Please try again.',
    });
  }
});

// AI Revenue & Occupancy Insights API
app.post('/api/gemini/insights', async (req, res) => {
  try {
    const { resortStats, activeMonth } = req.body;

    if (!ai) {
      return res.json({
        insights: [
          'Occupancy rate is strong at 88%. Recommend applying dynamic pricing (+10%) for weekend villa bookings.',
          'Water sports rentals are operating near peak capacity. Consider adding 2 additional Jet Ski slots during 14:00 - 17:00.',
          'VIP Lounge bottle sales are driving high margin revenue. Introduce a sunset champagne tasting package.',
        ],
      });
    }

    const prompt = `Analyze the current OceanView Country Club & Resort performance metrics and provide 3 actionable, high-impact business insights for management:
Metrics: ${JSON.stringify(resortStats || {})}
Active Month: ${activeMonth || 'Current Season'}

Return actionable recommendations for pricing, guest satisfaction, or staff dispatching.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a luxury resort financial and operations analyst. Output 3 concise bullet points.',
        temperature: 0.6,
      },
    });

    const text = response.text || '';
    const insights = text
      .split('\n')
      .map((line) => line.trim().replace(/^[-*•\d.]+\s*/, ''))
      .filter((line) => line.length > 5);

    return res.json({ insights: insights.length ? insights : [text] });
  } catch (error: any) {
    console.error('Gemini Insights Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Vite Dev Server / Static Production Setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[OceanView Server] Express server running on http://0.0.0.0:${PORT}`);
  });
}

start();
