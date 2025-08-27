import React, { useEffect, useState } from 'react';
import { MetricsAPI, CommentsAPI } from '../../lib/api';
import { FileText, MessageSquare, Heart, Bookmark } from 'lucide-react';

export default function Overview() {
  const [metrics, setMetrics] = useState({ posts: 0, comments: 0, likes: 0, bookmarks: 0, total: 0, hours: 24 });
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [m, rc] = await Promise.all([
          MetricsAPI.recent(24),
          CommentsAPI.recentList(5),
        ]);
        if (!mounted) return;
        setMetrics(m);
        setRecentComments(rc || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const Card = ({ icon, label, value, color }) => (
    <div className="bg-white border rounded-lg p-4 flex items-center gap-3 min-w-0">
      <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h2 className="text-xl font-semibold">Admin Overview</h2>
        <p className="text-sm text-gray-500">Last {metrics.hours} hours</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={<FileText size={18} />} label="New Posts" value={metrics.posts} color="bg-blue-600" />
        <Card icon={<MessageSquare size={18} />} label="New Comments" value={metrics.comments} color="bg-emerald-600" />
        <Card icon={<Heart size={18} />} label="New Likes" value={metrics.likes} color="bg-rose-600" />
        <Card icon={<Bookmark size={18} />} label="New Bookmarks" value={metrics.bookmarks} color="bg-yellow-500" />
      </div>

      <div className="bg-white border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3">
          <h3 className="font-semibold">Latest comments</h3>
          <span className="text-xs text-gray-500">Total: {metrics.total}</span>
        </div>
        {loading && <div className="text-sm text-gray-500">Loading…</div>}
        {!loading && recentComments.length === 0 && (
          <div className="text-sm text-gray-500">No recent comments.</div>
        )}
        <ul className="divide-y">
          {recentComments.map((c) => (
            <li key={c.id} className="py-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-medium">{c.author?.name || 'User'}</div>
                <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-700 break-words line-clamp-3 sm:line-clamp-2">{c.content}</div>
              <div className="text-xs text-gray-500">Post #{c.postId} • Status: {c.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
