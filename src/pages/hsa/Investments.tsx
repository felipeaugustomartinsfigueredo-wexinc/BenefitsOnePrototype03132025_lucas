import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { TrendingUp, PieChart, BarChart, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  price: number;
  change: number;
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Total Stock Market Index',
    symbol: 'VTSAX',
    shares: 25.345,
    price: 123.45,
    change: 2.5,
  },
  {
    id: '2',
    name: 'International Stock Index',
    symbol: 'VTIAX',
    shares: 15.678,
    price: 89.67,
    change: -1.2,
  },
  {
    id: '3',
    name: 'Total Bond Market Index',
    symbol: 'VBTLX',
    shares: 30.123,
    price: 45.78,
    change: 0.8,
  },
  {
    id: '4',
    name: 'Growth Index Fund',
    symbol: 'VIGAX',
    shares: 10.456,
    price: 156.89,
    change: 3.1,
  },
];

export const Investments: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('hsa.investments.title')}
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
                {t('hsa.investments.portfolioValue')}
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $8,750.32
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
                {t('hsa.investments.returns')}
              </p>
              <Badge variant="success" className="mt-1">
                +12.5%
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.yellow + '15' }}
            >
              <PieChart 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.yellow }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('hsa.investments.allocation')}
              </p>
              <div className="flex gap-2 mt-1">
                <Badge variant="info">Stocks 70%</Badge>
                <Badge variant="success">Bonds 30%</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('hsa.investments.holdings')}
          </h2>
          <Badge variant="info" className="text-sm">
            Real-Time
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <th className="text-left pb-4 font-normal">Fund Name</th>
                <th className="text-left pb-4 font-normal">Symbol</th>
                <th className="text-right pb-4 font-normal">Shares</th>
                <th className="text-right pb-4 font-normal">Price</th>
                <th className="text-right pb-4 font-normal">Value</th>
                <th className="text-right pb-4 font-normal">Change</th>
              </tr>
            </thead>
            <tbody>
              {mockInvestments.map((investment) => (
                <tr 
                  key={investment.id}
                  className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} last:border-0`}
                >
                  <td className="py-4">{investment.name}</td>
                  <td className="py-4">
                    <span className="font-mono">{investment.symbol}</span>
                  </td>
                  <td className="py-4 text-right">{investment.shares.toFixed(3)}</td>
                  <td className="py-4 text-right">${investment.price.toFixed(2)}</td>
                  <td className="py-4 text-right">
                    ${(investment.shares * investment.price).toFixed(2)}
                  </td>
                  <td className={`py-4 text-right ${
                    investment.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {investment.change > 0 ? '+' : ''}{investment.change}%
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