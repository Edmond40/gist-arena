import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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




// Import all components
import {ReadingProgressBar,SocialShareButtons,FontSizeControls,ArticleHeader,ArticleActions,AuthorInfo,CommentSection,EmailModal,AdZones,RelatedArticles,ArticleContent,BackToTop} from '../NewsDetailsCom';

// Dummy data for now
const news = [
    {
    id: 1,
    title: 'Russia-Ukraine War: Latest Developments',
    summary: 'Russia-Ukraine war_ List of key events, day 328 _ Russia-Ukraine war News',
    image: Trend1, // war, soldiers
    category: 'World',
    date: 'August 05, 2025',
    time: '3:16 PM',
    day: 'Monday',
    author:'By Daleli Doe',
    minutesRead: '3 min read'
  },
  {
    id: 2,
    title: 'Nana Kwame Bediako says Ghana cannot digitalise without industrialising first',
    summary: 'The Chief of the Bediako Royal Family, Nana Kwame Bediako, has said Ghana cannot digitalise without industrialising first.',
    image: Trend2, // NATO, flags
    category: 'Politics',
    date: 'August 1, 2025',
    time: '12:00 PM',
    day: 'Monday',
    author:'By Aboki Frimps',
    minutesRead: '5 min read'
  },
  {
    id: 3,
    title: 'Ghana\'s digitalisation drive: A look at the challenges and opportunities',
    summary: 'Ghana\'s digitalisation drive: A look at the challenges and opportunities',
    image: Trend3, // economy, charts
    category: 'Economy',
    date: 'July 31, 2025',
    time: '8:20 PM',
    day: 'Friday',
    author:'By Akiti Sandy',
    minutesRead: '9 min read'
  },
  {
    id: 4,
    title: 'You have the support of parliament; aim for the trophy at the World Cup – Alban Bagbin charges…',
    summary: 'The Speaker of Parliament, Alban Bagbin, has charged the Black Stars to aim for the trophy at the World Cup in Qatar.',
    image: Trend4, // refugees, aid
    category: 'World',
    date: 'June 24, 2025',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 5,
    title: 'UN Calls for Ceasefire',
    summary: 'UK on \'high alert\' as Russia \'sends ballistic missiles\' to Ukraine',
    image: Trend5, // UN, peace
    category: 'Politics',
    date: 'July 12, 2025',
    time: '9:50 AM',
    day: 'Monday',
    author:'By Daily Bread',
    minutesRead: '5 min read'
  },
  {
    id: 6,
    title: "Ghana's Parliament Debates New Electoral Reforms",
    summary: "Lawmakers in Ghana are considering sweeping changes to the country's electoral laws ahead of the 2024 elections.",
    image: Paliament,
    category: 'Politics',
    date: '2 hours ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 7,
    title: "Ghana's Cocoa Exports Hit Record High",
    summary: "Ghana's cocoa industry sees a surge in exports, boosting the nation's economy.",
    image: Cocoa,
    category: 'Economy',
    date: '1 hour ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 8,
    title: "Startups in Accra Attract International Investors",
    summary: "Tech startups in Ghana's capital are drawing attention from global venture capitalists.",
    image: Startup,
    category: 'Business',
    date: '30 minutes ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 9,
    title: "Ghana Elected to UN Security Council",
    summary: "Ghana secures a seat on the United Nations Security Council, representing Africa.",
    image: GhanaUN,
    category: 'World',
    date: 'Just now',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 10,
    title: "Ghana Launches Nationwide Malaria Vaccination",
    summary: "The government of Ghana has started a nationwide campaign to vaccinate children against malaria.",
    image: Vacen,
    category: 'Health',
    date: '5 minutes ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 11,
    title: "Ghana Launches First Satellite into Space",
    summary: "Ghana has successfully launched its first satellite, marking a major milestone in the nation's technological advancement.",
    image: Satellite,
    category: 'Technology',
    date: '10 minutes ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 12,
    title: "Ghanaian Scientists Develop New Crop Disease-Resistant Maize",
    summary: "A team of Ghanaian scientists has developed a new strain of maize resistant to common crop diseases.",
    image: YellowCorn,
    category: 'Science',
    date: '20 minutes ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 13,
    title: "Ghanaian Film Wins Award at Cannes",
    summary: "A Ghanaian film has taken home the top prize at the Cannes Film Festival, shining a spotlight on the country's creative industry.",
    image: CannesNight,
    category: 'Entertainment',
    date: '1 hour ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 14,
    title: "Black Stars Qualify for AFCON Finals",
    summary: "Ghana's national football team, the Black Stars, have qualified for the Africa Cup of Nations finals.",
    image: BlackStars,
    category: 'Sports',
    date: 'Just now',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 15,
    title: "Ghana Opens New State-of-the-Art Hospital in Accra",
    summary: "A new state-of-the-art hospital has been inaugurated in Accra to improve healthcare delivery.",
    image: Hospital,
    category: 'Health',
    date: '5 minutes ago',
    time: '11:00 AM',
    day: 'Tuesday',
    author:'By Eddy Kay',
    minutesRead: '15 min read'
  },
  {
    id: 16,
    title: "BoG Cuts Policy Rate to Spur Growth",
    summary: "The Bank of Ghana has announced a policy rate cut aimed at stimulating lending and growth.",
    image: BOG,
    category: 'Economy',
    date: '2 hours ago',
    time: '12:10 PM',
    day: 'Tuesday',
    author:'By Ama K.',
    minutesRead: '4 min read'
  },
  {
    id: 17,
    title: "Accra FinTech Summit Attracts 5,000 Attendees",
    summary: "Founders and investors converged in Accra to discuss the future of digital payments in Africa.",
    image: AfricaSubmit,
    category: 'Business',
    date: '1 hour ago',
    time: '1:00 PM',
    day: 'Tuesday',
    author:'By Kofi A.',
    minutesRead: '6 min read'
  },
  {
    id: 18,
    title: "Ghana Signs New Bilateral Trade Deal with EU",
    summary: "The agreement is expected to boost exports and create new opportunities for SMEs.",
    image: GhanaUK,
    category: 'World',
    date: 'Just now',
    time: '1:15 PM',
    day: 'Tuesday',
    author:'By Efua D.',
    minutesRead: '3 min read'
  },
  {
    id: 19,
    title: "NHIS Rolls Out Digital Membership Cards Nationwide",
    summary: "Ghana's National Health Insurance Scheme has launched digital cards to streamline access to care.",
    image: Insurance,
    category: 'Health',
    date: '25 minutes ago',
    time: '12:50 PM',
    day: 'Tuesday',
    author:'By Nana A.',
    minutesRead: '5 min read'
  },
  {
    id: 20,
    title: "Kumasi Startup Unveils AI Tool for Smart Farming",
    summary: "An AI-powered platform promises to boost yields for smallholder farmers across Ghana.",
    image: AItool,
    category: 'Technology',
    date: '40 minutes ago',
    time: '12:35 PM',
    day: 'Tuesday',
    author:'By Yaw B.',
    minutesRead: '7 min read'
  },
  {
    id: 21,
    title: "Afrochella Returns to Accra with Global Stars",
    summary: "The popular music and culture festival announces its biggest lineup yet.",
    image: Afrocella,
    category: 'Entertainment',
    date: 'Today',
    time: '10:00 AM',
    day: 'Tuesday',
    author:'By Akosua M.',
    minutesRead: '4 min read'
  },
  {
    id: 22,
    title: "Asamoah Gyan Launches Youth Football Academy",
    summary: "The Black Stars legend opens a new academy to nurture young talent.",
    image: Asamoah,
    category: 'Sports',
    date: 'Today',
    time: '9:40 AM',
    day: 'Tuesday',
    author:'By K. Boateng',
    minutesRead: '3 min read'
  },
  {
    id: 23,
    title: "UG Researchers Map Coastal Erosion Hotspots",
    summary: "New scientific study highlights vulnerable communities along Ghana's coast.",
    image: Research,
    category: 'Science',
    date: '3 hours ago',
    time: '10:20 AM',
    day: 'Tuesday',
    author:'By E. Quartey',
    minutesRead: '8 min read'
  },
  {
    id: 24,
    title: "EC Unveils Biometric Voter Registration Upgrade",
    summary: "The Electoral Commission introduces new features to improve voter verification.",
    image: Biometric,
    category: 'Politics',
    date: '2 hours ago',
    time: '11:15 AM',
    day: 'Tuesday',
    author:'By J. Mensah',
    minutesRead: '5 min read'
  },
  {
    id: 25,
    title: "Tema Port Expansion Boosts Cargo Capacity",
    summary: "Upgrades at Tema Port are set to reduce turnaround time for shipments.",
    image: TemaHabour,
    category: 'Business',
    date: '1 hour ago',
    time: '12:05 PM',
    day: 'Tuesday',
    author:'By L. Tetteh',
    minutesRead: '6 min read'
  },
];

function generateDescription(article) {
  const base = article.summary || '';
  const category = (article.category || '').toLowerCase();
  const title = article.title || 'This story';
  switch (category) {
    case 'politics':
      return `${base} The development underscores the policy direction and governance priorities shaping national discourse in Ghana.`;
    case 'economy':
      return `${base} Analysts say the trend reflects broader macroeconomic conditions and potential implications for jobs and growth.`;
    case 'business':
      return `${base} Industry stakeholders expect new partnerships, funding opportunities, and market expansion in the coming months.`;
    case 'world':
      return `${base} Observers note Ghana's evolving role on the international stage and the impact on regional cooperation.`;
    case 'health':
      return `${base} Health officials emphasize access, equity, and long‑term outcomes for communities across the country.`;
    case 'technology':
      return `${base} Innovators highlight the importance of digital infrastructure, talent development, and regulatory support.`;
    case 'science':
      return `${base} Researchers point to evidence‑based approaches and the need for sustained investment in local R&D.`;
    case 'entertainment':
      return `${base} Creatives and fans alike celebrate the milestone as a boost to Ghana's cultural influence.`;
    case 'sports':
      return `${base} Coaches and players credit preparation and teamwork, with eyes set on the next challenge.`;
    default:
      return `${title}. ${base}`.trim();
  }
}

function NewsDetail() {
  const { id } = useParams();
  const article = news.find(item => item.id === Number(id));

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [relatedFilter, setRelatedFilter] = useState('all');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 50);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({ to: '', from: '', message: '' });
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 5000) + 1000);
  
  if (!article) return <div className=""><h2>Article Not Found</h2></div>;

  const description = article.description || generateDescription(article);
  

  
  // Reading progress effect
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Font size handlers
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };
  
  const resetFontSize = () => {
    setFontSize(16);
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>${article.title} - Gist Arena</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            .summary { font-style: italic; color: #444; margin-bottom: 30px; }
            .content { font-size: 16px; }
            .author { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${article.title}</div>
            <div class="meta">
              By ${article.author} | ${article.date} | ${article.category}
            </div>
            <div class="summary">${article.summary}</div>
          </div>
          <div class="content">
            ${article.summary}<br><br>
            ${description}<br><br>
            [Full article content would be included here]
          </div>
          <div class="author">
            <strong>Author:</strong> ${article.author}<br>
            <strong>Source:</strong> Gist Arena<br>
            <strong>Published:</strong> ${article.date}
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  
  // Email to friend functionality
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const subject = `Check out this article: ${article.title}`;
    const body = `Hi,\n\nI thought you might be interested in this article:\n\n${article.title}\n\n${article.summary}\n\nRead more at: ${window.location.href}\n\nBest regards,\n${emailData.from}`;
    
    window.open(`mailto:${emailData.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowEmailModal(false);
    setEmailData({ to: '', from: '', message: '' });
  };

  return (
    <div className={`flex md:flex-row gap-4 flex-col justify-between ${isDarkMode ? 'dark' : ''}`} id='NewsDetails'>
      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={readingProgress} />

      <div className='w-full'>
        {/* Social Share Buttons */}
        <SocialShareButtons 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          article={article}
          copied={copied}
          setCopied={setCopied}
        />

        {/* Font Size Controls */}
        <FontSizeControls 
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          resetFontSize={resetFontSize}
        />

        <div className={`flex flex-col gap-4`} data-aos="fade-up">
          {/* Article Header */}
          <ArticleHeader 
            article={article}
            isDarkMode={isDarkMode}
            description={description}
          />
          
          {/* Article Actions */}
          <ArticleActions 
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
            handlePrint={handlePrint}
            setShowEmailModal={setShowEmailModal}
            viewCount={viewCount}
            article={article}
          />
          
          {/* Article Content */}
          <ArticleContent 
            article={article}
            fontSize={fontSize}
          />
          
          {/* Ad Zones */}
          <AdZones />
          
          {/* Author Information */}
          <AuthorInfo article={article} />
          
          {/* Comment Section */}
          <CommentSection />
        </div>

        {/* Back to Top */}
        <BackToTop />
      </div>
      
      {/* Related Articles */}
      <RelatedArticles 
        news={news}
        article={article}
        relatedFilter={relatedFilter}
        setRelatedFilter={setRelatedFilter}
      />
      
      {/* Email Modal */}
      <EmailModal 
        showEmailModal={showEmailModal}
        setShowEmailModal={setShowEmailModal}
        emailData={emailData}
        setEmailData={setEmailData}
        handleEmailSubmit={handleEmailSubmit}
        article={article}
      />
    </div>
  );
}

export default NewsDetail;
