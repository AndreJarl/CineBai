import express from 'express';
import{ login, signup, logout, authCheck, updatePass } from "../controllers/auth.controllers.js"
import { protectRoutes } from '../middlewares/proctectRoutes.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updatepass", updatePass);
router.get("/authCheck", protectRoutes, authCheck);

export default router;