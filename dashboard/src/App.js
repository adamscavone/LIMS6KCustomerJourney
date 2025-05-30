import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronRight, Eye, BarChart3, Calendar, Beaker } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('cannabinoids');
  const [expandedBatches, setExpandedBatches] = useState({});

  // Mock data representing realistic sample loads
  const mockSamples = {
    cannabinoids: [
      {
        id: 'S001',
        orderId: 'ORD-2024-1156',
        client: 'Green Valley Farms',
        sampleName: 'GVF-Indica-Batch-45',
        dueDate: '2025-05-29', // Overdue
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: '2025-05-29',
        analysisDue: '2025-05-30',
        reportingDue: '2025-05-31'
      },
      {
        id: 'S002',
        orderId: 'ORD-2024-1157',
        client: 'Mountain Peak Cannabis',
        sampleName: 'MPC-Sativa-Mix-12',
        dueDate: '2025-05-30', // Today
        status: 'in_progress',
        priority: 'standard',
        prepDue: '2025-05-30',
        analysisDue: '2025-05-31',
        reportingDue: '2025-06-02'
      },
      {
        id: 'S003',
        orderId: 'ORD-2024-1158',
        client: 'Urban Harvest Co',
        sampleName: 'UHC-Hybrid-Premium-8',
        dueDate: '2025-06-01', // Future
        status: 'pending_microbial',
        priority: 'standard',
        prepDue: '2025-06-01',
        analysisDue: '2025-06-02',
        reportingDue: '2025-06-03'
      }
    ],
    terpenes: [
      {
        id: 'T001',
        orderId: 'ORD-2024-1159',
        client: 'Coastal Cannabis',
        sampleName: 'CC-Terpene-Profile-A',
        dueDate: '2025-05-30',
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: '2025-05-30',
        analysisDue: '2025-05-31',
        reportingDue: '2025-06-01'
      },
      {
        id: 'T002',
        orderId: 'ORD-2024-1160',
        client: 'Desert Bloom',
        sampleName: 'DB-Myrcene-Study-3',
        dueDate: '2025-06-01',
        status: 'in_progress',
        priority: 'standard',
        prepDue: '2025-05-31',
        analysisDue: '2025-06-01',
        reportingDue: '2025-06-02'
      }
    ],
    pesticides: [
      {
        id: 'P001',
        orderId: 'ORD-2024-1161',
        client: 'Pure Labs Testing',
        sampleName: 'PLT-Residue-Screen-19',
        dueDate: '2025-05-29', // Overdue
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: '2025-05-29',
        analysisDue: '2025-05-30',
        reportingDue: '2025-05-31'
      }
    ]
  };

  const mockBatches = [
    {
      id: 'BATCH-CB-240530-001',
      type: 'cannabinoids',
      status: 'ready_for_review',
      sampleCount: 24,
      prepDate: '2025-05-29',
      analysisDate: '2025-05-30',
      qcStatus: 'pass',
      analyst: 'Dr. Sarah Chen'
    },
    {
      id: 'BATCH-TP-240530-002',
      type: 'terpenes',
      status: 'in_progress',
      sampleCount: 16,
      prepDate: '2025-05-30',
      analysisDate: '2025-05-31',
      qcStatus: 'pending',
      analyst: 'Dr. Sarah Chen'
    },
    {
      id: 'BATCH-PM-240529-003',
      type: 'pesticides',
      status: 'ready_for_review',
      sampleCount: 12,
      prepDate: '2025-05-28',
      analysisDate: '2025-05-29',
      qcStatus: 'deviation',
      analyst: 'Dr. Mike Rodriguez'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready_for_prep': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending_microbial': return 'bg-purple-100 text-purple-800';
      case 'ready_for_review': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'rush' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600';
  };

  const getDueDateUrgency = (dueDate) => {
    const today = new Date('2025-05-30');
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { color: 'text-red-600 font-bold', label: 'OVERDUE' };
    if (diffDays === 0) return { color: 'text-orange-600 font-semibold', label: 'TODAY' };
    if (diffDays === 1) return { color: 'text-yellow-600', label: 'TOMORROW' };
    return { color: 'text-gray-600', label: `${diffDays} days` };
  };

  const getQCStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'deviation': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleBatchExpansion = (batchId) => {
    setExpandedBatches(prev => ({
      ...prev,
      [batchId]: !prev[batchId]
    }));
  };

  const sortSamplesByPriority = (samples) => {
    return [...samples].sort((a, b) => {
      // First by due date urgency
      const urgencyA = getDueDateUrgency(a.dueDate);
      const urgencyB = getDueDateUrgency(b.dueDate);
      
      if (urgencyA.label === 'OVERDUE' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'OVERDUE' && urgencyA.label !== 'OVERDUE') return 1;
      if (urgencyA.label === 'TODAY' && urgencyB.label !== 'TODAY' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'TODAY' && urgencyA.label !== 'TODAY' && urgencyA.label !== 'OVERDUE') return 1;
      
      // Then by priority
      if (a.priority === 'rush' && b.priority !== 'rush') return -1;
      if (b.priority === 'rush' && a.priority !== 'rush') return 1;
      
      // Then by client name
      return a.client.localeCompare(b.client);
    });
  };

  const renderSampleRow = (sample) => {
    const urgency = getDueDateUrgency(sample.dueDate);
    
    return (
      <div key={sample.id} className="border-b border-gray-200 hover:bg-gray-50">
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(sample.priority)}`}>
                  {sample.priority.toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {sample.sampleName}
                </p>
                <p className="text-sm text-gray-500">
                  {sample.client} • {sample.orderId}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className={`text-sm ${urgency.color}`}>
                {urgency.label}
              </p>
              <p className="text-xs text-gray-500">
                Due: {sample.dueDate}
              </p>
            </div>
            
            <div className="text-center">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sample.status)}`}>
                {sample.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Timeline breakdown */}
        <div className="px-4 pb-3">
          <div className="flex space-x-4 text-xs text-gray-500">
            <span>Prep Due: {sample.prepDue}</span>
            <span>Analysis Due: {sample.analysisDue}</span>
            <span>Reporting Due: {sample.reportingDue}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Senior Chemist Dashboard</h1>
              <p className="text-sm text-gray-600">Dr. Sarah Chen • Friday, May 30, 2025</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: 8:15 AM
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sample Pipeline - Main Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-900">Sample Pipeline</h2>
                  <p className="text-sm text-gray-600">Organized by assay type and urgency</p>
                </div>
                
                {/* Tabs */}
                <div className="flex space-x-8 px-6">
                  {[
                    { id: 'cannabinoids', label: 'Cannabinoids', icon: Beaker, count: mockSamples.cannabinoids.length },
                    { id: 'terpenes', label: 'Terpenes', icon: Beaker, count: mockSamples.terpenes.length },
                    { id: 'pesticides', label: 'Pesticides/Mycotoxins', icon: Beaker, count: mockSamples.pesticides.length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                      <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample List */}
              <div className="divide-y divide-gray-200">
                {sortSamplesByPriority(mockSamples[activeTab]).map(renderSampleRow)}
                
                {mockSamples[activeTab].length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Beaker className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No samples in queue for {activeTab}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Primary Review Batches */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Primary Review Batches</h3>
                <p className="text-sm text-gray-600">Ready for your review</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {mockBatches.map((batch) => (
                  <div key={batch.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() => toggleBatchExpansion(batch.id)}
                        className="flex items-center text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        {expandedBatches[batch.id] ? 
                          <ChevronDown className="w-4 h-4 mr-1" /> : 
                          <ChevronRight className="w-4 h-4 mr-1" />
                        }
                        {batch.id}
                      </button>
                      {getQCStatusIcon(batch.qcStatus)}
                    </div>
                    
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>{batch.type.toUpperCase()} • {batch.sampleCount} samples</p>
                      <p>Analyst: {batch.analyst}</p>
                      <p>Analysis: {batch.analysisDate}</p>
                    </div>
                    
                    {expandedBatches[batch.id] && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-blue-700">
                            Review Batch
                          </button>
                          <button className="px-3 py-2 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
                            QC Charts
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Today's Overview</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Overdue Samples</span>
                  <span className="text-lg font-semibold text-red-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Due Today</span>
                  <span className="text-lg font-semibold text-orange-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Batches to Review</span>
                  <span className="text-lg font-semibold text-blue-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">QC Deviations</span>
                  <span className="text-lg font-semibold text-red-600">1</span>
                </div>
              </div>
            </div>

            {/* Control Charts Access */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">QC Monitoring</h3>
              </div>
              
              <div className="p-6">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Control Charts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;