import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Heart, Shield, Calendar, FileText, DollarSign, Calculator } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface Plan {
  id: string;
  name: string;
  premium: number;
  coverage: number;
  features: string[];
  additionalBenefits: string[];
}

const plans: Plan[] = [
  {
    id: '1',
    name: 'Basic Life',
    premium: 0,
    coverage: 50000,
    features: [
      'Company-paid coverage',
      'No medical exam required',
      'Coverage continues during employment',
    ],
    additionalBenefits: [
      'Accelerated death benefit',
      'Conversion privilege',
      'Portability options',
    ],
  },
  {
    id: '2',
    name: 'Supplemental Life',
    premium: 0.15,
    coverage: 100000,
    features: [
      'Employee-paid coverage',
      'Simplified underwriting',
      'Flexible coverage amounts',
    ],
    additionalBenefits: [
      'AD&D coverage included',
      'Will preparation services',
      'Travel assistance',
    ],
  },
  {
    id: '3',
    name: 'Dependent Life',
    premium: 0.10,
    coverage: 25000,
    features: [
      'Coverage for spouse and children',
      'Guaranteed issue amounts',
      'Easy payroll deduction',
    ],
    additionalBenefits: [
      'Child coverage to age 26',
      'Spouse coverage options',
      'Family support services',
    ],
  },
];

export const LifeInsurance: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const currentPlan = plans[0]; // Using Basic Life as current plan

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Life Insurance Benefits
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.teal + '15' }}
            >
              <Heart 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.teal }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Current Coverage
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $150,000
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
                Next Review Date
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                December 15, 2025
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
              <Badge variant="success" className="mt-1">
                Free
              </Badge>
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
                      Coverage: ${currentPlan.coverage.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentPlan.premium === 0 ? 'Free' : `$${currentPlan.premium}/month`}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      per $1,000 of coverage
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
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
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Additional Benefits
                    </h4>
                    <ul className="space-y-2">
                      {currentPlan.additionalBenefits.map((benefit, index) => (
                        <li
                          key={index}
                          className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                <Calculator className="w-5 h-5" />
                Coverage Calculator
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <FileText className="w-5 h-5" />
                Policy Documents
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <DollarSign className="w-5 h-5" />
                Premium Calculator
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Need Help?
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Contact our life insurance team for assistance.
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Life Insurance Support
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                1-800-555-0126
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                life@company.com
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};