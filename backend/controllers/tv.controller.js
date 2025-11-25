import { getCache, setCache } from "../config/redis.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

// 1️⃣ Trending TV (random TV show)
export async function trendingTV(req, res) {
  try {
    const cacheKey = "trending_random_tv";

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving trendingTV from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTV = data.results[Math.floor(Math.random() * data.results?.length)];
    const randomTVID = randomTV.id;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${randomTVID}?language=en-US`
    );

    await setCache(cacheKey, response, 5); // cache for 10 minutes
    res.json({ success: true, content: response });
  } catch (error) {
    console.error("Error in trendingTV:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 2️⃣ Trending TV Hero (pagination aware)
export async function trendingTVHero(req, res) {
  try {
    const page = req.query.page || 1;
    const cacheKey = `trendingTVHero?page=${page}`;

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving trendingTVHero from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page}`
    );

    await setCache(cacheKey, data, 3600); // cache for 1 hour
    res.json({ success: true, content: data });
  } catch (error) {
    console.error("Error in trendingTVHero:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 3️⃣ Popular TV
export async function popularTV(req, res) {
  try {
    const page = req.query.page || 1;
    const cacheKey = `popularTV?page=${page}`;

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving popularTV from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`
    );

    await setCache(cacheKey, data, 3600);
    res.json({ success: true, content: data });
  } catch (error) {
    console.error("Error in popularTV:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 4️⃣ Top Rated TV
export async function topRatedTV(req, res) {
  try {
    const page = req.query.page || 1;
    const cacheKey = `topRatedTV?page=${page}`;

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving topRatedTV from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`
    );

    await setCache(cacheKey, data, 3600);
    res.json({ success: true, content: data });
  } catch (error) {
    console.error("Error in topRatedTV:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 5️⃣ TV Details
export async function TVDetails(req, res) {
  const { id } = req.params;
  const cacheKey = `TVDetails:${id}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving TVDetails from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    await setCache(cacheKey, data, 3600);
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.error("Error in TVDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 6️⃣ TV Season Details
export async function TVSeasonDetails(req, res) {
  const { id, season_number } = req.params;
  const cacheKey = `TVSeasonDetails:${id}:${season_number}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving TVSeasonDetails from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=en-US`
    );

    await setCache(cacheKey, data, 3600);
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.error("Error in TVSeasonDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 7️⃣ TV Recommendations
export async function TVRecommendations(req, res) {
  const { id } = req.params;
  const cacheKey = `TVRecommendations:${id}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving TVRecommendations from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`
    );

    await setCache(cacheKey, data, 3600);
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.error("Error in TVRecommendations:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
