import { Star, SquarePlus, Play, Plus} from 'lucide-react';
import React from 'react'

function Hero() {
    const movie = {
  title: "How to Train Your Dragon",
  overview: "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.",
  backdrop_path: "/7HqLLVjdjhXS0Qoz1SgZofhkIpE.jpg",
  genres: ["Fantasy", "Family", "Action"],
  vote: 7.9,
  duration: 102
};

const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

function covertedDuration (minutes){
     const hours = Math.floor(minutes/60);
     const mins = minutes % 60;
     return `${hours}h : ${mins}m`
}
  return (
  

<div
  style={{
    backgroundImage: `
      radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%),
      url(${backdropUrl})
    `
  }}
  className="bg-cover bg-center h-screen w-full relative text-white -mt-20"
>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start">
    <div className=" text-white px-4 ml-28 flex flex-col gap-5 mt-24">
      <p className='text-sm opacity-75'>Duration: {covertedDuration(movie.duration)}</p>
      <div className='flex flex-row items-center gap-4'>
           <p className='flex items-center gap-2 text-lg font-medium'><Star color='yellow' />{movie.vote}</p>
            <div className='flex flex-row items-center gap-3'>
             {movie.genres.map((genre, index)=>{
               return <p className='text-sm opacity-75' key={index}>{genre}  {index !== movie.genres.length - 1 && '|'}</p>
             })}
            </div>
      </div>
      <h1 className="text-6xl font-semibold mb-4">{movie.title}</h1>
      <p className="max-w-2xl text-base font-normal">{movie.overview}</p>
      <div className='flex flex-row items-center gap-5 mt-5'>
          <button className='bg-red-800 px-6 py-3 rounded-3xl flex flex-row text-center gap-2 '><Play/>WATCH NOW</button>
          <button className=' px-6 py-3 rounded-3xl backdrop-blur-lg border-2 border-gray-200 flex flex-row text-center gap-2'><Plus />ADD LIST</button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Hero