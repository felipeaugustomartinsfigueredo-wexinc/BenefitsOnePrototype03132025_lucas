import React from 'react';
import { X } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';

interface ReleaseNote {
  features: string[];
  bugFixes: string[];
  improvements: string[];
}

interface ReleaseNotesModalProps {
  version: string;
  notes: ReleaseNote;
  onClose: () => void;
}

export const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({
  version,
  notes,
  onClose,
}) => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden relative`}>
        <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('releases.notes.title', { version })}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-6">
            <section>
              <h3 
                className="text-lg mb-3 font-bold"
                style={{ color: theme.colors.primary.navy }}
              >
                {t('releases.notes.sections.features')}
              </h3>
              <ul className="space-y-2">
                {notes.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: theme.colors.primary.teal }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 
                className="text-lg mb-3 font-bold"
                style={{ color: theme.colors.primary.navy }}
              >
                {t('releases.notes.sections.bugFixes')}
              </h3>
              <ul className="space-y-2">
                {notes.bugFixes.map((fix, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: theme.colors.primary.red }}
                    />
                    {fix}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 
                className="text-lg mb-3 font-bold"
                style={{ color: theme.colors.primary.navy }}
              >
                {t('releases.notes.sections.improvements')}
              </h3>
              <ul className="space-y-2">
                {notes.improvements.map((improvement, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: theme.colors.primary.yellow }}
                    />
                    {improvement}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};