import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton"; // optional, reusable Skeleton component

function TVCard({ trendingTV, loading }) {
  const desktopScrollRef = useRef(null);
  const mobileScrollRef = useRef(null);

  const desktopScrollAmount = 980;
  const mobileScrollAmount = 260;

  const nextDesktop = () => {
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollBy({
        left: desktopScrollAmount,
        behavior: "smooth",
      });
    }
  };

  const prevDesktop = () => {
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollBy({
        left: -desktopScrollAmount,
        behavior: "smooth",
      });
    }
  };

  const nextMobile = () => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollBy({
        left: mobileScrollAmount,
        behavior: "smooth",
      });
    }
  };

  const prevMobile = () => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollBy({
        left: -mobileScrollAmount,
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

  const renderCard = (tv, index, isMobile = false) => {
    const img = getResponsiveImage(tv.poster_path);

    return (
      <Link key={index} to={`/tv-details/${tv.id}`}>
        <div
          className={`group flex flex-col gap-3 text-white shrink-0 ${
            isMobile ? "min-w-[160px] max-w-[160px]" : "min-w-[190px] max-w-[190px]"
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes={img.sizes}
              alt={tv.name}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                isMobile ? "h-[235px]" : "h-[285px]"
              }`}
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

            <div className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur-md">
              ⭐ {tv.vote_average?.toFixed(1) || "N/A"}
            </div>
          </div>

          <div className="px-1">
            <p className="truncate text-sm md:text-base font-semibold text-white">
              {tv.name}
            </p>

            <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
              <span>
                {tv.first_air_date ? tv.first_air_date.slice(0, 4) : "N/A"}
              </span>
              <span>TV Series</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* DESKTOP / TABLET */}
      <div className="hidden md:block relative">
        <div className="relative">
          {!loading && trendingTV.length > 0 && (
            <>
              <button
                onClick={prevDesktop}
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:scale-105"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextDesktop}
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:scale-105"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div className="px-12">
            {loading ? (
              <div className="mt-8">
                <Skeleton MOVIES_PER_PAGE={5} />
              </div>
            ) : (
              <div
                ref={desktopScrollRef}
                className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide py-2"
              >
                {trendingTV.map((tv, index) => renderCard(tv, index, false))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden relative">
        {!loading && trendingTV.length > 0 && (
          <>
            <button
              onClick={prevMobile}
              className="absolute left-0 top-[38%] z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2.5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextMobile}
              className="absolute right-0 top-[38%] z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2.5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {loading ? (
          <div className="mt-8">
            <Skeleton MOVIES_PER_PAGE={4} />
          </div>
        ) : (
          <div
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-8"
          >
            {trendingTV.map((tv, index) => renderCard(tv, index, true))}
          </div>
        )}
      </div>
    </>
  );
}

export default TVCard;