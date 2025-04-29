import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { X } from 'lucide-react';

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

export const DependentModal: React.FC<DependentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  dependent
}) => {
  const { isDarkMode } = useThemeStore();
  const [formData, setFormData] = useState<Omit<Dependent, 'id' | 'status'>>({
    firstName: dependent?.firstName || '',
    lastName: dependent?.lastName || '',
    relationship: dependent?.relationship || 'other',
    dateOfBirth: dependent?.dateOfBirth || '',
    ssn: dependent?.ssn || '',
    address: {
      street: dependent?.address.street || '',
      state: dependent?.address.state || '',
      country: dependent?.address.country || ''
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {dependent ? 'Edit Dependent' : 'Add New Dependent'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Relationship
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            >
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                SSN
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                required
                pattern="^[Xx]{3}-[Xx]{2}-\d{4}$"
                placeholder="XXX-XX-1234"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Street Address
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                State
              </label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Country
              </label>
              <select
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors"
            >
              {dependent ? 'Save Changes' : 'Add Dependent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};