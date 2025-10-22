import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import axios from 'axios';
import {ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

function SimilarMovies({id}) {

    const [movieRecom, setMovieRecom] = useState([]);

    useEffect(()=>{
          const getMovieRecom = async () =>{
              try {
                 const res = await axios.get(`/api/movie/${id}/movieRecommendations`);
                 setMovieRecom(res.data.content.results);
                //  console.log(res.data.content.results);
              } catch (error) {
                console.error("Failed fetching similar movies", error);
              }
          }

          getMovieRecom();
    }, [id])

       if(movieRecom.length == 0){
             return(
                <>
                <div className='h-[190px] mt-20'>
                  <p className='text-left text-4xl font-medium'> No Similar Movies :(</p>
                </div>
                </>
             )
       }
 
  
  return (
    <>
   <div className="flex flex-col justify-center items-center mt-20 mb-20">
      <p className="text-white text-4xl font-semibold mb-8 w-full z-50 text-left">Similar Movies</p>
  <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-10 justify-items-center lg:mx-0  mx-5">
    {movieRecom.slice(0,5).map((movie, index) => (
       <Link to={`/movie-details/${movie.id}`}><div key={index} className='flex flex-col text-white gap-2'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}  className="lg:h-[300px] z-50 hover:scale-110 mt-5 transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"/>
             
            <p className='text-white px-1 font-bold w-[180px] truncate'>{movie.title}</p>
            <div className='flex flex-row justify-between mx-2'> 
              <p className='text-sm'>📅 {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>
              <p className='text-white flex items-center text-xs gap-2'>⭐ {movie.vote_average?.toFixed(1)}</p>
             
            </div>
           
               </div>
               </Link>
    ))}
  </div>
</div>

    </>
  )
}

export default SimilarMovies