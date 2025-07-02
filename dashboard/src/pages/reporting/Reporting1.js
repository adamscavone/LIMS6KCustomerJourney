import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateSampleStatus, getStatusColorClass } from '../../utils/sampleStatusCalculator';
import { 
  Search, Filter, Calendar, CheckCircle2, AlertCircle, Clock, ChevronDown, ChevronRight,
  FileText, Package, FlaskConical, Building2, Hash, CalendarDays, Eye, FileCheck,
  AlertTriangle, XCircle, RefreshCw, Send, CheckSquare, Square, Loader2, Info,
  Download, FileDown, ChevronUp, User, AlertOctagon, History, ChevronLeft, CalendarCheck, Circle
} from 'lucide-react';

// Department mapping for test status tooltips
const TEST_DEPARTMENTS = {
  'Cannabinoids': {
    department: 'Chemistry Lab',
    location: 'Room 204',
    manager: 'Dr. Martinez'
  },
  'Microbial': {
    department: 'Microbiology Lab',
    location: 'Room 105',
    manager: 'Dr. Thompson'
  },
  'Pesticides': {
    department: 'Chemistry Lab',
    location: 'Room 204',
    manager: 'Dr. Martinez'
  },
  'Heavy Metals': {
    department: 'ICP-MS Lab',
    location: 'Room 301',
    manager: 'Dr. Chen'
  }
};

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

// Dynamic Mock Data Generator
// This system generates mock data that always appears current relative to today's date
// ensuring that testing always feels natural and contemporary for end users.
// The data automatically updates daily to maintain relevance.

const generateDynamicMockData = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  
  // Helper to add business days (excluding weekends)
  const addBusinessDays = (date, days) => {
    const result = new Date(date);
    let daysAdded = 0;
    while (daysAdded < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        daysAdded++;
      }
    }
    return result;
  };
  
  // Helper to subtract business days
  const subtractBusinessDays = (date, days) => {
    const result = new Date(date);
    let daysSubtracted = 0;
    while (daysSubtracted < days) {
      result.setDate(result.getDate() - 1);
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        daysSubtracted++;
      }
    }
    return result;
  };
  
  // Generate sample IDs based on current date
  const baseSampleId = 176000 + (today.getDate() * 10);
  const baseOrderNumber = `${currentYear.toString().slice(-2)}NCTL00${String(today.getDate() * 12 + 300).padStart(3, '0')}`;
  
  // Create orders with samples received 1-3 business days ago
  const orders = [];
  
  // Order 1 - Received 1 business day ago, due today at 5pm
  const order1ReceivedDate = subtractBusinessDays(today, 1);
  const order1DueDate = new Date(today);
  order1DueDate.setHours(17, 0, 0, 0);
  
  orders.push({
    id: `ORD-${currentYear}-001`,
    orderNumber: baseOrderNumber,
    manifestNumber: `MAN-${baseSampleId}`,
    client: 'Green Valley Dispensary',
    receivedDate: order1ReceivedDate.toISOString(),
    dueDate: order1DueDate.toISOString(),
    totalSamples: 5,
    completedSamples: 3,
    samples: generateSamplesForOrder(baseSampleId, 5, 'ready_to_report', 3, order1DueDate.toISOString())
  });
  
  // Order 2 - Received 2 business days ago, due tomorrow at noon
  const order2ReceivedDate = subtractBusinessDays(today, 2);
  const order2DueDate = addBusinessDays(today, 1);
  order2DueDate.setHours(12, 0, 0, 0);
  
  orders.push({
    id: `ORD-${currentYear}-002`,
    orderNumber: `${currentYear.toString().slice(-2)}NCTL00${String(today.getDate() * 12 + 301).padStart(3, '0')}`,
    manifestNumber: `MAN-${baseSampleId + 1}`,
    client: 'Wellness Center LLC',
    receivedDate: order2ReceivedDate.toISOString(),
    dueDate: order2DueDate.toISOString(),
    totalSamples: 3,
    completedSamples: 3,
    samples: generateSamplesForOrder(baseSampleId + 10, 3, 'ready_to_report', 3, order2DueDate.toISOString())
  });
  
  // Order 3 - Received today, due in 3 business days
  const order3ReceivedDate = new Date(today);
  order3ReceivedDate.setHours(10, 30, 0, 0);
  const order3DueDate = addBusinessDays(today, 3);
  order3DueDate.setHours(17, 0, 0, 0);
  
  orders.push({
    id: `ORD-${currentYear}-003`,
    orderNumber: `${currentYear.toString().slice(-2)}NCTL00${String(today.getDate() * 12 + 302).padStart(3, '0')}`,
    manifestNumber: `MAN-${baseSampleId + 2}`,
    client: 'Buckeye Botanicals',
    receivedDate: order3ReceivedDate.toISOString(),
    dueDate: order3DueDate.toISOString(),
    totalSamples: 4,
    completedSamples: 0,
    samples: generateSamplesForOrder(baseSampleId + 20, 4, 'in_progress', 0, order3DueDate.toISOString())
  });
  
  return orders;
};

// Helper function to generate samples for an order
const generateSamplesForOrder = (startId, count, primaryStatus, completedCount, dueDate) => {
  const samples = [];
  const productTypes = ['Flower', 'Extract', 'Tincture', 'Edible', 'Concentrate'];
  const productNames = ['Blue Dream', 'OG Kush', 'Purple Haze', 'Gelato', 'Sour Diesel'];
  const testCategories = [
    'Dispensary Plant Material',
    'Non-Solvent Product (Not Previously Tested)',
    'Processed Product (Previously Tested)',
    'Solvent Product'
  ];
  
  // Progress status rotation for variety
  const progressStatuses = [
    { status: 'in_prep', label: 'In Prep', assignee: 'Lab Tech 1' },
    { status: 'awaiting_analysis', label: 'Awaiting Analysis', assignee: 'Analyst 2' },
    { status: 'on_instrument', label: 'On Instrument', assignee: 'Unassigned' },
    { status: 'data_review', label: 'Data Review', assignee: 'QA Tech 1' }
  ];
  
  for (let i = 0; i < count; i++) {
    const sampleId = startId + i;
    
    // Create varied test completion patterns
    let tests;
    if (i < completedCount) {
      // Fully completed samples
      tests = generateTestsForSample(true);
    } else if (i % 3 === 0) {
      // Some tests complete, some in progress
      tests = generateMixedProgressTests(sampleId);
    } else {
      // Various stages of incomplete
      tests = generateTestsForSample(false, sampleId);
    }
    
    const sample = {
      id: `SAMP-${sampleId}`,
      labId: `LAB-${sampleId}`,
      sampleId: sampleId,
      metrcTag: `1A407030000271100001${String(sampleId).padStart(4, '0')}`,
      productName: `${productNames[i % productNames.length]} ${productTypes[i % productTypes.length]}`,
      productType: productTypes[i % productTypes.length],
      testCategory: testCategories[i % testCategories.length],
      dueDate: dueDate,
      ccOrderVerified: i < completedCount,
      reportingStatus: 'pending',
      reportableAssays: ['Cannabinoids', 'Microbial', 'Pesticides', 'Heavy Metals'],
      progressStatus: progressStatuses[sampleId % progressStatuses.length],
      tests: tests,
      ...generateMockDataFromId(sampleId)
    };
    
    // Calculate actual status based on tests
    const statusInfo = calculateSampleStatus(sample);
    sample.status = statusInfo.status;
    
    // Add batch numbers for completed tests
    sample.batchNumbers = {};
    tests.forEach(test => {
      if (test.status === 'completed') {
        sample.batchNumbers[test.assay] = [`${test.code}-2025-${String(sampleId).padStart(3, '0')}`];
      }
    });
    
    samples.push(sample);
  }
  
  return samples;
};

// Helper function to generate mixed progress tests
const generateMixedProgressTests = (sampleId) => {
  const pattern = sampleId % 4;
  
  switch(pattern) {
    case 0:
      // Cannabinoids and Micro done, others in various stages
      return [
        { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'on_instrument', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'in_prep', result: null, assay: 'Pesticides' }
      ];
    case 1:
      // Only cannabinoids done
      return [
        { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'awaiting_analysis', result: null, assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'not_batched', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'not_batched', result: null, assay: 'Pesticides' }
      ];
    case 2:
      // All but pesticides done
      return [
        { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'completed', result: 'pass', assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'data_review', result: null, assay: 'Pesticides' }
      ];
    default:
      // Heavy metals failed, pesticides in prep
      return [
        { code: 'POT', name: 'Potency', status: 'completed', result: 'pass', assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'completed', result: 'pass', assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'completed', result: 'fail', assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'in_prep', result: null, assay: 'Pesticides' }
      ];
  }
};

// Helper function to generate tests for a sample
const generateTestsForSample = (isCompleted, sampleId = 1) => {
  if (!isCompleted) {
    // Various incomplete patterns with more granular statuses
    const pattern = sampleId % 5;
    if (pattern === 0) {
      return [
        { code: 'POT', name: 'Potency', status: 'in_prep', result: null, assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'not_batched', result: null, assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'not_batched', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'not_batched', result: null, assay: 'Pesticides' }
      ];
    } else if (pattern === 1) {
      return [
        { code: 'POT', name: 'Potency', status: 'awaiting_analysis', result: null, assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'in_prep', result: null, assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'not_batched', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'not_batched', result: null, assay: 'Pesticides' }
      ];
    } else if (pattern === 2) {
      return [
        { code: 'POT', name: 'Potency', status: 'on_instrument', result: null, assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'awaiting_analysis', result: null, assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'in_prep', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'not_batched', result: null, assay: 'Pesticides' }
      ];
    } else if (pattern === 3) {
      return [
        { code: 'POT', name: 'Potency', status: 'data_review', result: null, assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'on_instrument', result: null, assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'awaiting_analysis', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'in_prep', result: null, assay: 'Pesticides' }
      ];
    } else {
      return [
        { code: 'POT', name: 'Potency', status: 'not_batched', result: null, assay: 'Cannabinoids' },
        { code: 'MICRO', name: 'Microbiology', status: 'not_batched', result: null, assay: 'Microbial' },
        { code: 'HM', name: 'Heavy Metals', status: 'on_instrument', result: null, assay: 'Heavy Metals' },
        { code: 'PEST', name: 'Pesticides', status: 'data_review', result: null, assay: 'Pesticides' }
      ];
    }
  }
  
  return [
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
    { 
      code: 'MICRO', 
      name: 'Microbiology', 
      status: 'completed', 
      result: 'pass', 
      assay: 'Microbial',
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
    { code: 'PEST', name: 'Pesticides', status: 'completed', result: 'pass', assay: 'Pesticides' }
  ];
};

// Generate recently reported samples with dynamic dates
const generateRecentlyReportedSamples = () => {
  const today = new Date();
  const samples = [];
  
  // Generate samples reported over the last 14 calendar days to ensure good coverage
  // We'll generate more samples in recent days
  for (let daysAgo = 0; daysAgo < 14; daysAgo++) {
    const reportedDate = new Date(today);
    reportedDate.setDate(today.getDate() - daysAgo);
    
    // Skip weekends for more realistic data
    if (reportedDate.getDay() === 0 || reportedDate.getDay() === 6) {
      continue;
    }
    
    const baseSampleId = 175000 + (daysAgo * 10);
    
    // Generate more samples for recent days (ensure we have at least 2-3 in the 7-day window)
    const samplesPerDay = daysAgo < 3 ? 2 : daysAgo < 7 ? 1 : (daysAgo % 3 === 0 ? 1 : 0);
    
    for (let i = 0; i < samplesPerDay; i++) {
      const sampleId = baseSampleId + i;
      const hasAmendments = daysAgo > 3 && i % 3 === 0; // Some older samples have amendments
      const reportVersions = hasAmendments ? [
        {
          version: 1,
          reportedDate: new Date(reportedDate.setHours(9 + i * 3, 15 + i * 10, 0, 0)).toISOString(),
          reportedBy: ['Sarah Johnson', 'Mike Chen', 'Lisa Wang', 'David Kim'][i % 4],
          reportingStatus: 'sent_to_cc_and_metrc',
          reason: 'Initial report'
        },
        {
          version: 2,
          reportedDate: new Date(reportedDate.setHours(16, 30, 0, 0)).toISOString(),
          reportedBy: 'Dr. Sarah Chen',
          reportingStatus: 'sent_to_cc_and_metrc',
          reason: 'Corrected potency calculation'
        }
      ] : [
        {
          version: 1,
          reportedDate: new Date(reportedDate.setHours(9 + i * 3, 15 + i * 10, 0, 0)).toISOString(),
          reportedBy: ['Sarah Johnson', 'Mike Chen', 'Lisa Wang', 'David Kim'][i % 4],
          reportingStatus: ['sent_to_metrc', 'sent_to_cc_and_metrc', 'sent_to_cc_with_reports'][i % 3],
          reason: 'Initial report'
        }
      ];
      
      samples.push({
        id: `SAMP-R${daysAgo}-${i}`,
        labId: `LAB-${sampleId}`,
        sampleId: sampleId,
        metrcTag: `1A407030000271100001${String(sampleId).padStart(4, '0')}`,
        productName: ['Purple Haze Flower', 'Gelato Concentrate', 'Blue Dream Extract', 'OG Kush Edible'][i % 4],
        productType: ['Flower', 'Concentrate', 'Extract', 'Edible'][i % 4],
        testCategory: ['Dispensary Plant Material', 'Solvent Product', 'Non-Solvent Product', 'Processed Product'][i % 4],
        status: 'reported',
        ccOrderVerified: true,
        reportingStatus: reportVersions[reportVersions.length - 1].reportingStatus,
        reportedDate: reportVersions[reportVersions.length - 1].reportedDate,
        reportedBy: reportVersions[reportVersions.length - 1].reportedBy,
        manifestNumber: `MAN-${sampleId}`,
        orderNumber: `${today.getFullYear().toString().slice(-2)}NCTL00${String(sampleId).slice(-3)}`,
        client: ['Green Valley Dispensary', 'Wellness Center LLC', 'Buckeye Botanicals', 'Ohio Organic Farms'][i % 4],
        reportableAssays: ['Cannabinoids', 'Microbial', 'Pesticides', 'Heavy Metals'],
        reportVersions: reportVersions,
        currentVersion: reportVersions.length
      });
    }
  }
  
  return samples;
};

// Helper to subtract business days
const subtractBusinessDays = (date, days) => {
  const result = new Date(date);
  let daysSubtracted = 0;
  while (daysSubtracted < days) {
    result.setDate(result.getDate() - 1);
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      daysSubtracted++;
    }
  }
  return result;
};

// Generate the mock data dynamically
const mockOrders = generateDynamicMockData();
const recentlyReportedSamples = generateRecentlyReportedSamples();



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
          {samples.length} samples will generate {samples.length} separate CoA files and will be combined into a single CSV export.
        </p>
      </div>
    </div>
  );

  // For demo, show preview of first sample
  const previewSample = samples?.[0];
  const today = new Date().toISOString().split('T')[0];

  // Early return if no samples
  if (!samples || samples.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {samples[0]?.currentVersion > 1 ? 'Generate Amendment Preview' : 'Generate Reports Preview'}
              </h2>
              {samples[0]?.currentVersion > 1 && (
                <p className="text-sm text-amber-600 mt-1">
                  This will create version {(samples[0]?.currentVersion || 1) + 1} of the report
                </p>
              )}
            </div>
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
                  <span className="text-sm text-gray-600">CoA Only</span>
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
                  <span className="text-sm text-gray-600">Both CoA & CSV</span>
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

// Test status badge component with enhanced tooltip
const TestStatusBadge = ({ test, sample }) => {
  const getStatusColor = () => {
    if (test.status === 'completed') {
      return test.result === 'pass' 
        ? 'bg-blue-100 text-blue-700 border-blue-500 border-2'  // Thick blue border for pass
        : 'bg-red-100 text-red-700 border-red-500 border-2';    // Thick red border for fail
    }
    switch(test.status) {
      case 'in_prep': return 'bg-purple-100 text-purple-700 border-purple-500 border-2';
      case 'awaiting_analysis': return 'bg-yellow-100 text-yellow-700 border-yellow-500 border-2';
      case 'on_instrument': return 'bg-orange-100 text-orange-700 border-orange-500 border-dashed border-2';
      case 'data_review': return 'bg-indigo-100 text-indigo-700 border-indigo-500 border-2';
      case 'not_batched': return 'bg-gray-100 text-gray-600 border-gray-400';
      default: return 'bg-gray-100 text-gray-600 border-gray-400';
    }
  };

  const getIcon = () => {
    if (test.status === 'completed') {
      return test.result === 'pass' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />;
    }
    switch(test.status) {
      case 'in_prep': return <FlaskConical className="w-3 h-3" />;
      case 'awaiting_analysis': return <Clock className="w-3 h-3" />;
      case 'on_instrument': return <Loader2 className="w-3 h-3 animate-spin" />;
      case 'data_review': return <FileCheck className="w-3 h-3" />;
      case 'not_batched': return <Circle className="w-3 h-3" />;
      default: return <Circle className="w-3 h-3" />;
    }
  };

  // Get detailed workflow information
  const getWorkflowDetails = () => {
    if (test.status === 'completed') {
      if (test.result === 'pass') {
        return {
          status: 'Passed',
          details: test.batchNumber ? `Batch: ${test.batchNumber}` : 'Test completed successfully',
          assignee: test.completedBy || 'Lab System',
          timestamp: test.completedAt || 'Recently'
        };
      } else {
        return {
          status: 'Failed',
          details: test.failureReason || 'Out of specification',
          assignee: test.completedBy || 'Lab System',
          timestamp: test.completedAt || 'Recently'
        };
      }
    }
    
    // Handle all non-completed statuses
    const deptInfo = TEST_DEPARTMENTS[test.assay] || { department: 'Lab', location: 'Main Floor' };
    
    switch(test.status) {
      case 'in_prep':
        return {
          status: 'Sample Preparation',
          details: `Preparing sample for ${test.name} analysis`,
          assignee: test.assignee || 'Lab Tech Team',
          location: 'Sample Prep - Room 102',
          estimatedTime: '2-4 hours'
        };
      case 'awaiting_analysis':
        return {
          status: 'Queued for Analysis',
          details: `In queue for ${deptInfo.department}`,
          assignee: 'Pending assignment',
          location: 'Instrument Queue',
          queuePosition: test.queuePosition || '3rd',
          estimatedStart: test.estimatedStart || 'Within 2 hours'
        };
      case 'on_instrument':
        return {
          status: 'Running on Instrument',
          details: `Active on ${test.instrumentName || 'HPLC-MS'}`,
          assignee: test.analyst || 'Instrument Operator',
          location: `${deptInfo.department} - ${deptInfo.location}`,
          runTime: test.runTime || '45 min remaining',
          instrumentId: test.instrumentId || 'INST-204'
        };
      case 'data_review':
        return {
          status: 'Data Review',
          details: 'Reviewing chromatography and calculations',
          assignee: test.reviewer || 'QA Analyst',
          location: 'QA Department - Room 401',
          reviewStage: test.reviewStage || 'Primary Review'
        };
      case 'not_batched':
      default:
        return {
          status: 'Not Batched',
          details: 'Sample not yet added to a prep batch',
          assignee: 'Not yet assigned',
          estimatedStart: 'When batched',
          priority: test.priority || 'Standard'
        };
    }
    
    // Not batched status
    return {
      status: 'Not Batched',
      details: 'Sample not yet added to a batch',
      assignee: 'Not yet assigned',
      estimatedStart: test.estimatedStart || 'When batched'
    };
  };

  const workflowInfo = getWorkflowDetails();

  return (
    <div className="group relative inline-flex">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
        {getIcon()}
        {test.code}
      </span>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none w-64">
        <div className="font-semibold mb-1">{test.name}</div>
        <div className="space-y-1 text-gray-300">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-medium text-white">{workflowInfo.status}</span>
          </div>
          {workflowInfo.assignee && (
            <div className="flex justify-between">
              <span>Assigned to:</span>
              <span className="font-medium text-white">{workflowInfo.assignee}</span>
            </div>
          )}
          {workflowInfo.location && (
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium text-white">{workflowInfo.location}</span>
            </div>
          )}
          {workflowInfo.details && (
            <div className="pt-1 border-t border-gray-700 mt-1">
              <span className="text-gray-400">{workflowInfo.details}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Sample Status with Follow-up Information
const EnhancedSampleStatus = ({ sample }) => {
  const statusInfo = useMemo(() => calculateSampleStatus(sample), [sample]);
  const { status, timeline, blockers, summary, readyCount, totalCount } = statusInfo;
  
  // Get base color scheme based on status and timeline
  const colorClass = getStatusColorClass(status, timeline);
  
  // Map status to icon
  const statusIcons = {
    ready_to_report: CheckCircle2,
    failed: XCircle,
    in_progress: Clock,
    pending: AlertCircle
  };
  
  const Icon = statusIcons[status] || AlertCircle;
  
  // Build follow-up info for tooltip
  const followUpInfo = blockers.length > 0 ? (
    <div className="space-y-2">
      <div className="font-semibold mb-1">Follow-up Required:</div>
      {blockers.slice(0, 2).map((blocker, idx) => (
        <div key={idx} className="text-xs">
          <div className="font-medium">{blocker.testName}: {blocker.statusLabel}</div>
          <div>Contact: {blocker.assignee}</div>
          <div>Location: {blocker.department} - {blocker.location}</div>
        </div>
      ))}
      {blockers.length > 2 && (
        <div className="text-xs italic">...and {blockers.length - 2} more</div>
      )}
    </div>
  ) : null;
  
  // Build status label
  let statusLabel = summary;
  if (timeline.isOverdue) {
    statusLabel = `OVERDUE - ${summary}`;
  } else if (timeline.isAtRisk) {
    const hoursLeft = timeline.hoursRemaining;
    statusLabel = `${hoursLeft}h left - ${summary}`;
  }
  
  return (
    <div className="group relative inline-flex">
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${colorClass}`}>
        <Icon className="w-4 h-4" />
        <span className="max-w-[200px] truncate">{statusLabel}</span>
        {(timeline.isOverdue || timeline.isAtRisk) && (
          <AlertTriangle className="w-3 h-3" />
        )}
      </div>
      {followUpInfo && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 w-72 pointer-events-none">
          {followUpInfo}
          {timeline.isOverdue && (
            <div className="mt-2 pt-2 border-t border-gray-700 text-red-300">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              Overdue by {Math.abs(timeline.hoursRemaining)} hours
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Simple status for recently reported samples
const SampleStatus = ({ status, progressDetails }) => {
  if (status === 'reported') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-green-600 bg-green-50 border border-green-200">
        <Send className="w-4 h-4" />
        Reported
      </div>
    );
  }
  
  // Fallback for any other status
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200">
      <AlertCircle className="w-4 h-4" />
      {status}
    </div>
  );
};

// Sample View Component - Updated with hierarchy by due date/time
const SampleView = ({ orders, recentlyReported, onSelectSample, selectedSamples, onToggleSample, onToggleAllSamples, showRecentlyReported, timeRange, setShowReportPreview, setSelectedSamples }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
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
        dueDate: order.dueDate
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
            <th className="text-left py-3 px-4">Test Category</th>
            {showRecentlyReported ? (
              <>
                <th className="text-left py-3 px-4">Reported Date</th>
                <th className="text-left py-3 px-4">Version</th>
                <th className="text-left py-3 px-4">Reported By</th>
                <th className="text-left py-3 px-4">Method</th>
              </>
            ) : (
              <>
                <th className="text-left py-3 px-4">Assays - Pending</th>
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
            
            const isExpanded = expandedRows.has(sample.id);
            
            return (
              <React.Fragment key={sample.id}>
                <tr className={`${hasFailedTests ? 'bg-red-50' : isSelected ? 'bg-blue-50' : ''} ${isOverdue ? 'bg-yellow-50' : ''} transition-colors cursor-pointer`} onClick={() => setExpandedRows(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(sample.id)) {
                    newSet.delete(sample.id);
                  } else {
                    newSet.add(sample.id);
                  }
                  return newSet;
                })}>
                {!showRecentlyReported && (
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRows(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(sample.id)) {
                              newSet.delete(sample.id);
                            } else {
                              newSet.add(sample.id);
                            }
                            return newSet;
                          });
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          onToggleSample(sample.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </td>
                )}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {showRecentlyReported && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRows(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(sample.id)) {
                              newSet.delete(sample.id);
                            } else {
                              newSet.add(sample.id);
                            }
                            return newSet;
                          });
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    )}
                    <span className="font-mono text-sm">{sample.labId}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-gray-900">{sample.orderNumber}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-gray-900">{sample.productName}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{sample.client}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-gray-700">{sample.testCategory || 'N/A'}</span>
                </td>
                {showRecentlyReported ? (
                  <>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(sample.reportedDate).toLocaleDateString()} {new Date(sample.reportedDate).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">v{sample.currentVersion || 1}</span>
                        {sample.reportVersions && sample.reportVersions.length > 1 && (
                          <span className="text-xs text-amber-600 font-medium">(Amended)</span>
                        )}
                      </div>
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
                          {sample.tests.filter(test => test.status !== 'completed').map((test, idx) => (
                            <TestStatusBadge key={idx} test={test} sample={sample} />
                          ))}
                        </div>
                      )}
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
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSample(sample.id);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    {!showRecentlyReported && (
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
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Mock download action
                            console.log(`Downloading CoA for sample ${sample.labId}`);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded text-sm font-medium transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CoA
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSamples(new Set([sample.id]));
                            setShowReportPreview(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded text-sm font-medium transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Amend
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
              {isExpanded && (
                <tr>
                  <td colSpan={showRecentlyReported ? 9 : 8} className="bg-gray-50 px-4 py-4 border-t border-gray-200">
                    <ExpandedSampleView sample={sample} />
                  </td>
                </tr>
              )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Expanded Sample View Component with Assay Tabs
const ExpandedSampleView = ({ sample }) => {
  // Get unique assays from the tests
  const assays = [...new Set(sample.tests?.map(test => test.assay) || [])];
  const [activeTab, setActiveTab] = useState(assays[0] || 'overview');
  
  // Add overview tab if there are no tests
  const tabs = assays.length > 0 ? ['overview', ...assays] : ['overview'];
  
  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        {assays.map(assay => (
          <button
            key={assay}
            onClick={() => setActiveTab(assay)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === assay
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {assay}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Sample ID</h5>
                          <p className="text-sm text-gray-900">{sample.sampleId}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Manifest Number</h5>
                          <p className="text-sm text-gray-900">{sample.manifestNumber}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Product Type</h5>
                          <p className="text-sm text-gray-900 flex items-center gap-1">
                            <FlaskConical className="w-3 h-3" />
                            {sample.productType || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Metrc Tag</h5>
                          <p className="text-sm font-mono text-gray-900">{sample.metrcTag || 'N/A'}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">CC Order Verified</h5>
                          <p className="text-sm text-gray-900">{sample.ccOrderVerified ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Reportable Assays</h5>
                          <p className="text-sm text-gray-900">{sample.reportableAssays?.join(', ') || 'N/A'}</p>
                        </div>
                      </div>
                      {sample.potencyTargets && (
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">Potency Targets</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(sample.potencyTargets).map(([analyte, targets]) => (
                              <div key={analyte} className="p-2 bg-gray-100 rounded">
                                <p className="text-sm font-medium text-gray-700">{analyte}</p>
                                <p className="text-xs text-gray-600">Range: {targets.low}% - {targets.high}%</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Notes Section */}
                      {(sample.manifestNotes || Object.values(sample.assayNotes || {}).some(note => note)) && (
                        <div className="mt-4">
                          <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">Notes</h5>
                          {sample.manifestNotes && (
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-2">
                              <p className="text-sm text-yellow-800">
                                <span className="font-medium">Manifest Note:</span> {sample.manifestNotes}
                              </p>
                            </div>
                          )}
                          {Object.entries(sample.assayNotes || {}).filter(([_, note]) => note).length > 0 && (
                            <div className="space-y-2">
                              {Object.entries(sample.assayNotes || {}).map(([assay, note]) => 
                                note && (
                                  <div key={assay} className="p-3 bg-blue-50 border border-blue-200 rounded">
                                    <p className="text-sm text-blue-800">
                                      <span className="font-medium">{assay} Note:</span> {note}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Assay-specific tabs */}
                  {assays.map(assay => (
                    activeTab === assay && (
                      <div key={assay} className="space-y-4">
                        {/* Test information for this assay */}
                        {sample.tests?.filter(test => test.assay === assay).map((test, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <TestStatusBadge test={test} sample={sample} />
                                <h4 className="text-lg font-medium text-gray-900">{test.name}</h4>
                              </div>
                              {test.status === 'completed' && (
                                <span className={`text-lg font-bold ${test.result === 'pass' ? 'text-blue-600' : 'text-red-600'}`}>
                                  {test.result === 'pass' ? 'PASS' : 'FAIL'}
                                </span>
                              )}
                            </div>
                            
                            {/* Status Details */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Status</p>
                                <p className="text-sm text-gray-900">
                                  {test.status === 'in_prep' ? 'In Preparation' : 
                                   test.status === 'awaiting_analysis' ? 'Awaiting Analysis' :
                                   test.status === 'on_instrument' ? 'On Instrument' :
                                   test.status === 'data_review' ? 'Data Review' :
                                   test.status === 'not_batched' ? 'Not Batched' :
                                   test.status === 'completed' ? 'Completed' : 
                                   test.status}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Test Code</p>
                                <p className="text-sm font-mono text-gray-900">{test.code}</p>
                              </div>
                            </div>
                            
                            {/* Results if completed */}
                            {test.status === 'completed' && test.replicates && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Test Results</h5>
                                <div className="space-y-2">
                                  {test.replicates.map((rep, repIdx) => (
                                    <div key={repIdx} className="bg-gray-50 rounded p-3">
                                      <p className="text-xs font-medium text-gray-600 mb-2">Replicate {rep.replicateNumber}</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(rep.results || {}).map(([analyte, result]) => (
                                          <div key={analyte} className="text-xs">
                                            <span className="text-gray-600">{analyte}:</span>
                                            <span className="ml-1 font-medium text-gray-900">{result.value} {result.unit}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Notes for this assay if any */}
                            {sample.assayNotes?.[assay] && (
                              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                <p className="text-sm text-blue-800">
                                  <span className="font-medium">Note:</span> {sample.assayNotes[assay]}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  ))}
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
    const samples = orders.flatMap(order => 
      order.samples.filter(sample => selectedSamples.has(sample.id)).map(sample => ({
        ...sample,
        manifestNumber: order.manifestNumber,
        orderNumber: order.orderNumber,
        client: order.client,
        dueDate: order.dueDate
      }))
    );
    return samples;
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
      message: `Generated ${downloadFormat === 'both' ? 'CoA and CSV' : downloadFormat.toUpperCase()} for ${selectedSamplesData.length} sample${selectedSamplesData.length !== 1 ? 's' : ''}`
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
    
    // Move samples to recently reported with version tracking
    const newReportedSamples = selectedSamplesData.map(sample => {
      const isAmendment = sample.currentVersion > 0;
      const newVersion = (sample.currentVersion || 0) + 1;
      const newReportVersion = {
        version: newVersion,
        reportedDate: `${submissionData.date}T${submissionData.time}:00`,
        reportedBy: submissionData.submittedBy,
        reportingStatus: 'sent_to_metrc',
        reason: isAmendment ? submissionData.notes || 'Amendment' : 'Initial report'
      };
      
      return {
        ...sample,
        status: 'reported',
        reportingStatus: 'sent_to_metrc',
        reportedDate: `${submissionData.date}T${submissionData.time}:00`,
        reportedBy: submissionData.submittedBy,
        submissionMethod: submissionData.method,
        submissionNotes: submissionData.notes,
        currentVersion: newVersion,
        reportVersions: [...(sample.reportVersions || []), newReportVersion]
      };
    });
    
    // For amendments, update existing samples; for new reports, add to list
    setRecentlyReported(prev => {
      const updatedList = [...prev];
      newReportedSamples.forEach(newSample => {
        const existingIndex = updatedList.findIndex(s => s.id === newSample.id);
        if (existingIndex >= 0) {
          // Update existing sample (amendment)
          updatedList[existingIndex] = newSample;
        } else {
          // Add new sample
          updatedList.unshift(newSample);
        }
      });
      return updatedList;
    });
    
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
    
    // Filter recently reported by current time range
    const now = new Date();
    const cutoffDate = new Date();
    
    switch(recentlyReportedTimeRange) {
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
    
    const filteredRecentlyReported = recentlyReported.filter(
      sample => new Date(sample.reportedDate) >= cutoffDate
    );
    
    return {
      total: allSamples.length,
      readyToReport: allSamples.filter(s => s.status === 'ready_to_report').length,
      inProgress: allSamples.filter(s => s.status === 'in_progress').length,
      reported: filteredRecentlyReported.length, // Use filtered count
      failed: allSamples.filter(s => 
        s.tests?.some(t => t.status === 'completed' && t.result === 'fail')
      ).length
    };
  }, [orders, recentlyReported, recentlyReportedTimeRange]);

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
                    <option value="pending">Not Batched</option>
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
                <XCircle className="w-8 h-8 text-red-400" />
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

        {/* Test Status Legend */}
        {!showRecentlyReported && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
            <div className="flex items-center gap-6 text-sm">
              <span className="font-medium text-gray-700">Test Status:</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">Passed</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-gray-600">Failed</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-gray-600">In Progress (Active)</span>
              </div>
              <div className="flex items-center gap-1">
                <Circle className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Not Batched</span>
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