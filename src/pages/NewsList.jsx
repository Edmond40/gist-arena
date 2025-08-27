import React, { useEffect, useState } from 'react';
import NewsCard from '../NewComponents/NewsCard';
import SearchBar from '../NewComponents/SearchBarr';
import CategoryFilter from '../NewComponents/CategoryFilterr';
import { ChevronUp } from 'lucide-react';
import NewsCarousel from '../NewComponents/NewsCarousel';
import { PostsAPI, CategoriesAPI } from '../lib/api';

// categories will be derived from API data when loaded

function NewsList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await PostsAPI.list({ published: true, sortBy: 'publishedAt', order: 'desc' });
        setPosts(data);
      } catch {
        setError('Failed to load news from server');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    (async () => {
      try {
        const list = await CategoriesAPI.list();
        const names = Array.isArray(list) ? list.map(c => c.name).filter(Boolean) : [];
        setCategories(Array.from(new Set(names)));
      } catch {
        setCategoriesError('Failed to load categories');
      }
    })();
  }, []);

  const filtered = posts.filter(article => {
    const aCategory = article.category?.name || article.category;
    const matchesCategory = !category || aCategory === category;
    const title = (article.title || '').toLowerCase();
    const summary = (article.summary || '').toLowerCase();
    const q = search.toLowerCase();
    const matchesSearch = title.includes(q) || summary.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className=" gap-10" id='Newslist'>
      <NewsCarousel />

      <div className="flex cols-span-2 flex-col gap-5">
          <div className='flex-1 w-full flex  flex-col gap-2 p-4 text-gray-800'>
            <h2 className='libertinus-serif-bold-italic text-2xl' >Latest News....</h2>
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className='flex justify-center' data-aos="slide-up">
            {categoriesError && <div className='text-sm text-red-600 mr-2'>{categoriesError}</div>}
            <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
          </div>
          <div className='md:grid grid-cols-3 flex flex-col gap-4'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className='text-red-600'>{error}</p>
            ) : filtered.length === 0 ? (
              <p>No news found.</p>
            ) : (
              filtered.map(article => (
                <NewsCard key={article.id} article={article}/>
              ))
            )}
          </div>
      </div>
      <a href="#Newslist" className="fixed text-white bottom-5 right-5 bg-blue-400 z-10 rounded-full hover:rotate-180 duration-300">
        <ChevronUp size={30} className='text-white'/>
      </a>
    </div>
  );
}

export default NewsList;
