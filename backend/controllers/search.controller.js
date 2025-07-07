import { fetchFromTMDB } from "../services/tmdb.services.js";



export async function searchContent (req, res){
        const {query, content} = req.params;

        try {
            const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/${content}?query=${query}&include_adult=false&language=en-US&page=1`);

            if(response.results.length === 0){
                return res.status(404).json({success:false, message:"no results"})
            }

           res.status(200).json({success: true, content: response.results})
        } catch (error) {
            console.error("Error in movie search", error.message);
            res.status(500).json({success:false, message:"Internal server error"});
        }
}