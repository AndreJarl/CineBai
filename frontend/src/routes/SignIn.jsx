import React, { useState, useEffect } from 'react';
import signin1 from "../assets/signin3d.png";
import { Link, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../store/authUser.js';
import { Toaster } from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

function SignIn() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signin, googleAuth, isSigningUp, isLoggingIn, user } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, username, password });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => { navigate('/'); }, 1000);
    }
  }, [user, navigate]);

  return (
    <div
      style={{ backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%), url(${signin1})` }}
      // Changed h-screen to min-h-screen and added padding for mobile safety
      className='min-h-screen w-screen bg-center bg-cover flex justify-center items-center p-4'
    >
      {/* Reduced p-8 to p-6 and gap-6 to gap-4 */}
      <div className='backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl flex flex-col justify-center items-center p-6 w-full max-w-sm shadow-2xl overflow-y-auto'>
        <div className='flex flex-col gap-0.5 mb-4 text-center'>
          <h1 className='text-red-600 font-extrabold text-3xl tracking-tight'>Create Account</h1>
          <p className='text-gray-300 text-xs'>Join <span className='text-red-600 font-bold'>Cine</span><span className='text-yellow-500 font-bold'>Bai</span> today</p>
        </div>

        <form className='space-y-3 w-full' onSubmit={handleSubmit}>
          <div>
            <label className='text-[10px] font-semibold text-gray-400 uppercase ml-1'>Email</label>
            <input
              type='email'
              className='w-full px-3 py-2 mt-0.5 border border-gray-700 rounded-lg bg-black/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='text-[10px] font-semibold text-gray-400 uppercase ml-1'>Username</label>
            <input
              type='text'
              className='w-full px-3 py-2 mt-0.5 border border-gray-700 rounded-lg bg-black/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all'
              placeholder='johndoe'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='text-[10px] font-semibold text-gray-400 uppercase ml-1'>Password</label>
            <input
              type='password'
              className='w-full px-3 py-2 mt-0.5 border border-gray-700 rounded-lg bg-black/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className='w-full py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 active:scale-95 transition-transform text-sm shadow-lg mt-2'
            disabled={isSigningUp || isLoggingIn}
          >
            {isSigningUp ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className='flex items-center my-4 w-full'>
          <hr className='flex-grow border-gray-800' />
          <span className='mx-2 text-gray-500 text-[10px] font-bold uppercase'>Or</span>
          <hr className='flex-grow border-gray-800' />
        </div>

        <div className='w-full flex justify-center scale-90 origin-center'>
          <GoogleLogin
            onSuccess={(res) => googleAuth(res.credential)}
            onError={() => console.log("Login Failed")}
            theme="filled_black"
            shape="pill"
            width="280"
          />
        </div>

        <p className='mt-4 text-gray-400 text-xs'>
          Already have an account? <Link to="/login" className='text-red-500 hover:underline font-semibold ml-1'>Log in</Link>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default SignIn;