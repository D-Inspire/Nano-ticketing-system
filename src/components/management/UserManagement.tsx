import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, UserCheck, UserX } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import UserForm from './UserForm';

export default function UserManagement() {
  const { users, departments, deleteUser, updateUser } = useAppStore();
  const { user: currentUser } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You don't have permission to access this page.</p>
      </div>
    );
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const toggleUserStatus = (userId: string, isActive: boolean) => {
    updateUser(userId, { isActive: !isActive });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users and their permissions</p>
        </div>
        
        <motion.button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-[#0C0649] text-white rounded-lg font-medium hover:bg-[#0a0540] transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </motion.button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {filteredUsers.length} User{filteredUsers.length !== 1 ? 's' : ''}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user, index) => {
            const department = departments.find(d => d.id === user.departmentId);
            
            return (
              <motion.div
                key={user.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#0C0649] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {user.name}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{user.email}</span>
                          <span className="capitalize">{user.role.replace('-', ' ')}</span>
                          {department && <span>{department.name}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                    
                    <motion.button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      className={`p-2 rounded-md transition-colors ${
                        user.isActive
                          ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                          : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={user.isActive ? 'Deactivate User' : 'Activate User'}
                    >
                      {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-gray-400 hover:text-[#E08D40] hover:bg-orange-50 rounded-md transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Edit User"
                    >
                      <Edit3 className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {filteredUsers.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-2">
                <Plus className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria' : 'Create your first user to get started'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <UserForm 
          user={editingUser}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }} 
        />
      )}
    </motion.div>
  );
}