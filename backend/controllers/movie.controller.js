import { fetchFromTMDB } from "../services/tmdb.services.js";
import { getCache, setCache } from "../config/redis.js";


export async function trendingMovie(req, res) {
  try {
    const cacheKey = "trending_random_movie";

    // 1️⃣ Check Redis cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving trendingMovie from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    // 2️⃣ Fetch trending movies from TMDB
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    // 3️⃣ Pick a random movie
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    const randomMovieID = randomMovie.id;

    // 4️⃣ Fetch movie details
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${randomMovieID}?language=en-US`
    );

    // 5️⃣ Cache the result in Redis for 2 secs
    await setCache(cacheKey, response, 5);

    // 6️⃣ Send response
    res.json({ success: true, content: response });
  } catch (error) {
    console.error("Error in trendingMovie:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}



export async function trendingMoviesHero(req, res) {
  const page = req.query.page || 1;
  const cacheKey = `trendingMoviesHero?page=${page}`;

  try {
    // 1️⃣ Check Redis first
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log(`🔥 Redis cache hit! ${cacheKey}`);
      return res.json({ success: true, content: cachedData });
    }

    // 2️⃣ If not cached, fetch from TMDB
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`
    );

    // 3️⃣ Save result in Redis
    await setCache(cacheKey, data, 3600); // cache for 1 hour
    console.log(`🚀 Redis cache miss! Cached now: ${cacheKey}`);

    res.json({ success: true, content: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function popularMovies(req, res) {
  try {
    const page = req.query.page || 1;
    const cacheKey = `popularMovies?page=${page}`;

    // 1️⃣ Check Redis cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving popularMovies from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    // 2️⃣ Fetch from TMDB if not cached
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
    );

    // 3️⃣ Cache the response in Redis for 1 hour (3600 seconds)
    await setCache(cacheKey, data, 3600);

    // 4️⃣ Send response
    res.json({ success: true, content: data });
  } catch (error) {
    console.error("Error in popularMovies:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


export async function topRatedMovies(req, res) {
  try {
    const page = req.query.page || 1;
    const cacheKey = `topRatedMovies?page=${page}`;

    // Check Redis cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving topRatedMovies from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    // Fetch from TMDB if not cached
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`
    );

    // Cache response for 1 hour
    await setCache(cacheKey, data, 3600);

    res.json({ success: true, content: data });
  } catch (error) {
    console.error("Error in topRatedMovies:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 2️⃣ Movie Details
export async function movieDetails(req, res) {
  const { id } = req.params;
  const cacheKey = `movieDetails:${id}`;

  try {
    // Check Redis cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving movieDetails from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    // Fetch from TMDB if not cached
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    // Cache response for 1 hour
    await setCache(cacheKey, data, 3600);

    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.error("Error in movieDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 3️⃣ Movie Recommendations
export async function movieRecommendations(req, res) {
  const { id } = req.params;
  const cacheKey = `movieRecommendations:${id}`;

  try {
    // Check Redis cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("🔥 Serving movieRecommendations from Redis:", cacheKey);
      return res.json({ success: true, content: cachedData });
    }

    // Fetch from TMDB if not cached
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
    );

    // Cache response for 1 hour
    await setCache(cacheKey, data, 3600);

    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.error("Error in movieRecommendations:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}