import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Heart, Stethoscope, Building2, Clock, Calendar, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface Plan {
  id: string;
  name: string;
  type: string;
  premium: number;
  deductible: number;
  outOfPocket: number;
  coverage: string[];
}

const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Premium PPO',
    type: 'PPO',
    premium: 250,
    deductible: 1000,
    outOfPocket: 3000,
    coverage: [
      'Primary Care: $20 copay',
      'Specialist: $40 copay',
      'Emergency Room: $250 copay',
      'Hospitalization: 10% after deductible',
      'Prescription Drugs: $10/$30/$50 copays',
    ],
  },
  {
    id: '2',
    name: 'Standard PPO',
    type: 'PPO',
    premium: 150,
    deductible: 2000,
    outOfPocket: 4000,
    coverage: [
      'Primary Care: $30 copay',
      'Specialist: $50 copay',
      'Emergency Room: $300 copay',
      'Hospitalization: 20% after deductible',
      'Prescription Drugs: $15/$35/$60 copays',
    ],
  },
  {
    id: '3',
    name: 'High Deductible',
    type: 'HDHP',
    premium: 75,
    deductible: 3000,
    outOfPocket: 6000,
    coverage: [
      'Primary Care: Deductible then $0',
      'Specialist: Deductible then $0',
      'Emergency Room: Deductible then $0',
      'Hospitalization: Deductible then $0',
      'Prescription Drugs: Deductible then $10/$30/$50',
    ],
  },
];

export const Medical: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const currentPlan = mockPlans[0]; // Using Premium PPO as current plan

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Medical Benefits
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
                Current Plan
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Premium PPO
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
                Next Renewal
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                December 31, 2025
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
              <Clock 
                className="w-6 h-6"
                style={{ color: theme.colors.primary.lightBlue }}
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Enrollment Status
              </p>
              <Badge variant="success" className="mt-1">
                Active
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
                      {currentPlan.type}
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
                      Deductible
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${currentPlan.deductible.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Out of Pocket Max
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${currentPlan.outOfPocket.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {currentPlan.coverage.map((item, index) => (
                    <div
                      key={index}
                      className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      • {item}
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4">
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
                <Stethoscope className="w-5 h-5" />
                Find a Doctor
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Building2 className="w-5 h-5" />
                Locate Facilities
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <DollarSign className="w-5 h-5" />
                Cost Estimator
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Need Help?
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Contact our benefits team for assistance with your medical coverage.
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Benefits Support
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                1-800-555-0123
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                benefits@company.com
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};