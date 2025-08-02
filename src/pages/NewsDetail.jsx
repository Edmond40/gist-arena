import React from 'react';
import { useParams, Link } from 'react-router-dom';
import WAR from '../assets/images/war.jpg'
import { ChevronUp } from 'lucide-react';

// Dummy data for now
const news = [
  {
    id: 1,
    title: 'Russia-Ukraine War: Latest Developments',
    content: `The conflict between Russia and Ukraine continues to escalate, with fighting reported in several regions. Recent days have seen renewed offensives, drone strikes, and shifting frontlines. Diplomatic efforts are ongoing, but both sides remain entrenched. International observers report significant humanitarian concerns, with thousands displaced and infrastructure damaged.`,
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80',
    category: 'World',
    date: 'July 28, 2025'
  },
  {
    id: 2,
    title: 'NATO Responds to Eastern Europe Tensions',
    content: `NATO leaders convened in Brussels to address the growing security concerns in Eastern Europe. The summit resulted in a commitment to increase military aid and support to member states bordering the conflict zone. Joint exercises and intelligence sharing have been intensified, while diplomatic channels remain open for further negotiations.`,
    image: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=400&q=80',
    category: 'Politics',
    date: 'July 27, 2025'
  },
  {
    id: 3,
    title: 'Global Economic Impact of War',
    content: `The ongoing Russia-Ukraine war has sent shockwaves through the global economy. Energy prices have surged as supply lines are disrupted, and food shortages are reported in several regions due to blocked exports. Economists warn of prolonged inflation and urge governments to seek alternative trade routes and stabilize markets.`,
    image: WAR,
    category: 'Economy',
    date: 'July 26, 2025'
  },
  {
    id: 4,
    title: 'Humanitarian Crisis in Ukraine',
    content: `Millions of Ukrainians have been forced to flee their homes as fighting intensifies. Aid organizations are working around the clock to provide food, shelter, and medical care to those affected. Bordering countries have opened their doors to refugees, but resources are stretched thin and more international assistance is needed.`,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
    category: 'World',
    date: 'July 25, 2025'
  },
  {
    id: 5,
    title: 'UN Calls for Ceasefire',
    content: `The United Nations has issued a strong statement urging all parties involved in the conflict to agree to an immediate ceasefire. UN officials are working with both Russian and Ukrainian diplomats to broker peace talks, though challenges remain. The international community continues to call for restraint and humanitarian access.`,
    image: 'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=400&q=80',
    category: 'Politics',
    date: 'July 24, 2025'
  }
];

function NewsDetail() {
  const { id } = useParams();
  const article = news.find(item => item.id === Number(id));

  if (!article) return <div className="container"><h2>Article Not Found</h2></div>;

  return (
    <div className="container" id='NewsDetails'>
      <Link to="/news-list" style={{ color: '#1976d2', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to News</Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={article.image} alt={article.title} style={{ width: '100%', maxWidth: 520, borderRadius: 16, marginBottom: 16 }} />
        <div style={{ color: '#888', fontSize: '1rem', marginBottom: 8 }}>
          <span style={{ marginRight: 16 }}>{article.category}</span>
          <span>{article.date}</span>
        </div>
        <h2 style={{ textAlign: 'center' }}>{article.title}</h2>
      </div>
      <p style={{ fontSize: '1.13rem', color: '#444', lineHeight: 1.7 }}>{article.content}</p>

      <a href="#NewsDetails" className="fixed text-white bottom-5 right-5 bg-blue-400 rounded-full hover:rotate-180 duration-300">
        <ChevronUp size={30} className='text-white'/>
      </a>
    </div>
  );
}

export default NewsDetail;
