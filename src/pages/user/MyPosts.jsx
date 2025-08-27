import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { PostsAPI } from '../../lib/api';

export default function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await PostsAPI.list();
      setPosts(data.filter(p => p.author?.id === user?.id));
      setLoading(false);
    })();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      {posts.length === 0 && <div>You haven't created any posts yet.</div>}
      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">{new Date(p.createdAt).toLocaleString()}</div>
            <div className="mt-2 text-sm">{p.content.slice(0, 160)}...</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
