import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@company.com',
    role: 'admin',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Jane SubAdmin',
    email: 'subadmin@company.com',
    role: 'sub-admin',
    departmentId: '1',
    createdAt: new Date(),
    isActive: true,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock authentication
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);