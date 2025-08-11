import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Clock, Search } from 'lucide-react'
import Trend1 from '../assets/images/rr1.jpg'
import Trend2 from '../assets/images/rr2.jpg'
import Trend3 from '../assets/images/rr4.jpg'
import Trend4 from '../assets/images/rr3.jpg'
import Trend5 from '../assets/images/rr5.jpg'
import Paliament from '../assets/images/ghanapaliament.jpg'
import Cocoa from '../assets/images/cocoa.jpg'
import Startup from '../assets/images/startups.jpg'
import GhanaUN from '../assets/images/ghanaun.jpg'
import Vacen from '../assets/images/vacen.jpg'
import Satellite from '../assets/images/sateliite.webp'
import YellowCorn from '../assets/images/yellowcorn.jpg'
import CannesNight from '../assets/images/cannesnight.jpg'
import BlackStars from '../assets/images/blackstars.jpg'
import Hospital from '../assets/images/hospital.jpg'
import BOG from '../assets/images/BoGslashes.webp'
import AfricaSubmit from '../assets/images/africasubmit.jpg'
import GhanaUK from '../assets/images/GhanaUKtradedeal.jpeg'
import Insurance from '../assets/images/insurance.jpeg'
import AItool from '../assets/images/aitool.webp'
import Afrocella from '../assets/images/afrochilla.jpg'
import Asamoah from '../assets/images/asamoahgyan.webp'
import Research from '../assets/images/research.png'
import Biometric from '../assets/images/biometric.jpg'
import TemaHabour from '../assets/images/temahabour.jpg'

import BG1 from '../assets/images/bb4.jpg'
import  HomeCarousel  from '../NewComponents/HomeCarousel';


const headlines = [
  { text: "Breaking News: Russia-Ukraine War Escalates!", category: "World" },
  { text: "NATO Holds Emergency Summit Today", category: "Politics" },
  { text: "UN Calls for Immediate Ceasefire", category: "World" },
  { text: "Global Markets React to Crisis", category: "Business" },
  { text: "Millions Displaced: Humanitarian Aid Needed", category: "Humanitarian" }
];

export const featuredStories = [
  {
    id: 1,
    title: 'Russia-Ukraine War: Latest Developments',
    summary: 'Russia-Ukraine war_ List of key events, day 328 _ Russia-Ukraine war News',
    image: Trend1, // war, soldiers
    category: 'World',
    date: '9 hours ago'
  },
  {
    id: 2,
    title: 'Nana Kwame Bediako says Ghana cannot digitalise without industrialising first',
    summary: 'The Chief of the Bediako Royal Family, Nana Kwame Bediako, has said Ghana cannot digitalise without industrialising first.',
    image: Trend2, // NATO, flags
    category: 'Politics',
    date: '27 minutes ago'
  },
  {
    id: 3,
    title: 'Ghana’s digitalisation drive: A look at the challenges and opportunities',
    summary: 'Ghana’s digitalisation drive: A look at the challenges and opportunities',
    image: Trend3, // economy, charts
    category: 'Economy',
    date: '4 hours ago'
  },
  {
    id: 4,
    title: 'You have the support of parliament; aim for the trophy at the World Cup – Alban Bagbin charges…',
    summary: 'The Speaker of Parliament, Alban Bagbin, has charged the Black Stars to aim for the trophy at the World Cup in Qatar.',
    image: Trend4, // refugees, aid
    category: 'World',
    date: 'Just now'
  },
  {
    id: 5,
    title: 'UN Calls for Ceasefire',
    summary: 'UK on ‘high alert’ as Russia ‘sends ballistic missiles’ to Ukraine',
    image: Trend5, // UN, peace
    category: 'Politics',
    date: '7 hours ago'
  },
  {
    id: 6,
    title: "Ghana's Parliament Debates New Electoral Reforms",
    summary: "Lawmakers in Ghana are considering sweeping changes to the country's electoral laws ahead of the 2024 elections.",
    image: Paliament,
    category: 'Politics',
    date: '2 hours ago'
  },
  {
    id: 7,
    title: "Ghana's Cocoa Exports Hit Record High",
    summary: "Ghana's cocoa industry sees a surge in exports, boosting the nation's economy.",
    image: Cocoa,
    category: 'Economy',
    date: '1 hour ago'
  },
  {
    id: 8,
    title: "Startups in Accra Attract International Investors",
    summary: "Tech startups in Ghana's capital are drawing attention from global venture capitalists.",
    image: Startup,
    category: 'Business',
    date: '30 minutes ago'
  },
  {
    id: 9,
    title: "Ghana Elected to UN Security Council",
    summary: "Ghana secures a seat on the United Nations Security Council, representing Africa.",
    image: GhanaUN,
    category: 'World',
    date: 'Just now'
  },
  {
    id: 10,
    title: "Ghana Launches Nationwide Malaria Vaccination",
    summary: "The government of Ghana has started a nationwide campaign to vaccinate children against malaria.",
    image: Vacen,
    category: 'Health',
    date: '5 minutes ago'
  },
  {
    id: 11,
    title: "Ghana Launches First Satellite into Space",
    summary: "Ghana has successfully launched its first satellite, marking a major milestone in the nation's technological advancement.",
    image: Satellite,
    category: 'Technology',
    date: '10 minutes ago'
  },
  {
    id: 12,
    title: "Ghanaian Scientists Develop New Crop Disease-Resistant Maize",
    summary: "A team of Ghanaian scientists has developed a new strain of maize resistant to common crop diseases.",
    image: YellowCorn,
    category: 'Science',
    date: '20 minutes ago'
  },
  {
    id: 13,
    title: "Ghanaian Film Wins Award at Cannes",
    summary: "A Ghanaian film has taken home the top prize at the Cannes Film Festival, shining a spotlight on the country's creative industry.",
    image: CannesNight,
    category: 'Entertainment',
    date: '1 hour ago'
  },
  {
    id: 14,
    title: "Black Stars Qualify for AFCON Finals",
    summary: "Ghana's national football team, the Black Stars, have qualified for the Africa Cup of Nations finals.",
    image: BlackStars,
    category: 'Sports',
    date: 'Just now'
  },
  {
    id: 15,
    title: "Ghana Opens New State-of-the-Art Hospital in Accra",
    summary: "A new state-of-the-art hospital has been inaugurated in Accra to improve healthcare delivery.",
    image: Hospital,
    category: 'Health',
    date: '5 minutes ago'
  },
  {
    id: 16,
    title: "BoG Cuts Policy Rate to Spur Growth",
    summary: "The Bank of Ghana has announced a policy rate cut aimed at stimulating lending and growth.",
    image: BOG,
    category: 'Economy',
    date: '2 hours ago'
  },
  {
    id: 17,
    title: "Accra FinTech Summit Attracts 5,000 Attendees",
    summary: "Founders and investors converged in Accra to discuss the future of digital payments in Africa.",
    image: AfricaSubmit,
    category: 'Business',
    date: '1 hour ago'
  },
  {
    id: 18,
    title: "Ghana Signs New Bilateral Trade Deal with EU",
    summary: "The agreement is expected to boost exports and create new opportunities for SMEs.",
    image: GhanaUK,
    category: 'World',
    date: 'Just now'
  },
  {
    id: 19,
    title: "NHIS Rolls Out Digital Membership Cards Nationwide",
    summary: "Ghana's National Health Insurance Scheme has launched digital cards to streamline access to care.",
    image: Insurance,
    category: 'Health',
    date: '25 minutes ago'
  },
  {
    id: 20,
    title: "Kumasi Startup Unveils AI Tool for Smart Farming",
    summary: "An AI-powered platform promises to boost yields for smallholder farmers across Ghana.",
    image: AItool,
    category: 'Technology',
    date: '40 minutes ago'
  },
  {
    id: 21,
    title: "Afrochella Returns to Accra with Global Stars",
    summary: "The popular music and culture festival announces its biggest lineup yet.",
    image: Afrocella,
    category: 'Entertainment',
    date: 'Today'
  },
  {
    id: 22,
    title: "Asamoah Gyan Launches Youth Football Academy",
    summary: "The Black Stars legend opens a new academy to nurture young talent.",
    image: Asamoah,
    category: 'Sports',
    date: 'Today'
  },
  {
    id: 23,
    title: "UG Researchers Map Coastal Erosion Hotspots",
    summary: "New scientific study highlights vulnerable communities along Ghana's coast.",
    image: Research,
    category: 'Science',
    date: '3 hours ago'
  },
  {
    id: 24,
    title: "EC Unveils Biometric Voter Registration Upgrade",
    summary: "The Electoral Commission introduces new features to improve voter verification.",
    image: Biometric,
    category: 'Politics',
    date: '2 hours ago'
  },
  {
    id: 25,
    title: "Tema Port Expansion Boosts Cargo Capacity",
    summary: "Upgrades at Tema Port are set to reduce turnaround time for shipments.",
    image: TemaHabour,
    category: 'Business',
    date: '1 hour ago'
  },
];

const categories = ["World", "Politics", "Business", "Technology", "Science", "Health", "Entertainment", "Sports"];

function Home() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredStories = featuredStories.filter(story => {
    const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  function handleSubmit(e){
    e.preventDefault();
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIdx(idx => (idx + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
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
          <span className="text-lg font-semibold libertinus-serif-bold-italic">{headlines[headlineIdx].category}:</span>
          <span className="libertinus-serif-regular">{headlines[headlineIdx].text}</span>
        </div>
      </div>

      {/* Category Filters */}
      <section className="bg-yellow-400 text-gray-700 font-semibold rounded-sm p-2">
        <div className="md:flex justify-evenly bg-yellow-400" data-aos="zoom-in">
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
      <div className="flex md:flex-row flex-col  justify-between gap-5 mt-10">
        {/* Featured Stories */}
        <section className="flex md:flex-1 flex-col gap-3">
          <div className='flex items-center gap-2 w-82' data-aos="slide-up">
            <h2 className='trend font-bold text-gray-700 md:text-2xl'>Featured Stories</h2>
            <div className='w-28 h-1 bg-yellow-400'></div>
          </div>
          <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4 p-4 shadow-md" data-aos="fade-right">
            {filteredStories.map(story => (
              <div key={story.id} className="bg-white shadow-md overflow-hidden rounded-md rounded-lg cursor-pointer group" data-aos="fade-right">
                <img src={story.image} alt={story.title} className="h-52 w-full overflow-hidden group-hover:scale-110 duration-300 object-cover"/>
                <div className="flex flex-col gap-4 p-4">
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className='border border-gray-200 bg-gray-50 p-1'>{story.category}</span>
                    <div className='flex items-center gap-1'>
                    <Clock size={16}/>
                    <span>{story.date}</span>
                    </div>
                  </div>
                  <div className="group-hover:translate-x-4 duration-300">
                    <Link to={`/news-detail/${story.id}`} className='bg-red-500 text-white rounded-md hover:bg-red-600 p-1.5'>Read More →</Link>
                  </div>
                </div>
              </div>
            ))}
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
              {headlines.map((headline, idx) => (
                <li key={idx} className={idx === headlineIdx ? 'active' : ''}>
                  <span className="libertinus-serif-bold">{headline.category}: </span>
                  <Link to={`/news-list`} className='underline'>{headline.text}</Link>
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
