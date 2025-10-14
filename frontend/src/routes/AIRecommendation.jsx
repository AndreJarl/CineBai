import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import bot from "../assets/bot.png"
import { useContentStore } from '../store/contentType';
import { Sparkles, Film, Tv, Search, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../store/authUser';
import toast from 'react-hot-toast';

function AIRecommendation() {
   
  const navigate = useNavigate();


  const {contentType, setContentType} = useContentStore();
 
  const [prompt, setPrompt] = useState("");
  const [AIRecommdations, setAIRecommendations] = useState([]);
  const [aiMessage, setAIMessage] = useState("");
  const [loading, isLoading] = useState(false);
  const {user} = userAuthStore();

  const getAiRecos = async () =>{
    if(!user){
        navigate("/login");
        toast.error("Pls login to use CineBAI AI")
    }
    try{
        isLoading(true);
         const response = await axios.post(`/api/ai/${contentType}/ai-recommendation/`, {prompt});
         setAIMessage(response.data.message);
         setAIRecommendations(response.data.recommendations);
        console.log(response.data.recommendations);
        console.log(response.data.message);
    }catch(error){
       console.error(error);
    }finally{
      isLoading(false);
    }
       
        
  }

  const examplePrompts = [
    "I want to watch something similar to The Dark Knight",
    "Show me romantic comedies from the 90s",
    "I'm in the mood for a psychological thriller",
    "Recommend sci-fi movies with strong female leads",
    "What are some hidden gem horror movies?",
    "I want to watch something that will make me cry"
  ];

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  return (
    <>
      <Navbar/>
      
      
      <div className="bg-gradient-to-br from-black via-gray-900 to-black pt-10 -mt-20 text-white">
        <div className="container mx-auto lg:px-4  pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-around gap-12 mb-16">
            
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse"></div>
                <img 
                  src={bot} 
                  alt="AI Bot Mascot" 
                  className="relative w-80 h-80  lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

          
             <div className="w-full flex flex-col gap-4 lg:w-[60%] text-center lg:text-left">
               <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>
                 <span className='text-red-600'>AI-Powered</span> Prompt-Based Discovery That <span className='text-yellow-500'>Understands You</span> 
               </h1>
               <p className="text-xl text-gray-300 mb-8 max-w-4xl leading-relaxed">
                 Meet your personal AI assistant from <span className="text-yellow-500 font-semibold">Cine</span><span className="text-red-600 font-semibold">Bai</span>! I'll help you discover your next favorite movie or TV show based on your prompt and mood.
               </p>
              
         
            </div>
          </div>

    
            <p className='text-center mt-10 mb-1'>Choose media:</p>
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-lg border border-gray-200/20 rounded-full p-2">
                  <button
                    onClick={() => setContentType("movie")}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      contentType === "movie"
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <Film className="w-4 h-4 inline mr-2" />
                    Movies
                  </button>
                  <button
                    onClick={() => setContentType("tv")}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      contentType === "tv"
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <Tv className="w-4 h-4 inline mr-2" />
                    TV Shows
                  </button>
                </div>
              </div>
         
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-gray-200/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">
                Tell me what you're in the mood for
              </h3>
              
              <div className="relative mb-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe what kind of ${contentType === "movie" ? "movie" : "TV show"} you want to watch...`}
                  className="w-full h-32 bg-gradient-to-br from-white/5 to-white/2 border border-gray-200/20 rounded-xl p-4 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-400" />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={getAiRecos}
                  disabled={!prompt.trim() || loading}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Getting Recommendations...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Get AI Recommendations
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

         
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-300">
              Try these example prompts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="bg-gradient-to-br from-white/5 to-white/2 border border-gray-200/20 rounded-xl p-4 text-left hover:from-white/10 hover:to-white/5 transition-all duration-300 hover:border-red-500/50 group"
                >
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                    "{example}"
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Results Section */}
          {(aiMessage || AIRecommdations.length > 0) && (
            <div className="max-w-6xl mx-auto mb-16">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-gray-200/20 rounded-2xl p-8">
                {aiMessage && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      AI Response
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {aiMessage}
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-600 border-t-transparent"></div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                        AI is thinking...
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">
                      Analyzing your preferences and finding the perfect recommendations
                    </p>
                  </div>
                )}

                {AIRecommdations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Film className="w-5 h-5 text-red-400" />
                      Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {AIRecommdations.map((item, index) => (
                    <Link to={contentType === "movie"  ? `/movie-details/${item.id}`: `/tv-details/${item.id}`}key={item.id}>
                          <div className="bg-gradient-to-br from-white/5 to-white/2 border border-gray-200/20 rounded-xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300">
                         <img className='lg:h-[200px] lg:hover:h-[300px] lg:hover:w-[400px]' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" srcset="" />
                          <h4 className="text-lg font-bold mb-2 text-white">
                            {item.title || item.name}
                          </h4>
                          <p className="text-gray-300 text-sm mb-3">
                            {item.overview}
                          </p>
                          <div className="flex items-center gap-2 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold">
                              {item.vote_average?.toFixed(1) || 'N/A'}
                            </span>
                           
                          </div>
                          
                        </div>
                      </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
   
  )
}

export default AIRecommendation