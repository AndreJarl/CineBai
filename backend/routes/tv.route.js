import express from 'express';
import {
        trendingTV,
        trendingTVHero, 
        popularTV,
        topRatedTV,
        TVDetails,
        TVRecommendations
     } from '../controllers/TV.controller.js';

const router = express.Router();

router.get("/trendingTV", trendingTV);
router.get("/trendingTVHero", trendingTVHero);
router.get("/popularTV", popularTV);
router.get("/topRatedTV", topRatedTV);

router.get("/:id/TVDetails", TVDetails);
router.get("/:id/TVRecommendations", TVRecommendations);


export default router;