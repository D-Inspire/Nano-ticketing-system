import React from 'react';
import { Filter } from 'lucide-react';
import type { Department } from '../../types';

interface SearchFiltersProps {
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  departments: Department[];
}

export default function SearchFilters({
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  selectedLevel,
  setSelectedLevel,
  departments
}: SearchFiltersProps) {
  const statuses = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' },
  ];

  const levels = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'casual', label: 'Casual' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent text-sm"
      >
        <option value="">All Departments</option>
        {departments.map(dept => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent text-sm"
      >
        <option value="">All Statuses</option>
        {statuses.map(status => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent text-sm"
      >
        <option value="">All Priorities</option>
        {levels.map(level => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
}