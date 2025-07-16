import { useEffect, useState } from 'react';
import { useContentStore } from '../store/contentType'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash } from 'lucide-react';
import Navbar from '../components/Navbar';
import { userAuthStore } from '../store/authUser';
import toast from 'react-hot-toast';

function WatchLater() {
  const {contentType} = useContentStore();
   const {user, logout} = userAuthStore();
  
   const [profile, setProfile] = useState([]);
  const [userWatchLater, setUserWatchLater] = useState([]);

   const filteredWatchLater = userWatchLater.filter(item => item.mediaType === contentType);

  useEffect(()=>{
       const getUserWatchLater = async () =>{
             const res=  await axios.get(`/api/user/myProfile`);
            setProfile(res.data.user);
             setUserWatchLater(res.data.user.watchLater);
             console.log(res.data.user.watchLater)
          
       }

       getUserWatchLater();
  }, [user])

        const deleteFromList = async (item, type) =>{
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
                  setUserWatchLater(res2.data.user.watchLater);
              } catch (error) {
                 toast.error("Failed to remove item.");
                 console.error(error);
              }
        }
  
  return (
    <>
   <Navbar/>
      <div className='flex flex-col justify-center items-center mt-10'>
                <div className='flex flex-row items-center gap-10'>
                     <p className='text-white lg:text-6xl text-4xl text-center font-normal mb-5'>🔖 Watch Later {contentType === "movie" ? 'Movies' : 'Series'}</p>
                   
               </div>
                <div className="flex justify-center items-center">
                     <div className="w-[100%] h-[1px] bg-gray-400 opacity-60 mb-5"></div>
                </div>

   
        { filteredWatchLater.length === 0 ?
        ( <p className="text-gray-400 col-span-5 text-center">No Watch Later {contentType === "movie" ? "movies" : "series"} found.</p>)
        : (  <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-center items-center lg:gap-6 gap-2 mx-2 mb-10'>
          {filteredWatchLater.slice().reverse().map((later, index) =>(
             <Link to={`/${later.mediaType}-details/${later.id}`}>
            <div key={index} className='flex flex-col text-white gap-2 items-center relative'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img  src={`https://image.tmdb.org/t/p/w500${later.poster_path}`}   className="lg:h-[300px]  z-50 hover:scale-110 mt-5 transition-transform duration-300 w-[200px] object-cover rounded-lg shadow-md"/>
            <button  onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteFromList(later, "watchLater");
                        }} className='absolute z-50 right-3 bg-red-600 rounded-full p-2 top-7'><Trash/></button>
            <p className='text-white px-1 font-bold lg:w-[180px] md:w-[180px] w-[110px] truncate'>{later.title || later.name}</p>
               </div>
               </Link>
          ))}

            
        </div>
        )}

           </div>
 </>
  )
}

export default WatchLater