import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Flame,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MoviePageCard from "../../components/movie/MoviePageCard";
import Footer from "../../components/Footer";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("1");
  const [loading, setLoading] = useState(true);

  const { movieType } = useParams();

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  useEffect(() => {
    setInputPage(String(page));
  }, [page]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      let endpoint = "";
      switch (movieType) {
        case "trending":
          endpoint = `/api/movie/trendingMoviesHero?page=${page}`;
          break;
        case "popular":
          endpoint = `/api/movie/popularMovies?page=${page}`;
          break;
        case "topRated":
          endpoint = `/api/movie/topRatedMovies?page=${page}`;
          break;
        default:
          endpoint = `/api/movie/popularMovies?page=${page}`;
          break;
      }

      try {
        const res = await axios.get(endpoint);
        setMovies(res.data.content.results || []);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error(`Error fetching ${movieType} movies:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieType, page]);

  const handlePageSubmit = () => {
    const value = parseInt(inputPage, 10);

    if (!isNaN(value) && value >= 1) {
      setPage(value);
    } else {
      setInputPage(String(page));
    }
  };

  const renderIcon = () => {
    switch (movieType) {
      case "trending":
        return <Flame color="#ff3705" size={42} />;
      case "popular":
        return <TrendingUp color="#d4ff00" size={42} />;
      case "topRated":
        return <Trophy color="#ffc800" size={42} />;
      default:
        return <Flame color="#ff3705" size={42} />;
    }
  };

  const renderTitle = () => {
    switch (movieType) {
      case "trending":
        return "Trending Movies";
      case "popular":
        return "Popular Movies";
      case "topRated":
        return "Top Rated Movies";
      default:
        return "Movies";
    }
  };

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen bg-[#070707] pt-28 pb-16 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="flex items-center gap-2 md:gap-3 text-white font-semibold text-2xl md:text-3xl lg:text-5xl tracking-tight">
              {renderIcon()}
              {renderTitle()}
            </p>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2 text-xs md:text-sm text-white shadow-lg shadow-black/20">
              <BookOpen size={16} />
              <span>Page {page}</span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          <div className="flex flex-col items-center">
            <MoviePageCard trendingMovies={movies} loading={loading} />

            <div className="mt-10 mb-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 backdrop-blur-xl px-4 py-2.5 text-xs md:text-sm lg:text-base text-red-100 transition-all duration-300 hover:bg-red-500/20 hover:border-red-400/30 hover:scale-[1.02] shadow-lg shadow-red-950/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev Page
              </button>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-xl shadow-lg shadow-black/20">
                <input
                  type="number"
                  value={inputPage}
                  onChange={(e) => setInputPage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePageSubmit();
                    }
                  }}
                  min="1"
                  className="w-16 bg-transparent text-center text-sm text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Page"
                />

                <button
                  onClick={handlePageSubmit}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white transition-all duration-300 hover:bg-white/15"
                >
                  Go
                </button>
              </div>

              <button
                onClick={nextPage}
                className="flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 backdrop-blur-xl px-4 py-2.5 text-xs md:text-sm lg:text-base text-red-100 transition-all duration-300 hover:bg-red-500/20 hover:border-red-400/30 hover:scale-[1.02] shadow-lg shadow-red-950/20"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MoviePage;