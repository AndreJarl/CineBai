import { Play, Plus } from "lucide-react";
import { useState } from "react";
import { userAuthStore } from "../../store/authUser";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddToListButtonTV({ tv, mediaType }) {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);
  const { user } = userAuthStore();

  const addToList = async (type) => {
    try {
      if (!user) {
        toast.error("Please login to add to list.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      await toast.promise(
        axios.post(`/api/user/list/${type}`, {
          id: tv.id,
          mediaType,
          title: tv.name,
          poster_path: tv.poster_path,
        }),
        {
          loading: `Adding ${tv.name}...`,
          success: `${tv.name} added to ${
            type === "favorites" ? "favorites" : "watch later"
          }!`,
          error: `Failed to add ${tv.name}.`,
        }
      );

      setButtonClicked(false);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Already in the list.");
        setButtonClicked(false);
      } else {
        console.error(error);
      }
    }
  };

  const seasonNum = 1;

  return (
    <div className="relative z-50 mt-6 flex flex-row flex-wrap items-center gap-3 sm:gap-4">
      <Link to={`/tv-watch/${tv.id}/${seasonNum}`}>
        <button className="group flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-red-900/30 transition-all duration-300 hover:bg-red-500 hover:scale-[1.02] sm:px-5 sm:py-3 sm:text-sm lg:px-6">
          <Play className="h-4 w-4 fill-white text-white" />
          WATCH NOW
        </button>
      </Link>

      <div className="relative z-[1000]">
        <button
          onClick={() => setButtonClicked(!buttonClicked)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] sm:px-5 sm:py-3 sm:text-sm lg:px-6"
        >
          <Plus className="h-4 w-4" />
          ADD LIST
        </button>

        <div
          className={`absolute right-0 top-full mt-3 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-200 ${
            buttonClicked
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2"
          }`}
        >
          <ul className="p-2 text-sm text-white">
            <li
              className="cursor-pointer rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/10 hover:text-red-300"
              onClick={() => addToList("favorites")}
            >
              Favorites
            </li>
            <li
              className="cursor-pointer rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/10 hover:text-red-300"
              onClick={() => addToList("watchLater")}
            >
              Watch Later
            </li>
          </ul>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AddToListButtonTV;