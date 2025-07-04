import React, { useEffect, useState } from 'react'
import { userAuthStore } from '../store/authUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import person from '../assets/person.jpg';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


function MyProfile() {

    const [profile, setProfile] = useState([]);
        const {user, logout} = userAuthStore();
        const navigate = useNavigate();

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
                console.log(res.data.user);

              } catch (error) {
                
              }
        }
        getMyProfile();
      }, [user]);
 

  return (
    <>
    <div className='flex flex-col justify-center items-center bg-black/90 gap-10 pt-20  '>

         <div className='flex flex-row justify-around gap-60 items-center mb-16'>
       
         
        <div className='flex justify-start  items-center gap-4  text-white'>
                <img className='h-28  rounded-full' src={person} alt="" srcset="" />
                <div className='flex flex-col gap-1'>
                    <p className='text-5xl font-medium'>{profile.username}</p>
                    <p className='text-slate-400'>📧 {profile.email} </p>
                    <button onClick={logout} className='text-red-600 text-sm w-fit'>Log out</button>
                </div>
            
        </div>

          <div>
            <Link to="/"><button className='text-white text-3xl flex items-center gap-3 border-2 border-gray-700 px-4 py-2 rounded-xl'><ArrowLeft />Home</button></Link>
         </div>

         </div>

          <div className=''>

             <p className='text-white text-5xl font-normal mb-5'>❤️ Favorites</p>
                <div className="flex justify-center items-center">
                     <div className="w-[100%] h-[1px] bg-gray-400 opacity-60 mb-5"></div>
                </div>

             <div className='grid grid-cols-5 gap-6'>
          {profile.favorites?.slice().reverse().slice(0,5).map((favorite, index) =>(
             <Link to={`/movie-details/${favorite.id}`}>
            <div key={index} className='flex flex-col text-white gap-2'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} alt={favorite.title}  className="h-[300px] z-50 hover:scale-110 mt-5 transition-transform duration-300 w-[200px] object-cover rounded-lg shadow-md"/>
             
            <p className='text-white px-1 font-bold w-[180px] truncate'>{favorite.title}</p>
               </div>
               </Link>
          ))}

            
        </div>
           </div>


          <div className='mb-20 mt-16'>
               <p className='text-white text-5xl font-normal mb-5'>🔖 Watch Later</p>
                 <div className="flex justify-center items-center">
                     <div className="w-[100%] h-[1px] bg-gray-400 opacity-60 mb-5"></div>
                </div>
             <div className='grid grid-cols-5 gap-5'>
          {profile.watchLater?.slice().reverse().slice(0,5).map((favorite, index) =>(
             <Link to={`/movie-details/${favorite.id}`}>
            <div key={index} className='flex flex-col text-white gap-2'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} alt={favorite.title}  className="h-[300px] z-50 hover:scale-110 mt-5 transition-transform duration-300 w-[200px] object-cover rounded-lg shadow-md"/>
             
            <p className='text-white px-1 font-bold w-[180px] truncate'>{favorite.title}</p>
               </div>
               </Link>
          ))}
        </div>

          </div>
        
       
       
    </div>
    </>
  )
}

export default MyProfile