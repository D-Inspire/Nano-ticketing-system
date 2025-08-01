import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

export default function Header() {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, setSidebarOpen, notifications } = useAppStore();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-[#0C0649] hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-[#0C0649]">
              Ticketing System
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-sm">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>

          <motion.button
            className="relative p-2 text-gray-600 hover:text-[#0C0649] hover:bg-gray-100 rounded-md transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 bg-[#E08D40] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role.replace('-', ' ')}</p>
            </div>
            <div className="w-8 h-8 bg-[#0C0649] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name.charAt(0)}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}