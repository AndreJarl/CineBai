import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useContentStore } from "../store/contentType";
import {
  Sparkles,
  Film,
  Tv,
  Search,
  Star,
  Users,
  RotateCcw,
  Send,
  Clapperboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/authUser";
import toast from "react-hot-toast";

function AIRecommendation() {
  const navigate = useNavigate();
  const { contentType, setContentType } = useContentStore();

  const [prompt, setPrompt] = useState("");
  const [AIRecommdations, setAIRecommendations] = useState([]);
  const [aiMessage, setAIMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = userAuthStore();

  const getAiRecos = async () => {
    if (!user) {
      navigate("/login");
      toast.error("Pls login to use CineBAI AI");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `/api/ai/${contentType}/ai-recommendation/`,
        { prompt }
      );
      setAIMessage(response.data.message);
      setAIRecommendations(response.data.recommendations || []);
      toast.success("🎬 CineBAI AI recommendations generated! Scroll down to view.");
    } catch (error) {
      toast.error("CineBAI AI failed to generate recommendation. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "A noir mystery set in Tokyo",
    "A psychological thriller with a shocking twist",
    "Hidden gem romance movies from the 90s",
    "Sci-fi movies with strong female leads",
    "Something emotional and visually beautiful",
    "A mind-bending series like Dark",
  ];

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  const featureCards = [
    {
      icon: Sparkles,
      title: "Mood Matching",
      desc: "Matches films to your current emotional state.",
    },
    {
      icon: Search,
      title: "Deep Discovery",
      desc: "Find hidden gems from world cinema archives.",
    },
    {
      icon: Users,
      title: "Group Recommendations",
      desc: "Find the perfect movie for your entire group.",
    },
    {
      icon: RotateCcw,
      title: "Taste Evolution",
      desc: "AI that learns your visual style over time.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen pt-10 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[#070707]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0909] via-[#0a0a0a] to-[#100b0b]" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-red-900/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-red-800/5 blur-3xl" />

        <div className="relative container mx-auto max-w-6xl px-4 pt-10 lg:pt-20 pb-6 lg:pb-14">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 mb-12 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-red-600/5 blur-3xl" />
              <div className="absolute top-10 right-0 h-56 w-56 rounded-full bg-red-500/5 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-red-950/10" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-center">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 shadow-lg shadow-red-600/20">
                    <Clapperboard className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-red-300">
                    CineBai Intelligence
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-[52px] font-bold leading-[1.02] tracking-tight text-white">
                  Your Personal
                  <br />
                  <span className="text-red-400">Cinematic</span> Curator
                </h1>

                <p className="mt-4 max-w-lg text-sm md:text-base text-gray-300 leading-6 md:leading-7">
                  Stop scrolling. Tell us your mood, your favorite actors, or even
                  a specific scene you remember, and our AI will find your next
                  favorite watch in seconds.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-gray-400">Choose media:</span>

                  <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
                    <button
                      onClick={() => setContentType("movie")}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        contentType === "movie"
                          ? "bg-red-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <Film className="w-3.5 h-3.5 inline mr-1.5" />
                      Movies
                    </button>

                    <button
                      onClick={() => setContentType("tv")}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        contentType === "tv"
                          ? "bg-red-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <Tv className="w-3.5 h-3.5 inline mr-1.5" />
                      TV Shows
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-md px-2 py-2 shadow-2xl">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && prompt.trim() && !loading) {
                          getAiRecos();
                        }
                      }}
                      placeholder={`Ask AI: ${
                        contentType === "movie"
                          ? "A noir mystery set in Tokyo..."
                          : "A dark sci-fi series with mystery..."
                      }`}
                      className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                    />

                    <button
                      onClick={getAiRecos}
                      disabled={!prompt.trim() || loading}
                      className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white transition-all duration-300 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-700"
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featureCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={index}
                      className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md min-h-[145px] transition-all duration-300 hover:bg-white/[0.05] hover:border-white/15"
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-red-300">
                        <Icon className="h-4 w-4" />
                      </div>

                      <h3 className="text-base font-semibold text-white mb-2">
                        {card.title}
                      </h3>

                      <p className="text-xs leading-5 text-gray-400">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-14">
            <h3 className="text-base font-bold mb-5 text-center text-gray-300">
              Try these example prompts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="bg-white/[0.035] border border-white/10 rounded-xl p-3 text-left hover:bg-white/[0.05] transition-all duration-300 hover:border-white/15 group backdrop-blur-sm"
                >
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-xs md:text-sm">
                    "{example}"
                  </p>
                </button>
              ))}
            </div>
          </div>

          {(aiMessage || AIRecommdations.length > 0 || loading) && (
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-white/[0.035] backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                {aiMessage && !loading && (
                  <div className="mb-8">
                    <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      AI Response
                    </h3>
                    <p className="text-sm text-gray-300 leading-7">{aiMessage}</p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="animate-spin rounded-full h-7 w-7 border-2 border-red-600 border-t-transparent"></div>
                      <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                        AI is thinking...
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Analyzing your preferences and finding the perfect recommendations
                    </p>
                  </div>
                )}

                {AIRecommdations.length > 0 && !loading && (
                  <div>
                    <h3 className="text-base font-bold mb-5 flex items-center gap-2">
                      <Film className="w-4 h-4 text-red-400" />
                      Recommendations
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {AIRecommdations.map((item) => (
                        <Link
                          key={item.id}
                          to={
                            contentType === "movie"
                              ? `/movie-details/${item.id}`
                              : `/tv-details/${item.id}`
                          }
                        >
                          <div className="bg-white/[0.035] border border-white/10 rounded-xl p-3 hover:bg-white/[0.05] transition-all duration-300 h-full backdrop-blur-sm">
                            <img
                              className="w-full h-[240px] object-cover rounded-lg mb-3"
                              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                              alt={item.title || item.name}
                            />

                            <h4 className="text-base font-bold mb-2 text-white line-clamp-1">
                              {item.title || item.name}
                            </h4>

                            <p className="text-gray-300 text-xs mb-3 line-clamp-4 leading-5">
                              {item.overview}
                            </p>

                            <div className="flex items-center gap-2 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-xs font-semibold">
                                {item.vote_average?.toFixed(1) || "N/A"}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AIRecommendation;