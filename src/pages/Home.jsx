import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Clock, Search } from 'lucide-react'
import BG1 from '../assets/images/bb4.jpg'
import  HomeCarousel  from '../NewComponents/HomeCarousel';
import { PostsAPI, CategoriesAPI } from '../lib/api';

// Categories will be loaded from backend

function Home() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [trendingError, setTrendingError] = useState('');
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredError, setFeaturedError] = useState('');
  const [categories, setCategories] = useState(['All']);
  const [categoriesError, setCategoriesError] = useState('');
  function handleSubmit(e){
    e.preventDefault();
  }
  // Rotate ticker based on loaded trending posts
  useEffect(() => {
    if (!trendingPosts || trendingPosts.length === 0) return;
    const interval = setInterval(() => {
      setHeadlineIdx(idx => (idx + 1) % trendingPosts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [trendingPosts]);

  // Fetch Categories from API
  useEffect(() => {
    (async () => {
      try {
        const list = await CategoriesAPI.list();
        const names = Array.isArray(list)
          ? list.map(c => (c.name || '').trim()).filter(Boolean)
          : [];
        // de-dupe case-insensitively while preserving original display text
        const seen = new Set();
        const unique = [];
        for (const n of names) {
          const key = n.toLowerCase();
          if (!seen.has(key)) { seen.add(key); unique.push(n); }
        }
        setCategories(['All', ...unique]);
      } catch {
        setCategoriesError('Failed to load categories');
      }
    })();
  }, []);

  // Fetch Trending Posts from API
  useEffect(() => {
    (async () => {
      try {
        const posts = await PostsAPI.list({ isTrending: true, sortBy: 'trendingScore', order: 'desc' });
        setTrendingPosts(posts);
      } catch {
        setTrendingError('Failed to load trending posts');
      }
    })();
  }, []);

  // Fetch Featured/Recent Posts from API
  useEffect(() => {
    (async () => {
      try {
        const posts = await PostsAPI.list({ published: true, sortBy: 'publishedAt', order: 'desc' });
        setFeaturedPosts(posts);
      } catch {
        setFeaturedError('Failed to load featured posts');
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex md:flex-row flex-col-reverse justify-center w-full justify-between gap-4 lg:h-[70vh]" id='Home'>
          <div className="text-center text-white flex flex-col gap-4 flex-1 relative overflow-hidden rounded-xl" data-aos="fade-down">
            <img src={BG1} alt="" className='h-full object-cover'/>
            <div className='flex flex-col absolute md:top-40 top-20 bottom-0 left-0 right-0 p-5 inset-0 bg-gradient-to-t from-black/80 to-transparent'>
              <h1 className="md:text-4xl font-bold">Gist <span className='text-yellow-400 arena'>Arena</span></h1>
              <p className="">Your trusted source for the latest news</p>
              <div className="flex items-center justify-center gap-2">
              <form onSubmit={e => e.preventDefault()} className="flex items-center justify-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Search for news..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="md:w-96 border-2 p-2 shadow-md rounded-full focus:outline-none focus:border-yellow-500 duration-300"
                  />
                  <button type="submit" className="animate-pulse ">
                    <Search size={40} className='border-2 p-1 rounded-xl bg-blue-400 hover:bg-blue-500 duration-300 cursor-pointer'/>
                  </button>
              </form>
              </div>
            </div>
            
          </div>
          <div data-aos="fade-up">
            <HomeCarousel />
          </div>
      </section>

      <div className="flex flex-col justify-center gap-4 md:p-10 p-3 mt-5" data-aos="fade-right">
        <div className='flex flex-col items-center'>
          <span className="md:text-2xl trend font-semibold">Trending</span>
          <div className='w-20 h-0.5 bg-yellow-400 rounded-full'></div>
        </div>
        <div className="bg-red-500 text-white p-4 md:rounded-full rounded-md flex gap-2 md:justify-center md:items-center w-full">
          <span className="text-lg font-semibold libertinus-serif-bold-italic">{trendingPosts[headlineIdx]?.category?.name || 'Latest'}:</span>
          <span className="libertinus-serif-regular">{trendingPosts[headlineIdx]?.title || 'No trending posts yet'}</span>
        </div>
      </div>

      {/* Category Filters */}
      <section className="bg-yellow-400 text-gray-700 font-semibold rounded-sm p-2">
        <div className="md:flex justify-evenly bg-yellow-400" data-aos="zoom-in">
          {categoriesError && (
            <div className="w-full text-center text-sm text-red-700 mb-2">{categoriesError}</div>
          )}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-bold px-4 py-2 rounded transition duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-white text-yellow-500 shadow"
                  : "text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Posts (API-driven) */}
      <section className="mt-8" data-aos="fade-up">
        <div className='flex items-center gap-2 w-82 mb-3'>
          <h2 className='trend font-bold text-gray-700 md:text-2xl'>Trending Posts</h2>
          <div className='w-28 h-1 bg-yellow-400'></div>
        </div>
        {trendingError && <div className="text-red-600 text-sm">{trendingError}</div>}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {trendingPosts.map(p => (
            <div key={p.id} className="bg-white shadow rounded-md overflow-hidden group">
              {p.heroImageUrl && (
                <img src={p.heroImageUrl} alt={p.title} className="h-48 w-full object-cover group-hover:scale-105 duration-300" />
              )}
              <div className="p-4 flex flex-col gap-2">
                <span className="text-xs text-gray-500">Score: {p.trendingScore ?? 0}</span>
                <h3 className="font-semibold">{p.title}</h3>
                {p.summary && <p className="text-sm text-gray-600 line-clamp-2">{p.summary}</p>}
                <div className="group-hover:translate-x-2 duration-300 mt-2">
                  <Link to={`/news-detail/${p.id}`} className='bg-yellow-500 text-white rounded-md hover:bg-yellow-600 p-1.5 text-sm'>Read More →</Link>
                </div>
              </div>
            </div>
          ))}
          {trendingPosts.length === 0 && !trendingError && (
            <div className="text-sm text-gray-600">No trending posts yet.</div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="flex md:flex-row flex-col  justify-between gap-5 mt-10">
        {/* Featured Stories */}
        <section className="flex md:flex-1 flex-col gap-3">
          <div className='flex items-center gap-2 w-82' data-aos="slide-up">
            <h2 className='trend font-bold text-gray-700 md:text-2xl'>Featured Stories</h2>
            <div className='w-28 h-1 bg-yellow-400'></div>
          </div>
          <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4 p-4 shadow-md" data-aos="fade-right">
            {featuredError && (
              <div className="text-sm text-red-600">{featuredError}</div>
            )}
            {featuredPosts
              .filter(p => {
                const cat = (p.category?.name || '').trim().toLowerCase();
                const sel = (activeCategory || '').trim().toLowerCase();
                const matchesCategory = sel === 'all' || (cat && cat === sel);
                const q = searchQuery.toLowerCase();
                const matchesSearch = (p.title || '').toLowerCase().includes(q) || (p.summary || '').toLowerCase().includes(q);
                return matchesCategory && matchesSearch;
              })
              .map(p => (
                <div key={p.id} className="bg-white shadow-md overflow-hidden rounded-md rounded-lg cursor-pointer group" data-aos="fade-right">
                  {p.heroImageUrl && (
                    <img src={p.heroImageUrl} alt={p.title} className="h-52 w-full overflow-hidden group-hover:scale-110 duration-300 object-cover"/>
                  )}
                  <div className="flex flex-col gap-4 p-4">
                    <h3>{p.title}</h3>
                    {p.summary && <p>{p.summary}</p>}
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      {p.category?.name && (
                        <span className='border border-gray-200 bg-gray-50 p-1'>{p.category.name}</span>
                      )}
                      <div className='flex items-center gap-1'>
                        <Clock size={16}/>
                        <span>{p.publishedAt ? new Date(p.publishedAt).toLocaleString() : ''}</span>
                      </div>
                    </div>
                    <div className="group-hover:translate-x-4 duration-300">
                      <Link to={`/news-detail/${p.id}`} className='bg-red-500 text-white rounded-md hover:bg-red-600 p-1.5'>Read More →</Link>
                    </div>
                  </div>
                </div>
              ))}
            {featuredPosts.length === 0 && !featuredError && (
              <div className="text-sm text-gray-600">No posts yet.</div>
            )}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="bg-red-500 text-white flex flex-col justify-between md:w-96 p-5" data-aos="fade-up">
            <div className="">
              <div className='flex flex-col w-24'>
                <span className="md:text-2xl trend font-semibold text-gray-800">Trending</span>
                <div className='w-22 mx-auto h-0.5 bg-yellow-400 rounded-full'></div>
            </div>
            <ul className="flex flex-col gap-4 mt-5">
              {trendingPosts.map((p, idx) => (
                <li key={p.id ?? idx} className={idx === headlineIdx ? 'active' : ''}>
                  <span className="libertinus-serif-bold">{p.category?.name || 'Latest'}: </span>
                  <Link to={`/news-detail/${p.id}`} className='underline'>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3 className='font-semibold'>Stay Updated</h3>
            <p>Subscribe to our newsletter for daily updates</p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <input type="email" placeholder="Your email address" className="w-full border-2 p-1 shadow-md rounded-md focus:outline-none focus:border-yellow-500 duration-300"/>
              <button type="submit" className='bg-yellow-400 px-2 rounded-lg cursor-pointer hover:bg-yellow-300 hover:scale-110 duration-300'>Subscribe</button>
            </form>
          </div>
        </aside>
      </div>

      {/* Call to Action */}
      <section className="mt-10 flex flex-col text-center items-center md:w-96 mx-auto" data-aos="zoom-in">
        <h2 className='libertinus-serif-bold-italic'>Never Miss an Update</h2>
        <p className='libertinus-serif-semibold-italic'>Get the latest news delivered straight to your inbox</p>
        <Link to="/news-list" className="bg-purple-400 text-white p-2 rounded-md hover:bg-purple-500 duration-300 animate-bounce mt-3">Explore All News</Link>
      </section>

      <a href="#Home" className="fixed text-white bottom-5 right-5 bg-blue-400 rounded-full hover:rotate-180 duration-300">
        <ChevronUp size={30} className='text-white'/>
      </a>
    </div>
  );
}

export default Home;
