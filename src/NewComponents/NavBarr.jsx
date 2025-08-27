import React from 'react';
import { Link } from 'react-router-dom';
import { BellRing, MessageSquareText, Rss, Youtube } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx';


function Navbar() {
  const { user, logout } = useAuth();
  const [notifCount, setNotifCount] = React.useState(0);
  const [commentCount, setCommentCount] = React.useState(0);
  const [toast, setToast] = React.useState(null); // { text }

  // Subscribe to public SSE and update counts live
  React.useEffect(() => {
    const es = new EventSource('/api/v1/public-events');
    es.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data || '{}');
        switch (msg.event) {
          case 'post_published':
            setNotifCount((n) => n + 1);
            if (msg.title) {
              setToast({ text: `New post: ${msg.title}` });
              setTimeout(() => setToast(null), 5000);
            }
            break;
          case 'like':
          case 'unlike':
          case 'bookmark':
          case 'unbookmark':
          case 'share':
            setNotifCount((n) => n + 1);
            break;
          case 'comment':
            setCommentCount((n) => n + 1);
            setNotifCount((n) => n + 1);
            break;
          default:
            break;
        }
      } catch {
        // ignore malformed
      }
    };
    es.onerror = () => { /* let browser auto-reconnect */ };
    return () => es.close();
  }, []);

  return (
    <nav className="fixed top-0  z-50 flex justify-between items-center p-5 shadow-md bg-white w-full">
        <Link to="/" className='flex items-center'>
          <p className='text-xl font-bold text-gray-700'>Gist <span className='arena text-2xl'>Arena</span></p>
          <Rss size={25} className='text-yellow-500'/>
        </Link>

        <div className="md:flex gap-3 text-lg font-semibold hidden">
            <Link to="/" className="navlink">
                <p>Home</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
            <Link to="/news-list" className="navlink">
                <p>News</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
            <Link to="/about" className="navlink">
                <p>About</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
            <Link to="/contact" className="navlink">
                <p>Contact</p>
                <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
            </Link>
        </div>

        <div className='flex items-center gap-4 font-semibold text-gray-700'>
          
        <div className='relative'>
          <MessageSquareText size={22} className='hover:text-blue-400 hover:scale-110 duration-300 cursor-pointer'/>
          {commentCount > 0 && (
            <span className='absolute -top-1 -right-2 bg-blue-600 text-white rounded-full text-[10px] leading-none px-1.5 py-0.5'>
              {commentCount}
            </span>
          )}    
        </div>
          
        <div className='relative'>
            <BellRing size={22} className='hover:text-yellow-500 hover:scale-110 duration-300 cursor-pointer'/>
            {notifCount > 0 && (
              <span className='absolute -top-1 -right-2 bg-yellow-500 text-white rounded-full text-[10px] leading-none px-1.5 py-0.5'>
                {notifCount}
              </span>
            )}
          </div>
          
          <Link to="/">
            <Youtube size={22} className='hover:text-red-500 hover:scale-110 duration-300 cursor-pointer'/>
          </Link>
          <div className="h-5 w-px bg-gray-300" />
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard/profile" className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50">
                Profile
              </Link>
              <button onClick={logout} className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50">Login</Link>
              <Link to="/register" className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50">Sign up</Link>
            </div>
          )}
        </div>
        {toast && (
          <div className="fixed bottom-4 right-4 z-[1000] bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg">
            {toast.text}
          </div>
        )}
    </nav>
  );
}

export default Navbar;
