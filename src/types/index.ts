export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sub-admin';
  departmentId?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  phone: string;
  email: string;
  companySection: string;
  source: string;
  dateFiled: Date;
  subject: string;
  message: string;
  recommendation?: string;
  level: 'urgent' | 'high' | 'medium' | 'casual';
  status: 'new' | 'in-progress' | 'paused' | 'completed';
  departmentId: string;
  assignedUserId?: string;
  createdBy: string;
  autoEmail: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketActivity {
  id: string;
  ticketId: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
}

export interface EmailThread {
  id: string;
  ticketId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Notification {
  id: string;
  type: 'email' | 'ticket' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface CompanySection {
  id: string;
  name: string;
}

export interface TicketSource {
  id: string;
  name: string;
}