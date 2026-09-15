import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper for lazy Gemini client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return null;
    if (!aiClient) {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
    return aiClient;
  }

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. AI Recipe Generator endpoint
  app.post('/api/ai/generate-recipe', async (req, res) => {
    try {
      const { ingredients, options } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(200).json({ error: 'NO_KEY', recipe: null });
      }

      const prompt = `You are RecipeHub AI, an expert culinary chef.
Generate a gourmet, restaurant-quality recipe using available ingredients: ${Array.isArray(ingredients) ? ingredients.join(', ') : 'Chef special selection'}.
Preferences:
- Cuisine: ${options?.cuisine || 'Any'}
- Dietary: ${options?.diet || 'Any'}
- Category: ${options?.mealType || 'dinner'}
- Target Cook Time: ${options?.maxTimeMinutes || 25} minutes
- Skill Level: ${options?.skillLevel || 'Intermediate'}

Return ONLY pure, valid JSON (no markdown fences, no conversational text) matching this schema:
{
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "cuisine": "string",
  "category": "breakfast" | "lunch" | "dinner" | "dessert" | "snack" | "drinks" | "baking",
  "difficulty": "Easy" | "Medium" | "Hard",
  "prepTimeMinutes": number,
  "cookTimeMinutes": number,
  "servings": number,
  "tags": ["string"],
  "dietary": ["Vegetarian" | "Vegan" | "Gluten-Free" | "Dairy-Free" | "Keto" | "Low-Carb" | "High-Protein"],
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "fiber": number,
    "sugar": number
  },
  "ingredients": [
    { "name": "string", "amount": number, "unit": "string", "category": "produce" | "dairy" | "meat" | "pantry" | "spices" }
  ],
  "steps": [
    { "stepNumber": number, "instruction": "string", "timerMinutes": number, "tip": "string" }
  ],
  "chefTips": ["string"],
  "winePairing": "string"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text?.trim() || '';
      try {
        const recipeData = JSON.parse(responseText);
        return res.json({ recipe: recipeData });
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON:', responseText);
        return res.json({ error: 'PARSE_ERROR', raw: responseText, recipe: null });
      }
    } catch (err: any) {
      console.error('Gemini generate recipe error:', err);
      res.status(500).json({ error: err.message || 'AI Generation failed', recipe: null });
    }
  });

  // 3. AI Cooking Chat endpoint
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, recipeContext } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({ reply: null });
      }

      let systemPrompt = `You are RecipeHub AI, an approachable and world-class culinary sommelier. Provide concise, clear, and actionable culinary guidance. Always offer exact cooking temperatures, ratios, or step-by-step pointers. Keep answers under 120 words unless requested.`;
      if (recipeContext) {
        systemPrompt += `\nCurrent Recipe Context: "${recipeContext.title}" with ingredients: ${JSON.stringify(recipeContext.ingredients)}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\nUser Question: ${message}`,
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // 4. AI Substitutions endpoint
  app.post('/api/ai/substitute', async (req, res) => {
    try {
      const { ingredient, recipeContextName } = req.body;
      const ai = getGeminiClient();

      if (!ai) return res.json({ substitution: null });

      const prompt = `Provide the top culinary substitutes for "${ingredient}" in cooking${recipeContextName ? ` (context: ${recipeContextName})` : ''}.
Return ONLY valid JSON matching:
{
  "ingredient": "${ingredient}",
  "bestOption": {
    "name": "string",
    "ratio": "string (e.g. 1:1 ratio or 3/4 cup per cup)",
    "tasteImpact": "string",
    "bestFor": "string"
  },
  "alternatives": [
    { "name": "string", "ratio": "string", "notes": "string" }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ substitution: parsed });
    } catch (err: any) {
      console.error('Gemini substitution error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // 5. AI Recipe Improvement endpoint
  app.post('/api/ai/improve', async (req, res) => {
    try {
      const { recipe, goal } = req.body;
      const ai = getGeminiClient();

      if (!ai) return res.json({ result: null });

      const prompt = `Optimize the following recipe to make it "${goal}" (e.g. healthier, vegan, quicker, higher protein) without sacrificing taste depth:
Recipe: "${recipe.title}" (${recipe.cuisine})
Current calories: ${recipe.nutrition?.calories || 450}

Return ONLY valid JSON:
{
  "goal": "${goal}",
  "summary": "string",
  "modifiedIngredients": [
    { "original": "string", "replacement": "string", "reason": "string" }
  ],
  "techniqueChanges": ["string"],
  "macroComparison": {
    "originalCalories": number,
    "newCalories": number,
    "keyBenefit": "string"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ result: parsed });
    } catch (err: any) {
      console.error('Gemini improve error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RecipeHub AI server running on http://localhost:${PORT}`);
  });
}

startServer();
