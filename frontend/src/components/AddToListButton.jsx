import { Play, Plus} from 'lucide-react';
import { useState } from 'react';

function AddToListButton() {

    const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <div className='flex  flex-row relative items-center gap-5 mt-5'>
          <button className='bg-red-800 px-6 py-3 rounded-3xl flex flex-row text-center gap-2 '><Play/>WATCH NOW</button>
          <button onClick={()=>setButtonClicked(!buttonClicked)} className=' px-6 py-3  rounded-3xl backdrop-blur-lg border-2 border-gray-200 flex flex-row text-center gap-2'><Plus />ADD LIST</button>

         <div className={`absolute ${buttonClicked ? 'flex' : 'hidden'} left-80 top-14 shadow-2xl border-2 border-white backdrop-blur-xl rounded-lg`} >
            <ul className='flex flex-col gap-5 p-4 '>
                <li  className='hover:text-red-600 cursor-pointer'>Favorites</li>
                <li className='hover:text-red-600 cursor-pointer' >Watch Later</li>
            </ul>
         </div>
      </div>
  )
}

export default AddToListButton
