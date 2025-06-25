import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, AlertCircle, CheckCircle } from 'lucide-react';

const NonMetrcReceiving3 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientName, setClientName] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [sampleIdCounter, setSampleIdCounter] = useState(176243);
  const [samples, setSamples] = useState([{
    id: 1,
    sampleId: '176243',
    customerReference: '',
    sampleType: '',
    sourceDetails: '',
    ccId: '',
    assays: [],
    rush: false,
    notes: '',
    swabLocation: ''
  }]);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [errors, setErrors] = useState({});
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

  const steps = [
    { number: 1, title: 'Client Info', description: 'Chain of custody details' },
    { number: 2, title: 'Sample Details', description: 'Sample type and source' },
    { number: 3, title: 'Assay Selection', description: 'Required analyses' },
    { number: 4, title: 'Review & Submit', description: 'Confirm all details' }
  ];

  const validateStep = (step) => {
    const stepErrors = {};
    const sample = samples[currentSampleIndex];

    switch (step) {
      case 1:
        if (!clientName) stepErrors.clientName = 'Client name is required';
        break;
      case 2:
        if (!sample.sampleType) stepErrors.sampleType = 'Sample type is required';
        if (!sample.sourceDetails) stepErrors.sourceDetails = 'Source details are required';
        if (sample.sampleType === 'Environmental' && !sample.swabLocation) {
          stepErrors.swabLocation = 'Swab location is required for environmental samples';
        }
        break;
      case 3:
        if (sample.assays.length === 0) stepErrors.assays = 'At least one assay is required';
        break;
    }

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
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
        swabLocation: ''
      }]);
      setCurrentSampleIndex(0);
      setCurrentStep(1);
      setErrors({});
    }, 3000);
  };

  const updateSample = (field, value) => {
    const updated = [...samples];
    updated[currentSampleIndex] = { ...updated[currentSampleIndex], [field]: value };
    setSamples(updated);
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const toggleAssay = (assay) => {
    const updated = [...samples];
    const currentAssays = updated[currentSampleIndex].assays;
    if (currentAssays.includes(assay)) {
      updated[currentSampleIndex].assays = currentAssays.filter(a => a !== assay);
    } else {
      updated[currentSampleIndex].assays = [...currentAssays, assay];
    }
    setSamples(updated);
    if (errors.assays) {
      setErrors({ ...errors, assays: null });
    }
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
      swabLocation: ''
    }]);
    setCurrentSampleIndex(samples.length);
    setCurrentStep(2);
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${
                  step.number < currentStep
                    ? 'bg-green-600 border-green-600 text-white'
                    : step.number === currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {step.number < currentStep ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <div className="text-center mt-2">
                <p className={`text-sm font-medium ${step.number === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${step.number < currentStep ? 'bg-green-600' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    const sample = samples[currentSampleIndex];
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Chain of Custody Information</h3>
            <div>
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
                    if (errors.clientName) setErrors({ ...errors, clientName: null });
                  }}
                  onFocus={() => setShowClientDropdown(clientName.length > 0)}
                  onBlur={() => setTimeout(() => setShowClientDropdown(false), 200)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.clientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Start typing to search clients..."
                />
                {showClientDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
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
              {errors.clientName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.clientName}
                </p>
              )}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                This client name will apply to all samples in this chain of custody.
                You'll be able to add multiple samples after providing the client information.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Sample Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Sample ID
                </label>
                <input
                  type="text"
                  value={sample.sampleId}
                  onChange={(e) => updateSample('sampleId', e.target.value)}
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
                  value={sample.customerReference}
                  onChange={(e) => updateSample('customerReference', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., CB104-001 or REVERSE OSMOSIS TABLE #1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Type <span className="text-red-500">*</span>
              </label>
              <select
                value={sample.sampleType}
                onChange={(e) => updateSample('sampleType', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.sampleType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select sample type</option>
                {sampleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.sampleType && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.sampleType}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source Details <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={sample.sourceDetails}
                onChange={(e) => updateSample('sourceDetails', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.sourceDetails ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter source/origin details"
              />
              {errors.sourceDetails && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.sourceDetails}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internal CC ID
              </label>
              <input
                type="text"
                value={sample.ccId}
                onChange={(e) => updateSample('ccId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Optional CC ID"
              />
            </div>
            {sample.sampleType === 'Environmental' && (
              <div className="p-4 bg-blue-50 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Swab Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={sample.swabLocation}
                  onChange={(e) => updateSample('swabLocation', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.swabLocation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Grow Room A - Table 3"
                />
                {errors.swabLocation && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.swabLocation}
                  </p>
                )}
              </div>
            )}
            <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
              Sample #{currentSampleIndex + 1} of {samples.length} for {clientName || 'this client'}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Assay Selection</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Assays <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 border border-gray-300 rounded-md max-h-64 overflow-y-auto">
                {availableAssays.map(assay => (
                  <label key={assay} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={sample.assays.includes(assay)}
                      onChange={() => toggleAssay(assay)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{assay}</span>
                  </label>
                ))}
              </div>
              {errors.assays && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.assays}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sample.rush}
                  onChange={(e) => updateSample('rush', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Rush Processing Required</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={sample.notes}
                onChange={(e) => updateSample('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Optional notes or special instructions"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-700">Client:</span>
                  <p className="text-lg font-semibold">{clientName}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Total Samples:</span>
                  <p className="text-lg font-semibold">{samples.length}</p>
                </div>
              </div>
            </div>
            
            {samples.map((s, idx) => (
              <div key={s.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-900 mb-2">
                  Sample {s.sampleId}
                  {s.customerReference && (
                    <span className="ml-2 text-sm text-gray-600">({s.customerReference})</span>
                  )}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">{s.sampleType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Source:</span>
                    <span className="ml-2 font-medium">{s.sourceDetails}</span>
                  </div>
                  {s.sampleType === 'Environmental' && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Swab Location:</span>
                      <span className="ml-2 font-medium">{s.swabLocation}</span>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-gray-600">Assays:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {s.assays.map(assay => (
                        <span key={assay} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {assay}
                        </span>
                      ))}
                    </div>
                  </div>
                  {s.rush && (
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">RUSH</span>
                    </div>
                  )}
                  {s.ccId && (
                    <div className="col-span-2">
                      <span className="text-gray-600">CC ID:</span>
                      <span className="ml-2 font-medium">{s.ccId}</span>
                    </div>
                  )}
                  {s.notes && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Notes:</span>
                      <p className="text-sm mt-1">{s.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <button
              onClick={addSample}
              className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
            >
              + Add Another Sample
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Non-METRC Receiving (Wizard)</h1>
        <p className="text-gray-600">Step-by-step sample entry process</p>
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Sample successfully submitted! Internal ID has been assigned.
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-6">
          <StepIndicator />
          <div className="mt-8">
            {renderStepContent()}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {currentStep === 4 ? 'Submit' : 'Next'}
            {currentStep < 4 && <ChevronRight className="h-4 w-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonMetrcReceiving3;