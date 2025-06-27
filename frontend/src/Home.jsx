import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MovieHero from './components/movie/MovieHero'
import Popular from './components/movie/MoviePopular'

function Home() {
  return (
    <>
       <Navbar />
       <MovieHero/>
       <Popular/>
    </>
  )
}

export default Home