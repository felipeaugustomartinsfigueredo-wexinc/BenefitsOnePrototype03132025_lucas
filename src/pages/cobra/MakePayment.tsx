import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, Calendar, DollarSign, Clock, AlertCircle, CheckCircle2, Plus, X, Trash2, Edit } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'bank';
  last4: string;
  expiry?: string;
  name: string;
  isDefault: boolean;
}

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: { name: string; number: string; expiry: string; cvc: string; isDefault: boolean }) => void;
  editCard?: PaymentMethod;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  paymentMethod: PaymentMethod;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, paymentMethod }) => {
  const { isDarkMode } = useThemeStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center text-center p-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            isDarkMode ? 'bg-red-900/30' : 'bg-red-50'
          }`}>
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Delete Payment Method
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Are you sure you want to delete {paymentMethod.name}? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose, onSave, editCard }) => {
  const { isDarkMode } = useThemeStore();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    isDefault: false,
  });

  React.useEffect(() => {
    if (editCard) {
      setFormData({
        name: editCard.name,
        number: `************${editCard.last4}`,
        expiry: editCard.expiry || '',
        cvc: '',
        isDefault: editCard.isDefault,
      });
    } else {
      setFormData({
        name: '',
        number: '',
        expiry: '',
        cvc: '',
        isDefault: false,
      });
    }
  }, [editCard]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', number: '', expiry: '', cvc: '', isDefault: false });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {editCard ? 'Edit Card' : 'Add New Card'}
          </h2>
          <Button
            variant="secondary"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Cardholder Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Name on card"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Card Number
            </label>
            <Input
              type="text"
              value={formData.number}
              onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
              placeholder="1234 5678 9012 3456"
              required
              pattern={editCard ? undefined : "[0-9]{16}"}
              disabled={!!editCard}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Expiry Date
              </label>
              <Input
                type="text"
                value={formData.expiry}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 4) {
                    const month = value.slice(0, 2);
                    const year = value.slice(2);
                    setFormData(prev => ({
                      ...prev,
                      expiry: value.length > 2 ? `${month}/${year}` : month
                    }));
                  }
                }}
                placeholder="MM/YY"
                required
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                CVC
              </label>
              <Input
                type="text"
                value={formData.cvc}
                onChange={(e) => setFormData(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                placeholder="123"
                required={!editCard}
                pattern="[0-9]{3}"
              />
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Set as default payment method
            </span>
          </label>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editCard ? 'Update Card' : 'Add Card'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    last4: '4242',
    expiry: '12/25',
    name: 'Visa ending in 4242',
    isDefault: true,
  },
  {
    id: '2',
    type: 'bank',
    last4: '9876',
    name: 'Chase Checking ****9876',
    isDefault: false,
  },
];

export const MakePayment: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [selectedMethod, setSelectedMethod] = useState<string>(mockPaymentMethods[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [editingCard, setEditingCard] = useState<PaymentMethod | undefined>();
  const [deleteConfirmation, setDeleteConfirmation] = useState<PaymentMethod | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const handleSaveCard = (cardData: { name: string; number: string; expiry: string; cvc: string; isDefault: boolean }) => {
    if (editingCard) {
      // Update existing card
      setPaymentMethods(prev => {
        const updated = prev.map(method => {
          if (method.id === editingCard.id) {
            return {
              ...method,
              name: cardData.name,
              expiry: cardData.expiry,
              isDefault: cardData.isDefault,
            };
          }
          return cardData.isDefault ? { ...method, isDefault: false } : method;
        });
        return updated;
      });
    } else {
      // Add new card
      const newCard: PaymentMethod = {
        id: Date.now().toString(),
        type: 'credit',
        last4: cardData.number.slice(-4),
        expiry: cardData.expiry,
        name: cardData.name,
        isDefault: cardData.isDefault,
      };

      if (cardData.isDefault) {
        setPaymentMethods(prev => prev.map(method => ({
          ...method,
          isDefault: false,
        })));
      }

      setPaymentMethods(prev => [...prev, newCard]);
    }
    setIsCardModalOpen(false);
    setEditingCard(undefined);
  };

  const handleDeletePaymentMethod = (methodId: string) => {
    const methodToDelete = paymentMethods.find(m => m.id === methodId);
    if (!methodToDelete) return;

    // If deleting default method, set the first remaining method as default
    if (methodToDelete.isDefault) {
      setPaymentMethods(prev => {
        const filtered = prev.filter(m => m.id !== methodId);
        if (filtered.length > 0) {
          filtered[0].isDefault = true;
          setSelectedMethod(filtered[0].id);
        }
        return filtered;
      });
    } else {
      setPaymentMethods(prev => prev.filter(m => m.id !== methodId));
    }
  };

  const handleEditCard = (card: PaymentMethod) => {
    setEditingCard(card);
    setIsCardModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Make COBRA Payment
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Payment Details
                  </h2>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your COBRA coverage payment for April 2025
                  </p>
                </div>
                <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>
                  Due in 5 days
                </Badge>
              </div>

              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Monthly Premium
                    </p>
                    <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      $850.00
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Administrative Fee
                    </p>
                    <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      $25.00
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className={`h-px my-4 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
                    <div className="flex justify-between items-center">
                      <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Total Due
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        $875.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Payment Method
                  </h3>
                  <Button
                    variant="secondary"
                    icon={<Plus className="w-4 h-4" />}
                    onClick={() => {
                      setEditingCard(undefined);
                      setIsCardModalOpen(true);
                    }}
                  >
                    Add New Card
                  </Button>
                </div>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedMethod === method.id
                          ? isDarkMode
                            ? 'bg-teal-900/30 border-teal-500'
                            : 'bg-teal-50 border-teal-500'
                          : isDarkMode
                          ? 'border-gray-700 hover:bg-gray-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="hidden"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <CreditCard className={`w-5 h-5 ${
                            selectedMethod === method.id
                              ? 'text-teal-500'
                              : 'text-gray-400'
                          }`} />
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {method.name}
                            </p>
                            {method.expiry && (
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Expires {method.expiry}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="info" className="ml-auto">
                            Default
                          </Badge>
                        )}
                        <Button
                          variant="secondary"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditCard(method);
                          }}
                        />
                        <Button
                          variant="secondary"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={(e) => {
                            e.preventDefault();
                            if (paymentMethods.length > 1) {
                              setDeleteConfirmation(method);
                            }
                          }}
                          disabled={paymentMethods.length === 1}
                          className={paymentMethods.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Make Payment'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Payment Summary
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Coverage Period
                  </span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  April 1 - 30, 2025
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Due Date
                  </span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  March 15, 2025
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Payment Status
                  </span>
                </div>
                <Badge variant="warning">
                  Pending
                </Badge>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Important Notes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payments must be received by the due date to avoid coverage interruption.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Set up automatic payments to ensure timely coverage continuation.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingCard(undefined);
        }}
        onSave={handleSaveCard}
        editCard={editingCard}
      />

      {deleteConfirmation && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={() => handleDeletePaymentMethod(deleteConfirmation.id)}
          paymentMethod={deleteConfirmation}
        />
      )}
    </div>
  );
};