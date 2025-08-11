import React, { useState } from 'react';
import NewsCard from '../NewComponents/NewsCard';
import SearchBar from '../NewComponents/SearchBarr';
import CategoryFilter from '../NewComponents/CategoryFilterr';
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

import BG2 from '../assets/images/war.jpg'
import { ChevronUp } from 'lucide-react';
import NewsCarousel from '../NewComponents/NewsCarousel';

// Dummy data for now
export const news = [
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
    title: 'You have the support of parliament; aim for the trophy at the World Cup Alban Bagbin charges…',
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
      <NewsCarousel />

      <div className="flex cols-span-2 flex-col gap-5">
          <div className='flex-1 w-full flex  flex-col gap-2 p-4 text-gray-800'>
            <h2 className='libertinus-serif-bold-italic text-2xl' >Latest News....</h2>
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className='flex justify-center' data-aos="slide-up">
            <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
          </div>
          <div className='md:grid grid-cols-3 flex flex-col gap-4'>
            {filtered.length === 0 ? (
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
