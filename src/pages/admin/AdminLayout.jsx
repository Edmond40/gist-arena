import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { CommentsAPI, MetricsAPI } from '../../lib/api';
import { Bell, MessageSquare, LayoutDashboard, FileText, FolderTree, Tag, Users, MessageCircleMore, ArrowLeftCircle, Menu, X, Rss } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [counts, setCounts] = useState({ total: 0, recent: 0 });
  const [metrics, setMetrics] = useState({ posts: 0, comments: 0, likes: 0, bookmarks: 0, total: 0, hours: 24 });
  const [recentComments, setRecentComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notifRef = useRef(null);
  const commentsRef = useRef(null);
  const sidebarRef = useRef(null);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // shared loader for header data
  const loadHeaderData = useRef(async () => {
    try {
      const [totalRes, metricsRes, commentsList] = await Promise.all([
        CommentsAPI.count(),
        MetricsAPI.recent(24),
        CommentsAPI.recentList(8),
      ]);
      setCounts({ total: totalRes.count ?? 0, recent: metricsRes.total ?? 0 });
      setMetrics(metricsRes);
      setRecentComments(commentsList || []);
    } catch {
      // ignore
    }
  });

  useEffect(() => {
    let mounted = true;
    const run = async () => { if (mounted) await loadHeaderData.current(); };
    run();
    const id = setInterval(run, 60_000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  // Subscribe to SSE to refresh immediately on activity events
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // must be authenticated admin
    const es = new EventSource(`/api/v1/events?token=${encodeURIComponent(token)}`);
    let t = null;
    const scheduleRefresh = () => {
      if (t) return; // basic debounce
      t = setTimeout(async () => {
        t = null;
        await loadHeaderData.current();
      }, 350);
    };
    es.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data || '{}');
        if (['like','unlike','comment','bookmark','unbookmark','share'].includes(msg.event)) {
          scheduleRefresh();
        }
      } catch {
        // ignore
      }
    };
    es.onerror = () => {
      // let the browser auto-reconnect; nothing to do
    };
    return () => {
      if (t) clearTimeout(t);
      es.close();
    };
  }, []);

  // a11y: click-outside and Escape to close dropdowns
  useEffect(() => {
    if (!showNotif && !showComments) return;
    const handleClick = (e) => {
      const n = notifRef.current;
      const c = commentsRef.current;
      const target = e.target;
      const insideNotif = n && n.contains(target);
      const insideComments = c && c.contains(target);
      if (!insideNotif && !insideComments) {
        setShowNotif(false);
        setShowComments(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setShowNotif(false);
        setShowComments(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showNotif, showComments]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex flex-col items-center text-lg font-semibold">
          <div className='flex items-center'>
            <h1>Gist <span className='arena'>Arena </span></h1>
            <Rss size={25} className='text-yellow-500'/>
          </div>
          <p>Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={showComments}
            onClick={() => { setShowComments((v)=>!v); setShowNotif(false); }}
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100"
            title="Comments"
          >
            <MessageSquare size={18} />
            {counts.total > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {counts.total}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={showNotif}
            onClick={() => { setShowNotif((v)=>!v); setShowComments(false); }}
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100"
            title="Recent activity"
          >
            <Bell size={18} />
            {counts.recent > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {counts.recent}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panels */}
      {showNotif && (
        <div
          ref={notifRef}
          role="dialog"
          aria-label="Recent activity"
          className="md:hidden fixed right-3 top-[3.25rem] w-[min(92vw,22rem)] bg-white shadow-lg border rounded-md p-3 z-40"
        >
          <div className="font-semibold mb-2">Recent activity (last {metrics.hours}h)</div>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between"><span>New posts</span><span className="font-medium">{metrics.posts}</span></li>
            <li className="flex justify-between"><span>New comments</span><span className="font-medium">{metrics.comments}</span></li>
            <li className="flex justify-between"><span>New likes</span><span className="font-medium">{metrics.likes}</span></li>
            <li className="flex justify-between"><span>New bookmarks</span><span className="font-medium">{metrics.bookmarks}</span></li>
          </ul>
          <div className="mt-2 text-xs text-gray-500">Total: {metrics.total}</div>
          <div className="mt-3 flex gap-2 text-xs">
            <Link to="/admin/posts" className="px-2 py-1 border rounded hover:bg-gray-50">Posts</Link>
            <Link to="/admin/comments" className="px-2 py-1 border rounded hover:bg-gray-50">Comments</Link>
            <Link to="/admin/users" className="px-2 py-1 border rounded hover:bg-gray-50">Users</Link>
          </div>
        </div>
      )}

      {showComments && (
        <div
          ref={commentsRef}
          role="dialog"
          aria-label="Latest comments"
          className="md:hidden fixed right-3 top-[3.25rem] w-[min(92vw,28rem)] max-w-[92vw] bg-white shadow-lg border rounded-md p-3 z-40"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Latest comments</div>
            <Link to="/admin/comments" className="text-xs underline">Open moderation</Link>
          </div>
          <ul className="divide-y">
            {recentComments.length === 0 && (
              <li className="py-3 text-sm text-gray-500">No recent comments</li>
            )}
            {recentComments.map((c) => (
              <li key={c.id} className="py-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{c.author?.name || 'User'}</span>
                  <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <div className="line-clamp-3 text-gray-700">{c.content}</div>
                <Link to={`/admin/posts`} className="text-xs text-blue-600 hover:underline">on: {c.post?.title || 'Post #' + c.postId}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out md:relative md:flex-shrink-0`}
        style={{ top: '3.5rem' }}
      >
        <div className="p-4 border-b hidden md:block">
          <div className="flex items-center text-lg font-semibold">
            <div className='flex items-center'>
              <h1>Gist <span className='arena'>Arena </span></h1>
              <Rss size={25} className='text-yellow-500'/>
            </div>
            <p>Admin</p>
          </div>
          <div className="text-xs text-gray-500">Manage content and moderation</div>
        </div>
        <nav className="p-3 flex flex-col gap-1 text-sm">
          <NavLink to="/admin" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <LayoutDashboard size={16} /> Overview
          </NavLink>
          <NavLink to="/admin/posts" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <FileText size={16} /> Posts
          </NavLink>
          <NavLink to="/admin/categories" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <FolderTree size={16} /> Categories
          </NavLink>
          <NavLink to="/admin/tags" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <Tag size={16} /> Tags
          </NavLink>
          <NavLink to="/admin/users" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <Users size={16} /> Users
          </NavLink>
          <NavLink to="/admin/comments" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <MessageCircleMore size={16} /> Comments
            {counts.total > 0 && (
              <span className="ml-auto text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">{counts.total}</span>
            )}
          </NavLink>
          <NavLink to="/" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive?'bg-gray-100 font-medium text-gray-900':'text-gray-700'}`}>
            <ArrowLeftCircle size={16} /> Back to Site
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Desktop */}
        <header className="hidden md:flex sticky top-0 z-20 items-center justify-between bg-white/90 backdrop-blur border-b px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Welcome, <span className="font-medium text-gray-900">{user?.name || user?.email?.split('@')[0]}</span></div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-haspopup="dialog" aria-expanded={showComments} onClick={()=>{setShowComments((v)=>!v); setShowNotif(false);}} className="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100" title="Comments">
              <MessageSquare size={18} />
              {counts.total > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {counts.total}
                </span>
              )}
            </button>
            <button type="button" aria-haspopup="dialog" aria-expanded={showNotif} onClick={()=>{setShowNotif((v)=>!v); setShowComments(false);}} className="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100" title="Recent activity">
              <Bell size={18} />
              {counts.recent > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {counts.recent}
                </span>
              )}
            </button>
            <button className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-50" onClick={logout}>Logout</button>
          </div>

          {showNotif && (
            <div ref={notifRef} role="dialog" aria-label="Recent activity" className="absolute right-16 top-12 w-80 bg-white shadow-lg border rounded-md p-3 z-10">
              <div className="font-semibold mb-2">Recent activity (last {metrics.hours}h)</div>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between"><span>New posts</span><span className="font-medium">{metrics.posts}</span></li>
                <li className="flex justify-between"><span>New comments</span><span className="font-medium">{metrics.comments}</span></li>
                <li className="flex justify-between"><span>New likes</span><span className="font-medium">{metrics.likes}</span></li>
                <li className="flex justify-between"><span>New bookmarks</span><span className="font-medium">{metrics.bookmarks}</span></li>
              </ul>
              <div className="mt-2 text-xs text-gray-500">Total: {metrics.total}</div>
              <div className="mt-3 flex gap-2 text-xs">
                <Link to="/admin/posts" className="px-2 py-1 border rounded hover:bg-gray-50">Posts</Link>
                <Link to="/admin/comments" className="px-2 py-1 border rounded hover:bg-gray-50">Comments</Link>
                <Link to="/admin/users" className="px-2 py-1 border rounded hover:bg-gray-50">Users</Link>
              </div>
            </div>
          )}

          {showComments && (
            <div ref={commentsRef} role="dialog" aria-label="Latest comments" className="absolute right-32 top-12 w-[28rem] max-w-[90vw] bg-white shadow-lg border rounded-md p-3 z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Latest comments</div>
                <Link to="/admin/comments" className="text-xs underline">Open moderation</Link>
              </div>
              <ul className="divide-y">
                {recentComments.length === 0 && (
                  <li className="py-3 text-sm text-gray-500">No recent comments</li>
                )}
                {recentComments.map((c) => (
                  <li key={c.id} className="py-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">{c.author?.name || 'User'}</span>
                      <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="line-clamp-2 text-gray-700">{c.content}</div>
                    <Link to={`/admin/posts`} className="text-xs text-blue-600 hover:underline">on: {c.post?.title || 'Post #' + c.postId}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
