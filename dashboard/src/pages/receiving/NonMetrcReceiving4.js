import React, { useState } from 'react';
import { Plus, X, AlertCircle, CheckCircle, Beaker, Clock, FileText, User } from 'lucide-react';

const NonMetrcReceiving4 = () => {
  const [clientName, setClientName] = useState('');
  const [clientError, setClientError] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [sampleIdCounter, setSampleIdCounter] = useState(176243);
  const [samples, setSamples] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSample, setNewSample] = useState({
    sampleId: '',
    customerReference: '',
    sampleType: '',
    sourceDetails: '',
    ccId: '',
    assays: [],
    rush: false,
    notes: '',
    swabLocation: '',
    errors: {}
  });

  const sampleTypes = ['Environmental', 'Food Ingredient', 'Water', 'Other'];
  
  // Mock clients data
  const mockClients = [
    { id: 1, name: 'Environmental Solutions Inc.', city: 'Columbus', state: 'OH' },
    { id: 2, name: 'Green Valley Cultivators', city: 'Cleveland', state: 'OH' },
    { id: 3, name: 'Buckeye Botanicals', city: 'Cincinnati', state: 'OH' },
    { id: 4, name: 'Ohio Organic Farms', city: 'Dayton', state: 'OH' },
    { id: 5, name: 'Environmental Testing Labs', city: 'Toledo', state: 'OH' }
  ];
  const availableAssays = [
    'Cannabinoids',
    'Terpenes',
    'Pesticides',
    'Mycotoxins',
    'Heavy Metals',
    'Residual Solvents',
    'Microbial - Total Yeast & Mold',
    'Microbial - BTGN',
    'Microbial - Total Aerobic',
    'Microbial - Total Coliforms',
    'Microbial - Salmonella',
    'Microbial - E. coli (STEC)',
    'Water Activity',
    'Moisture Content',
    'Foreign Matter',
    'Nutritional Analysis'
  ];

  const validateSample = (sample) => {
    const errors = {};
    if (!sample.sampleType) errors.sampleType = 'Sample type is required';
    if (!sample.sourceDetails) errors.sourceDetails = 'Source details are required';
    if (sample.assays.length === 0) errors.assays = 'At least one assay is required';
    if (sample.sampleType === 'Environmental' && !sample.swabLocation) {
      errors.swabLocation = 'Swab location is required for environmental samples';
    }
    return errors;
  };

  const handleAddSample = () => {
    if (!clientName.trim()) {
      setClientError('Please enter client name first');
      return;
    }
    
    const errors = validateSample(newSample);
    
    if (Object.keys(errors).length === 0) {
      const newSampleId = sampleIdCounter + samples.length;
      setSamples([...samples, { ...newSample, id: Date.now(), sampleId: newSampleId.toString() }]);
      setNewSample({
        sampleId: '',
        customerReference: '',
        sampleType: '',
        sourceDetails: '',
        ccId: '',
        assays: [],
        rush: false,
        notes: '',
        swabLocation: '',
        errors: {}
      });
      setShowAddForm(false);
    } else {
      setNewSample({ ...newSample, errors });
    }
  };

  const removeSample = (id) => {
    setSamples(samples.filter(sample => sample.id !== id));
  };

  const handleSubmitAll = () => {
    if (!clientName.trim()) {
      setClientError('Client name is required');
      return;
    }
    
    if (samples.length > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setClientName('');
        setSampleIdCounter(prev => prev + samples.length);
        setSamples([]);
      }, 3000);
    }
  };

  const updateNewSample = (field, value) => {
    setNewSample({ ...newSample, [field]: value });
    if (newSample.errors[field]) {
      setNewSample({ ...newSample, [field]: value, errors: { ...newSample.errors, [field]: null } });
    }
  };

  const toggleAssay = (assay) => {
    const currentAssays = newSample.assays;
    if (currentAssays.includes(assay)) {
      setNewSample({ ...newSample, assays: currentAssays.filter(a => a !== assay) });
    } else {
      setNewSample({ ...newSample, assays: [...currentAssays, assay] });
    }
    if (newSample.errors.assays) {
      setNewSample({ ...newSample, assays: newSample.assays, errors: { ...newSample.errors, assays: null } });
    }
  };

  const SampleCard = ({ sample }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">
              Sample {sample.sampleId}
              {sample.customerReference && (
                <span className="ml-2 text-sm font-normal text-gray-600">({sample.customerReference})</span>
              )}
            </h3>
            <p className="text-sm text-gray-600">{sample.sampleType}</p>
          </div>
          <button
            onClick={() => removeSample(sample.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {sample.rush && (
          <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-semibold bg-red-100 text-red-800 rounded">
            <Clock className="h-3 w-3 mr-1" />
            RUSH
          </span>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start">
          <Beaker className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">Sample Type</p>
            <p className="font-medium">{sample.sampleType}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">Source Details</p>
            <p className="font-medium">{sample.sourceDetails}</p>
          </div>
        </div>
        
        {sample.sampleType === 'Environmental' && sample.swabLocation && (
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-700">
              <strong>Swab Location:</strong> {sample.swabLocation}
            </p>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-600">Assays:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {sample.assays.map(assay => (
                <span key={assay} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {assay}
                </span>
              ))}
            </div>
          </div>
          {sample.ccId && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">CC ID:</span>
              <span className="text-sm font-medium">{sample.ccId}</span>
            </div>
          )}
        </div>
        
        {sample.notes && (
          <div className="pt-2">
            <p className="text-sm text-gray-600">Notes:</p>
            <p className="text-sm mt-1 text-gray-700 italic">{sample.notes}</p>
          </div>
        )}
      </div>
    </div>
  );

  const AddSampleForm = () => (
    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Add New Sample</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Sample ID
          </label>
          <input
            type="text"
            value={(sampleIdCounter + samples.length).toString()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Auto-generated"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Reference
          </label>
          <input
            type="text"
            value={newSample.customerReference}
            onChange={(e) => updateNewSample('customerReference', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., CB104-001 or REVERSE OSMOSIS TABLE #1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sample Type <span className="text-red-500">*</span>
          </label>
          <select
            value={newSample.sampleType}
            onChange={(e) => updateNewSample('sampleType', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              newSample.errors.sampleType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select type</option>
            {sampleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {newSample.errors.sampleType && (
            <p className="mt-1 text-sm text-red-600">{newSample.errors.sampleType}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source Details <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newSample.sourceDetails}
            onChange={(e) => updateNewSample('sourceDetails', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              newSample.errors.sourceDetails ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {newSample.errors.sourceDetails && (
            <p className="mt-1 text-sm text-red-600">{newSample.errors.sourceDetails}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CC ID</label>
          <input
            type="text"
            value={newSample.ccId}
            onChange={(e) => updateNewSample('ccId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rush"
            checked={newSample.rush}
            onChange={(e) => updateNewSample('rush', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rush" className="ml-2 block text-sm text-gray-900">
            Rush Processing Required
          </label>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Assays <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 p-3 border border-gray-300 rounded-md max-h-48 overflow-y-auto">
          {availableAssays.map(assay => (
            <label key={assay} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newSample.assays.includes(assay)}
                onChange={() => toggleAssay(assay)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{assay}</span>
            </label>
          ))}
        </div>
        {newSample.errors.assays && (
          <p className="mt-1 text-sm text-red-600">{newSample.errors.assays}</p>
        )}
      </div>
      
      {newSample.sampleType === 'Environmental' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Swab Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newSample.swabLocation}
            onChange={(e) => updateNewSample('swabLocation', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              newSample.errors.swabLocation ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Grow Room A - Table 3"
          />
          {newSample.errors.swabLocation && (
            <p className="mt-1 text-sm text-red-600">{newSample.errors.swabLocation}</p>
          )}
        </div>
      )}
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={newSample.notes}
          onChange={(e) => updateNewSample('notes', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => {
            setShowAddForm(false);
            setNewSample({
              sampleId: '',
              customerReference: '',
              sampleType: '',
              sourceDetails: '',
              ccId: '',
              assays: [],
              rush: false,
              notes: '',
              swabLocation: '',
              errors: {}
            });
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleAddSample}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Sample
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Non-METRC Receiving (Card Layout)</h1>
        <p className="text-gray-600">Visual card-based sample management</p>
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          All samples successfully submitted! Internal IDs have been assigned.
        </div>
      )}

      <div className="mb-4 bg-white shadow-sm rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={clientName}
            onChange={(e) => {
              const value = e.target.value;
              setClientName(value);
              setClientSearch(value);
              setShowClientDropdown(value.length > 0);
              if (clientError) setClientError('');
            }}
            onFocus={() => setShowClientDropdown(clientName.length > 0)}
            onBlur={() => setTimeout(() => setShowClientDropdown(false), 200)}
            className={`w-full max-w-md px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              clientError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Start typing to search clients..."
          />
          {showClientDropdown && (
            <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {mockClients
                .filter(client => client.name.toLowerCase().includes(clientSearch.toLowerCase()))
                .map(client => (
                  <div
                    key={client.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setClientName(client.name);
                      setSelectedClientId(client.id);
                      setShowClientDropdown(false);
                    }}
                  >
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.city}, {client.state}</div>
                  </div>
                ))
              }
              {mockClients.filter(client => client.name.toLowerCase().includes(clientSearch.toLowerCase())).length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">No clients found</div>
              )}
            </div>
          )}
        </div>
        {clientError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {clientError}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map(sample => (
          <SampleCard key={sample.id} sample={sample} />
        ))}
        
        {showAddForm ? (
          <AddSampleForm />
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 hover:bg-gray-50 transition-colors group"
          >
            <div className="text-center">
              <Plus className="h-12 w-12 text-gray-400 mx-auto group-hover:text-gray-600" />
              <p className="mt-2 text-sm font-medium text-gray-900">Add New Sample</p>
              <p className="mt-1 text-xs text-gray-500">Click to add a non-METRC sample</p>
            </div>
          </button>
        )}
      </div>

      {samples.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmitAll}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit All Samples ({samples.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default NonMetrcReceiving4;