import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MovieHero from './components/movie/MovieHero'
import MovieTrending from './components/movie/MovieTreding'
import MoviePopular from './components/movie/MoviePopular'
import MovieTopRated from './components/movie/MovieTopRated'

function Home() {
  return (
    <>
       <Navbar />
       <MovieHero/>
       <MovieTrending/>
       <MoviePopular/>
       <MovieTopRated/>
    </>
  )
}

export default Home