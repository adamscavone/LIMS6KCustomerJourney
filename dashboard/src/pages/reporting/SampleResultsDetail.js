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
  Target
} from 'lucide-react';

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
  receivedDate: '2025-01-26T10:30:00',
  dueDate: '2025-01-29T17:00:00',
  sampleWeight: '15.5g',
  status: 'ready_to_report',
  metrcTag: '1A4070300002711000010043',
  submissionHistory: [],
  testResults: {
    potency: {
      status: 'completed',
      result: 'pass',
      completedDate: '2025-01-26T16:45:00',
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
      completedDate: '2025-01-26T17:30:00',
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
      completedDate: '2025-01-27T09:15:00',
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

// Result row component for replicates
const ReplicateResultRow = ({ name, replicates, averageData, target, isOhio }) => {
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

  return (
    <tr className={`border-b border-gray-100 last:border-0 ${isOffSpec ? 'bg-red-50' : ''}`}>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        {name}
        {isOhio && name === 'Total Cannabinoids' && (
          <span className="ml-2 group relative">
            <Info className="w-3 h-3 text-gray-400 inline" />
            <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              For data integrity monitoring only - not reported on COA per Ohio regulations
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
const TestResultPanel = ({ category, data, targets, notes, isOhio }) => {
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
  const [additionalData, setAdditionalData] = useState(null);

  // Load additional mock data
  useEffect(() => {
    const mockData = generateMockDataFromId(sample.sampleId);
    setAdditionalData(mockData);
  }, [sample.sampleId]);

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
                  View Report
                </button>
                <button 
                  onClick={() => setShowReportPreview(true)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download COA/CSV
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
    </div>
  );
}

export default SampleResultsDetail;