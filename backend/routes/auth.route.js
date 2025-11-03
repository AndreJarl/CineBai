import express from 'express';
import{ login, signup, logout, authCheck, forgotPassword, verifyResetToken, resetPassword } from "../controllers/auth.controllers.js"
import { protectRoutes } from '../middlewares/proctectRoutes.js';
import { optionalAuth } from '../middlewares/optionalAuth.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", optionalAuth, authCheck);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-token', verifyResetToken);
router.post('/reset-password', resetPassword);


export default router;