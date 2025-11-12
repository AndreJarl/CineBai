import express from "express";
import { protectRoutes } from "../middlewares/proctectRoutes.js";
import { AIRecommendation } from "../controllers/ai.controllers.js";
import { aiRateLimiter } from "../middlewares/aiRateLimiter.js";


const router = express.Router();

router.post("/:content/ai-recommendation",protectRoutes, aiRateLimiter ,AIRecommendation);

export default router;