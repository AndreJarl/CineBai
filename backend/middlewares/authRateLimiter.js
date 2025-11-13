// middleware/authRateLimiter.js
import rateLimit from "express-rate-limit";

// Rate limiter for login/signup endpoints to prevent brute force attacks
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // max 10 requests per IP per 15 minutes
  standardHeaders: true, // rate limit info in headers
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count all requests
  handler: (req, res) => {
    const retryAfter = Math.ceil(res.getHeader("Retry-After") || 900); // seconds (15 minutes)
    res.status(429).json({
      success: false,
      error: "Too many authentication attempts. Please wait before trying again.",
      message: `Please try again in ${Math.ceil(retryAfter / 60)} minutes.`,
      retryAfterSeconds: retryAfter,
    });
  },
});

