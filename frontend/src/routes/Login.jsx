import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import signin from "../assets/signin3d.png";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authUser";
import { Toaster } from "react-hot-toast";

function Login() {   
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        
        const navigate = useNavigate();
        const {user, login, isLoggingIn} = userAuthStore();

        const handleSubmit = (e) =>{
          e.preventDefault();
              login({email, password});
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
      url(${signin})
    `
  }}
  className='h-screen w-screen bg-center flex justify-center items-center'
    >
        <div  className='backdrop-blur border border-white rounded-xl flex flex-col justify-center items-center p-10 '>
          <div className='flex flex-col gap-2 mb-4'>
              <p className='text-center text-red-600 font-bold text-4xl'>Welcome Back!</p>
              <p className='text-center text-white'>Log In to <span className='text-red-600'>Cine</span><span className='text-yellow-500'>Bai</span></p>
          </div>
           
            <form className='space-y-4' onSubmit={handleSubmit} >
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
                 {isLoggingIn ? "Loading...." : "Log In"}
						</button>
					</form>
          <p className='mt-3 text-white text-sm'>Don't have an account? <Link to="/signin"><span className='text-blue-500'> Sign Up</span></Link></p>
        </div>
         <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Login