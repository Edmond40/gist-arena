import { Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';


function NewsCard({ article }) {
  return (
    <div className="bg-white shadow-md overflow-hidden rounded-md rounded-lg cursor-pointer group headline" data-aos="fade-right">
      <div className="">
        <img src={article.image} alt={article.title} className="h-52 w-full overflow-hidden group-hover:scale-110 duration-300 object-cover"/>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className='text-yellow-500 font-semibold'>
          <Link to={`/news-detail/${article.id}`}>{article.title}</Link>
          <hr className='w-full h-0.5 rounded-full bg-yellow-400 -translate-x-full'/>
        </h3>
        <p>{article.summary}</p>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span className='border border-gray-200 bg-gray-50 p-1 '>{article.category}</span>
          <div className='flex items-center gap-1'>
            <Clock size={16}/>
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
