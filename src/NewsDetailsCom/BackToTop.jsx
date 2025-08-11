import React from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
  return (
    <a href="#NewsDetails" className="fixed text-white bottom-5 right-5 bg-blue-400 rounded-full hover:rotate-180 duration-300 z-10">
      <ChevronUp size={30} className='text-white'/>
    </a>
  );
};

export default BackToTop;
