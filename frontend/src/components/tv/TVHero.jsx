import { Star} from 'lucide-react';
import AddToListButton from '../AddToListButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TVHero() {
    
     const [trendingTV, setTrendingTV ] = useState([]);

         useEffect(()=>{
               const getTrendingMovie = async () =>{
                      try {
                          const res = await axios.get(`/api/tv/trendingTV`);
                           setTrendingTV(res.data.content);
                           console.log(res.data.content);

                      } catch (error) {
                        console.error('Error fetching trending movie:', error);
                      }
               }

               getTrendingMovie();
         }, []);

const backdropUrl = `https://image.tmdb.org/t/p/original${trendingTV.backdrop_path}`;

function covertedDuration (minutes){
     const hours = Math.floor(minutes/60);
     const mins = minutes % 60;
     return `${hours}h : ${mins}m`
}
  return (
  

<div
  style={{
    backgroundImage: `
      radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%),
      url(${backdropUrl})
    `
  }}
  className="bg-cover bg-center h-screen w-full relative text-white -mt-20"
>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start">
    <div className=" text-white px-4 lg:mx-28 mx-4 md:mx-10 flex flex-col gap-5 mt-24">
      <p className='text-sm opacity-75'>Season {trendingTV.number_of_seasons}</p>
      <div className='flex flex-row items-center gap-4'>
           <p className='flex items-center gap-2 lg:text-lg text-sm font-medium'>⭐ {trendingTV.vote_average?.toFixed(1)}</p>
            <div className='flex flex-row items-center gap-3'>
           {trendingTV.genres?.map((genre, index) => (
              <p className="lg:text-sm text-xs opacity-75" key={index}>
                {genre.name} {index !== trendingTV.genres.length - 1 && '|'}
              </p>
            ))}
            </div>
      </div>
      <h1 className="lg:text-6xl md:text-6xl text-3xl font-semibold mb-4">{trendingTV.name}</h1>
      <p className="max-w-2xl text-xs lg:text-base md:text-xl  font-normal">{trendingTV.overview}</p>
      <AddToListButton movie={trendingTV} mediaType="movie"/>
    </div>
  </div>
</div>

  )
}

export default TVHero