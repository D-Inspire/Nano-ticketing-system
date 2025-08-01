import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Bell, Ticket, User, Building2 } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export default function ActivityFeed() {
  const { notifications } = useAppStore();
  
  const recentNotifications = notifications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const getIcon = (type: string) => {
    switch (type) {
      case 'ticket':
        return Ticket;
      case 'user':
        return User;
      case 'department':
        return Building2;
      default:
        return Bell;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {recentNotifications.map((notification, index) => {
          const Icon = getIcon(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              className="px-6 py-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 p-2 rounded-full ${
                  notification.isRead ? 'bg-gray-100' : 'bg-[#E08D40] bg-opacity-20'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    notification.isRead ? 'text-gray-400' : 'text-[#E08D40]'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${
                    notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'
                  }`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(new Date(notification.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="flex-shrink-0 w-2 h-2 bg-[#E08D40] rounded-full"></div>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {recentNotifications.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            <Bell className="mx-auto h-12 w-12 text-gray-300 mb-2" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}