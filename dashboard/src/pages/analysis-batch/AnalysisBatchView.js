import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Clock, Upload, AlertCircle, ChevronDown, ChevronRight, FileText, Send, Package, FlaskConical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const AnalysisBatchView = () => {
  const navigate = useNavigate();
  const { assayType, batchId } = useParams();
  const [expandedPrepBatches, setExpandedPrepBatches] = useState({});
  const [batchData, setBatchData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [instrumentSelected, setInstrumentSelected] = useState('');
  const [selectedSamples, setSelectedSamples] = useState([]);

  // Mock available instruments
  const mockInstruments = {
    cannabinoids: [
      { id: 'HPLC-001', name: 'Agilent 1260 Infinity II', status: 'available' },
      { id: 'HPLC-002', name: 'Waters Alliance e2695', status: 'busy', nextAvailable: '14:30' },
      { id: 'LCMS-001', name: 'Shimadzu LCMS-8060', status: 'available' }
    ],
    terpenes: [
      { id: 'GCMS-001', name: 'Agilent 7890B GC/5977B MSD', status: 'available' },
      { id: 'GCMS-002', name: 'Thermo TRACE 1310/ISQ 7000', status: 'maintenance' }
    ],
    pesticides: [
      { id: 'LCMS-002', name: 'Waters ACQUITY UPLC/Xevo TQ-S', status: 'available' },
      { id: 'GCMS-003', name: 'Agilent 7010B Triple Quad', status: 'available' }
    ]
  };

  useEffect(() => {
    // In production, fetch batch data from API
    // For now, create mock data based on URL params
    const mockBatch = {
      id: batchId,
      type: assayType,
      status: 'created',
      createdAt: new Date().toLocaleString(),
      prepBatches: [
        {
          id: 'PB-2025-002',
          sampleCount: 3,
          prepAnalyst: 'James Rodriguez',
          samples: ['S007', 'S008', 'S009']
        }
      ],
      totalSamples: 3,
      instrument: null,
      queuePosition: null
    };
    setBatchData(mockBatch);
  }, [batchId, assayType]);

  const togglePrepBatchExpansion = (batchId) => {
    setExpandedPrepBatches(prev => ({
      ...prev,
      [batchId]: !prev[batchId]
    }));
  };

  const handleQueueForInstrument = () => {
    if (!instrumentSelected) {
      alert('Please select an instrument');
      return;
    }

    // Update batch status
    setBatchData(prev => ({
      ...prev,
      status: 'queued',
      instrument: instrumentSelected,
      queuePosition: 3, // Mock queue position
      estimatedStart: '14:45'
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // In production, parse the file and extract results
      // For now, just show success
      setTimeout(() => {
        setBatchData(prev => ({
          ...prev,
          status: 'results_uploaded',
          resultsFile: file.name,
          uploadedAt: new Date().toLocaleString()
        }));
      }, 1000);
    }
  };

  const handleSendToReview = () => {
    // In production, this would trigger the review workflow
    navigate('/');
  };

  if (!batchData) {
    return <div>Loading...</div>;
  }

  const getAssayTitle = () => {
    switch(assayType) {
      case 'cannabinoids': return 'Cannabinoids';
      case 'terpenes': return 'Terpenes';
      case 'pesticides': return 'Pesticides/Mycotoxins';
      default: return 'Unknown Assay';
    }
  };

  const getSampleDetails = (sampleId) => {
    // In production, fetch from API
    // Mock data for demo
    const mockSamples = {
      'S007': { name: 'MPC-Hybrid-01', client: 'Mountain Peak Cannabis' },
      'S008': { name: 'CG-Purple-Haze-33', client: 'Crystal Gardens' },
      'S009': { name: 'OL-Diesel-44', client: 'Organic Labs' }
    };
    return mockSamples[sampleId] || { name: sampleId, client: 'Unknown' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/prep-batch/${assayType}`)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Analysis Batch: {batchData.id}
                </h1>
                <p className="text-sm text-gray-600">
                  {getAssayTitle()} • {batchData.totalSamples} samples • Created: {batchData.createdAt}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                batchData.status === 'created' ? 'bg-gray-100 text-gray-800' :
                batchData.status === 'queued' ? 'bg-orange-100 text-orange-800' :
                batchData.status === 'results_uploaded' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {batchData.status === 'created' && 'Created'}
                {batchData.status === 'queued' && 'Queued for Instrument'}
                {batchData.status === 'results_uploaded' && 'Results Uploaded'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Batch Details */}
          <div className="col-span-8 space-y-6">
            {/* Prep Batches */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Preparation Batches
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {batchData.prepBatches.map(prepBatch => (
                  <div key={prepBatch.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => togglePrepBatchExpansion(prepBatch.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {expandedPrepBatches[prepBatch.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {prepBatch.id}
                          </p>
                          <p className="text-xs text-gray-600">
                            Prepared by: {prepBatch.prepAnalyst} • {prepBatch.sampleCount} samples
                          </p>
                        </div>
                      </div>
                    </div>

                    {expandedPrepBatches[prepBatch.id] && (
                      <div className="mt-4 space-y-2 pl-8">
                        {prepBatch.samples.map(sampleId => {
                          const sample = getSampleDetails(sampleId);
                          return (
                            <div key={sampleId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {sample.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {sample.client} • ID: {sampleId}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Results Upload Section */}
            {batchData.status !== 'created' && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-green-600" />
                    Instrument Results
                  </h2>
                </div>
                <div className="p-6">
                  {batchData.status === 'queued' && (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Batch queued on {batchData.instrument}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Position #{batchData.queuePosition} • Estimated start: {batchData.estimatedStart}
                      </p>
                      <div className="mt-6">
                        <p className="text-sm text-gray-700 mb-4">
                          Upload results when instrument run is complete:
                        </p>
                        <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Result File
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".csv,.txt,.xml"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {batchData.status === 'results_uploaded' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Results uploaded successfully
                            </p>
                            <p className="text-xs text-gray-600">
                              {batchData.resultsFile} • Uploaded: {batchData.uploadedAt}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => document.getElementById('file-upload').click()}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Replace File
                          <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".csv,.txt,.xml"
                          />
                        </button>
                        <button
                          onClick={handleSendToReview}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send to Review
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="col-span-4 space-y-6">
            {/* Instrument Selection */}
            {batchData.status === 'created' && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <FlaskConical className="w-5 h-5 mr-2 text-purple-600" />
                    Select Instrument
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {mockInstruments[assayType].map(instrument => (
                      <label
                        key={instrument.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          instrumentSelected === instrument.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${instrument.status !== 'available' ? 'opacity-60' : ''}`}
                      >
                        <input
                          type="radio"
                          name="instrument"
                          value={instrument.id}
                          checked={instrumentSelected === instrument.id}
                          onChange={(e) => setInstrumentSelected(e.target.value)}
                          disabled={instrument.status !== 'available'}
                          className="h-4 w-4 text-blue-600"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {instrument.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            ID: {instrument.id} • Status: {
                              instrument.status === 'available' ? 'Available' :
                              instrument.status === 'busy' ? `Busy until ${instrument.nextAvailable}` :
                              'Under Maintenance'
                            }
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={handleQueueForInstrument}
                    disabled={!instrumentSelected}
                    className={`w-full mt-4 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      instrumentSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Queue for Analysis
                  </button>
                </div>
              </div>
            )}

            {/* Batch Summary */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Batch Summary</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Samples</span>
                  <span className="text-sm font-medium text-gray-900">{batchData.totalSamples}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prep Batches</span>
                  <span className="text-sm font-medium text-gray-900">{batchData.prepBatches.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Assay Type</span>
                  <span className="text-sm font-medium text-gray-900">{getAssayTitle()}</span>
                </div>
                {batchData.instrument && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Instrument</span>
                    <span className="text-sm font-medium text-gray-900">{batchData.instrument}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    {batchData.status === 'created' && 'Select an instrument and queue this batch for analysis.'}
                    {batchData.status === 'queued' && 'Run this batch on the instrument, then upload the results file when complete.'}
                    {batchData.status === 'results_uploaded' && 'Results have been uploaded. Send to review when ready.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisBatchView;