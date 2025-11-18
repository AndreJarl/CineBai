import axios from 'axios';
import { TrendingUp , ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import TVCard from './TVCard';
import { Link } from 'react-router-dom';

function TVPopular() {
  const [trendingTV, setTrendingTV] = useState([]);
   const [loading, setLoading] = useState(true); // track loading state
  const seriesType = "popular";

  useEffect(() => {
    const getPopularTV = async () => {
      try {
        const res = await axios.get('/api/tv/popularTV');
        setTrendingTV(res.data.content.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }finally {
        setLoading(false); // stop loading after fetch
      }
    };

    getPopularTV();
  }, []);



 

  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="min-h-[600px] pt-10 relative">
     <div className='flex justify-around lg:gap-32 items-center px-8'>
            <p className="flex text-white items-center lg:gap-4 gap-2 justify-start  font-medium  lg:text-5xl text-3xl">
        <TrendingUp color="#d4ff00" size={60} /> Popular Series
      </p>
      <Link to={`tv-page/${seriesType}`}><button className='bg-red-700  text-white rounded py-1 lg:px-3 md:px-3 text-xs md:text-base lg:text-base flex items-center'>View All <ChevronRight/></button></Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[78%] h-[1px] bg-gray-400 opacity-60 mt-5"></div>
      </div>

      <TVCard trendingTV={trendingTV} loading={loading}/>
    </div>
  );
}

export default TVPopular;
