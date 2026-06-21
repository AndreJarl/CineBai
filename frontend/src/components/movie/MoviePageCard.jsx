import React from 'react'
import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';

function MoviePageCard({ trendingMovies, loading, MOVIES_PER_PAGE }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 mb-10 w-full mt-10">

        {loading
          ? <Skeleton MOVIES_PER_PAGE={MOVIES_PER_PAGE} />
          : trendingMovies.map((movie) => (
            <Link to={`/movie-details/${movie.id}`} key={movie.id}>
              <div
                className="flex flex-col text-white gap-2"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-[170px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-full object-cover rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-white px-1 font-bold truncate text-xs sm:text-sm">{movie.title}</p>
                <div className="flex flex-row justify-between mx-1 text-xs">
                  <span>📅 {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</span>
                  <span className="flex items-center gap-1">⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default MoviePageCard;