import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import signin from "../assets/signin3d.png";
import { Link } from 'react-router-dom';

function ResetPass() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error('Invalid reset link');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
//    remove slash in link
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Password reset successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error resetting password');
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
          <p className='text-center text-red-600 font-bold text-4xl'>Set New Password</p>
          <p className='text-center text-white'>Enter your new password</p>
        </div>
         
        <form className='space-y-4 w-80' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='newPassword' className='text-sm font-medium text-white block'>
              New Password
            </label>
            <input
              type='password'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
              placeholder='Enter new password'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor='confirmPassword' className='text-sm font-medium text-white block'>
              Confirm Password
            </label>
            <input
              type='password'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
              placeholder='Confirm new password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed'
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className='text-white text-sm'>
            Back to{' '}
            <Link to="/login" className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ResetPass;