import { Search, Sparkles, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import person from "../assets/person.jpg";
import { useState, useEffect } from "react";
import { userAuthStore } from "../store/authUser";
import { Toaster } from "react-hot-toast";
import { useContentStore } from "../store/contentType";

function Navbar() {
  const { user, logout } = userAuthStore();
  const { setContentType, contentType } = useContentStore();

  const [iconClicked, setIconClicked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleClicked = () => {
    setIconClicked(false);
    logout();
  };

  useEffect(() => {
    setIconClicked(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomeMovie = location.pathname === "/" && contentType === "movie";
  const isHomeTv = location.pathname === "/" && contentType === "tv";
  const isAiPage = location.pathname === "/ai-recommendation";

  const navPillBase = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";
  const navPillActive = "bg-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-white/15";
  const navPillInactive = "text-gray-300 hover:text-white hover:bg-white/10";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[500]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">

          {/* Desktop / Tablet */}
          <div className="hidden md:flex items-center justify-between h-20">
            <Link to="/" className="shrink-0">
              <p className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                <span className="text-red-500">CineB</span>
                <span className="text-yellow-400">AI</span>
              </p>
            </Link>

            <div className="rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <ul className="flex items-center gap-2 lg:gap-3">
                <Link to="/">
                  <li onClick={() => setContentType("movie")} className={`${navPillBase} ${isHomeMovie ? navPillActive : navPillInactive}`}>
                    MOVIES
                  </li>
                </Link>
                <Link to="/">
                  <li onClick={() => setContentType("tv")} className={`${navPillBase} ${isHomeTv ? navPillActive : navPillInactive}`}>
                    SERIES
                  </li>
                </Link>
                <Link to="/ai-recommendation">
                  <li className={`${navPillBase} flex items-center gap-2 ${isAiPage ? navPillActive : navPillInactive}`}>
                    <Sparkles className="w-4 h-4" />
                    Ask AI
                  </li>
                </Link>
              </ul>
            </div>

            <div className="relative flex items-center gap-3 lg:gap-4">
              <Link to="/search" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:scale-105">
                <Search className="w-5 h-5" />
              </Link>

              {user ? (
                <>
                  <button onClick={() => setIconClicked(!iconClicked)} className="rounded-full border border-white/15 bg-white/10 p-[2px] backdrop-blur-xl transition-all duration-300 hover:scale-105">
                    <img className="w-10 h-10 rounded-full object-cover border border-yellow-400/60" src={person} alt="Profile" />
                  </button>
                  <div className={`${iconClicked ? "absolute" : "hidden"} top-14 right-0 w-40 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden`}>
                    <ul className="p-2 text-sm text-white">
                      <Link to="/myprofile">
                        <li className="rounded-xl px-4 py-3 hover:bg-white/10 transition-colors duration-200">My Profile</li>
                      </Link>
                      <li onClick={handleClicked} className="rounded-xl px-4 py-3 hover:bg-red-500/15 hover:text-red-300 transition-colors duration-200 cursor-pointer">
                        Log Out
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link to="/signin">
                  <button className="h-11 px-5 rounded-full bg-red-600 text-white text-sm font-semibold transition-all duration-300 hover:bg-red-500 hover:scale-[1.02] shadow-lg shadow-red-900/30">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Top Bar */}
          <div className="flex md:hidden items-center justify-between h-20">
            <Link to="/">
              <p className="text-2xl font-bold tracking-tight text-white">
                <span className="text-red-500">CineB</span>
                <span className="text-yellow-400">AI</span>
              </p>
            </Link>

            <div className="flex items-center gap-2">
              <Link to="/search" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl">
                <Search className="w-4 h-4" />
              </Link>

              {user ? (
                <div className="relative">
                  <button onClick={() => setIconClicked(!iconClicked)} className="rounded-full border border-white/15 bg-white/10 p-[2px] backdrop-blur-xl">
                    <img className="w-10 h-10 rounded-full object-cover border border-yellow-400/60" src={person} alt="Profile" />
                  </button>
                  <div className={`${iconClicked ? "absolute" : "hidden"} top-12 right-0 w-36 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden`}>
                    <ul className="p-2 text-sm text-white">
                      <Link to="/myprofile">
                        <li className="rounded-xl px-3 py-2.5 hover:bg-white/10 transition-colors duration-200">My Profile</li>
                      </Link>
                      <li onClick={handleClicked} className="rounded-xl px-3 py-2.5 hover:bg-red-500/15 hover:text-red-300 transition-colors duration-200 cursor-pointer">
                        Log Out
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Link to="/signin">
                  <button className="h-10 px-4 rounded-full bg-red-600 text-white text-sm font-semibold">
                    Sign In
                  </button>
                </Link>
              )}

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl">
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Nav */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-40 opacity-100 pb-3" : "max-h-0 opacity-0"}`}>
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <ul className="flex flex-col gap-2">
                <Link to="/">
                  <li onClick={() => setContentType("movie")} className={`${navPillBase} ${isHomeMovie ? navPillActive : navPillInactive}`}>
                    MOVIES
                  </li>
                </Link>
                <Link to="/">
                  <li onClick={() => setContentType("tv")} className={`${navPillBase} ${isHomeTv ? navPillActive : navPillInactive}`}>
                    SERIES
                  </li>
                </Link>
                <Link to="/ai-recommendation">
                  <li className={`${navPillBase} flex items-center gap-2 ${isAiPage ? navPillActive : navPillInactive}`}>
                    <Sparkles className="w-4 h-4" />
                    Ask AI
                  </li>
                </Link>
              </ul>
            </div>
          </div>

        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </header>
    </>
  );
}

export default Navbar;