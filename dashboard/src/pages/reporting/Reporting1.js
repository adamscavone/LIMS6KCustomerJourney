import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  FileText,
  Package,
  FlaskConical,
  Building2,
  Hash,
  CalendarDays,
  Eye,
  FileCheck,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Send,
  CheckSquare,
  Square,
  Loader2,
  Info,
  Download,
  FileDown,
  ChevronUp,
  User,
  AlertOctagon,
  History,
  ChevronLeft,
  CalendarCheck
} from 'lucide-react';

// Notification component
const Notification = ({ message, type, onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg ${typeStyles[type]} animate-slide-in`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {type === 'success' && <CheckCircle2 className="w-5 h-5" />}
          {type === 'error' && <XCircle className="w-5 h-5" />}
          {type === 'info' && <Info className="w-5 h-5" />}
          {type === 'warning' && <AlertTriangle className="w-5 h-5" />}
          <p className="font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="text-current opacity-60 hover:opacity-100">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Helper function to generate mock data based on sample ID
const generateMockDataFromId = (baseSampleId) => {
  const seedNum = parseInt(baseSampleId) || 1;
  
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
      'Cannabidiol (CBD)': { low: 0.3, high: 1.5 }
    },
    manifestNotes: seedNum % 3 === 0 ? `Special handling required - Client request #${seedNum}` : null,
    assayNotes: {
      'Cannabinoids': seedNum % 4 === 0 ? 'Dilution required due to high concentration' : null,
      'Microbial': seedNum % 5 === 0 ? 'Extended incubation period completed' : null
    }
  };
};

// Mock data - replace with actual API calls
const mockOrders = [
  {
    id: 'ORD-2025-001',
    orderNumber: '25NCTL00341',
    manifestNumber: 'MAN-123456',
    client: 'Green Valley Dispensary',
    receivedDate: '2025-01-26T10:30:00',
    dueDate: '2025-01-29T17:00:00',
    totalSamples: 5,
    completedSamples: 3,
    samples: [
      {
        id: 'SAMP-001',
        labId: 'LAB-123456',
        sampleId: 1001,
        metrcTag: '1A4070300002711000010043',
        productName: 'Blue Dream Flower',
        productType: 'Flower',
        testCategory: 'Dispensary Plant Material',
        status: 'ready_to_report',
        ccOrderVerified: true,
        reportingStatus: 'pending',
        reportableAssays: ['Cannabinoids', 'Microbial', 'Pesticides', 'Heavy Metals'],
        batchNumbers: {
          'Cannabinoids': ['CANN-2025-001', 'CANN-2025-002R'],
          'Microbial': ['MICRO-2025-001'],
          'Pesticides': ['PEST-2025-001'],
          'Heavy Metals': ['HM-2025-001']
        },
        tests: [
          { 
            code: 'POT', 
            name: 'Potency', 
            status: 'completed', 
            result: 'pass', 
            assay: 'Cannabinoids',
            replicates: [
              {
                replicateNumber: 1,
                results: {
                  'Tetrahydrocannabinolic Acid (THCA)': { value: 18.5, unit: 'mg/g' },
                  'Tetrahydrocannabinol (THC)': { value: 0.8, unit: 'mg/g' },
                  'Total THC': { value: 17.0, unit: 'mg/g' },
                  'Cannabidiol (CBD)': { value: 0.2, unit: 'mg/g' },
                  'Total CBD': { value: 0.2, unit: 'mg/g' },
                  'Total Cannabinoids': { value: 17.2, unit: 'mg/g' }
                }
              },
              {
                replicateNumber: 2,
                results: {
                  'Tetrahydrocannabinolic Acid (THCA)': { value: 18.3, unit: 'mg/g' },
                  'Tetrahydrocannabinol (THC)': { value: 0.9, unit: 'mg/g' },
                  'Total THC': { value: 16.9, unit: 'mg/g' },
                  'Cannabidiol (CBD)': { value: 0.2, unit: 'mg/g' },
                  'Total CBD': { value: 0.2, unit: 'mg/g' },
                  'Total Cannabinoids': { value: 17.1, unit: 'mg/g' }
                }
              }
            ],
            averageResults: {
              'Tetrahydrocannabinolic Acid (THCA)': { value: 18.4, unit: 'mg/g' },
              'Tetrahydrocannabinol (THC)': { value: 0.85, unit: 'mg/g' },
              'Total THC': { value: 16.95, unit: 'mg/g' },
              'Cannabidiol (CBD)': { value: 0.2, unit: 'mg/g' },
              'Total CBD': { value: 0.2, unit: 'mg/g' },
              'Total Cannabinoids': { value: 17.15, unit: 'mg/g' }
            }
          },
          { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial',
            results: {
              'Total Viable Aerobic Bacteria': { value: 0, unit: 'CFU/g' },
              'Bile-Tolerant Gram-Negative Bacteria': { value: 0, unit: 'CFU/g' },
              'Total Coliforms': { value: 0, unit: 'CFU/g' },
              'E. coli': { value: 0, unit: 'CFU/g' },
              'Salmonella': { value: 0, unit: 'CFU/g' },
              'Total Yeast and Mold': { value: 0, unit: 'CFU/g' }
            }
          },
          { code: 'HM', name: 'Heavy Metals', status: 'completed', result: 'pass', assay: 'Heavy Metals' },
          { code: 'PEST', name: 'Pesticides', status: 'pending', result: null, assay: 'Pesticides' }
        ]
      },
      {
        id: 'SAMP-002',
        labId: 'LAB-123457',
        sampleId: 1002,
        metrcTag: '1A4070300002711000010044',
        productName: 'OG Kush Extract',
        productType: 'Extract',
        testCategory: 'Non-Solvent Product (Not Previously Tested)',
        status: 'in_progress',
        ccOrderVerified: false,
        reportingStatus: 'pending',
        reportableAssays: ['Cannabinoids', 'Residual Solvents', 'Heavy Metals'],
        batchNumbers: {
          'Cannabinoids': ['CANN-2025-003']
        },
        tests: [
          { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids' },
          { code: 'SOLV', name: 'Residual Solvents', status: 'in_progress', result: null, assay: 'Residual Solvents' },
          { code: 'HM', name: 'Heavy Metals', status: 'pending', result: null, assay: 'Heavy Metals' }
        ]
      }
    ]
  },
  {
    id: 'ORD-2025-002',
    orderNumber: '25NCTL00342',
    manifestNumber: 'MAN-123457',
    client: 'Wellness Center LLC',
    receivedDate: '2025-01-25T14:15:00',
    dueDate: '2025-01-28T12:00:00',
    totalSamples: 3,
    completedSamples: 3,
    samples: [
      {
        id: 'SAMP-003',
        labId: 'LAB-123458',
        sampleId: 1003,
        metrcTag: '1A4070300002711000010045',
        productName: 'CBD Tincture 1000mg',
        productType: 'Tincture',
        testCategory: 'Processed Product (Previously Tested)',
        status: 'ready_to_report',
        ccOrderVerified: true,
        reportingStatus: 'pending',
        reportableAssays: ['Cannabinoids', 'Microbial'],
        batchNumbers: {
          'Cannabinoids': ['CANN-2025-004']
        },
        tests: [
          { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids',
            averageResults: {
              'Tetrahydrocannabinolic Acid (THCA)': { value: 0.0, unit: 'mg/g' },
              'Tetrahydrocannabinol (THC)': { value: 0.1, unit: 'mg/g' },
              'Delta-8 Tetrahydrocannabinol (Delta-8 THC)': { value: 0.0, unit: 'mg/g' },
              'Tetrahydrocannabivarin (THCV)': { value: 0.0, unit: 'mg/g' },
              'Cannabidiolic Acid (CBDA)': { value: 0.0, unit: 'mg/g' },
              'Cannabidiol (CBD)': { value: 33.2, unit: 'mg/g' },
              'Cannabinol (CBN)': { value: 0.0, unit: 'mg/g' },
              'Total CBD': { value: 33.2, unit: 'mg/g' },
              'Total THC': { value: 0.1, unit: 'mg/g' },
              'Total Cannabinoids': { value: 33.3, unit: 'mg/g' },
              'Foreign Matter': { value: 0.0, unit: '%' }
            }
          },
          { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial' }
        ]
      }
    ]
  }
];

// Add recently reported samples
const recentlyReportedSamples = [
  {
    id: 'SAMP-R001',
    labId: 'LAB-123450',
    sampleId: 995,
    metrcTag: '1A4070300002711000010040',
    productName: 'Purple Haze Flower',
    productType: 'Flower',
    testCategory: 'Dispensary Plant Material',
    status: 'reported',
    ccOrderVerified: true,
    reportingStatus: 'sent_to_metrc',
    reportedDate: '2025-01-26T09:15:00',
    reportedBy: 'Sarah Johnson',
    manifestNumber: 'MAN-123455',
    orderNumber: '25NCTL00339',
    client: 'Green Valley Dispensary',
    reportableAssays: ['Cannabinoids', 'Microbial', 'Pesticides', 'Heavy Metals']
  },
  {
    id: 'SAMP-R002',
    labId: 'LAB-123451',
    sampleId: 996,
    metrcTag: '1A4070300002711000010041',
    productName: 'Gelato Concentrate',
    productType: 'Concentrate',
    testCategory: 'Solvent Product',
    status: 'reported',
    ccOrderVerified: true,
    reportingStatus: 'sent_to_cc_and_metrc',
    reportedDate: '2025-01-25T16:30:00',
    reportedBy: 'Mike Chen',
    manifestNumber: 'MAN-123454',
    orderNumber: '25NCTL00340',
    client: 'Wellness Center LLC',
    reportableAssays: ['Cannabinoids', 'Residual Solvents', 'Heavy Metals']
  }
];

// Report Preview Modal Component
const ReportPreviewModal = ({ isOpen, onClose, samples, onConfirm }) => {
  const [activeTab, setActiveTab] = useState('coa');
  const [selectedAssays, setSelectedAssays] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState('both'); // 'pdf', 'csv', or 'both'

  useEffect(() => {
    if (samples.length > 0) {
      // Initialize with all unique reportable assays from selected samples
      const allAssays = [...new Set(samples.flatMap(s => s.reportableAssays || []))];
      setSelectedAssays(allAssays);
    }
  }, [samples]);

  if (!isOpen) return null;

  const handleAssayToggle = (assay) => {
    setSelectedAssays(prev => {
      if (prev.includes(assay)) {
        return prev.filter(a => a !== assay);
      } else {
        return [...prev, assay];
      }
    });
  };

  // Handle multiple samples elegantly
  const multiSampleWarning = samples.length > 1 && (
    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-yellow-800">Multiple samples selected</p>
        <p className="text-sm text-yellow-700 mt-1">
          {samples.length} samples will generate {samples.length} separate COA files and will be combined into a single CSV export.
        </p>
      </div>
    </div>
  );

  // For demo, show preview of first sample
  const previewSample = samples[0];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Generate Reports Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {multiSampleWarning}

        {/* Assay Selection */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Reportable Assays:</span>
            <div className="flex gap-3">
              {[...new Set(samples.flatMap(s => s.reportableAssays || []))].map(assay => (
                <label key={assay} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAssays.includes(assay)}
                    onChange={() => handleAssayToggle(assay)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">{assay}</span>
                </label>
              ))}
            </div>
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
            Certificate of Analysis Preview
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'csv'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            CSV Export Preview
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'coa' ? (
            <div className="bg-gray-100 rounded-lg p-8 min-h-[600px]">
              <div className="bg-white rounded shadow-sm p-8 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Certificate of Analysis</h1>
                  <p className="text-gray-600 mt-2">Sample: {previewSample.labId}</p>
                  {samples.length > 1 && (
                    <p className="text-sm text-gray-500 mt-1">Showing preview of 1 of {samples.length} certificates</p>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Sample Information</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Lab ID:</span> {previewSample.labId}</p>
                        <p><span className="font-medium">Product:</span> {previewSample.productName}</p>
                        <p><span className="font-medium">Type:</span> {previewSample.productType}</p>
                        <p><span className="font-medium">Test Category:</span> {previewSample.testCategory}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Test Results Summary</h3>
                      <div className="space-y-2">
                        {previewSample.tests.filter(t => selectedAssays.includes(t.assay) && t.status === 'completed').map((test, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{test.name}:</span>
                            <span className={test.result === 'pass' ? 'text-green-600' : 'text-red-600'}>
                              {test.result === 'pass' ? 'PASS' : 'FAIL'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {samples.length > 1 
                    ? `CSV export will contain ${samples.reduce((total, s) => total + (s.tests?.filter(t => selectedAssays.includes(t.assay)).length || 0), 0)} rows across ${samples.length} samples`
                    : 'CSV export preview for selected sample'}
                </p>
              </div>
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
                    {/* Show sample rows */}
                    <tr>
                      <td className="px-4 py-2 text-sm">{today}</td>
                      <td className="px-4 py-2 text-sm font-mono">{previewSample.metrcTag}</td>
                      <td className="px-4 py-2 text-sm">Total THC (mg/g) {previewSample.testCategory}</td>
                      <td className="px-4 py-2 text-sm">16.95</td>
                      <td className="px-4 py-2 text-sm">True</td>
                      <td className="px-4 py-2 text-sm">Csv Upload</td>
                    </tr>
                    {samples.length > 1 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-2 text-sm text-center text-gray-500">
                          ... and {samples.length - 1} more samples
                        </td>
                      </tr>
                    )}
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
                onClick={() => onConfirm(selectedAssays, downloadFormat)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metrc Submission Modal
const MetrcSubmissionModal = ({ isOpen, onClose, samples, onConfirm }) => {
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
              Please confirm that {samples.length} sample{samples.length !== 1 ? 's have' : ' has'} been submitted to Metrc.
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

// Test status badge component
const TestStatusBadge = ({ test }) => {
  const getStatusColor = () => {
    if (test.status === 'completed') {
      return test.result === 'pass' 
        ? 'bg-blue-100 text-blue-700 border-blue-200'
        : 'bg-red-100 text-red-700 border-red-200';
    }
    if (test.status === 'in_progress') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getIcon = () => {
    if (test.status === 'completed') {
      return test.result === 'pass' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />;
    }
    if (test.status === 'in_progress') return <Clock className="w-3 h-3" />;
    return <AlertCircle className="w-3 h-3" />;
  };

  return (
    <div className="group relative inline-flex">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
        {getIcon()}
        {test.code}
      </span>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {test.name}
        {test.status === 'completed' && ` - ${test.result === 'pass' ? 'Passed' : 'Failed'}`}
      </div>
    </div>
  );
};

// Sample status indicator
const SampleStatus = ({ status, progressDetails }) => {
  const statusConfig = {
    ready_to_report: { 
      icon: CheckCircle2, 
      color: 'text-blue-600 bg-blue-50', 
      label: 'Ready to Report',
      tooltip: 'All tests completed and ready for reporting'
    },
    in_progress: { 
      icon: Clock, 
      color: 'text-orange-600 bg-orange-50', 
      label: progressDetails?.label || 'In Progress',
      tooltip: progressDetails ? `${progressDetails.label} - Assigned to: ${progressDetails.assignee}` : 'Tests are currently being processed'
    },
    in_prep: {
      icon: FlaskConical,
      color: 'text-purple-600 bg-purple-50',
      label: 'In Prep',
      tooltip: 'Sample is being prepared for analysis'
    },
    awaiting_analysis: {
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-50',
      label: 'Awaiting Analysis',
      tooltip: 'Sample is queued for instrument analysis'
    },
    pending: { 
      icon: AlertCircle, 
      color: 'text-gray-600 bg-gray-50', 
      label: 'Pending',
      tooltip: 'Waiting for test processing to begin'
    },
    reported: {
      icon: Send,
      color: 'text-green-600 bg-green-50',
      label: 'Reported',
      tooltip: 'Results have been reported'
    },
    failed: { 
      icon: XCircle, 
      color: 'text-red-600 bg-red-50', 
      label: 'Failed',
      tooltip: 'One or more tests failed'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="group relative inline-flex">
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </div>
      {config.tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
          {config.tooltip}
        </div>
      )}
    </div>
  );
};

// Sample View Component - Updated with hierarchy by due date/time
const SampleView = ({ orders, recentlyReported, onSelectSample, selectedSamples, onToggleSample, onToggleAllSamples, showRecentlyReported, timeRange, setShowReportPreview, setSelectedSamples }) => {
  const allSamples = useMemo(() => {
    if (showRecentlyReported) {
      // Filter recently reported samples by time range
      const now = new Date();
      const cutoffDate = new Date();
      
      switch(timeRange) {
        case '7':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case '14':
          cutoffDate.setDate(now.getDate() - 14);
          break;
        case '30':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case '90':
          cutoffDate.setDate(now.getDate() - 90);
          break;
        case '180':
          cutoffDate.setDate(now.getDate() - 180);
          break;
        case '365':
          cutoffDate.setDate(now.getDate() - 365);
          break;
        case 'ytd':
          cutoffDate.setMonth(0, 1);
          break;
        default:
          cutoffDate.setDate(now.getDate() - 7);
      }
      
      return recentlyReported
        .filter(sample => new Date(sample.reportedDate) >= cutoffDate)
        .sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
    }
    
    // Get all pending samples and sort by due date/time
    const samples = orders.flatMap(order => 
      order.samples.map(sample => ({
        ...sample,
        manifestNumber: order.manifestNumber,
        orderNumber: order.orderNumber,
        client: order.client,
        dueDate: order.dueDate,
        ...generateMockDataFromId(sample.sampleId)
      }))
    );
    
    // Sort by due date/time (earliest first)
    return samples.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [orders, recentlyReported, showRecentlyReported, timeRange]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {!showRecentlyReported && (
              <th className="text-left py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={allSamples.length > 0 && allSamples.every(s => selectedSamples.has(s.id))}
                  onChange={(e) => onToggleAllSamples(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            <th className="text-left py-3 px-4">Sample ID</th>
            <th className="text-left py-3 px-4">Order</th>
            <th className="text-left py-3 px-4">Product</th>
            <th className="text-left py-3 px-4">Client</th>
            {showRecentlyReported ? (
              <>
                <th className="text-left py-3 px-4">Reported Date</th>
                <th className="text-left py-3 px-4">Reported By</th>
                <th className="text-left py-3 px-4">Method</th>
              </>
            ) : (
              <>
                <th className="text-left py-3 px-4">Tests</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Due Date/Time</th>
              </>
            )}
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allSamples.map(sample => {
            const hasFailedTests = sample.tests?.some(t => t.status === 'completed' && t.result === 'fail');
            const isSelected = selectedSamples.has(sample.id);
            const dueDate = new Date(sample.dueDate || sample.reportedDate);
            const isOverdue = !showRecentlyReported && dueDate < new Date();
            
            return (
              <tr key={sample.id} className={`${hasFailedTests ? 'bg-red-50' : isSelected ? 'bg-blue-50' : ''} ${isOverdue ? 'bg-yellow-50' : ''} transition-colors`}>
                {!showRecentlyReported && (
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSample(sample.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                <td className="py-3 px-4">
                  <div>
                    <span className="font-mono text-sm">{sample.labId}</span>
                    <p className="text-xs text-gray-500">ID: {sample.sampleId}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{sample.orderNumber}</span>
                    <p className="text-xs text-gray-500">{sample.manifestNumber}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{sample.productName}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FlaskConical className="w-3 h-3" />
                      {sample.productType}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{sample.client}</span>
                </td>
                {showRecentlyReported ? (
                  <>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(sample.reportedDate).toLocaleDateString()} {new Date(sample.reportedDate).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{sample.reportedBy}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {sample.reportingStatus === 'sent_to_metrc' ? 'Metrc Only' : 
                         sample.reportingStatus === 'sent_to_cc_and_metrc' ? 'CC & Metrc' :
                         'CC with Reports'}
                      </span>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">
                      {sample.tests && (
                        <div className="flex flex-wrap gap-1">
                          {sample.tests.map((test, idx) => (
                            <TestStatusBadge key={idx} test={test} />
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <SampleStatus 
                        status={sample.status} 
                        progressDetails={sample.status === 'in_progress' ? sample.progressStatus : null}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                          {dueDate.toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
                          {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {isOverdue && (
                          <p className="text-xs text-red-600 font-medium">Overdue</p>
                        )}
                      </div>
                    </td>
                  </>
                )}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onSelectSample(sample.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    {!showRecentlyReported && sample.status === 'ready_to_report' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSamples(new Set([sample.id]));
                          setShowReportPreview(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded text-sm font-medium transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Report
                      </button>
                    )}
                    {showRecentlyReported && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Mock download action
                          console.log(`Downloading COA for sample ${sample.labId}`);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded text-sm font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download COA
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Main Component
function Reporting1() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedTests, setSelectedTests] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [orders, setOrders] = useState(mockOrders);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [showMetrcModal, setShowMetrcModal] = useState(false);
  const [showRecentlyReported, setShowRecentlyReported] = useState(false);
  const [recentlyReportedTimeRange, setRecentlyReportedTimeRange] = useState('7');
  const [recentlyReported, setRecentlyReported] = useState(recentlyReportedSamples);

  const handleSelectSample = (sampleId) => {
    navigate(`/reporting/sample/${sampleId}`);
  };

  const handleToggleSample = (sampleId, forceState) => {
    setSelectedSamples(prev => {
      const newSet = new Set(prev);
      if (forceState !== undefined) {
        if (forceState) {
          newSet.add(sampleId);
        } else {
          newSet.delete(sampleId);
        }
      } else {
        if (newSet.has(sampleId)) {
          newSet.delete(sampleId);
        } else {
          newSet.add(sampleId);
        }
      }
      return newSet;
    });
  };

  const handleToggleAllSamples = (checked) => {
    const allSampleIds = orders.flatMap(order => 
      order.samples.map(sample => sample.id)
    );
    
    if (checked) {
      setSelectedSamples(new Set(allSampleIds));
    } else {
      setSelectedSamples(new Set());
    }
  };

  // Get selected samples data
  const selectedSamplesData = useMemo(() => {
    return orders.flatMap(order => 
      order.samples.filter(sample => selectedSamples.has(sample.id))
    );
  }, [orders, selectedSamples]);

  // Check if actions can be performed
  const canGenerateReports = selectedSamplesData.some(s => s.status === 'ready_to_report');

  // Handle Generate Reports
  const handleGenerateReports = () => {
    if (selectedSamplesData.length === 0) return;
    setShowReportPreview(true);
  };

  const handleConfirmGenerateReports = async (selectedAssays, downloadFormat) => {
    setShowReportPreview(false);
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setNotification({ 
      type: 'success', 
      message: `Generated ${downloadFormat === 'both' ? 'COA and CSV' : downloadFormat.toUpperCase()} for ${selectedSamplesData.length} sample${selectedSamplesData.length !== 1 ? 's' : ''}`
    });
    
    // Show Metrc submission modal after successful report generation
    setShowMetrcModal(true);
  };

  // Handle Metrc submission confirmation
  const handleMetrcSubmission = async (submissionData) => {
    setShowMetrcModal(false);
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update sample statuses to reported
    const reportedSampleIds = new Set(selectedSamplesData.map(s => s.id));
    
    // Move samples to recently reported
    const newReportedSamples = selectedSamplesData.map(sample => ({
      ...sample,
      status: 'reported',
      reportingStatus: 'sent_to_metrc',
      reportedDate: `${submissionData.date}T${submissionData.time}:00`,
      reportedBy: submissionData.submittedBy,
      submissionMethod: submissionData.method,
      submissionNotes: submissionData.notes
    }));
    
    setRecentlyReported(prev => [...newReportedSamples, ...prev]);
    
    // Remove from active orders
    setOrders(prevOrders => 
      prevOrders.map(order => ({
        ...order,
        samples: order.samples.filter(sample => !reportedSampleIds.has(sample.id))
      })).filter(order => order.samples.length > 0)
    );
    
    setSelectedSamples(new Set());
    setIsProcessing(false);
    setNotification({ 
      type: 'success', 
      message: `${selectedSamplesData.length} sample${selectedSamplesData.length !== 1 ? 's' : ''} confirmed as reported to Metrc` 
    });
  };

  const handleRefreshAnalysis = async () => {
    setIsProcessing(true);
    console.log('Refreshing Analysis');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setNotification({ type: 'info', message: 'Analysis data refreshed' });
  };

  // Filter orders based on criteria
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.map(order => ({
        ...order,
        samples: order.samples.filter(sample => 
          sample.labId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.sampleId.toString().includes(searchTerm)
        )
      })).filter(order => order.samples.length > 0);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.map(order => ({
        ...order,
        samples: order.samples.filter(sample => sample.status === selectedStatus)
      })).filter(order => order.samples.length > 0);
    }

    // Client filter
    if (selectedClient !== 'all') {
      filtered = filtered.filter(order => order.client === selectedClient);
    }

    // Date range filter
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(order => {
        const dueDate = new Date(order.dueDate);
        if (dateRange.start && dueDate < new Date(dateRange.start)) {
          return false;
        }
        if (dateRange.end && dueDate > new Date(dateRange.end + 'T23:59:59')) {
          return false;
        }
        return true;
      });
    }

    return filtered;
  }, [searchTerm, selectedStatus, selectedClient, dateRange, orders]);

  // Get unique clients for filter dropdown
  const uniqueClients = useMemo(() => {
    const clients = new Set(orders.map(order => order.client));
    return Array.from(clients);
  }, [orders]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const allSamples = orders.flatMap(order => order.samples);
    return {
      total: allSamples.length,
      readyToReport: allSamples.filter(s => s.status === 'ready_to_report').length,
      inProgress: allSamples.filter(s => s.status === 'in_progress').length,
      reported: recentlyReported.length,
      failed: allSamples.filter(s => 
        s.tests.some(t => t.status === 'completed' && t.result === 'fail')
      ).length
    };
  }, [orders, recentlyReported]);

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={showReportPreview}
        onClose={() => setShowReportPreview(false)}
        samples={selectedSamplesData}
        onConfirm={handleConfirmGenerateReports}
      />
      
      {/* Metrc Submission Modal */}
      <MetrcSubmissionModal
        isOpen={showMetrcModal}
        onClose={() => setShowMetrcModal(false)}
        samples={selectedSamplesData}
        onConfirm={handleMetrcSubmission}
      />
      
      {/* Sticky Header with Actions */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sample Reporting</h1>
                {selectedSamples.size > 0 && !showRecentlyReported && (
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSamples.size} sample{selectedSamples.size !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Primary Actions */}
                {!showRecentlyReported && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGenerateReports}
                      disabled={selectedSamples.size === 0 || !canGenerateReports || isProcessing}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      Generate Reports
                    </button>
                  </div>
                )}

                {/* Refresh Button */}
                <div className="border-l border-gray-300 pl-3">
                  <button
                    onClick={handleRefreshAnalysis}
                    disabled={isProcessing}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Queue Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowRecentlyReported(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !showRecentlyReported 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FlaskConical className="w-4 h-4 inline mr-2" />
                Pending Samples ({statusCounts.total})
              </button>
              <button
                onClick={() => setShowRecentlyReported(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showRecentlyReported 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <History className="w-4 h-4 inline mr-2" />
                Recently Reported ({statusCounts.reported})
              </button>
            </div>
            
            {showRecentlyReported && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Time Range:</label>
                <select
                  value={recentlyReportedTimeRange}
                  onChange={(e) => setRecentlyReportedTimeRange(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                  <option value="180">6 Months</option>
                  <option value="365">1 Year</option>
                  <option value="ytd">Year to Date</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by sample ID, product name, or sample number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {(selectedStatus !== 'all' || selectedClient !== 'all' || dateRange.start || dateRange.end) && (
                <button
                  onClick={() => {
                    setSelectedStatus('all');
                    setSelectedClient('all');
                    setDateRange({ start: '', end: '' });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear Filters
                </button>
              )}
            </div>
            
            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="ready_to_report">Ready to Report</option>
                    <option value="in_progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="in_prep">In Prep</option>
                    <option value="awaiting_analysis">Awaiting Analysis</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Clients</option>
                    {uniqueClients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date From</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date To</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {!showRecentlyReported && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Samples</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {statusCounts.total}
                  </p>
                </div>
                <FlaskConical className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ready to Report</p>
                  <p className="text-2xl font-semibold text-blue-600 mt-1">
                    {statusCounts.readyToReport}
                  </p>
                </div>
                <FileCheck className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-semibold text-orange-600 mt-1">
                    {statusCounts.inProgress}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Failed Tests</p>
                  <p className="text-2xl font-semibold text-red-600 mt-1">
                    {statusCounts.failed}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recently Reported</p>
                  <p className="text-2xl font-semibold text-green-600 mt-1">
                    {statusCounts.reported}
                  </p>
                </div>
                <Send className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>
        )}

        {/* Sample List */}
        <SampleView 
          orders={filteredOrders} 
          recentlyReported={recentlyReported}
          onSelectSample={handleSelectSample}
          selectedSamples={selectedSamples}
          onToggleSample={handleToggleSample}
          onToggleAllSamples={handleToggleAllSamples}
          showRecentlyReported={showRecentlyReported}
          timeRange={recentlyReportedTimeRange}
          setShowReportPreview={setShowReportPreview}
          setSelectedSamples={setSelectedSamples}
        />
      </div>
    </div>
  );
}

export default Reporting1;