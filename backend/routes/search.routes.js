import express from 'express';
import { searchContent } from '../controllers/search.controller.js';


const router = express.Router();

router.get("/content/:content/:query", searchContent);
// router.get("/tv/:query", searchTV);



export default router;
