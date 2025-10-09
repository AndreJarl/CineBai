import express from "express";
import { protectRoutes } from "../middlewares/proctectRoutes.js";
import { AIRecommendation } from "../controllers/ai.controllers.js";

const router = express.Router();

router.post("/:content/ai-recommendation",protectRoutes,AIRecommendation);

export default router;