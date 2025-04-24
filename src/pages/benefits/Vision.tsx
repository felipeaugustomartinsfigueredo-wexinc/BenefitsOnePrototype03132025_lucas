import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Eye, Building2, Calendar, Clock, Search, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface Plan {
  id: string;
  name: string;
  premium: number;
  examCopay: number;
  lensesCopay: number;
  frameAllowance: number;
  coverage: {
    exam: string;
    lenses: string;
    frames: string;
    contacts: string;
  };
}

const plans: Plan[] = [
  {
    id: '1',
    name: 'Premium Vision',
    premium: 20,
    examCopay: 10,
    lensesCopay: 20,
    frameAllowance: 200,
    coverage: {
      exam: 'Once every 12 months',
      lenses: 'Once every 12 months',
      frames: 'Once every 24 months',
      contacts: '$150 allowance',
    },
  },
  {
    id: '2',
    name: 'Standard Vision',
    premium: 15,
    examCopay: 20,
    lensesCopay: 25,
    frameAllowance: 150,
    coverage: {
      exam: 'Once every 12 months',
      lenses: 'Once every 12 months',
      frames: 'Once every 24 months',
      contacts: '$120 allowance',
    },
  },
  {
    id: '3',
    name: 'Basic Vision',
    premium: 10,
    examCopay: 30,
    lensesCopay: 35,
    frameAllowance: 100,
    coverage: {
      exam: 'Once every 12 months',
      lenses: 'Once every 12 months',
      frames: 'Once every 24 months',
      contacts: '$100 allowance',
    },
  },
];

export const Vision: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const currentPlan = plans[0]; // Using Premium Vision as current plan

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Vision Benefits
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.primary.teal + '15' }}
            >
              <Eye 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.teal }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Current Plan
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Premium Vision
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
                Next Exam Due
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                May 1, 2024
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
                Frame Allowance Remaining
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $200
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
                      Frame Allowance: ${currentPlan.frameAllowance}
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
                      Exam Copay
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${currentPlan.examCopay}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Lenses Copay
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${currentPlan.lensesCopay}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Eye Exam
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.exam}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Lenses
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.lenses}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Frames
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.frames}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact Lenses
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.coverage.contacts}
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
                Find an Eye Doctor
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Building2 className="w-5 h-5" />
                Retail Locations
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Clock className="w-5 h-5" />
                Order History
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Need Help?
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Contact our vision benefits team for assistance.
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Vision Support
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                1-800-555-0125
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                vision@company.com
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};