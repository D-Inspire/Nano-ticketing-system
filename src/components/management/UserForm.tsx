import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store/appStore';
import type { User } from '../../types';

interface UserFormProps {
  onClose: () => void;
  user?: User;
}

interface FormData {
  name: string;
  email: string;
  role: 'admin' | 'sub-admin';
  departmentId?: string;
  isActive: boolean;
}

export default function UserForm({ onClose, user }: UserFormProps) {
  const { departments, addUser, updateUser } = useAppStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'sub-admin',
      departmentId: user?.departmentId || '',
      isActive: user?.isActive ?? true,
    }
  });

  const watchedRole = watch('role');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (user) {
        updateUser(user.id, data);
      } else {
        addUser(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
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
            <h2 className="text-xl font-semibold text-gray-900">
              {user ? 'Edit User' : 'Add New User'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                {...register('role', { required: 'Role is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
              >
                <option value="sub-admin">Sub-Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {watchedRole === 'sub-admin' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  {...register('departmentId')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isActive')}
                className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Active user
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
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
                {user ? 'Update User' : 'Add User'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}