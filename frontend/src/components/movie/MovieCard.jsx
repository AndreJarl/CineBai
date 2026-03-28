import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

function MovieCard({ trendingMovies, loading }) {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const scrollDesktop = (dir) => {
    if (desktopRef.current) {
      desktopRef.current.scrollBy({
        left: dir === "next" ? 980 : -980,
        behavior: "smooth",
      });
    }
  };

  const scrollMobile = (dir) => {
    if (mobileRef.current) {
      mobileRef.current.scrollBy({
        left: dir === "next" ? 260 : -260,
        behavior: "smooth",
      });
    }
  };

  const getResponsiveImage = (path) => ({
    src: `https://image.tmdb.org/t/p/w500${path}`,
    srcSet: `
      https://image.tmdb.org/t/p/w500${path} 500w,
      https://image.tmdb.org/t/p/w780${path} 780w,
      https://image.tmdb.org/t/p/w1280${path} 1280w
    `,
    sizes: "(max-width: 768px) 65vw, 220px",
  });

  const renderCard = (movie, index, isMobile = false) => {
    const img = getResponsiveImage(movie.poster_path);

    return (
      <Link key={index} to={`/movie-details/${movie.id}`}>
        <div
          className={`group flex flex-col gap-3 text-white shrink-0 ${
            isMobile ? "min-w-[160px] max-w-[160px]" : "min-w-[190px] max-w-[190px]"
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {/* Poster */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes={img.sizes}
              alt={movie.title}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                isMobile ? "h-[235px]" : "h-[285px]"
              }`}
              loading="lazy"
              decoding="async"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Rating badge */}
            <div className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur-md">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </div>
          </div>

          {/* Info */}
          <div className="px-1">
            <p className="truncate text-sm md:text-base font-semibold">
              {movie.title}
            </p>

            <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
              <span>
                {movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : "N/A"}
              </span>
              <span>Movie</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block relative">
        {!loading && trendingMovies.length > 0 && (
          <>
            <button
              onClick={() => scrollDesktop("prev")}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl hover:bg-white/15 transition"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => scrollDesktop("next")}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl hover:bg-white/15 transition"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <div className="px-12">
          {loading ? (
            <div className="flex gap-4">
            <Skeleton MOVIES_PER_PAGE={5} />
            </div>
          ) : (
            <div
              ref={desktopRef}
              className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide py-2"
            >
              {trendingMovies.map((movie, i) =>
                renderCard(movie, i, false)
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden relative">
        {!loading && trendingMovies.length > 0 && (
          <>
            <button
              onClick={() => scrollMobile("prev")}
              className="absolute left-0 top-[38%] z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-xl"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scrollMobile("next")}
              className="absolute right-0 top-[38%] z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-xl"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {loading ? (
          <Skeleton MOVIES_PER_PAGE={4} />
        ) : (
          <div
            ref={mobileRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-6"
          >
            {trendingMovies.map((movie, i) =>
              renderCard(movie, i, true)
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MovieCard;