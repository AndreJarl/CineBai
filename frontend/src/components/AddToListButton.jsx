import { Play, Plus} from 'lucide-react';
import { useState } from 'react';

function AddToListButton() {

    const [buttonClicked, setButtonClicked] = useState(false);

  return (
  <div className="flex flex-row items-center gap-5 mt-5">
  <button className="bg-red-800 px-4 py-2 lg:px-6 lg:py-3 lg:text-base rounded-3xl font-medium flex flex-row text-xs items-center text-center gap-1">
    <Play /> WATCH NOW
  </button>

  <div className="relative">
    <button
      onClick={() => setButtonClicked(!buttonClicked)}
      className="px-4 text-xs lg:text-base py-2 lg:px-6 lg:py-3 rounded-3xl backdrop-blur-lg border-2 border-gray-200 flex flex-row items-center text-center gap-1"
    >
      <Plus /> ADD LIST
    </button>
    <div
      className={`absolute ${buttonClicked ? 'flex' : 'hidden'} right-0 top-full mt-2 z-50 shadow-2xl border-2 border-white backdrop-blur-xl rounded-lg`}
    >
      <ul className="flex flex-col gap-5 p-4 text-white text-sm">
        <li className="hover:text-red-600 cursor-pointer">Favorites</li>
        <li className="hover:text-red-600 cursor-pointer">Watch Later</li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default AddToListButton
