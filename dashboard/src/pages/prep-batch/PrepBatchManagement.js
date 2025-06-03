import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Package, Users, Calendar, AlertCircle, Plus, ChevronDown, ChevronRight, FlaskConical, Clipboard, Lock, Unlock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PrepBatchManagement = () => {
  const navigate = useNavigate();
  const { assayType } = useParams();
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [expandedBatches, setExpandedBatches] = useState({});
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [showAddToBatchModal, setShowAddToBatchModal] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [batchDetails, setBatchDetails] = useState({
    analyst: '',
    sop: '',
    equipment: []
  });

  // Mock data for available samples (ready for prep)
  const availableSamples = [
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
  const activePrepBatches = [
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

  const toggleBatchExpansion = (batchId) => {
    setExpandedBatches(prev => ({
      ...prev,
      [batchId]: !prev[batchId]
    }));
  };

  const handleSampleSelection = (sampleId, event, sampleIndex) => {
    if (event.shiftKey && lastSelectedIndex !== null) {
      // Shift+click: select range
      const start = Math.min(lastSelectedIndex, sampleIndex);
      const end = Math.max(lastSelectedIndex, sampleIndex);
      const rangeIds = availableSamples.slice(start, end + 1).map(s => s.id);
      
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
    // In a real implementation, this would create the batch via API
    console.log('Creating batch with:', {
      samples: selectedSamples,
      ...batchDetails
    });
    setShowCreateBatchModal(false);
    setSelectedSamples([]);
    setBatchDetails({ analyst: '', sop: '', equipment: [] });
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
                onClick={() => {
                  // Check out selected samples
                  console.log('Checking out samples:', selectedSamples);
                  // In real implementation, this would update sample status
                }}
                disabled={selectedSamples.length === 0}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSamples.length > 0
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Unlock className="w-4 h-4 mr-2" />
                Check Out Samples
              </button>
              <button
                onClick={() => setShowCreateBatchModal(true)}
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
                disabled={selectedSamples.length === 0 || activePrepBatches.filter(b => b.status === 'open').length === 0}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSamples.length > 0 && activePrepBatches.filter(b => b.status === 'open').length > 0
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
                {availableSamples.map((sample, index) => (
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

          {/* Active Prep Batches Section */}
          <div className="col-span-7">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                  Active Prep Batches
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Batches currently in preparation or ready for analysis
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {activePrepBatches.map(batch => (
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Mark batch as ready for analysis
                              console.log('Marking batch as ready:', batch.id);
                            }}
                            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Mark Ready
                          </button>
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
                {activePrepBatches.filter(b => b.status === 'open').map(batch => (
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
              {activePrepBatches.filter(b => b.status === 'open').length === 0 && (
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
                  console.log('Adding samples to batch:', selectedBatchId);
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

      {/* Create Batch Modal */}
      {showCreateBatchModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Create Preparation Batch
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Complete the details to create a new prep batch with {selectedSamples.length} selected samples
              </p>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Analyst Name
                </label>
                <input
                  type="text"
                  value={batchDetails.analyst}
                  onChange={(e) => setBatchDetails(prev => ({ ...prev, analyst: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter analyst name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Operating Procedure
                </label>
                <select
                  value={batchDetails.sop}
                  onChange={(e) => setBatchDetails(prev => ({ ...prev, sop: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select SOP</option>
                  <option value="SOP-CANN-PREP-v3.2">SOP-CANN-PREP-v3.2 - Cannabinoids Sample Preparation</option>
                  <option value="SOP-CANN-PREP-v3.1">SOP-CANN-PREP-v3.1 - Cannabinoids Sample Preparation (Legacy)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment (Add serial numbers)
                </label>
                <div className="text-sm text-gray-600">
                  Equipment tracking will be implemented in the next iteration
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateBatchModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBatch}
                disabled={!batchDetails.analyst || !batchDetails.sop}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  batchDetails.analyst && batchDetails.sop
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepBatchManagement;