import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import signin from "../assets/signin3d.png";
import { userAuthStore } from "../store/authUser";
import { Toaster } from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, login, googleAuth, isLoggingIn } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => { navigate('/'); }, 1000);
    }
  }, [user, navigate]);

  return (
    <div
      style={{ backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%), url(${signin})` }}
      className='h-screen w-screen bg-center bg-cover flex justify-center items-center'
    >
      <div className='backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl flex flex-col justify-center items-center p-8 w-full max-w-md shadow-2xl'>
        <div className='flex flex-col gap-1 mb-6 text-center'>
          <h1 className='text-red-600 font-extrabold text-4xl tracking-tight'>Welcome Back</h1>
          <p className='text-gray-300 text-sm'>Log in to <span className='text-red-600 font-bold'>Cine</span><span className='text-yellow-500 font-bold'>Bai</span></p>
        </div>

        <form className='space-y-4 w-full' onSubmit={handleSubmit}>
          <div>
            <label className='text-xs font-semibold text-gray-400 uppercase ml-1'>Email</label>
            <input
              type='email'
              className='w-full px-4 py-2.5 mt-1 border border-gray-700 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center ml-1">
              <label className='text-xs font-semibold text-gray-400 uppercase'>Password</label>
              <Link to="/forgot-pass" className="text-xs text-blue-500 hover:underline">Forgot Password?</Link>
            </div>
            <input
              type='password'
              className='w-full px-4 py-2.5 mt-1 border border-gray-700 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className='w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 active:scale-95 transition-transform shadow-lg shadow-red-900/20 mt-2'
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className='flex items-center my-6 w-full'>
          <hr className='flex-grow border-gray-800' />
          <span className='mx-3 text-gray-500 text-xs font-bold uppercase'>Or continue with</span>
          <hr className='flex-grow border-gray-800' />
        </div>

        <div className='w-full flex justify-center'>
          <GoogleLogin
            onSuccess={(res) => googleAuth(res.credential)}
            onError={() => console.log("Login Failed")}
            theme="filled_black"
            shape="pill"
            width="320"
          />
        </div>

        <p className='mt-6 text-gray-400 text-sm'>
          Don't have an account? <Link to="/signin" className='text-red-500 hover:underline font-semibold ml-1'>Sign Up</Link>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default Login;