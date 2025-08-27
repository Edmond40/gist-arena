import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function UserLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b p-4">
        <div className="font-semibold">Gist Arena</div>
        <nav className="flex gap-4 text-sm">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/posts">My Posts</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <button className="text-sm underline" onClick={logout}>Logout</button>
        </nav>
      </header>
      <main className="p-4">
        <div className="text-sm text-gray-600 mb-2">Signed in as {user?.name || user?.email}</div>
        <Outlet />
      </main>
    </div>
  );
}
