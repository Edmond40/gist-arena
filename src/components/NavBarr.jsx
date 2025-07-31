import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rss, User } from 'lucide-react'


function Navbar() {
  const [IsUser, setIsUser] = useState(true)



  return (
    <nav className="sticky top-0 relative z-50 flex justify-between items-center p-5 shadow-md bg-white">
      
        <Link to="/" className='flex items-center'>
          <p className='text-xl font-bold text-gray-700'>Gist <span className='arena text-2xl'>Arena</span></p>
          <Rss size={25} className='text-yellow-500'/>
        </Link>

        <div className="md:flex gap-3 text-lg font-semibold hidden">
          <Link to="/">Home</Link>
          <Link to="/news-list">News</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className='flex gap-3 font-semibold text-gray-700'>
            {
                IsUser ? (
                    <div className='group relative'>
                        <User className='cursor-pointer' />
                        <div className='scale-0 bg-gray-100 p-4 w-32 rounded-md flex flex-col group-hover:scale-110 group-opacity-1 duration-500 absolute top-8 right-2 font-medium text-base text-gray-500'>
                            <Link to="/user-dashboard" className='cursor-pointer hover:text-gray-700 duration-300'>View Profile</Link>
                            <button className='cursor-pointer hover:text-gray-700 duration-300 text-left'>Log Out</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link to="/signup" className='cursor-pointer'>Sign Up</Link>
                        <Link to="/login" className='cursor-pointer ml-2'>Sign In</Link>
                    </div>
                )
            }
        </div>
    </nav>
  );
}

export default Navbar;
