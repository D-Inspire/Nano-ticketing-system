import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Lock, Palette } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#0C0649] text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#0C0649]'
                  }`}
                  whileHover={{ x: activeTab === tab.id ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                      defaultValue="John Admin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                      defaultValue="admin@company.com"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0C0649] text-white rounded-md hover:bg-[#0a0540] transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">New Ticket Alerts</h4>
                      <p className="text-sm text-gray-500">Get notified when new tickets are created</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Status Updates</h4>
                      <p className="text-sm text-gray-500">Notifications for ticket status changes</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#0C0649] text-white rounded-md hover:bg-[#0a0540] transition-colors">
                  Update Password
                </button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Appearance Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="radio" name="theme" value="light" defaultChecked className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Light</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="theme" value="dark" className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Dark</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="theme" value="auto" className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Auto</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
                      <p className="text-sm text-gray-500">Use less spacing in the interface</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}