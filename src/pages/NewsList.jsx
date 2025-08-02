import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBarr';
import CategoryFilter from '../components/CategoryFilterr';
import BG2 from '../assets/images/war.jpg'
import { ChevronUp } from 'lucide-react';

// Dummy data for now
const news = [
  {
    id: 1,
    title: 'Russia-Ukraine War: Latest Developments',
    summary: 'Updates on the ongoing conflict between Russia and Ukraine, including frontline changes and diplomatic efforts.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80', // war, soldiers
    category: 'World',
    date: 'July 28, 2025'
  },
  {
    id: 2,
    title: 'NATO Responds to Eastern Europe Tensions',
    summary: 'NATO leaders meet to discuss security and aid in response to growing tensions in Eastern Europe.',
    image: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=400&q=80', // NATO, flags
    category: 'Politics',
    date: 'July 27, 2025'
  },
  {
    id: 3,
    title: 'Global Economic Impact of War',
    summary: 'How the Russia-Ukraine conflict is affecting global markets, energy prices, and food supply.',
    image: BG2, // economy, charts
    category: 'Economy',
    date: 'July 26, 2025'
  },
  {
    id: 4,
    title: 'Humanitarian Crisis in Ukraine',
    summary: 'Millions displaced as humanitarian organizations rush to provide aid in Ukraine and neighboring countries.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80', // refugees, aid
    category: 'World',
    date: 'July 25, 2025'
  },
  {
    id: 5,
    title: 'UN Calls for Ceasefire',
    summary: 'The United Nations urges all parties to agree to a ceasefire and begin peace negotiations.',
    image: 'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=400&q=80', // UN, peace
    category: 'Politics',
    date: 'July 24, 2025'
  }
];

const categories = Array.from(new Set(news.map(n => n.category)));

function NewsList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);

  const filtered = news.filter(article => {
    const matchesCategory = !category || article.category === category;
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className=" gap-10" id='Newslist'>
      <div className='bg-gray-800 fixed left-0 top-0 rounded-2xl shadow-md flex flex-col  justify-between overflow-hidden w-full relative'> 
          <img src={BG2} alt="" className='h-96 lg:w-[100%]  md:w-full overflow-hidden object-cover'/>
          <div className='flex flex-col absolute top-40 bottom-0 left-0 right-0 p-5 text-white text-right inset-0 bg-gradient-to-t from-black/80 to-transparent'>
              <h1 className='font-bold text-xl text-red-500'>UN Calls for Ceasefire</h1>
              <span className='font-semibold text-yellow-400'>The United Nations urges all parties to agree to a ceasefire and begin peace negotiations</span>
              <p className='text-gray-200'>July 24, 2025</p>
        </div>
      </div> 

      <div className="flex cols-span-2 flex-col gap-5">
          <div className='flex-1 w-full flex  flex-col gap-2 p-4 text-gray-800'>
            <h2 className='libertinus-serif-bold-italic text-2xl' >Latest News....</h2>
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className='flex justify-center'>
            <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
          </div>
          <div className='md:grid grid-cols-3 flex flex-col gap-4'>
            {filtered.length === 0 ? (
              <p>No news found.</p>
            ) : (
              filtered.map(article => (
                <NewsCard key={article.id} article={article} />
              ))
            )}
          </div>
      </div>
      <a href="#Newslist" className="fixed text-white bottom-5 right-5 bg-blue-400 rounded-full hover:rotate-180 duration-300">
        <ChevronUp size={30} className='text-white'/>
      </a>
    </div>
  );
}

export default NewsList;
