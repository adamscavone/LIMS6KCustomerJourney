import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Calendar, ChevronDown, Upload, Save, AlertCircle } from 'lucide-react';

const NonMetrc2 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showForm, setShowForm] = useState(true);
  const [samples, setSamples] = useState([]);
  const [currentSample, setCurrentSample] = useState(1);
  const [clientSearchResults, setClientSearchResults] = useState([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showNewClientOption, setShowNewClientOption] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [samplerSearchResults, setSamplerSearchResults] = useState([]);
  const [showSamplerDropdown, setShowSamplerDropdown] = useState(false);
  
  // Assay turnaround times (in business days)
  const assayTurnaroundTimes = {
    // Microbial
    microbial: 3,
    microbialToSequencing: 7,
    microbialSourceEnvironment: 5,
    microbialSettlePlates: 5,
    microbialWaterCounts: 3,
    // Chemistry
    heavyMetals: 2,
    plantTissuePanel: 3,
    mineralsSoilWater: 3,
    homogenateTesting: 2,
    residualSolvents: 2,
    terpenes: 3,
    potency: 2,
    pesticides: 3,
    mycotoxins: 3,
    // Other
    earlyDetectionPowderyMildew: 2,
    earlyDetectionRussetMites: 2,
    earlyDetectionOther: 3,
    plantVirusTesting: 5,
    packageStability: 14,
    moistureContent: 1,
    waterActivity: 1,
    density: 1,
    foreignMatter: 1,
    geneticSequencing: 7,
    stabilityTesting: 30,
    packageTesting: 7
  };

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

  // Define analytes for each assay (for whitelisting)
  const assayAnalytes = {
    // Ohio microbial analytes
    microbial: [
      'Total Yeast & Mold',
      'BTGN (Bile Tolerant Gram Negative)',
      'E. coli/STEC',
      'Salmonella spp.',
      'Total Coliforms',
      'Total Aerobic Bacteria',
      'Aspergillus flavus',
      'Aspergillus fumigatus',
      'Aspergillus niger',
      'Aspergillus terreus'
    ],
    // Plant pathogens (both Ohio and Michigan)
    plantVirusTesting: [
      'Hop Latent Viroid',
      'Lettuce Chlorosis Virus',
      'Cannabis Cryptic Virus',
      'Tobacco Mosaic Virus',
      'Phytophthora',
      'Rhizoctonia Solani',
      'Pan Fusarium',
      'Fusarium Oxysporum',
      'Powdery Mildew',
      'Botrytis',
      'Pan Pythium',
      'Russet Mites'
    ],
    // Chemistry analytes
    heavyMetals: ['Arsenic', 'Cadmium', 'Chromium', 'Lead', 'Mercury'],
    pesticides: ['Abamectin', 'Acephate', 'Aldicarb', 'Bifenthrin', 'Chlorpyrifos', 'Cypermethrin', 'Diazinon', 'Dimethoate'],
    mycotoxins: ['Aflatoxin B1', 'Aflatoxin B2', 'Aflatoxin G1', 'Aflatoxin G2', 'Ochratoxin A'],
    potency: ['THC', 'THCa', 'CBD', 'CBDa', 'CBG', 'CBGa', 'CBN', 'CBC', 'THCV'],
    terpenes: ['Limonene', 'Myrcene', 'Pinene', 'Linalool', 'Caryophyllene', 'Humulene', 'Terpinolene'],
    residualSolvents: ['Acetone', 'Acetonitrile', 'Butane', 'Ethanol', 'Ethyl Acetate', 'Heptane', 'Hexane', 'Isopropanol', 'Methanol', 'Pentane', 'Propane', 'Toluene', 'Xylenes']
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate deadline based on turnaround time
  const calculateDeadline = (assayKey, baseDate = new Date()) => {
    const turnaroundDays = assayTurnaroundTimes[assayKey] || 3;
    const deadline = new Date(baseDate);
    let daysAdded = 0;
    
    while (daysAdded < turnaroundDays) {
      deadline.setDate(deadline.getDate() + 1);
      // Skip weekends
      if (deadline.getDay() !== 0 && deadline.getDay() !== 6) {
        daysAdded++;
      }
    }
    
    // Set to 5 PM
    deadline.setHours(17, 0, 0, 0);
    return deadline.toISOString();
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Check if any assays with multiple analytes are selected
  const hasAssaysWithAnalytes = (sample) => {
    return Object.keys(assayAnalytes).some(assay => sample.tests[assay]);
  };

  const handleSampleChange = (sampleIndex, field, value) => {
    setFormData(prev => {
      const newSamples = [...prev.samples];
      
      if (field === 'isRetest') {
        newSamples[sampleIndex].isRetest = value;
        if (value) {
          // Initialize whitelisted analytes for assays that support it
          newSamples[sampleIndex].whitelistedAnalytes = {};
          Object.keys(assayAnalytes).forEach(assay => {
            if (newSamples[sampleIndex].tests[assay]) {
              newSamples[sampleIndex].whitelistedAnalytes[assay] = [];
            }
          });
        } else {
          newSamples[sampleIndex].whitelistedAnalytes = {};
        }
      } else if (field.startsWith('tests.')) {
        const testName = field.split('.')[1];
        newSamples[sampleIndex].tests[testName] = value;
        
        // Calculate deadline when test is selected
        if (value) {
          const deadline = calculateDeadline(testName);
          newSamples[sampleIndex].assayDeadlines[testName] = deadline;
          
          // If retest mode and this assay has analytes, initialize whitelist
          if (newSamples[sampleIndex].isRetest && assayAnalytes[testName]) {
            newSamples[sampleIndex].whitelistedAnalytes[testName] = [];
          }
        } else {
          delete newSamples[sampleIndex].assayDeadlines[testName];
          delete newSamples[sampleIndex].whitelistedAnalytes[testName];
        }
      } else if (field.startsWith('deadline.')) {
        const testName = field.split('.')[1];
        newSamples[sampleIndex].assayDeadlines[testName] = value;
      } else if (field.startsWith('analyte.')) {
        const [, assay, analyte] = field.split('.');
        if (!newSamples[sampleIndex].whitelistedAnalytes[assay]) {
          newSamples[sampleIndex].whitelistedAnalytes[assay] = [];
        }
        
        if (value) {
          if (!newSamples[sampleIndex].whitelistedAnalytes[assay].includes(analyte)) {
            newSamples[sampleIndex].whitelistedAnalytes[assay].push(analyte);
          }
        } else {
          newSamples[sampleIndex].whitelistedAnalytes[assay] = 
            newSamples[sampleIndex].whitelistedAnalytes[assay].filter(a => a !== analyte);
        }
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
    
    // Reset form with new COC number
    setFormData({
      ...formData,
      clientName: '',
      clientAddress: '',
      clientCity: '',
      clientState: 'OH',
      clientZip: '',
      clientPhone: '',
      clientEmail: '',
      clientId: null,
      cocNumber: `COC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
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
    setCurrentSample(1);
    alert('Non-Metrc order created successfully!');
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Selected file: ${file.name}\n\nImport functionality will be implemented to parse chain of custody data from this file.`);
      }
    };
    input.click();
  };

  // Helper to format datetime for input
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Non-Metrc2: Streamlined Entry</h1>
              <div className="text-sm text-gray-500">
                Simplified workflow for non-Metrc sample receiving
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleImportClick}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Upload className="w-4 h-4" />
                <span>Import Chain of Custody</span>
              </button>
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

      <div className="max-w-5xl mx-auto p-4">
        {/* Non-Metrc Order Form - Streamlined Layout */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">New Non-Metrc Order - {formData.cocNumber}</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Combined Client & Collection Info */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Client & Collection Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
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
                      Time <span className="text-red-500">*</span>
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
              </div>

              {/* Customer Selected Checkbox */}
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
                      Check if samples were selected by the customer (not collected by trained technicians)
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

            {/* Sample Details */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Sample Details
              </h3>
              
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
                          <option value="Shake/Trim">Shake/Trim</option>
                          <option value="Concentrate">Concentrate</option>
                          <option value="Rosin">Rosin</option>
                          <option value="Resin">Resin</option>
                          <option value="Vape Cart">Vape Cart</option>
                          <option value="Pre-Roll">Pre-Roll</option>
                          <option value="Infused Pre-Roll">Infused Pre-Roll</option>
                        </optgroup>
                        <optgroup label="Edibles">
                          <option value="Gummy">Gummy</option>
                          <option value="Brownie">Brownie</option>
                          <option value="Chocolate">Chocolate</option>
                          <option value="Cookie">Cookie</option>
                          <option value="Beverage">Beverage</option>
                          <option value="Tincture">Tincture</option>
                          <option value="Capsule">Capsule</option>
                          <option value="Oil">Oil</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option value="Food Ingredient">Food Ingredient</option>
                          <option value="Finished Product">Finished Product</option>
                          <option value="Raw Material">Raw Material</option>
                          <option value="Other">Other</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Testing Requirements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Testing Requirements <span className="text-red-500">*</span>
                      </label>
                      {hasAssaysWithAnalytes(sample) && (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={sample.isRetest}
                            onChange={(e) => handleSampleChange(sampleIdx, 'isRetest', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-orange-600">Select Individual Analytes</span>
                        </label>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-md">
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase">Microbial</h5>
                        <div className="space-y-2">
                          {['microbial', 'microbialToSequencing', 'microbialSourceEnvironment', 'microbialSettlePlates', 'microbialWaterCounts'].map(test => (
                            <label key={test} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={sample.tests[test]}
                                onChange={(e) => handleSampleChange(sampleIdx, `tests.${test}`, e.target.checked)}
                                className="mr-2"
                              />
                              {test === 'microbial' && 'Microbial'}
                              {test === 'microbialToSequencing' && 'Microbial to Sequencing'}
                              {test === 'microbialSourceEnvironment' && 'Source Environment'}
                              {test === 'microbialSettlePlates' && 'Settle Plates'}
                              {test === 'microbialWaterCounts' && 'Water Counts'}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase">Chemistry</h5>
                        <div className="space-y-2">
                          {['heavyMetals', 'plantTissuePanel', 'mineralsSoilWater', 'homogenateTesting', 'residualSolvents', 'terpenes', 'potency', 'pesticides', 'mycotoxins'].map(test => (
                            <label key={test} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={sample.tests[test]}
                                onChange={(e) => handleSampleChange(sampleIdx, `tests.${test}`, e.target.checked)}
                                className="mr-2"
                              />
                              {test === 'heavyMetals' && 'Heavy Metals'}
                              {test === 'plantTissuePanel' && 'Plant Tissue Panel'}
                              {test === 'mineralsSoilWater' && 'Minerals (Soil/Water)'}
                              {test === 'homogenateTesting' && 'Homogenate Testing'}
                              {test === 'residualSolvents' && 'Residual Solvents'}
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
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {['earlyDetectionPowderyMildew', 'earlyDetectionRussetMites', 'earlyDetectionOther', 'plantVirusTesting', 'packageStability', 'moistureContent', 'waterActivity', 'density', 'foreignMatter', 'geneticSequencing', 'stabilityTesting', 'packageTesting'].map(test => (
                            <label key={test} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={sample.tests[test]}
                                onChange={(e) => handleSampleChange(sampleIdx, `tests.${test}`, e.target.checked)}
                                className="mr-2"
                              />
                              {test === 'earlyDetectionPowderyMildew' && 'Early Detection Powdery Mildew'}
                              {test === 'earlyDetectionRussetMites' && 'Early Detection Russet Mites'}
                              {test === 'earlyDetectionOther' && 'Early Detection Other'}
                              {test === 'plantVirusTesting' && 'Plant Virus Testing'}
                              {test === 'packageStability' && 'Package Stability'}
                              {test === 'moistureContent' && 'Moisture Content'}
                              {test === 'waterActivity' && 'Water Activity'}
                              {test === 'density' && 'Density'}
                              {test === 'foreignMatter' && 'Foreign Matter'}
                              {test === 'geneticSequencing' && 'Genetic Sequencing'}
                              {test === 'stabilityTesting' && 'Stability Testing'}
                              {test === 'packageTesting' && 'Package Testing'}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Instructions
                    </label>
                    <textarea
                      value={sample.specialInstructions}
                      onChange={(e) => handleSampleChange(sampleIdx, 'specialInstructions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                      placeholder="Any special handling or testing instructions..."
                    />
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

            {/* Chain of Custody Transfer - Simplified */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Chain of Custody Transfer
              </h3>
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

          {/* Form Actions */}
          <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
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
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Non-Metrc Orders</h2>
            </div>
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

export default NonMetrc2;