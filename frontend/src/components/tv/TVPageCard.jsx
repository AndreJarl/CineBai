import React from 'react'
import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';

function TVPageCard({ trendingTV, loading }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-10 mb-10 overflow-hidden px-5 lg:px-14 mt-10">

        {loading
          ? <Skeleton MOVIES_PER_PAGE={20} />
          : trendingTV.map((show) => (
            <Link to={`/tv-details/${show.id}`} key={show.id}>
              <div
                className="flex flex-col text-white gap-2"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="h-[170px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-full object-cover rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-white px-1 font-bold truncate text-xs sm:text-sm">{show.name}</p>
                <div className="flex flex-row justify-between mx-1 text-xs">
                  <span>📅 {show.first_air_date ? show.first_air_date.slice(0, 4) : 'N/A'}</span>
                  <span className="flex items-center gap-1">⭐ {show.vote_average?.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default TVPageCard;