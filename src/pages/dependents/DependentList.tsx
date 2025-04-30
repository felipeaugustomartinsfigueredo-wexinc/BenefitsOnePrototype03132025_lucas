import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useThemeStore } from '../../store/useThemeStore';
import { User, Search, Plus, MoreVertical, X, Heart, FileSpreadsheet, File as FilePdf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx-js-style';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//import { DependentModal } from './DependentModal';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


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
  countries: string[]; // Pass the countries array as a prop
}

export const DependentModal: React.FC<DependentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  dependent,
  countries,
}) => {
  const { isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<Dependent, 'id' | 'status'>>({
    firstName: dependent?.firstName || '',
    lastName: dependent?.lastName || '',
    relationship: dependent?.relationship || 'other',
    dateOfBirth: dependent?.dateOfBirth || '',
    ssn: dependent?.ssn || '',
    address: {
      street: dependent?.address.street || '',
      state: dependent?.address.state || '',
      country: dependent?.address.country || '',
    },
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
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {dependent ? t('editDependent') : t('addDependent')}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('firstName')}
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
              <label
                className={`block mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('lastName')}
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
            <label
              className={`block mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {t('relationship')}
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
              <option value="spouse">{t('spouse')}</option>
              <option value="child">{t('child')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('dateOfBirth')}
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
              <label
                className={`block mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('ssn')}
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                required
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
            <label
              className={`block mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {t('streetAddress')}
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
              <label
                className={`block mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('state')}
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
              <label
                className={`block mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('country')}
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
                {countries.map((country) => (
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
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors"
            >
              {dependent ? t('saveChanges') : t('addDependent')}
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

const generateChartData = (dependents: Dependent[]) => {
  const relationshipCounts = dependents.reduce((acc, dep) => {
    acc[dep.relationship] = (acc[dep.relationship] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const relationshipData = {
    labels: Object.keys(relationshipCounts).map(r => r.charAt(0).toUpperCase() + r.slice(1)),
    datasets: [{
      data: Object.values(relationshipCounts),
      backgroundColor: [
        'rgba(0, 199, 177, 0.8)',
        'rgba(162, 221, 248, 0.8)',
        'rgba(255, 191, 63, 0.8)',
      ],
      borderColor: [
        'rgba(0, 199, 177, 1)',
        'rgba(162, 221, 248, 1)',
        'rgba(255, 191, 63, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const statusLabels = ['Active', 'Inactive'];
  const statusCounts = statusLabels.map(status => 
    dependents.filter(d => d.status === status.toLowerCase()).length
  );

  const statusData = {
    labels: statusLabels,
    datasets: [{
      data: statusCounts,
      backgroundColor: [
        'rgba(0, 199, 177, 0.8)',
        'rgba(200, 16, 46, 0.8)',
      ],
      borderColor: [
        'rgba(0, 199, 177, 1)',
        'rgba(200, 16, 46, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const now = new Date();
  const ageGroups = {
    '0-18': 0,
    '19-30': 0,
    '31-50': 0,
    '51+': 0,
  };

  dependents.forEach(dep => {
    const birthDate = new Date(dep.dateOfBirth);
    const age = now.getFullYear() - birthDate.getFullYear();
    
    if (age <= 18) ageGroups['0-18']++;
    else if (age <= 30) ageGroups['19-30']++;
    else if (age <= 50) ageGroups['31-50']++;
    else ageGroups['51+']++;
  });

  const ageData = {
    labels: Object.keys(ageGroups),
    datasets: [{
      label: 'Age Distribution',
      data: Object.values(ageGroups),
      backgroundColor: 'rgba(0, 199, 177, 0.8)',
      borderColor: 'rgba(0, 199, 177, 1)',
      borderWidth: 1,
    }],
  };

  return { relationshipData, statusData, ageData };
};

const exportToExcel = (dependents: Dependent[]) => {
  const workbook = XLSX.utils.book_new();

  const summaryRows = [
    ['Dependents Summary Report'],
    ['Generated on:', new Date().toLocaleDateString()],
    ['Total Dependents:', dependents.length.toString()],
    ['Active Dependents:', dependents.filter(d => d.status === 'active').length.toString()],
    ['Inactive Dependents:', dependents.filter(d => d.status === 'inactive').length.toString()],
    [],
    ['Relationship Distribution'],
    ['Relationship', 'Count'],
    ...Object.entries(
      dependents.reduce((acc, dep) => {
        acc[dep.relationship] = (acc[dep.relationship] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([rel, count]) => [rel.charAt(0).toUpperCase() + rel.slice(1), count]),
    [],
    ['Status Distribution'],
    ['Status', 'Count'],
    ...Object.entries(
      dependents.reduce((acc, dep) => {
        acc[dep.status] = (acc[dep.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([status, count]) => [status.charAt(0).toUpperCase() + status.slice(1), count]),
  ];

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryRows);

  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "00C7B1" } },
    alignment: { horizontal: "center" },
  };

  summaryWs['A1'] = { v: 'Dependents Summary Report', s: headerStyle };
  XLSX.utils.sheet_add_aoa(workbook, summaryRows, { origin: 'A1' });

  const headers = ['First Name', 'Last Name', 'Relationship', 'Date of Birth', 'SSN', 'Address', 'Status'];
  const data = dependents.map(d => [
    d.firstName,
    d.lastName,
    d.relationship,
    d.dateOfBirth,
    d.ssn,
    `${d.address.street}, ${d.address.state}, ${d.address.country}`,
    d.status,
  ]);

  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

  XLSX.utils.book_append_sheet(workbook, summaryWs, 'Summary');
  XLSX.utils.book_append_sheet(workbook, ws, 'Detailed Data');

  XLSX.writeFile(workbook, 'dependents-report.xlsx');
};

const exportToPDF = async (dependents: Dependent[]) => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);

  const { relationshipData, statusData, ageData } = generateChartData(dependents);
  
  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'Inter'
          },
          usePointStyle: true,
          boxWidth: 10,
          boxHeight: 10
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 40,
        left: 20,
        right: 20
      }
    },
    animation: {
      duration: 0
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            family: 'Inter'
          },
          padding: 10
        },
        grid: {
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: 'Inter'
          },
          padding: 10
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false
      }
    }
  };

  const charts = [
    { data: relationshipData, type: 'pie', title: 'Relationship Distribution', options: chartOptions },
    { data: statusData, type: 'pie', title: 'Status Distribution', options: chartOptions },
    { data: ageData, type: 'bar', title: 'Age Distribution', options: barOptions }
  ];

  const chartElements: HTMLDivElement[] = [];

  for (const chart of charts) {
    const chartContainer = document.createElement('div');
    chartContainer.style.width = chart.type === 'bar' ? '600px' : '500px';
    chartContainer.style.height = '400px';
    chartContainer.style.backgroundColor = 'white';
    chartContainer.style.padding = '20px';
    chartContainer.style.boxSizing = 'border-box';
    chartContainer.style.position = 'relative';

    const chartDiv = document.createElement('div');
    chartDiv.style.width = '100%';
    chartDiv.style.height = '100%';
    chartContainer.appendChild(chartDiv);
    tempDiv.appendChild(chartContainer);
    chartElements.push(chartContainer);

    const chartComponent = chart.type === 'pie' 
      ? <Pie data={chart.data} options={chart.options} width={460} height={360} />
      : <Bar data={chart.data} options={chart.options} width={560} height={360} />;

    await new Promise<void>(resolve => {
      const root = createRoot(chartDiv);
      root.render(chartComponent);
      setTimeout(resolve, 1000);
    });
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  pdf.setFontSize(20);
  pdf.text('Dependents Analytics Report', width / 2, 20, { align: 'center' });
  pdf.setFontSize(12);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, width / 2, 30, { align: 'center' });

  pdf.setFontSize(14);
  pdf.text('Summary Statistics', 20, 45);
  pdf.setFontSize(12);
  pdf.text(`Total Dependents: ${dependents.length}`, 20, 55);
  pdf.text(`Active Dependents: ${dependents.filter(d => d.status === 'active').length}`, 20, 62);
  pdf.text(`Inactive Dependents: ${dependents.filter(d => d.status === 'inactive').length}`, 20, 69);

  for (let i = 0; i < chartElements.length; i++) {
    const canvas = await html2canvas(chartElements[i], {
      backgroundColor: 'white',
      scale: 2,
      logging: false,
      allowTaint: true,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const y = i === 0 ? 85 : (i === 1 ? 180 : 275);
    
    pdf.setFontSize(14);
    pdf.text(charts[i].title, 20, y - 5);
    
    const imgWidth = charts[i].type === 'bar' ? 170 : 150;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const xPos = charts[i].type === 'bar' ? 20 : 30;
    
    pdf.addImage(
      imgData,
      'PNG',
      xPos,
      y,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );

    if (i < chartElements.length - 1 && y + imgHeight + 95 > height) {
      pdf.addPage();
    }
  }

  document.body.removeChild(tempDiv);
  pdf.save('dependents-analytics.pdf');
};

export const DependentList: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<Dependent | undefined>();
  const [dependents, setDependents] = useState<Dependent[]>(mockDependents);
  const { t } = useTranslation();

  const { relationshipData, statusData, ageData } = generateChartData(dependents);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return isDarkMode
          ? 'bg-green-900/30 text-green-400'
          : 'bg-green-50 text-green-700';
      case 'inactive':
        return isDarkMode
          ? 'bg-red-900/30 text-red-400'
          : 'bg-red-50 text-red-700';
      default:
        return isDarkMode
          ? 'bg-gray-700 text-gray-300'
          : 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Dependents
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => exportToExcel(dependents)}
            className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: theme.colors.primary.lightBlue }}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export to Excel
          </button>
          <button
            onClick={() => exportToPDF(dependents)}
            className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: theme.colors.primary.yellow }}
          >
            <FilePdf className="w-4 h-4" />
            Export to PDF
          </button>
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
      </div>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl card-shadow`}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[240px]">
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
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={dependent.status === 'active'}
                        onChange={() => handleToggleStatus(dependent.id)}
                        className="form-checkbox h-5 w-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <span className={`ml-2 ${
                        dependent.status === 'active'
                          ? isDarkMode
                            ? 'text-green-400'
                            : 'text-green-600'
                          : isDarkMode
                            ? 'text-red-400'
                            : 'text-red-600'
                      }`}>
                        {dependent.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditDependent(dependent)}
                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default DependentList;