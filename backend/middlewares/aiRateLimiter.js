// middleware/aiRateLimiter.js
import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requests per IP per window
  standardHeaders: true, // rate limit info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = Math.ceil(res.getHeader("Retry-After") || 60); // seconds
    res.status(429).json({
      error: "Too many requests. Please wait before trying again.",
      retryAfterSeconds: retryAfter,
    });
  },
});
