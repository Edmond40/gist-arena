import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesAPI, PostsAPI, TagsAPI } from '../../lib/api';

export default function CreatePost() {
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagIds, setTagIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [cats, tgs] = await Promise.all([CategoriesAPI.list(), TagsAPI.list()]);
        setCategories(cats);
        setTags(tgs);
      } catch {
        setError('Failed to load categories/tags');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleTag = (id) => {
    setTagIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await PostsAPI.create({ title, content, categoryId: categoryId ? Number(categoryId) : null, tagIds, published });
      nav('/dashboard/posts');
    } catch {
      setError('Failed to create post');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3 max-w-2xl">
        <input className="w-full border p-2" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea className="w-full border p-2 min-h-40" placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} />
        <div className="flex gap-3 items-center">
          <label className="text-sm">Category</label>
          <select className="border p-2" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
            <option value="">None</option>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
        </div>
        <div>
          <div className="text-sm mb-1">Tags</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <label key={t.id} className={`text-sm border rounded px-2 py-1 cursor-pointer ${tagIds.includes(t.id) ? 'bg-yellow-100 border-yellow-400' : ''}`}>
                <input type="checkbox" className="mr-1" checked={tagIds.includes(t.id)} onChange={() => toggleTag(t.id)} />
                {t.name}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={(e)=>setPublished(e.target.checked)} /> Publish now
        </label>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}
