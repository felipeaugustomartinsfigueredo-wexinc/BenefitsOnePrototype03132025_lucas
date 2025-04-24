import React, { useState, useRef, useEffect } from 'react';
import { Search, Bot, User, Globe, Check } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { ProfileMenu } from './ProfileMenu';
import { GenAIModal } from '../ai/GenAIModal';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'fr', name: 'Français' }
];

export const Header: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsLanguageMenuOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  return (
    <>
      <header className={`h-16 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border-b flex items-center px-6 justify-between fixed w-full top-0 z-[100]`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <img 
              src="/src/assets/images/WEX_red22.png" 
              alt={t('header.logoAlt')}
              className="h-8 w-auto object-contain"
            />
            <div className={`mx-4 h-6 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <span className="text-3xl font-bold" style={{ color: '#C8102E' }}>
              {t('header.appName')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('common.search')}
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-200 focus:ring-2 focus:ring-teal-500'
              } focus:outline-none w-64 transition-all duration-300`}
            />
            <Search className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
          </div>
          
          <div className="relative" ref={languageMenuRef}>
            <button
              className={`p-2 rounded-full flex items-center gap-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-all duration-300`}
              style={{ color: theme.colors.primary.teal }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLanguageMenuOpen(!isLanguageMenuOpen);
              }}
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="true"
            >
              <Globe className="w-6 h-6" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {currentLanguage.name}
              </span>
            </button>

            {isLanguageMenuOpen && (
              <div 
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                } py-1`}
                style={{ zIndex: 1000 }}
                role="menu"
                aria-orientation="vertical"
              >
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`w-full text-left px-4 py-2 flex items-center justify-between ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                    } ${language.code === i18n.language ? 'font-medium' : ''}`}
                    onClick={() => handleLanguageChange(language.code)}
                    role="menuitem"
                  >
                    <span>{language.name}</span>
                    {language.code === i18n.language && (
                      <Check className="w-4 h-4" style={{ color: theme.colors.primary.teal }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-all duration-300`}
            style={{ color: theme.colors.primary.teal }}
            onClick={() => setIsAIModalOpen(true)}
          >
            <Bot className="w-6 h-6" />
          </button>
          
          <div className="relative">
            <button
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-all duration-300`}
              style={{ color: theme.colors.primary.navy }}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <User className="w-6 h-6" />
            </button>
            <ProfileMenu 
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            />
          </div>
        </div>
      </header>

      <GenAIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
    </>
  );
};