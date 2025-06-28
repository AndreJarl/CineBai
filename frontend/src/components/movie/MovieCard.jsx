import { useState } from "react";
import {ChevronLeft, ChevronRight } from 'lucide-react';
import {Star} from 'lucide-react';

function MovieCard({trendingMovies}) {

    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    
      const MOVIES_PER_PAGE = 5;
    
        const nextSlide = () => {
    setCurrentStartIndex((prev) =>
      prev + MOVIES_PER_PAGE >= trendingMovies.length ? 0 : prev + MOVIES_PER_PAGE
    );
  };

  const prevSlide = () => {
    setCurrentStartIndex((prev) =>
      prev === 0
        ? Math.max(0, trendingMovies.length - MOVIES_PER_PAGE)
        : prev - MOVIES_PER_PAGE
    );
  };

   const visibleMovies = trendingMovies.slice(
    currentStartIndex,
    currentStartIndex + MOVIES_PER_PAGE
  );

  return (
  <div className=" flex justify-center items-center  mt-10 px-5">
      <div className=" flex relative lg:w-[1040px]   w-screen justify-center items-center mt-10 px-5">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute lg:-left-10 left-0  z-10 text-white  bg-slate-900  p-3 rounded-full"
        >
          <ChevronLeft size={30} />
        </button>
    
        {/* Movie posters */}
        <div className="flex gap-5 justify-center overflow-hidden px-14">
         
          {visibleMovies.map((movie, index) => (
             <div className='flex flex-col text-white gap-2'>
            <img key={index} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}  className="h-[300px] hover:scale-110  transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"/>
             
            <p className='text-white px-1 font-bold w-[180px] truncate'>{movie.title}</p>
            <div className='flex flex-row justify-between mx-2'> 
               <p className='text-xs'>{movie.release_date?.slice(0, 4)}</p>
              <p className='text-white flex items-center text-xs gap-2'><Star color='yellow' size={14}/> {movie.vote_average?.toFixed(1)}</p>
             
            </div>
           
               </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute lg:-right-10 right-0 z-10 text-white backdrop-blur-sm bg-slate-900 p-3 rounded-full"
        >
          <ChevronRight  size={30} />
        </button>
      </div>
       </div>
  )
}

export default MovieCard