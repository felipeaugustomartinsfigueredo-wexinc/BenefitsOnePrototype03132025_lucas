import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Heart, Stethoscope, Building2, Clock, Calendar, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useTranslation } from 'react-i18next';

interface Plan {
  id: string;
  nameKey: string;
  type: string;
  status: 'active' | 'draft' | 'archived';
  effectiveDate: string;
  enrollmentCount: number;
  premium: {
    individual: number;
    family: number;
  };
  coverage: string[];
}

const mockPlans: Plan[] = [
  {
    id: '1',
    nameKey: 'benefits.medical.plans.premiumPPO',
    type: 'PPO',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 245,
    premium: {
      individual: 250,
      family: 750,
    },
    coverage: [
      'benefits.medical.coverage.primaryCare',
      'benefits.medical.coverage.specialist',
      'benefits.medical.coverage.emergency',
      'benefits.medical.coverage.hospitalization',
      'benefits.medical.coverage.prescription',
    ],
  },
  // ... other plans
];

export const Medical: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const currentPlan = mockPlans[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('benefits.medical.title')}
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
                {t('benefits.medical.currentPlan')}
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t(currentPlan.nameKey)}
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
                {t('benefits.medical.nextRenewal')}
              </p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('benefits.medical.renewalDate')}
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
                {t('benefits.medical.enrollmentStatus')}
              </p>
              <Badge variant="success" className="mt-1">
                {t('benefits.medical.status.active')}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('benefits.medical.myPlan')}
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
                      {t(currentPlan.nameKey)}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentPlan.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${currentPlan.premium.individual}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('benefits.medical.perMonth')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('benefits.medical.deductible')}
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      $1,000
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('benefits.medical.outOfPocket')}
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      $3,000
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {currentPlan.coverage.map((item, index) => (
                    <div
                      key={index}
                      className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      • {t(item)}
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4">
                  {t('benefits.medical.changePlan')}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('benefits.medical.quickLinks')}
            </h2>
            <div className="space-y-4">
              <Button variant="secondary" className="w-full justify-start">
                <Stethoscope className="w-5 h-5" />
                {t('benefits.medical.findDoctor')}
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Building2 className="w-5 h-5" />
                {t('benefits.medical.locateFacilities')}
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <DollarSign className="w-5 h-5" />
                {t('benefits.medical.costEstimator')}
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('benefits.medical.needHelp')}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {t('benefits.medical.helpDescription')}
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('benefits.medical.support')}
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