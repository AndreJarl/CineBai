import express from 'express';
import { myProfile, addToList, deleteToList, addToWatched, deleteFromWatched } from '../controllers/user.controllers.js';
import { protectRoutes } from '../middlewares/proctectRoutes.js';

const router = express.Router();

router.get("/myProfile", protectRoutes, myProfile);

router.post("/list/:type", protectRoutes, addToList);
router.delete("/list/:type", protectRoutes, deleteToList);

router.post("/watched", protectRoutes, addToWatched);
router.delete("/watched", protectRoutes, deleteFromWatched);

export default router;