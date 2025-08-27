const API_BASE = '/api/v1';

function getToken() {
  return localStorage.getItem('token');
}

export async function api(path, { method = 'GET', body, headers, skipAuth } = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && !skipAuth ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `API error ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export const AuthAPI = {
  login: (email, password) => api('/auth/login', { method: 'POST', body: { email, password } }),
  register: (email, password, name, adminCode) => api('/auth/register', { method: 'POST', body: { email, password, name, ...(adminCode ? { adminCode } : {}) } }),
  adminRegister: (email, password, name, adminCode) => api('/auth/admin/register', { method: 'POST', body: { email, password, name, adminCode } }),
};

export const UsersAPI = {
  list: () => api('/users'),
  create: (data) => api('/users', { method: 'POST', body: data }),
  setRole: (id, role) => api(`/users/${id}/role`, { method: 'PATCH', body: { role } }),
  remove: (id) => api(`/users/${id}`, { method: 'DELETE' }),
  reassignPosts: (fromUserId, toUserId) => api(`/users/${fromUserId}/reassign-posts`, { method: 'POST', body: { toUserId } }),
};

export const PostsAPI = {
  list: (opts = {}) => {
    const params = new URLSearchParams();
    if (opts.published !== undefined) params.set('published', String(!!opts.published));
    if (opts.isTrending !== undefined) params.set('isTrending', String(!!opts.isTrending));
    if (opts.sortBy) params.set('sortBy', opts.sortBy);
    if (opts.order) params.set('order', opts.order);
    const qs = params.toString();
    return api(`/posts${qs ? `?${qs}` : ''}`);
  },
  get: (id) => api(`/posts/${id}`),
  create: (data) => api('/posts', { method: 'POST', body: data }),
  update: (id, data) => api(`/posts/${id}`, { method: 'PATCH', body: data }),
  remove: (id) => api(`/posts/${id}`, { method: 'DELETE' }),
  incrementViews: (id) => api(`/posts/${id}/views`, { method: 'POST' }),
  share: (id) => api(`/posts/${id}/share`, { method: 'POST' }),
};

export const CategoriesAPI = {
  list: () => api('/categories'),
  create: (data) => api('/categories', { method: 'POST', body: data }),
  update: (id, data) => api(`/categories/${id}`, { method: 'PATCH', body: data }),
  remove: (id) => api(`/categories/${id}`, { method: 'DELETE' }),
};

export const TagsAPI = {
  list: () => api('/tags'),
  create: (data) => api('/tags', { method: 'POST', body: data }),
  remove: (id) => api(`/tags/${id}`, { method: 'DELETE' }),
};

export const CommentsAPI = {
  list: (postId) => api(`/comments/${postId}`),
  add: (postId, content, guest, options) => api(`/comments/${postId}`, { method: 'POST', body: { content, ...(guest || {}), ...(options?.asGuest ? { asGuest: true } : {}) }, skipAuth: options?.asGuest }),
  reply: (postId, parentId, content, guest, options) => api(`/comments/${postId}`, { method: 'POST', body: { content, parentId, ...(guest || {}), ...(options?.asGuest ? { asGuest: true } : {}) }, skipAuth: options?.asGuest }),
  update: (id, content) => api(`/comments/${id}`, { method: 'PATCH', body: { content } }),
  remove: (id) => api(`/comments/${id}`, { method: 'DELETE' }),
  count: () => api('/comments/count'),
  recentCount: (hours = 24) => api(`/comments/recent-count?hours=${hours}`),
  recentList: (limit = 10) => api(`/comments/recent?limit=${limit}`),
  // Admin
  adminList: (opts = {}) => {
    const params = new URLSearchParams();
    if (opts.postId) params.set('postId', String(opts.postId));
    if (opts.status) params.set('status', opts.status);
    if (opts.q) params.set('q', opts.q);
    if (opts.page) params.set('page', String(opts.page));
    if (opts.pageSize) params.set('pageSize', String(opts.pageSize));
    if (opts.from) params.set('from', new Date(opts.from).toISOString());
    if (opts.to) params.set('to', new Date(opts.to).toISOString());
    const qs = params.toString();
    return api(`/comments/admin${qs ? `?${qs}` : ''}`);
  },
  adminUpdateStatus: (id, status, reason) => api(`/comments/${id}/status`, { method: 'PATCH', body: { status, ...(reason ? { reason } : {}) } }),
  adminSetPin: (id, isPinned) => api(`/comments/${id}/pin`, { method: 'PATCH', body: { isPinned } }),
  adminBulk: (ids, action, reason) => api('/comments/bulk', { method: 'POST', body: { ids, action, ...(reason ? { reason } : {}) } }),
};

export const MetricsAPI = {
  recent: (hours = 24) => api(`/metrics/recent?hours=${hours}`),
};

export const LikesAPI = {
  count: (postId) => api(`/likes/${postId}/count`),
  like: (postId) => api(`/likes/${postId}`, { method: 'POST' }),
  unlike: (postId) => api(`/likes/${postId}`, { method: 'DELETE' }),
};

export const BookmarksAPI = {
  list: () => api('/bookmarks'),
  add: (postId) => api(`/bookmarks/${postId}`, { method: 'POST' }),
  remove: (postId) => api(`/bookmarks/${postId}`, { method: 'DELETE' }),
};

export const UploadsAPI = {
  upload: async (file) => {
    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${API_BASE}/uploads`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: fd,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json(); // { url, filename }
  },
  list: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/uploads`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json(); // [ { url, filename, size, mtime } ]
  },
};
