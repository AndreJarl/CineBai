import axios from "axios";
import { Trophy, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

function MovieTopRated() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const movieType = "topRated";

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const res = await axios.get("/api/movie/topRatedMovies?page=1");
        setTrendingMovies(res.data.content.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <section className="relative bg-[#070707] pt-12 pb-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="flex items-center gap-2 md:gap-3 text-white font-semibold text-2xl md:text-3xl lg:text-5xl tracking-tight">
            <Trophy color="#ffc800" size={42} />
            Top Rated
          </p>

          <Link to={`/movie-page/${movieType}`}>
            <button className="flex items-center gap-1 rounded-full border border-red-400/20 bg-red-500/10 backdrop-blur-xl px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm lg:text-base text-red-100 transition-all duration-300 hover:bg-red-500/20 hover:border-red-400/30 hover:scale-[1.02] shadow-lg shadow-red-950/20">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        <MovieCard trendingMovies={trendingMovies} loading={loading} />
      </div>
    </section>
  );
}

export default MovieTopRated;