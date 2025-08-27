import { BellRing, Menu, Rss, X, Youtube, MessageSquareText } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';



function MobileNavBar(){

    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const [notifCount, setNotifCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [toast, setToast] = useState(null); // { text }
    

    // Subscribe to public SSE and update counts live (same behavior as desktop NavBarr)
    useEffect(() => {
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



    return(
        <>
        <div className="md:hidden bg-slate-800 text-white fixed top-0 w-full z-50">
            <div className="flex justify-between items-center p-4 bg-maroon text-white">
                <Link to="/" className='flex items-center '>
                    <p className='text-xl font-bold text-gray-100'>Gist <span className='arena text-2xl'>Arena</span></p>
                    <Rss size={25} className='text-yellow-500'/>
                </Link>

                <div className="flex items-center gap-2 p-2">
                    <div className='relative'>
                        <MessageSquareText size={22} className='hover:text-blue-400 hover:scale-110 duration-300 cursor-pointer'/>
                        {commentCount > 0 && (
                            <span className='absolute -top-1 -right-2 bg-blue-600 text-white rounded-full text-[10px] leading-none px-1.5 py-0.5'>
                                {commentCount}
                            </span>
                        )}
                    </div>
                    <div className='relative'>
                        <BellRing size={22} className='hover:text-yellow-400 hover:scale-110 duration-300 cursor-pointer'/>
                        {notifCount > 0 && (
                            <span className='absolute -top-1 -right-2 bg-yellow-500 text-white rounded-full text-[10px] leading-none px-1.5 py-0.5'>
                                {notifCount}
                            </span>
                        )}
                    </div>
                    <Link to="/">
                        <Youtube size={25} className='hover:text-red-500 hover:scale-110 duration-300 cursor-pointer'/>
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className=" text-white">
                        {
                            isOpen ? <X size={24} className="cursor-pointer"/> : <Menu size={24} className="cursor-pointer"/>
                        }
                    </button>
                </div>
                {
                    isOpen && (
                        <div className="fixed inset-0 backdrop-blur-xl z-50 pt-16 text-white">
                            <button onClick={()=> setIsOpen(false)} className="absolute top-4 right-4 p-2 text-white">
                                <X size={24} className="cursor-pointer"/>
                            </button>


                            {/* links */}
                            <div className="text-lg font-semibold flex flex-col gap-4 items-center text-white">
                                <Link to="/" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>Home</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <Link to="/news-list" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>News</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <Link to="/about" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>About</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <Link to="/contact" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>Contact</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <div className="h-px w-40 bg-white/30 my-2" />
                                {user ? (
                                  <>
                                    <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="text-sm px-3 py-1 rounded-full border border-white/30 hover:bg-white/10">Profile</Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="text-sm px-3 py-1 rounded-full border border-white/30 hover:bg-white/10">Logout</button>
                                  </>
                                ) : (
                                  <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm px-3 py-1 rounded-full border border-white/30 hover:bg-white/10">Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="text-sm px-3 py-1 rounded-full border border-white/30 hover:bg-white/10">Sign up</Link>
                                  </>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
        {toast && (
            <div className="fixed bottom-4 right-4 z-[1000] bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg">
                {toast.text}
            </div>
        )}
        </>
    )
}


export default MobileNavBar;