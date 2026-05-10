// routes/feedback.route.js
import express from 'express';
import { createFeedback, checkEligibility } from '../controllers/feedback.controller.js'; 
import { protectRoutes } from '../middlewares/proctectRoutes.js'; 

const router = express.Router();

// 2. Add the GET route for eligibility check
// This becomes /api/v1/feedback/check-eligibility
router.get('/check-eligibility', protectRoutes, checkEligibility);

// Only authenticated users can POST feedback
router.post('/', protectRoutes, createFeedback);

export default router;