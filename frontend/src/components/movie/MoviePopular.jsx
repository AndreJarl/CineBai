import axios from 'axios';
import { TrendingUp  } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MoviePopular() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await axios.get('api/movie/popularMovies');
        setTrendingMovies(res.data.content.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getPopularMovies();
  }, []);



 

  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="min-h-[600px] pt-10 relative">
      <p className="flex text-white items-center lg:gap-4 gap-2 justify-start lg:ml-40 font-medium ml-10 lg:text-5xl text-3xl">
        <TrendingUp color="#d4ff00" size={60} /> Popular Movies
      </p>
      <div className="flex justify-center items-center">
        <div className="w-[78%] h-[1px] bg-gray-400 opacity-60 mt-5"></div>
      </div>

      <MovieCard trendingMovies={trendingMovies} />
    </div>
  );
}

export default MoviePopular;
