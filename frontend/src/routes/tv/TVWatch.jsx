import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function TVWatch() {
   
    const {id} = useParams();
    const {season_number} = useParams();

    const [season, setSeason] = useState({});
    const [ep, setEp] = useState(0);
    
   useEffect(()=>{
        const getSeasonDetails = async ()=>{
             try {
                const res = await axios.get(`/api/tv/${id}/TVDetails`);
                console.log(res.data.content.seasons[season_number]);
                setSeason(res.data.content.seasons[season_number]);
                setEp(res.data.content.season[season_number].episode_count)
             } catch (error) {
                console.error("Error fetching seasons", error);
             }
        }
        getSeasonDetails();
   }, [id])
      
  const backdropUrl = season?.poster_path
    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
    : "";


  return (
      <div
   style={{
    backgroundImage: `
      radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.95)),
      url(${backdropUrl})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
    className="bg-cover bg-center h-screen w-full relative flex flex-col justify-center items-center text-white"
  >
    
      <div>
        <iframe src={`https://autoembed.co/tv/tmdb/${id}-${season.season_number}-${ep}`} width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
      </div>

     <div>
      {ep.map((eps, index)=>(
             <button>{index+1}</button>
        ))}  
     </div>

    </div>


  )
}

export default TVWatch