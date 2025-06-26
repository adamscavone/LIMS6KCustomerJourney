import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Calendar, ChevronRight, Upload, Save, AlertCircle, CheckCircle } from 'lucide-react';

const NonMetrc3 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Client Information
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientState: 'OH',
    clientZip: '',
    clientPhone: '',
    clientEmail: '',
    
    // Step 2: Collection Details
    collectionDate: new Date().toISOString().split('T')[0],
    collectionTime: new Date().toTimeString().slice(0, 5),
    customerSelected: false,
    samplerName: '',
    samplerSignature: '',
    collectionLocation: '',
    collectionNotes: '',
    
    // Step 3: Sample Information
    samples: [{
      sampleId: '',
      sampleType: '',
      sampleDescription: '',
      collectionLocation: '',
      containerType: '',
      preservationMethod: 'Room Temperature',
      numberOfContainers: 1,
      isRetest: false,
      whitelistedAnalytes: {},
      tests: {
        microbial: false,
        microbialSourceEnvironment: false,
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
    }],
    
    // Step 4: Chain of Custody
    cocNumber: `COC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    relinquishedBy: '',
    relinquishedDate: '',
    relinquishedTime: '',
    receivedBy: '',
    receivedDate: '',
    receivedTime: '',
    cocNotes: ''
  });

  const [completedSteps, setCompletedSteps] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stepTitles = {
    1: 'Client Information',
    2: 'Collection Details',
    3: 'Sample Information',
    4: 'Chain of Custody'
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSampleChange = (sampleIndex, field, value) => {
    setFormData(prev => {
      const newSamples = [...prev.samples];
      newSamples[sampleIndex][field] = value;
      return { ...prev, samples: newSamples };
    });
  };

  const handleTestChange = (sampleIndex, testName, value) => {
    setFormData(prev => {
      const newSamples = [...prev.samples];
      if (!newSamples[sampleIndex].tests) {
        newSamples[sampleIndex].tests = {};
      }
      newSamples[sampleIndex].tests[testName] = value;
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
        preservationMethod: 'Room Temperature',
        numberOfContainers: 1,
        isRetest: false,
        whitelistedAnalytes: {},
        tests: {
        microbial: false,
        microbialSourceEnvironment: false,
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
    }));
  };

  const removeSample = (index) => {
    if (formData.samples.length > 1) {
      setFormData(prev => ({
        ...prev,
        samples: prev.samples.filter((_, i) => i !== index)
      }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.clientName && formData.clientAddress && formData.clientCity && formData.clientZip && formData.clientPhone;
      case 2:
        return formData.collectionDate && formData.collectionTime && (formData.customerSelected || formData.samplerName);
      case 3:
        return formData.samples.every(s => s.sampleId && s.sampleType && Object.values(s.tests || {}).some(v => v));
      case 4:
        return true; // Chain of custody is optional
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => ({ ...prev, [currentStep]: true }));
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Show success message
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          clientName: '',
          clientAddress: '',
          clientCity: '',
          clientState: 'OH',
          clientZip: '',
          clientPhone: '',
          clientEmail: '',
          collectionDate: new Date().toISOString().split('T')[0],
          collectionTime: new Date().toTimeString().slice(0, 5),
          customerSelected: false,
          samplerName: '',
          samplerSignature: '',
          collectionLocation: '',
          collectionNotes: '',
          samples: [{
            sampleId: '',
            sampleType: '',
            sampleDescription: '',
            collectionLocation: '',
            containerType: '',
            preservationMethod: 'Room Temperature',
            numberOfContainers: 1,
            isRetest: false,
            whitelistedAnalytes: {},
            tests: {
        microbial: false,
        microbialSourceEnvironment: false,
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
          }],
          cocNumber: `COC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          relinquishedBy: '',
          relinquishedDate: '',
          relinquishedTime: '',
          receivedBy: '',
          receivedDate: '',
          receivedTime: '',
          cocNotes: ''
        });
        setCurrentStep(1);
        setCompletedSteps({});
        setShowSuccess(false);
      }, 3000);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Non-Metrc3: Step-by-Step Wizard</h1>
              <div className="text-sm text-gray-500">
                Guided workflow for non-Metrc sample receiving
              </div>
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

      <div className="max-w-4xl mx-auto p-4">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => goToStep(step)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep === step
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : completedSteps[step]
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}
                    disabled={!completedSteps[step] && step !== currentStep}
                  >
                    {completedSteps[step] ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step
                    )}
                  </button>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep === step ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      Step {step}
                    </p>
                    <p className={`text-xs ${
                      currentStep === step ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {stepTitles[step]}
                    </p>
                  </div>
                  {step < 4 && (
                    <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {/* Step 1: Client Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Client Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => handleFieldChange('clientName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter client name..."
                      required
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
                  <div className="grid grid-cols-2 gap-4">
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
                </div>
              </div>
            )}

            {/* Step 2: Collection Details */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Collection Details</h2>
                <div className="space-y-4">
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

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
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
                          Check if samples were selected by the customer (not collected by trained technicians)
                        </p>
                      </div>
                    </label>
                  </div>

                  {!formData.customerSelected && (
                    <div className="grid grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Collection Location
                    </label>
                    <input
                      type="text"
                      value={formData.collectionLocation}
                      onChange={(e) => handleFieldChange('collectionLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Main facility, Greenhouse A"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Collection Notes
                    </label>
                    <textarea
                      value={formData.collectionNotes}
                      onChange={(e) => handleFieldChange('collectionNotes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Any additional notes about the collection..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Sample Information */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Sample Information</h2>
                
                {formData.samples.map((sample, sampleIdx) => (
                  <div key={sampleIdx} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Sample {sampleIdx + 1}</h4>
                      {formData.samples.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSample(sampleIdx)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove Sample
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sample ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={sample.sampleId}
                          onChange={(e) => handleSampleChange(sampleIdx, 'sampleId', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., CB104-001"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sample Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={sample.sampleType}
                          onChange={(e) => handleSampleChange(sampleIdx, 'sampleType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select type...</option>
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

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sample Description
                      </label>
                      <input
                        type="text"
                        value={sample.sampleDescription}
                        onChange={(e) => handleSampleChange(sampleIdx, 'sampleDescription', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Container Type
                        </label>
                        <select
                          value={sample.containerType}
                          onChange={(e) => handleSampleChange(sampleIdx, 'containerType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="Sterile Plastic Bottle">Sterile Plastic Bottle</option>
                          <option value="Glass Jar">Glass Jar</option>
                          <option value="Plastic Bag">Plastic Bag</option>
                          <option value="Swab Kit">Swab Kit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preservation Method
                        </label>
                        <select
                          value={sample.preservationMethod}
                          onChange={(e) => handleSampleChange(sampleIdx, 'preservationMethod', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Room Temperature">Room Temperature</option>
                          <option value="None">None</option>
                          <option value="Refrigerated">Refrigerated (2-8°C)</option>
                          <option value="Frozen">Frozen (-20°C)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Tests <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-md">
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase">Microbial</h5>
                          <div className="space-y-1">
                            {['microbial', 'microbialSourceEnvironment'].map(test => (
                              <label key={test} className="flex items-center text-xs">
                                <input
                                  type="checkbox"
                                  checked={sample.tests[test] || false}
                                  onChange={(e) => handleTestChange(sampleIdx, test, e.target.checked)}
                                  className="mr-1"
                                />
                                {test === 'microbial' && 'Microbial'}
                                {test === 'microbialSourceEnvironment' && 'Source Env'}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase">Chemistry</h5>
                          <div className="space-y-1">
                            {['heavyMetals', 'plantTissuePanel', 'mineralsSoilWater', 'homogenateTesting', 'residualSolvents', 'terpenes', 'potency', 'pesticides', 'mycotoxins'].map(test => (
                              <label key={test} className="flex items-center text-xs">
                                <input
                                  type="checkbox"
                                  checked={sample.tests[test] || false}
                                  onChange={(e) => handleTestChange(sampleIdx, test, e.target.checked)}
                                  className="mr-1"
                                />
                                {test === 'heavyMetals' && 'Heavy Metals'}
                                {test === 'plantTissuePanel' && 'Plant Tissue'}
                                {test === 'mineralsSoilWater' && 'Minerals'}
                                {test === 'homogenateTesting' && 'Homogenate'}
                                {test === 'residualSolvents' && 'Solvents'}
                                {test === 'terpenes' && 'Terpenes'}
                                {test === 'potency' && 'Potency'}
                                {test === 'pesticides' && 'Pesticides'}
                                {test === 'mycotoxins' && 'Mycotoxins'}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase">Other</h5>
                          <div className="space-y-1 max-h-48 overflow-y-auto">
                            {['earlyDetectionPowderyMildew', 'earlyDetectionRussetMites', 'earlyDetectionOther', 'plantVirusTesting', 'packageStability', 'moistureContent', 'waterActivity', 'density', 'foreignMatter', 'geneticSequencing', 'stabilityTesting', 'packageTesting'].map(test => (
                              <label key={test} className="flex items-center text-xs">
                                <input
                                  type="checkbox"
                                  checked={sample.tests[test] || false}
                                  onChange={(e) => handleTestChange(sampleIdx, test, e.target.checked)}
                                  className="mr-1"
                                />
                                {test === 'earlyDetectionPowderyMildew' && 'Powdery Mildew'}
                                {test === 'earlyDetectionRussetMites' && 'Russet Mites'}
                                {test === 'earlyDetectionOther' && 'Early Det Other'}
                                {test === 'plantVirusTesting' && 'Plant Virus'}
                                {test === 'packageStability' && 'Package Stability'}
                                {test === 'moistureContent' && 'Moisture'}
                                {test === 'waterActivity' && 'Water Activity'}
                                {test === 'density' && 'Density'}
                                {test === 'foreignMatter' && 'Foreign Matter'}
                                {test === 'geneticSequencing' && 'Genetic Seq'}
                                {test === 'stabilityTesting' && 'Stability Test'}
                                {test === 'packageTesting' && 'Package Test'}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSample}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Sample</span>
                </button>
              </div>
            )}

            {/* Step 4: Chain of Custody */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Chain of Custody - {formData.cocNumber}</h2>
                <div className="space-y-4">
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
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.relinquishedDate}
                          onChange={(e) => handleFieldChange('relinquishedDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={formData.relinquishedTime}
                          onChange={(e) => handleFieldChange('relinquishedTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.receivedDate}
                          onChange={(e) => handleFieldChange('receivedDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={formData.receivedTime}
                          onChange={(e) => handleFieldChange('receivedTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chain of Custody Notes
                    </label>
                    <textarea
                      value={formData.cocNotes}
                      onChange={(e) => handleFieldChange('cocNotes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Any additional chain of custody information..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-md ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Order
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Order submitted successfully!</p>
                <p className="text-sm text-green-600">COC Number: {formData.cocNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonMetrc3;