import React, { useState, useMemo } from 'react';
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
  ChevronUp
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

// Mock data - replace with actual API calls
const mockOrders = [
  {
    id: 'ORD-2025-001',
    manifestNumber: 'MAN-123456',
    client: 'Green Valley Dispensary',
    receivedDate: '2025-01-26',
    dueDate: '2025-01-29',
    totalSamples: 5,
    completedSamples: 3,
    samples: [
      {
        id: 'SAMP-001',
        labId: 'LAB-123456',
        metrcTag: '1A4070300002711000010043',
        productName: 'Blue Dream Flower',
        productType: 'Flower',
        testCategory: 'Dispensary Plant Material',
        status: 'ready_to_report',
        ccOrderVerified: true,
        reportingStatus: 'pending',
        reportableAssays: ['Cannabinoids', 'Microbial', 'Pesticides', 'Heavy Metals'],
        tests: [
          { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids',
            results: {
              'THCA': { value: 18.5, unit: 'mg/g' },
              'THC': { value: 0.8, unit: 'mg/g' },
              'Total THC': { value: 17.0, unit: 'mg/g' },
              'CBD': { value: 0.2, unit: 'mg/g' },
              'Total CBD': { value: 0.2, unit: 'mg/g' }
            }
          },
          { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial',
            results: {
              'Total Viable Aerobic Bacteria': { value: 0, unit: 'CFU/g' },
              'Bile-Tolerant Gram-Negative Bacteria': { value: 0, unit: 'CFU/g' },
              'Total Coliforms': { value: 0, unit: 'CFU/g' },
              'E.coli': { value: 0, unit: 'CFU/g' },
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
        metrcTag: '1A4070300002711000010044',
        productName: 'OG Kush Extract',
        productType: 'Extract',
        testCategory: 'Non-Solvent Product (Not Previously Tested)',
        status: 'in_progress',
        ccOrderVerified: false,
        reportingStatus: 'pending',
        reportableAssays: ['Cannabinoids', 'Residual Solvents', 'Heavy Metals'],
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
    manifestNumber: 'MAN-123457',
    client: 'Wellness Center LLC',
    receivedDate: '2025-01-25',
    dueDate: '2025-01-28',
    totalSamples: 3,
    completedSamples: 3,
    samples: [
      {
        id: 'SAMP-003',
        labId: 'LAB-123458',
        metrcTag: '1A4070300002711000010045',
        productName: 'CBD Tincture 1000mg',
        productType: 'Tincture',
        testCategory: 'Processed Product (Previously Tested)',
        status: 'ready_to_report',
        ccOrderVerified: true,
        reportingStatus: 'pending',
        reportableAssays: ['Cannabinoids', 'Microbial'],
        tests: [
          { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids',
            results: {
              'THCA': { value: 0.0, unit: 'mg/g' },
              'THC': { value: 746, unit: 'mg/g' },
              'Delta-8 THC': { value: 0.0, unit: 'mg/g' },
              'THCV': { value: 3.92, unit: 'mg/g' },
              'CBDA': { value: 0.0, unit: 'mg/g' },
              'CBD': { value: 0.0, unit: 'mg/g' },
              'CBN': { value: 2.80, unit: 'mg/g' },
              'Total CBD': { value: 0.0, unit: 'mg/g' },
              'Total THC': { value: 746, unit: 'mg/g' },
              'Foreign Matter': { value: 0.0, unit: '%' }
            }
          },
          { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial' }
        ]
      }
    ]
  }
];

// Report Preview Modal Component
const ReportPreviewModal = ({ isOpen, onClose, pdfContent, csvContent, selectedAssays, onConfirm }) => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [selectedAssaysState, setSelectedAssaysState] = useState(selectedAssays);

  if (!isOpen) return null;

  const handleAssayToggle = (assay) => {
    setSelectedAssaysState(prev => {
      if (prev.includes(assay)) {
        return prev.filter(a => a !== assay);
      } else {
        return [...prev, assay];
      }
    });
  };

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

        {/* Assay Selection */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Reportable Assays:</span>
            <div className="flex gap-3">
              {['Cannabinoids', 'Microbial', 'Pesticides', 'Heavy Metals', 'Residual Solvents'].map(assay => (
                <label key={assay} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAssaysState.includes(assay)}
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
            onClick={() => setActiveTab('pdf')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'pdf'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            PDF Certificate of Analysis
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'csv'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            CSV Data Export
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'pdf' ? (
            <div className="bg-gray-100 rounded-lg p-8 min-h-[600px]">
              <div className="bg-white rounded shadow-sm p-8 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Certificate of Analysis</h1>
                  <p className="text-gray-600 mt-2">DRAFT - Not for Distribution</p>
                </div>
                {pdfContent}
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
                    {csvContent}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {activeTab === 'pdf' 
                ? 'This is a preview of the PDF that will be generated'
                : 'This is a preview of the CSV data that will be exported'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(selectedAssaysState)}
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
const SampleStatus = ({ status }) => {
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
      label: 'In Progress',
      tooltip: 'Tests are currently being processed'
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

// Order View Component
const OrderView = ({ orders, onSelectSample, selectedSamples, onToggleSample }) => {
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  const toggleOrder = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getOrderStatus = (order) => {
    const hasFailedSamples = order.samples.some(s => 
      s.tests.some(t => t.status === 'completed' && t.result === 'fail')
    );
    
    if (hasFailedSamples) return 'failed';
    const readyCount = order.samples.filter(s => s.status === 'ready_to_report').length;
    if (readyCount === order.totalSamples) return 'ready_to_report';
    if (readyCount > 0) return 'in_progress';
    return 'pending';
  };

  return (
    <div className="space-y-4">
      {orders.map(order => {
        const isExpanded = expandedOrders.has(order.id);
        const orderStatus = getOrderStatus(order);
        
        return (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Order Header */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleOrder(order.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{order.manifestNumber}</h3>
                      <SampleStatus status={orderStatus} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {order.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {order.completedSamples}/{order.totalSamples} samples
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        Due: {new Date(order.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Actions will be in the sticky header */}
                </div>
              </div>
            </div>

            {/* Expanded Sample List */}
            {isExpanded && (
              <div className="border-t border-gray-200">
                <div className="p-4 bg-gray-50">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="text-left pb-3 w-10">
                          <input
                            type="checkbox"
                            checked={order.samples.every(s => selectedSamples.has(s.id))}
                            onChange={(e) => {
                              e.stopPropagation();
                              order.samples.forEach(sample => {
                                onToggleSample(sample.id, e.target.checked);
                              });
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="text-left pb-3">Sample</th>
                        <th className="text-left pb-3">Product</th>
                        <th className="text-left pb-3">Type</th>
                        <th className="text-left pb-3">Tests</th>
                        <th className="text-left pb-3">Status</th>
                        <th className="text-right pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.samples.map(sample => {
                        const isSelected = selectedSamples.has(sample.id);
                        return (
                        <tr key={sample.id} className={`${isSelected ? 'bg-blue-50' : 'bg-white'} transition-colors`}>
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                e.stopPropagation();
                                onToggleSample(sample.id);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-sm">{sample.labId}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-gray-900">{sample.productName}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                              <FlaskConical className="w-4 h-4" />
                              {sample.productType}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {sample.tests.map((test, idx) => (
                                <TestStatusBadge key={idx} test={test} />
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <SampleStatus status={sample.status} />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectSample(sample.id);
                              }}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Sample View Component
const SampleView = ({ orders, onSelectSample, selectedSamples, onToggleSample, onToggleAllSamples }) => {
  const allSamples = useMemo(() => {
    return orders.flatMap(order => 
      order.samples.map(sample => ({
        ...sample,
        manifestNumber: order.manifestNumber,
        client: order.client,
        dueDate: order.dueDate
      }))
    );
  }, [orders]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="text-left py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={allSamples.length > 0 && allSamples.every(s => selectedSamples.has(s.id))}
                onChange={(e) => onToggleAllSamples(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="text-left py-3 px-4">Lab ID</th>
            <th className="text-left py-3 px-4">Product</th>
            <th className="text-left py-3 px-4">Client</th>
            <th className="text-left py-3 px-4">Manifest</th>
            <th className="text-left py-3 px-4">Tests</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Due Date</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allSamples.map(sample => {
            const hasFailedTests = sample.tests.some(t => t.status === 'completed' && t.result === 'fail');
            const isSelected = selectedSamples.has(sample.id);
            
            return (
              <tr key={sample.id} className={`${hasFailedTests ? 'bg-red-50' : isSelected ? 'bg-blue-50' : ''} transition-colors`}>
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSample(sample.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <span className="font-mono text-sm">{sample.labId}</span>
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
                <td className="py-3 px-4">
                  <span className="text-sm font-mono text-gray-600">{sample.manifestNumber}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {sample.tests.map((test, idx) => (
                      <TestStatusBadge key={idx} test={test} />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <SampleStatus status={sample.status} />
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">
                    {new Date(sample.dueDate).toLocaleDateString()}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onSelectSample(sample.id)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    {/* Individual report actions moved to bulk actions */}
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
  const [viewMode, setViewMode] = useState('order'); // 'order' or 'sample'
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
  const [reportData, setReportData] = useState({ pdf: null, csv: null, assays: [] });

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
  const canSendToMetrc = selectedSamplesData.every(s => s.status === 'ready_to_report');
  const canSendToCC = selectedSamplesData.every(s => s.status === 'ready_to_report' && s.ccOrderVerified);

  // Generate report preview data
  const generateReportPreview = () => {
    if (selectedSamplesData.length === 0) return;

    // For demo, we'll use the first selected sample
    const sample = selectedSamplesData[0];
    const today = new Date().toISOString().split('T')[0];

    // Generate PDF preview content
    const pdfContent = (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Sample Information</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Lab ID:</span> {sample.labId}</p>
              <p><span className="font-medium">Product:</span> {sample.productName}</p>
              <p><span className="font-medium">Type:</span> {sample.productType}</p>
              <p><span className="font-medium">Test Category:</span> {sample.testCategory}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Test Results</h3>
            <div className="space-y-2">
              {sample.tests.filter(t => t.status === 'completed').map((test, idx) => (
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
        {sample.tests.find(t => t.results) && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Detailed Results</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Analyte</th>
                  <th className="text-right py-2">Result</th>
                  <th className="text-left py-2 pl-2">Unit</th>
                </tr>
              </thead>
              <tbody>
                {sample.tests.filter(t => t.results).flatMap(test => 
                  Object.entries(test.results).map(([analyte, data]) => (
                    <tr key={analyte} className="border-b">
                      <td className="py-1">{analyte}</td>
                      <td className="text-right py-1">{data.value}</td>
                      <td className="pl-2 py-1">{data.unit}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

    // Generate CSV preview content (Sudoku format)
    const csvContent = sample.tests.filter(t => t.results).flatMap(test => 
      Object.entries(test.results).map(([analyte, data]) => (
        <tr key={`${sample.id}-${analyte}`}>
          <td className="px-4 py-2 text-sm">{today}</td>
          <td className="px-4 py-2 text-sm font-mono">{sample.metrcTag}</td>
          <td className="px-4 py-2 text-sm">{`${analyte} (${data.unit}) ${sample.testCategory}`}</td>
          <td className="px-4 py-2 text-sm">{data.value}</td>
          <td className="px-4 py-2 text-sm">True</td>
          <td className="px-4 py-2 text-sm">Csv Upload</td>
        </tr>
      ))
    );

    // Get all unique reportable assays from selected samples
    const allAssays = [...new Set(selectedSamplesData.flatMap(s => s.reportableAssays || []))];

    setReportData({
      pdf: pdfContent,
      csv: csvContent,
      assays: allAssays
    });
    setShowReportPreview(true);
  };

  // Mock action handlers
  const handleSendToMetrc = async () => {
    setIsProcessing(true);
    console.log('Sending to Metrc:', selectedSamplesData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update sample status
    setOrders(prevOrders => 
      prevOrders.map(order => ({
        ...order,
        samples: order.samples.map(sample => 
          selectedSamples.has(sample.id) 
            ? { ...sample, status: 'reported', reportingStatus: 'sent_to_metrc' }
            : sample
        )
      }))
    );
    
    setSelectedSamples(new Set());
    setIsProcessing(false);
    setNotification({ type: 'success', message: `Successfully sent ${selectedSamplesData.length} samples to Metrc` });
  };

  const handleSendToCCAndMetrc = async () => {
    setIsProcessing(true);
    console.log('Sending to CC & Metrc:', selectedSamplesData);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrders(prevOrders => 
      prevOrders.map(order => ({
        ...order,
        samples: order.samples.map(sample => 
          selectedSamples.has(sample.id) 
            ? { ...sample, status: 'reported', reportingStatus: 'sent_to_cc_and_metrc' }
            : sample
        )
      }))
    );
    
    setSelectedSamples(new Set());
    setIsProcessing(false);
    setNotification({ type: 'success', message: `Successfully sent ${selectedSamplesData.length} samples to CC & Metrc` });
  };

  const handleSendToCCAndGenerateReports = async () => {
    setIsProcessing(true);
    console.log('Sending to CC & Generating Reports:', selectedSamplesData);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrders(prevOrders => 
      prevOrders.map(order => ({
        ...order,
        samples: order.samples.map(sample => 
          selectedSamples.has(sample.id) 
            ? { ...sample, status: 'reported', reportingStatus: 'sent_to_cc_with_reports' }
            : sample
        )
      }))
    );
    
    setSelectedSamples(new Set());
    setIsProcessing(false);
    setNotification({ type: 'success', message: `Successfully sent ${selectedSamplesData.length} samples to CC and generated reports` });
  };

  const handleGenerateReports = () => {
    generateReportPreview();
  };

  const handleConfirmGenerateReports = async (selectedAssays) => {
    setShowReportPreview(false);
    setIsProcessing(true);
    console.log('Generating Reports with assays:', selectedAssays);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setNotification({ type: 'info', message: `Generated reports for ${selectedSamplesData.length} samples with assays: ${selectedAssays.join(', ')}` });
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
          sample.productName.toLowerCase().includes(searchTerm.toLowerCase())
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

    return filtered;
  }, [searchTerm, selectedStatus, selectedClient, orders]);

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
      reported: allSamples.filter(s => s.status === 'reported').length,
      failed: allSamples.filter(s => 
        s.tests.some(t => t.status === 'completed' && t.result === 'fail')
      ).length
    };
  }, [orders]);

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
        pdfContent={reportData.pdf}
        csvContent={reportData.csv}
        selectedAssays={reportData.assays}
        onConfirm={handleConfirmGenerateReports}
      />
      
      {/* Sticky Header with Actions */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sample Reporting</h1>
                {selectedSamples.size > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSamples.size} sample{selectedSamples.size !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Primary Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateReports}
                    disabled={selectedSamples.size === 0 || isProcessing}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    Generate Reports
                  </button>

                  <button
                    onClick={handleSendToMetrc}
                    disabled={selectedSamples.size === 0 || !canSendToMetrc || isProcessing}
                    className="group relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Send to Metrc
                    {selectedSamples.size === 0 && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Select samples to report
                      </div>
                    )}
                    {selectedSamples.size > 0 && !canSendToMetrc && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        All samples must be ready to report
                      </div>
                    )}
                  </button>

                  <button
                    onClick={handleSendToCCAndMetrc}
                    disabled={selectedSamples.size === 0 || !canSendToCC || isProcessing}
                    className="group relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Send to CC & Metrc
                    {selectedSamples.size > 0 && !canSendToCC && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        CC order must be verified for all samples
                      </div>
                    )}
                  </button>

                  <button
                    onClick={handleSendToCCAndGenerateReports}
                    disabled={selectedSamples.size === 0 || !canSendToCC || isProcessing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileCheck className="w-4 h-4" />
                    )}
                    Send to CC & Generate Reports
                  </button>
                </div>

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
        {/* Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('order')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'order' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                Order View
              </button>
              <button
                onClick={() => setViewMode('sample')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'sample' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FlaskConical className="w-4 h-4 inline mr-2" />
                Sample View
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search samples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  showFilters 
                    ? 'border-blue-500 text-blue-600 bg-blue-50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="ready_to_report">Ready to Report</option>
                    <option value="reported">Reported</option>
                    <option value="in_progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
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
                <p className="text-sm font-medium text-gray-600">Reported</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  {statusCounts.reported}
                </p>
              </div>
              <Send className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'order' ? (
          <OrderView 
            orders={filteredOrders} 
            onSelectSample={handleSelectSample}
            selectedSamples={selectedSamples}
            onToggleSample={handleToggleSample}
          />
        ) : (
          <SampleView 
            orders={filteredOrders} 
            onSelectSample={handleSelectSample}
            selectedSamples={selectedSamples}
            onToggleSample={handleToggleSample}
            onToggleAllSamples={handleToggleAllSamples}
          />
        )}
      </div>
    </div>
  );
}

export default Reporting1;