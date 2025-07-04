import React from 'react'

function TVSeasons({tv}) {

  if (!Array.isArray(tv)) return null;

  return (
    <div className="flex flex-col justify-center items-center mx-20 pt-10 mb-20">
            <p className="text-white text-6xl font-semibold mb-8 w-full z-50 text-left">Seasons</p>

          <div className="grid lg:grid-cols-6 grid-cols-1 gap-5 justify-items-center ">
              {tv.map((tvs, index) => (
           <div className='flex flex-col gap-2'>
              <img src={`https://image.tmdb.org/t/p/w500${tvs.poster_path}`} className=" z-50 h-[300px] hover:scale-110 mt-5 transition-transform duration-300  rounded-lg shadow-md" />
              <p className='text-lg font-medium'>Season {index+1}</p>
           </div>
       
    ))}
        </div>
    </div>
  )
}

export default TVSeasons