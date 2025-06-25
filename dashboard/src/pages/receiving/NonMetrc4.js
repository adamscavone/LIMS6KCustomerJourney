import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Calendar, ChevronDown, Upload, Save, AlertCircle, Grid, List } from 'lucide-react';

const NonMetrc4 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [samples, setSamples] = useState([]);
  const [currentSample, setCurrentSample] = useState(1);
  const [expandedCards, setExpandedCards] = useState({});
  
  const [formData, setFormData] = useState({
    // Client Information
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientState: 'OH',
    clientZip: '',
    clientPhone: '',
    clientEmail: '',
    clientId: null,
    
    // Sample Collection
    collectionDate: new Date().toISOString().split('T')[0],
    collectionTime: new Date().toTimeString().slice(0, 5),
    customerSelected: false,
    samplerName: '',
    samplerSignature: '',
    
    // Chain of Custody
    cocNumber: `COC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    relinquishedBy: '',
    relinquishedDate: '',
    relinquishedTime: '',
    receivedBy: '',
    receivedDate: '',
    receivedTime: '',
    
    // Sample Details
    samples: [{
      sampleId: '',
      sampleType: '',
      sampleDescription: '',
      collectionLocation: '',
      containerType: '',
      preservationMethod: '',
      numberOfContainers: 1,
      isRetest: false,
      whitelistedAnalytes: {},
      tests: {
        microbial: false,
        microbialToSequencing: false,
        microbialSourceEnvironment: false,
        microbialSettlePlates: false,
        microbialWaterCounts: false,
        heavyMetals: false,
        plantTissuePanel: false,
        mineralsSoilWater: false,
        homogenateTesting: false,
        earlyDetectionPowderyMildew: false,
        earlyDetectionRussetMites: false,
        earlyDetectionOther: false,
        plantVirusTesting: false,
        packageStability: false,
        residualSolvents: false,
        terpenes: false,
        potency: false,
        pesticides: false,
        moistureContent: false,
        waterActivity: false,
        mycotoxins: false,
        density: false,
        foreignMatter: false,
        geneticSequencing: false,
        stabilityTesting: false,
        packageTesting: false
      },
      assayDeadlines: {},
      specialInstructions: ''
    }]
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSampleChange = (sampleIndex, field, value) => {
    setFormData(prev => {
      const newSamples = [...prev.samples];
      
      if (field.startsWith('tests.')) {
        const testName = field.split('.')[1];
        newSamples[sampleIndex].tests[testName] = value;
      } else {
        newSamples[sampleIndex][field] = value;
      }
      
      return { ...prev, samples: newSamples };
    });
  };

  const addSample = () => {
    setFormData(prev => ({
      ...prev,
      samples: [...prev.samples, {
        sampleId: '',
        sampleType: '',
        sampleDescription: '',
        collectionLocation: '',
        containerType: '',
        preservationMethod: '',
        numberOfContainers: 1,
        isRetest: false,
        whitelistedAnalytes: {},
        tests: {
          microbial: false,
          heavyMetals: false,
          potency: false,
          pesticides: false,
          terpenes: false,
          moistureContent: false,
          waterActivity: false,
          mycotoxins: false,
          residualSolvents: false,
          plantVirusTesting: false
        },
        assayDeadlines: {},
        specialInstructions: ''
      }]
    }));
    setCurrentSample(prev => prev + 1);
  };

  const removeSample = (index) => {
    if (formData.samples.length > 1) {
      setFormData(prev => ({
        ...prev,
        samples: prev.samples.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new chain of custody record
    const newCOC = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'Pending Receipt'
    };
    setSamples([...samples, newCOC]);
    
    // Reset form
    setFormData({
      clientName: '',
      clientAddress: '',
      clientCity: '',
      clientState: 'OH',
      clientZip: '',
      clientPhone: '',
      clientEmail: '',
      clientId: null,
      collectionDate: new Date().toISOString().split('T')[0],
      collectionTime: new Date().toTimeString().slice(0, 5),
      customerSelected: false,
      samplerName: '',
      samplerSignature: '',
      cocNumber: `COC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      relinquishedBy: '',
      relinquishedDate: '',
      relinquishedTime: '',
      receivedBy: '',
      receivedDate: '',
      receivedTime: '',
      samples: [{
        sampleId: '',
        sampleType: '',
        sampleDescription: '',
        collectionLocation: '',
        containerType: '',
        preservationMethod: '',
        numberOfContainers: 1,
        isRetest: false,
        whitelistedAnalytes: {},
        tests: {
          microbial: false,
          heavyMetals: false,
          potency: false,
          pesticides: false,
          terpenes: false,
          moistureContent: false,
          waterActivity: false,
          mycotoxins: false,
          residualSolvents: false,
          plantVirusTesting: false
        },
        assayDeadlines: {},
        specialInstructions: ''
      }]
    });
    setCurrentSample(1);
    alert('Non-Metrc order created successfully!');
  };

  const toggleCardExpansion = (sampleIdx) => {
    setExpandedCards(prev => ({
      ...prev,
      [sampleIdx]: !prev[sampleIdx]
    }));
  };

  // Test groups for visual organization
  const testGroups = {
    'Microbial': [
      'microbial',
      'microbialToSequencing',
      'microbialSourceEnvironment',
      'microbialSettlePlates',
      'microbialWaterCounts'
    ],
    'Chemistry': [
      'heavyMetals',
      'plantTissuePanel',
      'mineralsSoilWater',
      'homogenateTesting',
      'residualSolvents',
      'terpenes',
      'potency',
      'pesticides',
      'mycotoxins'
    ],
    'Other': [
      'earlyDetectionPowderyMildew',
      'earlyDetectionRussetMites',
      'earlyDetectionOther',
      'plantVirusTesting',
      'packageStability',
      'moistureContent',
      'waterActivity',
      'density',
      'foreignMatter',
      'geneticSequencing',
      'stabilityTesting',
      'packageTesting'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Non-Metrc4: Visual Card Layout</h1>
              <div className="text-sm text-gray-500">
                Card-based interface for non-Metrc sample receiving
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-1 rounded flex items-center space-x-1 ${
                    viewMode === 'card' ? 'bg-white shadow' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="text-sm">Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded flex items-center space-x-1 ${
                    viewMode === 'table' ? 'bg-white shadow' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm">Table</span>
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {currentTime.toLocaleString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <form onSubmit={handleSubmit}>
          {/* Client Info Card */}
          <div className="bg-white rounded-lg shadow mb-4">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Client Information</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleFieldChange('clientName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientAddress}
                    onChange={(e) => handleFieldChange('clientAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientCity}
                    onChange={(e) => handleFieldChange('clientCity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={formData.clientState}
                    onChange={(e) => handleFieldChange('clientState', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="OH">OH</option>
                    <option value="MI">MI</option>
                    <option value="PA">PA</option>
                    <option value="IN">IN</option>
                    <option value="KY">KY</option>
                    <option value="WV">WV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientZip}
                    onChange={(e) => handleFieldChange('clientZip', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Collection Details Card */}
          <div className="bg-white rounded-lg shadow mb-4">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Collection Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.collectionDate}
                    onChange={(e) => handleFieldChange('collectionDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.collectionTime}
                    onChange={(e) => handleFieldChange('collectionTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.customerSelected}
                    onChange={(e) => {
                      handleFieldChange('customerSelected', e.target.checked);
                      if (e.target.checked) {
                        handleFieldChange('samplerName', 'N/A');
                        handleFieldChange('samplerSignature', 'N/A');
                      } else {
                        handleFieldChange('samplerName', '');
                        handleFieldChange('samplerSignature', '');
                      }
                    }}
                    className="mr-3 h-4 w-4 text-yellow-600 rounded focus:ring-yellow-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Customer-Selected/Submitted Samples</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Check if samples were selected by the customer
                    </p>
                  </div>
                </label>
              </div>

              {!formData.customerSelected && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sampler Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.samplerName}
                      onChange={(e) => handleFieldChange('samplerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sampler Signature
                    </label>
                    <input
                      type="text"
                      value={formData.samplerSignature}
                      onChange={(e) => handleFieldChange('samplerSignature', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type name to sign"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Samples Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Samples</h2>
              <button
                type="button"
                onClick={addSample}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Sample</span>
              </button>
            </div>

            {viewMode === 'card' ? (
              // Card View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.samples.map((sample, sampleIdx) => (
                  <div key={sampleIdx} className="bg-white rounded-lg shadow">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">Sample {sampleIdx + 1}</h3>
                        {formData.samples.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSample(sampleIdx)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Sample ID <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={sample.sampleId}
                              onChange={(e) => handleSampleChange(sampleIdx, 'sampleId', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., CB104-001"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={sample.sampleType}
                              onChange={(e) => handleSampleChange(sampleIdx, 'sampleType', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                              required
                            >
                              <option value="">Select...</option>
                              <optgroup label="Environmental">
                                <option value="Water">Water</option>
                                <option value="Soil">Soil</option>
                                <option value="Plant Tissue">Plant Tissue</option>
                                <option value="Environmental Swab">Environmental Swab</option>
                              </optgroup>
                              <optgroup label="Cannabis">
                                <option value="Flower">Flower</option>
                                <option value="Concentrate">Concentrate</option>
                                <option value="Edible">Edible</option>
                                <option value="Tincture">Tincture</option>
                              </optgroup>
                              <optgroup label="Other">
                                <option value="Other">Other</option>
                              </optgroup>
                            </select>
                          </div>
                        </div>

                        {/* Test Selection */}
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleCardExpansion(sampleIdx)}
                            className="flex items-center justify-between w-full text-left"
                          >
                            <span className="text-xs font-medium text-gray-700">Testing Requirements <span className="text-red-500">*</span></span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transform transition-transform ${
                              expandedCards[sampleIdx] ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {expandedCards[sampleIdx] && (
                            <div className="mt-2 space-y-2">
                              {Object.entries(testGroups).map(([groupName, tests]) => (
                                <div key={groupName}>
                                  <div className="text-xs font-medium text-gray-600 mb-1">{groupName}</div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {tests.map(test => (
                                      <label key={test} className="flex items-center text-xs">
                                        <input
                                          type="checkbox"
                                          checked={sample.tests[test] || false}
                                          onChange={(e) => handleSampleChange(sampleIdx, `tests.${test}`, e.target.checked)}
                                          className="mr-1"
                                        />
                                        {test === 'microbial' && 'Microbial'}
                                        {test === 'microbialToSequencing' && 'Microbial to Seq'}
                                        {test === 'microbialSourceEnvironment' && 'Microbial Env'}
                                        {test === 'microbialSettlePlates' && 'Settle Plates'}
                                        {test === 'microbialWaterCounts' && 'Water Counts'}
                                        {test === 'heavyMetals' && 'Heavy Metals'}
                                        {test === 'plantTissuePanel' && 'Plant Tissue'}
                                        {test === 'mineralsSoilWater' && 'Minerals'}
                                        {test === 'homogenateTesting' && 'Homogenate'}
                                        {test === 'earlyDetectionPowderyMildew' && 'PM Detection'}
                                        {test === 'earlyDetectionRussetMites' && 'Mite Detection'}
                                        {test === 'earlyDetectionOther' && 'Other Detection'}
                                        {test === 'plantVirusTesting' && 'Plant Virus'}
                                        {test === 'packageStability' && 'Package Stability'}
                                        {test === 'residualSolvents' && 'Solvents'}
                                        {test === 'terpenes' && 'Terpenes'}
                                        {test === 'potency' && 'Potency'}
                                        {test === 'pesticides' && 'Pesticides'}
                                        {test === 'moistureContent' && 'Moisture'}
                                        {test === 'waterActivity' && 'Water Activity'}
                                        {test === 'mycotoxins' && 'Mycotoxins'}
                                        {test === 'density' && 'Density'}
                                        {test === 'foreignMatter' && 'Foreign Matter'}
                                        {test === 'geneticSequencing' && 'Genetic Seq'}
                                        {test === 'stabilityTesting' && 'Stability'}
                                        {test === 'packageTesting' && 'Package Test'}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {!expandedCards[sampleIdx] && (
                            <div className="mt-1 text-xs text-gray-600">
                              {Object.values(sample.tests || {}).filter(v => v).length} tests selected
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Special Instructions
                          </label>
                          <textarea
                            value={sample.specialInstructions}
                            onChange={(e) => handleSampleChange(sampleIdx, 'specialInstructions', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            rows="2"
                            placeholder="Optional notes..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Table View
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sample ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tests
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructions
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.samples.map((sample, sampleIdx) => (
                      <tr key={sampleIdx}>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={sample.sampleId}
                            onChange={(e) => handleSampleChange(sampleIdx, 'sampleId', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="Sample ID"
                            required
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={sample.sampleType}
                            onChange={(e) => handleSampleChange(sampleIdx, 'sampleType', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            required
                          >
                            <option value="">Select...</option>
                            <optgroup label="Environmental">
                              <option value="Water">Water</option>
                              <option value="Soil">Soil</option>
                              <option value="Plant Tissue">Plant Tissue</option>
                              <option value="Environmental Swab">Environmental Swab</option>
                            </optgroup>
                            <optgroup label="Cannabis">
                              <option value="Flower">Flower</option>
                              <option value="Concentrate">Concentrate</option>
                              <option value="Edible">Edible</option>
                              <option value="Tincture">Tincture</option>
                            </optgroup>
                            <optgroup label="Other">
                              <option value="Other">Other</option>
                            </optgroup>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">
                            {Object.values(sample.tests || {}).filter(v => v).length} selected
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={sample.specialInstructions}
                            onChange={(e) => handleSampleChange(sampleIdx, 'specialInstructions', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="Notes..."
                          />
                        </td>
                        <td className="px-4 py-3">
                          {formData.samples.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSample(sampleIdx)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Chain of Custody Card */}
          <div className="bg-white rounded-lg shadow mb-4">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Chain of Custody - {formData.cocNumber}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relinquished By
                  </label>
                  <input
                    type="text"
                    value={formData.relinquishedBy}
                    onChange={(e) => handleFieldChange('relinquishedBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Received By
                  </label>
                  <input
                    type="text"
                    value={formData.receivedBy}
                    onChange={(e) => handleFieldChange('receivedBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear this form?')) {
                  window.location.reload();
                }
              }}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Non-Metrc Order
            </button>
          </div>
        </form>

        {/* Recent Orders Summary */}
        {samples.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="p-4">
              <div className="text-sm text-gray-600">
                {samples.length} orders created this session
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonMetrc4;