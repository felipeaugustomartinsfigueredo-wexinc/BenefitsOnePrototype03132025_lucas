import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Plus, Search, MoreVertical, Heart, Shield, Eye, FileText, Clock, Users } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  type: 'medical' | 'dental' | 'vision' | 'life' | 'disability';
  status: 'active' | 'draft' | 'archived';
  effectiveDate: string;
  enrollmentCount: number;
  premium: {
    individual: number;
    family: number;
  };
}

const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Premium PPO',
    type: 'medical',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 245,
    premium: {
      individual: 250,
      family: 750,
    },
  },
  {
    id: '2',
    name: 'Standard PPO',
    type: 'medical',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 180,
    premium: {
      individual: 150,
      family: 450,
    },
  },
  {
    id: '3',
    name: 'Premium Dental',
    type: 'dental',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 320,
    premium: {
      individual: 45,
      family: 135,
    },
  },
  {
    id: '4',
    name: 'Premium Vision',
    type: 'vision',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 290,
    premium: {
      individual: 20,
      family: 60,
    },
  },
  {
    id: '5',
    name: 'Basic Life',
    type: 'life',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 410,
    premium: {
      individual: 0,
      family: 0,
    },
  },
  {
    id: '6',
    name: 'Short-Term Disability',
    type: 'disability',
    status: 'active',
    effectiveDate: '2024-01-01',
    enrollmentCount: 380,
    premium: {
      individual: 25,
      family: 0,
    },
  },
  {
    id: '7',
    name: 'High Deductible Health Plan',
    type: 'medical',
    status: 'draft',
    effectiveDate: '2024-07-01',
    enrollmentCount: 0,
    premium: {
      individual: 75,
      family: 225,
    },
  },
  {
    id: '8',
    name: 'Basic Dental',
    type: 'dental',
    status: 'archived',
    effectiveDate: '2023-01-01',
    enrollmentCount: 0,
    premium: {
      individual: 30,
      family: 90,
    },
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'medical':
      return <Heart className="w-4 h-4" />;
    case 'dental':
      return <Shield className="w-4 h-4" />;
    case 'vision':
      return <Eye className="w-4 h-4" />;
    case 'life':
      return <FileText className="w-4 h-4" />;
    case 'disability':
      return <Clock className="w-4 h-4" />;
    default:
      return <Heart className="w-4 h-4" />;
  }
};

export const Plans: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || plan.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return isDarkMode
          ? 'bg-green-900/30 text-green-400'
          : 'bg-green-50 text-green-700';
      case 'draft':
        return isDarkMode
          ? 'bg-yellow-900/30 text-yellow-400'
          : 'bg-yellow-50 text-yellow-700';
      default:
        return isDarkMode
          ? 'bg-gray-900/30 text-gray-400'
          : 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Plans
        </h1>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: theme.colors.primary.teal }}
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </button>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm`}>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search plans..."
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Types</option>
              <option value="medical">Medical</option>
              <option value="dental">Dental</option>
              <option value="vision">Vision</option>
              <option value="life">Life</option>
              <option value="disability">Disability</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {getTypeIcon(plan.type)}
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                        {plan.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-1">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getStatusClass(plan.status)}`}>
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </span>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Effective Date
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {new Date(plan.effectiveDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Enrollment
                      </p>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {plan.enrollmentCount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Individual Premium
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.premium.individual === 0 ? 'Free' : `$${plan.premium.individual}`}
                      </p>
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Family Premium
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.premium.family === 0 ? 'N/A' : `$${plan.premium.family}`}
                      </p>
                    </div>

                    <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};