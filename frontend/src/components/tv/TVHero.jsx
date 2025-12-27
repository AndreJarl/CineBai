import { useEffect, useState } from "react";
import axios from "axios";
import AddToListButtonTV from "./AddToListButtonTV";

function TVHero() {
  const [trendingTV, setTrendingTV] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getTrendingTV = async () => {
      try {
        const res = await axios.get("/api/tv/trendingTV");
        if (isMounted) {
          setTrendingTV(res.data.content);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching trending TV:", error);
      }
    };

    getTrendingTV();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-neutral-900 animate-pulse -mt-20">
        <div className="mx-4 lg:mx-28 md:mx-10 flex flex-col gap-5 pt-72">
          <div className="h-6 w-1/4 bg-gray-600 rounded" />
          <div className="h-10 w-1/6 bg-gray-600 rounded mt-2" />
          <div className="h-6 w-full bg-gray-600 rounded mt-2" />
          <div className="h-6 w-2/3 bg-gray-600 rounded mt-2" />
        </div>
      </div>
    );
  }

  if (!trendingTV) return null;

  // Responsive image URLs
  const backdropSmall = `https://image.tmdb.org/t/p/w500${trendingTV.backdrop_path}`;
  const backdropMedium = `https://image.tmdb.org/t/p/w780${trendingTV.backdrop_path}`;
  const backdropLarge = `https://image.tmdb.org/t/p/w1280${trendingTV.backdrop_path}`;

  return (
    <div className="relative h-screen w-full -mt-20">
      {/* Responsive hero image */}
      <img
        src={backdropSmall}
        srcSet={`
          ${backdropSmall} 500w,
          ${backdropMedium} 780w,
          ${backdropLarge} 1280w
        `}
        sizes="(max-width: 768px) 100vw, 1280px"
        alt={trendingTV.name}
        loading="lazy"
        decoding="async"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/60 flex -mt-32 lg:mt-0 items-center justify-start">
        <div className="text-white px-4 lg:mx-28 mx-4 md:mx-10 flex flex-col gap-5 mt-24">
          <p className="text-sm opacity-75">📺 Season {trendingTV.number_of_seasons}</p>

          <div className="flex flex-row items-center gap-4">
            <p className="flex items-center gap-2 lg:text-lg text-sm font-medium">
              ⭐ {trendingTV.vote_average?.toFixed(1)}
            </p>
            <div className="flex flex-row items-center gap-3">
              {trendingTV.genres?.map((genre, index) => (
                <p className="lg:text-sm text-xs opacity-75" key={index}>
                  {genre.name} {index !== trendingTV.genres.length - 1 && "|"}
                </p>
              ))}
            </div>
          </div>

          <h1 className="lg:text-6xl md:text-6xl text-3xl font-semibold mb-4">
            {trendingTV.name}
          </h1>
          <p className="max-w-2xl text-xs lg:text-base md:text-xl font-normal">
            {trendingTV.overview}
          </p>

          <AddToListButtonTV tv={trendingTV} mediaType="tv" />
        </div>
      </div>
    </div>
  );
}

export default TVHero;
