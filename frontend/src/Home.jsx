import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MovieHero from './components/movie/MovieHero'
import MovieTrending from './components/movie/MovieTrending'
import MoviePopular from './components/movie/MoviePopular'
import MovieTopRated from './components/movie/MovieTopRated'
import { useContentStore } from './store/contentType'
import TVHero from './components/tv/TVHero'
import TVTrending from './components/tv/TVTrending'
import TVPopular from './components/tv/TVPopular'
import TVTopRated from './components/tv/TVTopRated'
import Footerr from './components/Footer'

function Home() {

  const {contentType} = useContentStore();

  if(contentType === "tv"){
       return (
    <>
       <Navbar />
       <TVHero />
       <TVTrending/>
       <TVPopular />
       <TVTopRated />
       <Footerr />
    </>
  )
  }

  return (
    <>
       <Navbar />
       <MovieHero/>
       <MovieTrending/>
       <MoviePopular/>
       <MovieTopRated/>
        <Footerr />
    </>
  )
}

export default Home