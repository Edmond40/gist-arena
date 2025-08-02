import React from 'react';
import { Link } from 'react-router-dom';


function NewsCard({ article }) {
  return (
    <div className="bg-white shadow-md overflow-hidden rounded-md rounded-lg cursor-pointer group headline">
      <div className="">
        <img src={article.image} alt={article.title} className="h-52 w-full overflow-hidden group-hover:scale-110 duration-300 object-cover"/>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className='text-yellow-500 '>
          <Link to={`/news-detail/${article.id}`}>{article.title}</Link>
          <hr className='w-full h-0.5 rounded-full bg-yellow-400 -translate-x-full'/>
        </h3>
        <p>{article.summary}</p>
        <div className="flex gap-2">
          <span>{article.category}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
