import axios from 'axios';
import { Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import TVCard from './TVCard';

function TVTopRated() {
  const [trendingTV, setTrendingTV] = useState([]);
  
  useEffect(() => {
    const getTrendingTV = async () => {
      try {
        const res = await axios.get('/api/tv/topRatedTV');
        setTrendingTV(res.data.content.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getTrendingTV();
  }, []);



 

  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="min-h-[600px] pt-10 relative">
      <p className="flex text-white items-center gap-4 justify-start lg:ml-40 font-medium ml-10 lg:text-5xl text-4xl">
        <Trophy  color="#ffc800" size={60} /> Top Rated Movies
      </p>
      <div className="flex justify-center items-center">
        <div className="w-[78%] h-[1px] bg-gray-400 opacity-60 mt-5"></div>
      </div>

      <TVCard trendingTV={trendingTV} />
    </div>
  );
}

export default TVTopRated;
