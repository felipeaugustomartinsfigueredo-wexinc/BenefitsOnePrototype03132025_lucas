import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const demoEmails = [
  'internal_admin@demo.com',
  'internal_user@demo.com',
  'broker_admin@demo.com',
  'broker_user@demo.com',
  'tpa_admin@demo.com',
  'tpa_user@demo.com',
  'employer_admin@demo.com',
  'employer_user@demo.com',
  'consumer_user@demo.com',
  'consumer_dependent@demo.com',
  'consumer_beneficiary@demo.com'
];

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(demoEmails[0]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme, isDarkMode } = useThemeStore();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch  {
      setError(t('auth.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
        <div className="text-center mb-8">
          <h1 
            className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ color: theme.colors.primary.navy }}
          >
            {t('auth.welcomeBack')}
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('auth.loginToContinue')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
            >
              {t('auth.email')}
            </label>
            <select
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            >
              {demoEmails.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
            >
              {t('auth.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-200 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder={t('auth.passwordPlaceholder')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-2.5 p-1 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: theme.colors.primary.teal }}
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? t('auth.loggingIn') : t('auth.login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {t('auth.demoCredentials')}
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
};