import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AddToListButton from '../../components/movie/AddToListButtonMovie';
import SimilarMovies from '../../components/movie/SimilarMovies';
import DetailsSkeleton from '../../components/DetailsSkeleton';
import { CheckCircle } from 'lucide-react';
import { userAuthStore } from '../../store/authUser';


function MovieDetails() {
      
  const [movie, setMovies] = useState({});
  const {id} = useParams();
  const [fetchingMovie, setFetchingMovie] = useState(false);
  const { user } = userAuthStore();

    useEffect(()=>{
        const getMovieDetails = async () =>{
              setFetchingMovie(true);
              try {
                const res = await axios.get(`/api/movie/${id}/movieDetails`);
              setMovies(res.data.content);
              setFetchingMovie(false);
              } catch (error) {
                   console.error("Failed to fetch movie details", error);
              }
        }

        getMovieDetails();
    }, [id])

    const isWatched = user?.watched?.some(
      (item) => String(item.id) === String(movie.id) && item.mediaType === "movie"
    );

    
const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

if (fetchingMovie) return <DetailsSkeleton />;

  return (
    <>
     <Navbar/>
   <div
   style={{
    backgroundImage: `
      radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.95)),
      url(${backdropUrl})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
    className="bg-cover bg-center h-full w-full relative flex flex-col justify-center items-center text-white"
  >
    
    
       <div className='flex justify-center items-center lg:flex-row flex-col gap-6 mx-10 mt-36'>
           <div className='relative'>
                 <img  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}  className="h-[400px]  hover:scale-110  transition-transform duration-300 w-[300px] object-cover rounded-lg shadow-md"/>
          {isWatched && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-red-500/30 bg-red-600/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md animate-pop">
              <CheckCircle className="h-3.5 w-3.5" />
              Watched
            </div>
          )}
           </div>
           <div className='flex flex-col items-start justify-center gap-4 text-left'>
         
               <p className='lg:text-5xl text-4xl max-w-xl font-semibold'>{movie.title}</p>
               <div className='flex flex-row  gap-2 items-center'>
               {movie.genres?.map((genre, index) => (
              <p className="lg:text-sm text-xs opacity-75" key={index}>
                {genre.name} {index !== movie.genres.length - 1 && '|'}
              </p>
            ))}
               </div>
               <p className="max-w-xl text-sm lg:text-base md:text-xl  font-normal">{movie.overview}</p>
               <p className='text-white flex justify-center items-center lg:text-base text-[12px] gap-2'>⭐ {movie.vote_average?.toFixed(1)} <span className='lg:text-sm text-[10px] opacity-75'>({movie.vote_count} votes) </span>| ⌛ {movie.runtime} mins |  📅  {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} </p>
               <AddToListButton movie={movie} mediaType="movie"/>
             
           </div>
         
       </div>
       <div className=''>
    
      <SimilarMovies id={id} />
    </div>
    </div>
   
   
   </>
  )
}

export default MovieDetails