import React, { useEffect, useState } from 'react'
import { userAuthStore } from '../store/authUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import person from '../assets/person.jpg';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useContentStore } from '../store/contentType';
import { Trash } from 'lucide-react';

function MyProfile() {

    const [profile, setProfile] = useState([]);
        const {user, logout} = userAuthStore();
        const navigate = useNavigate();
        const {contentType} = useContentStore();
        
        

        const [favoriteFilter, setFavoriteFilter] = useState(`${contentType}` || "movies");
        const [watchLaterFilter, setWatchLaterFilter] = useState(`${contentType}` || "movies");
        const [isDeleting, setIsDeleting] = useState(false);
        const filteredFavorites = profile.favorites?.filter(item => item.mediaType === favoriteFilter) || [];

        const filteredWatchLater = profile.watchLater?.filter(item => item.mediaType === watchLaterFilter) || [];

      useEffect(()=>{
                const getMyProfile = async () =>{
              try {
                if(!user){
                    setTimeout(()=>{
                        navigate('/');
                    },1000);
                }

                const res = await axios.get("/api/user/myProfile");
                setProfile(res.data.user);

              } catch (error) {
                
              }
        }
        getMyProfile();
      }, [user, contentType]);
 
        const deleteFromList = async (item, type) =>{
          setIsDeleting(true);
              try {
                    await toast.promise(
                    axios.delete(`/api/user/list/${type}`, {
                      data: { id: item.id, mediaType: item.mediaType }
                    }),
                    {
                      loading: `Removing ${item.title || item.name}...`,
                      success: `${item.title || item.name} removed from ${type === 'favorites' ? 'Favorites' : 'Watch Later'}`,
                      error: 'Failed to remove item.'
                    }
              );
                  
                  const res2 = await axios.get("/api/user/myProfile");
                  setProfile(res2.data.user);
              } catch (error) {
                 toast.error("Failed to remove item.");
                 console.error(error);
              }
        }

  return (
    <>
    <Navbar />
    <div className='flex flex-col justify-center items-center bg-black/80 gap-10 lg:pt-40 md:pt-40 pt-28 -mt-20   '>

         <div className='flex lg:flex-row md:flex-row flex-col justify-around lg:gap-60 gap-10 items-center mx-3 mb-16'>
       
         
        <div className='flex lg:flex-row md:flex-row flex-col lg:justify-start justify-center  items-center gap-4  text-white'>
                <img className='h-28  rounded-full' src={person} alt="" srcset="" />
                <div className='flex flex-col gap-1'>
                    <p className='lg:text-5xl text-3xl md:text-4xl text-center font-medium'>{profile.username}</p>
                    <p className='text-slate-400 text-center  md:text-left lg:text-left'>📧 {profile.email} </p>
                    <button onClick={logout} className='text-red-600 text-sm md:w-fit lg:w-fit'>Log out</button>
                </div>
            
        </div>

          <div>
            <Link to="/"><button className='text-white text-3xl flex items-center gap-3 border-2 border-gray-700 px-4 py-2 rounded-xl'><ArrowLeft />Home</button></Link>
         </div>

         </div>

          <div className=''>
                <div className='flex flex-row items-center gap-10'>
                     <p className='text-white lg:text-5xl md:text-4xl text-4xl text-center font-normal mb-5'>❤️ Favorites {contentType === "movie" ? 'Movies' : 'Series'}</p>
                   
               </div>
                <div className="flex justify-center items-center">
                     <div className="w-[100%] h-[1px] bg-gray-400 opacity-60 mb-5"></div>
                </div>

   
        { filteredFavorites.length === 0 ?
        ( <p className="text-gray-400 col-span-5 text-center">No favorite {favoriteFilter === "movie" ? "movies" : "series"} found.</p>)
        : (  <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-center items-center lg:gap-6 gap-2 mx-2 '>
          {filteredFavorites.slice().reverse().slice(0,5).map((favorite, index) =>(
             <Link to={`/${favorite.mediaType}-details/${favorite.id}`}>
            <div key={index} className='flex flex-col text-white gap-2 items-center relative'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`}   className="lg:h-[300px]  z-50 hover:scale-110 mt-5 transition-transform duration-300 w-[200px] object-cover rounded-lg shadow-md"/>
            <button  onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteFromList(favorite, "favorites");
                        }} className='absolute z-50 right-3 bg-red-600 rounded-full p-2 top-7'><Trash/></button>
            <p className='text-white px-1 font-bold lg:w-[180px] md:w-[180px] w-[110px] truncate'>{favorite.title || favorite.name}</p>
               </div>
               </Link>
          ))}

            
        </div>
        )}

           </div>

                       <Link to={`/favorites/${contentType}`}><button className='text-white text-center flex justify-center items-center mt-3 bg-red-700 px-3 py-1 rounded-md shadow shadow-red-300'>View All Favorites</button></Link> 

          <div className='mb-20 mt-10'>
                  <div className='flex flex-row items-center gap-10'>
                     <p className='text-white lg:text-5xl text-3xl text-center font-normal mb-5'>🔖 Watch Later {contentType === "tv" ? 'Series' : 'Movies'}</p>
               </div>
                 <div className="flex justify-center items-center">
                     <div className="w-[100%] h-[1px] bg-gray-400 opacity-60 mb-5"></div>
                </div>

                
     {   filteredWatchLater.length === 0 ?
      
        ( <p className="text-gray-400 col-span-5 text-center">No watch later {watchLaterFilter === "movie" ? "movies" : "series"} found.</p>)
      
     : (    <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-center items-center lg:gap-6 gap-2 mx-2 '>
          {filteredWatchLater.slice().reverse().slice(0,5).map((later, index) =>(
             <Link to={`/${later.mediaType}-details/${later.id}`}>
            <div key={index} className='flex flex-col text-white gap-2 relative'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${later.poster_path}`}   className="lg:h-[300px] z-50 hover:scale-110 mt-5 transition-transform duration-300 w-[200px] object-cover rounded-lg shadow-md"/>
              <button  onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteFromList(later, "watchLater");
                        }} className='absolute z-50 right-3 bg-red-600 rounded-full p-2 top-7'><Trash/></button>
            <p className='text-white px-1 font-bold lg:w-[180px] w-[110px] truncate'>{later.title || later.name}</p>
               </div>
               </Link>
          ))}
        </div>)}

          </div>
        
          <Link to={`/watchLater/${contentType}`}><button className='text-white text-center flex justify-center items-center mt-3 bg-red-700 px-3 py-1 rounded-md shadow shadow-red-300 mb-10'>View All Watch Laters</button></Link>

       
    </div>
    </>
  )
}

export default MyProfile