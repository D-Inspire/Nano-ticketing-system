import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Ticket, 
  Users, 
  Building2, 
  UserPlus, 
  Mail,
  X,
  Settings
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

const navigation = [
  { name: 'Dashboard', icon: Home, id: 'dashboard', adminOnly: false },
  { name: 'Tickets', icon: Ticket, id: 'tickets', adminOnly: false },
  { name: 'Email', icon: Mail, id: 'email', adminOnly: false },
  { name: 'Users', icon: Users, id: 'users', adminOnly: true },
  { name: 'Departments', icon: Building2, id: 'departments', adminOnly: true },
  { name: 'Sub-Admins', icon: UserPlus, id: 'sub-admins', adminOnly: true },
  { name: 'Settings', icon: Settings, id: 'settings', adminOnly: false },
];

export default function Sidebar() {
  const { user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen, currentView, setCurrentView } = useAppStore();

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-50 lg:z-30 ${
          sidebarOpen ? 'block' : 'hidden lg:block'
        }`}
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        initial={false}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-[#0C0649]">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-600 hover:text-[#0C0649] hover:bg-gray-100 rounded-md"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0C0649] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#0C0649]'
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon 
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`} 
                  />
                  {item.name}
                </motion.button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              © 2025 Ticketing System
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}