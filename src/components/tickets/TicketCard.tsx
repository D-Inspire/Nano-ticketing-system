import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Building2, 
  Edit3, 
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { getPriorityColor, getStatusColor } from '../../utils/helpers';
import type { Ticket } from '../../types';
import TicketDetail from './TicketDetail';
import StatusUpdateModal from './StatusUpdateModal';

interface TicketCardProps {
  ticket: Ticket;
  index: number;
}

export default function TicketCard({ ticket, index }: TicketCardProps) {
  const { departments, users } = useAppStore();
  const [showDetail, setShowDetail] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  
  const department = departments.find(d => d.id === ticket.departmentId);
  const assignedUser = users.find(u => u.id === ticket.assignedUserId);

  return (
    <>
      <motion.div
        className="px-6 py-4 hover:bg-gray-50 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.level)}`}>
                {ticket.level.toUpperCase()}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                {ticket.status.replace('-', ' ').toUpperCase()}
              </span>
              {ticket.autoEmail && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  AUTO-EMAIL
                </span>
              )}
            </div>
            
            <h4 className="text-lg font-medium text-gray-900 mb-1">
              {ticket.subject}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                {ticket.name}
              </div>
              <div className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                {ticket.email}
              </div>
              <div className="flex items-center">
                <Building2 className="mr-1 h-4 w-4" />
                {department?.name || 'Unassigned'}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
              </div>
            </div>
            
            {assignedUser && (
              <p className="text-sm text-gray-500 mt-1">
                Assigned to: {assignedUser.name}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <motion.button
              onClick={() => setShowDetail(true)}
              className="p-2 text-gray-400 hover:text-[#0C0649] hover:bg-gray-100 rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              onClick={() => setShowStatusUpdate(true)}
              className="p-2 text-gray-400 hover:text-[#E08D40] hover:bg-orange-50 rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Update Status"
            >
              <Edit3 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {showDetail && (
        <TicketDetail 
          ticket={ticket} 
          onClose={() => setShowDetail(false)} 
        />
      )}
      
      {showStatusUpdate && (
        <StatusUpdateModal
          ticket={ticket}
          onClose={() => setShowStatusUpdate(false)}
        />
      )}
    </>
  );
}