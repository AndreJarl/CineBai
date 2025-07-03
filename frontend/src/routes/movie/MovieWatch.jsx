import React from 'react';
import SimilarMovies from '../../components/movie/SimilarMovies';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

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
     <Navbar/>
   <div
   style={{
    backgroundImage: `
      radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.95)),
      url(${backdropUrl})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
    className="bg-cover bg-center  relative flex flex-col  text-white -mt-20 pt-24"
  >
    
        <div className='flex flex-col justify-center items-center py-5 -mt-20 pt-28'>
                <iframe
          className='w-4/5  aspect-video border-4 border-white rounded-xl'
          src={`https://vidsrc.to/embed/movie/${id}`}
     //https://autoembed.co/movie/tmdb/385687
          allowFullScreen  // Enable fullscreen mode
          allow="autoplay; fullscreen"  // Allow autoplay and fullscreen
        ></iframe>
          <p className='text-white text-6xl font-medium text-left mt-10'>{movie.title}</p>
          <SimilarMovies id={id} />
        </div>
     
    </div>
  
    </>
  );
}

export default MovieWatch;
