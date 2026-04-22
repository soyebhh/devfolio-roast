import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT_TEMPLATE = (url) => `You are a brutal but helpful portfolio reviewer.
Review this portfolio website: ${url}

Give feedback on:
1. First Impression (0-10)
2. Design & UI (0-10)
3. Content & Bio (0-10)
4. Projects Section (0-10)
5. SEO & Performance (0-10)

For each category:
- Score out of 10
- What is good
- What needs improvement
- One specific fix

End with:
- Overall Score (average)
- Top 3 things to fix immediately
- One savage but funny roast line about the portfolio

Keep tone: honest, direct, slightly savage but helpful.
IMPORTANT: You must respond with ONLY valid JSON, no markdown, no backticks, no explanation. Just raw JSON.

Format response as this exact JSON structure:
{
  "categories": [
    {
      "name": "First Impression",
      "score": 7,
      "good": "...",
      "improve": "...",
      "fix": "..."
    },
    {
      "name": "Design & UI",
      "score": 6,
      "good": "...",
      "improve": "...",
      "fix": "..."
    },
    {
      "name": "Content & Bio",
      "score": 5,
      "good": "...",
      "improve": "...",
      "fix": "..."
    },
    {
      "name": "Projects Section",
      "score": 7,
      "good": "...",
      "improve": "...",
      "fix": "..."
    },
    {
      "name": "SEO & Performance",
      "score": 4,
      "good": "...",
      "improve": "...",
      "fix": "..."
    }
  ],
  "overall_score": 5.8,
  "top_fixes": ["fix1", "fix2", "fix3"],
  "roast": "savage funny one liner here"
}`;

export async function roastPortfolio(url) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('API key not configured. Add VITE_GEMINI_API_KEY to .env');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      const result = await model.generateContent(PROMPT_TEMPLATE(url));
      const text = result.response.text();

      // Strip markdown code fences if present
      const cleaned = text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      try {
        return JSON.parse(cleaned);
      } catch (e) {
        // Try to extract JSON object from the text
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) return JSON.parse(match[0]);
        throw new Error('Failed to parse AI response as JSON. Raw: ' + cleaned.slice(0, 200));
      }
    } catch (err) {
      attempts++;
      const isHighDemand = err.message?.includes('503') || err.message?.includes('high demand');
      
      if (isHighDemand && attempts < maxAttempts) {
        console.log(`Gemini is busy, retrying... (Attempt ${attempts}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 2000 * attempts)); // Exponential backoff
        continue;
      }
      throw err;
    }
  }
}
