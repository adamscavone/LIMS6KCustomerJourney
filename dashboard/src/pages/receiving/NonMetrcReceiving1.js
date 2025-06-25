import React, { useState } from 'react';
import { Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

const NonMetrcReceiving1 = () => {
  const [clientName, setClientName] = useState('');
  const [clientError, setClientError] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [sampleIdCounter, setSampleIdCounter] = useState(176243);
  const [samples, setSamples] = useState([
    {
      id: 1,
      sampleId: '176243',
      customerReference: '',
      sampleType: '',
      sourceDetails: '',
      ccId: '',
      assays: [],
      rush: false,
      notes: '',
      swabLocation: '',
      errors: {}
    }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const updateSample = (index, field, value) => {
    const updated = [...samples];
    updated[index] = { ...updated[index], [field]: value };
    updated[index].errors = validateSample(updated[index]);
    setSamples(updated);
  };

  const addSample = () => {
    const newSampleId = sampleIdCounter + samples.length;
    setSamples([...samples, {
      id: samples.length + 1,
      sampleId: newSampleId.toString(),
      customerReference: '',
      sampleType: '',
      sourceDetails: '',
      ccId: '',
      assays: [],
      rush: false,
      notes: '',
      swabLocation: '',
      errors: {}
    }]);
  };

  const removeSample = (index) => {
    if (samples.length > 1) {
      setSamples(samples.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // Validate client name
    if (!clientName.trim()) {
      setClientError('Client name is required');
      return;
    }
    setClientError('');

    const updatedSamples = samples.map(sample => ({
      ...sample,
      errors: validateSample(sample)
    }));
    setSamples(updatedSamples);

    const hasErrors = updatedSamples.some(sample => Object.keys(sample.errors).length > 0);
    if (!hasErrors) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setClientName('');
        const newStartId = sampleIdCounter + samples.length;
        setSampleIdCounter(newStartId);
        setSamples([{
          id: 1,
          sampleId: newStartId.toString(),
          customerReference: '',
          sampleType: '',
          sourceDetails: '',
          ccId: '',
          assays: [],
          rush: false,
          notes: '',
          swabLocation: '',
          errors: {}
        }]);
      }, 3000);
    }
  };

  const toggleAssay = (index, assay) => {
    const updated = [...samples];
    const currentAssays = updated[index].assays;
    if (currentAssays.includes(assay)) {
      updated[index].assays = currentAssays.filter(a => a !== assay);
    } else {
      updated[index].assays = [...currentAssays, assay];
    }
    updated[index].errors = validateSample(updated[index]);
    setSamples(updated);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Non-METRC Receiving (Tabular Layout)</h1>
        <p className="text-gray-600">Enter non-regulated samples including environmental monitoring and food ingredients</p>
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Samples successfully submitted! Internal IDs have been assigned.
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

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Sample ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Ref</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CC ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assays</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rush</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {samples.map((sample, index) => (
                <React.Fragment key={sample.id}>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={sample.sampleId}
                        onChange={(e) => updateSample(index, 'sampleId', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-50"
                        placeholder="Auto-generated"
                        readOnly
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={sample.customerReference}
                        onChange={(e) => updateSample(index, 'customerReference', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="e.g., CB104-001"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={sample.sampleType}
                        onChange={(e) => updateSample(index, 'sampleType', e.target.value)}
                        className={`w-full px-2 py-1 border rounded ${sample.errors.sampleType ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select type</option>
                        {sampleTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={sample.sourceDetails}
                        onChange={(e) => updateSample(index, 'sourceDetails', e.target.value)}
                        className={`w-full px-2 py-1 border rounded ${sample.errors.sourceDetails ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Source/origin"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={sample.ccId}
                        onChange={(e) => updateSample(index, 'ccId', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Optional"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="relative">
                        <div className={`px-2 py-1 border rounded cursor-pointer ${sample.errors.assays ? 'border-red-500' : 'border-gray-300'}`}>
                          {sample.assays.length === 0 ? (
                            <span className="text-gray-400">Select assays</span>
                          ) : (
                            <span className="text-sm">{sample.assays.length} selected</span>
                          )}
                        </div>
                        {sample.errors.assays && (
                          <p className="mt-1 text-xs text-red-600">{sample.errors.assays}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={sample.rush}
                        onChange={(e) => updateSample(index, 'rush', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={sample.notes}
                        onChange={(e) => updateSample(index, 'notes', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Optional notes"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeSample(index)}
                        disabled={samples.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9" className="px-4 py-2 bg-gray-50">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Select Assays:</div>
                        <div className="grid grid-cols-3 gap-2">
                          {availableAssays.map(assay => (
                            <label key={assay} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={sample.assays.includes(assay)}
                                onChange={() => toggleAssay(index, assay)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">{assay}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                  {sample.sampleType === 'Environmental' && (
                    <tr>
                      <td colSpan="9" className="px-4 py-2 bg-blue-50">
                        <div className="flex items-center">
                          <label className="text-sm font-medium text-gray-700 mr-4">Swab Location:</label>
                          <input
                            type="text"
                            value={sample.swabLocation}
                            onChange={(e) => updateSample(index, 'swabLocation', e.target.value)}
                            className={`flex-1 max-w-md px-2 py-1 border rounded ${sample.errors.swabLocation ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g., Grow Room A - Table 3"
                          />
                          {sample.errors.swabLocation && (
                            <span className="ml-2 text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {sample.errors.swabLocation}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  {Object.keys(sample.errors).length > 0 && (
                    <tr>
                      <td colSpan="9" className="px-4 py-2 bg-red-50">
                        <div className="text-sm text-red-600">
                          {Object.entries(sample.errors).map(([field, error]) => (
                            <div key={field} className="flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {error}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            onClick={addSample}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sample
          </button>
          
          <button
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Samples
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonMetrcReceiving1;