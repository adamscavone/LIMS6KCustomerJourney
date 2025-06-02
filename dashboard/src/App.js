import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronRight, Eye, BarChart3, Calendar, Beaker, Grid, List, Package, FlaskConical, Building2 } from 'lucide-react';

const App = () => {
  const [expandedBatches, setExpandedBatches] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});
  const [expandedDPMCustomers, setExpandedDPMCustomers] = useState({});
  const [viewMode, setViewMode] = useState('order'); // Default to 'order' view
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for "Last Updated"
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

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
        status: 'analysis',
        priority: 'standard',
        prepDue: '2025-05-30',
        analysisDue: '2025-05-31',
        reportingDue: '2025-06-02'
      },
      {
        id: 'S003',
        orderId: 'ORD-2024-1157', // Same order as S002 but different due date
        client: 'Mountain Peak Cannabis',
        sampleName: 'MPC-Sativa-Mix-13',
        dueDate: '2025-06-01', // Different from S002's date
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: '2025-05-31',
        analysisDue: '2025-06-01',
        reportingDue: '2025-06-02'
      },
      {
        id: 'S004',
        orderId: 'ORD-2024-1158',
        client: 'Urban Harvest Co',
        sampleName: 'UHC-Hybrid-Premium-8',
        dueDate: '2025-06-01', // Future
        status: 'prep',
        priority: 'standard',
        prepDue: '2025-06-01',
        analysisDue: '2025-06-02',
        reportingDue: '2025-06-03'
      },
      {
        id: 'S005',
        orderId: 'ORD-2024-1158', // Same order as S004
        client: 'Urban Harvest Co',
        sampleName: 'UHC-Hybrid-Premium-9',
        dueDate: '2025-06-01',
        status: 'prepped',
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
        status: 'analyzed',
        priority: 'standard',
        prepDue: '2025-05-31',
        analysisDue: '2025-06-01',
        reportingDue: '2025-06-02'
      },
      {
        id: 'T003',
        orderId: 'ORD-2024-1160', // Same order as T002
        client: 'Desert Bloom',
        sampleName: 'DB-Myrcene-Study-4',
        dueDate: '2025-06-01',
        status: 'ready_for_prep',
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

  // Updated DPM Early Start data - grouped by customer, sorted by due date priority
  const rawDPMByCustomer = [
    {
      customer: 'Mountain Ridge Testing',
      sampleCount: 6,
      esDue: '2025-05-29', // Overdue
      priority: 'rush',
      orders: [
        { orderId: 'ORD-2024-1199', sampleCount: 6 }
      ],
      samples: [
        {
          id: 'DPM005',
          orderId: 'ORD-2024-1199',
          sampleName: 'MRT-Overdue-1',
          status: 'micro_secondary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    },
    {
      customer: 'Pacific Northwest Cannabis',
      sampleCount: 8,
      esDue: '2025-05-30', // Today
      priority: 'standard',
      orders: [
        { orderId: 'ORD-2024-1200', sampleCount: 5 },
        { orderId: 'ORD-2024-1203', sampleCount: 3 }
      ],
      samples: [
        {
          id: 'DPM001',
          orderId: 'ORD-2024-1200',
          sampleName: 'PNW-Early-Test-1',
          status: 'micro_in_progress',
          microbialTests: { completed: 4, total: 6, remaining: ['STEC', 'Salmonella'] }
        },
        {
          id: 'DPM004',
          orderId: 'ORD-2024-1200',
          sampleName: 'PNW-Early-Test-2',
          status: 'micro_primary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    },
    {
      customer: 'Northern Lights Labs',
      sampleCount: 12,
      esDue: '2025-06-01', // Tomorrow
      priority: 'rush',
      orders: [
        { orderId: 'ORD-2024-1201', sampleCount: 12 }
      ],
      samples: [
        {
          id: 'DPM002',
          orderId: 'ORD-2024-1201',
          sampleName: 'NLL-Conditional-2',
          status: 'micro_primary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    },
    {
      customer: 'Cascade Cannabis Co',
      sampleCount: 4,
      esDue: '2025-06-03', // Future
      priority: 'standard',
      orders: [
        { orderId: 'ORD-2024-1202', sampleCount: 4 }
      ],
      samples: [
        {
          id: 'DPM003',
          orderId: 'ORD-2024-1202',
          sampleName: 'CCC-DPM-Sample-A',
          status: 'micro_secondary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    }
  ];

  // Sort DPM customers by due date priority (overdue first, then by date)
  const mockDPMByCustomer = [...rawDPMByCustomer].sort((a, b) => {
    const urgencyA = getDueDateUrgency(a.esDue);
    const urgencyB = getDueDateUrgency(b.esDue);
    
    if (urgencyA.label === 'OVERDUE' && urgencyB.label !== 'OVERDUE') return -1;
    if (urgencyB.label === 'OVERDUE' && urgencyA.label !== 'OVERDUE') return 1;
    if (urgencyA.label === 'TODAY' && urgencyB.label !== 'TODAY' && urgencyB.label !== 'OVERDUE') return -1;
    if (urgencyB.label === 'TODAY' && urgencyA.label !== 'TODAY' && urgencyA.label !== 'OVERDUE') return 1;
    
    // Then by actual date
    return new Date(a.esDue) - new Date(b.esDue);
  });

  const mockPrimaryBatches = [
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
    }
  ];

  const mockSecondaryBatches = [
    {
      id: 'BATCH-PM-240529-003',
      type: 'pesticides',
      status: 'ready_for_secondary',
      sampleCount: 12,
      prepDate: '2025-05-28',
      analysisDate: '2025-05-29',
      qcStatus: 'deviation',
      analyst: 'Dr. Mike Rodriguez',
      primaryReviewer: 'Dr. Mike Rodriguez'
    },
    {
      id: 'BATCH-CB-240528-004',
      type: 'cannabinoids',
      status: 'ready_for_secondary',
      sampleCount: 18,
      prepDate: '2025-05-27',
      analysisDate: '2025-05-28',
      qcStatus: 'pass',
      analyst: 'Dr. Lisa Park',
      primaryReviewer: 'Dr. Lisa Park'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready_for_prep': return 'bg-blue-100 text-blue-800';
      case 'prep': return 'bg-indigo-100 text-indigo-800';
      case 'prepped': return 'bg-purple-100 text-purple-800';
      case 'analysis': return 'bg-yellow-100 text-yellow-800';
      case 'analyzed': return 'bg-green-100 text-green-800';
      case 'ready_for_review': return 'bg-green-100 text-green-800';
      case 'ready_for_secondary': return 'bg-orange-100 text-orange-800';
      case 'micro_in_progress': return 'bg-pink-100 text-pink-800';
      case 'micro_primary_review': return 'bg-teal-100 text-teal-800';
      case 'micro_secondary_review': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ready_for_prep': return 'Ready for Prep';
      case 'prep': return 'Prep';
      case 'prepped': return 'Prepped';
      case 'analysis': return 'Analysis';
      case 'analyzed': return 'Analyzed';
      case 'ready_for_review': return 'Ready for Review';
      case 'ready_for_secondary': return 'Ready for Secondary';
      case 'micro_in_progress': return 'Micro In Progress';
      case 'micro_primary_review': return 'Micro Primary Review';
      case 'micro_secondary_review': return 'Micro Secondary Review';
      default: return status.replace('_', ' ').toUpperCase();
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'rush' ? 'bg-red-100 text-red-800' : null;
  };

  const getPriorityLabel = (priority) => {
    return priority === 'rush' ? 'RUSH' : null;
  };

  const getDueDateUrgency = (dueDate) => {
    const today = new Date();
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

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const toggleDPMCustomerExpansion = (customer) => {
    setExpandedDPMCustomers(prev => ({
      ...prev,
      [customer]: !prev[customer]
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

  const groupSamplesByOrder = (samples) => {
    const grouped = samples.reduce((acc, sample) => {
      if (!acc[sample.orderId]) {
        acc[sample.orderId] = {
          orderId: sample.orderId,
          client: sample.client,
          samples: [],
          earliestDueDate: sample.dueDate,
          highestPriority: sample.priority,
          overallStatus: sample.status
        };
      }
      acc[sample.orderId].samples.push(sample);
      
      // Update order-level metadata
      if (new Date(sample.dueDate) < new Date(acc[sample.orderId].earliestDueDate)) {
        acc[sample.orderId].earliestDueDate = sample.dueDate;
      }
      if (sample.priority === 'rush') {
        acc[sample.orderId].highestPriority = 'rush';
      }
      
      return acc;
    }, {});
    
    return Object.values(grouped).sort((a, b) => {
      // Sort orders by same logic as samples
      const urgencyA = getDueDateUrgency(a.earliestDueDate);
      const urgencyB = getDueDateUrgency(b.earliestDueDate);
      
      if (urgencyA.label === 'OVERDUE' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'OVERDUE' && urgencyA.label !== 'OVERDUE') return 1;
      if (urgencyA.label === 'TODAY' && urgencyB.label !== 'TODAY' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'TODAY' && urgencyA.label !== 'TODAY' && urgencyA.label !== 'OVERDUE') return 1;
      
      if (a.highestPriority === 'rush' && b.highestPriority !== 'rush') return -1;
      if (b.highestPriority === 'rush' && a.highestPriority !== 'rush') return 1;
      
      return a.client.localeCompare(b.client);
    });
  };

  const renderSampleRow = (sample, isNested = false) => {
    const urgency = getDueDateUrgency(sample.dueDate);
    const indentClass = isNested ? 'ml-6 border-l-2 border-gray-200 pl-4' : '';
    const priorityColor = getPriorityColor(sample.priority);
    const priorityLabel = getPriorityLabel(sample.priority);
    
    return (
      <div key={sample.id} className={`hover:bg-gray-50 ${indentClass}`}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center space-x-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {sample.sampleName}
                  </p>
                  {priorityLabel && (
                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${priorityColor}`}>
                      {priorityLabel}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {sample.client} • {sample.orderId}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right min-w-0 flex-shrink-0">
              <p className={`text-sm ${urgency.color}`}>
                {urgency.label}
              </p>
              <p className="text-xs text-gray-500">
                Due: {sample.dueDate}
              </p>
            </div>
            
            <div className="text-center flex-shrink-0">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sample.status)}`}>
                {getStatusLabel(sample.status)}
              </span>
            </div>
            
            <div className="flex space-x-2 flex-shrink-0">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Timeline breakdown */}
        {!isNested && (
          <div className="px-4 pb-3">
            <div className="flex space-x-4 text-xs text-gray-500">
              <span>Prep Due: {sample.prepDue}</span>
              <span>Analysis Due: {sample.analysisDue}</span>
              <span>Reporting Due: {sample.reportingDue}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDPMCustomerRow = (customerData) => {
    const urgency = getDueDateUrgency(customerData.esDue);
    const isExpanded = expandedDPMCustomers[customerData.customer];
    const priorityColor = getPriorityColor(customerData.priority);
    const priorityLabel = getPriorityLabel(customerData.priority);
    
    return (
      <div key={customerData.customer}>
        <div className="hover:bg-gray-50">
          <div className="p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleDPMCustomerExpansion(customerData.customer)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-3 h-3" /> : 
                    <ChevronRight className="w-3 h-3" />
                  }
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {customerData.customer}
                      </p>
                      {priorityLabel && (
                        <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${priorityColor}`}>
                          {priorityLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{customerData.sampleCount} samples</span>
                    <span className={urgency.color}>ES Due: {customerData.esDue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50 border-t border-gray-100">
            <div className="px-6 py-2">
              <div className="text-xs text-gray-600 space-y-1">
                {customerData.orders.map(order => (
                  <div key={order.orderId} className="flex justify-between">
                    <span className="font-medium">{order.orderId}</span>
                    <span>{order.sampleCount} samples</span>
                  </div>
                ))}
              </div>
            </div>
            {customerData.samples.slice(0, 2).map(sample => (
              <div key={sample.id} className="px-6 py-1 text-xs text-gray-500 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="truncate">{sample.sampleName}</span>
                  <span>Micro: {sample.microbialTests.completed}/{sample.microbialTests.total}</span>
                </div>
              </div>
            ))}
            {customerData.samples.length > 2 && (
              <div className="px-6 py-1 text-xs text-gray-400 text-center border-t border-gray-100">
                +{customerData.samples.length - 2} more samples
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderOrderRow = (order) => {
    const urgency = getDueDateUrgency(order.earliestDueDate);
    const isExpanded = expandedOrders[order.orderId];
    const priorityColor = getPriorityColor(order.highestPriority);
    const priorityLabel = getPriorityLabel(order.highestPriority);
    
    // Check if all samples have the same due date
    const allDueDates = order.samples.map(sample => sample.dueDate);
    const uniqueDueDates = [...new Set(allDueDates)];
    const allSameSameDate = uniqueDueDates.length === 1;
    const dueDateLabel = allSameSameDate ? 'All Due:' : 'Earliest:';
    
    return (
      <div key={order.orderId}>
        <div className="hover:bg-gray-50">
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleOrderExpansion(order.orderId)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.orderId}
                    </p>
                    {priorityLabel && (
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${priorityColor}`}>
                        {priorityLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {order.client} • {order.samples.length} sample{order.samples.length !== 1 ? 's' : ''}
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
                  {dueDateLabel} {order.earliestDueDate}
                </p>
              </div>
              
              <div className="text-center">
                <Package className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50">
            {order.samples.map(sample => renderSampleRow(sample, true))}
          </div>
        )}
      </div>
    );
  };

  const getCurrentData = (assayType) => {
    const samples = mockSamples[assayType];
    if (viewMode === 'order') {
      return groupSamplesByOrder(samples);
    }
    return sortSamplesByPriority(samples);
  };

  const getCount = (assayType) => {
    if (viewMode === 'order') {
      return groupSamplesByOrder(mockSamples[assayType]).length;
    }
    return mockSamples[assayType].length;
  };

  const renderPipelineSection = (assayType, title, icon) => {
    const data = getCurrentData(assayType);
    const count = getCount(assayType);
    
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {React.createElement(icon, { className: "w-5 h-5 text-blue-600" })}
              <div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{count} {viewMode === 'order' ? 'orders' : 'samples'}</p>
              </div>
            </div>
            
            {/* View Mode Toggle - Order View first */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('order')}
                className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'order'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Package className="w-4 h-4 mr-1.5" />
                Order View
              </button>
              <button
                onClick={() => setViewMode('sample')}
                className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'sample'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4 mr-1.5" />
                Sample View
              </button>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="divide-y divide-gray-100">
          {viewMode === 'sample' ? (
            // In Sample View: show all samples individually without nesting
            sortSamplesByPriority(mockSamples[assayType]).map(sample => renderSampleRow(sample, false))
          ) : (
            // In Order View: show grouped by orders with nesting
            groupSamplesByOrder(mockSamples[assayType]).map(renderOrderRow)
          )}
          
          {mockSamples[assayType].length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Beaker className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No {viewMode === 'order' ? 'orders' : 'samples'} in queue for {title.toLowerCase()}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Calculate total potential samples across all DPM customers
  const totalDPMSamples = mockDPMByCustomer.reduce((sum, customer) => sum + customer.sampleCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>
              <p className="text-sm text-gray-600">Dr. Sarah Chen • {getCurrentDate()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {getCurrentTime()}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Today's Overview + DPM Early Start */}
          <div className="lg:col-span-3 space-y-6">
            {/* Today's Overview */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Today's Overview</h3>
              </div>
              
              <div className="p-4 space-y-3">
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
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential DPM</span>
                    <span className="text-lg font-semibold text-purple-600">{totalDPMSamples}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DPM Early Start Pipeline - Customer Grouped */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <FlaskConical className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">DPM Early Start</h3>
                      <p className="text-sm text-gray-600">{mockDPMByCustomer.length} customers • {totalDPMSamples} potential samples</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {mockDPMByCustomer.map(renderDPMCustomerRow)}
                
                {mockDPMByCustomer.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <FlaskConical className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No DPM Early Start samples</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pipeline Sections - Main Area */}
          <div className="lg:col-span-6 space-y-6">
            {renderPipelineSection('cannabinoids', 'Cannabinoids Pipeline', Beaker)}
            {renderPipelineSection('terpenes', 'Terpenes Pipeline', Beaker)}
            {renderPipelineSection('pesticides', 'Pesticides/Mycotoxins Pipeline', Beaker)}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Primary Review Batches */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Primary Review Batches</h3>
                <p className="text-sm text-gray-600">Ready for your review</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {mockPrimaryBatches.map((batch) => (
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

            {/* Secondary Review Batches */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Secondary Review Batches</h3>
                <p className="text-sm text-gray-600">Awaiting secondary review</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {mockSecondaryBatches.map((batch) => (
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
                      <p>Primary: {batch.primaryReviewer}</p>
                      <p>Analysis: {batch.analysisDate}</p>
                    </div>
                    
                    {expandedBatches[batch.id] && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-orange-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-orange-700">
                            Secondary Review
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