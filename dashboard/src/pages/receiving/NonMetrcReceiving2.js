import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

const NonMetrcReceiving2 = () => {
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
      expanded: true,
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

  const toggleExpanded = (index) => {
    const updated = [...samples];
    updated[index].expanded = !updated[index].expanded;
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
      expanded: true,
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
          expanded: true,
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

  const FormField = ({ label, required, error, children }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Non-METRC Receiving (Form Layout)</h1>
        <p className="text-gray-600">Enter non-regulated samples with expandable form sections</p>
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Samples successfully submitted! Internal IDs have been assigned.
        </div>
      )}

      <div className="mb-4 bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <FormField label="Client Name" required error={clientError}>
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
        </FormField>
      </div>

      <div className="space-y-4">
        {samples.map((sample, index) => (
          <div key={sample.id} className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Sample {sample.sampleId || `#${index + 1}`}
                {sample.customerReference && (
                  <span className="ml-2 text-sm text-gray-600">({sample.customerReference})</span>
                )}
                {sample.rush && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">RUSH</span>
                )}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeSample(index)}
                  disabled={samples.length === 1}
                  className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => toggleExpanded(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {sample.expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {sample.expanded && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Customer Sample ID" required={false}>
                    <input
                      type="text"
                      value={sample.sampleId}
                      onChange={(e) => updateSample(index, 'sampleId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Auto-generated"
                      readOnly
                    />
                  </FormField>

                  <FormField label="Customer Reference" required={false}>
                    <input
                      type="text"
                      value={sample.customerReference}
                      onChange={(e) => updateSample(index, 'customerReference', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., CB104-001 or REVERSE OSMOSIS TABLE #1"
                    />
                  </FormField>

                  <FormField label="Sample Type" required error={sample.errors.sampleType}>
                    <select
                      value={sample.sampleType}
                      onChange={(e) => updateSample(index, 'sampleType', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        sample.errors.sampleType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select sample type</option>
                      {sampleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Source Details" required error={sample.errors.sourceDetails}>
                    <input
                      type="text"
                      value={sample.sourceDetails}
                      onChange={(e) => updateSample(index, 'sourceDetails', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        sample.errors.sourceDetails ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter source/origin details"
                    />
                  </FormField>

                  <FormField label="Internal CC ID" required={false}>
                    <input
                      type="text"
                      value={sample.ccId}
                      onChange={(e) => updateSample(index, 'ccId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Optional CC ID"
                    />
                  </FormField>

                  <div className="md:col-span-2">
                    <FormField label="Assays" required error={sample.errors.assays}>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-3 border border-gray-300 rounded-md">
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
                    </FormField>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rush-${index}`}
                      checked={sample.rush}
                      onChange={(e) => updateSample(index, 'rush', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`rush-${index}`} className="ml-2 block text-sm text-gray-900">
                      Rush Processing Required
                    </label>
                  </div>
                </div>

                {sample.sampleType === 'Environmental' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <FormField label="Swab Location" required error={sample.errors.swabLocation}>
                      <input
                        type="text"
                        value={sample.swabLocation}
                        onChange={(e) => updateSample(index, 'swabLocation', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          sample.errors.swabLocation ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Grow Room A - Table 3"
                      />
                    </FormField>
                  </div>
                )}

                <FormField label="Notes" required={false}>
                  <textarea
                    value={sample.notes}
                    onChange={(e) => updateSample(index, 'notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional notes or special instructions"
                  />
                </FormField>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={addSample}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Sample
        </button>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit All Samples
        </button>
      </div>
    </div>
  );
};

export default NonMetrcReceiving2;