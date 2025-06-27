import { fetchFromTMDB } from "../services/tmdb.services.js";


export async function trendingMovie(req,res){
     try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        const randomMovieID = randomMovie.id;

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${randomMovieID}?language=en-US`);;
       

        res.json({success:true, content: response});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}


export async function trendingMoviesHero(req,res){
     try {
         const page = req.query.page|| 1;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`);;
        res.json({success:true, content: data});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}

export async function popularMovies(req,res){
     try {
           const page = req.query.page || 1;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`);
        res.json({success:true, content: data});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}


export async function topRatedMovies(req,res){
     try {
           const page = req.query.page || 1;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`);;
        res.json({success:true, content: data});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}


export async function movieDetails(req,res){
    const {id} = req.params;
     try {
   
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({success:true, content: data});
     } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);

        }
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}

export async function movieRecommendations(req,res){
    const {id} = req.params;
     try {
   
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`);;
        res.json({success:true, content: data});
     } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);

        }
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}