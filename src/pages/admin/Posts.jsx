import React, { useEffect, useState } from 'react';
import { PostsAPI, CategoriesAPI, TagsAPI } from '../../lib/api';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTrending, setIsTrending] = useState(undefined); // undefined: all, true: trending only, false: non-trending
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await PostsAPI.list({
        isTrending,
        sortBy,
        order,
      });
      setPosts(data);
    } catch (e) {
      console.log(e);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrending, sortBy, order]);

  if (loading) return <div className="text-sm text-gray-600">Loading posts...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-xs text-gray-500">Manage and edit all posts</p>
        </div>
        <Link to="/admin/posts/create" className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 text-center whitespace-nowrap">Create Post</Link>
      </div>

      <div className="bg-white border rounded-lg p-3 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 min-w-[200px] flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">Trending</label>
            <select className="border rounded px-2 py-1.5 text-sm w-full" value={String(isTrending)} onChange={(e)=>{
              const v = e.target.value;
              setIsTrending(v === 'undefined' ? undefined : v === 'true');
            }}>
              <option value="undefined">All</option>
              <option value="true">Trending only</option>
              <option value="false">Non-trending</option>
            </select>
          </div>
          <div className="flex flex-1 min-w-[200px] flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">Sort by</label>
            <select className="border rounded px-2 py-1.5 text-sm w-full" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="createdAt">Created</option>
              <option value="trendingScore">Trending Score</option>
              <option value="viewCount">Views</option>
              <option value="shareCount">Shares</option>
              <option value="publishedAt">Published At</option>
            </select>
          </div>
          <div className="flex flex-1 min-w-[150px] flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">Order</label>
            <select className="border rounded px-2 py-1.5 text-sm w-full" value={order} onChange={(e)=>setOrder(e.target.value)}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
          <button onClick={load} className="text-sm border px-3 py-1.5 rounded-md hover:bg-gray-50 w-full sm:w-auto">Refresh</button>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Author</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Published</th>
                <th className="p-2 text-left">Trending</th>
                <th className="p-2 text-left">Score</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-2 font-medium text-gray-900">{p.title}</td>
                  <td className="p-2">{p.author?.name || p.author?.email}</td>
                  <td className="p-2">{p.category?.name || '-'}</td>
                  <td className={`p-2`}><span className={`px-2 py-0.5 rounded-full text-xs ${p.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{p.published ? 'Yes' : 'No'}</span></td>
                  <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs ${p.isTrending ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{p.isTrending ? 'Yes' : 'No'}</span></td>
                  <td className="p-2">{p.trendingScore ?? 0}</td>
                  <td className="p-2 whitespace-nowrap">{new Date(p.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Link className="text-blue-600 hover:underline" to={`/admin/posts/${p.id}/edit`}>Edit</Link>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => { setToDelete(p); setConfirmOpen(true); }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Post"
        message={toDelete ? `Are you sure you want to delete the post "${toDelete.title}"? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        confirming={confirming}
        onClose={() => { if (!confirming) { setConfirmOpen(false); setToDelete(null); } }}
        onConfirm={async () => {
          if (!toDelete) return;
          setConfirming(true);
          try {
            await PostsAPI.remove(toDelete.id);
            setConfirmOpen(false);
            setToDelete(null);
            await load();
          } catch (e) {
            console.error(e);
            alert('Failed to delete post');
          } finally {
            setConfirming(false);
          }
        }}
      />
    </div>
  );
}
