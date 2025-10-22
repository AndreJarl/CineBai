import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import noimg from "../../assets/ep404.png"
import Navbar from '../../components/Navbar';

function TVWatch() {
   
    const {id, season_number} = useParams();

    const [season, setSeason] = useState([]);
    const [episodesPlaying, setEpisodePlaying] = useState(1);
    const[episodes, setEpisodes] = useState([]);

   useEffect(()=>{
        const getSeasonDetails = async ()=>{
             try {
                const res = await axios.get(`/api/tv/${id}/season/${season_number}`);
             
                setSeason(res.data.content);
                setEpisodes(res.data.content.episodes);
             } catch (error) {
                console.error("Error fetching seasons", error);
             }
        }
        getSeasonDetails();
   }, [id])
      
  const backdropUrl = season?.poster_path
    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
    : "";


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
    className="bg-cover bg-center w-full relative flex flex-col pt-20 -mt-20 items-center text-white"
  >


  <div className="relative w-11/12 lg:w-4/5 aspect-video border-2 border-white rounded-xl overflow-hidden">
    {/* The iframe */}
    <iframe
      className="w-full h-full"
     src={`https://autoembed.co/tv/tmdb/${id}-${season.season_number}-${episodesPlaying}`}
        // src={`https://vidsrc.to/embed/tv/${id}/${season_number}/${episodesPlaying}`}
      allowFullScreen
      allow="autoplay; fullscreen"
      scrolling='no'
    ></iframe>

    {/* Logo overlay inside the video */}
    <Link
      to="/"
      className="absolute top-5 left-10 z-50 text-yellow-500 text-base lg:text-3xl font-bold  px-2 py-1 rounded-md"
    >
      <span className="text-red-600">Cine</span>Bai
    </Link>
  </div>

<div className='mt-5 flex flex-col justify-center items-center'>
            <p className='lg:text-2xl md:text-2xl text-xl  text-center font-medium'><span className='text-gray-300'>You are watching</span> Season {season.season_number} Episode {episodesPlaying}.</p>
</div>

<div className="w-full px-10 mt-10">
  <p className="text-left text-6xl font-medium lg:ml-28">Episodes</p>
</div>

 <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-10 mb-10">
  {episodes.map((ep, index) => (
    <div
      key={index}
      onClick={() => {
        setEpisodePlaying(ep.episode_number);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="cursor-pointer"
    >
      <img
        className={`w-[250px] rounded-2xl hover:scale-110 transition-transform duration-300 ${
          episodesPlaying === ep.episode_number
            ? 'border-2 border-red-600 brightness-50'
            : ''
        }`}
        src={
          ep.still_path
            ? `https://image.tmdb.org/t/p/original${ep.still_path}`
            : noimg
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = noimg;
        }}
        alt={`Episode ${ep.episode_number}`}
      />
      <div className="flex justify-between mx-2 mt-1">
        <p
          className={`${
            episodesPlaying === ep.episode_number ? 'text-yellow-500' : ''
          } hover:text-yellow-500`}
        >
          Episode {ep.episode_number}
        </p>
        <p className="text-sm">⭐ {ep.vote_average}</p>
      </div>
    </div>
  ))}
</div>

    </div>
 </>

  )
 
}

export default TVWatch