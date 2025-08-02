import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, MessageSquare, Rss, Youtube, } from 'lucide-react'


function Navbar() {

  return (
    <nav className="fixed top-0  z-50 flex justify-between items-center p-5 shadow-md bg-white w-full">
        <Link to="/" className='flex items-center'>
          <p className='text-xl font-bold text-gray-700'>Gist <span className='arena text-2xl'>Arena</span></p>
          <Rss size={25} className='text-yellow-500'/>
        </Link>

        <div className="md:flex gap-3 text-lg font-semibold hidden">
            <Link to="/" className="navlink">
                <p>Home</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
            <Link to="/news-list" className="navlink">
                <p>News</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
            <Link to="/about" className="navlink">
                <p>About</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
            <Link to="/contact" className="navlink">
                <p>Contact</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
        </div>

        <div className='flex gap-3 font-semibold text-gray-700'>
            <Link to="/">
              <MessageSquare size={25} className='hover:text-blue-400 hover:scale-110 duration-300 cursor-pointer'/>
            </Link>
            <Link to="/">
              <BellRing size={25} className='hover:text-yellow-400 hover:scale-110 duration-300 cursor-pointer'/>
            </Link>
            <Link to="/">
              <Youtube size={25} className='hover:text-red-500 hover:scale-110 duration-300 cursor-pointer'/>
            </Link>
        </div>
    </nav>
  );
}

export default Navbar;
