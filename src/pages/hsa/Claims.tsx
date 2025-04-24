import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { FileText, Plus, Upload, CheckCircle2, XCircle, Clock, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

interface Claim {
  id: string;
  date: string;
  provider: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl?: string;
}

interface ExtractedData {
  provider: string;
  description: string;
  amount: number;
  date: string;
}

const mockClaims: Claim[] = [
  {
    id: '1',
    date: '2025-03-10',
    provider: 'CVS Pharmacy',
    description: 'Prescription Medication',
    amount: 45.99,
    status: 'approved',
    receiptUrl: 'https://images.unsplash.com/photo-1554178286-db96613e3801?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    date: '2025-03-05',
    provider: 'Dental Care Center',
    description: 'Routine Cleaning',
    amount: 150.00,
    status: 'pending',
    receiptUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    date: '2025-02-20',
    provider: 'Vision Plus',
    description: 'Eye Examination',
    amount: 95.00,
    status: 'rejected',
    receiptUrl: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    date: '2025-02-05',
    provider: 'Medical Center',
    description: 'Annual Physical',
    amount: 200.00,
    status: 'approved',
    receiptUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop',
  },
];

interface ReceiptViewerProps {
  claim: Claim;
  onClose: () => void;
}

const ReceiptViewer: React.FC<ReceiptViewerProps> = ({ claim, onClose }) => {
  const { isDarkMode } = useThemeStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <Card ref={modalRef} className="w-full max-w-3xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Receipt - {claim.provider}
          </h3>
          <Button
            variant="secondary"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>
        
        <div className={`border rounded-lg overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <img
            src={claim.receiptUrl}
            alt={`Receipt from ${claim.provider}`}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date</p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {new Date(claim.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount</p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${claim.amount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Provider</p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {claim.provider}
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {claim.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Claims: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [formData, setFormData] = useState<ExtractedData | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid image (JPEG, PNG, HEIC) or PDF file');
      return false;
    }

    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB');
      return false;
    }

    return true;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError(null);
    setPreviewUrl(null);

    if (!file) return;

    if (!validateFile(file)) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsProcessing(true);

    try {
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
      }

      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock extracted data
      const extracted: ExtractedData = {
        provider: 'CVS Pharmacy',
        description: 'Prescription Medication',
        amount: 45.99,
        date: new Date().toISOString().split('T')[0],
      };

      setExtractedData(extracted);
      setFormData(extracted);
    } catch (error) {
      setUploadError('Error processing receipt. Please try again.');
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle claim submission
    setIsModalOpen(false);
    setExtractedData(null);
    setFormData(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('hsa.claims.title')}
        </h1>
        <Button
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          {t('hsa.claims.submit')}
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <th className="text-left pb-4 font-normal">Date</th>
                <th className="text-left pb-4 font-normal">Provider</th>
                <th className="text-left pb-4 font-normal">Description</th>
                <th className="text-right pb-4 font-normal">Amount</th>
                <th className="text-center pb-4 font-normal">Status</th>
                <th className="text-right pb-4 font-normal">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {mockClaims.map((claim) => (
                <tr 
                  key={claim.id}
                  className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} last:border-0`}
                >
                  <td className="py-4">{new Date(claim.date).toLocaleDateString()}</td>
                  <td className="py-4">{claim.provider}</td>
                  <td className="py-4">{claim.description}</td>
                  <td className="py-4 text-right">${claim.amount.toFixed(2)}</td>
                  <td className="py-4">
                    <div className="flex justify-center">
                      <Badge
                        variant={getStatusBadgeVariant(claim.status)}
                        icon={claim.status === 'approved' ? <CheckCircle2 className="w-3 h-3" /> : 
                              claim.status === 'rejected' ? <XCircle className="w-3 h-3" /> :
                              <Clock className="w-3 h-3" />}
                      >
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <Button
                      variant="secondary"
                      icon={<FileText className="w-4 h-4" />}
                      onClick={() => setSelectedClaim(claim)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('hsa.claims.submit')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Upload Receipt
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center relative ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  } ${isProcessing ? 'opacity-50' : ''}`}
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={previewUrl} 
                        alt="Receipt preview" 
                        className="max-h-48 mx-auto object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setExtractedData(null);
                          setFormData(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
                      >
                        Remove receipt
                      </button>
                    </div>
                  ) : isProcessing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className={`w-8 h-8 mb-2 animate-spin ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Processing receipt...
                      </p>
                    </div>
                  ) : (
                    <label className="cursor-pointer space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        disabled={isProcessing}
                      />
                      <div className="flex flex-col items-center">
                        <ImageIcon className={`w-8 h-8 mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                          Drop your receipt here or click to upload
                        </p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Supports JPEG, PNG, HEIC, PDF (max 10MB)
                        </p>
                      </div>
                    </label>
                  )}
                </div>
                {uploadError && (
                  <p className="mt-2 text-sm text-red-500">{uploadError}</p>
                )}
              </div>

              {formData && (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Provider
                    </label>
                    <Input
                      type="text"
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Description
                    </label>
                    <Input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Amount
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setExtractedData(null);
                    setFormData(null);
                    setPreviewUrl(null);
                    setUploadError(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Cancel
                </Button>
                {formData && (
                  <Button type="submit">
                    Submit Claim
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      )}

      {selectedClaim && (
        <ReceiptViewer
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
        />
      )}
    </div>
  );
};