import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

function MovieCard({ trendingMovies, loading }) {
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

  const getResponsiveImage = (path) => ({
    src: `https://image.tmdb.org/t/p/w500${path}`,
    srcSet: `
      https://image.tmdb.org/t/p/w500${path} 500w,
      https://image.tmdb.org/t/p/w780${path} 780w,
      https://image.tmdb.org/t/p/w1280${path} 1280w
    `,
    sizes: "(max-width: 768px) 100vw, 180px",
  });

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

          {/* Movie posters */}
          <div className="flex gap-5 justify-center overflow-hidden px-14">
            {loading
              ? <Skeleton MOVIES_PER_PAGE={MOVIES_PER_PAGE} />
              : visibleMovies.map((movie, index) => {
                  const img = getResponsiveImage(movie.poster_path);
                  return (
                    <Link key={index} to={`/movie-details/${movie.id}`}>
                      <div
                        className="flex flex-col text-white gap-2"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <img
                          src={img.src}
                          srcSet={img.srcSet}
                          sizes={img.sizes}
                          alt={movie.title}
                          className="lg:h-[300px] md:h-[300px] hover:scale-110 transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"
                          loading="lazy"
                          decoding="async"
                          width="180"
                          height="300"
                        />
                        <p className="text-white px-1 font-bold w-[180px] truncate">
                          {movie.title}
                        </p>
                        <div className="flex flex-row justify-between mx-2">
                          📅 {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                          <p className="text-white flex items-center text-xs gap-2">
                            ⭐ {movie.vote_average?.toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
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
            {loading
              ? <Skeleton MOVIES_PER_PAGE={MOVIES_PER_PAGE} />
              : visibleMovies.map((movie, index) => {
                  const img = getResponsiveImage(movie.poster_path);
                  return (
                    <Link key={index} to={`/movie-details/${movie.id}`}>
                      <div
                        className="flex flex-col text-white gap-2"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <img
                          src={img.src}
                          srcSet={img.srcSet}
                          sizes={img.sizes}
                          alt={movie.title}
                          className="lg:h-[300px] h-[260px] hover:scale-110 transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"
                          loading="lazy"
                          decoding="async"
                          width="180"
                          height="260"
                        />
                        <p className="text-white text-sm px-1 font-bold w-[180px] truncate">
                          {movie.title}
                        </p>
                        <div className="flex flex-row text-sm justify-between mx-2">
                          📅 {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                          <p className="text-white flex items-center text-xs gap-2">
                            ⭐ {movie.vote_average?.toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
