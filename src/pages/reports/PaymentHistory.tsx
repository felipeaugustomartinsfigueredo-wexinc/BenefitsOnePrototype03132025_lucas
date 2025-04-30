import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Search, Download, Calendar, CheckCircle2, XCircle, Clock, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

interface Payment {
  id: string;
  date: string;
  amount: number;
  coveragePeriod: string;
  status: 'paid' | 'pending' | 'failed';
  method: string;
  receiptUrl?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    date: '2025-03-01',
    amount: 875.00,
    coveragePeriod: 'March 2025',
    status: 'paid',
    method: 'Visa ending in 4242',
    receiptUrl: '#',
  },
  {
    id: '2',
    date: '2025-02-01',
    amount: 875.00,
    coveragePeriod: 'February 2025',
    status: 'paid',
    method: 'Visa ending in 4242',
    receiptUrl: '#',
  },
  {
    id: '3',
    date: '2025-01-01',
    amount: 875.00,
    coveragePeriod: 'January 2025',
    status: 'paid',
    method: 'Bank transfer',
    receiptUrl: '#',
  },
  {
    id: '4',
    date: '2024-12-01',
    amount: 850.00,
    coveragePeriod: 'December 2024',
    status: 'paid',
    method: 'Bank transfer',
    receiptUrl: '#',
  },
  {
    id: '5',
    date: '2024-11-15',
    amount: 850.00,
    coveragePeriod: 'November 2024',
    status: 'failed',
    method: 'Visa ending in 4242',
  },
];

export const PaymentHistory: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'error';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      default:
        return <XCircle className="w-3 h-3" />;
    }
  };

  const filteredPayments = mockPayments.filter(payment =>
    payment.coveragePeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className={`text-2xl sm:text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment History
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <Input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>
          </div>

          {/* Mobile View */}
          <div className="space-y-4 sm:hidden">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {new Date(payment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(payment.status)}
                    icon={getStatusIcon(payment.status)}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Coverage Period
                    </p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {payment.coveragePeriod}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Payment Method
                    </p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {payment.method}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Amount
                    </p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${payment.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {payment.receiptUrl && (
                  <button
                    onClick={() => window.open(payment.receiptUrl, '_blank')}
                    className={`w-full mt-4 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <th className="text-left pb-4 font-normal">Date</th>
                  <th className="text-left pb-4 font-normal">Coverage Period</th>
                  <th className="text-left pb-4 font-normal">Method</th>
                  <th className="text-right pb-4 font-normal">Amount</th>
                  <th className="text-center pb-4 font-normal">Status</th>
                  <th className="text-right pb-4 font-normal">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr 
                    key={payment.id}
                    className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} last:border-0`}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4">{payment.coveragePeriod}</td>
                    <td className="py-4">{payment.method}</td>
                    <td className="py-4 text-right">${payment.amount.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex justify-center">
                        <Badge
                          variant={getStatusBadgeVariant(payment.status)}
                          icon={getStatusIcon(payment.status)}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      {payment.receiptUrl && (
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          onClick={() => window.open(payment.receiptUrl, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className={`p-4 rounded-lg flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Paid (YTD)
            </p>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign className="w-5 h-5" style={{ color: theme.colors.primary.teal }} />
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                2,625.00
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Next Payment Due
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-5 h-5" style={{ color: theme.colors.primary.yellow }} />
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                March 15, 2025
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Amount Due
            </p>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign className="w-5 h-5" style={{ color: theme.colors.primary.red }} />
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                875.00
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};