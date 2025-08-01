import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react'
import Trend1 from '../assets/images/bb2.jpg'
import Trend2 from '../assets/images/bb3.jpg'
import BG1 from '../assets/images/bb4.jpg'
import WAR from '../assets/images/war.jpg'


const headlines = [
  { text: "Breaking News: Russia-Ukraine War Escalates!", category: "World" },
  { text: "NATO Holds Emergency Summit Today", category: "Politics" },
  { text: "UN Calls for Immediate Ceasefire", category: "World" },
  { text: "Global Markets React to Crisis", category: "Business" },
  { text: "Millions Displaced: Humanitarian Aid Needed", category: "Humanitarian" }
];

const featuredStories = [
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
    image: WAR, // economy, charts
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

const categories = ["World", "Politics", "Business", "Technology", "Science", "Health", "Entertainment", "Sports"];

function Home() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIdx(idx => (idx + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex md:flex-row flex-col justify-center w-full justify-between gap-4">
          <div className="text-center text-white px-3 flex flex-col gap-4 flex-1 relative">
            <img src={BG1} alt="" className='h-96 object-cover brightness-75 rounded-xl'/>
            <div className='flex flex-col absolute top-40 bottom-0 left-0 right-0 p-5'>
              <h1 className="md:text-4xl font-bold">Gist <span className='text-yellow-400 arena'>Arena</span></h1>
              <p className="">Your trusted source for the latest news</p>
              <div className="flex items-center justify-center gap-2 cols-">
                <input 
                  type="text" 
                  placeholder="Search for news..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-96 border-2 p-2 shadow-md rounded-full focus:outline-none focus:border-yellow-500 duration-300"
                />
                <button className="">
                  <Search size={40} className='border p-2 rounded-xl hover:bg-blue-500 duration-300 cursor-pointer'/>
                </button>
              </div>
            </div>
            
          </div>

          <div className='flex flex-col justify-center md:w-58 px-3 md:px-0 mx-auto'>
            <div className='w-full flex flex-col gap-4'>
              <div className='w-full'>
                  <img src={Trend1} alt="" className='rounded-md brightness-75'/>
              </div>
              <div className='w-full'>
                  <img src={Trend2} alt="" className='rounded-md brightness-75'/>
              </div>
            </div>
          </div>
      </section>

      <div className="flex flex-col justify-center gap-4 md:p-10 p-3">
        <div className='flex flex-col items-center'>
          <span className="md:text-2xl trend font-semibold">Trending</span>
          <div className='w-20 h-0.5 bg-yellow-400 rounded-full'></div>
        </div>
        <div className="bg-red-500 text-white p-4 md:rounded-full rounded-md flex gap-2 md:justify-center md:items-center w-full">
          <span className="text-lg font-semibold libertinus-serif-bold-italic">{headlines[headlineIdx].category}:</span>
          <span className="libertinus-serif-regular">{headlines[headlineIdx].text}</span>
        </div>
      </div>

      {/* Category Filters */}
      <section className="bg-yellow-400 text-gray-700 font-semibold rounded-sm p-2">
        <div className="md:flex justify-evenly gap-2 bg-yellow-400">
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

      {/* Main Content */}
      <div className="flex md:flex-row flex-col gap-5 mt-10">
        {/* Featured Stories */}
        <section className="flex md:flex-1 flex-col gap-3">
          <div className='flex items-center gap-2'>
            <h2 className='trend font-bold text-gray-700 md:text-2xl'>Featured Stories</h2>
            <div className='w-28 h-1 bg-yellow-400'></div>
          </div>
          <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4 p-4 shadow-md">
            {featuredStories.map(story => (
              <div key={story.id} className="bg-white shadow-md overflow-hidden rounded-md rounded-lg cursor-pointer group">
                <img src={story.image} alt={story.title} className="h-52 w-full overflow-hidden group-hover:scale-110 duration-300 object-cover"/>
                <div className="flex flex-col gap-2 p-4">
                  <span className="">{story.category}</span>
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                  <div className="group-hover:translate-x-4 duration-300">
                    <Link to={`/news-detail/${story.id}`} className='bg-red-500 text-white rounded-md hover:bg-red-600 p-1.5'>Read More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="bg-red-500 text-white flex flex-col justify-between md:w-96 p-5">
            <div className="">
              <div className='flex flex-col w-24'>
                <span className="md:text-2xl trend font-semibold text-gray-800">Trending</span>
                <div className='w-22 mx-auto h-0.5 bg-yellow-400 rounded-full'></div>
            </div>
            <ul className="flex flex-col gap-4 mt-5">
              {headlines.map((headline, idx) => (
                <li key={idx} className={idx === headlineIdx ? 'active' : ''}>
                  <span className="libertinus-serif-bold">{headline.category}: </span>
                  <Link to={`/news-list`} className='underline'>{headline.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for daily updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>

      {/* Call to Action */}
      <section className="mt-10">
        <h2>Never Miss an Update</h2>
        <p>Get the latest news delivered straight to your inbox</p>
        <Link to="/news-list" className="cta-button">Explore All News</Link>
      </section>
    </div>
  );
}

export default Home;
