import { create } from 'zustand';
import type { Department, Ticket, User, TicketActivity, EmailThread, Notification, CompanySection, TicketSource } from '../types';

interface AppState {
  // Data
  departments: Department[];
  tickets: Ticket[];
  users: User[];
  activities: TicketActivity[];
  emailThreads: EmailThread[];
  notifications: Notification[];
  companySections: CompanySection[];
  ticketSources: TicketSource[];
  
  // UI State
  sidebarOpen: boolean;
  currentView: string;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addDepartment: (department: Omit<Department, 'id' | 'createdAt'>) => void;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  addActivity: (activity: Omit<TicketActivity, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

// Mock data
const mockDepartments: Department[] = [
  { id: '1', name: 'IT Support', description: 'Technical support and maintenance', createdAt: new Date(), isActive: true },
  { id: '2', name: 'HR', description: 'Human Resources', createdAt: new Date(), isActive: true },
  { id: '3', name: 'Finance', description: 'Financial operations', createdAt: new Date(), isActive: true },
];

const mockUsers: User[] = [
  { id: '1', name: 'John Admin', email: 'admin@company.com', role: 'admin', createdAt: new Date(), isActive: true },
  { id: '2', name: 'Jane SubAdmin', email: 'subadmin@company.com', role: 'sub-admin', departmentId: '1', createdAt: new Date(), isActive: true },
  { id: '3', name: 'Bob Smith', email: 'bob@company.com', role: 'sub-admin', departmentId: '1', createdAt: new Date(), isActive: true },
  { id: '4', name: 'Alice Johnson', email: 'alice@company.com', role: 'sub-admin', departmentId: '2', createdAt: new Date(), isActive: true },
];

const mockTickets: Ticket[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1-555-0123',
    email: 'john.doe@email.com',
    companySection: 'Marketing',
    source: 'Tawk.to',
    dateFiled: new Date(),
    subject: 'Login Issues',
    message: 'Unable to log into the system',
    level: 'high',
    status: 'new',
    departmentId: '1',
    assignedUserId: '3',
    createdBy: '1',
    autoEmail: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1-555-0124',
    email: 'jane.smith@email.com',
    companySection: 'Sales',
    source: 'Walk-in',
    dateFiled: new Date(),
    subject: 'Payroll Question',
    message: 'Question about overtime calculation',
    level: 'medium',
    status: 'in-progress',
    departmentId: '2',
    assignedUserId: '4',
    createdBy: '1',
    autoEmail: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockCompanySections: CompanySection[] = [
  { id: '1', name: 'Marketing' },
  { id: '2', name: 'Sales' },
  { id: '3', name: 'Operations' },
  { id: '4', name: 'Finance' },
];

const mockTicketSources: TicketSource[] = [
  { id: '1', name: 'Tawk.to' },
  { id: '2', name: 'Walk-in' },
  { id: '3', name: 'Email' },
  { id: '4', name: 'Phone' },
];

export const useAppStore = create<AppState>((set, get) => ({
  // Initial data
  departments: mockDepartments,
  tickets: mockTickets,
  users: mockUsers,
  activities: [],
  emailThreads: [],
  notifications: [],
  companySections: mockCompanySections,
  ticketSources: mockTicketSources,
  
  // UI State
  sidebarOpen: false,
  currentView: 'dashboard',
  
  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentView: (view) => set({ currentView: view }),
  
  addTicket: (ticketData) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ 
      tickets: [...state.tickets, newTicket],
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        type: 'ticket',
        title: 'New Ticket Created',
        message: `Ticket "${newTicket.subject}" has been created`,
        isRead: false,
        createdAt: new Date(),
        relatedId: newTicket.id,
      }]
    }));
  },
  
  updateTicket: (id, updates) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id 
          ? { ...ticket, ...updates, updatedAt: new Date() }
          : ticket
      ),
    }));
  },
  
  deleteTicket: (id) => {
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
    }));
  },
  
  addUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    set((state) => ({ users: [...state.users, newUser] }));
  },
  
  updateUser: (id, updates) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    }));
  },
  
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  
  addDepartment: (deptData) => {
    const newDepartment: Department = {
      ...deptData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    set((state) => ({ departments: [...state.departments, newDepartment] }));
  },
  
  updateDepartment: (id, updates) => {
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === id ? { ...dept, ...updates } : dept
      ),
    }));
  },
  
  deleteDepartment: (id) => {
    set((state) => ({
      departments: state.departments.filter((dept) => dept.id !== id),
    }));
  },
  
  addActivity: (activityData) => {
    const newActivity: TicketActivity = {
      ...activityData,
      id: Date.now().toString(),
    };
    set((state) => ({ activities: [...state.activities, newActivity] }));
  },
  
  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      ),
    }));
  },
  
  addNotification: (notificationData) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
    };
    set((state) => ({ 
      notifications: [...state.notifications, newNotification] 
    }));
  },
}));