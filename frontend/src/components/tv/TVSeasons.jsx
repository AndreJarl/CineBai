import React from 'react'
import { Link } from 'react-router-dom';
import noimg from '../../assets/se404.png'
import Skeleton from '../Skeleton';

function TVSeasons({tv, tvss, loading}) {

  if (!Array.isArray(tv)) return null;

  return (
    <div className="flex flex-col justify-center items-center lg:mx-20 mx-5 pt-10 mb-20">
            <p className="text-white text-6xl font-semibold mb-8 w-full  text-left">Seasons</p>

          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 justify-items-center ">
             {loading
          ? <Skeleton MOVIES_PER_PAGE={Array.isArray(tvss) ? tvss.length : 0}/> // show 20 skeletons while loading
          : tv.map((tvs, index) => (
           <Link to={`/tv-watch/${tvss.id}/${tvs.season_number}`}><div key={index} className='flex flex-col gap-2'>
              <img src={tvs.poster_path ?
                `https://image.tmdb.org/t/p/w500${tvs.poster_path}` : noimg
              } className=" z-50 lg:h-[300px] hover:scale-110 mt-5 transition-transform duration-300  rounded-lg shadow-md" />
             <div className='flex flex-row items-center justify-between mx-1'>
               <p className='text-base font-medium'>Season {tvs.season_number}</p>
               <p className='text-sm'>⭐ {tvs.vote_average}</p>
             </div>
           </div></Link>
    ))
        }
        </div>
    </div>
  )
}

export default TVSeasons