import axios from 'axios';
import { TrendingUp, ChevronRight  } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';

function MoviePopular() {
  const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true); // track loading state
  const movieType = "popular";

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await axios.get('api/movie/popularMovies');
        setTrendingMovies(res.data.content.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false); // stop loading after fetch
      }

    };

    getPopularMovies();
  }, []);



 

  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="min-h-[600px] pt-10 relative">
      <div className='flex justify-around lg:gap-32 items-center px-8'>
            <p className="flex text-white items-center lg:gap-4 gap-2 justify-start  font-medium  lg:text-5xl text-3xl">
         <TrendingUp color="#d4ff00" size={60} /> Popular Movies
      </p>
      <Link to={`/movie-page/${movieType}`}><button className='bg-red-700  text-white rounded py-1 lg:px-3 md:px-3 text-xs lg:text-base md:text-base flex items-center'>View All <ChevronRight/></button></Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[78%] h-[1px] bg-gray-400 opacity-60 mt-5"></div>
      </div>

      <MovieCard trendingMovies={trendingMovies} loading={loading} />
    
    </div>
  );
}

export default MoviePopular;
