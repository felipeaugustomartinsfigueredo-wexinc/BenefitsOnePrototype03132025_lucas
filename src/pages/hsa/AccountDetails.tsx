import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { DollarSign, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-03-10',
    description: 'Employer Contribution',
    amount: 250.00,
    type: 'deposit',
  },
  {
    id: '2',
    date: '2025-03-05',
    description: 'CVS Pharmacy',
    amount: -45.99,
    type: 'payment',
  },
  {
    id: '3',
    date: '2025-02-28',
    description: 'Payroll Contribution',
    amount: 100.00,
    type: 'deposit',
  },
  {
    id: '4',
    date: '2025-02-15',
    description: 'Dental Care Payment',
    amount: -150.00,
    type: 'withdrawal',
  },
];

export const AccountDetails: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('hsa.account.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.teal + '15' }}
            >
              <DollarSign 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.teal }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('hsa.account.balance')}
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $3,250.00
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.lightBlue + '15' }}
            >
              <TrendingUp 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.lightBlue }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('hsa.account.ytdContributions')}
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $1,850.00
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.yellow + '15' }}
            >
              <Calendar 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.yellow }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('hsa.account.remainingLimit')}
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $5,150.00
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('hsa.account.recentTransactions')}
          </h2>
          <Badge variant="info" className="text-sm">
            Last 30 Days
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <th className="text-left pb-4 font-normal">Date</th>
                <th className="text-left pb-4 font-normal">Description</th>
                <th className="text-right pb-4 font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} last:border-0`}
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4">{transaction.description}</td>
                  <td className={`py-4 text-right ${
                    transaction.amount > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};