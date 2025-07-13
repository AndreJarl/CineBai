

export default function WatchLater() {
  return (
          <div className=''>
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
   
  )
}
