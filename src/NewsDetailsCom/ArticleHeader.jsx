import React from 'react';
import { Clock, User, Hourglass } from 'lucide-react';

const ArticleHeader = ({ article, isDarkMode, description }) => {
  return (
    <div className='flex flex-col items-center mb-5 gap-2'>
      <img src={article.image} alt={article.title} className='w-full max-w-xl rounded-xl'/>

      <div className={`${isDarkMode ? 'dark:text-gray-300' : 'text-gray-600'} lg:flex-row flex flex-col items-center gap-4 font-medium mt-3 text-sm`}>
        <span className={`border ${isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-1`}>
          {article.category}
        </span>
        <div className='flex items-center gap-1'>
          <Clock size={16}/>
          <h4>{article.day}</h4>
          <span>{article.date} at</span>
          <p>{article.time}</p>
        </div>
        <div className='flex items-center gap-1'>
          <User size={16}/>
          <p>{article.author}</p>
        </div>
        <div className='flex items-center gap-1'>
          <Hourglass size={16}/>
          <p>{article.minutesRead}</p>
        </div>
      </div>
      
      <h2 className={`text-center libertinus-serif-semibold-italic ${isDarkMode ? 'dark:text-white' : ''}`}>
        {article.title}
      </h2>
      <p className={`trend md:w-[75%] ${isDarkMode ? 'dark:text-gray-300' : 'text-gray-700'}`}>
        {article.summary}
      </p>
      <p className={`md:w-[75%] ${isDarkMode ? 'dark:text-gray-300' : 'text-gray-700'}`}>
        {description}
      </p>
    </div>
  );
};

export default ArticleHeader;
