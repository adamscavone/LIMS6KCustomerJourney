import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  FileText,
  Send,
  Download,
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
  ChevronRight,
  FileDown,
  Eye,
  User,
  AlertOctagon,
  MessageSquare,
  Target,
  RefreshCw,
  TrendingUp,
  X,
  ChevronDown
} from 'lucide-react';
import { 
  ComposedChart,
  Scatter, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Helper function to generate mock data based on sample ID
const generateMockDataFromId = (sampleId) => {
  const seedNum = typeof sampleId === 'number' ? sampleId : (parseInt(sampleId) || 1);
  
  // Status options for more specific "In Progress" states
  const progressStatuses = [
    { status: 'in_prep', label: 'In Prep', assignee: `Lab Tech ${(seedNum % 3) + 1}` },
    { status: 'awaiting_analysis', label: 'Awaiting Analysis', assignee: `Analyst ${(seedNum % 2) + 1}` },
    { status: 'on_instrument', label: 'On Instrument', assignee: 'Unassigned' },
    { status: 'data_review', label: 'Data Review', assignee: `QA Tech ${(seedNum % 2) + 1}` }
  ];
  
  const currentProgress = progressStatuses[seedNum % progressStatuses.length];
  
  return {
    progressStatus: currentProgress,
    potencyTargets: {
      'Total THC': { low: 20.0 + (seedNum % 5), high: 25.0 + (seedNum % 5) },
      'Total CBD': { low: 0.5, high: 2.0 },
      'Tetrahydrocannabinol (THC)': { low: 0.5, high: 2.0 },
      'Cannabidiol (CBD)': { low: 0.3, high: 1.5 },
      'Tetrahydrocannabinolic Acid (THCA)': { low: 22.0 + (seedNum % 3), high: 26.0 + (seedNum % 3) }
    },
    manifestNotes: seedNum % 3 === 0 ? `Special handling required - Client request #${seedNum}` : null,
    assayNotes: {
      'Cannabinoids': seedNum % 4 === 0 ? 'Dilution required due to high concentration' : null,
      'Microbial': seedNum % 5 === 0 ? 'Extended incubation period completed' : null,
      'Heavy Metals': seedNum % 6 === 0 ? 'Sample digestion repeated for accuracy' : null
    }
  };
};

// Generate dynamic dates relative to current date
const generateDynamicDates = () => {
  const today = new Date();
  const receivedDate = new Date(today);
  receivedDate.setDate(today.getDate() - 2); // Received 2 days ago
  receivedDate.setHours(10, 30, 0, 0);
  
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 1); // Due tomorrow
  dueDate.setHours(17, 0, 0, 0);
  
  const completedDate = new Date(today);
  completedDate.setDate(today.getDate() - 1); // Completed yesterday
  completedDate.setHours(16, 45, 0, 0);
  
  return {
    receivedDate: receivedDate.toISOString(),
    dueDate: dueDate.toISOString(),
    completedDate: completedDate.toISOString()
  };
};

const dynamicDates = generateDynamicDates();

// Mock data - replace with actual API calls
const mockSampleData = {
  id: 'SAMP-001',
  labId: 'LAB-123456',
  sampleId: 1001,
  manifestNumber: 'MAN-123456',
  productName: 'Blue Dream Flower',
  productType: 'Flower',
  testCategory: 'Dispensary Plant Material',
  client: 'Green Valley Dispensary',
  clientLicense: 'C12-0000123-LIC',
  receivedDate: dynamicDates.receivedDate,
  dueDate: dynamicDates.dueDate,
  sampleWeight: '15.5g',
  status: 'ready_to_report',
  metrcTag: '1A4070300002711000010043',
  submissionHistory: [],
  testResults: {
    potency: {
      status: 'completed',
      result: 'pass',
      completedDate: dynamicDates.completedDate,
      technician: 'John Smith',
      batchNumbers: ['CANN-2025-001', 'CANN-2025-002R'],
      replicates: [
        {
          replicateNumber: 1,
          data: {
            'Tetrahydrocannabinolic Acid (THCA)': { value: 24.8, unit: 'mg/g', status: 'pass' },
            'Tetrahydrocannabinol (THC)': { value: 0.8, unit: 'mg/g', status: 'pass' },
            'Total THC': { value: 22.5, unit: 'mg/g', status: 'pass' },
            'Cannabidiolic Acid (CBDA)': { value: 0.4, unit: 'mg/g', status: 'pass' },
            'Cannabidiol (CBD)': { value: 0.3, unit: 'mg/g', status: 'pass' },
            'Total CBD': { value: 0.65, unit: 'mg/g', status: 'pass' },
            'Cannabigerol (CBG)': { value: 1.2, unit: 'mg/g', status: 'pass' },
            'Cannabinol (CBN)': { value: 0.1, unit: 'mg/g', status: 'pass' },
            'Total Cannabinoids': { value: 49.2, unit: 'mg/g', status: 'pass' }
          }
        },
        {
          replicateNumber: 2,
          data: {
            'Tetrahydrocannabinolic Acid (THCA)': { value: 24.6, unit: 'mg/g', status: 'pass' },
            'Tetrahydrocannabinol (THC)': { value: 0.9, unit: 'mg/g', status: 'pass' },
            'Total THC': { value: 22.4, unit: 'mg/g', status: 'pass' },
            'Cannabidiolic Acid (CBDA)': { value: 0.4, unit: 'mg/g', status: 'pass' },
            'Cannabidiol (CBD)': { value: 0.3, unit: 'mg/g', status: 'pass' },
            'Total CBD': { value: 0.65, unit: 'mg/g', status: 'pass' },
            'Cannabigerol (CBG)': { value: 1.1, unit: 'mg/g', status: 'pass' },
            'Cannabinol (CBN)': { value: 0.1, unit: 'mg/g', status: 'pass' },
            'Total Cannabinoids': { value: 48.9, unit: 'mg/g', status: 'pass' }
          }
        }
      ],
      averageData: {
        'Tetrahydrocannabinolic Acid (THCA)': { value: 24.7, unit: 'mg/g', status: 'pass' },
        'Tetrahydrocannabinol (THC)': { value: 0.85, unit: 'mg/g', status: 'pass' },
        'Total THC': { value: 22.45, unit: 'mg/g', status: 'pass' },
        'Cannabidiolic Acid (CBDA)': { value: 0.4, unit: 'mg/g', status: 'pass' },
        'Cannabidiol (CBD)': { value: 0.3, unit: 'mg/g', status: 'pass' },
        'Total CBD': { value: 0.65, unit: 'mg/g', status: 'pass' },
        'Cannabigerol (CBG)': { value: 1.15, unit: 'mg/g', status: 'pass' },
        'Cannabinol (CBN)': { value: 0.1, unit: 'mg/g', status: 'pass' },
        'Total Cannabinoids': { value: 49.05, unit: 'mg/g', status: 'pass' }
      }
    },
    microbiology: {
      status: 'completed',
      result: 'pass',
      completedDate: dynamicDates.completedDate,
      technician: 'Jane Doe',
      batchNumbers: ['MICRO-2025-001'],
      data: {
        'Salmonella': { value: 'Not Detected', unit: '', limit: 'Not Detected', status: 'pass' },
        'E. coli': { value: 'Not Detected', unit: '', limit: 'Not Detected', status: 'pass' },
        'Aspergillus': { value: '<1', unit: 'CFU/g', limit: '<1', status: 'pass' },
        'Total Yeast and Mold': { value: '<10', unit: 'CFU/g', limit: '<10000', status: 'pass' }
      }
    },
    heavyMetals: {
      status: 'completed',
      result: 'pass',
      completedDate: dynamicDates.completedDate,
      technician: 'Mike Johnson',
      batchNumbers: ['HM-2025-001'],
      data: {
        'Arsenic': { value: 0.08, unit: 'ppm', limit: 0.2, status: 'pass' },
        'Cadmium': { value: 0.05, unit: 'ppm', limit: 0.2, status: 'pass' },
        'Lead': { value: 0.12, unit: 'ppm', limit: 0.5, status: 'pass' },
        'Mercury': { value: 0.01, unit: 'ppm', limit: 0.1, status: 'pass' }
      }
    },
    pesticides: {
      status: 'in_progress',
      result: null,
      completedDate: null,
      technician: null,
      assignedTo: 'Analyst 2',
      progressStatus: 'awaiting_analysis',
      batchNumbers: ['PEST-2025-001'],
      data: {}
    }
  }
};

// Test category configuration
const testCategories = {
  potency: {
    name: 'Cannabinoids',
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

// Report Preview Modal
const ReportPreviewModal = ({ isOpen, onClose, sample, onDownload }) => {
  const [activeTab, setActiveTab] = useState('coa');
  const [downloadFormat, setDownloadFormat] = useState('both');

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Report Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('coa')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'coa'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Certificate of Analysis
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'csv'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            CSV Export
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'coa' ? (
            <div className="bg-gray-100 rounded-lg p-8 min-h-[600px]">
              <div className="bg-white rounded shadow-sm p-8 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Certificate of Analysis</h1>
                  <p className="text-gray-600 mt-2">Lab ID: {sample.labId}</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Sample Information</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Product:</span> {sample.productName}</p>
                        <p><span className="font-medium">Type:</span> {sample.productType}</p>
                        <p><span className="font-medium">Client:</span> {sample.client}</p>
                        <p><span className="font-medium">Test Category:</span> {sample.testCategory}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Test Results Summary</h3>
                      <div className="space-y-2">
                        {Object.entries(sample.testResults).filter(([_, test]) => test.status === 'completed').map(([key, test]) => (
                          <div key={key} className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{testCategories[key].name}:</span>
                            <span className={test.result === 'pass' ? 'text-green-600' : 'text-red-600'}>
                              {test.result === 'pass' ? 'PASS' : 'FAIL'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Cannabinoid Results */}
                  {sample.testResults.potency.status === 'completed' && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Cannabinoid Profile</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Analyte</th>
                            <th className="text-right py-2">Result</th>
                            <th className="text-left py-2 pl-2">Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const analyteOrder = ['Total THC', 'Total CBD', 'Total Cannabinoids'];
                            const entries = Object.entries(sample.testResults.potency.averageData);
                            const priorityEntries = analyteOrder
                              .filter(a => sample.testResults.potency.averageData[a])
                              .map(a => [a, sample.testResults.potency.averageData[a]]);
                            const otherEntries = entries
                              .filter(([a]) => !analyteOrder.includes(a))
                              .sort(([a], [b]) => a.localeCompare(b));
                            return [...priorityEntries, ...otherEntries].map(([analyte, data]) => (
                              <tr key={analyte} className="border-b">
                                <td className="py-1">{analyte}</td>
                                <td className="text-right py-1">{data.value}</td>
                                <td className="pl-2 py-1">{data.unit}</td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Report Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Metrc Tag</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Analyte</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pass/Fail</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(sample.testResults.potency.averageData || {}).map(([analyte, data]) => (
                      <tr key={analyte}>
                        <td className="px-4 py-2 text-sm">{today}</td>
                        <td className="px-4 py-2 text-sm font-mono">{sample.metrcTag}</td>
                        <td className="px-4 py-2 text-sm">{analyte} ({data.unit}) {sample.testCategory}</td>
                        <td className="px-4 py-2 text-sm">{data.value}</td>
                        <td className="px-4 py-2 text-sm">True</td>
                        <td className="px-4 py-2 text-sm">Csv Upload</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Download Format:</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={downloadFormat === 'pdf'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">COA Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={downloadFormat === 'csv'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">CSV Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="both"
                    checked={downloadFormat === 'both'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Both COA & CSV</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onDownload(downloadFormat)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metrc Submission Modal
const MetrcSubmissionModal = ({ isOpen, onClose, sample, onConfirm }) => {
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().split('T')[0]);
  const [submissionTime, setSubmissionTime] = useState(new Date().toTimeString().slice(0, 5));
  const [submissionMethod, setSubmissionMethod] = useState('csv_upload');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Confirm Metrc Submission</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Please confirm that sample {sample.labId} has been submitted to Metrc.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
            <input
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Submission Time</label>
            <input
              type="time"
              value={submissionTime}
              onChange={(e) => setSubmissionTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Submission Method</label>
            <select
              value={submissionMethod}
              onChange={(e) => setSubmissionMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="csv_upload">CSV Upload</option>
              <option value="manual_entry">Manual Entry</option>
              <option value="api">API Integration</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional notes about the submission..."
            />
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm({
              date: submissionDate,
              time: submissionTime,
              method: submissionMethod,
              notes,
              submittedBy: 'Current User' // Would come from auth context
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Submission
          </button>
        </div>
      </div>
    </div>
  );
};

// Generate mock historical data
const generateHistoricalData = (analyteType, sampleId) => {
  const seedNum = typeof sampleId === 'number' ? sampleId : (parseInt(sampleId) || 1);
  const count = 15 + (seedNum % 10); // 15-24 samples
  
  // Base values for different analytes
  const baseValues = {
    'Total THC': 22.5 + (seedNum % 3),
    'Total CBD': 1.2 + (seedNum % 2) * 0.3,
    'Total Cannabinoids': 24.0 + (seedNum % 4),
    'Tetrahydrocannabinolic Acid (THCA)': 25.0 + (seedNum % 3),
    'Tetrahydrocannabinol (THC)': 0.9 + (seedNum % 2) * 0.2,
    'Cannabidiolic Acid (CBDA)': 0.4 + (seedNum % 3) * 0.1,
    'Cannabidiol (CBD)': 0.8 + (seedNum % 2) * 0.2,
    'Cannabigerol (CBG)': 1.3 + (seedNum % 3) * 0.2,
    'Cannabinol (CBN)': 0.2 + (seedNum % 2) * 0.1
  };
  
  // Calculate average with some variance
  const baseValue = baseValues[analyteType] || 0.5;
  const variance = baseValue * 0.05; // 5% variance
  const average = baseValue + (Math.random() - 0.5) * variance;
  
  return {
    average: Math.round(average * 100) / 100, // Round to 2 decimal places
    count: count
  };
};

// Result row component for replicates
const ReplicateResultRow = ({ name, replicates, averageData, target, isOhio, sampleId }) => {
  const historicalData = generateHistoricalData(name, sampleId);
  
  const getStatusColor = (value, target) => {
    if (!target || (!target.low && !target.high)) return 'text-gray-600';
    
    if (target.low && target.high && target.low !== target.high) {
      // Range target
      return (value >= target.low && value <= target.high) ? 'text-green-600' : 'text-red-600';
    } else {
      // Single target with 10% tolerance
      const targetValue = target.low || target.high;
      const tolerance = targetValue * 0.10;
      return Math.abs(value - targetValue) <= tolerance ? 'text-green-600' : 'text-red-600';
    }
  };

  const formatTargetRange = (target) => {
    if (!target || (!target.low && !target.high)) return '-';
    if (target.low === target.high || !target.high) return target.low || '-';
    return `${target.low}-${target.high}`;
  };

  const isOffSpec = averageData && target && (target.low || target.high) && 
    getStatusColor(averageData.value, target) === 'text-red-600';

  // Determine unit for this analyte
  const unit = averageData?.unit || 'mg/g';

  return (
    <tr className={`border-b border-gray-100 last:border-0 ${isOffSpec ? 'bg-red-50' : ''}`}>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        {name}
        {isOhio && name === 'Total Cannabinoids' && (
          <span className="ml-2 group relative">
            <Info className="w-3 h-3 text-gray-400 inline" />
            <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              For data integrity monitoring only - not reported on CoA per Ohio regulations
            </div>
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {formatTargetRange(target)}
        {isOffSpec && (
          <AlertOctagon className="w-4 h-4 text-red-600 inline ml-2" />
        )}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {unit}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span>{historicalData.average}</span>
          <span className="text-gray-400">({historicalData.count})</span>
          <span className="ml-1 group relative cursor-help">
            <Info className="w-3 h-3 text-gray-400" />
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal pointer-events-none z-10 w-64">
              Average value for this analyte across {historicalData.count} samples of the same product (SKU/ItemBrand) tested for this customer over the past 12 months
            </div>
          </span>
        </div>
      </td>
      <td className={`py-3 px-4 text-sm font-medium ${getStatusColor(averageData?.value, target)}`}>
        <div className="flex items-center gap-1">
          {averageData ? `${averageData.value} ${averageData.unit}` : '-'}
          <span className="text-xs text-gray-500 ml-1 group relative cursor-help">
            <Info className="w-3 h-3" />
            <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Average of {replicates?.length || 0} replicates
            </div>
          </span>
        </div>
      </td>
      {replicates?.map((rep, idx) => (
        <td key={idx} className="py-3 px-4 text-sm text-gray-600">
          {rep.data[name] ? `${rep.data[name].value}` : '-'}
        </td>
      ))}
    </tr>
  );
};

// Test result panel component
const TestResultPanel = ({ category, data, targets, notes, isOhio, sampleId }) => {
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
          {data.progressStatus || 'In Progress'}
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
          <div className="flex items-center gap-3">
            {data.batchNumbers && data.batchNumbers.length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Batch{data.batchNumbers.length > 1 ? 'es' : ''}:</span> {data.batchNumbers.join(', ')}
              </div>
            )}
            {getStatusBadge()}
          </div>
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

          {notes && (
            <div className="px-6 py-3 bg-yellow-50 border-b border-gray-200">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">{notes}</p>
              </div>
            </div>
          )}

          <div className="p-6">
            {category === 'potency' && data.replicates ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Analyte</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Target/Range</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Units</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-1">
                        Historical Average
                        <span className="group relative cursor-help">
                          <Info className="w-3 h-3 text-gray-400" />
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal pointer-events-none z-10 w-64">
                            Average value for each analyte based on historical testing of the same product (SKU) for this customer over the past 12 months. Number in parentheses indicates sample count.
                          </div>
                        </span>
                      </div>
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">
                      Reported Result
                    </th>
                    {data.replicates.map((_, idx) => (
                      <th key={idx} className="text-left py-2 text-sm font-medium text-gray-700">
                        Rep {idx + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const analyteOrder = ['Total THC', 'Total CBD', 'Total Cannabinoids'];
                    const otherAnalytes = Object.keys(data.averageData || {})
                      .filter(a => !analyteOrder.includes(a))
                      .sort();
                    const orderedAnalytes = [...analyteOrder.filter(a => data.averageData[a]), ...otherAnalytes];
                    
                    return orderedAnalytes.map(analyte => (
                      <ReplicateResultRow 
                        key={analyte}
                        name={analyte}
                        replicates={data.replicates}
                        averageData={data.averageData[analyte]}
                        target={targets?.[analyte]}
                        isOhio={isOhio}
                        sampleId={sampleId || 1001}
                      />
                    ));
                  })()}
                </tbody>
              </table>
            ) : (
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
                  {Object.entries(data.data).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{key}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {value.value} {value.unit}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {value.limit ? `${value.limit} ${value.unit}` : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center gap-1 ${value.status === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                          {value.status === 'pass' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          <span className="text-sm font-medium capitalize">{value.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {data.status === 'in_progress' && (
        <div className="p-6">
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Clock className="w-8 h-8 mb-2" />
            <span className="font-medium">{data.progressStatus || 'Test in progress'}</span>
            {data.assignedTo && (
              <span className="text-sm mt-1">Assigned to: {data.assignedTo}</span>
            )}
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

// Submission History
const SubmissionHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No submission history available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((submission, idx) => (
        <div key={idx} className="flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">
              {submission.method === 'csv_upload' ? 'CSV Upload' : 
               submission.method === 'manual_entry' ? 'Manual Entry' :
               submission.method === 'api' ? 'API Integration' : 'Other Method'}
            </p>
            <p className="text-gray-600">
              {new Date(submission.date + 'T' + submission.time).toLocaleString()} by {submission.submittedBy}
            </p>
            {submission.notes && (
              <p className="text-gray-500 italic mt-1">{submission.notes}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main component
function SampleResultsDetail() {
  const { sampleId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('potency');
  const [sample, setSample] = useState(mockSampleData);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [showMetrcModal, setShowMetrcModal] = useState(false);
  const [showReanalysisModal, setShowReanalysisModal] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [selectedCannabinoids, setSelectedCannabinoids] = useState(['Total THC', 'Total CBD']);
  const [showCannabinoidDropdown, setShowCannabinoidDropdown] = useState(false);

  // Load additional mock data
  useEffect(() => {
    const mockData = generateMockDataFromId(sample.sampleId);
    setAdditionalData(mockData);
  }, [sample.sampleId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCannabinoidDropdown && !event.target.closest('.cannabinoid-dropdown')) {
        setShowCannabinoidDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCannabinoidDropdown]);

  // Check if all tests are completed
  const allTestsCompleted = Object.values(sample.testResults).every(
    test => test.status === 'completed'
  );

  // Check if any tests failed
  const hasFailedTests = Object.values(sample.testResults).some(
    test => test.status === 'completed' && test.result === 'fail'
  );

  // Determine if this is Ohio (would come from user context)
  const isOhio = true; // Mock value

  const handleDownloadReport = (format) => {
    setShowReportPreview(false);
    // Mock download action
    console.log(`Downloading ${format} report for sample ${sample.labId}`);
  };

  const handleMetrcSubmission = (submissionData) => {
    setShowMetrcModal(false);
    // Update sample with submission history
    setSample(prev => ({
      ...prev,
      submissionHistory: [...(prev.submissionHistory || []), submissionData],
      status: 'reported'
    }));
    console.log('Metrc submission confirmed:', submissionData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
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

                {additionalData?.manifestNotes && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Manifest Note</p>
                        <p className="text-sm text-yellow-700">{additionalData.manifestNotes}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Product Type</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{sample.productType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Test Category</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{sample.testCategory}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Sample Weight</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{sample.sampleWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Due Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date(sample.dueDate).toLocaleDateString()} {new Date(sample.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setShowReportPreview(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => setShowReportPreview(true)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CoA/CSV
                </button>
                {allTestsCompleted && !hasFailedTests && (
                  <button 
                    onClick={() => setShowMetrcModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Confirm Metrc Submission
                  </button>
                )}
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

            {/* Potency Target Alerts */}
            {additionalData && sample.testResults.potency.status === 'completed' && (
              <div className="mt-4">
                {Object.entries(sample.testResults.potency.averageData).some(([analyte, data]) => {
                  const target = additionalData.potencyTargets[analyte];
                  if (!target || (!target.low && !target.high)) return false;
                  
                  if (target.low && target.high && target.low !== target.high) {
                    return data.value < target.low || data.value > target.high;
                  } else {
                    const targetValue = target.low || target.high;
                    const tolerance = targetValue * 0.10;
                    return Math.abs(data.value - targetValue) > tolerance;
                  }
                }) && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Potency results are outside target specifications
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                          One or more cannabinoids are not within the expected target range. Review results carefully.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Historical SKU Trends Visualization */}
        {sample.testResults.potency.status === 'completed' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Historical Potency Trends - {sample.productName}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Last 12 months (47 samples)</span>
                </div>
                <button
                  onClick={() => setShowReanalysisModal(true)}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Request Reanalysis
                </button>
              </div>
            </div>
            
            {/* Cannabinoid Selection */}
            <div className="mb-4">
              <div className="relative cannabinoid-dropdown">
                <button
                  onClick={() => setShowCannabinoidDropdown(!showCannabinoidDropdown)}
                  className="w-full md:w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between gap-2"
                >
                  <span className="font-medium">
                    {selectedCannabinoids.length === 0 
                      ? 'Select cannabinoids to display'
                      : `${selectedCannabinoids.length} cannabinoid${selectedCannabinoids.length === 1 ? '' : 's'} selected`
                    }
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCannabinoidDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showCannabinoidDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-3 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Select Cannabinoids</span>
                        <button
                          onClick={() => {
                            const allCannabinoids = Object.keys(sample.testResults.potency.averageData || {});
                            setSelectedCannabinoids(selectedCannabinoids.length === allCannabinoids.length ? [] : allCannabinoids);
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          {selectedCannabinoids.length === Object.keys(sample.testResults.potency.averageData || {}).length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-3">
                      {Object.keys(sample.testResults.potency.averageData || {}).map(cannabinoid => (
                        <label key={cannabinoid} className="flex items-center py-1.5 hover:bg-gray-50 cursor-pointer rounded">
                          <input
                            type="checkbox"
                            checked={selectedCannabinoids.includes(cannabinoid)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCannabinoids([...selectedCannabinoids, cannabinoid]);
                              } else {
                                setSelectedCannabinoids(selectedCannabinoids.filter(c => c !== cannabinoid));
                              }
                            }}
                            className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{cannabinoid}</span>
                          <span className="ml-auto text-xs text-gray-500">
                            {sample.testResults.potency.averageData[cannabinoid]?.value.toFixed(2)}%
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <HistoricalSKUChart 
              productName={sample.productName}
              currentData={sample.testResults.potency.averageData}
              sampleId={sample.sampleId}
              selectedCannabinoids={selectedCannabinoids}
            />
          </div>
        )}

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
              targets={activeTab === 'potency' ? additionalData?.potencyTargets : null}
              notes={additionalData?.assayNotes?.[testCategories[activeTab].name]}
              isOhio={isOhio}
              sampleId={sample.sampleId}
            />
          </div>
        </div>

        {/* Submission History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Metrc Submission History
          </h2>
          <SubmissionHistory history={sample.submissionHistory} />
        </div>
      </div>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={showReportPreview}
        onClose={() => setShowReportPreview(false)}
        sample={sample}
        onDownload={handleDownloadReport}
      />

      {/* Metrc Submission Modal */}
      <MetrcSubmissionModal
        isOpen={showMetrcModal}
        onClose={() => setShowMetrcModal(false)}
        sample={sample}
        onConfirm={handleMetrcSubmission}
      />

      {/* Reanalysis Request Modal */}
      <ReanalysisModal
        isOpen={showReanalysisModal}
        onClose={() => setShowReanalysisModal(false)}
        sample={sample}
        onConfirm={(data) => {
          console.log('Reanalysis requested:', data);
          alert(`Reanalysis request submitted for ${data.analytes.length} analyte(s)`);
        }}
      />
    </div>
  );
}

// Historical SKU Chart Component
const HistoricalSKUChart = ({ productName, currentData, sampleId, selectedCannabinoids }) => {
  // Color palette for different cannabinoids
  const cannabinoidColors = {
    'Total THC': '#3B82F6',
    'Total CBD': '#10B981',
    'Total Cannabinoids': '#8B5CF6',
    'Tetrahydrocannabinol (THC)': '#F59E0B',
    'Cannabidiol (CBD)': '#EC4899',
    'Tetrahydrocannabinolic Acid (THCA)': '#14B8A6',
    'Cannabidiolic Acid (CBDA)': '#EF4444',
    'Cannabigerol (CBG)': '#6366F1',
    'Cannabinol (CBN)': '#84CC16',
    'Cannabichromene (CBC)': '#F97316',
    'Total CBG': '#A78BFA',
    'delta-9-Tetrahydrocannabinol': '#06B6D4'
  };

  // Generate mock historical data (12 months with multiple samples per month)
  const generateHistoricalData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const data = [];
    
    // Generate multiple data points per month (3-6 samples per month)
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth - 11 + i + 12) % 12;
      const samplesInMonth = 3 + Math.floor(Math.random() * 4); // 3-6 samples
      
      for (let j = 0; j < samplesInMonth; j++) {
        const sampleData = {
          month: months[monthIndex],
          monthIndex: i,
          sampleIndex: j,
          current: i === 11 && j === samplesInMonth - 1 // Mark current sample
        };
        
        // Generate data for each cannabinoid
        Object.keys(currentData || {}).forEach(cannabinoid => {
          const currentValue = currentData[cannabinoid]?.value || 0;
          let baseValue = currentValue;
          let variation = 0;
          
          // Set base values and variations based on cannabinoid type
          if (cannabinoid === 'Total THC') {
            baseValue = 22 + (sampleId % 5);
            variation = (Math.random() - 0.5) * 3; // ±1.5%
          } else if (cannabinoid === 'Total CBD') {
            baseValue = 1.5 + (sampleId % 3) * 0.2;
            variation = (Math.random() - 0.5) * 0.5; // ±0.25%
          } else if (cannabinoid === 'Total Cannabinoids') {
            baseValue = 25 + (sampleId % 6);
            variation = (Math.random() - 0.5) * 4; // ±2%
          } else if (cannabinoid.includes('THC')) {
            baseValue = currentValue > 10 ? currentValue : 15 + (sampleId % 4);
            variation = (Math.random() - 0.5) * 2; // ±1%
          } else if (cannabinoid.includes('CBD')) {
            baseValue = currentValue > 1 ? currentValue : 1 + (sampleId % 2) * 0.3;
            variation = (Math.random() - 0.5) * 0.4; // ±0.2%
          } else {
            baseValue = currentValue > 0.5 ? currentValue : 0.5 + (sampleId % 10) * 0.1;
            variation = (Math.random() - 0.5) * 0.2; // ±0.1%
          }
          
          // For current sample, use actual value
          if (sampleData.current) {
            sampleData[cannabinoid] = currentValue;
          } else {
            sampleData[cannabinoid] = Math.max(0, baseValue + variation);
          }
        });
        
        data.push(sampleData);
      }
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();

  // Transform data for scatterplot
  const getScatterData = () => {
    const scatterData = [];
    
    selectedCannabinoids.forEach(cannabinoid => {
      historicalData.forEach(point => {
        scatterData.push({
          month: point.month,
          monthIndex: point.monthIndex,
          cannabinoid: cannabinoid,
          value: point[cannabinoid],
          current: point.current,
          color: cannabinoidColors[cannabinoid] || '#6B7280'
        });
      });
    });
    
    return scatterData;
  };

  // Custom dot shape
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    
    if (payload.current) {
      // Current sample - larger with double circle
      return (
        <g>
          <circle cx={cx} cy={cy} r={8} fill={payload.color} stroke="#fff" strokeWidth={3} />
          <circle cx={cx} cy={cy} r={4} fill="#fff" />
        </g>
      );
    }
    
    // Regular samples - solid circles
    return <circle cx={cx} cy={cy} r={6} fill={payload.color} stroke="#fff" strokeWidth={2} />;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      // Handle scatter point data
      if (data.cannabinoid && data.value !== undefined) {
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-medium text-gray-900">{data.cannabinoid}</p>
            <p className="text-sm text-gray-600">{data.month}: {data.value.toFixed(2)}%</p>
            {data.current && <p className="text-sm text-blue-600 font-medium">Current Sample</p>}
          </div>
        );
      }
      
      // Handle line data (monthly averages)
      if (data.monthIndex !== undefined) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        const monthIndex = (currentMonth - 11 + data.monthIndex + 12) % 12;
        const monthName = months[monthIndex];
        
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-medium text-gray-900">{monthName} - Monthly Average</p>
            {payload.map((entry, index) => {
              if (entry.value !== undefined && entry.dataKey !== 'monthIndex') {
                return (
                  <p key={index} className="text-sm" style={{ color: entry.stroke }}>
                    {entry.dataKey}: {entry.value.toFixed(2)}%
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      }
    }
    return null;
  };

  // If no cannabinoids selected, show a message
  if (!selectedCannabinoids || selectedCannabinoids.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>Please select at least one cannabinoid to display historical trends</p>
      </div>
    );
  }

  const scatterData = getScatterData();

  // Calculate monthly averages for trend lines
  const getTrendLineData = () => {
    const trendData = [];
    
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthData = { monthIndex };
      
      selectedCannabinoids.forEach(cannabinoid => {
        const monthSamples = historicalData.filter(d => d.monthIndex === monthIndex);
        const values = monthSamples.map(d => d[cannabinoid]).filter(v => v !== undefined);
        
        if (values.length > 0) {
          monthData[cannabinoid] = values.reduce((sum, val) => sum + val, 0) / values.length;
        }
      });
      
      trendData.push(monthData);
    }
    
    return trendData;
  };

  const trendLineData = getTrendLineData();

  // Calculate Y-axis domain based on all data
  const getYDomain = () => {
    let minValue = Infinity;
    let maxValue = -Infinity;
    
    // Check scatter data
    scatterData.forEach(point => {
      if (point.value < minValue) minValue = point.value;
      if (point.value > maxValue) maxValue = point.value;
    });
    
    // Also check trend line data
    trendLineData.forEach(point => {
      selectedCannabinoids.forEach(cannabinoid => {
        if (point[cannabinoid] !== undefined) {
          if (point[cannabinoid] < minValue) minValue = point[cannabinoid];
          if (point[cannabinoid] > maxValue) maxValue = point[cannabinoid];
        }
      });
    });
    
    // Add extra padding (20% on top, 10% on bottom)
    const range = maxValue - minValue;
    return [
      Math.max(0, minValue - range * 0.1),
      maxValue + range * 0.2
    ];
  };

  return (
    <div className="w-full" style={{ height: '400px', overflow: 'visible' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 60, right: 30, bottom: 80, left: 80 }} data={trendLineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="monthIndex" 
            type="number"
            domain={[0, 11]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            tickFormatter={(value) => {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const currentMonth = new Date().getMonth();
              const monthIndex = (currentMonth - 11 + value + 12) % 12;
              return months[monthIndex];
            }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            label={{ value: 'Concentration (%)', angle: -90, position: 'insideLeft' }}
            domain={getYDomain()}
            tickFormatter={(value) => value.toFixed(1)}
          />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top" 
          height={36}
          iconType="circle"
          formatter={(value) => {
            const count = scatterData.filter(d => d.cannabinoid === value).length;
            return `${value} (${count})`;
          }}
        />
        
        {/* Add trend lines first (behind scatter points) */}
        {selectedCannabinoids.map(cannabinoid => (
          <Line
            key={`line-${cannabinoid}`}
            type="monotone"
            dataKey={cannabinoid}
            data={trendLineData}
            stroke={cannabinoidColors[cannabinoid] || '#6B7280'}
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            connectNulls
            strokeOpacity={0.6}
          />
        ))}
        
        {/* Add scatter points on top */}
        {selectedCannabinoids.map(cannabinoid => (
          <Scatter
            key={`scatter-${cannabinoid}`}
            name={cannabinoid}
            data={scatterData.filter(d => d.cannabinoid === cannabinoid)}
            fill={cannabinoidColors[cannabinoid] || '#6B7280'}
            shape={<CustomDot />}
            isAnimationActive={false}
          />
        ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// Reanalysis Request Modal
const ReanalysisModal = ({ isOpen, onClose, sample, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [selectedAnalytes, setSelectedAnalytes] = useState([]);
  const [priority, setPriority] = useState('normal');
  
  if (!isOpen) return null;

  const analyteOptions = sample.testResults.potency.averageData 
    ? Object.keys(sample.testResults.potency.averageData) 
    : [];

  const handleSubmit = () => {
    if (selectedAnalytes.length === 0) {
      alert('Please select at least one analyte for reanalysis');
      return;
    }
    if (!reason.trim()) {
      alert('Please provide a reason for reanalysis');
      return;
    }
    
    onConfirm({
      sampleId: sample.labId,
      analytes: selectedAnalytes,
      reason,
      priority,
      requestedBy: 'Dr. Sarah Chen',
      requestedAt: new Date().toISOString()
    });
    
    // Reset form
    setReason('');
    setSelectedAnalytes([]);
    setPriority('normal');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Request Reanalysis</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sample Information
            </label>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p><span className="font-medium">Lab ID:</span> {sample.labId}</p>
              <p><span className="font-medium">Product:</span> {sample.productName}</p>
              <p><span className="font-medium">Client:</span> {sample.client}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Analytes for Reanalysis
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-3">
              {analyteOptions.map(analyte => (
                <label key={analyte} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAnalytes.includes(analyte)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAnalytes([...selectedAnalytes, analyte]);
                      } else {
                        setSelectedAnalytes(selectedAnalytes.filter(a => a !== analyte));
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{analyte}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="normal">Normal</option>
              <option value="rush">Rush (24 hours)</option>
              <option value="urgent">Urgent (Same day)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Reanalysis
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Please describe why reanalysis is needed..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleResultsDetail;