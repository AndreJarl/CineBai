import { Star} from 'lucide-react';
import AddToListButton from '../AddToListButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Hero() {
    
     const [trendingMovie, setTrendingMovie ] = useState([]);

         useEffect(()=>{
               const getTrendingMovie = async () =>{
                      try {
                          const res = await axios.get(`/api/movie/trendingMovie`);
                           setTrendingMovie(res.data.content)
                           console.log(res.data.content);

                      } catch (error) {
                        console.error('Error fetching trending movie:', error);
                      }
               }

               getTrendingMovie();
         }, []);

const backdropUrl = `https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`;

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
    <div className=" text-white px-4 ml-28 flex flex-col gap-5 mt-24">
      <p className='text-sm opacity-75'>Duration: {trendingMovie.runtime ? covertedDuration(trendingMovie.runtime) : ''}</p>
      <div className='flex flex-row items-center gap-4'>
           <p className='flex items-center gap-2 text-lg font-medium'><Star color='yellow' />{trendingMovie.vote_average?.toFixed(1)}</p>
            <div className='flex flex-row items-center gap-3'>
           {trendingMovie.genres?.map((genre, index) => (
              <p className="text-sm opacity-75" key={index}>
                {genre.name} {index !== trendingMovie.genres.length - 1 && '|'}
              </p>
            ))}
            </div>
      </div>
      <h1 className="text-6xl font-semibold mb-4">{trendingMovie.title}</h1>
      <p className="max-w-2xl text-base font-normal">{trendingMovie.overview}</p>
      <AddToListButton/>
    </div>
  </div>
</div>

  )
}

export default Hero