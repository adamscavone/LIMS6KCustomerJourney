import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Package, Users, Calendar, AlertCircle, Plus, ChevronDown, ChevronRight, FlaskConical, Clipboard, Lock, Unlock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PrepBatchManagement = () => {
  const navigate = useNavigate();
  const { assayType } = useParams();
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [expandedBatches, setExpandedBatches] = useState({});
  const [showAddToBatchModal, setShowAddToBatchModal] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [availableSamplesState, setAvailableSamplesState] = useState([]);
  const [activePrepBatchesState, setActivePrepBatchesState] = useState([]);
  const [selectedBatchSamples, setSelectedBatchSamples] = useState({}); // {batchId: [sampleIds]}
  const [showReturnSamplesModal, setShowReturnSamplesModal] = useState(false);
  const [returningFromBatch, setReturningFromBatch] = useState(null);
  const [selectedPrepBatches, setSelectedPrepBatches] = useState([]); // For analysis batch creation
  const [analysisBatches, setAnalysisBatches] = useState([]); // Mock analysis batches
  const [showAddToAnalysisBatchModal, setShowAddToAnalysisBatchModal] = useState(false);
  const [selectedAnalysisBatchId, setSelectedAnalysisBatchId] = useState('');

  // Initialize mock data on component mount
  React.useEffect(() => {
    // Mock data for available samples (ready for prep)
    const initialAvailableSamples = [
    {
      id: 'S001',
      orderId: 'ORD-2025-14872',
      ccId: '.14872',
      limsId: '171747',
      packageId: '1A4070300005C31000012260',
      client: 'King City Gardens',
      sampleName: 'Cookie Kush Big Buds',
      strain: 'Cookie Kush',
      productCategory: 'Bulk Flower/Buds',
      receivedOn: '2025-01-02',
      priority: 'rush',
      testCategories: ['TERPS', 'DPM'],  // Test categories determine required assays
      tests: ['Cannabinoids', 'Terpenes'],
      coaDueDate: '2025-01-06',
      shippedQty: 28.62,
      checkedOut: false,
      checkedOutBy: null,
      checkedOutAt: null
    },
    {
      id: 'S002',
      orderId: 'ORD-2025-14873',
      ccId: '.14873',
      limsId: '171748',
      packageId: '1A4070300005C31000012261',
      client: 'King City Gardens',
      sampleName: 'Cookie Kush Small Buds',
      strain: 'Cookie Kush',
      productCategory: 'Bulk Flower/Buds',
      receivedOn: '2025-01-02',
      priority: 'rush',
      testCategories: ['TERPS', 'DPM'],  // Test categories determine required assays
      tests: ['Cannabinoids', 'Terpenes'],
      coaDueDate: '2025-01-06',
      shippedQty: 27.79
    },
    {
      id: 'S003',
      orderId: 'ORD-2025-14874',
      ccId: '.14874',
      limsId: '171749',
      packageId: '1A4070300005C31000012262',
      client: 'King City Gardens',
      sampleName: 'Slurri Crasher Small Buds',
      strain: 'Slurri Crasher',
      productCategory: 'Bulk Flower/Buds',
      receivedOn: '2025-01-02',
      priority: 'rush',
      testCategories: ['TERPS', 'DPM'],  // Test categories determine required assays
      tests: ['Cannabinoids', 'Terpenes'],
      coaDueDate: '2025-01-06',
      shippedQty: 6.0
    },
    {
      id: 'S010',
      orderId: 'ORD-2025-15009',
      ccId: '.15009',
      limsId: '171884',
      packageId: '1A4070300002D51000001706',
      client: 'Sun Theory Ohio',
      sampleName: 'Bulk Sativa Rosin',
      strain: '',
      productCategory: 'Bulk Concentrate',
      receivedOn: '2025-01-05',
      priority: 'standard',
      testCategories: ['TERPS', 'NSPNPT'],  // Test categories determine required assays
      tests: ['Terpenes'],  // NSPNPT requires different assays
      coaDueDate: '2025-01-08',
      shippedQty: 4.2,
      notes: 'Blind Duplicate Concentrate'
    },
    {
      id: 'S011',
      orderId: 'ORD-2025-16853',
      ccId: '.16853',
      limsId: '173630',
      packageId: '1A4070300005C31000012365',
      client: 'King City Gardens',
      sampleName: 'Orange Sherb Small Buds',
      strain: 'Orange Sherb',
      productCategory: 'Bulk Flower/Buds',
      receivedOn: '2025-01-05',
      priority: 'standard',
      testCategories: ['TERPS', 'DPM'],  // Test categories determine required assays
      tests: ['Cannabinoids', 'Terpenes'],
      coaDueDate: '2025-01-09',
      shippedQty: 20.11
    }
  ];

    // Mock data for active prep batches
    const assayPrefixMap = {
      'cannabinoids': 'CAN',
      'terpenes': 'TERP',
      'pesticides': 'PEST'
    };
    const assayPrefix = assayPrefixMap[assayType] || 'CAN';
    
    const initialActivePrepBatches = assayType === 'cannabinoids' ? [
    {
      id: 'PB-CAN-2025-0001',
      analyst: 'Dr. Emily Chen',
      createdAt: '2025-01-06 08:30',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'open',
      samples: [
        {
          id: 'S004',
          sampleName: 'MPC-Sativa-Mix-12',
          client: 'Mountain Peak Cannabis'
        },
        {
          id: 'S005',
          sampleName: 'MPC-Sativa-Mix-13',
          client: 'Mountain Peak Cannabis'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0123', calibrationDue: '2025-02-15' },
        { type: 'Bottle-top Dispenser', id: 'BTD-0456', calibrationDue: '2025-03-01' }
      ]
    },
    {
      id: 'PB-CAN-2025-0002',
      analyst: 'James Rodriguez',
      createdAt: '2025-01-06 09:15',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'ready_for_analysis',
      samples: [
        {
          id: 'S007',
          sampleName: 'MPC-Hybrid-01',
          client: 'Mountain Peak Cannabis'
        },
        {
          id: 'S008',
          sampleName: 'CG-Purple-Haze-33',
          client: 'Crystal Gardens'
        },
        {
          id: 'S009',
          sampleName: 'OL-Diesel-44',
          client: 'Organic Labs'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0124', calibrationDue: '2025-02-15' },
        { type: 'Autopipette', id: 'AP-0789', calibrationDue: '2025-01-20' },
        { type: 'Vortex Mixer', id: 'VM-0111', calibrationDue: '2025-04-01' }
      ]
    },
    // Additional In Prep batches
    {
      id: 'PB-CAN-2025-0003',
      analyst: 'Dr. Lisa Park',
      createdAt: '2025-01-06 10:30',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'open',
      samples: [
        {
          id: 'S010',
          sampleName: 'BG-OG-Kush-15',
          client: 'Botanical Gardens'
        },
        {
          id: 'S011',
          sampleName: 'BG-Sour-Diesel-16',
          client: 'Botanical Gardens'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0125', calibrationDue: '2025-02-15' },
        { type: 'Bottle-top Dispenser', id: 'BTD-0457', calibrationDue: '2025-03-01' }
      ]
    },
    {
      id: 'PB-CAN-2025-0004',
      analyst: 'Tech Johnson',
      createdAt: '2025-01-06 11:00',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'open',
      samples: [
        {
          id: 'S012',
          sampleName: 'HL-Blue-Dream-88',
          client: 'Harvest Labs'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0126', calibrationDue: '2025-02-15' }
      ]
    },
    {
      id: 'PB-CAN-2025-0005',
      analyst: 'Dr. Mike Chen',
      createdAt: '2025-01-06 11:30',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'open',
      samples: [
        {
          id: 'S013',
          sampleName: 'NC-Northern-Lights-22',
          client: 'Natural Cultivars'
        },
        {
          id: 'S014',
          sampleName: 'NC-Jack-Herer-23',
          client: 'Natural Cultivars'
        },
        {
          id: 'S015',
          sampleName: 'NC-Girl-Scout-24',
          client: 'Natural Cultivars'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0127', calibrationDue: '2025-02-15' },
        { type: 'Bottle-top Dispenser', id: 'BTD-0458', calibrationDue: '2025-03-01' },
        { type: 'Vortex Mixer', id: 'VM-0112', calibrationDue: '2025-04-01' }
      ]
    },
    // Additional Ready for Analysis batches
    {
      id: 'PB-CAN-2025-0006',
      analyst: 'Dr. Emily Watson',
      createdAt: '2025-01-06 08:00',
      completedAt: '2025-01-06 10:30',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'ready_for_analysis',
      samples: [
        {
          id: 'S016',
          sampleName: 'PG-Pineapple-Express-11',
          client: 'Premium Gardens'
        },
        {
          id: 'S017',
          sampleName: 'PG-White-Widow-12',
          client: 'Premium Gardens'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0128', calibrationDue: '2025-02-15' },
        { type: 'Autopipette', id: 'AP-0790', calibrationDue: '2025-01-20' }
      ]
    },
    {
      id: 'PB-CAN-2025-0007',
      analyst: 'Tech Williams',
      createdAt: '2025-01-06 07:30',
      completedAt: '2025-01-06 09:45',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'ready_for_analysis',
      samples: [
        {
          id: 'S018',
          sampleName: 'EF-Strawberry-Cough-55',
          client: 'Emerald Fields'
        },
        {
          id: 'S019',
          sampleName: 'EF-Lemon-Haze-56',
          client: 'Emerald Fields'
        },
        {
          id: 'S020',
          sampleName: 'EF-Granddaddy-Purple-57',
          client: 'Emerald Fields'
        },
        {
          id: 'S021',
          sampleName: 'EF-AK-47-58',
          client: 'Emerald Fields'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0129', calibrationDue: '2025-02-15' },
        { type: 'Bottle-top Dispenser', id: 'BTD-0459', calibrationDue: '2025-03-01' }
      ]
    },
    {
      id: 'PB-CAN-2025-0008',
      analyst: 'Dr. Alex Thompson',
      createdAt: '2025-01-06 06:00',
      completedAt: '2025-01-06 08:30',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      status: 'ready_for_analysis',
      samples: [
        {
          id: 'S022',
          sampleName: 'SH-Super-Silver-Haze-99',
          client: 'Summit Heights'
        }
      ],
      equipment: [
        { type: 'Analytical Balance', id: 'AB-0130', calibrationDue: '2025-02-15' }
      ]
    }
  ] : assayType === 'terpenes' ? [] : []; // Empty arrays for other assay types

  // Mock analysis batches
  const initialAnalysisBatches = [
    {
      id: 'AB-CB-240106-001',
      status: 'in_progress',
      createdAt: '2025-01-06 12:00',
      instrument: 'LC-MS/MS-01',
      totalSamples: 8,
      prepBatchIds: ['PB-CAN-2025-0009', 'PB-CAN-2025-0010']
    },
    {
      id: 'AB-CB-240106-002',
      status: 'queued',
      createdAt: '2025-01-06 11:45',
      instrument: 'LC-MS/MS-02',
      totalSamples: 12,
      prepBatchIds: ['PB-CAN-2025-0011', 'PB-CAN-2025-0012', 'PB-CAN-2025-0013']
    }
  ];

    setAvailableSamplesState(initialAvailableSamples);
    setActivePrepBatchesState(initialActivePrepBatches);
    setAnalysisBatches(initialAnalysisBatches);
  }, [assayType]);

  const toggleBatchExpansion = (batchId) => {
    setExpandedBatches(prev => ({
      ...prev,
      [batchId]: !prev[batchId]
    }));
  };

  const handleBatchSampleSelection = (batchId, sampleId) => {
    setSelectedBatchSamples(prev => {
      const currentSelected = prev[batchId] || [];
      if (currentSelected.includes(sampleId)) {
        return {
          ...prev,
          [batchId]: currentSelected.filter(id => id !== sampleId)
        };
      }
      return {
        ...prev,
        [batchId]: [...currentSelected, sampleId]
      };
    });
  };

  const handleReturnSamples = (batchId) => {
    setReturningFromBatch(batchId);
    setShowReturnSamplesModal(true);
  };

  const confirmReturnSamples = () => {
    const selectedSampleIds = selectedBatchSamples[returningFromBatch] || [];
    
    // Find the batch and get the samples to return
    const batch = activePrepBatchesState.find(b => b.id === returningFromBatch);
    const samplesToReturn = batch.samples.filter(s => selectedSampleIds.includes(s.id));
    
    // Add samples back to available pool
    const returnedSamples = samplesToReturn.map(s => {
      const originalSample = {
        id: s.id,
        orderId: 'ORD-RETURNED',
        client: s.client,
        sampleName: s.sampleName,
        receivedOn: new Date().toISOString().split('T')[0],
        priority: 'standard',
        testCategories: ['DPM'],  // Test categories determine required assays
        tests: ['Cannabinoids'],
        coaDueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        checkedOut: false,
        checkedOutBy: null,
        checkedOutAt: null
      };
      return originalSample;
    });
    
    setAvailableSamplesState(prev => [...prev, ...returnedSamples]);
    
    // Update the batch to remove returned samples
    setActivePrepBatchesState(prev => 
      prev.map(batch => {
        if (batch.id === returningFromBatch) {
          return {
            ...batch,
            samples: batch.samples.filter(s => !selectedSampleIds.includes(s.id))
          };
        }
        return batch;
      })
    );
    
    // Clear selections
    setSelectedBatchSamples(prev => ({
      ...prev,
      [returningFromBatch]: []
    }));
    
    setShowReturnSamplesModal(false);
    setReturningFromBatch(null);
  };

  const handleMarkReady = (batchId) => {
    setActivePrepBatchesState(prev => 
      prev.map(batch => {
        if (batch.id === batchId) {
          return {
            ...batch,
            status: 'ready_for_analysis',
            completedAt: new Date().toLocaleString()
          };
        }
        return batch;
      })
    );
    
    // Clear any selections for this batch
    setSelectedBatchSamples(prev => ({
      ...prev,
      [batchId]: []
    }));
  };

  const handlePrepBatchSelection = (batchId) => {
    setSelectedPrepBatches(prev => {
      if (prev.includes(batchId)) {
        return prev.filter(id => id !== batchId);
      }
      return [...prev, batchId];
    });
  };

  const handleCreateAnalysisBatch = () => {
    // Get all samples from selected prep batches
    const selectedBatches = activePrepBatchesState.filter(b => 
      selectedPrepBatches.includes(b.id) && b.status === 'ready_for_analysis'
    );
    
    const allSamples = selectedBatches.flatMap(batch => batch.samples);
    
    // Create new analysis batch
    const newAnalysisBatch = {
      id: `AB-${assayType.toUpperCase()}-${new Date().toISOString().split('T')[0]}-${String(analysisBatches.length + 1).padStart(3, '0')}`,
      type: assayType,
      status: 'created',
      createdAt: new Date().toLocaleString(),
      prepBatches: selectedBatches.map(b => ({
        id: b.id,
        sampleCount: b.samples.length,
        prepAnalyst: b.analyst,
        samples: b.samples.map(s => s.id)
      })),
      totalSamples: allSamples.length,
      instrument: null,
      queuePosition: null,
      prepBatchIds: selectedPrepBatches
    };
    
    // Add to analysis batches
    setAnalysisBatches(prev => [...prev, newAnalysisBatch]);
    
    // Remove selected batches from pending analysis
    setActivePrepBatchesState(prev => 
      prev.filter(batch => !selectedPrepBatches.includes(batch.id))
    );
    
    // Clear selection
    setSelectedPrepBatches([]);
    
    // Don't navigate away - analysis batch is now shown in the section below
    // navigate(`/analysis-batch/${assayType}/${newAnalysisBatch.id}`);
  };

  const handleSampleSelection = (sampleId, event, sampleIndex) => {
    if (event.shiftKey && lastSelectedIndex !== null) {
      // Shift+click: select range
      const start = Math.min(lastSelectedIndex, sampleIndex);
      const end = Math.max(lastSelectedIndex, sampleIndex);
      const rangeIds = availableSamplesState.slice(start, end + 1).map(s => s.id);
      
      setSelectedSamples(prev => {
        const newSelection = new Set(prev);
        rangeIds.forEach(id => newSelection.add(id));
        return Array.from(newSelection);
      });
    } else if (event.ctrlKey || event.metaKey) {
      // Ctrl+click: toggle individual selection
      setSelectedSamples(prev => {
        if (prev.includes(sampleId)) {
          return prev.filter(id => id !== sampleId);
        }
        return [...prev, sampleId];
      });
      setLastSelectedIndex(sampleIndex);
    } else {
      // Regular click: select only this item
      setSelectedSamples([sampleId]);
      setLastSelectedIndex(sampleIndex);
    }
  };

  const handleCreateBatch = () => {
    // Get selected sample details
    const samplesToAdd = availableSamplesState
      .filter(s => selectedSamples.includes(s.id))
      .map(s => ({
        id: s.id,
        sampleName: s.sampleName,
        client: s.client
      }));

    // Create new batch with current user as analyst
    // In production, this would get the actual logged-in user
    const currentUser = "Dr. Sarah Chen"; // Mock logged-in user
    const sopForPipeline = `SOP-${assayType.toUpperCase()}-PREP-v3.2`; // Pipeline-specific SOP
    
    // Generate batch ID with assay type prefix
    const assayPrefixMap = {
      'cannabinoids': 'CAN',
      'terpenes': 'TERP',
      'pesticides': 'PEST'
    };
    const assayPrefix = assayPrefixMap[assayType] || 'CAN';
    const batchNumber = String(activePrepBatchesState.length + 1).padStart(4, '0');
    const batchId = `PB-${assayPrefix}-2025-${batchNumber}`;

    const newBatch = {
      id: batchId,
      analyst: currentUser,
      createdAt: new Date().toLocaleString(),
      sop: sopForPipeline,
      status: 'open',
      samples: samplesToAdd,
      equipment: [
        { type: 'Balance', id: 'BAL-001', calibrationDue: '2025-02-01' },
        { type: 'Pipette', id: 'PIP-002', calibrationDue: '2025-01-15' },
        { type: 'Sonicator', id: 'SON-001', calibrationDue: '2025-03-01' }
      ]
    };

    // Add new batch to state
    setActivePrepBatchesState(prev => [...prev, newBatch]);

    // Remove added samples from available list
    setAvailableSamplesState(prev => 
      prev.filter(s => !selectedSamples.includes(s.id))
    );

    // Expand the new batch
    setExpandedBatches(prev => ({ ...prev, [newBatch.id]: true }));

    // Reset selection
    setSelectedSamples([]);
  };

  const getAssayTitle = () => {
    switch(assayType) {
      case 'cannabinoids': return 'Cannabinoids';
      case 'terpenes': return 'Terpenes';
      case 'pesticides': return 'Pesticides';
      default: return 'Unknown Assay';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {getAssayTitle()} Batch Management
                </h1>
                <p className="text-sm text-gray-600">
                  Create and manage preparation batches for analysis
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateBatch}
                disabled={selectedSamples.length === 0}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSamples.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Batch
              </button>
              <button
                onClick={() => setShowAddToBatchModal(true)}
                disabled={selectedSamples.length === 0 || activePrepBatchesState.filter(b => b.status === 'open').length === 0}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSamples.length > 0 && activePrepBatchesState.filter(b => b.status === 'open').length > 0
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Existing Batch
              </button>
              {selectedSamples.length > 0 && (
                <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                  {selectedSamples.length} selected
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Available Samples Section */}
          <div className="col-span-5">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-orange-600" />
                  Available Samples
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Samples awaiting preparation • Use Ctrl+Click or Shift+Click for multi-select
                </p>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {availableSamplesState.map((sample, index) => (
                  <div
                    key={sample.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedSamples.includes(sample.id) ? 'bg-blue-50' : ''
                    } ${sample.checkedOut ? 'opacity-60' : ''}`}
                    onClick={(e) => !sample.checkedOut && handleSampleSelection(sample.id, e, index)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedSamples.includes(sample.id)}
                        onChange={() => {}}
                        disabled={sample.checkedOut}
                        className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 disabled:opacity-50"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {sample.sampleName}
                          </p>
                          {sample.checkedOut && (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                              <Lock className="w-3 h-3 mr-1" />
                              Checked Out
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {sample.client} • Order: {sample.orderId}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            Received: {new Date(sample.receivedOn).toLocaleDateString()} • Due: {new Date(sample.coaDueDate).toLocaleDateString()}
                          </span>
                          {sample.priority === 'rush' && (
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200">
                              RUSH
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {sample.testCategories ? sample.testCategories.join(', ') : sample.tests.join(', ')}
                          </span>
                          {sample.shippedQty && (
                            <span className="text-xs text-gray-500">
                              {sample.shippedQty}g
                            </span>
                          )}
                          {sample.checkedOut && (
                            <span className="text-xs text-gray-500">
                              By: {sample.checkedOutBy}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* In Prep and Pending Analysis Sections */}
          <div className="col-span-7 space-y-6">
            {/* In Prep Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                  In Prep
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Batches currently being prepared
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {activePrepBatchesState.filter(b => b.status === 'open').map(batch => (
                  <div key={batch.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleBatchExpansion(batch.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {expandedBatches[batch.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {batch.id}
                          </p>
                          <p className="text-xs text-gray-600">
                            Created: {batch.createdAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          batch.status === 'open' 
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {batch.status === 'open' ? (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Open - In Progress
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ready for Analysis (Locked)
                            </>
                          )}
                        </span>
                        <span className="text-sm text-gray-600">
                          {batch.samples.length} samples
                        </span>
                        {batch.status === 'open' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/bench-sheet/${batch.id}`);
                              }}
                              className="px-2 py-1 text-xs rounded bg-purple-600 text-white hover:bg-purple-700 flex items-center space-x-1"
                              title="Create or edit bench sheet for this batch"
                            >
                              <Clipboard className="w-3 h-3" />
                              <span>Bench Sheet</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReturnSamples(batch.id);
                              }}
                              disabled={!selectedBatchSamples[batch.id] || selectedBatchSamples[batch.id].length === 0}
                              className={`px-2 py-1 text-xs rounded ${
                                selectedBatchSamples[batch.id] && selectedBatchSamples[batch.id].length > 0
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                              title="Return selected samples to available pool"
                            >
                              Return Samples ({selectedBatchSamples[batch.id]?.length || 0})
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkReady(batch.id);
                              }}
                              disabled={selectedBatchSamples[batch.id] && selectedBatchSamples[batch.id].length > 0}
                              className={`px-2 py-1 text-xs rounded ${
                                selectedBatchSamples[batch.id] && selectedBatchSamples[batch.id].length > 0
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                              title={
                                selectedBatchSamples[batch.id] && selectedBatchSamples[batch.id].length > 0
                                  ? 'Deselect all samples to mark batch ready'
                                  : 'Mark all remaining samples as ready for analysis'
                              }
                            >
                              Mark Ready
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {expandedBatches[batch.id] && (
                      <div className="mt-4 space-y-4 pl-8">
                        {/* Prepared By */}
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Prepared By:</span> {batch.analyst}
                          </p>
                        </div>

                        {/* SOP Information */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                            Standard Operating Procedure
                          </h4>
                          <p className="text-sm text-gray-600">{batch.sop}</p>
                        </div>

                        {/* Equipment List */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                            Equipment Used
                          </h4>
                          <div className="space-y-1">
                            {batch.equipment.map((eq, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  {eq.type} ({eq.id})
                                </span>
                                <span className="text-xs text-gray-500">
                                  Cal. due: {new Date(eq.calibrationDue).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sample List */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                            Samples in Batch (click to select for return)
                          </h4>
                          <div className="space-y-2">
                            {batch.samples.map(sample => (
                              <div 
                                key={sample.id} 
                                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                                  selectedBatchSamples[batch.id]?.includes(sample.id)
                                    ? 'bg-blue-50 border border-blue-300'
                                    : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                                onClick={() => handleBatchSampleSelection(batch.id, sample.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    checked={selectedBatchSamples[batch.id]?.includes(sample.id) || false}
                                    onChange={() => {}}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {sample.sampleName}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {sample.client}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {activePrepBatchesState.filter(b => b.status === 'open').length === 0 && (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    No batches currently in preparation
                  </p>
                )}
              </div>
            </div>

            {/* Pending Analysis Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-600" />
                      Pending Analysis
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Prep complete, ready for instrumental analysis
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCreateAnalysisBatch}
                      disabled={selectedPrepBatches.length === 0}
                      className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        selectedPrepBatches.length > 0
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Create Analysis Batch
                    </button>
                    <button
                      onClick={() => setShowAddToAnalysisBatchModal(true)}
                      disabled={selectedPrepBatches.length === 0 || analysisBatches.filter(b => b.status !== 'completed').length === 0}
                      className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        selectedPrepBatches.length > 0 && analysisBatches.filter(b => b.status !== 'completed').length > 0
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Add to Existing
                    </button>
                    {selectedPrepBatches.length > 0 && (
                      <span className="flex items-center px-2 py-1.5 text-sm text-gray-600">
                        {selectedPrepBatches.length} selected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {activePrepBatchesState.filter(b => b.status === 'ready_for_analysis').map(batch => (
                  <div 
                    key={batch.id} 
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedPrepBatches.includes(batch.id) 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handlePrepBatchSelection(batch.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedPrepBatches.includes(batch.id)}
                          onChange={() => handlePrepBatchSelection(batch.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBatchExpansion(batch.id);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {expandedBatches[batch.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {batch.id}
                          </p>
                          <p className="text-xs text-gray-600">
                            {batch.analyst} • Completed: {batch.completedAt || batch.createdAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ready for Analysis
                        </span>
                        <span className="text-sm text-gray-600">
                          {batch.samples.length} samples
                        </span>
                      </div>
                    </div>

                    {expandedBatches[batch.id] && (
                      <div className="mt-4 space-y-4 pl-8">
                        {/* SOP Information */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                            Standard Operating Procedure
                          </h4>
                          <p className="text-sm text-gray-600">{batch.sop}</p>
                        </div>

                        {/* Equipment List */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                            Equipment Used
                          </h4>
                          <div className="space-y-1">
                            {batch.equipment.map((eq, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  {eq.type} ({eq.id})
                                </span>
                                <span className="text-xs text-gray-500">
                                  Cal. due: {new Date(eq.calibrationDue).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sample List */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                            Samples in Batch
                          </h4>
                          <div className="space-y-2">
                            {batch.samples.map(sample => (
                              <div key={sample.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {sample.sampleName}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {sample.client}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {activePrepBatchesState.filter(b => b.status === 'ready_for_analysis').length === 0 && (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    No batches pending analysis
                  </p>
                )}
              </div>
            </div>

            {/* Analysis Batches Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Analysis Batches
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Active analysis batches on instruments
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {analysisBatches.length > 0 ? (
                  analysisBatches.map(batch => (
                    <div key={batch.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {batch.id}
                          </p>
                          <p className="text-xs text-gray-600">
                            Instrument: {batch.instrument} • Created: {batch.createdAt}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            batch.status === 'in_progress' 
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : batch.status === 'completed'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}>
                            {batch.status === 'in_progress' ? 'In Progress' : 
                             batch.status === 'completed' ? 'Completed' : 'Queued'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {batch.totalSamples} samples
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Prep batches: {batch.prepBatchIds.join(', ')}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    No active analysis batches
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Existing Batch Modal */}
      {showAddToBatchModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Add Samples to Existing Batch
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Select an open batch to add {selectedSamples.length} samples
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activePrepBatchesState.filter(b => b.status === 'open').map(batch => (
                  <div
                    key={batch.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedBatchId === batch.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedBatchId(batch.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{batch.id}</p>
                        <p className="text-sm text-gray-600">
                          {batch.analyst} • {batch.sop}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Current samples: {batch.samples.length} • Created: {batch.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedBatchId === batch.id}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {activePrepBatchesState.filter(b => b.status === 'open').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">
                  No open batches available. All existing batches are ready for analysis.
                </p>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddToBatchModal(false);
                  setSelectedBatchId('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Get selected sample details
                  const samplesToAdd = availableSamplesState
                    .filter(s => selectedSamples.includes(s.id))
                    .map(s => ({
                      id: s.id,
                      sampleName: s.sampleName,
                      client: s.client
                    }));

                  // Update the batch with new samples
                  setActivePrepBatchesState(prev => 
                    prev.map(batch => {
                      if (batch.id === selectedBatchId) {
                        return {
                          ...batch,
                          samples: [...batch.samples, ...samplesToAdd]
                        };
                      }
                      return batch;
                    })
                  );

                  // Remove added samples from available list
                  setAvailableSamplesState(prev => 
                    prev.filter(s => !selectedSamples.includes(s.id))
                  );

                  // Expand the batch that was just updated
                  setExpandedBatches(prev => ({ ...prev, [selectedBatchId]: true }));

                  setShowAddToBatchModal(false);
                  setSelectedBatchId('');
                  setSelectedSamples([]);
                }}
                disabled={!selectedBatchId}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedBatchId
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Batch
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Return Samples Modal */}
      {showReturnSamplesModal && returningFromBatch && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Return Samples
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Return {selectedBatchSamples[returningFromBatch]?.length || 0} selected samples to available pool?
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  This action will:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Remove selected samples from batch {returningFromBatch}</li>
                  <li>Return them to the Available Samples pool</li>
                  <li>Allow other analysts to check them out</li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReturnSamplesModal(false);
                  setReturningFromBatch(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReturnSamples}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Return Samples
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Existing Analysis Batch Modal */}
      {showAddToAnalysisBatchModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Add Prep Batches to Existing Analysis Batch
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Select an analysis batch to add {selectedPrepBatches.length} prep batch{selectedPrepBatches.length > 1 ? 'es' : ''}
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analysisBatches.filter(b => b.status !== 'completed').map(batch => (
                  <div
                    key={batch.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnalysisBatchId === batch.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedAnalysisBatchId(batch.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{batch.id}</p>
                        <p className="text-sm text-gray-600">
                          Status: {batch.status} • Instrument: {batch.instrument || 'Not assigned'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Current samples: {batch.totalSamples} • Created: {batch.createdAt}
                        </p>
                        <p className="text-xs text-gray-500">
                          Prep batches: {batch.prepBatchIds.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedAnalysisBatchId === batch.id}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {analysisBatches.filter(b => b.status !== 'completed').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">
                  No active analysis batches available. All existing batches are completed.
                </p>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddToAnalysisBatchModal(false);
                  setSelectedAnalysisBatchId('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add selected prep batches to the analysis batch
                  const selectedBatches = activePrepBatchesState.filter(b => 
                    selectedPrepBatches.includes(b.id) && b.status === 'ready_for_analysis'
                  );
                  
                  const totalNewSamples = selectedBatches.reduce((sum, batch) => sum + batch.samples.length, 0);
                  
                  // Update the analysis batch
                  setAnalysisBatches(prev => 
                    prev.map(batch => {
                      if (batch.id === selectedAnalysisBatchId) {
                        return {
                          ...batch,
                          prepBatchIds: [...batch.prepBatchIds, ...selectedPrepBatches],
                          totalSamples: batch.totalSamples + totalNewSamples
                        };
                      }
                      return batch;
                    })
                  );
                  
                  // Remove selected batches from pending analysis
                  setActivePrepBatchesState(prev => 
                    prev.filter(batch => !selectedPrepBatches.includes(batch.id))
                  );
                  
                  // Clear selections
                  setSelectedPrepBatches([]);
                  setShowAddToAnalysisBatchModal(false);
                  setSelectedAnalysisBatchId('');
                }}
                disabled={!selectedAnalysisBatchId}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedAnalysisBatchId
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Analysis Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepBatchManagement;