import { Github, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <div className='flex flex-col justify-center items-center bg-black'>

    <div className='flex lg:flex-row flex-col mx-10 lg:mx-0  gap-10 justify-center items-center pt-5 pb-10'>
        <div>
           <p className='text-red-600 text-7xl font-bold text-center'>Cine<span className='text-yellow-500'>Bai</span></p>
           <p className='text-3xl text-red-600 text-center'>Thank you <span className='text-yellow-500'>for watching!</span></p>
        </div>

        <div>
           <p className='text-white text-xs max-w-2xl'>Disclaimer: CineBai is a personal project created for educational and entertainment purposes only. We do not host or upload any media files on our servers. All content provided through this site is sourced from publicly available third-party APIs. CineBai is not affiliated with or endorsed by any official movie or TV streaming service. Always respect copyright laws and use the platform responsibly.</p>
        </div>

     
    </div>

    
     <div className='flex justify-center items-center text-white mb-5 text-[10px] opacity-60 '>
        <p>© 2025 • Created by <a className=' font-medium ' >AJA for 3.14a🩷</a> • All rights reserved.</p>
     </div>
   
   
    </div>
  )
}

export default Footer