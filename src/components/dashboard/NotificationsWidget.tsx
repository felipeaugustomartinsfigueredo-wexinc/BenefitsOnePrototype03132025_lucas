import React from 'react';
import { Bell, Calendar, FileText, Heart, AlertCircle } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Benefits Enrollment Deadline',
    message: 'Open enrollment period ends in 5 days. Complete your selections soon.',
    date: '2025-03-10T10:00:00',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New HSA Contribution',
    message: 'Your employer has made a contribution of $250 to your HSA.',
    date: '2025-02-24T14:30:00',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Claim Approved',
    message: 'Your recent medical claim has been approved and processed.',
    date: '2025-02-15T09:15:00',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Wellness Program Update',
    message: 'New wellness challenges are available. Participate to earn rewards.',
    date: '2025-01-22T16:45:00',
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    case 'success':
      return <Heart className="w-4 h-4 text-green-500" />;
    case 'info':
    default:
      return <Bell className="w-4 h-4 text-blue-500" />;
  }
};

export const NotificationsWidget: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Notifications
        </h2>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {notifications.filter(n => !n.read).length} unread
        </span>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-2 sm:p-3 rounded-lg transition-colors ${
              !notification.read
                ? isDarkMode
                  ? 'bg-gray-700/50'
                  : 'bg-gray-50'
                : ''
            }`}
          >
            <div className="flex gap-3">
              <div className={`mt-0.5 p-1 rounded-lg ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-3 py-2 text-center text-sm rounded-lg border transition-colors ${
          isDarkMode
            ? 'border-gray-700 hover:bg-gray-700 text-gray-300'
            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
        }`}
      >
        View All Notifications
      </button>
    </div>
  );
};