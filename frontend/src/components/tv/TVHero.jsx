import { Star} from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddToListButtonTV from './AddToListButtonTV';

function TVHero() {
    
     const [trendingTV, setTrendingTV ] = useState([]);
    const [loading, setLoading] = useState(true);
          useEffect(() => {
            let isMounted = true; // flag to prevent setting state if unmounted

            const getTrendingTV = async () => {
              try {
                const res = await axios.get(`/api/tv/trendingTV`);
                if (isMounted){
                  setTrendingTV(res.data.content);
                  setLoading(false);
                }
                // console.log(res.data.content);
              } catch (error) {
                console.error('Error fetching trending TV:', error);
              }
            };

            getTrendingTV();

            return () => {
              isMounted = false; // cleanup on unmount
            };
          }, []);

 if (loading) {
    // Skeleton loader
    return (
      <div className="h-screen w-full bg-neutral-900 animate-pulse -mt-24">
        <div className="mx-4 lg:mx-28 md:mx-10 flex flex-col gap-5 pt-72 ">
          <div className="h-6 w-1/4 bg-gray-600 rounded" />
          <div className="h-10 w-1/6 bg-gray-600 rounded mt-2" />
          <div className="h-6 w-full bg-gray-600 rounded mt-2" />
          <div className="h-6 w-2/3 bg-gray-600 rounded mt-2" />
        </div>
      </div>
    );
  }

const backdropUrl = trendingTV.backdrop_path
  ? window.innerWidth >= 1024
      ? `https://image.tmdb.org/t/p/w1920_and_h1080_bestv2${trendingTV.backdrop_path}`
      : `https://image.tmdb.org/t/p/w1280_and_h720_bestv2${trendingTV.backdrop_path}`
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
  className="bg-cover bg-center h-screen w-full relative text-white -mt-20"
>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start">
    <div className=" text-white px-4 lg:mx-28 mx-4 md:mx-10 flex flex-col gap-5 mt-24">
      <p className='text-sm opacity-75'>📺 Season {trendingTV.number_of_seasons}</p>
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
      <AddToListButtonTV tv={trendingTV} mediaType="tv"/>
    </div>
  </div>
</div>

  )
}

export default TVHero