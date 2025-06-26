import express from 'express';
import {
        trendingMovie,
        trendingMoviesHero, 
        popularMovies,
        topRatedMovies,
        movieDetails,
        movieRecommendations
     } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trendingMovie", trendingMovie);
router.get("/trendingMoviesHero", trendingMoviesHero);
router.get("/popularMovies", popularMovies);
router.get("/topRatedMovies", topRatedMovies);

router.get("/:id/movieDetails", movieDetails);
router.get("/:id/movieRecommendations", movieRecommendations);


export default router;