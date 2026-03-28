import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import noimg from "../../assets/ep404.png";
import Navbar from "../../components/Navbar";
import { PlayCircle, Tv2 } from "lucide-react";

function TVWatch() {
  const { id, season_number } = useParams();

  const [season, setSeason] = useState([]);
  const [episodesPlaying, setEpisodePlaying] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [server, setServer] = useState("111movies");

  useEffect(() => {
    const getSeasonDetails = async () => {
      try {
        const res = await axios.get(`/api/tv/${id}/season/${season_number}`);
        setSeason(res.data.content);
        setEpisodes(res.data.content.episodes || []);
        setEpisodePlaying(1);
      } catch (error) {
        console.error("Error fetching seasons", error);
      }
    };

    getSeasonDetails();
  }, [id, season_number]);

  const backdropUrl = season?.poster_path
    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
    : "";

  const playerSrc =
    server === "111movies"
      ? `https://111movies.com/tv/${id}/${season.season_number}/${episodesPlaying}`
      : server === "vidsrc"
      ? `https://vidsrc.to/embed/tv/${id}/${season_number}/${episodesPlaying}`
      : server === "autoembed"
      ? `https://autoembed.co/tv/tmdb/${id}-${season_number}-${episodesPlaying}`
      : server === "videasy"
      ? `https://player.videasy.net/tv/${id}/${season_number}/${episodesPlaying}`
      : server === "vidlink"
      ? `https://vidlink.pro/tv/${id}/${season_number}/${episodesPlaying}`
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
        style={{
          backgroundImage: `
            radial-gradient(circle at top, rgba(0,0,0,0.45), rgba(0,0,0,0.96)),
            url(${backdropUrl})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative min-h-screen pt-28 pb-12 text-white"
      >
        <div className="absolute inset-0 bg-[#070707]/80 backdrop-blur-[2px]" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 md:p-5 lg:p-6 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/40 aspect-video">
              <iframe
                className="h-full w-full"
                src={playerSrc}
                allow="autoplay; fullscreen; encrypted-media"
                scrolling="no"
                title="TV Player"
              />

              <Link
                to="/"
                className="absolute top-4 left-4 z-20 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm md:text-base font-semibold backdrop-blur-xl"
              >
                <span className="text-red-600">Cine</span>
                <span className="text-yellow-400">B</span>
                <span className="text-white">AI</span>
              </Link>
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Now Playing
                </p>
                <h1 className="mt-2 text-xl md:text-2xl lg:text-3xl font-semibold">
                  Season {season.season_number} · Episode {episodesPlaying}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="text-sm text-gray-400 mr-1">Server:</span>
                {servers.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setServer(item.key)}
                    className={`rounded-full border px-4 py-2 text-xs md:text-sm transition-all duration-300 backdrop-blur-xl ${
                      server === item.key
                        ? "border-red-400/25 bg-red-500/12 text-red-100 shadow-lg shadow-red-950/20"
                        : "border-white/10 bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 backdrop-blur-xl shadow-2xl shadow-black/30">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 border border-red-400/20">
                  <Tv2 className="h-5 w-5 text-red-300" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-gray-400">
                    Episode List
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    Episodes
                  </h2>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                Click any episode to switch playback
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            <div className="px-1 md:px-2 lg:px-3">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {episodes.map((ep, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setEpisodePlaying(ep.episode_number);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group text-left"
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-300 ${
                        episodesPlaying === ep.episode_number
                          ? "border-red-500 shadow-lg shadow-red-950/30"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <img
                        className={`h-[110px] md:h-[130px] lg:h-[150px] w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          episodesPlaying === ep.episode_number
                            ? "brightness-75"
                            : ""
                        }`}
                        src={
                          ep.still_path
                            ? `https://image.tmdb.org/t/p/original${ep.still_path}`
                            : noimg
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = noimg;
                        }}
                        alt={`Episode ${ep.episode_number}`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {episodesPlaying === ep.episode_number && (
                        <div className="absolute top-2 left-2 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-medium text-white">
                          Playing
                        </div>
                      )}

                      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                        <PlayCircle className="h-3.5 w-3.5" />
                        Episode {ep.episode_number}
                      </div>
                    </div>

                    <div className="mt-2 px-1">
                      <p
                        className={`truncate text-sm font-medium ${
                          episodesPlaying === ep.episode_number
                            ? "text-yellow-400"
                            : "text-white"
                        }`}
                      >
                        {ep.name || `Episode ${ep.episode_number}`}
                      </p>

                      <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                        <span>EP {ep.episode_number}</span>
                        <span>⭐ {ep.vote_average?.toFixed(1) || "N/A"}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TVWatch;