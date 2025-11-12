import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import signin from "../assets/signin3d.png";

function ForgotPass() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Call your forgot password API
      const response = await fetch(`/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('If an account with that email exists, a password reset link has been sent. Please check in spam');
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className='backdrop-blur border border-white rounded-xl flex flex-col justify-center items-center p-10 '>
        <div className='flex flex-col gap-2 mb-4'>
          <p className='text-center text-red-600 font-bold text-4xl'>Reset Password</p>
          <p className='text-center text-white'>Enter your email to reset your password</p>
        </div>
         
        <form className='space-y-4 w-80' onSubmit={handleSubmit}>
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes('Error') 
                ? 'bg-red-100 text-red-700 border border-red-300' 
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}>
              {message}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed'
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className='text-white text-sm'>
            Remember your password?{' '}
            <Link to="/login" className='text-blue-500 hover:underline'>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ForgotPass;