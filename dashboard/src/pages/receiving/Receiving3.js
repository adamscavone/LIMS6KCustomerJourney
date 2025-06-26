/**
 * Receiving3 - Guided Workflow for Metrc Manifest Processing
 * 
 * This component implements a step-by-step wizard for receiving cannabis samples from Metrc manifests.
 * Key features:
 * - Flexible test category management (acknowledges air-gapped Metrc changes)
 * - Granular bulk actions for rush orders, DPM Early Start, and terpenes testing
 * - Three-tier deadline management system (category → assay → manual override)
 * - Auto-population of deadlines based on assay-specific turnaround times
 * - Smart rush sample counting that includes early deadline detection
 * 
 * Design Philosophy:
 * - Real-world lab operations drive UI decisions
 * - Progressive disclosure reduces complexity
 * - Flexibility over rigidity for edge cases
 * - Clear visual indicators for sample status
 * 
 * @see RECEIVING_WORKFLOW_DESIGN_DECISIONS.md for detailed rationale
 */

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
import { 
  ANALYTE_DEFINITIONS,
  getAnalytesForAssay,
  hasIndividualAnalytes
} from '../../utils/analyteDefinitions';

const Receiving3 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentState] = useState('Michigan'); // For demo purposes
  const [selectedManifest, setSelectedManifest] = useState(null);
  const [manifests, setManifests] = useState([]);
  const [formData, setFormData] = useState({
    manifestNotes: '',
    manifestNumber: '',
    defaultTestCategory: 'Dispensary Plant Material',
    defaultSampleType: '',
    rushAll: false,
    rushAllMicro: false,
    rushAllPotency: false,
    applyEarlyStartToDPM: false,
    applyTerpenesToAll: false,
    applyTerpenesToDPM: false,
    applyTerpenesToFlower: false,
    samples: {}
  });

  const steps = [
    { id: 1, name: 'Select Manifest', icon: Package },
    { id: 2, name: 'Manifest Details', icon: FileText },
    { id: 3, name: 'Sample Types', icon: Beaker },
    { id: 4, name: 'Required Tests', icon: ClipboardList },
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

  /**
   * Initialize sample data when a manifest is selected
   * This is where bulk actions from Step 2 are applied to all samples
   */
  const selectManifest = (manifest) => {
    setSelectedManifest(manifest);
    // Allow manifest number editing for Metrc corrections
    setFormData(prev => ({ ...prev, manifestNumber: manifest.manifestNumber }));
    // Initialize sample data
    const sampleData = {};
    const defaultAssays = getDefaultAssays(formData.defaultTestCategory);
    
    manifest.samples.forEach((sample, idx) => {
      let assays = { ...defaultAssays };
      
      // Apply terpenes based on bulk settings
      if (formData.applyTerpenesToAll || 
          (formData.applyTerpenesToDPM && formData.defaultTestCategory === 'Dispensary Plant Material') ||
          (formData.applyTerpenesToFlower && (sample.itemCategory === 'Buds' || sample.itemCategory === 'Flower'))) {
        assays.terpenes = true;
      }
      
      const isRushMicro = formData.rushAll || formData.rushAllMicro;
      const isRushChem = formData.rushAll || formData.rushAllPotency;
      
      const groupedDeadlines = getGroupedDeadlines(
        manifest.createdDate, 
        assays, 
        formData.rushAll
      );
      
      // Initialize assay deadlines for default assays
      const assayDeadlines = {};
      Object.entries(assays).forEach(([assayKey, isSelected]) => {
        if (isSelected) {
          const microAssays = ['salmonella', 'stec', 'totalYeastMold', 'aspergillus', 'totalAerobicBacteria', 'totalColiforms', 'btgn', 'ecoli'];
          const isRushForAssay = microAssays.includes(assayKey) ? isRushMicro : isRushChem;
          assayDeadlines[assayKey] = calculateAssayDeadline(manifest.createdDate, assayKey, isRushForAssay);
        }
      });
      
      sampleData[idx] = {
        nctlSampleType: formData.defaultSampleType,
        testCategory: formData.defaultTestCategory,
        assays: assays,
        isRush: formData.rushAll,
        isRushMicro: isRushMicro,
        isRushPotency: isRushChem,
        dpmEarlyStart: formData.applyEarlyStartToDPM && formData.defaultTestCategory === 'Dispensary Plant Material',
        microDue: getSuggestedMicroDeadline(manifest.createdDate, assays, isRushMicro),
        chemistryDue: getSuggestedChemistryDeadline(manifest.createdDate, assays, isRushChem),
        groupedDeadlines: groupedDeadlines,
        assayDeadlines: assayDeadlines,
        isRetest: false,
        whitelistedAnalytes: {}
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

  /**
   * Handle individual assay selection and auto-populate deadline
   * Deadlines are calculated based on:
   * - Manifest received date
   * - Assay-specific turnaround time
   * - Whether rush is applied (micro rush vs chemistry rush)
   */
  const updateSampleAssay = (sampleIdx, assayKey, value) => {
    if (!selectedManifest) return;
    
    setFormData(prev => {
      const updatedSample = { ...prev.samples[sampleIdx] };
      updatedSample.assays = { ...updatedSample.assays, [assayKey]: value };
      
      // Initialize assay deadline if checking the box
      if (value) {
        if (!updatedSample.assayDeadlines) updatedSample.assayDeadlines = {};
        const microAssays = ['salmonella', 'stec', 'totalYeastMold', 'aspergillus', 'totalAerobicBacteria', 'totalColiforms', 'btgn', 'ecoli'];
        const isRush = microAssays.includes(assayKey) ? updatedSample.isRushMicro : updatedSample.isRushPotency;
        updatedSample.assayDeadlines[assayKey] = calculateAssayDeadline(selectedManifest.createdDate, assayKey, isRush);
      } else if (updatedSample.assayDeadlines) {
        // Remove deadline if unchecking
        delete updatedSample.assayDeadlines[assayKey];
      }
      
      // Recalculate deadlines
      const groupedDeadlines = getGroupedDeadlines(
        selectedManifest.createdDate,
        updatedSample.assays,
        updatedSample.isRush
      );
      
      updatedSample.microDue = getSuggestedMicroDeadline(selectedManifest.createdDate, updatedSample.assays, updatedSample.isRushMicro);
      updatedSample.chemistryDue = getSuggestedChemistryDeadline(selectedManifest.createdDate, updatedSample.assays, updatedSample.isRushPotency);
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

  const updateAssayDeadline = (sampleIdx, assayKey, deadline) => {
    setFormData(prev => ({
      ...prev,
      samples: {
        ...prev.samples,
        [sampleIdx]: {
          ...prev.samples[sampleIdx],
          assayDeadlines: {
            ...prev.samples[sampleIdx].assayDeadlines,
            [assayKey]: deadline
          }
        }
      }
    }));
  };

  const applyDeadlineToCategory = (sampleIdx, category, deadline) => {
    const microAssays = ['salmonella', 'stec', 'totalYeastMold', 'aspergillus', 'totalAerobicBacteria', 'totalColiforms', 'btgn', 'ecoli'];
    const chemAssays = ['cannabinoids', 'terpenes', 'pesticides', 'mycotoxins', 'heavyMetals', 'elementalAnalysis', 'residualSolvents'];
    const otherAssays = ['moistureContent', 'waterActivity', 'foreignMatter', 'geneticSequencing', 'plantPathogens', 'plantSex'];
    
    let assaysToUpdate = [];
    if (category === 'micro') assaysToUpdate = microAssays;
    else if (category === 'chem') assaysToUpdate = chemAssays;
    else if (category === 'other') assaysToUpdate = otherAssays;
    
    setFormData(prev => {
      const updatedSample = { ...prev.samples[sampleIdx] };
      if (!updatedSample.assayDeadlines) updatedSample.assayDeadlines = {};
      
      assaysToUpdate.forEach(assayKey => {
        if (updatedSample.assays[assayKey]) {
          updatedSample.assayDeadlines[assayKey] = deadline;
        }
      });
      
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
        nctlSampleType: formData.defaultSampleType
      };
    });
    setFormData(prev => ({ ...prev, samples: updatedSamples }));
  };

  /**
   * Smart rush detection - counts samples with ANY deadline earlier than default
   * This captures manual deadline adjustments that effectively make a sample "rush"
   * even if rush flags aren't explicitly set
   */
  const hasEarlyDeadlines = (sampleData) => {
    if (!selectedManifest || !sampleData.assayDeadlines) return false;
    
    // Check each assay deadline against its default
    for (const [assayKey, customDeadline] of Object.entries(sampleData.assayDeadlines)) {
      if (sampleData.assays[assayKey] && customDeadline) {
        const defaultDeadline = calculateAssayDeadline(selectedManifest.createdDate, assayKey, false);
        if (new Date(customDeadline) < new Date(defaultDeadline)) {
          return true;
        }
      }
    }
    
    return false;
  };

  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toISOString().slice(0, 16);
    } catch (e) {
      return '';
    }
  };

  const handleSubmit = () => {
    console.log('Submitting manifest data:', formData);
    // Reset for next manifest
    setCurrentStep(1);
    setSelectedManifest(null);
    setFormData({
      manifestNotes: '',
      manifestNumber: '',
      defaultTestCategory: 'Dispensary Plant Material',
      defaultSampleType: '',
      rushAll: false,
      rushAllMicro: false,
      rushAllPotency: false,
      applyEarlyStartToDPM: false,
      applyTerpenesToAll: false,
      applyTerpenesToDPM: false,
      applyTerpenesToFlower: false,
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
                  <input
                    type="text"
                    value={formData.manifestNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, manifestNumber: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
                  />
                </div>
              </div>

              <div className="space-y-4">

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Bulk Actions for All Samples</h3>
                  
                  {/* Rush Options */}
                  <div className="bg-red-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Rush Order Options
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.rushAll}
                          onChange={(e) => setFormData(prev => ({ ...prev, rushAll: e.target.checked }))}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="text-sm">Rush All Assays for All Samples</span>
                      </label>
                      <label className="flex items-center space-x-2 ml-4">
                        <input
                          type="checkbox"
                          checked={formData.rushAll || formData.rushAllMicro}
                          onChange={(e) => setFormData(prev => ({ ...prev, rushAllMicro: e.target.checked }))}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          disabled={formData.rushAll}
                        />
                        <span className="text-sm">Rush All Micro</span>
                      </label>
                      <label className="flex items-center space-x-2 ml-4">
                        <input
                          type="checkbox"
                          checked={formData.rushAll || formData.rushAllPotency}
                          onChange={(e) => setFormData(prev => ({ ...prev, rushAllPotency: e.target.checked }))}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          disabled={formData.rushAll}
                        />
                        <span className="text-sm">Rush All Potency (Cannabinoids)</span>
                      </label>
                    </div>
                  </div>

                  {/* DPM Early Start - compensates for lack of Metrc indicators */}
                  <div className="bg-purple-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-purple-800 mb-2">DPM Early Start</h4>
                    <label className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.applyEarlyStartToDPM}
                        onChange={(e) => setFormData(prev => ({ ...prev, applyEarlyStartToDPM: e.target.checked }))}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                      />
                      <div className="text-sm">
                        <span className="font-medium">Apply Early Start to All Dispensary Plant Material Samples</span>
                        <p className="text-xs text-gray-600 mt-1">
                          Enables chemistry testing while microbial tests are in progress
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Terpenes Options */}
                  <div className="bg-green-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-green-800 mb-2">Terpenes Testing</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.applyTerpenesToAll}
                          onChange={(e) => setFormData(prev => ({ ...prev, applyTerpenesToAll: e.target.checked }))}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm">Apply Terpenes to All Samples</span>
                      </label>
                      <label className="flex items-center space-x-2 ml-4">
                        <input
                          type="checkbox"
                          checked={formData.applyTerpenesToDPM}
                          onChange={(e) => setFormData(prev => ({ ...prev, applyTerpenesToDPM: e.target.checked }))}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          disabled={formData.applyTerpenesToAll}
                        />
                        <span className="text-sm">Apply Terpenes to All DPM Samples</span>
                      </label>
                      <label className="flex items-center space-x-2 ml-4">
                        <input
                          type="checkbox"
                          checked={formData.applyTerpenesToFlower}
                          onChange={(e) => setFormData(prev => ({ ...prev, applyTerpenesToFlower: e.target.checked }))}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          disabled={formData.applyTerpenesToAll}
                        />
                        <span className="text-sm">Apply Terpenes to All Flower Samples</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manifest Notes</label>
                  <textarea
                    value={formData.manifestNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, manifestNotes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Enter any special instructions or notes for this manifest..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Assign Sample Type(s)</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={formData.defaultSampleType}
                  onChange={(e) => setFormData(prev => ({ ...prev, defaultSampleType: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Type</option>
                  {sampleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  onClick={() => applyToAllSamples('sampleType')}
                  disabled={!formData.defaultSampleType}
                  className={`px-4 py-2 rounded-md text-sm ${
                    formData.defaultSampleType 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
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
                      {sampleData.isRushMicro && !sampleData.isRush && <span className="text-red-600 text-xs font-bold">RUSH-M</span>}
                      {sampleData.isRushPotency && !sampleData.isRush && <span className="text-red-600 text-xs font-bold">RUSH-P</span>}
                      {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">EARLY</span>}
                      {sampleData.assays?.terpenes && <span className="text-green-600 text-xs font-bold">TERP</span>}
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
            <h2 className="text-xl font-semibold">Required Tests</h2>
            <div className="space-y-4">
              {selectedManifest.samples.map((sample, idx) => {
                const sampleData = formData.samples[idx] || {};
                const microAssays = [
                  { key: 'salmonella', name: 'Salmonella' },
                  { key: 'stec', name: 'STEC' },
                  { key: 'totalAerobicBacteria', name: 'Total Aerobic' },
                  { key: 'totalColiforms', name: 'Total Coliforms' },
                  { key: 'totalYeastMold', name: 'Total Yeast & Mold' },
                  { key: 'btgn', name: 'BTGN' }
                ];
                const chemAssays = [
                  { key: 'cannabinoids', name: 'Cannabinoids' },
                  { key: 'terpenes', name: 'Terpenes' },
                  { key: 'pesticides', name: 'Pesticides' },
                  { key: 'mycotoxins', name: 'Mycotoxins' },
                  { key: 'heavyMetals', name: 'Heavy Metals' },
                  { key: 'residualSolvents', name: 'Residual Solvents' }
                ];
                const otherAssays = [
                  { key: 'moistureContent', name: 'Moisture Content' },
                  { key: 'waterActivity', name: 'Water Activity' },
                  { key: 'foreignMatter', name: 'Foreign Matter' },
                  { key: 'geneticSequencing', name: 'Genetic Sequencing' }
                ];

                return (
                  <div key={idx} className={`bg-white p-4 rounded-lg border ${
                    sampleData.isRetest ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
                  }`}>
                    <div className="mb-3">
                      <h4 className="font-medium flex items-center">
                        {sample.itemName}
                        {sampleData.isRetest && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
                            RETEST
                          </span>
                        )}
                      </h4>
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
                        {currentState === 'Michigan' && (
                          <label className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              checked={sampleData.isRetest || false}
                              onChange={(e) => {
                                const isRetest = e.target.checked;
                                setFormData(prev => {
                                  const updatedSample = { ...prev.samples[idx] };
                                  updatedSample.isRetest = isRetest;
                                  if (isRetest) {
                                    updatedSample.whitelistedAnalytes = {};
                                    Object.entries(updatedSample.assays || {}).forEach(([assayKey, isSelected]) => {
                                      if (isSelected) {
                                        updatedSample.whitelistedAnalytes[assayKey] = [];
                                      }
                                    });
                                  } else {
                                    updatedSample.whitelistedAnalytes = {};
                                  }
                                  return {
                                    ...prev,
                                    samples: {
                                      ...prev.samples,
                                      [idx]: updatedSample
                                    }
                                  };
                                });
                              }}
                              className="h-3 w-3 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                            />
                            <span>Michigan Retest</span>
                            <Info className="w-3 h-3 text-yellow-600" title="Single-analyte testing only" />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Michigan Retest Analyte Selection */}
                    {currentState === 'Michigan' && sampleData.isRetest && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                          Select Specific Analytes for Retest
                        </h5>
                        <div className="space-y-3">
                          {Object.entries(sampleData.assays || {}).filter(([_, isSelected]) => isSelected).map(([assayKey]) => {
                            const analytes = getAnalytesForAssay(assayKey);
                            const whitelisted = sampleData.whitelistedAnalytes?.[assayKey] || [];
                            
                            if (analytes.length === 0) return null;
                            
                            return (
                              <div key={assayKey} className="border border-gray-200 rounded p-2 bg-white">
                                <h6 className="text-xs font-medium text-gray-700 mb-2">
                                  {getAssayDisplayName(assayKey)}
                                  {whitelisted.length > 0 && (
                                    <span className="ml-2 text-yellow-600">
                                      ({whitelisted.length} selected)
                                    </span>
                                  )}
                                </h6>
                                <div className="grid grid-cols-4 gap-2">
                                  {analytes.map(analyte => (
                                    <label 
                                      key={analyte.key} 
                                      className={`flex items-center space-x-1 p-1 rounded text-xs cursor-pointer ${
                                        whitelisted.includes(analyte.key) ? 'bg-yellow-100 border border-yellow-300' : 'hover:bg-gray-50 border border-gray-200'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={whitelisted.includes(analyte.key)}
                                        onChange={(e) => {
                                          setFormData(prev => {
                                            const updatedSample = { ...prev.samples[idx] };
                                            if (!updatedSample.whitelistedAnalytes[assayKey]) {
                                              updatedSample.whitelistedAnalytes[assayKey] = [];
                                            }
                                            
                                            if (e.target.checked) {
                                              if (!updatedSample.whitelistedAnalytes[assayKey].includes(analyte.key)) {
                                                updatedSample.whitelistedAnalytes[assayKey].push(analyte.key);
                                              }
                                            } else {
                                              updatedSample.whitelistedAnalytes[assayKey] = updatedSample.whitelistedAnalytes[assayKey].filter(a => a !== analyte.key);
                                            }
                                            
                                            return {
                                              ...prev,
                                              samples: {
                                                ...prev.samples,
                                                [idx]: updatedSample
                                              }
                                            };
                                          });
                                        }}
                                        className="h-3 w-3 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                      />
                                      <span title={analyte.fullName}>
                                        {analyte.name}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Assay Deadline Table */}
                    <div className="border rounded overflow-hidden">
                      {/* Microbial Testing */}
                      <div className="bg-blue-50 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium text-blue-900">Microbial Testing</h5>
                          <div className="flex items-center space-x-2">
                            <input
                              type="datetime-local"
                              value={formatDateTimeForInput(sampleData.microDue)}
                              onChange={(e) => applyDeadlineToCategory(idx, 'micro', e.target.value)}
                              className="px-2 py-1 border border-blue-300 rounded text-xs"
                            />
                            <button
                              onClick={() => applyDeadlineToCategory(idx, 'micro', sampleData.microDue)}
                              className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                            >
                              Apply to All Micro
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {microAssays.map(assay => (
                            <div key={assay.key} className="flex items-center space-x-2 bg-white p-2 rounded">
                              <input
                                type="checkbox"
                                checked={sampleData.assays?.[assay.key] || false}
                                onChange={(e) => updateSampleAssay(idx, assay.key, e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-sm flex-1">{assay.name}</span>
                              {sampleData.assays?.[assay.key] && (
                                <input
                                  type="datetime-local"
                                  value={formatDateTimeForInput(sampleData.assayDeadlines?.[assay.key])}
                                  onChange={(e) => updateAssayDeadline(idx, assay.key, e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-xs w-40"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chemistry Testing */}
                      <div className="bg-green-50 p-3 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium text-green-900">Chemistry Testing</h5>
                          <div className="flex items-center space-x-2">
                            <input
                              type="datetime-local"
                              value={formatDateTimeForInput(sampleData.chemistryDue)}
                              onChange={(e) => applyDeadlineToCategory(idx, 'chem', e.target.value)}
                              className="px-2 py-1 border border-green-300 rounded text-xs"
                            />
                            <button
                              onClick={() => applyDeadlineToCategory(idx, 'chem', sampleData.chemistryDue)}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                            >
                              Apply to All Chem
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {chemAssays.map(assay => (
                            <div key={assay.key} className="flex items-center space-x-2 bg-white p-2 rounded">
                              <input
                                type="checkbox"
                                checked={sampleData.assays?.[assay.key] || false}
                                onChange={(e) => updateSampleAssay(idx, assay.key, e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              />
                              <span className="text-sm flex-1">{assay.name}</span>
                              {sampleData.assays?.[assay.key] && (
                                <input
                                  type="datetime-local"
                                  value={formatDateTimeForInput(sampleData.assayDeadlines?.[assay.key])}
                                  onChange={(e) => updateAssayDeadline(idx, assay.key, e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-xs w-40"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Other Testing */}
                      <div className="bg-gray-50 p-3 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium text-gray-900">Other Testing</h5>
                          <div className="flex items-center space-x-2">
                            <input
                              type="datetime-local"
                              className="px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                            <button
                              onClick={() => applyDeadlineToCategory(idx, 'other', document.querySelector(`[data-other-deadline-${idx}]`)?.value)}
                              className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                              data-other-deadline-idx={idx}
                            >
                              Apply to All Other
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {otherAssays.map(assay => (
                            <div key={assay.key} className="flex items-center space-x-2 bg-white p-2 rounded">
                              <input
                                type="checkbox"
                                checked={sampleData.assays?.[assay.key] || false}
                                onChange={(e) => updateSampleAssay(idx, assay.key, e.target.checked)}
                                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                              />
                              <span className="text-sm flex-1">{assay.name}</span>
                              {sampleData.assays?.[assay.key] && (
                                <input
                                  type="datetime-local"
                                  value={formatDateTimeForInput(sampleData.assayDeadlines?.[assay.key])}
                                  onChange={(e) => updateAssayDeadline(idx, assay.key, e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-xs w-40"
                                />
                              )}
                            </div>
                          ))}
                        </div>
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
                  <span className="font-medium">{formData.manifestNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Samples:</span>
                  <span className="font-medium">{selectedManifest.samples.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rush Samples:</span>
                  <span className="font-medium">
                    {Object.values(formData.samples).filter(s => s.isRush || s.isRushMicro || s.isRushPotency || hasEarlyDeadlines(s)).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DPM Early Start:</span>
                  <span className="font-medium">
                    {Object.values(formData.samples).filter(s => s.dpmEarlyStart).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Terpenes Testing:</span>
                  <span className="font-medium">
                    {Object.values(formData.samples).filter(s => s.assays?.terpenes).length}
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
                          {sampleData.isRushMicro && !sampleData.isRush && <span className="text-red-600 text-xs">M-RUSH</span>}
                          {sampleData.isRushPotency && !sampleData.isRush && <span className="text-red-600 text-xs">P-RUSH</span>}
                          {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">EARLY</span>}
                          {sampleData.assays?.terpenes && <span className="text-green-600 text-xs">TERP</span>}
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