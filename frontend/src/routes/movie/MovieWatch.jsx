import React, { useEffect, useState } from "react";
import SimilarMovies from "../../components/movie/SimilarMovies";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Film } from "lucide-react";

function MovieWatch() {
  const [movie, setMovies] = useState({});
  const { id } = useParams();
  const [server, setServer] = useState("111movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const res = await axios.get(`/api/movie/${id}/movieDetails`);
        setMovies(res.data.content);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };

    getMovieDetails();
  }, [id]);

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const playerSrc =
    server === "111movies"
      ? `https://111movies.com/movie/${id}`
      : server === "vidsrc"
      ? `https://vidsrc.to/embed/movie/${id}`
      : server === "autoembed"
      ? `https://autoembed.co/movie/tmdb/${id}`
      : server === "videasy"
      ? `https://player.videasy.net/movie/${id}`
      : server === "vidlink"
      ? `https://vidlink.pro/movie/${id}`
      : "";

  const servers = [
    { key: "111movies", label: "111Movies" },
    { key: "vidsrc", label: "Vidsrc" },
    { key: "autoembed", label: "AutoEmbed" },
    { key: "videasy", label: "Videasy" },
    { key: "vidlink", label: "VidLink" },
  ];

  return (
    <>
      <Navbar />

      <section
        className="relative min-h-screen pt-24 md:pt-28 pb-12 text-white"
        style={{
          backgroundImage: `
            radial-gradient(circle at top, rgba(0,0,0,0.45), rgba(0,0,0,0.96)),
            url(${backdropUrl})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#070707]/80 backdrop-blur-[2px]" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          {/* Player section */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-5 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[18px] md:rounded-[22px] border border-white/10 bg-black/40 aspect-video">
              <iframe
                className="h-full w-full"
                src={playerSrc}
                allow="autoplay; fullscreen; encrypted-media"
                scrolling="no"
                title="Movie Player"
              />

              <Link
                to="/"
                className="absolute top-3 left-3 md:top-4 md:left-4 z-20 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base font-semibold backdrop-blur-xl"
              >
                <span className="text-red-600">Cine</span>
                <span className="text-yellow-400">B</span>
                <span className="text-white">AI</span>
              </Link>
            </div>

            <div className="mt-4 md:mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
                  Now Playing
                </p>
                <h1 className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                  {movie.title || "Loading..."}
                </h1>
                {movie.tagline ? (
                  <p className="mt-2 text-sm md:text-base text-red-300/90">
                    "{movie.tagline}"
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-400 mr-1">
                  Server:
                </span>
                {servers.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setServer(item.key)}
                    className={`rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs md:text-sm transition-all duration-300 backdrop-blur-xl ${
                      server === item.key
                        ? "border-red-400/30 bg-red-500/20 text-white shadow-lg shadow-red-950/25"
                        : "border-white/10 bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Similar movies section */}
          <div className="mt-8 md:mt-10 rounded-[24px] md:rounded-[28px] border border-white/10 bg-white/[0.04] px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 backdrop-blur-xl shadow-2xl shadow-black/30">
            <div className="mb-5 md:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-red-500/15 border border-red-400/20">
                  <Film className="h-4 w-4 md:h-5 md:w-5 text-red-300" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-gray-400">
                    More To Watch
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    Similar Movies
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-400">
                Based on this title
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 md:mb-8" />

            <div className="px-0 sm:px-1 md:px-2">
              <SimilarMovies id={id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieWatch;