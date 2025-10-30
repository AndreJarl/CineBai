import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flame, BookOpen, ChevronLeft, ChevronRight, TrendingUp , Trophy } from 'lucide-react';
import { useParams } from 'react-router-dom';
// Corrected import paths based on common project structure
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TVPageCard from '../../components/tv/TVPageCard';

function TVPage() {
  const [series, setSeries] = useState([]); 
  const [page, setPage] = useState(1);
  const { seriesType } = useParams();

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };


  useEffect(() => {
    const fetchSeries = async () => {
      let endpoint = '';
      switch (seriesType) {
        case 'trending':
          endpoint = `/api/tv/trendingTVHero?page=${page}`;
          break;
        case 'popular':
          endpoint = `/api/tv/popularTV?page=${page}`;
          break;
        case 'topRated':
          endpoint = `/api/tv/topRatedTV?page=${page}`;
          break;
        default:
          endpoint = `/api/tv/popularTV?page=${page}`; 
          break;
      }
      try {
        const res = await axios.get(endpoint);
        setSeries(res.data.content.results || []);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } catch (error) {
        console.error(`Error fetching ${seriesType} series:`, error);
      }
    };

    if (typeof page === 'number') {
      fetchSeries();
    }
  }, [seriesType, page]);

  return (
    <>
      <Navbar />
      <div className='flex justify-around lg:gap-10 gap-0 items-center mt-10 px-7'>
        <p className="flex text-white items-center lg:gap-4 gap-2 justify-start font-medium lg:text-5xl md:text-3xl text-lg">
          {(() => {
        switch (seriesType) {
          case 'trending':
            return <Flame color="#ff3705" className="hidden md:inline" size={60} />;
          case 'popular':
            return <TrendingUp color="#d4ff00" className="hidden md:inline" size={60} />;
          case 'topRated':
            return <Trophy color="#ffc800" className="hidden md:inline" size={60} />;
          default:
            return <Flame color="#ff3705" className="hidden md:inline" size={60} />;
        }
      })()}
          {seriesType.charAt(0).toUpperCase() + seriesType.slice(1)} Series
        </p>
        <p className='flex items-center gap-1 bg-gray-600 py-1 px-2 text-xs md:px-3 md:text-sm lg:px-3 text-white rounded-lg'>
          <BookOpen size={20} />: {page}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[78%] h-[1px] bg-gray-400 opacity-60 mt-5"></div>
      </div>
      <div className='flex flex-col items-center'>
        <TVPageCard trendingTV={series} /> 
        <div className="flex items-center gap-3 mt-5 mb-3">
          <button
            onClick={prevPage}
            className="bg-red-900 flex items-center gap-2 py-1 px-3 text-xs lg:text-base lg:px-7 lg:py-1 text-white mt-5 mb-10 rounded-lg hover:bg-red-800 transition-colors duration-200"
          >
            <ChevronLeft /> PREV PAGE
          </button>
          
          <input
            className='w-20 text-center flex items-center h-8 mt-5 mb-10 outline-none rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-red-500 transition-all duration-200 '
            type="number"
            value={page}
            onChange={(e)=>setPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1) {
                  setPage(value);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }}
            min="1"
            placeholder='Page'
          />
          
          <button
            onClick={nextPage}
            className="bg-red-900 flex items-center gap-2 py-1 px-3 text-xs lg:text-base lg:px-7 lg:py-1 text-white mt-5 mb-10 rounded-lg hover:bg-red-800 transition-colors duration-200"
          >
            NEXT PAGE <ChevronRight />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TVPage;
