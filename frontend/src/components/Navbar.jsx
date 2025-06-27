import {Search} from 'lucide-react'
import { Link } from "react-router";
import person from "../assets/person.jpg"
import { useState } from 'react';


function Navbar() {

      let user = false;
     const [iconClicked, setIconClicked] = useState(false);
  return (
    <div className='flex flex-row bg-transparent  z-50 justify-center h-20 items-center text-white'>
      <div className='fixed flex flex-row justify-around z-50 lg:gap-96 gap-5 h-20 items-center'>
          <Link to="/"><p className='lg:text-3xl text-2xl font-bold text-yellow-500'><span className='text-red-600'>Cine</span>Bai</p></Link>
          <div>
            <ul className='flex lg:gap-20 gap-4 font-medium text-sm lg:text-base items-center'>
              <Link to="/movies"><li>Movies</li></Link>
              <Link to="/series"><li>Series</li></Link>
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
                  <li className='hover:text-red-600 '>My Profile</li>
                  <li className='hover:text-red-600'>My List</li>
                  <li className='hover:text-red-600'>Log Out</li>

                 </ul>
             </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar