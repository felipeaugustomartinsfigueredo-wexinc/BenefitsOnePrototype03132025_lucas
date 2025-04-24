import React, { useState } from 'react';
import { Activity, Heart, Shield, DollarSign, Calendar, Users, FileText, Clock, Settings } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { WidgetType, useDashboardStore } from '../../store/useDashboardStore';
import { Card } from '../ui/Card';

interface WidgetOption {
  type: WidgetType;
  titleKey: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface DashboardWidgetProps {
  id: string;
  type: WidgetType;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({ id, type }) => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const { updateWidget } = useDashboardStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const widgetOptions: WidgetOption[] = [
    {
      type: 'healthScore',
      titleKey: 'dashboard.metrics.healthScore.title',
      value: t('dashboard.metrics.healthScore.value', { score: 85 }),
      icon: <Activity className="w-5 h-5" style={{ color: theme.colors.primary.teal }} />,
      color: theme.colors.primary.teal,
    },
    {
      type: 'activeBenefits',
      titleKey: 'dashboard.metrics.activeBenefits.title',
      value: t('dashboard.metrics.activeBenefits.value', { count: 4 }),
      icon: <Shield className="w-5 h-5" style={{ color: theme.colors.primary.lightBlue }} />,
      color: theme.colors.primary.lightBlue,
    },
    {
      type: 'healthClaims',
      titleKey: 'dashboard.metrics.healthClaims.title',
      value: t('dashboard.metrics.healthClaims.value', { count: 2 }),
      icon: <Heart className="w-5 h-5" style={{ color: theme.colors.primary.red }} />,
      color: theme.colors.primary.red,
    },
    {
      type: 'fsaBalance',
      titleKey: 'dashboard.metrics.fsaBalance.title',
      value: t('dashboard.metrics.fsaBalance.value', { amount: '2,450' }),
      icon: <DollarSign className="w-5 h-5" style={{ color: theme.colors.primary.yellow }} />,
      color: theme.colors.primary.yellow,
    },
    {
      type: 'hsaBalance',
      titleKey: 'dashboard.metrics.hsaBalance.title',
      value: '$3,250.00',
      icon: <DollarSign className="w-5 h-5" style={{ color: theme.colors.primary.teal }} />,
      color: theme.colors.primary.teal,
    },
    {
      type: 'nextAppointment',
      titleKey: 'dashboard.metrics.nextAppointment.title',
      value: 'March 12, 2025',
      icon: <Calendar className="w-5 h-5" style={{ color: theme.colors.primary.lightBlue }} />,
      color: theme.colors.primary.lightBlue,
    },
    {
      type: 'dependentCount',
      titleKey: 'dashboard.metrics.dependentCount.title',
      value: '3 Dependents',
      icon: <Users className="w-5 h-5" style={{ color: theme.colors.primary.yellow }} />,
      color: theme.colors.primary.yellow,
    },
    {
      type: 'claimsInProgress',
      titleKey: 'dashboard.metrics.claimsInProgress.title',
      value: '5 Claims',
      icon: <FileText className="w-5 h-5" style={{ color: theme.colors.primary.red }} />,
      color: theme.colors.primary.red,
    },
  ];

  const currentWidget = widgetOptions.find(w => w.type === type) || widgetOptions[0];

  return (
    <Card className="relative group">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        <Settings className="w-4 h-4" />
      </button>

      {isMenuOpen && (
        <div 
          className={`absolute top-10 right-2 w-56 rounded-lg shadow-lg z-10 ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          } border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
        >
          <div className="p-1">
            {widgetOptions.map((option) => (
              <button
                key={option.type}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
                  isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                } ${option.type === type ? 
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-100' 
                  : ''
                }`}
                onClick={() => {
                  updateWidget(id, option.type);
                  setIsMenuOpen(false);
                }}
              >
                {React.cloneElement(option.icon as React.ReactElement, { 
                  className: 'w-4 h-4',
                })}
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {t(option.titleKey)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: currentWidget.color + '15' }}
        >
          {currentWidget.icon}
        </div>
        <div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t(currentWidget.titleKey)}
          </p>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {currentWidget.value}
          </p>
        </div>
      </div>
    </Card>
  );
};