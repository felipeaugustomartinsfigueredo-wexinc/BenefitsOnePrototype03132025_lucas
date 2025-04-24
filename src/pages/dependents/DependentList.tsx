import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { User, Search, Plus, MoreVertical, X, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Dependent {
  id: string;
  firstName: string;
  lastName: string;
  relationship: 'spouse' | 'child' | 'other';
  dateOfBirth: string;
  ssn: string;
  address: {
    street: string;
    state: string;
    country: string;
  };
  status: 'active' | 'inactive';
}

interface DependentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dependent: Omit<Dependent, 'id' | 'status'>) => void;
  dependent?: Dependent;
}

const DependentModal: React.FC<DependentModalProps> = ({ isOpen, onClose, onSave, dependent }) => {
  const { theme, isDarkMode } = useThemeStore();
  const [formData, setFormData] = useState<Omit<Dependent, 'id' | 'status'>>({
    firstName: dependent?.firstName || '',
    lastName: dependent?.lastName || '',
    relationship: dependent?.relationship || 'child',
    dateOfBirth: dependent?.dateOfBirth || '',
    ssn: dependent?.ssn || '',
    address: dependent?.address || {
      street: '',
      state: '',
      country: '',
    },
  });

  // Update form data when dependent changes
  React.useEffect(() => {
    if (dependent) {
      setFormData({
        firstName: dependent.firstName,
        lastName: dependent.lastName,
        relationship: dependent.relationship,
        dateOfBirth: dependent.dateOfBirth,
        ssn: dependent.ssn,
        address: dependent.address,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        relationship: 'child',
        dateOfBirth: '',
        ssn: '',
        address: {
          street: '',
          state: '',
          country: '',
        },
      });
    }
  }, [dependent]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-lg p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {dependent ? 'Edit Dependent' : 'Add Dependent'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
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
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Relationship
            </label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value as Dependent['relationship'] }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              required
            >
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
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
              Social Security Number
            </label>
            <input
              type="text"
              value={formData.ssn}
              onChange={(e) => setFormData(prev => ({ ...prev, ssn: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              placeholder="XXX-XX-XXXX"
              required
            />
          </div>

          <div className="space-y-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Address
            </label>
            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Street Address
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value }
                }))}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                }`}
                placeholder="123 Main St"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  State
                </label>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, state: e.target.value }
                  }))}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-200'
                  }`}
                  placeholder="California"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Country
                </label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, country: e.target.value }
                  }))}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-200'
                  }`}
                  placeholder="United States"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: theme.colors.primary.teal }}
            >
              {dependent ? 'Update' : 'Add'} Dependent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mockDependents: Dependent[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Doe',
    relationship: 'spouse',
    dateOfBirth: '1985-06-15',
    ssn: 'XXX-XX-1234',
    address: {
      street: '123 Main St',
      state: 'California',
      country: 'United States',
    },
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Doe',
    relationship: 'child',
    dateOfBirth: '2010-03-22',
    ssn: 'XXX-XX-5678',
    address: {
      street: '123 Main St',
      state: 'California',
      country: 'United States',
    },
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Doe',
    relationship: 'child',
    dateOfBirth: '2012-09-10',
    ssn: 'XXX-XX-9012',
    address: {
      street: '123 Main St',
      state: 'California',
      country: 'United States',
    },
    status: 'inactive',
  },
];

export const DependentList: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<Dependent | undefined>();
  const [dependents, setDependents] = useState<Dependent[]>(mockDependents);
  const { t } = useTranslation();

  const filteredDependents = dependents.filter(dependent => 
    dependent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dependent.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveDependent = (dependentData: Omit<Dependent, 'id' | 'status'>) => {
    if (selectedDependent) {
      // Update existing dependent
      setDependents(prev => prev.map(dep =>
        dep.id === selectedDependent.id
          ? { ...dep, ...dependentData }
          : dep
      ));
    } else {
      // Add new dependent
      const newDependent: Dependent = {
        id: Date.now().toString(),
        status: 'active',
        ...dependentData,
      };
      setDependents(prev => [...prev, newDependent]);
    }
    setIsModalOpen(false);
    setSelectedDependent(undefined);
  };

  const handleEditDependent = (dependent: Dependent) => {
    setSelectedDependent(dependent);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setDependents(prev => prev.map(dep =>
      dep.id === id
        ? { ...dep, status: dep.status === 'active' ? 'inactive' : 'active' }
        : dep
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Dependents
        </h1>
        <button
          onClick={() => {
            setSelectedDependent(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: theme.colors.primary.teal }}
        >
          <Plus className="w-4 h-4" />
          Add Dependent
        </button>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl card-shadow`}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search dependents..."
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
          </div>

          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <th className="text-left pb-4 font-normal">Name</th>
                <th className="text-left pb-4 font-normal">Relationship</th>
                <th className="text-left pb-4 font-normal">Date of Birth</th>
                <th className="text-left pb-4 font-normal">SSN</th>
                <th className="text-left pb-4 font-normal">Address</th>
                <th className="text-left pb-4 font-normal">Status</th>
                <th className="text-right pb-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDependents.map((dependent) => (
                <tr key={dependent.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-50'} last:border-0`}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Heart className="w-4 h-4 text-gray-500" />
                      </div>
                      <span>{dependent.firstName} {dependent.lastName}</span>
                    </div>
                  </td>
                  <td className="py-4 capitalize">{dependent.relationship}</td>
                  <td className="py-4">{new Date(dependent.dateOfBirth).toLocaleDateString()}</td>
                  <td className="py-4">{dependent.ssn}</td>
                  <td className="py-4">
                    {dependent.address.street}, {dependent.address.state}, {dependent.address.country}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      dependent.status === 'active'
                        ? isDarkMode
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-green-50 text-green-700'
                        : isDarkMode
                          ? 'bg-red-900/30 text-red-400'
                          : 'bg-red-50 text-red-700'
                    }`}>
                      {dependent.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditDependent(dependent)}
                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(dependent.id)}
                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

{/* Teste */}
      <DependentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDependent(undefined);
        }}
        onSave={handleSaveDependent}
        dependent={selectedDependent}
      />
    </div>
  );
};