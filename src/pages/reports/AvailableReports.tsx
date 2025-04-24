import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Search, Download, Clock, FileText, BarChart, PieChart, TrendingUp, Users } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  category: 'enrollment' | 'financial' | 'utilization' | 'demographic';
  format: 'pdf' | 'excel' | 'csv';
  lastRun: string | null;
  schedulable: boolean;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Enrollment Summary',
    description: 'Overview of current enrollment status across all benefit plans',
    category: 'enrollment',
    format: 'pdf',
    lastRun: '2024-03-20T10:30:00',
    schedulable: true,
  },
  {
    id: '2',
    name: 'Premium Analysis',
    description: 'Detailed analysis of premium trends and cost distribution',
    category: 'financial',
    format: 'excel',
    lastRun: '2024-03-19T15:45:00',
    schedulable: true,
  },
  {
    id: '3',
    name: 'Claims Utilization',
    description: 'Analysis of claims patterns and utilization metrics',
    category: 'utilization',
    format: 'excel',
    lastRun: '2024-03-18T09:15:00',
    schedulable: true,
  },
  {
    id: '4',
    name: 'Demographic Distribution',
    description: 'Breakdown of participant demographics and trends',
    category: 'demographic',
    format: 'pdf',
    lastRun: null,
    schedulable: true,
  },
  {
    id: '5',
    name: 'Plan Comparison',
    description: 'Side-by-side comparison of benefit plans and features',
    category: 'enrollment',
    format: 'pdf',
    lastRun: '2024-03-17T14:20:00',
    schedulable: false,
  },
  {
    id: '6',
    name: 'Cost Projection',
    description: 'Future cost projections based on current trends',
    category: 'financial',
    format: 'excel',
    lastRun: '2024-03-16T11:30:00',
    schedulable: true,
  },
  {
    id: '7',
    name: 'Provider Network Analysis',
    description: 'Analysis of provider network utilization and coverage',
    category: 'utilization',
    format: 'csv',
    lastRun: null,
    schedulable: true,
  },
  {
    id: '8',
    name: 'Age Distribution',
    description: 'Age-based analysis of participant population',
    category: 'demographic',
    format: 'excel',
    lastRun: '2024-03-15T16:45:00',
    schedulable: true,
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'enrollment':
      return <Users className="w-4 h-4" />;
    case 'financial':
      return <TrendingUp className="w-4 h-4" />;
    case 'utilization':
      return <BarChart className="w-4 h-4" />;
    case 'demographic':
      return <PieChart className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export const AvailableReports: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || report.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Available Reports
        </h1>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm`}>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border w-full ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-200 focus:ring-2 focus:ring-teal-500'
                } focus:outline-none transition-all duration-300`}
              />
              <Search className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Categories</option>
              <option value="enrollment">Enrollment</option>
              <option value="financial">Financial</option>
              <option value="utilization">Utilization</option>
              <option value="demographic">Demographic</option>
            </select>

            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Formats</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`p-6 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {getCategoryIcon(report.category)}
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {report.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {report.format.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {report.description}
                </p>

                {report.lastRun && (
                  <div className={`flex items-center gap-2 text-sm mb-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Clock className="w-4 h-4" />
                    Last run: {new Date(report.lastRun).toLocaleDateString()}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2"
                    style={{ backgroundColor: theme.colors.primary.teal }}
                  >
                    <Download className="w-4 h-4" />
                    Generate
                  </button>
                  {report.schedulable && (
                    <button
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2 ${
                        isDarkMode
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      Schedule
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};