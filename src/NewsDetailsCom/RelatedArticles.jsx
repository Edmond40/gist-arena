import React from 'react';
import { Link } from 'react-router-dom';

const RelatedArticles = ({ news, article, relatedFilter, setRelatedFilter }) => {
  return (
    <div className='flex flex-col gap-2 md:pr-0 pr-5' data-aos="fade-right">
      <div className='flex items-center gap-1' data-aos="slide-up">
        <div className='w-7 h-1 bg-yellow-400'></div>
        <h1 className='trend font-bold text-xl'>Related Articles</h1>
      </div>
      
      {/* Category Filter for Related Articles */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          className="px-3 py-1 text-sm bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500 transition-colors"
          onClick={() => setRelatedFilter('all')}
        >
          All
        </button>
        <button 
          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-yellow-400 hover:text-gray-800 transition-colors"
          onClick={() => setRelatedFilter(article.category)}
        >
          {article.category}
        </button>
      </div>
      
      <div className='flex flex-col gap-5 max-h-96 overflow-y-auto'>
        {news
          .filter(item => item.id !== article.id) // Exclude current article
          .filter(item => {
            if (relatedFilter === 'all') return true;
            return item.category === relatedFilter;
          })
          .slice(0, 6) // Show max 6 related articles
          .map((item, index) => (
          <Link to={`/news-detail/${item.id}`} key={index} className='w-82 p-4 rounded bg-gray-100 shadow-md hover:shadow-lg hover:-translate-y-2 duration-500 border-l-4 border-transparent hover:border-yellow-400'>
            <div className='headline2 overflow-hidden'>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded-full">{item.category}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <h1 className='font-semibold text-red-500 text-sm leading-tight mb-2'>{item.title}</h1>
              <p className='text-gray-600 text-xs line-clamp-2'>{item.summary}</p>
            </div>
          </Link>
        )) 
        }
      </div>
      
      {/* Most Popular Section */}
      <div className="mt-8">
        <div className='flex items-center gap-1 mb-4'>
          <div className='w-5 h-0.5 bg-red-500'></div>
          <h2 className='trend font-bold text-lg'>Most Popular</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {news.slice(0, 3).map((item, index) => (
            <Link to={`/news-detail/${item.id}`} key={index} className='flex gap-3 p-3 rounded bg-white shadow-sm hover:shadow-md transition-shadow'>
              <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-gray-800 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
