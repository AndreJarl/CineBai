import fetch from "node-fetch";

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// GET value from cache
export const getCache = async (key) => {
  try {
    const res = await fetch(`${UPSTASH_REDIS_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${UPSTASH_REDIS_TOKEN}` },
    });

    const data = await res.json();
    if (data.result === null) return null;

    // Upstash REST always returns strings, parse it
    return JSON.parse(data.result);
  } catch (err) {
    console.log("Redis GET error:", err);
    return null;
  }
};


export const setCache = async (key, value, expireSeconds = 3600) => {
  try {
    const url = `${UPSTASH_REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(value))}/EX/${expireSeconds}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_TOKEN}`,
      },
    });
    const result = await res.json();
    if (result.ok) {
      console.log("✅ Redis value set:", key);
    } else {
      console.log("Redis SET failed:", result);
    }
  } catch (err) {
    console.log("Redis SET error:", err);
  }
};

