import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Upload, Loader2, Image as ImageIcon, X, FileText, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface ExtractedData {
  provider: string;
  description: string;
  amount: number;
  date: string;
  serviceType: string;
  patientName: string;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

export const NewClaim: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [formData, setFormData] = useState<ExtractedData>({
    provider: '',
    description: '',
    amount: 0,
    date: '',
    serviceType: '',
    patientName: '',
  });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const files = event.target.files;
    if (!files) return;

    setUploadError(null);

    const newFiles = Array.from(files).slice(0, 10 - uploadedFiles.length);

    for (const file of newFiles) {
      if (!validateFile(file)) continue;

      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : undefined;

      setUploadedFiles(prev => [...prev, {
        id: Date.now().toString(),
        file,
        preview,
      }]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const files = prev.filter(f => f.id !== id);
      if (files.length === 0) {
        setExtractedData(null);
      }
      return files;
    });
  };

  const processWithAI = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setCurrentStep(2);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 5000));

      const extracted: ExtractedData = {
        provider: 'CVS Pharmacy',
        description: 'Prescription Medication',
        amount: 45.99,
        date: new Date().toISOString().split('T')[0],
        serviceType: 'Pharmacy',
        patientName: 'John Doe',
      };

      setExtractedData(extracted);
      setFormData(extracted);
      setCurrentStep(3);
    } catch (error) {
      setUploadError('Error processing receipt. Please try again.');
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1 && uploadedFiles.length > 0) {
      if (useAI) {
        processWithAI();
      } else {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      // Handle final submission
      console.log('Submitting claim:', { formData, files: uploadedFiles });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Upload Receipts
          </label>
          <Badge variant="info">
            {uploadedFiles.length}/10 files
          </Badge>
        </div>

        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDarkMode ? 'border-gray-600' : 'border-gray-200'
          }`}
        >
          <label className="cursor-pointer space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              multiple
            />
            <div className="flex flex-col items-center">
              <ImageIcon className={`w-8 h-8 mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                Drop your receipts here or click to upload
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Supports JPEG, PNG, HEIC, PDF (max 10MB per file)
              </p>
            </div>
          </label>
        </div>

        {uploadError && (
          <p className="text-sm text-red-500">{uploadError}</p>
        )}

        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className={`relative p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt="Receipt preview"
                    className="w-full h-32 object-contain"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <p className={`mt-2 text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {file.file.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="useAI"
            checked={useAI}
            onChange={(e) => setUseAI(e.target.checked)}
            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <label 
            htmlFor="useAI"
            className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Use AI to automatically extract information from receipts
          </label>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <Button type="submit" className="w-full">
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-teal-500" />
      </div>
      <p className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Processing your receipts...
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Our AI is analyzing your receipts to extract claim information
      </p>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
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
            Service Type
          </label>
          <Input
            type="text"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Patient Name
          </label>
          <Input
            type="text"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Date of Service
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
            Description
          </label>
          <Input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="min-w-[200px]">
          Submit Claim
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Submit New Claim
        </h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1
                ? 'bg-teal-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${
            currentStep >= 2
              ? 'bg-teal-500'
              : isDarkMode
                ? 'bg-gray-700'
                : 'bg-gray-200'
          }`} />
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2
                ? 'bg-teal-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${
            currentStep >= 3
              ? 'bg-teal-500'
              : isDarkMode
                ? 'bg-gray-700'
                : 'bg-gray-200'
          }`} />
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3
                ? 'bg-teal-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            3
          </div>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </form>
      </Card>
    </div>
  );
};