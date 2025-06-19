import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Building2,
  Hash,
  AlertCircle,
  Zap,
  Info,
  Settings,
  Save,
  CheckSquare,
  Square,
  Activity,
  FileText,
  Beaker,
  ChevronUp,
  Eye,
  EyeOff,
  FlaskConical,
  Users,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { 
  calculateAssayDeadline, 
  getAllAssayDeadlines, 
  getGroupedDeadlines,
  getSuggestedMicroDeadline,
  getSuggestedChemistryDeadline,
  getDefaultAssays,
  getAssayDisplayName,
  TEST_CATEGORY_DEFAULTS,
  ASSAY_TURNAROUND_TIMES
} from '../../utils/assayDeadlines';

const Receiving2 = () => {
  const [selectedState, setSelectedState] = useState('ohio');
  const [manifests, setManifests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [expandedManifests, setExpandedManifests] = useState({});
  const [manifestData, setManifestData] = useState({});
  const [selectedSamples, setSelectedSamples] = useState({});
  const [showDetailedDeadlines, setShowDetailedDeadlines] = useState(false);
  const [showCustomDeadlines, setShowCustomDeadlines] = useState(false);
  const [customDeadlines, setCustomDeadlines] = useState({});
  const [globalSettings, setGlobalSettings] = useState({
    testCategory: 'Dispensary Plant Material',
    nctlSampleType: '',
    dpmEarlyStart: false,
    rushTurnaround: false,
    microDue: '',
    chemistryDue: '',
    otherDue: '',
    allAssays: getDefaultAssays('Dispensary Plant Material')
  });

  // Sample type options
  const sampleTypes = [
    'Flower', 'Shake/Trim', 'Concentrate', 'Rosin', 'Resin', 
    'Vape Cart', 'Gummy', 'Brownie', 'Tincture', 'Chocolate',
    'Cookie', 'Beverage', 'Capsule', 'Oil', 'Topical',
    'Pre-Roll', 'Infused Pre-Roll', 'Hash', 'Kief', 'Isolate'
  ];

  // Get default sample type based on Metrc category and item name
  const getDefaultSampleType = (metrcCategory, itemName) => {
    // First check Metrc category mappings
    const categoryMappings = {
      'Buds': 'Flower',
      'Vape Cartridge': 'Vape Cart',
      'Concentrate': 'Concentrate',
      'Pre-Roll': 'Pre-Roll'
    };
    
    if (categoryMappings[metrcCategory]) {
      return categoryMappings[metrcCategory];
    }
    
    // Then check item name for specific keywords
    const itemNameLower = itemName.toLowerCase();
    if (itemNameLower.includes('gummy') || itemNameLower.includes('gummies')) {
      return 'Gummy';
    }
    if (itemNameLower.includes('chocolate')) {
      return 'Chocolate';
    }
    if (itemNameLower.includes('pre-roll') || itemNameLower.includes('preroll')) {
      return 'Pre-Roll';
    }
    
    // Default to empty if no match
    return '';
  };

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
      },
      {
        manifestId: 'M-2025-003',
        manifestNumber: '0000012347',
        createdDate: '2025-06-13T10:30:00',
        client: 'Ohio Natural Wellness',
        driver: { name: 'David Lee', eta: '2025-06-13T13:00:00' },
        status: 'in_transit',
        samples: [
          { metrcTag: 'GHI123456789', strain: 'Gorilla Glue', itemName: 'GG4 Flower - 3.5g', itemCategory: 'Buds' },
          { metrcTag: 'GHI123456790', strain: 'Sour Diesel', itemName: 'Sour D Pre-Roll - 1g', itemCategory: 'Pre-Roll' }
        ]
      }
    ];
    setManifests(mockManifests);
  }, []);

  // Toggle manifest expansion
  const toggleManifest = (manifestId) => {
    setExpandedManifests(prev => ({
      ...prev,
      [manifestId]: !prev[manifestId]
    }));
  };

  // Handle sample selection
  const toggleSampleSelection = (manifestId, sampleIdx) => {
    const key = `${manifestId}-${sampleIdx}`;
    setSelectedSamples(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Select all samples in a manifest
  const selectAllSamples = (manifestId, samples) => {
    const newSelections = {};
    const allSelected = samples.every((_, idx) => selectedSamples[`${manifestId}-${idx}`]);
    
    samples.forEach((_, idx) => {
      const key = `${manifestId}-${idx}`;
      newSelections[key] = !allSelected;
    });
    
    setSelectedSamples(prev => ({ ...prev, ...newSelections }));
  };

  // Apply global settings to selected samples
  const applyGlobalSettings = () => {
    const updatedData = { ...manifestData };
    let configuredCount = 0;
    
    Object.keys(selectedSamples).forEach(key => {
      if (selectedSamples[key]) {
        const [manifestId, sampleIdx] = key.split('-');
        const manifest = manifests.find(m => m.manifestId === manifestId);
        
        if (!updatedData[manifestId]) {
          updatedData[manifestId] = { samples: {} };
        }
        if (!updatedData[manifestId].samples[parseInt(sampleIdx)]) {
          updatedData[manifestId].samples[parseInt(sampleIdx)] = {};
        }
        
        const sample = updatedData[manifestId].samples[parseInt(sampleIdx)];
        sample.testCategory = globalSettings.testCategory;
        
        // Only update sample type if a global one is selected
        if (globalSettings.nctlSampleType) {
          sample.nctlSampleType = globalSettings.nctlSampleType;
        } else if (!sample.nctlSampleType && manifest && manifest.samples) {
          // Set default sample type if none exists
          const manifestSample = manifest.samples[parseInt(sampleIdx)];
          if (manifestSample) {
            sample.nctlSampleType = getDefaultSampleType(manifestSample.itemCategory, manifestSample.itemName);
          }
        }
        
        sample.dpmEarlyStart = globalSettings.dpmEarlyStart;
        sample.isRush = globalSettings.rushTurnaround;
        sample.assays = { ...globalSettings.allAssays };
        
        // Calculate deadlines if manifest exists
        if (manifest) {
          // Apply custom deadlines if set
          const assaysWithCustomDeadlines = { ...globalSettings.allAssays };
          const customDeadlineData = {};
          
          Object.entries(customDeadlines).forEach(([assayKey, deadline]) => {
            if (deadline && assaysWithCustomDeadlines[assayKey]) {
              customDeadlineData[assayKey] = deadline;
            }
          });
          
          // Calculate default deadlines
          const microDeadline = getSuggestedMicroDeadline(manifest.createdDate, globalSettings.allAssays, globalSettings.rushTurnaround);
          const chemDeadline = getSuggestedChemistryDeadline(manifest.createdDate, globalSettings.allAssays, globalSettings.rushTurnaround);
          const groupedDeadlines = getGroupedDeadlines(manifest.createdDate, globalSettings.allAssays, globalSettings.rushTurnaround);
          
          sample.microDue = globalSettings.microDue || microDeadline || '';
          sample.chemistryDue = globalSettings.chemistryDue || chemDeadline || '';
          sample.otherDue = globalSettings.otherDue || '';
          sample.groupedDeadlines = groupedDeadlines;
          sample.earliestDeadline = groupedDeadlines.earliestDeadline || '';
          sample.customDeadlines = customDeadlineData;
          sample.applied = true;
          configuredCount++;
        }
      }
    });
    
    setManifestData(updatedData);
    
    // Show success message and navigate to next step
    if (configuredCount > 0) {
      alert(`Successfully configured ${configuredCount} samples. Click OK to proceed to review.`);
      // In a real app, this would navigate to the next step/page
      // For now, we'll just clear the selection to indicate completion
      setSelectedSamples({});
    }
  };

  // Calculate selected count
  const selectedCount = Object.values(selectedSamples).filter(Boolean).length;
  const totalSampleCount = manifests.reduce((sum, m) => sum + m.samples.length, 0);

  // Check if settings have been applied to a sample
  const isSampleConfigured = (manifestId, sampleIdx) => {
    return manifestData[manifestId]?.samples?.[sampleIdx]?.applied === true;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Metrc Receiving - Batch Control</h1>
            <p className="text-sm text-gray-600 mt-1">Apply settings to multiple samples at once</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="ohio">Ohio</option>
              <option value="michigan">Michigan</option>
            </select>
            <button
              onClick={() => setRefreshing(!refreshing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 ${selectedCount === 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-full font-semibold`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Select Samples</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 ${selectedCount > 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-full font-semibold`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Configure Tests</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full font-semibold">
              3
            </div>
            <span className="ml-2 text-sm font-medium">Review & Continue</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Sample Selection */}
        <div className="lg:col-span-3">
          {/* Selection Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {selectedCount} of {totalSampleCount} samples selected
                </span>
              </div>
              {selectedCount > 0 && (
                <button
                  onClick={() => setSelectedSamples({})}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {/* Manifests List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Select Samples from Manifests
            </h2>
            
            {manifests.map(manifest => {
              const isExpanded = expandedManifests[manifest.manifestId];
              const manifestSelectedCount = manifest.samples.filter((_, idx) => 
                selectedSamples[`${manifest.manifestId}-${idx}`]
              ).length;
              const allManifestSelected = manifestSelectedCount === manifest.samples.length;
              
              return (
                <div key={manifest.manifestId} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleManifest(manifest.manifestId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={allManifestSelected && manifest.samples.length > 0}
                            onChange={(e) => {
                              e.stopPropagation();
                              selectAllSamples(manifest.manifestId, manifest.samples);
                            }}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{manifest.client}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Manifest: {manifest.manifestNumber}</span>
                            <span>{manifest.samples.length} samples</span>
                            {manifestSelectedCount > 0 && (
                              <span className="text-blue-600 font-medium">
                                {manifestSelectedCount} selected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        ETA: {new Date(manifest.driver.eta).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                            <th className="py-3 px-4 text-left w-12">
                              <CheckSquare className="w-4 h-4" />
                            </th>
                            <th className="py-3 px-4 text-left">Sample Details</th>
                            <th className="py-3 px-4 text-left">Metrc Category</th>
                            <th className="py-3 px-4 text-left">Test Category</th>
                            <th className="py-3 px-4 text-left">Sample Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {manifest.samples.map((sample, idx) => {
                            const sampleKey = `${manifest.manifestId}-${idx}`;
                            const isSelected = selectedSamples[sampleKey];
                            const isConfigured = isSampleConfigured(manifest.manifestId, idx);
                            const sampleData = manifestData[manifest.manifestId]?.samples?.[idx] || {};
                            
                            return (
                              <tr key={idx} className={`${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}>
                                <td className="py-3 px-4">
                                  <input
                                    type="checkbox"
                                    checked={isSelected || false}
                                    onChange={() => toggleSampleSelection(manifest.manifestId, idx)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <div className="font-medium text-gray-900">{sample.itemName}</div>
                                    <div className="text-xs text-gray-500">
                                      Tag: ...{sample.metrcTag.slice(-5)} | {sample.strain !== 'N/A' && `Strain: ${sample.strain}`}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {sample.itemCategory}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {sampleData.testCategory || globalSettings.testCategory || 'Dispensary Plant Material'}
                                </td>
                                <td className="py-3 px-4">
                                  <select
                                    value={sampleData.nctlSampleType || getDefaultSampleType(sample.itemCategory, sample.itemName)}
                                    onChange={(e) => {
                                      const updatedData = { ...manifestData };
                                      if (!updatedData[manifest.manifestId]) {
                                        updatedData[manifest.manifestId] = { samples: {} };
                                      }
                                      if (!updatedData[manifest.manifestId].samples[idx]) {
                                        updatedData[manifest.manifestId].samples[idx] = {};
                                      }
                                      updatedData[manifest.manifestId].samples[idx].nctlSampleType = e.target.value;
                                      setManifestData(updatedData);
                                    }}
                                    className="text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <option value="">Select...</option>
                                    {sampleTypes.map(type => (
                                      <option key={type} value={type}>{type}</option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Settings Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-blue-200 rounded-lg shadow-lg sticky top-6">
            {/* Settings Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold flex items-center">
                <FlaskConical className="w-5 h-5 mr-2" />
                Test Configuration
              </h2>
              <p className="text-sm text-blue-100 mt-1">
                Configure testing requirements for selected samples
              </p>
            </div>

            {/* Settings Body */}
            <div className="p-6 space-y-6">
              {/* Test Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Category
                </label>
                <select
                  value={globalSettings.testCategory}
                  onChange={(e) => {
                    const newCategory = e.target.value;
                    const defaultAssays = getDefaultAssays(newCategory);
                    setGlobalSettings(prev => ({ 
                      ...prev, 
                      testCategory: newCategory,
                      allAssays: defaultAssays
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Dispensary Plant Material">Dispensary Plant Material</option>
                  <option value="Non-Solvent Product (Not Previously Tested)">Non-Solvent Product (Not Previously Tested)</option>
                  <option value="Processed Product (Previously Tested)">Processed Product (Previously Tested)</option>
                  <option value="Solvent Based Product (Not Previously Tested)">Solvent Based Product (Not Previously Tested)</option>
                  <option value="Voluntary Testing - Terpenes (Plant Material)">Voluntary Testing - Terpenes (Plant Material)</option>
                </select>
              </div>

              {/* Sample Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Type (Apply to All)
                </label>
                <select
                  value={globalSettings.nctlSampleType}
                  onChange={(e) => setGlobalSettings(prev => ({ ...prev, nctlSampleType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Keep Individual Types...</option>
                  {sampleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Assay Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Required Assays</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-lg">
                  {Object.entries({
                    salmonella: 'Salmonella',
                    stec: 'STEC',
                    totalAerobicBacteria: 'Total Aerobic',
                    totalColiforms: 'Total Coliforms',
                    totalYeastMold: 'Total Yeast & Mold',
                    btgn: 'BTGN',
                    cannabinoids: 'Cannabinoids',
                    terpenes: 'Terpenes',
                    pesticides: 'Pesticides',
                    mycotoxins: 'Mycotoxins',
                    heavyMetals: 'Heavy Metals',
                    residualSolvents: 'Residual Solvents',
                    moistureContent: 'Moisture Content',
                    waterActivity: 'Water Activity',
                    foreignMatter: 'Foreign Matter'
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={globalSettings.allAssays[key] || false}
                        onChange={(e) => setGlobalSettings(prev => ({
                          ...prev,
                          allAssays: { ...prev.allAssays, [key]: e.target.checked }
                        }))}
                        className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-xs">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rush Options */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Turnaround Options</h3>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalSettings.rushTurnaround}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, rushTurnaround: e.target.checked }))}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Rush Turnaround</span>
                  <Zap className="w-4 h-4 text-red-600" />
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalSettings.dpmEarlyStart}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, dpmEarlyStart: e.target.checked }))}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">DPM Early Start</span>
                </label>
              </div>

              {/* Deadlines */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Deadlines/TATs
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Chemistry Due
                    <span className="ml-1 text-gray-400 cursor-help" title="Deadline for chemistry assays (HPLC, GCMS, LCMS, ICPMS methods). Individual assays may have different turnaround times.">
                      <Info className="w-3 h-3" />
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={globalSettings.chemistryDue || (() => {
                      const sampleManifest = manifests[0];
                      if (!sampleManifest) return '';
                      const suggested = getSuggestedChemistryDeadline(
                        sampleManifest.createdDate,
                        globalSettings.allAssays,
                        globalSettings.rushTurnaround
                      );
                      return suggested ? new Date(suggested).toISOString().slice(0, 16) : '';
                    })()}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, chemistryDue: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Microbial Due
                    <span className="ml-1 text-gray-400 cursor-help" title="Deadline for microbial assays (culture, petrifilm, PCR methods). Culture-based tests typically take longer than PCR.">
                      <Info className="w-3 h-3" />
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={globalSettings.microDue || (() => {
                      const sampleManifest = manifests[0];
                      if (!sampleManifest) return '';
                      const suggested = getSuggestedMicroDeadline(
                        sampleManifest.createdDate,
                        globalSettings.allAssays,
                        globalSettings.rushTurnaround
                      );
                      return suggested ? new Date(suggested).toISOString().slice(0, 16) : '';
                    })()}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, microDue: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Other Due
                    <span className="ml-1 text-gray-400 cursor-help" title="Deadline for other assays (moisture content, water activity, foreign matter, etc.) that don't fall under chemistry or microbial categories.">
                      <Info className="w-3 h-3" />
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={globalSettings.otherDue || ''}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, otherDue: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Individual Assay Deadlines Toggle */}
              <div>
                <button
                  onClick={() => setShowCustomDeadlines(!showCustomDeadlines)}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Edit Individual Assay Deadlines</span>
                  {showCustomDeadlines ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Individual Assay Deadlines */}
              {showCustomDeadlines && (
                <div className="space-y-3 max-h-64 overflow-y-auto p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-600 italic">Set specific deadlines for individual assays (overrides category deadlines)</p>
                  {Object.entries(globalSettings.allAssays).map(([assayKey, isSelected]) => {
                    if (!isSelected) return null;
                    const displayName = getAssayDisplayName(assayKey);
                    
                    return (
                      <div key={assayKey} className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">{displayName}</label>
                        <input
                          type="datetime-local"
                          value={customDeadlines[assayKey] || ''}
                          onChange={(e) => setCustomDeadlines(prev => ({
                            ...prev,
                            [assayKey]: e.target.value
                          }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Apply Button */}
              <div className="pt-6 border-t">
                <button
                  onClick={applyGlobalSettings}
                  disabled={selectedCount === 0}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-colors ${
                    selectedCount > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Apply & Continue</span>
                </button>
              </div>
            </div>
          </div>

          {/* Alternative Horizontal Test Configuration */}
          <div className="bg-white border-2 border-green-200 rounded-lg shadow-lg mt-6">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold flex items-center">
                <FlaskConical className="w-5 h-5 mr-2" />
                Test Configuration (Alternative Layout)
              </h2>
              <p className="text-sm text-green-100 mt-1">
                Same options in a more compact view
              </p>
            </div>

            {/* Body - Horizontal Layout */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Column 1: Basic Config */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Category
                    </label>
                    <select
                      value={globalSettings.testCategory}
                      onChange={(e) => {
                        const newCategory = e.target.value;
                        const defaultAssays = getDefaultAssays(newCategory);
                        setGlobalSettings(prev => ({ 
                          ...prev, 
                          testCategory: newCategory,
                          allAssays: defaultAssays
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Dispensary Plant Material">Dispensary Plant Material</option>
                      <option value="Non-Solvent Product (Not Previously Tested)">Non-Solvent Product (Not Previously Tested)</option>
                      <option value="Processed Product (Previously Tested)">Processed Product (Previously Tested)</option>
                      <option value="Solvent Based Product (Not Previously Tested)">Solvent Based Product (Not Previously Tested)</option>
                      <option value="Voluntary Testing - Terpenes (Plant Material)">Voluntary Testing - Terpenes (Plant Material)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sample Type (Apply to All)
                    </label>
                    <select
                      value={globalSettings.nctlSampleType}
                      onChange={(e) => setGlobalSettings(prev => ({ ...prev, nctlSampleType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Keep Individual Types...</option>
                      {sampleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={globalSettings.rushTurnaround}
                        onChange={(e) => setGlobalSettings(prev => ({ ...prev, rushTurnaround: e.target.checked }))}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Rush</span>
                      <Zap className="w-4 h-4 text-red-600" />
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={globalSettings.dpmEarlyStart}
                        onChange={(e) => setGlobalSettings(prev => ({ ...prev, dpmEarlyStart: e.target.checked }))}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">DPM Early</span>
                    </label>
                  </div>
                </div>

                {/* Column 2: Assays */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Required Assays</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    {Object.entries({
                      salmonella: 'Salmonella',
                      stec: 'STEC',
                      totalAerobicBacteria: 'Total Aerobic',
                      totalColiforms: 'Total Coliforms',
                      totalYeastMold: 'Total Y&M',
                      btgn: 'BTGN',
                      cannabinoids: 'Cannabinoids',
                      terpenes: 'Terpenes',
                      pesticides: 'Pesticides',
                      mycotoxins: 'Mycotoxins',
                      heavyMetals: 'Heavy Metals',
                      residualSolvents: 'Residual Solvents',
                      moistureContent: 'Moisture',
                      waterActivity: 'Water Activity',
                      foreignMatter: 'Foreign Matter'
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={globalSettings.allAssays[key] || false}
                          onChange={(e) => setGlobalSettings(prev => ({
                            ...prev,
                            allAssays: { ...prev.allAssays, [key]: e.target.checked }
                          }))}
                          className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Column 3: Deadlines */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Deadlines/TATs</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      Chemistry Due
                      <span className="ml-1 text-gray-400 cursor-help" title="HPLC, GCMS, LCMS, ICPMS methods">
                        <Info className="w-3 h-3" />
                      </span>
                    </label>
                    <input
                      type="datetime-local"
                      value={globalSettings.chemistryDue || (() => {
                        const sampleManifest = manifests[0];
                        if (!sampleManifest) return '';
                        const suggested = getSuggestedChemistryDeadline(
                          sampleManifest.createdDate,
                          globalSettings.allAssays,
                          globalSettings.rushTurnaround
                        );
                        return suggested ? new Date(suggested).toISOString().slice(0, 16) : '';
                      })()}
                      onChange={(e) => setGlobalSettings(prev => ({ ...prev, chemistryDue: e.target.value }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      Microbial Due
                      <span className="ml-1 text-gray-400 cursor-help" title="Culture, petrifilm, PCR methods">
                        <Info className="w-3 h-3" />
                      </span>
                    </label>
                    <input
                      type="datetime-local"
                      value={globalSettings.microDue || (() => {
                        const sampleManifest = manifests[0];
                        if (!sampleManifest) return '';
                        const suggested = getSuggestedMicroDeadline(
                          sampleManifest.createdDate,
                          globalSettings.allAssays,
                          globalSettings.rushTurnaround
                        );
                        return suggested ? new Date(suggested).toISOString().slice(0, 16) : '';
                      })()}
                      onChange={(e) => setGlobalSettings(prev => ({ ...prev, microDue: e.target.value }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      Other Due
                      <span className="ml-1 text-gray-400 cursor-help" title="Moisture, water activity, foreign matter, etc.">
                        <Info className="w-3 h-3" />
                      </span>
                    </label>
                    <input
                      type="datetime-local"
                      value={globalSettings.otherDue || ''}
                      onChange={(e) => setGlobalSettings(prev => ({ ...prev, otherDue: e.target.value }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6 pt-6 border-t flex justify-end">
                <button
                  onClick={applyGlobalSettings}
                  disabled={selectedCount === 0}
                  className={`flex items-center justify-center space-x-2 px-6 py-2 rounded-md font-medium transition-colors ${
                    selectedCount > 0 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Apply & Continue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receiving2;