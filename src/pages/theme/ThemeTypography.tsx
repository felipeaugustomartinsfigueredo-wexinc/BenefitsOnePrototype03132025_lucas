import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
};

export const ThemeTypography: React.FC = () => {
  const { theme, updateTheme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();

  const handleFontChange = (fontKey: string, value: string) => {
    updateTheme({
      fonts: {
        ...theme.fonts,
        [fontKey]: value,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('theme.typography.title')}
      </h1>

      <div className="space-y-6">
        <Card>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('theme.typography.sections.headings')}
          </h2>
          <div className="space-y-6">
            {Object.entries(fontSizes).reverse().map(([size, value]) => (
              <div key={size} className="space-y-2">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t(`theme.typography.sizes.${size}`)} ({value})
                </p>
                <p 
                  className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontSize: value, lineHeight: 1.2 }}
                >
                  {t('theme.typography.preview')}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('theme.typography.sections.body')}
          </h2>
          <div className="space-y-6">
            {Object.entries(fontWeights).map(([weight, value]) => (
              <div key={weight} className="space-y-2">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t(`theme.typography.weights.${weight}`)} ({value})
                </p>
                <p 
                  className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: value }}
                >
                  {t('theme.typography.preview')}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('theme.typography.sections.monospace')}
          </h2>
          <div className="space-y-2">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Code
            </p>
            <p className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              const message = "Hello, World!";
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};