import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Calendar, Building2, Flag, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../../store/appStore';
import { getPriorityColor, getStatusColor } from '../../utils/helpers';
import type { Ticket } from '../../types';

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
}

export default function TicketDetail({ ticket, onClose }: TicketDetailProps) {
  const { departments, users } = useAppStore();
  
  const department = departments.find(d => d.id === ticket.departmentId);
  const assignedUser = users.find(u => u.id === ticket.assignedUserId);
  const createdBy = users.find(u => u.id === ticket.createdBy);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ticket Details</h2>
              <p className="text-sm text-gray-500 mt-1">ID: #{ticket.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status and Priority */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.level)}`}>
                <Flag className="mr-1 h-4 w-4" />
                {ticket.level.toUpperCase()} PRIORITY
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                <Clock className="mr-1 h-4 w-4" />
                {ticket.status.replace('-', ' ').toUpperCase()}
              </span>
              {ticket.autoEmail && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Mail className="mr-1 h-4 w-4" />
                  AUTO-EMAIL ENABLED
                </span>
              )}
            </div>

            {/* Subject */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{ticket.subject}</h3>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{ticket.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{ticket.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{ticket.phone}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Building2 className="mr-2 h-4 w-4" />
                  <span className="font-medium">Company Section:</span>
                  <span className="ml-2">{ticket.companySection}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="font-medium">Date Filed:</span>
                  <span className="ml-2">{format(new Date(ticket.dateFiled), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Source:</span>
                  <span className="ml-2">{ticket.source}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Message</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
              </div>
            </div>

            {/* Recommendation */}
            {ticket.recommendation && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendation</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 whitespace-pre-wrap">{ticket.recommendation}</p>
                </div>
              </div>
            )}

            {/* Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Department</h4>
                <p className="text-gray-700">{department?.name || 'Unassigned'}</p>
              </div>
              
              {assignedUser && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Assigned To</h4>
                  <p className="text-gray-700">{assignedUser.name}</p>
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2">{format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                  {createdBy && (
                    <span className="block text-xs mt-1">by {createdBy.name}</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <span className="ml-2">{format(new Date(ticket.updatedAt), 'MMM dd, yyyy HH:mm')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}