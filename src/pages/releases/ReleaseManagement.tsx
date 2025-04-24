import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, FileText, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { ReleaseNotesModal } from './ReleaseNotesModal';
import { useTranslation } from 'react-i18next';

interface ReleaseNote {
  features: string[];
  bugFixes: string[];
  improvements: string[];
}

interface ModuleVersion {
  id: string;
  moduleName: string;
  currentVersion: string;
  newVersion: string | null;
  releaseDate: string;
  status: 'current' | 'available' | 'scheduled';
  scheduledDate?: string;
  currentVersionNotes?: ReleaseNote;
  newVersionNotes?: ReleaseNote;
}

const mockModules: ModuleVersion[] = [
  {
    id: '1',
    moduleName: 'Home Dashboard',
    currentVersion: '1.2.0',
    newVersion: '1.3.0',
    releaseDate: '2025-03-01',
    status: 'available',
    currentVersionNotes: {
      features: ['Customizable dashboard layout', 'Real-time metrics'],
      bugFixes: ['Fixed metric calculation', 'Resolved data refresh issues'],
      improvements: ['Faster dashboard loading', 'Enhanced widget responsiveness']
    },
    newVersionNotes: {
      features: ['AI-powered insights', 'Personalized recommendations'],
      bugFixes: ['Fixed chart animations', 'Resolved data caching issues'],
      improvements: ['Better performance', 'Enhanced mobile experience']
    }
  },
  {
    id: '2',
    moduleName: 'Benefits Management',
    currentVersion: '2.1.0',
    newVersion: '2.2.0',
    releaseDate: '2025-03-05',
    status: 'scheduled',
    scheduledDate: '2025-03-12T09:00:00',
    currentVersionNotes: {
      features: ['Benefits enrollment wizard', 'Coverage comparison tools'],
      bugFixes: ['Fixed premium calculations', 'Resolved enrollment errors'],
      improvements: ['Streamlined enrollment process', 'Better plan comparisons']
    },
    newVersionNotes: {
      features: ['Cost estimation calculator', 'Smart plan recommendations'],
      bugFixes: ['Fixed dependent validation', 'Resolved coverage gap detection'],
      improvements: ['Faster plan search', 'Enhanced coverage details']
    }
  },
  {
    id: '3',
    moduleName: 'HSA Management',
    currentVersion: '1.5.0',
    newVersion: '1.6.0',
    releaseDate: '2025-03-08',
    status: 'available',
    currentVersionNotes: {
      features: ['Investment portfolio tracking', 'Claims management'],
      bugFixes: ['Fixed balance calculations', 'Resolved transaction history'],
      improvements: ['Better investment tools', 'Enhanced claims process']
    },
    newVersionNotes: {
      features: ['Automated receipt processing', 'Investment recommendations'],
      bugFixes: ['Fixed contribution limits', 'Resolved investment allocations'],
      improvements: ['Faster claims processing', 'Better investment insights']
    }
  },
  {
    id: '4',
    moduleName: 'Dependents',
    currentVersion: '1.1.0',
    newVersion: null,
    releaseDate: '2025-02-01',
    status: 'current',
    currentVersionNotes: {
      features: ['Dependent management', 'Document upload'],
      bugFixes: ['Initial release'],
      improvements: ['Initial release']
    }
  },
  {
    id: '5',
    moduleName: 'Theme Customization',
    currentVersion: '1.0.0',
    newVersion: '1.1.0',
    releaseDate: '2025-03-10',
    status: 'available',
    currentVersionNotes: {
      features: ['Color customization', 'Typography settings'],
      bugFixes: ['Initial release'],
      improvements: ['Initial release']
    },
    newVersionNotes: {
      features: ['Theme presets', 'Advanced color palettes'],
      bugFixes: ['Fixed color contrast', 'Resolved font loading'],
      improvements: ['Better theme preview', 'Enhanced accessibility']
    }
  }
];

export const ReleaseManagement: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [modules] = useState<ModuleVersion[]>(mockModules);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedReleaseNotes, setSelectedReleaseNotes] = useState<{
    version: string;
    notes: ReleaseNote;
  } | null>(null);

  const handleSchedule = (moduleId: string) => {
    if (!selectedDate || !selectedTime) return;

    const scheduledDateTime = `${selectedDate}T${selectedTime}:00`;
    const now = new Date();
    const scheduled = new Date(scheduledDateTime);
    const maxDate = new Date(modules.find(m => m.id === moduleId)!.releaseDate);
    maxDate.setDate(maxDate.getDate() + 14);

    if (scheduled <= now) {
      alert('Scheduled time must be in the future');
      return;
    }

    if (scheduled > maxDate) {
      alert('Cannot schedule more than 14 days from release date');
      return;
    }

    setSelectedDate('');
    setSelectedTime('');
    setActiveModule(null);
  };

  const handleViewReleaseNotes = (version: string, notes: ReleaseNote) => {
    setSelectedReleaseNotes({ version, notes });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('releases.title')}
        </h1>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm`}>
        <div className="p-6">
          <div className="space-y-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {module.moduleName}
                      </h3>
                      <span 
                        className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                          module.status === 'current' 
                            ? isDarkMode
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-green-50 text-green-700'
                            : module.status === 'scheduled'
                            ? isDarkMode
                              ? 'bg-blue-900/30 text-blue-400'
                              : 'bg-blue-50 text-blue-700'
                            : isDarkMode
                              ? 'bg-yellow-900/30 text-yellow-400'
                              : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {module.status === 'current' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {t(`releases.table.${module.status}`)}
                        {module.status === 'scheduled' && (
                          <span className="ml-1">
                            ({new Date(module.scheduledDate!).toLocaleString()})
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Current:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-mono">{module.currentVersion}</span>
                          {module.currentVersionNotes && (
                            <button
                              onClick={() => handleViewReleaseNotes(module.currentVersion, module.currentVersionNotes!)}
                              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
                            >
                              <FileText className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {module.newVersion && (
                        <>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center gap-2">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>New:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono">{module.newVersion}</span>
                              {module.newVersionNotes && (
                                <button
                                  onClick={() => handleViewReleaseNotes(module.newVersion!, module.newVersionNotes!)}
                                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
                                >
                                  <FileText className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(module.releaseDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {module.newVersion && module.status === 'available' && (
                    <div className="flex items-center gap-2">
                      {activeModule === module.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={`px-2 py-1 border rounded-md text-sm ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-200'
                            }`}
                            min={new Date().toISOString().split('T')[0]}
                            max={new Date(new Date(module.releaseDate).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          />
                          <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className={`px-2 py-1 border rounded-md text-sm ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-200'
                            }`}
                          />
                          <button
                            onClick={() => handleSchedule(module.id)}
                            className="p-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: theme.colors.primary.navy }}
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setActiveModule(null)}
                            className="p-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: theme.colors.primary.red }}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: theme.colors.primary.teal }}
                          >
                            {t('releases.actions.activateNow')}
                          </button>
                          <button
                            onClick={() => setActiveModule(module.id)}
                            className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: theme.colors.primary.navy }}
                          >
                            {t('releases.actions.schedule')}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedReleaseNotes && (
        <ReleaseNotesModal
          version={selectedReleaseNotes.version}
          notes={selectedReleaseNotes.notes}
          onClose={() => setSelectedReleaseNotes(null)}
        />
      )}
    </div>
  );
};