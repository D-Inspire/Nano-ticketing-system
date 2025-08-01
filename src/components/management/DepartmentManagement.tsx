import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import DepartmentForm from './DepartmentForm';

export default function DepartmentManagement() {
  const { departments, users, deleteDepartment } = useAppStore();
  const { user: currentUser } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You don't have permission to access this page.</p>
      </div>
    );
  }

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.description && dept.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (department: any) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleDelete = (departmentId: string) => {
    const usersInDept = users.filter(u => u.departmentId === departmentId);
    if (usersInDept.length > 0) {
      alert(`Cannot delete department with ${usersInDept.length} assigned users. Please reassign users first.`);
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this department?')) {
      deleteDepartment(departmentId);
    }
  };

  const getUserCount = (departmentId: string) => {
    return users.filter(u => u.departmentId === departmentId).length;
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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Department Management</h1>
          <p className="text-gray-600 mt-1">Organize your team into departments</p>
        </div>
        
        <motion.button
          onClick={() => {
            setEditingDepartment(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-[#0C0649] text-white rounded-lg font-medium hover:bg-[#0a0540] transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </motion.button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search departments by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department, index) => {
          const userCount = getUserCount(department.id);
          
          return (
            <motion.div
              key={department.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-[#0C0649] bg-opacity-10 rounded-lg">
                    <Building2 className="h-6 w-6 text-[#0C0649]" />
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <motion.button
                    onClick={() => handleEdit(department)}
                    className="p-2 text-gray-400 hover:text-[#E08D40] hover:bg-orange-50 rounded-md transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Edit Department"
                  >
                    <Edit3 className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(department.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Delete Department"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {department.name}
              </h3>
              
              {department.description && (
                <p className="text-gray-600 text-sm mb-4">
                  {department.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="font-medium text-[#0C0649]">{userCount}</span>
                  <span className="ml-1">{userCount === 1 ? 'user' : 'users'}</span>
                </span>
                <span>
                  Created {format(new Date(department.createdAt), 'MMM yyyy')}
                </span>
              </div>
            </motion.div>
          );
        })}
        
        {filteredDepartments.length === 0 && (
          <div className="col-span-full">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Building2 className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No departments found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria' : 'Create your first department to get started'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Department Form Modal */}
      {showForm && (
        <DepartmentForm 
          department={editingDepartment}
          onClose={() => {
            setShowForm(false);
            setEditingDepartment(null);
          }} 
        />
      )}
    </motion.div>
  );
}