import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthAPI } from '../../../lib/api';

export default function AdminRegister() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await AuthAPI.adminRegister(email, password, name, adminCode);
      nav('/admin/login');
    } catch (err) {
      console.log(err);
      
      setError('Invalid admin code or failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Admin Registration</h1>
      <div className="text-xs text-gray-600 mb-4">This creates an ADMIN account. Enter the Admin Auth Code configured on the server as <code>ADMIN_AUTH_CODE</code>.</div>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="w-full border p-2" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full border p-2" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input className="w-full border p-2" placeholder="Admin Auth Code (matches server ADMIN_AUTH_CODE)" value={adminCode} onChange={(e)=>setAdminCode(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50" type="submit">
          {loading ? 'Creating...' : 'Create admin account'}
        </button>
      </form>
      <p className="mt-3 text-sm">Already have an admin account? <Link className="text-blue-600" to="/admin/login">Admin Login</Link></p>
    </div>
  );
}
