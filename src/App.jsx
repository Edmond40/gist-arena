import './index.css'
import React, { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load your page components
const Home = lazy(() => import('./pages/Home'));
const NewsList = lazy(() => import('./pages/NewsList'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const MainLayout = lazy(() => import('./NewComponents/MainLayout'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center gap-3 min-h-screen">
    <p className='arena text-xl font-semibold'>Please wait...</p>
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      delay: 200,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='news-list' element={<NewsList />} />
            <Route path='news-detail/:id' element={<NewsDetail />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App