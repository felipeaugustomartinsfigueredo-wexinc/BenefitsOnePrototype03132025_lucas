import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Download, Calendar, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';

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
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment History
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
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
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Payment Summary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Paid (YTD)
            </p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              $2,625.00
            </p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Next Payment Due
            </p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              $875.00
            </p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Due Date
            </p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              March 15, 2025
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};