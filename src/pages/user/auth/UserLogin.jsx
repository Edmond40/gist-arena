import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

export default function UserLogin() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // Always send users to their dashboard; Admins can use the Admin Login page
      nav('/dashboard');
    } catch (e) {
      setError(e?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-gray-600 mt-1">Sign in to continue to your dashboard.</p>
          </div>

          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                className="w-full rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none px-3 py-2 text-sm"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  className="w-full rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none px-3 py-2 pr-10 text-sm"
                  placeholder="Your password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto text-xs text-gray-600 hover:text-gray-800 px-2"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-gray-600 hover:text-gray-900">Forgot password?</button>
            </div>

            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2.5 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              type="submit"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            New here?{' '}
            <Link className="text-yellow-700 hover:text-yellow-800 font-medium" to="/register">Create an account</Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-gray-600">
          Are you an admin? <Link className="text-gray-900 font-medium hover:underline" to="/admin/login">Go to admin sign in</Link>
        </p>
      </div>
    </div>
  );
}
