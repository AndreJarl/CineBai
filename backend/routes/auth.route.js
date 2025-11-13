import express from 'express';
import{ login, signup, logout, authCheck, forgotPassword, verifyResetToken, resetPassword } from "../controllers/auth.controllers.js"
import { protectRoutes } from '../middlewares/proctectRoutes.js';
import { optionalAuth } from '../middlewares/optionalAuth.js';
import { emailRateLimiter } from '../middlewares/emailRateLimiter.js';
import { authRateLimiter } from '../middlewares/authRateLimiter.js';

const router = express.Router();

router.post("/signup", authRateLimiter, signup); // Rate limited to prevent spam
router.post("/login", authRateLimiter, login); // Rate limited to prevent brute force
router.post("/logout", logout);
router.get("/authCheck", optionalAuth, authCheck);
router.post('/forgot-password', emailRateLimiter, forgotPassword); // Rate limited to prevent email spam
router.post('/verify-reset-token', verifyResetToken);
router.post('/reset-password', resetPassword);


export default router;