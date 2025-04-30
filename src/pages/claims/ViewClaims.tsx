import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Search, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

interface Claim {
  id: string;
  date: string;
  provider: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl?: string;
}

const mockClaims: Claim[] = [
  {
    id: '1',
    date: '2025-03-10',
    provider: 'CVS Pharmacy',
    description: 'Prescription Medication',
    amount: 45.99,
    status: 'approved',
    receiptUrl: 'https://images.unsplash.com/photo-1554178286-db96613e3801?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    date: '2025-03-05',
    provider: 'Dental Care Center',
    description: 'Routine Cleaning',
    amount: 150.00,
    status: 'pending',
    receiptUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    date: '2025-02-20',
    provider: 'Vision Plus',
    description: 'Eye Examination',
    amount: 95.00,
    status: 'rejected',
    receiptUrl: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    date: '2025-02-05',
    provider: 'Medical Center',
    description: 'Annual Physical',
    amount: 200.00,
    status: 'approved',
    receiptUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80',
  },
];

export const ViewClaims: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'rejected':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = 
      claim.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || claim.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          View Claims
        </h1>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>

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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

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
            {filteredClaims.map((claim) => (
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
                      icon={getStatusIcon(claim.status)}
                    >
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </div>
                </td>
                <td className="py-4 text-right">
                  {claim.receiptUrl && (
                    <a
                      href={claim.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg inline-flex items-center gap-2 transition-colors ${
                        isDarkMode
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      View
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};