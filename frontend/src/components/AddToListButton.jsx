import { Play, Plus} from 'lucide-react';
import { useState } from 'react';
import { userAuthStore } from '../store/authUser';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'mongoose';


function AddToListButton({movie, mediaType}) {

    const navigate = useNavigate();

    const [buttonClicked, setButtonClicked] = useState(false);
    
    const {user} = userAuthStore();

    const addToList = async (type) =>{
           try {
               if(!user){
                   setTimeout(()=>{
                      navigate('/login');
                  },1000);
                  toast.error("Please login to add to list.")
               }

               const res = await axios.post(`/api/user/list/${type}`,{ id:movie.id, mediaType, title:movie.title, poster_path: movie.poster_path});
               console.log(res.data);
               setButtonClicked(false);
               toast.success(`${movie.title} addded to ${type == 'favorites' ? 'favorites' : 'watch later'}`)
           } catch (error) {
                 if (error.response?.status === 409) {
                        toast.error("Already in the list.");
                        setButtonClicked(false);
                    } else {
                        console.error(error);
                    }
           }
    }



  return (
  <div className="flex  flex-row z-50 items-center gap-5 mt-5">
  <button className="bg-red-800 px-4 py-2 lg:px-6 lg:py-3 lg:text-base rounded-3xl font-medium flex flex-row text-xs items-center text-center gap-1">
    <Play /> WATCH NOW
  </button>

  <div className="relative z-[1000]">
    <button
      onClick={() => setButtonClicked(!buttonClicked)}
      className="px-4 text-xs lg:text-base py-2 lg:px-6 lg:py-3 rounded-3xl backdrop-blur-lg border-2 border-gray-200 flex flex-row items-center text-center gap-1"
    >
      <Plus /> ADD LIST
    </button>
    <div
      className={`absolute ${buttonClicked ? 'flex' : 'hidden'} right-0 top-full mt-2 z-50 shadow-2xl border-2 border-white backdrop-blur-xl rounded-lg`}
    >
      <ul className="flex flex-col gap-5 p-4 text-white lg:text-base text-xs">
        <li className="hover:text-red-600 cursor-pointer" onClick={()=>addToList('favorites')}>Favorites</li>
        <li className="hover:text-red-600 cursor-pointer z-50" onClick={()=>addToList('watchLater')}>Watch Later</li>
      </ul>
    </div>
  </div>
 <Toaster position="top-center" reverseOrder={false} />
</div>

  )
}

export default AddToListButton
