import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  FileText,
  Send,
  Download,
  Printer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  FlaskConical,
  Building2,
  Calendar,
  Package,
  Hash,
  Leaf,
  Upload,
  ExternalLink,
  AlertTriangle,
  Info,
  Settings,
  ChevronRight
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockSampleData = {
  id: 'SAMP-001',
  labId: 'LAB-123456',
  manifestNumber: 'MAN-123456',
  productName: 'Blue Dream Flower',
  productType: 'Flower',
  client: 'Green Valley Dispensary',
  clientLicense: 'C12-0000123-LIC',
  receivedDate: '2025-01-26',
  dueDate: '2025-01-29',
  batchNumber: 'BD-2025-001',
  sampleWeight: '15.5g',
  status: 'completed',
  integrations: {
    metrc: { 
      status: 'synced', 
      lastSync: '2025-01-26T14:30:00',
      packageTag: '1A4FF0300000029000000175'
    },
    confidentCannabis: { 
      status: 'pending', 
      lastSync: null 
    }
  },
  testResults: {
    potency: {
      status: 'completed',
      result: 'pass',
      completedDate: '2025-01-26T16:45:00',
      technician: 'John Smith',
      data: {
        thc: { value: 22.5, unit: '%', limit: null, status: 'pass' },
        cbd: { value: 0.3, unit: '%', limit: null, status: 'pass' },
        cbg: { value: 1.2, unit: '%', limit: null, status: 'pass' },
        thca: { value: 24.8, unit: '%', limit: null, status: 'pass' },
        cbda: { value: 0.4, unit: '%', limit: null, status: 'pass' },
        totalCannabinoids: { value: 49.2, unit: '%', limit: null, status: 'pass' }
      }
    },
    microbiology: {
      status: 'completed',
      result: 'pass',
      completedDate: '2025-01-26T17:30:00',
      technician: 'Jane Doe',
      data: {
        salmonella: { value: 'Not Detected', unit: '', limit: 'Not Detected', status: 'pass' },
        ecoli: { value: 'Not Detected', unit: '', limit: 'Not Detected', status: 'pass' },
        aspergillus: { value: '<1', unit: 'CFU/g', limit: '<1', status: 'pass' },
        totalYeastMold: { value: '<10', unit: 'CFU/g', limit: '<10000', status: 'pass' }
      }
    },
    heavyMetals: {
      status: 'completed',
      result: 'pass',
      completedDate: '2025-01-27T09:15:00',
      technician: 'Mike Johnson',
      data: {
        arsenic: { value: 0.08, unit: 'ppm', limit: 0.2, status: 'pass' },
        cadmium: { value: 0.05, unit: 'ppm', limit: 0.2, status: 'pass' },
        lead: { value: 0.12, unit: 'ppm', limit: 0.5, status: 'pass' },
        mercury: { value: 0.01, unit: 'ppm', limit: 0.1, status: 'pass' }
      }
    },
    pesticides: {
      status: 'in_progress',
      result: null,
      completedDate: null,
      technician: null,
      data: {}
    }
  }
};

// Test category configuration
const testCategories = {
  potency: {
    name: 'Potency',
    icon: Leaf,
    description: 'Cannabinoid profile analysis'
  },
  microbiology: {
    name: 'Microbiology',
    icon: AlertCircle,
    description: 'Microbial contamination testing'
  },
  heavyMetals: {
    name: 'Heavy Metals',
    icon: AlertTriangle,
    description: 'Heavy metal contamination testing'
  },
  pesticides: {
    name: 'Pesticides',
    icon: Settings,
    description: 'Pesticide residue analysis'
  }
};

// Result row component
const ResultRow = ({ name, data }) => {
  const getStatusColor = (status) => {
    return status === 'pass' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status) => {
    return status === 'pass' ? 
      <CheckCircle2 className="w-4 h-4" /> : 
      <XCircle className="w-4 h-4" />;
  };

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-3 px-4 text-sm font-medium text-gray-900">{name}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {data.value} {data.unit}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {data.limit ? `${data.limit} ${data.unit}` : '-'}
      </td>
      <td className="py-3 px-4">
        <div className={`flex items-center gap-1 ${getStatusColor(data.status)}`}>
          {getStatusIcon(data.status)}
          <span className="text-sm font-medium capitalize">{data.status}</span>
        </div>
      </td>
    </tr>
  );
};

// Test result panel component
const TestResultPanel = ({ category, data }) => {
  const config = testCategories[category];
  const Icon = config.icon;

  const getStatusBadge = () => {
    if (data.status === 'completed') {
      const colorClass = data.result === 'pass' 
        ? 'bg-green-100 text-green-700 border-green-200' 
        : 'bg-red-100 text-red-700 border-red-200';
      const StatusIcon = data.result === 'pass' ? CheckCircle2 : XCircle;
      
      return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
          <StatusIcon className="w-4 h-4" />
          {data.result === 'pass' ? 'Passed' : 'Failed'}
        </span>
      );
    }
    
    if (data.status === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border bg-orange-100 text-orange-700 border-orange-200">
          <Clock className="w-4 h-4" />
          In Progress
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border bg-gray-100 text-gray-600 border-gray-200">
        <AlertCircle className="w-4 h-4" />
        Pending
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border border-gray-200">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{config.name}</h3>
              <p className="text-sm text-gray-600">{config.description}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </div>

      {data.status === 'completed' && (
        <>
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Completed: {new Date(data.completedDate).toLocaleString()}
              </span>
              <span className="text-gray-600">
                Technician: {data.technician}
              </span>
            </div>
          </div>

          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Analyte</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Result</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Limit</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.data).map(([key, value]) => (
                  <ResultRow 
                    key={key} 
                    name={key.replace(/([A-Z])/g, ' $1').trim()} 
                    data={value} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {data.status === 'in_progress' && (
        <div className="p-6">
          <div className="flex items-center justify-center text-gray-500">
            <Clock className="w-5 h-5 mr-2" />
            <span>Test in progress...</span>
          </div>
        </div>
      )}

      {data.status === 'pending' && (
        <div className="p-6">
          <div className="flex items-center justify-center text-gray-500">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Test not yet started</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Integration status component
const IntegrationStatus = ({ integration, data }) => {
  const getStatusBadge = () => {
    if (data.status === 'synced') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle2 className="w-3 h-3" />
          Synced
        </span>
      );
    }
    if (data.status === 'error') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <XCircle className="w-3 h-3" />
          Error
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{integration}</p>
        {data.lastSync && (
          <p className="text-sm text-gray-500">
            Last sync: {new Date(data.lastSync).toLocaleString()}
          </p>
        )}
        {data.packageTag && (
          <p className="text-sm text-gray-500">
            Package: {data.packageTag}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {getStatusBadge()}
        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <ExternalLink className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

// Main component
function SampleResultsDetail() {
  const { sampleId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('potency');
  const [sample, setSample] = useState(mockSampleData);

  // Check if all tests are completed
  const allTestsCompleted = Object.values(sample.testResults).every(
    test => test.status === 'completed'
  );

  // Check if any tests failed
  const hasFailedTests = Object.values(sample.testResults).some(
    test => test.status === 'completed' && test.result === 'fail'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/reporting')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reporting
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{sample.productName}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Hash className="w-4 h-4" />
                    {sample.labId}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {sample.manifestNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {sample.client}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Product Type</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{sample.productType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Batch Number</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{sample.batchNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Sample Weight</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{sample.sampleWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Due Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date(sample.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {allTestsCompleted && !hasFailedTests && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Report to Client
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download COA
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {hasFailedTests && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium text-red-800">
                    This sample has failed one or more tests and cannot be approved for sale.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Results Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {Object.entries(testCategories).map(([key, config]) => {
                const testData = sample.testResults[key];
                const isActive = activeTab === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`
                      py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                      ${isActive 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <config.icon className="w-4 h-4" />
                    {config.name}
                    {testData.status === 'completed' && testData.result === 'fail' && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    {testData.status === 'in_progress' && (
                      <Clock className="w-4 h-4 text-orange-500" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            <TestResultPanel 
              category={activeTab} 
              data={sample.testResults[activeTab]} 
            />
          </div>
        </div>

        {/* Integration Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Integration Status
          </h2>
          <div className="divide-y divide-gray-200">
            <IntegrationStatus integration="Metrc" data={sample.integrations.metrc} />
            <IntegrationStatus integration="Confident Cannabis" data={sample.integrations.confidentCannabis} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleResultsDetail;