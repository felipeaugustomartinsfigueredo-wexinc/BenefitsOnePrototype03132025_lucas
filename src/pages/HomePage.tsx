import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { MarketingCarousel } from '../components/dashboard/MarketingCarousel';
import { NotificationsWidget } from '../components/dashboard/NotificationsWidget';
import { DashboardWidget } from '../components/dashboard/DashboardWidget';
import { useDashboardStore } from '../store/useDashboardStore';
import { Card } from '../components/ui/Card';

export const HomePage: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const { widgets } = useDashboardStore();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('dashboard.title')}
        </h1>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('dashboard.lastUpdated', { date: new Date().toLocaleDateString() })}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-9 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {widgets.map((widget) => (
              <DashboardWidget
                key={widget.id}
                id={widget.id}
                type={widget.type}
              />
            ))}
          </div>
          <Card>
            <MarketingCarousel />
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Card>
            <NotificationsWidget />
          </Card>
        </div>
      </div>
    </div>
  );
};