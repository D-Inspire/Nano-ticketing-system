import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useAppStore } from '../../store/appStore';
import { getPriorityColor, getStatusColor } from '../../utils/helpers';

export default function RecentTickets() {
  const { tickets, setCurrentView } = useAppStore();
  
  const recentTickets = tickets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Tickets</h3>
          <button
            onClick={() => setCurrentView('tickets')}
            className="text-sm text-[#0C0649] hover:text-[#0a0540] font-medium"
          >
            View All
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recentTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.level)}`}>
                    {ticket.level.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {ticket.subject}
                </p>
                <p className="text-sm text-gray-500">
                  {ticket.name} • {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {recentTickets.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No tickets available
          </div>
        )}
      </div>
    </div>
  );
}