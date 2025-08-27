import React, { useEffect, useState } from 'react';
import { CategoriesAPI } from '../../lib/api';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Categories() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await CategoriesAPI.list();
      setItems(data);
    } catch (e) {
      console.log(e);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await CategoriesAPI.create({ name });
    setName('');
    load();
    toast.success('Category added');
  };

  const remove = async (id) => {
    await CategoriesAPI.remove(id);
    load();
    toast.success('Category removed');
  };

  if (loading) return <div className="text-sm text-gray-600">Loading...</div>;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div>
        <h2 className="text-xl font-semibold">Categories</h2>
        <p className="text-xs text-gray-500">Create and manage categories</p>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <form onSubmit={add} className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input className="border rounded px-3 py-2 flex-1 min-w-0" placeholder="New category" value={name} onChange={(e)=>setName(e.target.value)} />
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">+ Add</button>
        </form>
      </div>
      <div className="bg-white border rounded-lg">
        <ul className="divide-y">
          {items.map(c => (
            <li key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3">
              <span className="font-medium text-gray-900 break-words">{c.name}</span>
              <button onClick={()=>remove(c.id)} className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 self-start sm:self-auto"><Trash2 size={16}/> Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
