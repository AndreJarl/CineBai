// middleware/emailRateLimiter.js
import rateLimit from "express-rate-limit";

// Stricter rate limiter for email-sending endpoints
// Prevents spam and protects SendGrid rate limits
export const emailRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3, // max 3 requests per IP per hour (very strict for email sending)
  standardHeaders: true, // rate limit info in headers
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count all requests, even successful ones
  handler: (req, res) => {
    const retryAfter = Math.ceil(res.getHeader("Retry-After") || 3600); // seconds (1 hour)
    res.status(429).json({
      success: false,
      error: "Too many password reset requests. Please wait before trying again.",
      message: `You can request a password reset ${retryAfter > 60 ? Math.ceil(retryAfter / 60) + ' minutes' : retryAfter + ' seconds'} later.`,
      retryAfterSeconds: retryAfter,
    });
  },
});

