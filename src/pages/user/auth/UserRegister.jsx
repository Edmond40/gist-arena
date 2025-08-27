import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthAPI } from '../../../lib/api';

export default function UserRegister() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await AuthAPI.register(email, password, name);
      nav('/login');
    } catch (e) {
      setError(e?.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="w-full border p-2" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full border p-2" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50" type="submit">
          {loading ? 'Creating...' : 'Sign up'}
        </button>
      </form>
      <p className="mt-3 text-sm">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
    </div>
  );
}
