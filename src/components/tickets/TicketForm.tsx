import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import type { Ticket } from '../../types';

interface TicketFormProps {
  onClose: () => void;
  ticket?: Ticket;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  companySection: string;
  source: string;
  subject: string;
  message: string;
  recommendation?: string;
  level: 'urgent' | 'high' | 'medium' | 'casual';
  departmentId: string;
  assignedUserId?: string;
  autoEmail: boolean;
}

export default function TicketForm({ onClose, ticket }: TicketFormProps) {
  const { departments, users, companySections, ticketSources, addTicket, updateTicket } = useAppStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(ticket?.departmentId || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: ticket?.name || '',
      phone: ticket?.phone || '',
      email: ticket?.email || '',
      companySection: ticket?.companySection || '',
      source: ticket?.source || '',
      subject: ticket?.subject || '',
      message: ticket?.message || '',
      recommendation: ticket?.recommendation || '',
      level: ticket?.level || 'medium',
      departmentId: ticket?.departmentId || '',
      assignedUserId: ticket?.assignedUserId || '',
      autoEmail: ticket?.autoEmail ?? true,
    }
  });

  const watchedDepartment = watch('departmentId');
  const filteredUsers = users.filter(u => 
    u.departmentId === watchedDepartment && u.role === 'sub-admin'
  );

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (ticket) {
        updateTicket(ticket.id, {
          ...data,
          updatedAt: new Date()
        });
      } else {
        addTicket({
          ...data,
          status: 'new',
          dateFiled: new Date(),
          createdBy: user?.id || '',
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving ticket:', error);
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
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {ticket ? 'Edit Ticket' : 'Create New Ticket'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Section *
                </label>
                <select
                  {...register('companySection', { required: 'Company section is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                >
                  <option value="">Select section</option>
                  {companySections.map(section => (
                    <option key={section.id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
                {errors.companySection && (
                  <p className="text-red-600 text-sm mt-1">{errors.companySection.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source *
                </label>
                <select
                  {...register('source', { required: 'Source is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                >
                  <option value="">Select source</option>
                  {ticketSources.map(source => (
                    <option key={source.id} value={source.name}>
                      {source.name}
                    </option>
                  ))}
                </select>
                {errors.source && (
                  <p className="text-red-600 text-sm mt-1">{errors.source.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                {...register('subject', { required: 'Subject is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                {...register('message', { required: 'Message is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recommendation
              </label>
              <textarea
                rows={3}
                {...register('recommendation')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
              />
            </div>

            {/* Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority Level *
                </label>
                <select
                  {...register('level', { required: 'Priority level is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                >
                  <option value="casual">Casual</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  {...register('departmentId', { required: 'Department is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="text-red-600 text-sm mt-1">{errors.departmentId.message}</p>
                )}
              </div>
            </div>

            {watchedDepartment && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to User
                </label>
                <select
                  {...register('assignedUserId')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                >
                  <option value="">Select user</option>
                  {filteredUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('autoEmail')}
                className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Send automatic email confirmation
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0C0649] border border-transparent rounded-md hover:bg-[#0a0540] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C0649] disabled:opacity-50 transition-colors"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {ticket ? 'Update Ticket' : 'Create Ticket'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}