import { fetchFromTMDB } from "../services/tmdb.services.js";
import { GoogleGenAI } from "@google/genai";
import { ENV_VARS } from "../config/envVars.js";

// Initialize Google GenAI client
const ai = new GoogleGenAI({ apiKey: ENV_VARS.GOOGLE_API_KEY });

export async function AIRecommendation(req, res) {
  try {
    const { prompt } = req.body;
    const { content } = req.params;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    // Combined AI request for intro message + titles
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a ${content} expert. 
Please do two things based on this description: "${prompt}":
1. Write a short, friendly AI message introducing ${content} recommendations.
2. Recommend exactly 10 real ${content} titles, one per line, no years or extra text.
Separate the message and the list clearly.`
            },
          ],
        },
      ],
      config: { thinking: { budget_millis: 0 } },
    });

    // Extract AI-generated text
    const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!aiText.trim()) {
      console.log("Full AI response:", JSON.stringify(response, null, 2));
      return res.status(500).json({ error: "AI did not return any content" });
    }

    // Split AI response into intro message and titles
    const [aiMessage, ...rest] = aiText.split("\n").filter(line => line.trim() !== "");
    const titles = rest.map(t => t.replace(/^\d+\.\s*/, "").trim()).filter(Boolean);

    // Fetch details from TMDB
    const recommendations = [];
    for (const title of titles) {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/${content}?query=${encodeURIComponent(title)}`
      );
      if (data.results?.length) {
        recommendations.push(data.results[0]);
      }
    }

    res.status(200).json({ message: aiMessage, recommendations });
  } catch (error) {
    console.error("AIRecommendation error:", error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
}
