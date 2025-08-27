import React from 'react';
import { Heart } from 'lucide-react';
import { CommentsAPI } from '../lib/api';
import { useAuth } from '../context/AuthContext.jsx';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [content, setContent] = React.useState('');
  const [replyFor, setReplyFor] = React.useState(null);
  const [replyContent, setReplyContent] = React.useState('');
  const [editingFor, setEditingFor] = React.useState(null);
  const [editContent, setEditContent] = React.useState('');
  const { user } = useAuth();
  const [guestName, setGuestName] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [asGuest, setAsGuest] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!postId) return;
      setLoading(true);
      setError('');
      try {
        const list = await CommentsAPI.list(postId);
        if (!cancelled) setComments(Array.isArray(list) ? list : []);
      } catch {
        setError('Failed to load comments.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [postId]);

  // Default to posting as guest when a user is logged in (prevents accidental admin/user attribution)
  React.useEffect(() => {
    if (user) {
      setAsGuest(true);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      const guest = (!user || asGuest) ? { guestName: guestName || undefined, guestEmail: guestEmail || undefined } : undefined;
      await CommentsAPI.add(postId, content.trim(), guest, { asGuest });
      setContent('');
      if (!user || asGuest) { setGuestName(''); setGuestEmail(''); }
      const list = await CommentsAPI.list(postId);
      setComments(Array.isArray(list) ? list : []);
    } catch {
      setError('Failed to post comment.');
    }
  };

  const handleReply = async (parentId) => {
    if (!replyContent.trim()) return;
    try {
      const guest = (!user || asGuest) ? { guestName: guestName || undefined, guestEmail: guestEmail || undefined } : undefined;
      await CommentsAPI.reply(postId, parentId, replyContent.trim(), guest, { asGuest });
      setReplyContent('');
      setReplyFor(null);
      const list = await CommentsAPI.list(postId);
      setComments(Array.isArray(list) ? list : []);
    } catch {
      setError('Failed to post reply.');
    }
  };

  const handleStartEdit = (c) => {
    setEditingFor(c.id);
    setEditContent(c.content);
  };

  const handleEdit = async (id) => {
    if (!editContent.trim()) return;
    try {
      await CommentsAPI.update(id, editContent.trim());
      setEditingFor(null);
      setEditContent('');
      const list = await CommentsAPI.list(postId);
      setComments(Array.isArray(list) ? list : []);
    } catch {
      setError('Failed to update comment.');
    }
  };

  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return '';
    }
  };

  // Build parent -> replies mapping
  const parents = comments.filter((c) => !c.parentId);
  const repliesByParent = comments.reduce((acc, c) => {
    if (c.parentId) {
      (acc[c.parentId] ||= []).push(c);
    }
    return acc;
  }, {});

  return (
    <div className="md:w-[80%] mx-auto mt-8">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Comments</h3>
        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">{comments.length}</span>
      </div>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      
      {/* Comment Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.name ? user.name.split(' ').map(n=>n[0]).join('') : 'U'}
          </div>
          <div className="flex-1">
            {(!user || asGuest) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={guestName}
                  onChange={(e)=>setGuestName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your email (optional)"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={guestEmail}
                  onChange={(e)=>setGuestEmail(e.target.value)}
                />
              </div>
            )}
            {user && (
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 select-none">
                <input type="checkbox" checked={asGuest} onChange={(e)=>setAsGuest(e.target.checked)} />
                Post as guest
              </label>
            )}
            <textarea 
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700 text-sm" type="button">😊</button>
                <button className="text-gray-500 hover:text-gray-700 text-sm" type="button">📷</button>
                <button className="text-gray-500 hover:text-gray-700 text-sm" type="button">🔗</button>
              </div>
              <button onClick={handleSubmit} className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4">
        {loading && <div>Loading comments...</div>}
        {!loading && comments.length === 0 && (
          <div className="text-gray-500">No comments yet. Be the first to comment.</div>
        )}
        {!loading && parents.map((c) => (
          <div className="bg-white border border-gray-200 rounded-lg p-4" key={c.id}>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {(c.author?.name || c.guestName || 'U').split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-800">{c.author?.name || c.guestName || 'Guest'}</h4>
                  <span className="text-gray-500 text-sm">{formatTime(c.createdAt)}</span>
                  {c.editedAt && <span className="text-gray-400 text-xs">(edited)</span>}
                </div>
                {editingFor === c.id ? (
                  <div className="mb-3">
                    <textarea
                      className="w-full p-2 border rounded"
                      rows="3"
                      value={editContent}
                      onChange={(e)=>setEditContent(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={()=>handleEdit(c.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                      <button onClick={()=>{setEditingFor(null); setEditContent('');}} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 mb-3">{c.content}</p>
                )}
                <div className="flex items-center gap-4 text-sm">
                  <button className="text-gray-500 hover:text-red-500 flex items-center gap-1" type="button">
                    <Heart size={14} />
                    <span>0</span>
                  </button>
                  <button className="text-gray-500 hover:text-blue-500" type="button" onClick={()=>{setReplyFor(replyFor===c.id?null:c.id); setReplyContent('');}}>Reply</button>
                  {user && (user.id === c.authorId) && (
                    <button className="text-gray-500 hover:text-gray-700" type="button" onClick={()=>handleStartEdit(c)}>Edit</button>
                  )}
                  <button className="text-gray-500 hover:text-gray-700" type="button">Share</button>
                </div>

                {replyFor === c.id && (
                  <div className="mt-3 pl-12">
                    <textarea
                      className="w-full p-2 border rounded"
                      rows="2"
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e)=>setReplyContent(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={()=>handleReply(c.id)} className="px-3 py-1 bg-yellow-400 text-gray-800 rounded">Post Reply</button>
                      <button onClick={()=>{setReplyFor(null); setReplyContent('');}} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {(repliesByParent[c.id] || []).map(rc => (
                  <div key={rc.id} className="mt-4 pl-8 border-l border-gray-200">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {(rc.author?.name || rc.guestName || 'U').split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-800 text-sm">{rc.author?.name || rc.guestName || 'Guest'}</h5>
                          <span className="text-gray-500 text-xs">{formatTime(rc.createdAt)}</span>
                          {rc.editedAt && <span className="text-gray-400 text-xs">(edited)</span>}
                        </div>
                        {editingFor === rc.id ? (
                          <div className="mb-2">
                            <textarea
                              className="w-full p-2 border rounded text-sm"
                              rows="2"
                              value={editContent}
                              onChange={(e)=>setEditContent(e.target.value)}
                            />
                            <div className="flex gap-2 mt-2">
                              <button onClick={()=>handleEdit(rc.id)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
                              <button onClick={()=>{setEditingFor(null); setEditContent('');}} className="px-3 py-1 bg-gray-200 rounded text-sm">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 mb-2 text-sm">{rc.content}</p>
                        )}
                        <div className="flex items-center gap-3 text-xs">
                          <button className="text-gray-500 hover:text-red-500 flex items-center gap-1" type="button">
                            <Heart size={12} />
                            <span>0</span>
                          </button>
                          {user && (user.id === rc.authorId) && (
                            <button className="text-gray-500 hover:text-gray-700" type="button" onClick={()=>handleStartEdit(rc)}>Edit</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
