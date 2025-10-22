import React, { useState } from 'react'
import { useContentStore } from '../../store/contentType';
import { useEffect } from 'react';
import axios from 'axios';
import searchbg from "../../assets/search.png"
import Navbar from '../../components/Navbar';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import noimg from "../../assets/4043d.png";

function SearchContent() {
    
    const [query, setQuery] = useState("");
    const {contentType, setContentType} = useContentStore();
    const [search, setSearch] = useState([]);
    const [hasSearched, setHasSearch] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
          if (query.trim() !== "" && hasSearched) {
             getSearch(); // 🔄
            
  }
    },[query, contentType]);

         const getSearch = async () =>{
            try {
                   setisLoading(true);
                    setHasSearch(false);
                const res = await axios.get(`/api/search/content/${contentType}/${query}`);
            
                setSearch(res.data.content);
                console.log(res.data.content)
              
         ;
            } catch (error) {
                console.error("Error in fetching search", error);
            
            }finally{
                setisLoading(false);
            }
          
       }

    const searchButtonClicked = () =>{
         setHasSearch(true);
         getSearch();
    }
  return ( 
    <>
 <Navbar/>
   <div
   style={{
    backgroundImage: `
      radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.95)),
      url(${searchbg})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
    className={`bg-cover bg-center h-screen -mt-24 ${search.length > 0 || hasSearched ? 'h-full' : 'h-screen'} relative flex flex-col bg-black/70 items-center  text-white`}

  >
 
            <div className='flex flex-col gap-3 items-center mt-40'>
            <p className='lg:text-7xl text-center text-5xl font-bold'><span className='text-red-600'>Cine</span><span className='text-yellow-500'>Bai</span> 🎞️🧐 </p>
            <p className='text-center lg:text-3xl text-2xl font-medium'>Discover the films and series you love with <span className='text-red-600'>Cine</span><span className='text-yellow-500'>Bai</span>.</p>

            <div className='flex lg:flex-row md:flex-row flex-col items-center lg:gap-2 gap-5 mt-2'>
                <input className='lg:w-[600px] w-[300px] h-14 rounded-full outline-none pl-5 text-black' type="text" placeholder='Search....' onChange={(e)=>setQuery(e.target.value)} 
                onKeyDown={(e)=>{
                    if(e.key === 'Enter' && query.trim() !== ""){
                        searchButtonClicked();
                    }
                }}/>
                <button onClick={()=> {query.trim() != "" && searchButtonClicked()}} disabled={query.trim()===""} className={`flex rounded-full gap-1 ${query.trim() === "" ? 'bg-red-600 opacity-80' : 'bg-red-600 hover:bg-red-700 opacity-100 cursor-pointer'} px-4 text-xl  lg:py-3 py-2 items-center`}><Search/> Search </button>
            </div>
            </div>
              <p className='mt-10 mb-1'>Choose media:</p>
              <div className='flex justify-center items-center' >
                  <ul className='flex flex-row justify-center items-center text-xl bg-yellow-300/60 backdrop-blur-md px-3 py-2 shadow-2xl rounded-full'>
                      <li onClick={()=>{setContentType("movie"); setHasSearch(true)}} className={` cursor-pointer px-6  py-1 ${contentType === "movie" ? 'bg-red-600 font-medium  rounded-full text-white' : "text-white"} `}>Movie</li>
                      <li onClick={()=>{setContentType("tv"); setHasSearch(true)}}className={`cursor-pointer px-6  py-1 ${contentType === "tv" ? 'bg-red-600 font-medium rounded-full text-white' : "text-white"}`}>Series</li>
                  </ul>
              </div>

                      {isLoading &&
                         <>
                            <p className="text-4xl mt-10 text-center">
                                Searching for {query} {contentType === "movie" ? "Movies" : "Series"}...........
                            </p>
                        </>
                       }


                    {!isLoading && search.length === 0 && hasSearched ? (
                   
                        <div className='flex flex-col justify-center items-center mt-10 gap-5 pb-20'>
                            <p className='text-2xl'>0 results for "{query}".</p>
                            <img className='lg:w-[700px] w-[350px] mx-4' src={noimg} alt="" srcset="" />
                        </div>
                    ):(
                          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mt-20 lg:mx-28 mx-5 mb-20">
                                {search.map((s, index) => (
                                <Link
                                    to={
                                    contentType === "movie"
                                        ? `/movie-details/${s.id}`
                                        : `/tv-details/${s.id}`
                                    }
                                    key={s.id} // Use unique key here
                                >
                                    <div className="flex flex-col gap-2 md:items-center">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${s.poster_path}`}
                                        className="z-50 lg:h-[300px] w-[250px] hover:scale-110 mt-5 transition-transform duration-300 rounded-lg shadow-md"
                                        alt={contentType === "movie" ? s.title : s.name}
                                    />
                                    <div className="flex flex-row items-center justify-between mx-1">
                                        <p className="text-base font-medium">
                                        {contentType === "movie" ? s.title : s.name}
                                        </p>
                                    </div>
                                        </div>
                                </Link>
                                ))}
                         </div>
                    )
                        }

                   


               

    </div>

    </>
  )
}


export default SearchContent