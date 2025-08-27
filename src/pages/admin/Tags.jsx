import React, { useEffect, useState } from 'react';
import { TagsAPI } from '../../lib/api';

export default function Tags() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try { setItems(await TagsAPI.list()); }
    catch { setError('Failed to load tags'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await TagsAPI.create({ name });
    setName('');
    load();
  };

  const remove = async (id) => { await TagsAPI.remove(id); load(); };

  if (loading) return <div className="text-sm text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Tags</h2>
        <p className="text-xs text-gray-500">Create and manage tags</p>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-2">
          <input className="border rounded px-3 py-2 flex-1" placeholder="New tag" value={name} onChange={(e)=>setName(e.target.value)} />
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Add</button>
        </form>
      </div>
      <div className="bg-white border rounded-lg">
        <ul className="divide-y">
          {items.map(t => (
            <li key={t.id} className="flex items-center justify-between p-3">
              <span className="font-medium text-gray-900">{t.name}</span>
              <button onClick={()=>remove(t.id)} className="text-sm text-red-600 hover:text-red-700">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
