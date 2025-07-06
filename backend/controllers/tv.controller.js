import { fetchFromTMDB } from "../services/tmdb.services.js";


export async function trendingTV(req,res){
     try {
   //      const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
   //      const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

   //      res.json({success:true, content: randomMovie});
   //   } catch (error) {
   //      req.status(500).json({success:false, message:" Internal Server Error"});

     const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTV = data.results[Math.floor(Math.random() * data.results?.length)];
        const randomTVID = randomTV.id;

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${randomTVID}?language=en-US`);;
       
        res.json({success:true, content: response});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}


export async function trendingTVHero(req,res){
     try {
         const page = req.query.page|| 1;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page}`);;
        res.json({success:true, content: data});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}

export async function popularTV(req,res){
     try {
           const page = req.query.page || 1;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`);
        res.json({success:true, content: data});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}


export async function topRatedTV(req,res){
     try {
           const page = req.query.page || 1;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`);;
        res.json({success:true, content: data});
     } catch (error) {
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}


export async function TVDetails(req,res){
    const {id} = req.params;
     try {
   
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);;
        res.json({success:true, content: data});
     } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);

        }
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}

export async function TVSeasonDetails (req,res){
      const {id, season_number} = req.params;
      try {
         const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=en-US`);
         res.json({success:true, content:data});
      } catch (error) {
             if(error.message.includes("404")){
            return res.status(404).send(null);

        }
        res.status(500).json({success:false, message:" Internal Server Error"});
      }
}

export async function TVRecommendations(req,res){
    const {id} = req.params;
     try {
   
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`);;
        res.json({success:true, content: data});
     } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);

        }
        req.status(500).json({success:false, message:" Internal Server Error"});
     }
}