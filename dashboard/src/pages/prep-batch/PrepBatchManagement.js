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

  // Initialize mock data on component mount
  React.useEffect(() => {
    // Mock data for available samples (ready for prep)
    const initialAvailableSamples = [
    {
      id: 'S001',
      orderId: 'ORD-2024-1156',
      client: 'Green Valley Farms',
      sampleName: 'GVF-Indica-Batch-45A',
      receivedOn: '2025-01-02',
      priority: 'rush',
      tests: ['Cannabinoids'],
      dueDate: '2025-01-06',
      checkedOut: false,
      checkedOutBy: null,
      checkedOutAt: null
    },
    {
      id: 'S002',
      orderId: 'ORD-2024-1156',
      client: 'Green Valley Farms',
      sampleName: 'GVF-Indica-Batch-45B',
      receivedOn: '2025-01-02',
      priority: 'rush',
      tests: ['Cannabinoids'],
      dueDate: '2025-01-06'
    },
    {
      id: 'S003',
      orderId: 'ORD-2024-1156',
      client: 'Green Valley Farms',
      sampleName: 'GVF-Indica-Batch-45C',
      receivedOn: '2025-01-02',
      priority: 'rush',
      tests: ['Cannabinoids'],
      dueDate: '2025-01-06'
    },
    {
      id: 'S010',
      orderId: 'ORD-2024-1159',
      client: 'Sunset Gardens',
      sampleName: 'SG-OG-Kush-22',
      receivedOn: '2025-01-05',
      priority: 'standard',
      tests: ['Cannabinoids'],
      dueDate: '2025-01-08'
    },
    {
      id: 'S011',
      orderId: 'ORD-2024-1160',
      client: 'Pacific Herbs Co',
      sampleName: 'PHC-Blue-Dream-88',
      receivedOn: '2025-01-05',
      priority: 'standard',
      tests: ['Cannabinoids'],
      dueDate: '2025-01-09'
    }
  ];

    // Mock data for active prep batches
    const initialActivePrepBatches = [
    {
      id: 'PB-2025-001',
      analyst: 'Dr. Emily Chen',
      createdAt: '2025-01-06 08:30',
      sop: 'SOP-CANN-PREP-v3.2',
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
      id: 'PB-2025-002',
      analyst: 'James Rodriguez',
      createdAt: '2025-01-06 09:15',
      sop: 'SOP-CANN-PREP-v3.2',
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
    }
  ];

    setAvailableSamplesState(initialAvailableSamples);
    setActivePrepBatchesState(initialActivePrepBatches);
  }, []);

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
        tests: ['Cannabinoids'],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
    // In production, this would create an analysis batch with selected prep batches
    console.log('Creating analysis batch with prep batches:', selectedPrepBatches);
    // For now, just clear selection
    setSelectedPrepBatches([]);
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
    
    const newBatch = {
      id: `PB-2025-${String(activePrepBatchesState.length + 1).padStart(3, '0')}`,
      analyst: currentUser,
      createdAt: new Date().toLocaleString(),
      sop: sopForPipeline,
      status: 'open',
      samples: samplesToAdd,
      equipment: []
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
      case 'pesticides': return 'Pesticides/Mycotoxins';
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
                  {getAssayTitle()} Prep Batch Management
                </h1>
                <p className="text-sm text-gray-600">
                  Create and manage preparation batches for {getAssayTitle().toLowerCase()} analysis
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
                            Received: {new Date(sample.receivedOn).toLocaleDateString()}
                          </span>
                          {sample.priority === 'rush' && (
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200">
                              RUSH
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
                            {batch.analyst} • {batch.createdAt}
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
                                handleReturnSamples(batch.id);
                              }}
                              disabled={!selectedBatchSamples[batch.id] || selectedBatchSamples[batch.id].length === 0}
                              className={`px-2 py-1 text-xs rounded ${
                                selectedBatchSamples[batch.id] && selectedBatchSamples[batch.id].length > 0
                                  ? 'bg-orange-600 text-white hover:bg-orange-700'
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
                      disabled={selectedPrepBatches.length === 0}
                      className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        selectedPrepBatches.length > 0
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
                          onChange={() => {}}
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
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                Return Samples
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepBatchManagement;