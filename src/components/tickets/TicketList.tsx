import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import TicketCard from './TicketCard';
import TicketForm from './TicketForm';
import SearchFilters from './SearchFilters';

export default function TicketList() {
  const { tickets, departments } = useAppStore();
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = !searchTerm || 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !selectedDepartment || ticket.departmentId === selectedDepartment;
      const matchesStatus = !selectedStatus || ticket.status === selectedStatus;
      const matchesLevel = !selectedLevel || ticket.level === selectedLevel;
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesLevel;
    });
  }, [tickets, searchTerm, selectedDepartment, selectedStatus, selectedLevel]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600 mt-1">Manage and track all support tickets</p>
        </div>
        
        <motion.button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-[#0C0649] text-white rounded-lg font-medium hover:bg-[#0a0540] transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name, subject, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
              />
            </div>
          </div>
          
          <SearchFilters
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            departments={departments}
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {filteredTickets.length} Ticket{filteredTickets.length !== 1 ? 's' : ''}
            </h3>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTickets.map((ticket, index) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              index={index}
            />
          ))}
          
          {filteredTickets.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-2">
                <Calendar className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tickets found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedDepartment || selectedStatus || selectedLevel
                  ? 'Try adjusting your search criteria'
                  : 'Create your first ticket to get started'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Form Modal */}
      {showForm && (
        <TicketForm onClose={() => setShowForm(false)} />
      )}
    </motion.div>
  );
}