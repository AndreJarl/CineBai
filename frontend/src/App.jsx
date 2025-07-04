import Home from "./Home"
import { Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import SignIn from "./routes/SignIn"
import { userAuthStore } from "./store/authUser"
import { useEffect } from "react"
import MovieDetails from "./routes/movie/MovieDetails"
import MyProfile from "./routes/MyProfile"
import MovieWatch from "./routes/movie/MovieWatch"
import TVDetails from "./routes/tv/TVDetails"

function App() {
     const{authCheck, isAuthChecking} = userAuthStore();

     useEffect(()=>{
          authCheck();
     }, [authCheck]);

     if(isAuthChecking){
          return(
             <>
             <div>
                 <p className="text-center text-black">Loading....</p>
             </div>
              </>
          )
     }

  return (
    <>
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/signin" element={<SignIn/>} />
       <Route path="/movie-details/:id" element={<MovieDetails/>} />
       <Route path="/myprofile" element={<MyProfile/>} />
       <Route path="/watch-movie/:id" element={<MovieWatch />} />
      <Route path="/tv-details/:id" element={<TVDetails />} />

    </Routes>
    </>
  )
}

export default App
