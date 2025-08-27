import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CategoriesAPI, TagsAPI, PostsAPI, UploadsAPI } from '../../lib/api';

export default function PostEdit() {
  const nav = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [minutesRead, setMinutesRead] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [publishedAt, setPublishedAt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagIds, setTagIds] = useState([]);
  const [published, setPublished] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [trendingScore, setTrendingScore] = useState('');

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [cats, allTags, post] = await Promise.all([
          CategoriesAPI.list(),
          TagsAPI.list(),
          PostsAPI.get(id),
        ]);
        setCategories(cats);
        setTags(allTags);
        setTitle(post.title || '');
        setContent(post.content || '');
        setSummary(post.summary || '');
        setHeroImageUrl(post.heroImageUrl || '');
        setMinutesRead(post.minutesRead ?? '');
        setPublishedAt(post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0,16) : '');
        setCategoryId(post.categoryId ? String(post.categoryId) : '');
        setTagIds((post.tags || []).map(t => t.tagId));
        setPublished(!!post.published);
        setIsTrending(!!post.isTrending);
        setTrendingScore(post.trendingScore ?? '');
      } catch (err) {
        console.error(err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const toggleTag = (tid) => {
    setTagIds(prev => prev.includes(tid) ? prev.filter(t => t !== tid) : [...prev, tid]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await PostsAPI.update(id, {
        title,
        content,
        summary: summary || null,
        heroImageUrl: heroImageUrl || null,
        minutesRead: minutesRead !== '' ? Number(minutesRead) : null,
        publishedAt: published && publishedAt ? new Date(publishedAt) : null,
        categoryId: categoryId ? Number(categoryId) : null,
        tagIds,
        published,
        isTrending,
        trendingScore: trendingScore !== '' ? Number(trendingScore) : 0,
      });
      nav('/admin/posts');
    } catch (e) {
      setError(e?.message || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Edit Post</h2>
        <Link to="/admin/posts" className="text-sm text-blue-600">Back to Posts</Link>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input className="w-full border p-2" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Post title" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea className="w-full border p-2 h-48" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write your article here..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea className="w-full border p-2 h-24" value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Short summary shown on listings..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  setUploading(true);
                  const { url } = await UploadsAPI.upload(file);
                  setHeroImageUrl(url);
                } catch (err) {
                  setError(err?.message || 'Failed to upload image');
                } finally {
                  setUploading(false);
                }
              }}
            />
            {uploading && <div className="text-xs text-gray-500 mt-1">Uploading...</div>}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                className="text-sm text-blue-600 underline"
                onClick={async () => {
                  try {
                    setShowGallery(true);
                    setGalleryLoading(true);
                    const files = await UploadsAPI.list();
                    setGallery(files);
                  } catch (e) {
                    console.error(e);
                    setError('Failed to load gallery');
                  } finally {
                    setGalleryLoading(false);
                  }
                }}
              >
                Choose from gallery
              </button>
            </div>
            {heroImageUrl && (
              <div className="mt-2">
                <img src={heroImageUrl} alt="Preview" className="h-28 rounded border object-cover" />
                <div className="text-xs text-gray-600 truncate">{heroImageUrl}</div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estimated Minutes Read</label>
            <input type="number" min="0" className="w-full border p-2" value={minutesRead} onChange={(e)=>setMinutesRead(e.target.value)} placeholder="e.g. 5" />
          </div>
          <div className="flex items-center gap-2">
            <input id="isTrending" type="checkbox" checked={isTrending} onChange={(e)=>setIsTrending(e.target.checked)} />
            <label htmlFor="isTrending">Mark as Trending</label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trending Score</label>
            <input type="number" min="0" className="w-full border p-2" value={trendingScore} onChange={(e)=>setTrendingScore(e.target.value)} placeholder="e.g. 100" disabled={!isTrending} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select className="w-full border p-2" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => toggleTag(t.id)}
                className={`px-2 py-1 rounded border text-sm ${tagIds.includes(t.id) ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white'}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input id="published" type="checkbox" checked={published} onChange={(e)=>setPublished(e.target.checked)} />
          <label htmlFor="published">Publish</label>
        </div>
        {published && (
          <div>
            <label className="block text-sm font-medium mb-1">Publish Date/Time (optional)</label>
            <input type="datetime-local" className="w-full border p-2" value={publishedAt} onChange={(e)=>setPublishedAt(e.target.value)} />
          </div>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" disabled={saving} className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-[90vw] max-w-3xl max-h-[80vh] flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">Select an image</h3>
              <button className="text-gray-600" onClick={() => setShowGallery(false)}>✕</button>
            </div>
            <div className="p-3 overflow-auto">
              {galleryLoading ? (
                <div className="text-sm text-gray-600">Loading...</div>
              ) : gallery.length === 0 ? (
                <div className="text-sm text-gray-600">No uploads yet.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {gallery.map((f) => (
                    <button
                      type="button"
                      key={f.filename}
                      onClick={() => {
                        setHeroImageUrl(f.url);
                        setShowGallery(false);
                      }}
                      className="group border rounded overflow-hidden hover:ring-2 ring-yellow-500"
                    >
                      <img src={f.url} alt={f.filename} className="aspect-square object-cover w-full" />
                      <div className="p-1 text-[10px] truncate text-gray-600 group-hover:text-gray-800">{f.filename}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 border-t flex justify-end">
              <button className="px-3 py-1 border rounded" onClick={() => setShowGallery(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
