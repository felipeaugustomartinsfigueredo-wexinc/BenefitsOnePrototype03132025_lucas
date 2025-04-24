import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Plus, Search, MoreVertical, Heart, Shield, Eye, FileText, Clock, Users, X, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

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
  coverage: string[];
  deductible?: number;
  outOfPocket?: number;
  description?: string;
}

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: Omit<Plan, 'id' | 'enrollmentCount'>) => void;
  plan?: Plan;
}

const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, onSave, plan }) => {
  const { isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<Plan, 'id' | 'enrollmentCount'>>({
    name: plan?.name || '',
    type: plan?.type || 'medical',
    status: plan?.status || 'draft',
    effectiveDate: plan?.effectiveDate || new Date().toISOString().split('T')[0],
    premium: plan?.premium || { individual: 0, family: 0 },
    coverage: plan?.coverage || [],
    deductible: plan?.deductible || 0,
    outOfPocket: plan?.outOfPocket || 0,
    description: plan?.description || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {plan ? 'Edit Plan' : 'Add New Plan'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Plan Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Plan Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Plan['type'] }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              required
            >
              <option value="medical">Medical</option>
              <option value="dental">Dental</option>
              <option value="vision">Vision</option>
              <option value="life">Life Insurance</option>
              <option value="disability">Disability</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Individual Premium
              </label>
              <Input
                type="number"
                value={formData.premium.individual}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  premium: { ...prev.premium, individual: Number(e.target.value) }
                }))}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Family Premium
              </label>
              <Input
                type="number"
                value={formData.premium.family}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  premium: { ...prev.premium, family: Number(e.target.value) }
                }))}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Deductible
              </label>
              <Input
                type="number"
                value={formData.deductible}
                onChange={(e) => setFormData(prev => ({ ...prev, deductible: Number(e.target.value) }))}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Out of Pocket Maximum
              </label>
              <Input
                type="number"
                value={formData.outOfPocket}
                onChange={(e) => setFormData(prev => ({ ...prev, outOfPocket: Number(e.target.value) }))}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Effective Date
            </label>
            <Input
              type="date"
              value={formData.effectiveDate}
              onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Plan['status'] }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200'
              }`}
              required
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {plan ? 'Update Plan' : 'Add Plan'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>();
  const [plans, setPlans] = useState<Plan[]>([
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
      coverage: [
        'Primary Care: $20 copay',
        'Specialist: $40 copay',
        'Emergency Room: $250 copay',
        'Hospitalization: 10% after deductible',
        'Prescription Drugs: $10/$30/$50 copays',
      ],
      deductible: 1000,
      outOfPocket: 3000,
      description: 'Comprehensive medical coverage with low deductibles and copays.',
    },
    // Add more mock plans here
  ]);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || plan.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSavePlan = (planData: Omit<Plan, 'id' | 'enrollmentCount'>) => {
    if (selectedPlan) {
      // Update existing plan
      setPlans(prev => prev.map(plan =>
        plan.id === selectedPlan.id
          ? { ...plan, ...planData }
          : plan
      ));
    } else {
      // Add new plan
      const newPlan: Plan = {
        id: Date.now().toString(),
        enrollmentCount: 0,
        ...planData,
      };
      setPlans(prev => [...prev, newPlan]);
    }
    setIsModalOpen(false);
    setSelectedPlan(undefined);
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      setPlans(prev => prev.filter(plan => plan.id !== id));
    }
  };

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
        <Button
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Plan
        </Button>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Input
              type="text"
              placeholder="Search plans..."
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
                      ${plan.premium.individual}
                    </p>
                  </div>

                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Family Premium
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${plan.premium.family}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsModalOpen(true);
                      }}
                      className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors text-red-500`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlan(undefined);
        }}
        onSave={handleSavePlan}
        plan={selectedPlan}
      />
    </div>
  );
};