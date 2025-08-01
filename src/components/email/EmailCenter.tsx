import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Reply, Archive, Trash2, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../../store/appStore';

export default function EmailCenter() {
  const { emailThreads, notifications } = useAppStore();
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock email threads for demonstration
  const mockThreads = [
    {
      id: '1',
      ticketId: '1',
      from: 'john.doe@email.com',
      to: 'support@company.com',
      subject: 'Re: Login Issues',
      body: 'Thank you for creating the ticket. I am still experiencing login issues.',
      timestamp: new Date(),
      isRead: false,
    },
    {
      id: '2',
      ticketId: '2',
      from: 'jane.smith@email.com',
      to: 'support@company.com',
      subject: 'Re: Payroll Question',
      body: 'I received your response about overtime calculations. Could you provide more details?',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
  ];

  const filteredThreads = mockThreads.filter(thread =>
    thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    // Here you would send the reply
    console.log('Sending reply:', replyText);
    setReplyText('');
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Email Center</h1>
        <p className="text-gray-600 mt-1">Manage email communications and responses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredThreads.map((thread, index) => (
                <motion.div
                  key={thread.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedThread?.id === thread.id ? 'bg-blue-50 border-r-2 border-[#0C0649]' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedThread(thread)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Mail className={`h-4 w-4 ${thread.isRead ? 'text-gray-400' : 'text-[#E08D40]'}`} />
                      <span className={`text-sm font-medium ${
                        thread.isRead ? 'text-gray-600' : 'text-gray-900'
                      }`}>
                        {thread.from}
                      </span>
                    </div>
                    {!thread.isRead && (
                      <div className="w-2 h-2 bg-[#E08D40] rounded-full"></div>
                    )}
                  </div>
                  
                  <h4 className={`text-sm mb-1 ${
                    thread.isRead ? 'text-gray-700' : 'text-gray-900 font-medium'
                  }`}>
                    {thread.subject}
                  </h4>
                  
                  <p className="text-xs text-gray-500 truncate mb-2">
                    {thread.body}
                  </p>
                  
                  <p className="text-xs text-gray-400">
                    {format(new Date(thread.timestamp), 'MMM dd, HH:mm')}
                  </p>
                </motion.div>
              ))}
              
              {filteredThreads.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Mail className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p>No emails found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email Detail & Reply */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <div className="space-y-4">
              {/* Email Detail */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {selectedThread.subject}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>From: {selectedThread.from}</span>
                        <span>To: {selectedThread.to}</span>
                        <span>{format(new Date(selectedThread.timestamp), 'MMM dd, yyyy HH:mm')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="p-2 text-gray-400 hover:text-[#0C0649] hover:bg-gray-100 rounded-md transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Archive"
                      >
                        <Archive className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedThread.body}</p>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 flex items-center">
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </h4>
                </div>
                
                <form onSubmit={handleReply} className="p-4">
                  <div className="mb-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C0649] focus:border-transparent resize-none"
                      placeholder="Type your reply here..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <input type="checkbox" className="h-4 w-4 text-[#0C0649] focus:ring-[#0C0649] border-gray-300 rounded" />
                      <label>Grammar check before sending</label>
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="inline-flex items-center px-4 py-2 bg-[#0C0649] text-white rounded-md font-medium hover:bg-[#0a0540] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C0649] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: replyText.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: replyText.trim() ? 0.98 : 1 }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Reply
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Mail className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Select an Email</h3>
              <p className="text-gray-500">Choose an email from the list to view and reply</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}