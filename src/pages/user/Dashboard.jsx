import React, { useEffect, useState } from 'react';
import { PostsAPI, LikesAPI } from '../../lib/api';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await PostsAPI.list();
      setPosts(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">{p.author?.name || p.author?.email} • {new Date(p.createdAt).toLocaleString()}</div>
            <div className="mt-2 text-sm">{p.content.slice(0, 160)}...</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
