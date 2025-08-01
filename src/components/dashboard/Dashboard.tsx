import React from 'react';
import { motion } from 'framer-motion';
import { 
  TicketIcon, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import StatsCard from './StatsCard';
import RecentTickets from './RecentTickets';
import ActivityFeed from './ActivityFeed';

export default function Dashboard() {
  const { tickets, users, notifications } = useAppStore();

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'new').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    paused: tickets.filter(t => t.status === 'paused').length,
    urgent: tickets.filter(t => t.level === 'urgent').length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your tickets.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        variants={itemVariants}
      >
        <StatsCard
          title="Total Tickets"
          value={stats.total}
          icon={TicketIcon}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatsCard
          title="New"
          value={stats.new}
          icon={Clock}
          color="bg-yellow-500"
          trend="+5%"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={TrendingUp}
          color="bg-blue-600"
          trend="+8%"
        />
        <StatsCard
          title="Paused"
          value={stats.paused}
          icon={AlertTriangle}
          color="bg-orange-500"
          trend="-3%"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="bg-green-500"
          trend="+15%"
        />
        <StatsCard
          title="Urgent"
          value={stats.urgent}
          icon={AlertTriangle}
          color="bg-red-500"
          trend="+2%"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <RecentTickets />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ActivityFeed />
        </motion.div>
      </div>
    </motion.div>
  );
}