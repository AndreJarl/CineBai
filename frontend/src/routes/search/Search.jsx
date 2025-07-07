import React, { useState } from 'react'
import { useContentStore } from '../../store/contentType';
import { useEffect } from 'react';
import axios from 'axios';
import searchbg from "../../assets/search.png"

function Search() {
    const [query, setQuery] = useState("");
    const {contentType} = useContentStore();
    const [search, setSearch] = useState([]);
    useEffect(()=>{
       const getSearch = async () =>{
            try {
                const res = await axios.get(`/api/search/${contentType}/${query}`);
                setSearch(res.data.content);

            } catch (error) {
                console.error("Error in fetching search", error);
            }
            getSearch();
       }

    },[query, contentType])
  return (
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
    className="bg-cover bg-center h-screen w-full relative flex flex-col justify-center items-center text-white"
  >


   <div>
       
   </div>

    </div>
  )
}

export default Search