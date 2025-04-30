import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ThemeLogo: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoUrl) {
      setError(t('theme.logo.invalidUrl'));
      return;
    }
    // Here you would typically validate the URL and update the logo
    // For now, we'll just show a preview
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('theme.logo.title')}
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="logoUrl" 
              className={`block text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('theme.logo.logoUrl')}
            </label>
            <Input
              type="url"
              id="logoUrl"
              value={logoUrl}
              onChange={handleUrlChange}
              placeholder={t('theme.logo.urlPlaceholder')}
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>

          <div className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={t('theme.logo.preview')} 
                className="max-w-full max-h-40 object-contain"
                onError={() => setError(t('theme.logo.invalidUrl'))}
              />
            ) : (
              <>
                <Upload className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {t('theme.logo.dropzone')}
                </p>
              </>
            )}
          </div>

          <Button type="submit">
            {t('theme.logo.updateLogo')}
          </Button>
        </form>
      </Card>
    </div>
  );
};