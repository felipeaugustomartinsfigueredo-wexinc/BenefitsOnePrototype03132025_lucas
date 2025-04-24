import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, CheckCircle2, XCircle, FileText, ChevronRight } from 'lucide-react';

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
  status: 'current' | 'available' | 'scheduled' | 'deactivated';
  scheduledDate?: string;
  currentVersionNotes?: ReleaseNote;
  newVersionNotes?: ReleaseNote;
  isActive: boolean;
  deactivatedDate?: string;
  deactivationReason?: string;
}

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeactivate: (reason: string) => void;
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({ isOpen, onClose, onDeactivate }) => {
  const { isDarkMode } = useThemeStore();
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onDeactivate(reason);
      setReason('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Deactivate Module
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Deactivation Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              rows={3}
              required
              placeholder="Please provide a reason for deactivating this module..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Deactivate
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: string, time: string) => void;
  releaseDate: string;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSchedule, releaseDate }) => {
  const { isDarkMode } = useThemeStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  const maxDate = new Date(releaseDate);
  maxDate.setDate(maxDate.getDate() + 14); // Allow scheduling up to 14 days after release date

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      onSchedule(selectedDate, selectedTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Schedule Release
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

interface ReleaseNotesModalProps {
  version: string;
  notes: ReleaseNote;
  onClose: () => void;
}

const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({ version, notes, onClose }) => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('releases.notes.title', { version })}
          </h2>
          <Button
            variant="secondary"
            icon={<XCircle className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>

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
      </Card>
    </div>
  );
};

const mockModules: ModuleVersion[] = [
  {
    id: '1',
    moduleName: 'Home Dashboard',
    currentVersion: '1.2.0',
    newVersion: '1.3.0',
    releaseDate: '2025-03-01',
    status: 'available',
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
  const [modules, setModules] = useState<ModuleVersion[]>(mockModules);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedReleaseNotes, setSelectedReleaseNotes] = useState<{
    version: string;
    notes: ReleaseNote;
  } | null>(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const handleDeactivate = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setIsDeactivateModalOpen(true);
  };

  const confirmDeactivate = (reason: string) => {
    if (!selectedModuleId) return;

    setModules(prev => prev.map(module =>
      module.id === selectedModuleId
        ? {
            ...module,
            status: 'deactivated',
            isActive: false,
            deactivatedDate: new Date().toISOString(),
            deactivationReason: reason,
          }
        : module
    ));

    const deactivatedModule = modules.find(m => m.id === selectedModuleId);
    if (deactivatedModule) {
      const versionParts = deactivatedModule.currentVersion.split('.');
      const newVersion = `${versionParts[0]}.${versionParts[1]}.${Number(versionParts[2]) + 1}`;
      
      setModules(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          moduleName: `${deactivatedModule.moduleName} (Deactivated)`,
          currentVersion: newVersion,
          newVersion: null,
          releaseDate: new Date().toISOString(),
          status: 'current',
          isActive: false,
          currentVersionNotes: {
            features: [],
            bugFixes: [],
            improvements: [`Module deactivated: ${reason}`],
          },
        },
      ]);
    }

    setIsDeactivateModalOpen(false);
    setSelectedModuleId(null);
  };

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

    setModules(prev => prev.map(module =>
      module.id === moduleId
        ? {
            ...module,
            status: 'scheduled',
            scheduledDate: scheduledDateTime,
          }
        : module
    ));

    setSelectedDate('');
    setSelectedTime('');
    setActiveModule(null);
  };

  const handleActivate = (moduleId: string) => {
    setModules(prev => prev.map(module =>
      module.id === moduleId
        ? {
            ...module,
            status: 'current',
            currentVersion: module.newVersion!,
            newVersion: null,
            currentVersionNotes: module.newVersionNotes,
            newVersionNotes: undefined,
            isActive: true,
          }
        : module
    ));

    const activatedModule = modules.find(m => m.id === moduleId);
    if (activatedModule && activatedModule.newVersion) {
      setModules(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          moduleName: activatedModule.moduleName,
          currentVersion: activatedModule.newVersion!,
          newVersion: null,
          releaseDate: new Date().toISOString(),
          status: 'current',
          isActive: true,
          currentVersionNotes: activatedModule.newVersionNotes,
        },
      ]);
    }
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

      <Card>
        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`p-4 rounded-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              } ${module.status === 'deactivated' ? 'opacity-75' : ''}`}
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
                        <Button
                          onClick={() => handleActivate(module.id)}
                        >
                          {t('releases.actions.activateNow')}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setActiveModule(module.id)}
                        >
                          {t('releases.actions.schedule')}
                        </Button>
                      </>
                    )}
                  </div>
                )}

                {module.status !== 'deactivated' && module.isActive && (
                  <Button
                    variant="secondary"
                    className="text-red-500"
                    onClick={() => handleDeactivate(module.id)}
                  >
                    Deactivate
                  </Button>
                )}

                {module.status === 'deactivated' && (
                  <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>Deactivated on: {new Date(module.deactivatedDate!).toLocaleString()}</p>
                    <p>Reason: {module.deactivationReason}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {selectedReleaseNotes && (
        <ReleaseNotesModal
          version={selectedReleaseNotes.version}
          notes={selectedReleaseNotes.notes}
          onClose={() => setSelectedReleaseNotes(null)}
        />
      )}
      
      <DeactivateModal
        isOpen={isDeactivateModalOpen}
        onClose={() => {
          setIsDeactivateModalOpen(false);
          setSelectedModuleId(null);
        }}
        onDeactivate={confirmDeactivate}
      />
    </div>
  );
};