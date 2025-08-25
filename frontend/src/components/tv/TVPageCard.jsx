import React from 'react'
import { Link } from 'react-router-dom';


function TVPageCard({trendingTV}) {
  return (
    <div>
           <div className="lg:grid lg:grid-cols-5 lg:gap-10 md:grid md:grid-cols-4 md:gap-3 grid grid-cols-2 gap-3 mb-10 justify-center overflow-hidden px-5 lg:px-14 mt-10">
         
          {trendingTV.map((movie, index) => (
             <Link to={`/tv-details/${movie.id}`}><div key={index} className='flex flex-col text-white gap-2' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}  className="lg:h-[300px] md:h-[300px] hover:scale-110  transition-transform duration-300 w-[180px] object-cover rounded-lg shadow-md"/>
             
            <p className='text-white px-1 font-bold w-[180px] truncate'>{movie.name}</p>
            <div className='flex flex-row justify-between mx-2'> 
              📅 {movie.first_air_date ? movie.first_air_date.slice(0, 4) : 'N/A'}
              <p className='text-white flex items-center text-xs gap-2'>⭐ {movie.vote_average?.toFixed(1)}</p>
             
            </div>
           
               </div>
               </Link>
          ))}
        </div>
    </div>
  )
}

export default TVPageCard