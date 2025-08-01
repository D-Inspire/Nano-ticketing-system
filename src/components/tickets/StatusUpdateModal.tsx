import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import type { Ticket } from '../../types';

interface StatusUpdateModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export default function StatusUpdateModal({ ticket, onClose }: StatusUpdateModalProps) {
  const { updateTicket, addActivity } = useAppStore();
  const [status, setStatus] = useState(ticket.status);
  const [loading, setLoading] = useState(false);

  const statuses = [
    { value: 'new', label: 'New', color: 'bg-gray-100 text-gray-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'paused', label: 'Paused', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      updateTicket(ticket.id, { status: status as any });
      
      // Add activity log
      addActivity({
        ticketId: ticket.id,
        userId: '1', // Current user ID
        action: 'Status Updated',
        details: `Status changed from ${ticket.status} to ${status}`,
        timestamp: new Date(),
      });
      
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Update Status</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select new status for: <span className="font-semibold">{ticket.subject}</span>
              </label>
              
              <div className="space-y-2">
                {statuses.map((statusOption) => (
                  <label
                    key={statusOption.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      status === statusOption.value 
                        ? 'border-[#0C0649] bg-[#0C0649] bg-opacity-5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={statusOption.value}
                      checked={status === statusOption.value}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300"
                    />
                    <span className="ml-3 flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${statusOption.color}`}>
                        {statusOption.label}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={loading || status === ticket.status}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0C0649] border border-transparent rounded-md hover:bg-[#0a0540] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C0649] disabled:opacity-50 transition-colors"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Update Status
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}