import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AddToListButton from '../../components/movie/AddToListButtonMovie';
import SimilarMovies from '../../components/movie/SimilarMovies';
import AddToListButtonTV from '../../components/tv/AddToListButtonTV';
import TVSeasons from '../../components/tv/TVSeasons';

function  TVDetails() {
      
  const [tv, setTV] = useState({});
  const {id} = useParams();

    useEffect(()=>{
        const getTVDetails = async () =>{
              try {
                const res = await axios.get(`/api/tv/${id}/TVDetails`);
              setTV(res.data.content);
              console.log(res.data.content)

              } catch (error) {
                   console.error("Failed to fetch movie details", error);
              }
        }

        getTVDetails();
    }, [id])


    
const backdropUrl = `https://image.tmdb.org/t/p/original${tv.backdrop_path}`;
  return (
    <>
     <Navbar/>
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
    className="bg-cover bg-center h-full w-full relative flex flex-col justify-center items-center text-white -mt-20"
  >
    
    
       <div className='flex justify-center items-center lg:flex-row flex-col gap-6 mx-10 mt-36'>
           <div>
                 <img  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.name}  className="h-[400px]  hover:scale-110  transition-transform duration-300 w-[300px] object-cover rounded-lg shadow-md"/>
           </div>
           <div className='flex flex-col items-start justify-center gap-4 text-left'>
         
               <p className='lg:text-5xl text-4xl max-w-xl font-semibold'>{tv.name}</p>
               <div className='flex flex-row  gap-2 items-center'>
               {tv.genres?.map((genre, index) => (
              <p className="lg:text-sm text-xs opacity-75" key={index}>
                 {genre.name} {index !== tv.genres.length - 1 && '|'}
              </p>
            ))}
               </div>
               <p className="max-w-xl text-xs lg:text-base md:text-xl  font-normal">{tv.overview}</p>
               <p className='text-white flex justify-center items-center lg:text-base text-[12px] gap-2'>⭐ {tv.vote_average?.toFixed(1)} <span className='lg:text-sm text-[10px] opacity-75'>({tv.vote_count} votes) </span>| 📺 Season {tv.number_of_seasons} |  📅  {tv.last_air_date ? tv.last_air_date.slice(0, 4) : 'N/A'} </p>
               <AddToListButtonTV tv={tv} mediaType="tv" />
             
           </div>
         
       </div>
       <div className=''>
          <TVSeasons tv={tv.seasons}/>
      
    </div>
    </div>
   
   
   </>
  )
}

export default TVDetails