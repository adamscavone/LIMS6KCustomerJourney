import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Zap,
  Info,
  Calendar,
  Beaker,
  FileText,
  Hash,
  Building2,
  Truck,
  ClipboardList,
  Save,
  RefreshCw
} from 'lucide-react';
import { 
  calculateAssayDeadline, 
  getAllAssayDeadlines, 
  getGroupedDeadlines,
  getSuggestedMicroDeadline,
  getSuggestedChemistryDeadline,
  getDefaultAssays,
  getAssayDisplayName,
  TEST_CATEGORY_DEFAULTS
} from '../../utils/assayDeadlines';

const Receiving3 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedManifest, setSelectedManifest] = useState(null);
  const [manifests, setManifests] = useState([]);
  const [formData, setFormData] = useState({
    manifestNotes: '',
    defaultTestCategory: 'Dispensary Plant Material',
    defaultSampleType: '',
    rushAll: false,
    dpmEarlyStartAll: false,
    samples: {}
  });

  const steps = [
    { id: 1, name: 'Select Manifest', icon: Package },
    { id: 2, name: 'Manifest Details', icon: FileText },
    { id: 3, name: 'Sample Types', icon: Beaker },
    { id: 4, name: 'Testing Requirements', icon: ClipboardList },
    { id: 5, name: 'Review & Submit', icon: Check }
  ];

  const sampleTypes = [
    'Flower', 'Shake/Trim', 'Concentrate', 'Rosin', 'Resin', 
    'Vape Cart', 'Gummy', 'Brownie', 'Tincture', 'Chocolate',
    'Cookie', 'Beverage', 'Capsule', 'Oil', 'Topical',
    'Pre-Roll', 'Infused Pre-Roll', 'Hash', 'Kief', 'Isolate'
  ];

  const testCategories = [
    'Dispensary Plant Material',
    'Dispensary Plant Material - STEC/Sal',
    'Non-Solvent Product (Not Previously Tested)',
    'Processed Product (Previously Tested)',
    'Solvent Based Product (Not Previously Tested)',
    'Voluntary Testing - Terpenes (Plant Material)',
    'Research/Development'
  ];

  const assayOptions = [
    { key: 'salmonella', name: 'Salmonella', type: 'micro', default: true },
    { key: 'stec', name: 'STEC', type: 'micro', default: true },
    { key: 'totalAerobicBacteria', name: 'Total Aerobic', type: 'micro', default: true },
    { key: 'totalColiforms', name: 'Total Coliforms', type: 'micro', default: true },
    { key: 'totalYeastMold', name: 'Total Yeast & Mold', type: 'micro', default: true },
    { key: 'btgn', name: 'BTGN', type: 'micro', default: true },
    { key: 'cannabinoids', name: 'Cannabinoids', type: 'chem', default: true },
    { key: 'terpenes', name: 'Terpenes', type: 'chem', default: false },
    { key: 'pesticides', name: 'Pesticides', type: 'chem', default: true },
    { key: 'mycotoxins', name: 'Mycotoxins', type: 'chem', default: true },
    { key: 'heavyMetals', name: 'Heavy Metals', type: 'chem', default: true },
    { key: 'residualSolvents', name: 'Residual Solvents', type: 'chem', default: false }
  ];

  // Generate mock manifests
  useEffect(() => {
    const mockManifests = [
      {
        manifestId: 'M-2025-001',
        manifestNumber: '0000012345',
        createdDate: '2025-06-13T08:00:00',
        client: 'Green Valley Dispensary',
        driver: { name: 'Mike Thompson', eta: '2025-06-13T10:30:00' },
        status: 'in_transit',
        samples: [
          { metrcTag: 'ABC123456789', strain: 'Blue Dream', itemName: 'Blue Dream Flower - 1oz', itemCategory: 'Buds' },
          { metrcTag: 'ABC123456790', strain: 'OG Kush', itemName: 'OG Kush Flower - 1oz', itemCategory: 'Buds' },
          { metrcTag: 'ABC123456791', strain: 'Gelato', itemName: 'Gelato Live Rosin - 1g', itemCategory: 'Concentrate' },
          { metrcTag: 'ABC123456792', strain: 'Wedding Cake', itemName: 'Wedding Cake Vape Cart - 0.5g', itemCategory: 'Vape Cartridge' }
        ]
      },
      {
        manifestId: 'M-2025-002',
        manifestNumber: '0000012346',
        createdDate: '2025-06-13T09:15:00',
        client: 'Sunrise Cannabis Co',
        driver: { name: 'Sarah Johnson', eta: '2025-06-13T11:45:00' },
        status: 'in_transit',
        samples: [
          { metrcTag: 'DEF123456789', strain: 'Purple Haze', itemName: 'Purple Haze Shake - 5oz', itemCategory: 'Shake' },
          { metrcTag: 'DEF123456790', strain: 'N/A', itemName: 'Strawberry Gummies - 100mg', itemCategory: 'Edibles' },
          { metrcTag: 'DEF123456791', strain: 'N/A', itemName: 'Chocolate Bar - 200mg', itemCategory: 'Edibles' }
        ]
      }
    ];
    setManifests(mockManifests);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectManifest = (manifest) => {
    setSelectedManifest(manifest);
    // Initialize sample data
    const sampleData = {};
    const defaultAssays = getDefaultAssays(formData.defaultTestCategory);
    
    manifest.samples.forEach((_, idx) => {
      const assays = defaultAssays;
      const groupedDeadlines = getGroupedDeadlines(
        manifest.createdDate, 
        assays, 
        formData.rushAll
      );
      
      sampleData[idx] = {
        nctlSampleType: formData.defaultSampleType,
        testCategory: formData.defaultTestCategory,
        assays: assays,
        isRush: formData.rushAll,
        dpmEarlyStart: formData.dpmEarlyStartAll,
        microDue: getSuggestedMicroDeadline(manifest.createdDate, assays, formData.rushAll),
        chemistryDue: getSuggestedChemistryDeadline(manifest.createdDate, assays, formData.rushAll),
        groupedDeadlines: groupedDeadlines
      };
    });
    setFormData(prev => ({ ...prev, samples: sampleData }));
    handleNext();
  };

  const updateSampleData = (sampleIdx, field, value) => {
    setFormData(prev => ({
      ...prev,
      samples: {
        ...prev.samples,
        [sampleIdx]: {
          ...prev.samples[sampleIdx],
          [field]: value
        }
      }
    }));
  };

  const updateSampleAssay = (sampleIdx, assayKey, value) => {
    if (!selectedManifest) return;
    
    setFormData(prev => {
      const updatedSample = { ...prev.samples[sampleIdx] };
      updatedSample.assays = { ...updatedSample.assays, [assayKey]: value };
      
      // Recalculate deadlines
      const groupedDeadlines = getGroupedDeadlines(
        selectedManifest.createdDate,
        updatedSample.assays,
        updatedSample.isRush
      );
      
      updatedSample.microDue = getSuggestedMicroDeadline(selectedManifest.createdDate, updatedSample.assays, updatedSample.isRush);
      updatedSample.chemistryDue = getSuggestedChemistryDeadline(selectedManifest.createdDate, updatedSample.assays, updatedSample.isRush);
      updatedSample.groupedDeadlines = groupedDeadlines;
      
      return {
        ...prev,
        samples: {
          ...prev.samples,
          [sampleIdx]: updatedSample
        }
      };
    });
  };

  const applyToAllSamples = (field) => {
    const updatedSamples = {};
    Object.keys(formData.samples).forEach(idx => {
      updatedSamples[idx] = {
        ...formData.samples[idx],
        [field]: formData[`default${field.charAt(0).toUpperCase() + field.slice(1)}`]
      };
    });
    setFormData(prev => ({ ...prev, samples: updatedSamples }));
  };

  const handleSubmit = () => {
    console.log('Submitting manifest data:', formData);
    // Reset for next manifest
    setCurrentStep(1);
    setSelectedManifest(null);
    setFormData({
      manifestNotes: '',
      defaultTestCategory: 'Dispensary Plant Material',
      defaultSampleType: '',
      rushAll: false,
      dpmEarlyStartAll: false,
      samples: {}
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select a Manifest to Process</h2>
            {manifests.map(manifest => (
              <div
                key={manifest.manifestId}
                onClick={() => selectManifest(manifest)}
                className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{manifest.client}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4" />
                        <span>Manifest: {manifest.manifestNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4" />
                        <span>{manifest.samples.length} samples</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4" />
                        <span>Driver: {manifest.driver.name} - ETA: {new Date(manifest.driver.eta).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Manifest Details</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client</label>
                  <p className="mt-1 text-lg">{selectedManifest.client}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Manifest Number</label>
                  <p className="mt-1 text-lg font-mono">{selectedManifest.manifestNumber}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manifest Notes</label>
                  <textarea
                    value={formData.manifestNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, manifestNotes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Enter any special instructions or notes for this manifest..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Test Category</label>
                    <select
                      value={formData.defaultTestCategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, defaultTestCategory: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {testCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.rushAll}
                        onChange={(e) => setFormData(prev => ({ ...prev, rushAll: e.target.checked }))}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium">Rush All Samples</span>
                      <Zap className="w-4 h-4 text-red-600" />
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.dpmEarlyStartAll}
                        onChange={(e) => setFormData(prev => ({ ...prev, dpmEarlyStartAll: e.target.checked }))}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium">DPM Early Start All</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sample Types</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={formData.defaultSampleType}
                  onChange={(e) => setFormData(prev => ({ ...prev, defaultSampleType: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select default type...</option>
                  {sampleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  onClick={() => applyToAllSamples('sampleType')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Apply to All
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {selectedManifest.samples.map((sample, idx) => {
                const sampleData = formData.samples[idx] || {};
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{sample.itemName}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-mono">Tag: ...{sample.metrcTag.slice(-5)}</span>
                          <span className="mx-2">•</span>
                          <span>{sample.itemCategory}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <select
                          value={sampleData.nctlSampleType || ''}
                          onChange={(e) => updateSampleData(idx, 'nctlSampleType', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select type...</option>
                          {sampleTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      {sampleData.isRush && <Zap className="w-4 h-4 text-red-600" title="Rush" />}
                      {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">DPM</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Testing Requirements</h2>
            <div className="space-y-4">
              {selectedManifest.samples.map((sample, idx) => {
                const sampleData = formData.samples[idx] || {};
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="mb-3">
                      <h4 className="font-medium">{sample.itemName}</h4>
                      <div className="text-sm text-gray-600">
                        <span className="font-mono">...{sample.metrcTag.slice(-5)}</span>
                        <span className="mx-2">•</span>
                        <span>{sampleData.nctlSampleType || 'No type selected'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Test Category</label>
                        <select
                          value={sampleData.testCategory || ''}
                          onChange={(e) => updateSampleData(idx, 'testCategory', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          {testCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={sampleData.isRush || false}
                            onChange={(e) => updateSampleData(idx, 'isRush', e.target.checked)}
                            className="h-3 w-3 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          />
                          <span>Rush</span>
                          <Zap className="w-3 h-3 text-red-600" />
                        </label>
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={sampleData.dpmEarlyStart || false}
                            onChange={(e) => updateSampleData(idx, 'dpmEarlyStart', e.target.checked)}
                            className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <span>DPM Early Start</span>
                        </label>
                      </div>
                    </div>

                    {/* Deadline Summary */}
                    {sampleData.groupedDeadlines?.hasVariability && (
                      <div className="border rounded p-2 mb-3 bg-orange-50">
                        <div className="flex items-center text-xs">
                          <AlertCircle className="w-3 h-3 text-orange-600 mr-1" />
                          <span className="font-medium">Variable Deadlines:</span>
                          <span className="ml-2">
                            Micro: {sampleData.microDue ? new Date(sampleData.microDue).toLocaleDateString() : 'N/A'} | 
                            Chem: {sampleData.chemistryDue ? new Date(sampleData.chemistryDue).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Selected Assays</h5>
                      <div className="grid grid-cols-3 gap-2">
                        {assayOptions.map(assay => (
                          <label key={assay.key} className="flex items-center space-x-1 text-xs">
                            <input
                              type="checkbox"
                              checked={sampleData.assays?.[assay.key] || false}
                              onChange={(e) => updateSampleAssay(idx, assay.key, e.target.checked)}
                              className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span>{assay.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Submit</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4">Manifest Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{selectedManifest.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Manifest:</span>
                  <span className="font-medium">{selectedManifest.manifestNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Samples:</span>
                  <span className="font-medium">{selectedManifest.samples.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rush Samples:</span>
                  <span className="font-medium">
                    {Object.values(formData.samples).filter(s => s.isRush).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DPM Early Start:</span>
                  <span className="font-medium">
                    {Object.values(formData.samples).filter(s => s.dpmEarlyStart).length}
                  </span>
                </div>
              </div>

              {formData.manifestNotes && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700">Notes:</h4>
                  <p className="mt-1 text-sm text-gray-600">{formData.manifestNotes}</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Sample Details</h4>
                <div className="space-y-2">
                  {selectedManifest.samples.map((sample, idx) => {
                    const sampleData = formData.samples[idx] || {};
                    return (
                      <div key={idx} className="text-sm flex items-center justify-between">
                        <div>
                          <span className="font-medium">{sample.itemName}</span>
                          <div className="text-xs text-gray-600">
                            Type: {sampleData.nctlSampleType || 'Not specified'} • 
                            Category: {sampleData.testCategory}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {sampleData.isRush && <Zap className="w-3 h-3 text-red-600" />}
                          {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">DPM</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Metrc Receiving - Guided Workflow</h1>
        <p className="text-sm text-gray-600 mt-1">Step-by-step manifest processing</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-blue-600 text-white' : 
                      isCompleted ? 'bg-green-600 text-white' : 
                      'bg-gray-200 text-gray-400'}
                  `}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`
                    mt-2 text-xs font-medium
                    ${isActive ? 'text-blue-600' : 
                      isCompleted ? 'text-green-600' : 
                      'text-gray-400'}
                  `}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-2 mt-[-20px]
                    ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md
            ${currentStep === 1 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'}
          `}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentStep === steps.length ? (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
            <span>Submit Manifest</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentStep === 1 && !selectedManifest}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md
              ${currentStep === 1 && !selectedManifest
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Receiving3;