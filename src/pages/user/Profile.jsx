import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-2">
        <div><span className="font-semibold">Name:</span> {user.name || '-'}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
        <div><span className="font-semibold">Role:</span> {user.role}</div>
      </div>
    </div>
  );
}
