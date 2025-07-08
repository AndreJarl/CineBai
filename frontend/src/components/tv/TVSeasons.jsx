import React from 'react'
import { Link } from 'react-router-dom';
import noimg from '../../assets/404.png'
function TVSeasons({tv, tvss}) {

  if (!Array.isArray(tv)) return null;

  return (
    <div className="flex flex-col justify-center items-center mx-20 pt-10 mb-20">
            <p className="text-white text-6xl font-semibold mb-8 w-full  text-left">Seasons</p>

          <div className="grid lg:grid-cols-6 grid-cols-1 gap-5 justify-items-center ">
              {tv.map((tvs, index) => (
           <Link to={`/tv-watch/${tvss.id}/${tvs.season_number}`}><div key={index} className='flex flex-col gap-2'>
              <img src={tvs.poster_path ?
                `https://image.tmdb.org/t/p/w500${tvs.poster_path}` : noimg
              } className=" z-50 h-[300px] hover:scale-110 mt-5 transition-transform duration-300  rounded-lg shadow-md" />
             <div className='flex flex-row items-center justify-between mx-1'>
               <p className='text-base font-medium'>Season {tvs.season_number}</p>
               <p className='text-sm'>⭐ {tvs.vote_average}</p>
             </div>
           </div></Link>
       
    ))}
        </div>
    </div>
  )
}

export default TVSeasons