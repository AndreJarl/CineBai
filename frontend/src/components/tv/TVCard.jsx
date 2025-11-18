import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton"; // optional, reusable Skeleton component

function TVCard({ trendingTV, loading }) {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const TV_PER_PAGE = 5;

  const nextSlide = () => {
    setCurrentStartIndex((prev) =>
      prev + TV_PER_PAGE >= trendingTV.length ? 0 : prev + TV_PER_PAGE
    );
  };

  const prevSlide = () => {
    setCurrentStartIndex((prev) =>
      prev === 0
        ? Math.max(0, trendingTV.length - TV_PER_PAGE)
        : prev - TV_PER_PAGE
    );
  };

  const visibleTVs = trendingTV.slice(
    currentStartIndex,
    currentStartIndex + TV_PER_PAGE
  );



  return (
    <>
      {/* PC VERSION */}
      <div className="lg:flex md:flex hidden justify-center items-center mt-10 px-5">
        <div className="flex relative lg:w-[1040px] w-screen justify-center items-center mt-10 px-5">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute lg:-left-10 left-0 z-10 text-white bg-slate-900 p-3 rounded-full"
          >
            <ChevronLeft size={30} />
          </button>

          {/* TV posters */}
          <div className="flex gap-5 justify-center overflow-hidden px-14">
            {loading
              ? <Skeleton MOVIES_PER_PAGE={TV_PER_PAGE} /> // reuse Skeleton for PC
              : visibleTVs.map((tv, index) => (
                <Link key={index} to={`/tv-details/${tv.id}`}>
                  <div className='flex flex-col text-white gap-2' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                      alt={tv.name}
                      className="lg:h-[300px] h-[260px] hover:scale-110 transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"
                    />
                    <p className='text-white px-1 font-bold w-[180px] truncate'>{tv.name}</p>
                    <div className='flex flex-row justify-between mx-2'>
                      📅 {tv.first_air_date ? tv.first_air_date.slice(0, 4) : 'N/A'}
                      <p className='text-white flex items-center text-xs gap-2'>⭐ {tv.vote_average?.toFixed(1)}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute lg:-right-10 right-0 z-10 text-white backdrop-blur-sm bg-slate-900 p-3 rounded-full"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>

      {/* MOBILE VERSION */}
      <div className="lg:hidden md:hidden flex justify-center items-center mt-10 px-5">
        <div className="flex relative lg:w-[1040px] w-screen justify-center items-center">
          <div className="grid grid-cols-2 gap-5 justify-center overflow-hidden">
            {loading ?  <Skeleton MOVIES_PER_PAGE={TV_PER_PAGE} /> : visibleTVs.map((tv, index) => (
              <Link key={index} to={`/tv-details/${tv.id}`}>
                <div className='flex flex-col text-white gap-2' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                    alt={tv.name}
                    className="lg:h-[300px] h-[260px] hover:scale-110 transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"
                  />
                  <p className='text-white px-1 font-bold w-[180px] truncate'>{tv.name}</p>
                  <div className='flex flex-row justify-between mx-2'>
                    📅 {tv.first_air_date ? tv.first_air_date.slice(0, 4) : 'N/A'}
                    <p className='text-white flex items-center text-xs gap-2'>⭐ {tv.vote_average?.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TVCard;
