import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Download, FileText, Calendar, Clock, AlertCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'notice' | 'statement' | 'form';
  date: string;
  size: string;
  status: 'new' | 'viewed';
  url: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'COBRA Initial Rights Notice',
    type: 'notice',
    date: '2025-03-01',
    size: '245 KB',
    status: 'new',
    url: '#',
  },
  {
    id: '2',
    name: 'March 2025 Premium Statement',
    type: 'statement',
    date: '2025-02-15',
    size: '180 KB',
    status: 'viewed',
    url: '#',
  },
  {
    id: '3',
    name: 'COBRA Election Form',
    type: 'form',
    date: '2025-02-01',
    size: '320 KB',
    status: 'viewed',
    url: '#',
  },
  {
    id: '4',
    name: 'February 2025 Premium Statement',
    type: 'statement',
    date: '2025-01-15',
    size: '175 KB',
    status: 'viewed',
    url: '#',
  },
  {
    id: '5',
    name: 'Coverage Continuation Notice',
    type: 'notice',
    date: '2025-01-01',
    size: '290 KB',
    status: 'viewed',
    url: '#',
  },
];

export const Documents: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          COBRA Documents
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[240px]">
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Types</option>
              <option value="notice">Notices</option>
              <option value="statement">Statements</option>
              <option value="form">Forms</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <FileText className="w-5 h-5" style={{ color: theme.colors.primary.teal }} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {doc.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                        {doc.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {new Date(doc.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {doc.size}
                      </span>
                    </div>

                    {doc.status === 'new' && (
                      <Badge variant="warning" icon={<AlertCircle className="w-3 h-3" />}>
                        New
                      </Badge>
                    )}

                    <button
                      onClick={() => window.open(doc.url, '_blank')}
                      className={`ml-auto p-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 text-yellow-500">
          <AlertCircle className="w-5 h-5" />
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Important: Keep these documents for your records. They contain critical information about your COBRA coverage and rights.
          </p>
        </div>
      </Card>
    </div>
  );
};