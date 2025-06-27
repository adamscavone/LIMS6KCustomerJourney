import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle,
  RefreshCw,
  Filter,
  FileDown,
  Mail,
  TrendingUp,
  Beaker,
  ChevronRight
} from 'lucide-react';

const ReportingQueue = () => {
  const [samples, setSamples] = useState([]);
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    lab: 'all',
    customer: '',
    dateRange: 'today',
    testStatus: 'all',
    sortBy: 'dueDate'
  });
  
  // Dashboard metrics
  const [metrics, setMetrics] = useState({
    total: 0,
    overdue: 0,
    atRisk: 0,
    onTime: 0,
    workflow: {
      readyForPrep: 0,
      inPreparation: 0,
      onInstrument: 0,
      primaryReview: 0,
      secondaryReview: 0
    }
  });

  useEffect(() => {
    loadSamples();
    const interval = setInterval(() => {
      loadSamples();
      setLastRefresh(new Date());
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [filters]);

  const loadSamples = () => {
    // Mock data - replace with API call
    const mockSamples = [
      {
        id: 'S-2025-001',
        customerName: 'Green Valley Farms',
        customerState: 'OH',
        pipeline: 'Cannabinoids',
        status: 'Primary Review',
        receivedDate: new Date(Date.now() - 172800000),
        dueDate: new Date(Date.now() - 7200000),
        daysUntilDue: -0.3,
        tatStatus: 'overdue',
        testCategory: 'DPM',
        isDPMEarlyStart: true,
        assays: {
          cannabinoids: { status: 'complete', result: 'pass' },
          pesticides: { status: 'complete', result: 'pass' },
          microbials: { status: 'in-review', result: null },
          moisture: { status: 'complete', result: 'pass', value: 11.2 }
        },
        stuckDuration: null,
        batchId: 'AB-2025-001'
      },
      {
        id: 'S-2025-002',
        customerName: 'Mountain Top Cultivators',
        customerState: 'MI',
        pipeline: 'Pesticides',
        status: 'On Instrument',
        receivedDate: new Date(Date.now() - 86400000),
        dueDate: new Date(Date.now() + 14400000),
        daysUntilDue: 0.17,
        tatStatus: 'at-risk',
        testCategory: 'QFQN',
        isDPMEarlyStart: false,
        assays: {
          pesticides: { status: 'testing', result: null },
          heavyMetals: { status: 'complete', result: 'pass' }
        },
        stuckDuration: 4,
        batchId: 'PB-2025-045'
      },
      {
        id: 'S-2025-003',
        customerName: 'Pure Leaf Labs',
        customerState: 'OH',
        pipeline: 'Full Panel',
        status: 'Secondary Review',
        receivedDate: new Date(Date.now() - 259200000),
        dueDate: new Date(Date.now() + 86400000),
        daysUntilDue: 1,
        tatStatus: 'on-time',
        testCategory: 'DPM',
        isDPMEarlyStart: true,
        assays: {
          cannabinoids: { status: 'complete', result: 'pass' },
          pesticides: { status: 'complete', result: 'pass' },
          microbials: { status: 'complete', result: 'pass' },
          moisture: { status: 'complete', result: 'pass', value: 9.8 }
        },
        stuckDuration: null,
        batchId: 'AB-2025-002'
      },
      {
        id: 'S-2025-004',
        customerName: 'Buckeye Botanicals',
        customerState: 'OH',
        pipeline: 'Microbials',
        status: 'Ready for Prep',
        receivedDate: new Date(Date.now() - 3600000),
        dueDate: new Date(Date.now() + 43200000),
        daysUntilDue: 0.5,
        tatStatus: 'at-risk',
        testCategory: 'DPM',
        isDPMEarlyStart: true,
        assays: {
          microbials: { status: 'pending', result: null }
        },
        stuckDuration: 3,
        batchId: null
      },
      {
        id: 'S-2025-005',
        customerName: 'Great Lakes Cannabis',
        customerState: 'MI',
        pipeline: 'Cannabinoids',
        status: 'In Preparation',
        receivedDate: new Date(Date.now() - 7200000),
        dueDate: new Date(Date.now() + 172800000),
        daysUntilDue: 2,
        tatStatus: 'on-time',
        testCategory: 'Standard',
        isDPMEarlyStart: false,
        assays: {
          cannabinoids: { status: 'in-prep', result: null }
        },
        stuckDuration: null,
        batchId: 'PB-2025-046'
      }
    ];

    setSamples(mockSamples);
    
    // Calculate metrics
    const newMetrics = {
      total: mockSamples.length,
      overdue: mockSamples.filter(s => s.tatStatus === 'overdue').length,
      atRisk: mockSamples.filter(s => s.tatStatus === 'at-risk').length,
      onTime: mockSamples.filter(s => s.tatStatus === 'on-time').length,
      workflow: {
        readyForPrep: mockSamples.filter(s => s.status === 'Ready for Prep').length,
        inPreparation: mockSamples.filter(s => s.status === 'In Preparation').length,
        onInstrument: mockSamples.filter(s => s.status === 'On Instrument').length,
        primaryReview: mockSamples.filter(s => s.status === 'Primary Review').length,
        secondaryReview: mockSamples.filter(s => s.status === 'Secondary Review').length
      }
    };
    setMetrics(newMetrics);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-time':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAssayStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'testing':
      case 'in-prep':
      case 'in-review':
        return <Clock className="h-4 w-4 text-yellow-600 animate-pulse" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const toggleSampleSelection = (sampleId) => {
    setSelectedSamples(prev => 
      prev.includes(sampleId) 
        ? prev.filter(id => id !== sampleId)
        : [...prev, sampleId]
    );
  };

  const handleBatchAction = (action) => {
    console.log(`Performing ${action} on ${selectedSamples.length} samples`);
    // Implement batch actions
  };

  const filteredSamples = samples.filter(sample => {
    if (filters.lab !== 'all' && sample.customerState !== filters.lab) return false;
    if (filters.customer && !sample.customerName.toLowerCase().includes(filters.customer.toLowerCase())) return false;
    if (filters.testStatus !== 'all' && sample.tatStatus !== filters.testStatus) return false;
    return true;
  });

  // Sort samples
  const sortedSamples = [...filteredSamples].sort((a, b) => {
    switch (filters.sortBy) {
      case 'dueDate':
        return a.dueDate - b.dueDate;
      case 'customer':
        return a.customerName.localeCompare(b.customerName);
      case 'sampleType':
        return a.pipeline.localeCompare(b.pipeline);
      case 'testCategory':
        return a.testCategory.localeCompare(b.testCategory);
      default:
        return 0;
    }
  });

  // DPM Early Start samples
  const dpmEarlyStartSamples = samples.filter(s => s.isDPMEarlyStart && s.customerState === 'OH');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Reporting Queue</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Last refresh: {lastRefresh.toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => loadSamples()}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Metrics Overview */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Beaker className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Samples</p>
                      <p className="text-2xl font-semibold text-gray-900">{metrics.total}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-red-800">Overdue</p>
                      <p className="text-2xl font-semibold text-red-900">{metrics.overdue}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-800">TAT At Risk</p>
                      <p className="text-2xl font-semibold text-yellow-900">{metrics.atRisk}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-800">On Time</p>
                      <p className="text-2xl font-semibold text-green-900">{metrics.onTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workflow Distribution */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Workflow Distribution</h3>
                <div className="flex items-center space-x-6 text-sm">
                  <span>Ready for Prep: <strong>{metrics.workflow.readyForPrep}</strong></span>
                  <span>In Preparation: <strong>{metrics.workflow.inPreparation}</strong></span>
                  <span>On Instrument: <strong>{metrics.workflow.onInstrument}</strong></span>
                  <span>Primary Review: <strong>{metrics.workflow.primaryReview}</strong></span>
                  <span>Secondary Review: <strong>{metrics.workflow.secondaryReview}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lab</label>
                  <select
                    value={filters.lab}
                    onChange={(e) => setFilters({ ...filters, lab: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Labs</option>
                    <option value="OH">Ohio</option>
                    <option value="MI">Michigan</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <input
                    type="text"
                    value={filters.customer}
                    onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
                    placeholder="Search..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={filters.testStatus}
                    onChange={(e) => setFilters({ ...filters, testStatus: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="overdue">Overdue</option>
                    <option value="at-risk">At Risk</option>
                    <option value="on-time">On Time</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="dueDate">Due Date</option>
                    <option value="customer">Customer</option>
                    <option value="sampleType">Sample Type</option>
                    <option value="testCategory">Test Category</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  {selectedSamples.length > 0 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBatchAction('metrc')}
                        className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                      >
                        Submit to Metrc
                      </button>
                      <button
                        onClick={() => handleBatchAction('coa')}
                        className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                      >
                        Generate COAs
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DPM Early Start Section - Ohio Only */}
          {filters.lab !== 'MI' && dpmEarlyStartSamples.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-medium text-blue-900">DPM Early Start Monitoring</h3>
                </div>
                <div className="space-y-2">
                  {dpmEarlyStartSamples.map(sample => (
                    <div key={sample.id} className="flex items-center justify-between bg-white rounded p-3">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">{sample.id}</span>
                        <span className="text-sm text-gray-500">{sample.customerName}</span>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(sample.tatStatus)}`}>
                          {sample.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Due: {sample.dueDate.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sample Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSamples(sortedSamples.map(s => s.id));
                        } else {
                          setSelectedSamples([]);
                        }
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sample Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workflow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSamples.map((sample) => (
                  <tr key={sample.id} className={selectedSamples.includes(sample.id) ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedSamples.includes(sample.id)}
                        onChange={() => toggleSampleSelection(sample.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{sample.id}</div>
                        <div className="text-gray-500">{sample.customerName} ({sample.customerState})</div>
                        <div className="text-xs text-gray-400">
                          {sample.pipeline} | {sample.testCategory}
                          {sample.isDPMEarlyStart && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                              DPM Early Start
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {Object.entries(sample.assays).map(([assay, data]) => (
                          <div key={assay} className="flex items-center space-x-2">
                            {getAssayStatusIcon(data.status)}
                            <span className="text-xs text-gray-600 capitalize">{assay}</span>
                            {data.result && (
                              <span className={`text-xs ${data.result === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                                {data.result}
                              </span>
                            )}
                            {assay === 'moisture' && data.value && (
                              <span className="text-xs text-gray-500">({data.value}%)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{sample.status}</div>
                        {sample.stuckDuration && (
                          <div className="text-xs text-yellow-600">
                            Stuck for {sample.stuckDuration}h
                          </div>
                        )}
                        {sample.batchId && (
                          <div className="text-xs text-gray-500">
                            Batch: {sample.batchId}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium ${getStatusColor(sample.tatStatus)}`}>
                        {sample.tatStatus === 'overdue' && <AlertCircle className="h-4 w-4 mr-1" />}
                        {sample.tatStatus === 'at-risk' && <Clock className="h-4 w-4 mr-1" />}
                        {sample.tatStatus === 'on-time' && <CheckCircle className="h-4 w-4 mr-1" />}
                        {sample.dueDate.toLocaleDateString()} {sample.dueDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        <span className="ml-2 text-xs">
                          ({sample.daysUntilDue < 0 ? 'Overdue' : `${Math.abs(sample.daysUntilDue).toFixed(1)}d`})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* State-Specific Alerts */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filters.lab !== 'MI' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-900 mb-2">Ohio Requirements</h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Moisture content must be present for all COAs</li>
                  <li>• Separate Pesticides/Mycotoxins reporting required</li>
                  <li>• Microbial CSV import available for batch results</li>
                  <li>• DPM Early Start samples prioritized for microbial testing</li>
                </ul>
              </div>
            )}
            
            {filters.lab !== 'OH' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Michigan Requirements</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• QFQN workflow tracking for Chemical Residues</li>
                  <li>• Enhanced Foreign Matter processing</li>
                  <li>• Inhaled products require special Heavy Metals limits</li>
                  <li>• Michigan Snapshots HTML email generation required</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingQueue;