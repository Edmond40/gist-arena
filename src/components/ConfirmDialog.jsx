import React from 'react';

export default function ConfirmDialog({ open, title = 'Confirm', message, requireReason = false, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onClose, children, confirming = false, confirmDisabled = false }) {
  const [reason, setReason] = React.useState('');

  React.useEffect(() => {
    if (!open) setReason('');
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-3">
        <div className="px-5 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="px-5 py-4 space-y-3">
          {message && <p className="text-sm text-gray-700">{message}</p>}
          {children}
          {requireReason && (
            <div>
              <label className="block text-xs text-gray-600 mb-1">Reason (optional)</label>
              <textarea
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows={3}
                placeholder="Add a moderation reason..."
                value={reason}
                onChange={(e)=>setReason(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded border text-gray-700 bg-white hover:bg-gray-50" disabled={confirming}>
            {cancelText}
          </button>
          <button
            onClick={()=>{ if (!confirming) onConfirm?.(reason); }}
            disabled={confirming || confirmDisabled}
            className={`px-3 py-1.5 rounded text-white ${confirming || confirmDisabled ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {confirming ? 'Working...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
