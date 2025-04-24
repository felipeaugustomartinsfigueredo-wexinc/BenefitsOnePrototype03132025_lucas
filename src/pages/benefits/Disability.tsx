import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Shield, Calendar, Clock, FileText, DollarSign, HelpCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface Plan {
  id: string;
  name: string;
  type: 'STD' | 'LTD';
  premium: number;
  coverage: {
    percentage: number;
    maxBenefit: number;
    eliminationPeriod: string;
    duration: string;
  };
  features: string[];
}

const plans: Plan[] = [
  {
    id: '1',
    name: 'Short-Term Disability',
    type: 'STD',
    premium: 25,
    coverage: {
      percentage: 60,
      maxBenefit: 1500,
      eliminationPeriod: '7 days',
      duration: '26 weeks',
    },
    features: [
      'Weekly benefit payments',
      'Partial disability benefits',
      'Rehabilitation services',
      'Guaranteed issue coverage',
    ],
  },
  {
    id: '2',
    name: 'Long-Term Disability',
    type: 'LTD',
    premium: 35,
    coverage: {
      percentage: 60,
      maxBenefit: 10000,
      eliminationPeriod: '180 days',
      duration: 'To age 65',
    },
    features: [
      'Monthly benefit payments',
      'Cost of living adjustments',
      'Survivor benefits',
      'Return to work incentives',
    ],
  },
];

export const Disability: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const currentPlan = plans[0]; // Using Short-Term Disability as current plan

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Disability Benefits
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.teal + '15' }}
            >
              <Shield 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.teal }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Coverage Type
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                STD & LTD
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
                Effective Date
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                March 1, 2025
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
              <DollarSign 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.lightBlue }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Monthly Premium
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $60.00
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My Plan
            </h2>

            <div className="space-y-6">
              <div
                className={`p-6 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentPlan.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.percentage}% of salary up to ${currentPlan.coverage.maxBenefit}/month
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${currentPlan.premium}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      per month
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Elimination Period
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentPlan.coverage.eliminationPeriod}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Benefit Duration
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentPlan.coverage.duration}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Plan Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {currentPlan.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full mt-6">
                  Change Plan
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h2>
            <div className="space-y-4">
              <Button variant="secondary" className="w-full justify-start">
                <FileText className="w-5 h-5" />
                File a Claim
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Clock className="w-5 h-5" />
                Claim Status
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <HelpCircle className="w-5 h-5" />
                FAQs
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Need Help?
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Contact our disability benefits team for assistance.
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Disability Support
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                1-800-555-0127
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                disability@company.com
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};