import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Bluetooth as Tooth, Building2, Calendar, Clock, Search, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface Plan {
  id: string;
  name: string;
  premium: number;
  deductible: number;
  annualMax: number;
  coverage: {
    preventive: string;
    basic: string;
    major: string;
    ortho: string;
  };
}

const plans: Plan[] = [
  {
    id: '1',
    name: 'Premium Dental',
    premium: 45,
    deductible: 50,
    annualMax: 2000,
    coverage: {
      preventive: '100%',
      basic: '80%',
      major: '50%',
      ortho: '50% up to $1,500',
    },
  },
  {
    id: '2',
    name: 'Standard Dental',
    premium: 30,
    deductible: 100,
    annualMax: 1500,
    coverage: {
      preventive: '100%',
      basic: '70%',
      major: '40%',
      ortho: 'Not covered',
    },
  },
  {
    id: '3',
    name: 'Basic Dental',
    premium: 20,
    deductible: 150,
    annualMax: 1000,
    coverage: {
      preventive: '80%',
      basic: '60%',
      major: '30%',
      ortho: 'Not covered',
    },
  },
];

export const Dental: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const currentPlan = plans[0]; // Using Premium Dental as current plan

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Dental Benefits
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.teal + '15' }}
            >
              <Tooth 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.teal }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Current Plan
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Premium Dental
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
                Next Cleaning Due
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                April 15, 2024
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
                Annual Maximum Remaining
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $1,750
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
                      Annual Maximum: ${currentPlan.annualMax.toLocaleString()}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Preventive Care
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.preventive}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Basic Services
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.basic}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Major Services
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.major}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Orthodontia
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.ortho}
                    </p>
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
                <Search className="w-5 h-5" />
                Find a Dentist
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Building2 className="w-5 h-5" />
                Dental Offices
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Clock className="w-5 h-5" />
                Treatment History
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Need Help?
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Contact our dental benefits team for assistance.
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dental Support
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                1-800-555-0124
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                dental@company.com
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};