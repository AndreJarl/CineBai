import axios from 'axios';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MovieTrending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const res = await axios.get('/api/movie/trendingMoviesHero?page=1');
        setTrendingMovies(res.data.content.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getTrendingMovies();
  }, []);



 

  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="min-h-[600px] pt-10 relative">
    <p className="flex text-white items-center gap-4 justify-start lg:ml-40 font-medium ml-10 lg:text-5xl text-4xl">
        <Flame color="#ff3705" size={60} /> Trending Movies
      </p>
      <div className="flex justify-center items-center">
        <div className="w-[78%] h-[1px] bg-gray-400 opacity-60 mt-5"></div>
      </div>

      <MovieCard trendingMovies={trendingMovies} />
    </div>
  );
}

export default MovieTrending;
