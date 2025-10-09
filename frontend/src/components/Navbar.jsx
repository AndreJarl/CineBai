import {Search} from 'lucide-react'
import { Link } from "react-router";
import person from "../assets/person.jpg"
import { useState } from 'react';
import { userAuthStore } from '../store/authUser';
import { Toaster } from 'react-hot-toast';
import { useContentStore } from '../store/contentType';


function Navbar() {
   

      const {user, logout} = userAuthStore();
      const {setContentType, contentType} = useContentStore();

     const [iconClicked, setIconClicked] = useState(false);
       
     const handleClicked =() =>{
           setIconClicked(!iconClicked);
           logout();
     }
  return (
    <div className='flex flex-row bg-transparent  z-50 justify-around h-20 items-center text-white'>
      <div className=' flex flex-row justify-around z-50 md:gap-48 gap-10 h-20 items-center'>
          <Link to="/"><p className='lg:text-3xl text-2xl font-bold text-yellow-500'><span className='text-red-600'>CineB</span>AI</p></Link>
          <div>
            <ul className='flex lg:gap-10 md:gap-10 gap-2 font-medium text-xs lg:text-base items-center'>
              <Link to="/"><li className={`cursor-pointer ${contentType === "movie" ? 'text-red-600' : 'text-white'}`} onClick={()=>setContentType("movie")}>MOVIES</li></Link>
               <Link to="/"><li className={`cursor-pointer ${contentType === "tv" ? 'text-red-600' : 'text-white'}`} onClick={()=>setContentType("tv")}>SERIES</li></Link>
               <Link to="/"><li className={`cursor-pointer text-white}`}>Use AI</li></Link>

            </ul>
          </div>
          <div className=' relative flex lg:gap-10 gap-2 items-center'>
              <Link to='/search'><p className='font-medium text-sm lg:text-base'><Search/></p></Link>
             {user ?

              <img onClick={()=>setIconClicked(!iconClicked)} className='w-9 rounded-full border-2 border-yellow-500' src={person} alt="" srcset="" />
              : 
                 <Link to='/signin'><button className='bg-red-600 lg:px-3 lg:py-1 rounded text-white text-sm lg:text-base py-1 px-2 hover:bg-red-700'>Sign In</button></Link>
             }
             <div className={`${iconClicked ? 'absolute' : 'hidden'} lg:top-11 lg:right-1 top-11 right-1 shadow-2xl border-2 border-gray-500 rounded-lg w-[90px] lg:w-[120px]`}>
                 <ul className='flex flex-col lg:gap-5 gap-3  lg:p-4 p-3 lg:text-base text-xs'>
                  <Link to="/myprofile"><li className='hover:text-red-600 '>My Profile</li></Link> 
                  <li onClick={handleClicked} className='hover:text-red-600 cursor-pointer'>Log Out</li>

                 </ul>
             </div>
          </div>
      </div>
       <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Navbar