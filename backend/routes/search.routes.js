import express from 'express';
import { searchMovie } from '../controllers/search.controller.js';


const router = express.Router();

router.get("/movie/:query", searchMovie);
// router.get("/tv/:query", searchTV);



export default router;
