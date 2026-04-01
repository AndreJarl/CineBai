import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Film, Tv, Search, Clapperboard, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useContentStore } from '../../store/contentType';
import Navbar from '../../components/Navbar';
import searchbg from '../../assets/search.png';
import noimg from '../../assets/4043d.png';

function SearchContent() {
  const [query, setQuery] = useState('');
  const { contentType, setContentType } = useContentStore();
  const [search, setSearch] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() !== '' && hasSearched) {
      getSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType]);

  const getSearch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/search/content/${contentType}/${query}`);
      setSearch(res.data.content || []);
    } catch (error) {
      console.error('Error in fetching search', error);
      setSearch([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchButtonClicked = () => {
    if (!query.trim()) return;
    setHasSearched(true);
    getSearch();
  };

  const mediaLabel = contentType === 'movie' ? 'Movies' : 'Series';
  const examples = [
    'Interstellar type movies',
    'Dark mystery series',
    'Romantic comedy',
    'Animated adventure',
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.94), rgba(0, 0, 0, 0.98)), url(${searchbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="relative min-h-screen overflow-hidden text-white"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(127,29,29,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(185,28,28,0.10),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-5xl text-center">
          

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find your next
              <span className="bg-gradient-to-r from-red-500 via-white to-yellow-400 bg-clip-text text-transparent"> favorite watch</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              Discover the films and series you love with <span className="text-red-500">Cine</span><span className="text-yellow-400">Bai</span>.
            </p>

            <div className="mx-auto mt-8 max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 rounded-[20px] bg-black/20 px-4 py-3">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim() && !isLoading) {
                        searchButtonClicked();
                      }
                    }}
                    placeholder={`Search ${
                      contentType === 'movie' ? 'movies, actors, genres...' : 'series, casts, themes...'
                    }`}
                    className="h-12 w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none sm:text-base"
                  />
                </div>

                <button
                  onClick={searchButtonClicked}
                  disabled={!query.trim() || isLoading}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-red-600 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-700 sm:px-6"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Search
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 flex flex-col items-center gap-3 border-t border-white/10 pt-3">
                <div className="inline-flex self-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
                  <button
                    onClick={() => {
                      setContentType('movie');
                      if (query.trim()) setHasSearched(true);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      contentType === 'movie'
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Film className="h-4 w-4" />
                    Movies
                  </button>
                  <button
                    onClick={() => {
                      setContentType('tv');
                      if (query.trim()) setHasSearched(true);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      contentType === 'tv'
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Tv className="h-4 w-4" />
                    Series
                  </button>
                </div>
              </div>
            </div>
          </section>

          {isLoading && (
            <div className="mx-auto mt-12 max-w-3xl rounded-[24px] border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-xl">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-red-500" />
              <p className="mt-4 text-lg font-semibold text-white">
                Searching {mediaLabel}...
              </p>
              <p className="mt-2 text-sm text-slate-400">Looking up the best matches for “{query}”</p>
            </div>
          )}

          {!isLoading && hasSearched && search.length === 0 && (
            <div className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.05] p-6 text-center shadow-[0_16px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
              <h3 className="text-2xl font-semibold text-white">No results for “{query}”</h3>
              <p className="mt-2 text-sm text-slate-400">Try another keyword or switch between movies and series.</p>
              <img
                className="mx-auto mt-6 w-full max-w-md rounded-2xl border border-white/10"
                src={noimg}
                alt="No search results"
              />
            </div>
          )}

          {!isLoading && search.length > 0 && (
            <section className="mx-auto mt-14 max-w-3xl sm:max-w-5xl lg:max-w-6xl xl:max-w-[1100px]">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Browse</p>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    {search.length} result{search.length > 1 ? 's' : ''} for “{query}”
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {search.map((item) => (
                  <Link
                    key={item.id}
                    to={contentType === 'movie' ? `/movie-details/${item.id}` : `/tv-details/${item.id}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.08]">
                      <div className="relative overflow-hidden">
                        <img
                          className="h-[190px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[220px] lg:h-[240px]"
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title || item.name}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>

                      <div className="p-4">
                        <h4 className="line-clamp-1 text-sm font-semibold text-white sm:text-base">
                          {item.title || item.name}
                        </h4>

                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-300">
                          {item.overview || 'No overview available.'}
                        </p>

                        {item.vote_average ? (
                          <div className="mt-3 flex items-center gap-2 text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-xs font-semibold">
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchContent;
