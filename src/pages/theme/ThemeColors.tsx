import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

export const ThemeColors: React.FC = () => {
  const { theme, updateTheme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();

  const handleColorChange = (colorKey: string, value: string) => {
    updateTheme({
      colors: {
        primary: {
          ...theme.colors.primary,
          [colorKey]: value,
        },
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('theme.colors.title')}
      </h1>
      
      <div className="space-y-6">
        {Object.entries(theme.colors.primary).map(([key, value]) => (
          <Card key={key}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor={key} 
                  className={`text-lg capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {t(`theme.colors.${key.toLowerCase()}`)}
                </label>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: value }}
                  />
                  <Input
                    type="text"
                    id={key}
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-32 font-mono text-sm"
                  />
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
                  <div
                    key={opacity}
                    className="h-8 rounded"
                    style={{ 
                      backgroundColor: value,
                      opacity,
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};