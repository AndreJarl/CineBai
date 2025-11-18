import { Star} from 'lucide-react';
import AddToListButton from './AddToListButtonMovie';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Hero() {
    
     const [trendingMovie, setTrendingMovie ] = useState([]);
     
        useEffect(() => {
          let isMounted = true;

          const getTrendingMovie = async () => {
            try {
              const res = await axios.get(`/api/movie/trendingMovie`);
              if (isMounted) setTrendingMovie(res.data.content);
            } catch (error) {
              console.error('Error fetching trending movie:', error);
            }
          };

          getTrendingMovie();

          return () => {
            isMounted = false; // cleanup to prevent setting state after unmount
          };
        }, []);



const backdropUrl = trendingMovie.backdrop_path
  ? window.innerWidth >= 1024
      ? `https://image.tmdb.org/t/p/w1920_and_h1080_bestv2${trendingMovie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w1280_and_h720_bestv2${trendingMovie.backdrop_path}`
  : null;

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
  className="bg-cover bg-center h-screen w-full relative text-white -mt-24"
>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start">
    <div className=" text-white px-4 lg:mx-28 mx-4 md:mx-10 flex flex-col gap-5 mt-24">
      <p className='text-sm opacity-75'>Duration: {trendingMovie.runtime ? covertedDuration(trendingMovie.runtime) : ''}</p>
      <div className='flex flex-row items-center gap-4'>
           <p className='flex items-center gap-2 lg:text-lg text-sm font-medium'>⭐ {trendingMovie.vote_average?.toFixed(1)}</p>
            <div className='flex flex-row items-center gap-3'>
           {trendingMovie.genres?.map((genre, index) => (
              <p className="lg:text-sm text-xs opacity-75" key={index}>
                {genre.name} {index !== trendingMovie.genres.length - 1 && '|'}
              </p>
            ))}
            </div>
      </div>
      <h1 className="lg:text-6xl md:text-6xl text-3xl font-semibold mb-4">{trendingMovie.title}</h1>
      <p className="max-w-2xl text-xs lg:text-base md:text-xl  font-normal">{trendingMovie.overview}</p>
      <AddToListButton movie={trendingMovie} mediaType="movie"/>
    </div>
  </div>
</div>

  )
}

export default Hero