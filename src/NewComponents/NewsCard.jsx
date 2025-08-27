import { Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';


function NewsCard({ article }) {
  const image = article.heroImageUrl || article.image;
  const category = article.category?.name || article.category;
  const date = article.publishedAt || article.createdAt || article.date;
  return (
    <div className="bg-white shadow-md overflow-hidden rounded-lg cursor-pointer group headline" data-aos="fade-right">
      <div className="">
        {image && (
          <img src={image} alt={article.title} className="h-52 w-full overflow-hidden group-hover:scale-110 duration-300 object-cover"/>
        )}
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className='text-yellow-500 font-semibold'>
          <Link to={`/news-detail/${article.id}`}>{article.title}</Link>
          <hr className='w-full h-0.5 rounded-full bg-yellow-400 -translate-x-full'/>
        </h3>
        <p>{article.summary}</p>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          {category && <span className='border border-gray-200 bg-gray-50 p-1 '>{category}</span>}
          <div className='flex items-center gap-1'>
            <Clock size={16}/>
            <span>{typeof date === 'string' ? date : (date ? new Date(date).toLocaleDateString() : '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
