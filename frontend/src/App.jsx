import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { userAuthStore } from "./store/authUser"
import { useEffect } from "react"
import Seo from "./components/Seo"

// Lazy load all routes for code splitting
const Home = lazy(() => import("./Home"))
const Login = lazy(() => import("./routes/Login"))
const SignIn = lazy(() => import("./routes/SignIn"))
const MovieDetails = lazy(() => import("./routes/movie/MovieDetails"))
const MyProfile = lazy(() => import("./routes/MyProfile"))
const MovieWatch = lazy(() => import("./routes/movie/MovieWatch"))
const TVDetails = lazy(() => import("./routes/tv/TVDetails"))
const TVWatch = lazy(() => import("./routes/tv/TVWatch"))
const SearchContent = lazy(() => import("./routes/search/Search"))
const WatchLater = lazy(() => import('./routes/WatchLater'))
const WatchedList = lazy(() => import('./routes/WatchedList'))
const Favorites = lazy(() => import('./routes/Favorites'))
const MoviePage = lazy(() => import("./routes/movie/MoviePage"))
const TVPage = lazy(() => import("./routes/tv/TVPage"))
const AIRecommendation = lazy(() => import("./routes/AIRecommendation"))
const ForgotPass = lazy(() => import("./routes/ForgotPass"))
const ResetPass = lazy(() => import("./routes/ResetPass"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
      <p className="text-white"><span className="text-red-600">Cine</span><span className="text-yellow-400">BAI</span> Loading...</p>
    </div>
  </div>
)

// Private / utility pages that shouldn't appear in search results
const noindex = (element) => <><Seo noindex />{element}</>

function App() {
     const{authCheck, isAuthChecking} = userAuthStore();

     useEffect(()=>{
          authCheck();
     }, [authCheck]);

     if(isAuthChecking){
          return <LoadingFallback />
     }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={noindex(<Login/>)} />
         <Route path="/signin" element={noindex(<SignIn/>)} />
         <Route path="/movie-details/:id" element={<MovieDetails/>} />
         <Route path="/myprofile" element={noindex(<MyProfile/>)} />
         <Route path="/watch-movie/:id" element={noindex(<MovieWatch />)} />
         <Route path="/tv-details/:id" element={<TVDetails />} />
         <Route path="/tv-watch/:id/:season_number" element={noindex(<TVWatch />)} />
         <Route path="/search" element={<SearchContent/>} />
         <Route path="/watchlater/:contentType" element={noindex(<WatchLater/>)} />
         <Route path="/watched/:contentType" element={noindex(<WatchedList/>)} />
         <Route path="/favorites/:contentType" element={noindex(<Favorites/>)} />
         <Route path="/movie-page/:movieType" element={<MoviePage/>} />
         <Route path="/tv-page/:seriesType" element={<TVPage/>} />
         <Route path="/ai-recommendation" element={<AIRecommendation/>} />
         <Route path="/forgot-pass" element={noindex(<ForgotPass/>)} />
         <Route path="/reset-password" element={noindex(<ResetPass/>)} />
      </Routes>
    </Suspense>
  )
}

export default App
