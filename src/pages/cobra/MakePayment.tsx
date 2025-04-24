import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, Calendar, DollarSign, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'bank';
  last4: string;
  expiry?: string;
  name: string;
  isDefault: boolean;
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
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
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment Method
                </h3>
                <div className="space-y-3">
                  {mockPaymentMethods.map((method) => (
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
                      {method.isDefault && (
                        <Badge variant="info" className="ml-auto">
                          Default
                        </Badge>
                      )}
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
    </div>
  );
};