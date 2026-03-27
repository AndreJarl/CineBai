import { fetchFromTMDB } from "../services/tmdb.services.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV_VARS } from "../config/envVars.js";

const genAI = new GoogleGenerativeAI(ENV_VARS.GOOGLE_API_KEY);

export async function AIRecommendation(req, res) {
  try {
    const { prompt } = req.body;
    const { content } = req.params;

    if (!prompt?.trim()) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    const sanitizedPrompt = prompt.trim().slice(0, 500);
    console.log("Received request:", { sanitizedPrompt, content });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 1024,
      },
    });

    const aiPrompt = `You are a ${content} expert.
Based on the user's input "${sanitizedPrompt}", find relevant ${content} recommendations.
 
Respond in exactly this format:
MESSAGE: <a short friendly intro message on one line>
TITLES:
<title 1>
<title 2>
<title 3>
... (at least 20 titles, one per line, no numbers, no bullets, no years, no extra text)`;

    console.log("Calling Gemini API with model: gemini-2.5-flash");
    const result = await model.generateContent(aiPrompt);
    const aiText = result.response.text();

    console.log("=== RAW AI RESPONSE ===");
    console.log(aiText);
    console.log("=== END RAW AI RESPONSE ===");

    if (!aiText.trim()) {
      return res.status(500).json({ error: "AI did not return any content." });
    }

    // Parse using strict format: MESSAGE: ... and TITLES:
    const messageMatch = aiText.match(/MESSAGE:\s*(.+)/i);
    const titlesMatch = aiText.match(/TITLES:\s*\n([\s\S]+)/i);

    const aiMessage = messageMatch
      ? messageMatch[1].trim()
      : aiText.split("\n")[0].trim();

    const rawTitles = titlesMatch ? titlesMatch[1] : "";

    const titles = rawTitles
      .split("\n")
      .map((t) =>
        t
          .replace(/^\d+\.\s*/, "")              // remove "1. "
          .replace(/^[-•*]\s*/, "")              // remove "- " "• " "* "
          .replace(/\*{1,2}(.*?)\*{1,2}/g, "$1") // remove **bold**
          .trim()
      )
      .filter(Boolean);

    console.log(`Found ${titles.length} titles from AI`);

    if (titles.length === 0) {
      return res.status(500).json({ error: "AI did not return any titles." });
    }

    // Fetch all titles from TMDB in parallel
    const tmdbResults = await Promise.allSettled(
      titles.map((title) =>
        fetchFromTMDB(
          `https://api.themoviedb.org/3/search/${content}?query=${encodeURIComponent(title)}`
        )
      )
    );

    const recommendations = tmdbResults
      .filter((r) => r.status === "fulfilled" && r.value.results?.length)
      .map((r) => r.value.results[0]);

    console.log(`Returning ${recommendations.length} recommendations`);
    res.status(200).json({ message: aiMessage, recommendations });

  } catch (error) {
    console.error("AIRecommendation error:", error.message);

    if (error.message?.includes("API key not valid")) {
      return res.status(500).json({ error: "Invalid Google API key." });
    }
    if (error.message?.includes("quota")) {
      return res.status(500).json({ error: "API quota exceeded. Try again later." });
    }
    if (error.message?.includes("model")) {
      return res.status(500).json({ error: "AI model unavailable. Try again later." });
    }

    res.status(500).json({
      error: "Failed to generate recommendations.",
      details: error.message,
    });
  }
}
