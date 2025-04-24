import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Search, Clock, FileText, BarChart, PieChart, TrendingUp, Users, MoreVertical, Check, X, Plus } from 'lucide-react';

interface Subscription {
  id: string;
  reportName: string;
  category: 'enrollment' | 'financial' | 'utilization' | 'demographic';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  format: 'pdf' | 'excel' | 'csv';
  recipients: string[];
  nextRun: string;
  status: 'active' | 'paused';
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    reportName: 'Enrollment Summary',
    category: 'enrollment',
    frequency: 'weekly',
    format: 'pdf',
    recipients: ['john.doe@example.com', 'jane.smith@example.com'],
    nextRun: '2024-03-25T09:00:00',
    status: 'active',
  },
  {
    id: '2',
    reportName: 'Premium Analysis',
    category: 'financial',
    frequency: 'monthly',
    format: 'excel',
    recipients: ['finance@example.com'],
    nextRun: '2024-04-01T08:00:00',
    status: 'active',
  },
  {
    id: '3',
    reportName: 'Claims Utilization',
    category: 'utilization',
    frequency: 'daily',
    format: 'excel',
    recipients: ['claims@example.com', 'analytics@example.com'],
    nextRun: '2024-03-22T07:00:00',
    status: 'paused',
  },
  {
    id: '4',
    reportName: 'Demographic Distribution',
    category: 'demographic',
    frequency: 'quarterly',
    format: 'pdf',
    recipients: ['hr@example.com'],
    nextRun: '2024-06-01T09:00:00',
    status: 'active',
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'enrollment':
      return <Users className="w-4 h-4" />;
    case 'financial':
      return <TrendingUp className="w-4 h-4" />;
    case 'utilization':
      return <BarChart className="w-4 h-4" />;
    case 'demographic':
      return <PieChart className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export const ReportSubscriptions: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.recipients.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || subscription.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || subscription.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return isDarkMode
          ? 'bg-green-900/30 text-green-400'
          : 'bg-green-50 text-green-700';
      case 'paused':
        return isDarkMode
          ? 'bg-yellow-900/30 text-yellow-400'
          : 'bg-yellow-50 text-yellow-700';
      default:
        return isDarkMode
          ? 'bg-gray-900/30 text-gray-400'
          : 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Report Subscriptions
        </h1>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: theme.colors.primary.teal }}
        >
          <Plus className="w-4 h-4" />
          Add Subscription
        </button>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm`}>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border w-full ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-200 focus:ring-2 focus:ring-teal-500'
                } focus:outline-none transition-all duration-300`}
              />
              <Search className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Categories</option>
              <option value="enrollment">Enrollment</option>
              <option value="financial">Financial</option>
              <option value="utilization">Utilization</option>
              <option value="demographic">Demographic</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {getCategoryIcon(subscription.category)}
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {subscription.reportName}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {subscription.category.charAt(0).toUpperCase() + subscription.category.slice(1)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-1">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Frequency
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                        {subscription.frequency}
                      </p>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Format
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} uppercase`}>
                        {subscription.format}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Recipients
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {subscription.recipients.map((recipient, index) => (
                          <span
                            key={index}
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              isDarkMode
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {recipient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Next Run
                      </p>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(subscription.nextRun).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusClass(subscription.status)}`}>
                        {subscription.status === 'active' ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </div>

                    <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};