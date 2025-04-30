import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Search, Plus, MoreVertical, User, Check, X, Clock, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  sms: string;
  dateCreated: string;
  lastLogin: string | null;
  roles: string[];
  status: 'active' | 'inactive' | 'pending';
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Omit<UserData, 'id' | 'dateCreated' | 'lastLogin' | 'status'>) => void;
  availableRoles: string[];
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave, availableRoles }) => {
  const { isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sms: '',
    roles: [] as string[],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ firstName: '', lastName: '', email: '', sms: '', roles: [] });
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('users.addUser')}
          </h2>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  First Name
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Last Name
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                SMS Number
              </label>
              <Input
                type="tel"
                value={formData.sms}
                onChange={(e) => setFormData(prev => ({ ...prev, sms: e.target.value }))}
                placeholder="(123) 456-7890"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Roles
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableRoles.map((role) => (
                  <label
                    key={role}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                      formData.roles.includes(role)
                        ? isDarkMode
                          ? 'bg-teal-900/30 border-teal-500'
                          : 'bg-teal-50 border-teal-500'
                        : isDarkMode
                          ? 'border-gray-600 hover:bg-gray-700'
                          : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.roles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                    />
                    <span className={formData.roles.includes(role) ? 'text-teal-500' : ''}>
                      {role}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              Add User
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const mockUsers: UserData[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    sms: '(555) 123-4567',
    dateCreated: '2025-01-15',
    lastLogin: '2025-03-10T10:30:00',
    roles: ['Admin', 'User'],
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    sms: '(555) 234-5678',
    dateCreated: '2025-02-01',
    lastLogin: '2025-03-08T15:45:00',
    roles: ['Manager'],
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    sms: '(555) 345-6789',
    dateCreated: '2025-02-15',
    lastLogin: null,
    roles: ['User'],
    status: 'pending',
  },
];

const availableRoles = ['Admin', 'Manager', 'User'];

export const UserList: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const { t } = useTranslation();

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: Omit<UserData, 'id' | 'dateCreated' | 'lastLogin' | 'status'>) => {
    const newUser: UserData = {
      id: Date.now().toString(),
      dateCreated: new Date().toISOString(),
      lastLogin: null,
      status: 'pending',
      ...userData,
    };
    setUsers(prev => [...prev, newUser]);
    setIsModalOpen(false);
  };

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Check className="w-3 h-3" />;
      case 'inactive':
        return <X className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className={`text-2xl sm:text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('users.title')}
        </h1>
        <Button
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          {t('users.addUser')}
        </Button>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder={t('users.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>

          {/* Mobile View */}
          <div className="space-y-4 sm:hidden">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.firstName} {user.lastName}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.roles.map((role, index) => (
                          <Badge key={index} variant="info">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(user.status)}
                    icon={getStatusIcon(user.status)}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {user.sms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Created: {new Date(user.dateCreated).toLocaleDateString()}
                    </span>
                  </div>
                  {user.lastLogin && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Last login: {new Date(user.lastLogin).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="secondary"
                    icon={<MoreVertical className="w-4 h-4" />}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <th className="text-left pb-4 font-normal">{t('users.table.name')}</th>
                  <th className="text-left pb-4 font-normal">{t('users.table.email')}</th>
                  <th className="text-left pb-4 font-normal">SMS</th>
                  <th className="text-left pb-4 font-normal">{t('users.table.roles')}</th>
                  <th className="text-left pb-4 font-normal">{t('users.table.created')}</th>
                  <th className="text-left pb-4 font-normal">{t('users.table.lastLogin')}</th>
                  <th className="text-left pb-4 font-normal">{t('users.table.status')}</th>
                  <th className="text-right pb-4 font-normal">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-50'} last:border-0`}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <span>{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="py-4">{user.email}</td>
                    <td className="py-4">{user.sms}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        {user.roles.map((role, index) => (
                          <Badge key={index} variant="info">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">{new Date(user.dateCreated).toLocaleDateString()}</td>
                    <td className="py-4">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : t('users.table.never')}</td>
                    <td className="py-4">
                      <Badge
                        variant={getStatusBadgeVariant(user.status)}
                        icon={getStatusIcon(user.status)}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="secondary"
                        icon={<MoreVertical className="w-4 h-4" />}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddUser}
        availableRoles={availableRoles}
      />
    </div>
  );
};