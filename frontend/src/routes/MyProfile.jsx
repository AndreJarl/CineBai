import React, { useEffect, useState } from "react";
import { userAuthStore } from "../store/authUser";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import person from "../assets/person.jpg";
import Navbar from "../components/Navbar";
import { Mail, Heart, Bookmark, CheckCircle, Trash } from "lucide-react";
import { useContentStore } from "../store/contentType";
import Skeleton from "../components/Skeleton";

function MyProfile() {
  const [profile, setProfile] = useState({});
  const { user } = userAuthStore();
  const navigate = useNavigate();
  const { contentType, setContentType } = useContentStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("favorites");

  const profilePic = user?.image || profile?.image || person;

  const filteredFavorites =
    profile.favorites?.filter((item) => item.mediaType === contentType) || [];
  const filteredWatchLater =
    profile.watchLater?.filter((item) => item.mediaType === contentType) || [];
  const filteredWatched =
    profile.watched?.filter((item) => item.mediaType === contentType) || [];

  useEffect(() => {
    if (user) getMyProfile();
  }, [user, contentType]);

  const getMyProfile = async () => {
    try {
      if (!user) {
        navigate("/");
        return;
      }

      const res = await axios.get("/api/user/myProfile");
      setProfile(res.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromList = async (item, type) => {
    try {
      if (type === "watched") {
        await toast.promise(
          axios.delete(`/api/user/watched`, {
            data: { id: item.id, mediaType: item.mediaType },
          }),
          {
            loading: "Removing...",
            success: "Removed!",
            error: "Failed.",
          },
        );
      } else {
        await toast.promise(
          axios.delete(`/api/user/list/${type}`, {
            data: { id: item.id, mediaType: item.mediaType },
          }),
          {
            loading: "Removing...",
            success: "Removed!",
            error: "Failed.",
          },
        );
      }

      getMyProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const renderGrid = (items, type) => {
    if (loading) {
      return (
        <div className="grid grid-cols-3 lg:grid-col-5 gap-3">
          <Skeleton MOVIES_PER_PAGE={5} />
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-gray-400">
          <p className="text-sm">Nothing here yet.</p>
        </div>
      );
    }

    const displayedItems = items.slice(0, 5);

    return (
      <div className="flex gap-3 md:gap-4 justify-center sm:justify-start">
        {displayedItems.map((item, i) => (
          <div
            key={i}
            className={`group relative w-[100px] sm:w-[120px] md:w-[150px] ${
              i >= 3 ? "hidden md:block" : ""
            }`}
          >
            <Link to={`/${item.mediaType}-details/${item.id}`}>
              <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[2/3] bg-white/[0.03]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteFromList(item, type);
                  }}
                  className="absolute top-1.5 right-1.5 rounded-full bg-black/50 backdrop-blur-md p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                >
                  <Trash size={11} />
                </button>

                <p className="absolute bottom-0 left-0 right-0 p-2 text-[11px] md:text-xs font-medium truncate text-white">
                  {item.title || item.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const tabConfig = {
    favorites: { items: filteredFavorites, type: "favorites" },
    watchLater: { items: filteredWatchLater, type: "watchLater" },
    watched: { items: filteredWatched, type: "watched" },
  };

  const currentItems = tabConfig[activeTab].items;
  const currentType = tabConfig[activeTab].type;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#070707] text-white">
        {/* COVER BANNER */}
        <div className="relative h-[180px] md:h-[240px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(220,38,38,0.4), transparent 50%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.08), transparent 50%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent" />
        </div>

        <div className="max-w-2xl md:max-w-5xl mx-auto px-4 md:px-8 -mt-16 md:-mt-20 pb-16 relative z-10">
          {/* PROFILE GLASS PANEL */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-10 shadow-2xl shadow-black/40">
            <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 ">
              {/* Avatar */}
              <img
                src={profilePic}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/10 shadow-2xl object-cover shrink-0"
              />

              {/* Name + email */}
              <div className="md:flex-1">
                <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                  {profile.username}
                </h1>
                <div className="mt-1 flex items-center justify-center md:justify-start gap-1.5 text-gray-400 text-xs md:text-sm">
                  <Mail size={12} />
                  {profile.email}
                </div>
              </div>

              {/* Stats card */}
              <div className="w-full md:w-auto flex items-center justify-center md:justify-start gap-6 lg:gap-8 rounded-2xl py-4 px-2 md:px-6">
                <div className="flex flex-col items-center gap-1 px-3 md:px-5">
                  <div className="flex items-center gap-1.5">
                    <Heart size={28} className="text-red-400" />
                    <p className="text-lg md:text-2xl font-bold text-white">
                      {profile.favorites?.length || 0}
                    </p>
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-400">
                    Favorites
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1 px-3 md:px-5">
                  <div className="flex items-center gap-1.5">
                    <Bookmark size={28} className="text-yellow-400" />
                    <p className="text-lg md:text-2xl font-bold text-white">
                      {profile.watchLater?.length || 0}
                    </p>
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-400">
                    Watch Later
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1 px-3 md:px-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={28} className="text-green-400" />
                    <p className="text-lg md:text-2xl font-bold text-white">
                      {profile.watched?.length || 0}
                    </p>
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-400">
                    Watched
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT GLASS PANEL */}
          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 shadow-2xl shadow-black/40">
            {/* MEDIA TYPE TOGGLE */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setContentType("movie")}
                  className={`px-5 py-2 rounded-full text-sm transition-colors duration-200 ${
                    contentType === "movie" ? "bg-red-600" : "text-gray-300"
                  }`}
                >
                  Movies
                </button>
                <button
                  onClick={() => setContentType("tv")}
                  className={`px-5 py-2 rounded-full text-sm transition-colors duration-200 ${
                    contentType === "tv" ? "bg-red-600" : "text-gray-300"
                  }`}
                >
                  Series
                </button>
              </div>
            </div>

            {/* TABS */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-6 border-b border-white/10 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`relative pb-2 whitespace-nowrap text-sm md:text-base transition ${
                    activeTab === "favorites"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Favorites
                  {activeTab === "favorites" && (
                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500 rounded-full transition-all duration-300" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("watchLater")}
                  className={`relative pb-2 whitespace-nowrap text-sm md:text-base transition ${
                    activeTab === "watchLater"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Watch Later
                  {activeTab === "watchLater" && (
                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500 rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("watched")}
                  className={`relative pb-2 whitespace-nowrap text-sm md:text-base transition ${
                    activeTab === "watched"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Watched
                  {activeTab === "watched" && (
                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500 rounded-full" />
                  )}
                </button>
              </div>

              <Link to={`/${currentType}/${contentType}`}>
                <button className="text-xs md:text-sm text-red-300 hover:text-red-200 transition whitespace-nowrap">
                  View All
                </button>
              </Link>
            </div>

            {/* CONTENT */}
            {renderGrid(currentItems, currentType)}
          </div>
        </div>
      </section>
    </>
  );
}

export default MyProfile;
