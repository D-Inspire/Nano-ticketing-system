import React from 'react';
import { useAuthStore } from './store/authStore';
import { useAppStore } from './store/appStore';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import TicketList from './components/tickets/TicketList';
import UserManagement from './components/management/UserManagement';
import DepartmentManagement from './components/management/DepartmentManagement';
import SubAdminManagement from './components/management/SubAdminManagement';
import EmailCenter from './components/email/EmailCenter';
import Settings from './components/settings/Settings';
import LoginForm from './components/auth/LoginForm';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { currentView } = useAppStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tickets':
        return <TicketList />;
      case 'email':
        return <EmailCenter />;
      case 'users':
        return (
          <ProtectedRoute adminOnly>
            <UserManagement />
          </ProtectedRoute>
        );
      case 'departments':
        return (
          <ProtectedRoute adminOnly>
            <DepartmentManagement />
          </ProtectedRoute>
        );
      case 'sub-admins':
        return (
          <ProtectedRoute adminOnly>
            <SubAdminManagement />
          </ProtectedRoute>
        );
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        {renderCurrentView()}
      </Layout>
    </ProtectedRoute>
  );
}

export default App;