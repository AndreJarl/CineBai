import React, { lazy, Suspense } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useContentStore } from './store/contentType'

// Lazy load heavy components for better initial load performance
const MovieHero = lazy(() => import('./components/movie/MovieHero'))
const MovieTrending = lazy(() => import('./components/movie/MovieTrending'))
const MoviePopular = lazy(() => import('./components/movie/MoviePopular'))
const MovieTopRated = lazy(() => import('./components/movie/MovieTopRated'))
const TVHero = lazy(() => import('./components/tv/TVHero'))
const TVTrending = lazy(() => import('./components/tv/TVTrending'))
const TVPopular = lazy(() => import('./components/tv/TVPopular'))
const TVTopRated = lazy(() => import('./components/tv/TVTopRated'))

function Home() {

  const {contentType} = useContentStore();

  if(contentType === "tv"){
       return (
    <>
       <Navbar />
       <Suspense fallback={<div className="h-screen bg-neutral-900 animate-pulse" />}>
         <TVHero />
         <TVTrending/>
         <TVPopular />
         <TVTopRated />
       </Suspense>
       <Footer />
    </>
  )
  }

  return (
    <>
       <Navbar />
       <Suspense fallback={<div className="h-screen bg-neutral-900 animate-pulse" />}>
         <MovieHero/>
         <MovieTrending/>
         <MoviePopular/>
         <MovieTopRated/>
       </Suspense>
       <Footer />
    </>
  )
}

export default Home