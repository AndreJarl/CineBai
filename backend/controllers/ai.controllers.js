import { fetchFromTMDB } from "../services/tmdb.services.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV_VARS } from "../config/envVars.js";

const genAI = new GoogleGenerativeAI(ENV_VARS.GOOGLE_API_KEY);

export async function AIRecommendation(req, res) {
  try {
    const { prompt } = req.body;
    const { content } = req.params;

    console.log('Received request:', { prompt, content });

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }


    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp", 
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 1024,
      }
    });

    const aiPrompt = `You are a ${content} expert.  
Based on the user's input "${prompt}", which may include a character name, theme, description, or keywords that it's related to:  
1. Write a short, friendly AI message introducing relevant ${content} recommendations.  
2. Search the web (and your internal knowledge) to find at least 20 real ${content} titles that best match or relate to the user's input — list one per line, with no years or extra text.  
Separate the message and the list clearly.`;

    console.log('Calling Gemini API with model: gemini-2.0-flash-exp');
    const result = await model.generateContent(aiPrompt);
    const response = result.response;
    const aiText = response.text();

    console.log('AI Response received successfully');

    if (!aiText.trim()) {
      console.log("Full AI response:", response);
      return res.status(500).json({ error: "AI did not return any content" });
    }

    // Split AI response into intro message and titles
    const lines = aiText.split("\n").filter(line => line.trim() !== "");
    const aiMessage = lines[0];
    const titles = lines.slice(1)
      .map(t => t.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    console.log(`Found ${titles.length} titles from AI`);

    // Fetch details from TMDB
    const recommendations = [];
    for (const title of titles) {
      try {
        const data = await fetchFromTMDB(
          `https://api.themoviedb.org/3/search/${content}?query=${encodeURIComponent(title)}`
        );
        if (data.results?.length) {
          recommendations.push(data.results[0]);
        } else {
          console.log(`No TMDB results for: ${title}`);
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error.message);
      }
    }

    console.log(`Returning ${recommendations.length} recommendations`);
    res.status(200).json({ message: aiMessage, recommendations });
    
  } catch (error) {
    console.error("AIRecommendation FULL error:", error);
    console.error("Error stack:", error.stack);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API key not valid')) {
      return res.status(500).json({ error: "Invalid Google API key" });
    }
    if (error.message?.includes('quota')) {
      return res.status(500).json({ error: "API quota exceeded" });
    }
    if (error.message?.includes('model')) {
      return res.status(500).json({ error: "Invalid model name - check available models" });
    }
    
    res.status(500).json({ 
      error: "Failed to generate recommendations",
      details: error.message 
    });
  }
}