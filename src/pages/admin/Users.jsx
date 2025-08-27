import React, { useEffect, useState } from 'react';
import { UsersAPI } from '../../lib/api';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useAuth } from '../../context/AuthContext';

export default function Users() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reassignOpen, setReassignOpen] = useState(false);
  const [reassignForId, setReassignForId] = useState(null);
  const [targetUserId, setTargetUserId] = useState('');
  const [working, setWorking] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await UsersAPI.list()); }
    catch { setError('Failed to load users'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const toggleRole = async (id, role) => {
    try {
      const nextRole = role === 'ADMIN' ? 'USER' : 'ADMIN';
      await UsersAPI.setRole(id, nextRole);
      await load();
      toast.success(`Role updated to ${nextRole}`);
    } catch (e) {
      toast.error(`Failed to update role: ${e?.message || e}`);
    }
  };

  const remove = async (id) => {
    if (user && user.id === id) {
      toast.warning('You cannot delete the currently logged-in user.');
      return;
    }
    try {
      await UsersAPI.remove(id);
      await load();
      toast.success('User deleted');
    } catch (e) {
      const msg = String(e?.message || '');
      // If the user authored posts, offer reassignment flow
      if (msg.includes('authored posts')) {
        const others = items.filter(u => u.id !== id);
        if (others.length === 0) {
          toast.error('No other user available to reassign posts. Create another user first.');
          return;
        }
        setReassignForId(id);
        setTargetUserId(String(others[0].id));
        setReassignOpen(true);
      } else {
        toast.error(msg || 'Failed to delete user');
      }
    }
  };

  if (loading) return <div className="text-sm text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Users</h2>
        <p className="text-xs text-gray-500">Manage user roles and accounts</p>
      </div>
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.name || '-'}</td>
                  <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{u.role}</span></td>
                  <td className="p-2 whitespace-nowrap">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>toggleRole(u.id, u.role)} className="px-2 py-1 rounded border text-blue-600 hover:bg-blue-50">Toggle Role</button>
                      <button onClick={()=>remove(u.id)} className="px-2 py-1 rounded border text-red-600 hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reassign posts modal */}
      <ConfirmDialog
        open={reassignOpen}
        title="Reassign posts before deleting"
        message="This user has authored posts. Select another user to transfer their posts to, then confirm deletion."
        confirmText="Reassign & Delete"
        cancelText="Cancel"
        onClose={() => setReassignOpen(false)}
        confirming={working}
        confirmDisabled={!targetUserId}
        onConfirm={async () => {
          const fromId = reassignForId;
          const toIdNum = Number(targetUserId);
          const valid = items.some(u => u.id === toIdNum && u.id !== fromId);
          if (!valid) {
            toast.error('Please select a valid target user.');
            return;
          }
          try {
            setWorking(true);
            await UsersAPI.reassignPosts(fromId, toIdNum);
            await UsersAPI.remove(fromId);
            toast.success('Posts reassigned and user deleted');
            setReassignOpen(false);
            setReassignForId(null);
            setTargetUserId('');
            await load();
          } catch (err2) {
            toast.error(`Failed to reassign/delete: ${err2?.message || err2}`);
          } finally {
            setWorking(false);
          }
        }}
      >
        <div>
          <label className="block text-xs text-gray-600 mb-1">Transfer posts to</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={targetUserId}
            onChange={(e)=>setTargetUserId(e.target.value)}
          >
            {items.filter(u => u.id !== reassignForId).map(u => (
              <option key={u.id} value={u.id}>{u.email} (#{u.id})</option>
            ))}
          </select>
        </div>
      </ConfirmDialog>
    </div>
  );
}
