import React from 'react';
import SimilarMovies from '../../components/movie/SimilarMovies';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';
function MovieWatch() {

    const [movie, setMovies] = useState({});
    const {id} = useParams();
  
      useEffect(()=>{
          const getMovieDetails = async () =>{
               
                try {
                  const res = await axios.get(`/api/movie/${id}/movieDetails`);
                setMovies(res.data.content);
                } catch (error) {
                     console.error("Failed to fetch movie details", error);
                }
          }
  
          getMovieDetails();
      }, [id])
  

const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  return (
    <>
  <>
 <div className="flex flex-col justify-center items-center py-5 bg-black  pt-14"
    style={{
    backgroundImage: `
      radial-gradient(circle, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.95)),
      url(${backdropUrl})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
 >
  {/* Video Container with relative position */}
  <div className="relative w-11/12 lg:w-4/5 aspect-video border-4 border-white rounded-xl overflow-hidden">
    {/* The iframe */}
    <iframe
      className="w-full h-full"
      src={`https://autoembed.co/movie/tmdb/${id}`}
      allowFullScreen
      allow="autoplay; fullscreen"
    ></iframe>

    {/* Logo overlay inside the video */}
    <Link
      to="/"
      className="absolute top-5 left-10 z-50 text-yellow-500 text-base lg:text-3xl font-bold  px-2 py-1 rounded-md"
    >
      <span className="text-red-600">Cine</span>Bai
    </Link>
  </div>

  {/* Title and similar movies below */}
  <p className="text-white text-4xl lg:text-5xl font-medium text-center mt-10">{movie.title}</p>
    <p className="text-white  font-light text-center mt-2">"{movie.tagline ? movie.tagline : " "}"</p>

  <SimilarMovies id={id} />
</div>

</>

    </>
  );
}

export default MovieWatch;
