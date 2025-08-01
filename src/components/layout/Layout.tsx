import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuthStore();
  const { sidebarOpen } = useAppStore();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <motion.main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}