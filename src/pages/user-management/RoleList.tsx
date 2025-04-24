import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Search, Plus, MoreVertical, Users, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionGroup {
  id: string;
  name: string;
  permissions: Permission[];
}

interface RoleData {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  userCount: number;
  permissions: string[];
}

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: Partial<RoleData>) => void;
  role?: RoleData;
}

const permissionGroups: PermissionGroup[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    permissions: [
      { id: 'dashboard:view', name: 'View Dashboard', description: 'Access to view the main dashboard' },
      { id: 'dashboard:customize', name: 'Customize Dashboard', description: 'Ability to customize dashboard widgets and layout' },
    ],
  },
  {
    id: 'benefits',
    name: 'Benefits',
    permissions: [
      { id: 'benefits:medical:view', name: 'View Medical Benefits', description: 'View medical benefits and coverage details' },
      { id: 'benefits:medical:manage', name: 'Manage Medical Benefits', description: 'Modify medical benefit selections and settings' },
      { id: 'benefits:dental:view', name: 'View Dental Benefits', description: 'View dental benefits and coverage details' },
      { id: 'benefits:dental:manage', name: 'Manage Dental Benefits', description: 'Modify dental benefit selections and settings' },
      { id: 'benefits:vision:view', name: 'View Vision Benefits', description: 'View vision benefits and coverage details' },
      { id: 'benefits:vision:manage', name: 'Manage Vision Benefits', description: 'Modify vision benefit selections and settings' },
      { id: 'benefits:life:view', name: 'View Life Insurance', description: 'View life insurance benefits and coverage details' },
      { id: 'benefits:life:manage', name: 'Manage Life Insurance', description: 'Modify life insurance selections and settings' },
      { id: 'benefits:disability:view', name: 'View Disability Benefits', description: 'View disability benefits and coverage details' },
      { id: 'benefits:disability:manage', name: 'Manage Disability Benefits', description: 'Modify disability benefit selections and settings' },
    ],
  },
  {
    id: 'hsa',
    name: 'HSA Management',
    permissions: [
      { id: 'hsa:account:view', name: 'View HSA Account', description: 'View HSA account details and balances' },
      { id: 'hsa:account:manage', name: 'Manage HSA Account', description: 'Manage HSA contributions and settings' },
      { id: 'hsa:investments:view', name: 'View HSA Investments', description: 'View HSA investment options and performance' },
      { id: 'hsa:investments:manage', name: 'Manage HSA Investments', description: 'Manage HSA investment allocations' },
      { id: 'hsa:claims:view', name: 'View HSA Claims', description: 'View HSA claims history' },
      { id: 'hsa:claims:manage', name: 'Manage HSA Claims', description: 'Submit and manage HSA claims' },
    ],
  },
  {
    id: 'dependents',
    name: 'Dependents',
    permissions: [
      { id: 'dependents:view', name: 'View Dependents', description: 'View dependent information and coverage' },
      { id: 'dependents:manage', name: 'Manage Dependents', description: 'Add, modify, or remove dependents' },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    permissions: [
      { id: 'reports:available:view', name: 'View Available Reports', description: 'Access to view available reports' },
      { id: 'reports:available:generate', name: 'Generate Reports', description: 'Generate and download reports' },
      { id: 'reports:subscriptions:view', name: 'View Report Subscriptions', description: 'View report subscription settings' },
      { id: 'reports:subscriptions:manage', name: 'Manage Report Subscriptions', description: 'Create and modify report subscriptions' },
    ],
  },
  {
    id: 'plan-setup',
    name: 'Plan Setup',
    permissions: [
      { id: 'plan-setup:view', name: 'View Plan Setup', description: 'View benefit plan configurations' },
      { id: 'plan-setup:manage', name: 'Manage Plan Setup', description: 'Modify benefit plan settings and options' },
    ],
  },
  {
    id: 'theme',
    name: 'Theme Customization',
    permissions: [
      { id: 'theme:colors:view', name: 'View Theme Colors', description: 'View theme color settings' },
      { id: 'theme:colors:manage', name: 'Manage Theme Colors', description: 'Modify theme color schemes' },
      { id: 'theme:typography:view', name: 'View Typography', description: 'View typography settings' },
      { id: 'theme:typography:manage', name: 'Manage Typography', description: 'Modify typography styles' },
      { id: 'theme:logo:view', name: 'View Logo', description: 'View logo settings' },
      { id: 'theme:logo:manage', name: 'Manage Logo', description: 'Update company logo' },
    ],
  },
  {
    id: 'releases',
    name: 'Release Management',
    permissions: [
      { id: 'releases:view', name: 'View Releases', description: 'View release information and schedules' },
      { id: 'releases:manage', name: 'Manage Releases', description: 'Schedule and manage system releases' },
    ],
  },
  {
    id: 'user-management',
    name: 'User Management',
    permissions: [
      { id: 'users:view', name: 'View Users', description: 'View user list and details' },
      { id: 'users:manage', name: 'Manage Users', description: 'Create and modify user accounts' },
      { id: 'roles:view', name: 'View Roles', description: 'View role definitions and assignments' },
      { id: 'roles:manage', name: 'Manage Roles', description: 'Create and modify roles and permissions' },
    ],
  },
];

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, onSave, role }) => {
  const { isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<RoleData>>({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || [],
  });

  if (!isOpen) return null;

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions?.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...(prev.permissions || []), permissionId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {role ? t('roles.modal.editTitle') : t('roles.modal.createTitle')}
          </h2>
          <Button
            variant="secondary"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {t('roles.modal.nameLabel')}
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t('roles.modal.namePlaceholder')}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {t('roles.modal.descriptionLabel')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              placeholder={t('roles.modal.descriptionPlaceholder')}
              rows={3}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {t('roles.modal.permissionsLabel')}
            </label>
            <div className="space-y-6">
              {permissionGroups.map((group) => (
                <Card key={group.id}>
                  <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {group.name}
                  </h3>
                  <div className="space-y-3">
                    {group.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-start gap-3">
                        <div className="flex items-center h-5 mt-1">
                          <input
                            type="checkbox"
                            checked={formData.permissions?.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                            className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {permission.name}
                          </label>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {role ? t('common.update') : t('common.create')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const mockRoles: RoleData[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access and management capabilities',
    dateCreated: '2025-01-01',
    userCount: 3,
    permissions: [
      'dashboard:view', 'dashboard:customize',
      'benefits:medical:view', 'benefits:medical:manage',
      'benefits:dental:view', 'benefits:dental:manage',
      'benefits:vision:view', 'benefits:vision:manage',
      'benefits:life:view', 'benefits:life:manage',
      'benefits:disability:view', 'benefits:disability:manage',
      'hsa:account:view', 'hsa:account:manage',
      'hsa:investments:view', 'hsa:investments:manage',
      'hsa:claims:view', 'hsa:claims:manage',
      'dependents:view', 'dependents:manage',
      'reports:available:view', 'reports:available:generate',
      'reports:subscriptions:view', 'reports:subscriptions:manage',
      'plan-setup:view', 'plan-setup:manage',
      'theme:colors:view', 'theme:colors:manage',
      'theme:typography:view', 'theme:typography:manage',
      'theme:logo:view', 'theme:logo:manage',
      'releases:view', 'releases:manage',
      'users:view', 'users:manage',
      'roles:view', 'roles:manage'
    ],
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Department-level access and team management',
    dateCreated: '2025-01-15',
    userCount: 8,
    permissions: [
      'dashboard:view',
      'benefits:medical:view',
      'benefits:dental:view',
      'benefits:vision:view',
      'benefits:life:view',
      'benefits:disability:view',
      'hsa:account:view',
      'hsa:investments:view',
      'hsa:claims:view',
      'dependents:view',
      'reports:available:view',
      'reports:subscriptions:view',
      'users:view'
    ],
  },
  {
    id: '3',
    name: 'User',
    description: 'Standard user access to core features',
    dateCreated: '2025-02-01',
    userCount: 45,
    permissions: [
      'dashboard:view',
      'benefits:medical:view',
      'benefits:dental:view',
      'benefits:vision:view',
      'benefits:life:view',
      'benefits:disability:view',
      'hsa:account:view',
      'hsa:claims:view',
      'dependents:view'
    ],
  },
];

export const RoleList: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | undefined>();
  const [roles, setRoles] = useState<RoleData[]>(mockRoles);
  const { t } = useTranslation();

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveRole = (roleData: Partial<RoleData>) => {
    if (selectedRole) {
      // Update existing role
      setRoles(prev => prev.map(role =>
        role.id === selectedRole.id
          ? { ...role, ...roleData }
          : role
      ));
    } else {
      // Create new role
      const newRole: RoleData = {
        id: Date.now().toString(),
        name: roleData.name!,
        description: roleData.description!,
        dateCreated: new Date().toISOString(),
        userCount: 0,
        permissions: roleData.permissions || [],
      };
      setRoles(prev => [...prev, newRole]);
    }
    setIsModalOpen(false);
    setSelectedRole(undefined);
  };

  const handleEditRole = (role: RoleData) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('roles.title')}
        </h1>
        <Button
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          {t('roles.addRole')}
        </Button>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder={t('roles.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <th className="text-left pb-4 font-normal">{t('roles.table.roleName')}</th>
              <th className="text-left pb-4 font-normal">{t('roles.table.description')}</th>
              <th className="text-left pb-4 font-normal">{t('roles.table.created')}</th>
              <th className="text-left pb-4 font-normal">{t('roles.table.users')}</th>
              <th className="text-right pb-4 font-normal">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
              <tr key={role.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-50'} last:border-0`}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Users className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="font-medium">{role.name}</span>
                  </div>
                </td>
                <td className="py-4">{role.description}</td>
                <td className="py-4">{new Date(role.dateCreated).toLocaleDateString()}</td>
                <td className="py-4">
                  <Badge variant="info" icon={<Users className="w-3 h-3" />}>
                    {role.userCount}
                  </Badge>
                </td>
                <td className="py-4 text-right">
                  <Button
                    variant="secondary"
                    icon={<MoreVertical className="w-4 h-4" />}
                    onClick={() => handleEditRole(role)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRole(undefined);
        }}
        onSave={handleSaveRole}
        role={selectedRole}
      />
    </div>
  );
};