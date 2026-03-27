import React, { useEffect, useState } from "react";
import { userAuthStore } from "../store/authUser";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import person from "../assets/person.jpg";
import Navbar from "../components/Navbar";
import { Mail, Heart, Bookmark, Trash, LogOut } from "lucide-react";
import { useContentStore } from "../store/contentType";
import Skeleton from "../components/Skeleton";

function MyProfile() {
  const [profile, setProfile] = useState({});
  const { user, logout } = userAuthStore();
  const navigate = useNavigate();
  const { contentType, setContentType } = useContentStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("favorites");

  const filteredFavorites =
    profile.favorites?.filter((item) => item.mediaType === contentType) || [];
  const filteredWatchLater =
    profile.watchLater?.filter((item) => item.mediaType === contentType) || [];

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
      await toast.promise(
        axios.delete(`/api/user/list/${type}`, {
          data: { id: item.id, mediaType: item.mediaType },
        }),
        {
          loading: "Removing...",
          success: "Removed!",
          error: "Failed.",
        }
      );

      getMyProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const renderGrid = (items, type) => {
    if (loading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Skeleton MOVIES_PER_PAGE={4} />
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="flex min-h-[260px] items-center justify-center text-gray-400">
          No items yet.
        </div>
      );
    }

    return (
<div className="flex flex-wrap gap-4 justify-center md:justify-start">
  {items.slice(0, 8).map((item, i) => (
    <div
      key={i}
      className="w-[110px] sm:w-[120px] md:w-[130px] lg:w-[140px]"
    >
      <Link to={`/${item.mediaType}-details/${item.id}`}>
        <div className="group">
          <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[2/3]">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              className="h-full w-full object-cover group-hover:scale-105 transition"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                deleteFromList(item, type);
              }}
              className="absolute top-2 right-2 bg-red-500 p-1 rounded-full"
            >
              <Trash size={12} />
            </button>
          </div>

          <p className="mt-1 text-[11px] md:text-xs truncate text-white">
            {item.title || item.name}
          </p>
        </div>
      </Link>
    </div>
  ))}
</div>
    );
  };

  const currentItems =
    activeTab === "favorites" ? filteredFavorites : filteredWatchLater;
  const currentType = activeTab === "favorites" ? "favorites" : "watchLater";

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#070707] pt-24 pb-10 text-white">
        <div className="max-w-6xl mx-auto px-4">

          {/* 🔥 FULL GLASS WRAPPER */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40">

            {/* HEADER */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={person}
                  className="w-20 h-20 rounded-full border-2 border-yellow-400"
                />

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {profile.username}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-400 text-[10px]">
                    <Mail size={14} />
                    {profile.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-bold">{profile.favorites?.length || 0}</p>
                  <p className="text-xs text-gray-400">Favorites</p>
                </div>

                <div className="text-center">
                  <p className="font-bold">{profile.watchLater?.length || 0}</p>
                  <p className="text-xs text-gray-400">Watch Later</p>
                </div>

              </div>
            </div>

            {/* MEDIA TYPE */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setContentType("movie")}
                  className={`px-5 py-2 rounded-full text-sm ${
                    contentType === "movie" ? "bg-red-600" : "text-gray-300"
                  }`}
                >
                  Movies
                </button>
                <button
                  onClick={() => setContentType("tv")}
                  className={`px-5 py-2 rounded-full text-sm ${
                    contentType === "tv" ? "bg-red-600" : "text-gray-300"
                  }`}
                >
                  Series
                </button>
              </div>
            </div>

            {/* TABS */}
       <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-6 border-b border-white/10">
                <button
                onClick={() => setActiveTab("favorites")}
                className={`relative pb-2 text-sm md:text-base transition ${
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
                className={`relative pb-2 text-sm md:text-base transition ${
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
            </div>

  {/* View all */}
  <Link to={`/${currentType}/${contentType}`}>
    <button className="text-xs md:text-sm text-red-300 hover:text-red-200 transition">
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