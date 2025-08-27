import React, { useEffect, useRef, useState } from 'react';
import { PostsAPI, CommentsAPI } from '../../lib/api';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';

export default function Comments() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('PENDING');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(new Set());
  const [expanded, setExpanded] = useState(new Set()); // show replies per comment id
  // Modal state
  const [confirmState, setConfirmState] = useState({ open: false, title: '', message: '', confirmText: 'Confirm', cancelText: 'Cancel', requireReason: false });
  const confirmResolver = useRef(null);

  const openConfirm = ({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', requireReason = false }) => {
    return new Promise((resolve) => {
      setConfirmState({ open: true, title, message, confirmText, cancelText, requireReason });
      confirmResolver.current = resolve;
    });
  };
  const closeConfirm = () => {
    setConfirmState((s) => ({ ...s, open: false }));
    if (confirmResolver.current) {
      confirmResolver.current({ confirmed: false });
      confirmResolver.current = null;
    }
  };
  const handleConfirm = (reason) => {
    if (confirmResolver.current) {
      confirmResolver.current({ confirmed: true, reason: reason || '' });
      confirmResolver.current = null;
    }
    setConfirmState((s) => ({ ...s, open: false }));
  };

  useEffect(() => {
    (async () => setPosts(await PostsAPI.list()))();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selected) { setItems([]); setTotal(0); return; }
      setLoading(true); setError('');
      try {
        const res = await CommentsAPI.adminList({ postId: selected, status, q, page, pageSize });
        setItems(res.items || []);
        setTotal(res.total || 0);
        setChecked(new Set());
      } catch (err) {
        console.log(err);
        
        setError('Failed to load comments');
      } finally { setLoading(false); }
    })();
  }, [selected, status, q, page, pageSize]);

  const doStatus = async (id, next, reason) => {
    // Ask for reason on potentially destructive/status lowering actions using modal
    if (!reason && (next === 'HIDDEN' || next === 'SPAM')) {
      const { confirmed, reason: r } = await openConfirm({
        title: next === 'HIDDEN' ? 'Hide comment' : 'Mark as spam',
        message: 'Provide an optional moderation reason.',
        confirmText: next === 'HIDDEN' ? 'Hide' : 'Mark Spam',
        requireReason: true,
      });
      if (!confirmed) return;
      reason = r || '';
    }
    await CommentsAPI.adminUpdateStatus(id, next, reason);
    setItems((prev) => prev.map((c) => c.id === id ? { ...c, status: next } : c));
  };

  const doPin = async (id, isPinned) => {
    await CommentsAPI.adminSetPin(id, isPinned);
    setItems((prev) => prev.map((c) => c.id === id ? { ...c, isPinned } : c));
  };

  const remove = async (id) => {
    const { confirmed } = await openConfirm({ title: 'Delete comment', message: 'Delete this comment? This cannot be undone.', confirmText: 'Delete' });
    if (!confirmed) return;
    await CommentsAPI.remove(id);
    setItems((prev) => prev.filter((c) => c.id !== id));
  };

  // Bulk helpers
  const toggleOne = (id) => {
    setChecked((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };
  const toggleAllOnPage = () => {
    const pageIds = items.map((c) => c.id);
    setChecked((prev) => {
      const n = new Set(prev);
      const allSelected = pageIds.every((id) => n.has(id));
      if (allSelected) pageIds.forEach((id) => n.delete(id));
      else pageIds.forEach((id) => n.add(id));
      return n;
    });
  };
  const doBulk = async (action) => {
    const ids = Array.from(checked);
    if (!ids.length) return;
    let reason = '';
    if (action === 'DELETE' || action === 'SPAM' || action === 'HIDE') {
      const { confirmed, reason: r } = await openConfirm({
        title: `${action} ${ids.length} comment(s)`,
        message: `Are you sure you want to ${action} ${ids.length} selected comment(s)?`,
        confirmText: action,
        requireReason: action === 'SPAM' || action === 'HIDE',
      });
      if (!confirmed) return;
      reason = r || '';
    }
    await CommentsAPI.adminBulk(ids, action, reason);
    if (action === 'DELETE') {
      setItems((prev) => prev.filter((c) => !checked.has(c.id)));
      setChecked(new Set());
      return;
    }
    const mapToStatus = { APPROVE: 'APPROVED', HIDE: 'HIDDEN', SPAM: 'SPAM' };
    const nextStatus = mapToStatus[action];
    if (nextStatus) setItems((prev) => prev.map((c) => (checked.has(c.id) ? { ...c, status: nextStatus } : c)));
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const goPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Comments Moderation</h2>
        <p className="text-xs text-gray-500">Filter, review, and moderate comments</p>
      </div>
      <div className="bg-white border rounded-lg p-3">
        <div className="flex gap-2 items-center flex-wrap">
          <select className="border rounded px-3 py-2" value={selected || ''} onChange={(e)=>{ setSelected(Number(e.target.value)||null); setPage(1); }}>
            <option value="">Select a post</option>
            {posts.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <select className="border rounded px-3 py-2" value={status} onChange={(e)=>{ setStatus(e.target.value); setPage(1); }}>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="HIDDEN">Hidden</option>
            <option value="SPAM">Spam</option>
          </select>
          <input className="border rounded px-3 py-2 flex-1 min-w-[200px]" placeholder="Search text" value={q} onChange={(e)=>{ setQ(e.target.value); setPage(1); }} />
          <select className="border rounded px-3 py-2" value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setPage(1); }}>
            {[10,20,50].map(n=> <option key={n} value={n}>{n}/page</option>)}
          </select>
        </div>
      </div>

      {/* Bulk action bar */}
      {items.length > 0 && (
        <div className="bg-white border rounded-lg p-2">
          <div className="flex items-center gap-3 text-sm flex-wrap">
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={toggleAllOnPage} checked={items.every(c=>checked.has(c.id)) && items.length>0} />
              <span>Select all on page</span>
            </label>
            <span className="text-gray-500">Selected: {checked.size}</span>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 rounded border hover:bg-gray-50" onClick={()=>doBulk('APPROVE')}>Approve</button>
              <button className="px-2 py-1 rounded border hover:bg-gray-50" onClick={()=>doBulk('HIDE')}>Hide</button>
              <button className="px-2 py-1 rounded border hover:bg-gray-50" onClick={()=>doBulk('SPAM')}>Spam</button>
              <button className="px-2 py-1 rounded border text-red-600 hover:bg-red-50" onClick={()=>doBulk('DELETE')}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
      {loading && <div className="text-sm text-gray-500 mb-2">Loading…</div>}

      <div className="bg-white border rounded-lg">
      <ul className="divide-y">
        {items.map((c) => (
          <li key={c.id} className="p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <input type="checkbox" checked={checked.has(c.id)} onChange={()=>toggleOne(c.id)} />
                <div>
                  <div className="text-sm text-gray-600" title={c.guestEmail || ''}>
                    {c.author?.name || c.guestName || 'Guest'} • {new Date(c.createdAt).toLocaleString()} •
                    <span className={`ml-1 inline-block px-2 py-0.5 text-[11px] rounded-full ${c.status==='APPROVED'?'bg-emerald-100 text-emerald-700':c.status==='HIDDEN'?'bg-gray-100 text-gray-700':c.status==='SPAM'?'bg-rose-100 text-rose-700':'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
                    {c.isPinned ? <span className="ml-1 inline-block px-2 py-0.5 text-[11px] rounded-full bg-yellow-100 text-yellow-800">Pinned</span> : null}
                  </div>
                  <div>{c.content}</div>
                  {/* Moderation metadata */}
                  {(c.moderatedAt || c.moderatedBy || c.moderationReason) && (
                    <div className="mt-1 text-[11px] text-gray-500">
                      <span>Last moderated{c.moderatedAt ? `: ${new Date(c.moderatedAt).toLocaleString()}` : ''}</span>
                      {c.moderatedBy ? <span> • by {c.moderatedBy.name || c.moderatedBy.email}</span> : null}
                      {c.moderationReason ? <span> • reason: {c.moderationReason}</span> : null}
                    </div>
                  )}
                  {/* Parent context */}
                  {c.parent && (
                    <div className="mt-2 p-2 bg-gray-50 border rounded text-xs">
                      <div className="text-gray-600 mb-1">In reply to:</div>
                      <div className="line-clamp-2">{c.parent.content}</div>
                    </div>
                  )}
                  {/* Replies preview */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-2">
                      <button className="text-xs text-blue-600 hover:underline" onClick={()=>toggleExpand(c.id)}>
                        {expanded.has(c.id) ? 'Hide' : 'Show'} replies ({c.replies.length})
                      </button>
                      {expanded.has(c.id) && (
                        <ul className="mt-1 space-y-1">
                          {c.replies.map((r) => (
                            <li key={r.id} className="text-xs p-2 border rounded bg-white">
                              <div className="text-gray-600 mb-1">
                                {r.author?.name || r.guestName || 'Guest'} • {new Date(r.createdAt).toLocaleString()} • {r.status}
                              </div>
                              <div>{r.content}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {c.status !== 'APPROVED' && (
                  <button onClick={()=>doStatus(c.id,'APPROVED')} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">Approve</button>
                )}
                {c.status !== 'HIDDEN' && (
                  <button onClick={()=>doStatus(c.id,'HIDDEN')} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">Hide</button>
                )}
                {c.status !== 'SPAM' && (
                  <button onClick={()=>doStatus(c.id,'SPAM')} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">Spam</button>
                )}
                {/* Approve + Pin combined action */}
                {(c.status !== 'APPROVED' || !c.isPinned) && (
                  <button
                    onClick={async ()=>{ await doStatus(c.id,'APPROVED'); await doPin(c.id, true); }}
                    className="text-xs px-2 py-1 border rounded bg-yellow-50 hover:bg-yellow-100"
                  >Approve + Pin</button>
                )}
                <button onClick={()=>doPin(c.id, !c.isPinned)} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">{c.isPinned ? 'Unpin' : 'Pin'}</button>
                <button onClick={()=>remove(c.id)} className="text-xs px-2 py-1 border rounded text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          </li>
        ))}
        {!items.length && !loading && selected && (
          <li className="text-sm text-gray-500 p-3">No comments.</li>
        )}
      </ul>
      </div>

      {selected && (
        <div className="flex items-center gap-2">
          <button className="border px-2 py-1 rounded hover:bg-gray-50 disabled:opacity-50" onClick={()=>goPage(page-1)} disabled={page<=1}>Prev</button>
          <span className="text-sm">Page {page} / {totalPages}</span>
          <button className="border px-2 py-1 rounded hover:bg-gray-50 disabled:opacity-50" onClick={()=>goPage(page+1)} disabled={page>=totalPages}>Next</button>
        </div>
      )}

      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        requireReason={confirmState.requireReason}
        onConfirm={handleConfirm}
        onClose={closeConfirm}
      />
    </div>
  );
}
