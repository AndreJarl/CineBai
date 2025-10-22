import React, { useState, useEffect } from 'react'
import signin1 from "../assets/signin3d.png";
import { Link, useNavigate  } from 'react-router-dom';
import {userAuthStore} from '../store/authUser.js'
import {Toaster} from 'react-hot-toast';

function SignIn() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const {signin, isSigningUp, user} = userAuthStore();


    const handleSubmit =(e) =>{
          e.preventDefault();
          signin({email,username,password});
    }

      useEffect(() => {
    if (user) {
      // Navigate after a short delay so toast is visible
      setTimeout(() => {
        navigate('/'); // or wherever you want
      }, 1000);
    }
  }, [user, navigate]);


  return (
    <div
     style={{
    backgroundImage: `
      radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%),
      url(${signin1})
    `
  }}
  className='h-screen w-screen bg-center flex justify-center items-center'
    >
        <div  className='backdrop-blur border border-white rounded-xl flex flex-col justify-center items-center p-10 '>
          <div className='flex flex-col gap-2 mb-4'>
              <p className='text-center text-red-600 font-bold text-4xl'>Create an Account!</p>
              <p className='text-center text-white'>Sign Up to <span className='text-red-600'>Cine</span><span className='text-yellow-500'>Bai</span></p>
          </div>
           
            <form className='space-y-4' onSubmit={handleSubmit}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-white block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='you@example.com'
								id='email'
				        value={email}
                onChange={(e)=>setEmail(e.target.value)}
								
							/>
						</div>

						<div>
							<label htmlFor='username' className='text-sm font-medium text-white block'>
								Username
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='johndoe'
								id='username'
				         value={username}
                onChange={(e)=>setUsername(e.target.value)}
					
							/>
						</div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-white block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='••••••••'
								id='password'
					       value={password}
                onChange={(e)=>setPassword(e.target.value)}
							/>
						</div>

						<button
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						'
				
						>
                 { isSigningUp ? "Loading...." : "Sign Up"}
						</button>
					</form>
          <p className='mt-3 text-white text-sm'>Already have an account? <Link to="/login"><span className='text-blue-500'> Log in</span></Link></p>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default SignIn