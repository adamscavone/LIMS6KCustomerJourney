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
  EyeOff
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
    allAssays: getDefaultAssays('Dispensary Plant Material')
  });

  // Sample type options
  const sampleTypes = [
    'Flower', 'Shake/Trim', 'Concentrate', 'Rosin', 'Resin', 
    'Vape Cart', 'Gummy', 'Brownie', 'Tincture', 'Chocolate',
    'Cookie', 'Beverage', 'Capsule', 'Oil', 'Topical',
    'Pre-Roll', 'Infused Pre-Roll', 'Hash', 'Kief', 'Isolate'
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

  // Group assays by category for deadline calculation
  const getAssaysByCategory = (selectedAssays) => {
    const categories = {
      microbial: {},
      chemistry: {},
      other: {}
    };

    Object.entries(selectedAssays).forEach(([key, isSelected]) => {
      if (isSelected && ASSAY_TURNAROUND_TIMES[key]) {
        const method = ASSAY_TURNAROUND_TIMES[key].method;
        if (['culture', 'petrifilm', 'PCR'].includes(method)) {
          categories.microbial[key] = true;
        } else if (['HPLC', 'GCMS', 'LCMS', 'ICPMS'].includes(method)) {
          categories.chemistry[key] = true;
        } else {
          categories.other[key] = true;
        }
      }
    });

    return categories;
  };

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
    samples.forEach((_, idx) => {
      newSelections[`${manifestId}-${idx}`] = true;
    });
    setSelectedSamples(prev => ({ ...prev, ...newSelections }));
  };

  // Apply global settings to selected samples
  const applyGlobalSettings = () => {
    const updatedData = { ...manifestData };
    
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
        sample.nctlSampleType = globalSettings.nctlSampleType;
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
          sample.groupedDeadlines = groupedDeadlines;
          sample.earliestDeadline = groupedDeadlines.earliestDeadline || '';
          sample.customDeadlines = customDeadlineData;
        }
      }
    });
    
    setManifestData(updatedData);
  };

  // Calculate selected count
  const selectedCount = Object.values(selectedSamples).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Metrc Receiving - Batch Control</h1>
            <p className="text-sm text-gray-600 mt-1">Process manifests with global batch controls</p>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Deadline Preview */}
        <div className="lg:col-span-2 space-y-4">
          {/* Deadline Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Deadline Preview
              </h2>
              <button
                onClick={() => setShowDetailedDeadlines(!showDetailedDeadlines)}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                {showDetailedDeadlines ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showDetailedDeadlines ? 'Hide' : 'Show'} Individual Assay Deadlines</span>
              </button>
            </div>

            {(() => {
              const sampleManifest = manifests[0]; // Use first manifest for preview
              if (!sampleManifest) return <p className="text-sm text-gray-500">No manifests available for preview</p>;

              const receivedDate = sampleManifest.createdDate;
              const assayCategories = getAssaysByCategory(globalSettings.allAssays);
              
              return (
                <div className="space-y-4">
                  {/* Chemistry Container */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-3 flex items-center">
                      <Beaker className="w-4 h-4 mr-2" />
                      Chemistry
                    </h3>
                    {showDetailedDeadlines ? (
                      <div className="space-y-2">
                        {Object.entries(assayCategories.chemistry).map(([assayKey]) => {
                          const customDeadline = customDeadlines[assayKey];
                          const deadline = customDeadline || calculateAssayDeadline(receivedDate, assayKey, globalSettings.rushTurnaround);
                          return (
                            <div key={assayKey} className="flex justify-between text-sm">
                              <span className="text-gray-700">
                                {getAssayDisplayName(assayKey)}
                                {customDeadline && <span className="text-purple-600 text-xs ml-1">(custom)</span>}
                              </span>
                              <span className="font-medium">
                                {deadline ? new Date(deadline).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Latest Due:</span>
                          <span className="font-medium">
                            {getSuggestedChemistryDeadline(receivedDate, assayCategories.chemistry, globalSettings.rushTurnaround) 
                              ? new Date(getSuggestedChemistryDeadline(receivedDate, assayCategories.chemistry, globalSettings.rushTurnaround)).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Microbial Container */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-medium text-purple-900 mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Microbial
                    </h3>
                    {showDetailedDeadlines ? (
                      <div className="space-y-2">
                        {Object.entries(assayCategories.microbial).map(([assayKey]) => {
                          const customDeadline = customDeadlines[assayKey];
                          const deadline = customDeadline || calculateAssayDeadline(receivedDate, assayKey, globalSettings.rushTurnaround);
                          return (
                            <div key={assayKey} className="flex justify-between text-sm">
                              <span className="text-gray-700">
                                {getAssayDisplayName(assayKey)}
                                {customDeadline && <span className="text-purple-600 text-xs ml-1">(custom)</span>}
                              </span>
                              <span className="font-medium">
                                {deadline ? new Date(deadline).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Latest Due:</span>
                          <span className="font-medium">
                            {getSuggestedMicroDeadline(receivedDate, assayCategories.microbial, globalSettings.rushTurnaround) 
                              ? new Date(getSuggestedMicroDeadline(receivedDate, assayCategories.microbial, globalSettings.rushTurnaround)).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Other Container */}
                  {Object.keys(assayCategories.other).length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Other
                      </h3>
                      {showDetailedDeadlines ? (
                        <div className="space-y-2">
                          {Object.entries(assayCategories.other).map(([assayKey]) => {
                            const customDeadline = customDeadlines[assayKey];
                            const deadline = customDeadline || calculateAssayDeadline(receivedDate, assayKey, globalSettings.rushTurnaround);
                            return (
                              <div key={assayKey} className="flex justify-between text-sm">
                                <span className="text-gray-700">
                                  {getAssayDisplayName(assayKey)}
                                  {customDeadline && <span className="text-purple-600 text-xs ml-1">(custom)</span>}
                                </span>
                                <span className="font-medium">
                                  {deadline ? new Date(deadline).toLocaleDateString() : 'N/A'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Latest Due:</span>
                            <span className="font-medium">
                              {(() => {
                                const deadlines = Object.keys(assayCategories.other).map(key => 
                                  calculateAssayDeadline(receivedDate, key, globalSettings.rushTurnaround)
                                ).filter(Boolean);
                                return deadlines.length > 0 
                                  ? new Date(Math.max(...deadlines.map(d => new Date(d)))).toLocaleDateString()
                                  : 'N/A';
                              })()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Variability Warning */}
                  {(() => {
                    const allDeadlines = getGroupedDeadlines(receivedDate, globalSettings.allAssays, globalSettings.rushTurnaround);
                    if (allDeadlines.hasVariability) {
                      return (
                        <div className="flex items-start space-x-2 p-3 bg-orange-50 border border-orange-200 rounded">
                          <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-orange-900">Deadline Variability Detected</p>
                            <p className="text-orange-700 mt-1">
                              Selected assays have different turnaround times. 
                              {!showDetailedDeadlines && ' Click "Show Individual Assay Deadlines" for details.'}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Right Column - Global Batch Settings */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Global Batch Settings
              </h2>
            </div>

            <div className="space-y-4">
              {/* Test Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Category</label>
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

              {/* NCTL Sample Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NCTL Sample Type</label>
                <select
                  value={globalSettings.nctlSampleType}
                  onChange={(e) => setGlobalSettings(prev => ({ ...prev, nctlSampleType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Type...</option>
                  {sampleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Rush Options */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={globalSettings.rushTurnaround}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, rushTurnaround: e.target.checked }))}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Rush Turnaround</span>
                  <Zap className="w-4 h-4 text-red-600" />
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={globalSettings.dpmEarlyStart}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, dpmEarlyStart: e.target.checked }))}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">DPM Early Start</span>
                </label>
              </div>

              {/* Manual Due Dates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Override Micro Due</label>
                <input
                  type="datetime-local"
                  value={globalSettings.microDue}
                  onChange={(e) => setGlobalSettings(prev => ({ ...prev, microDue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Override Chemistry Due</label>
                <input
                  type="datetime-local"
                  value={globalSettings.chemistryDue}
                  onChange={(e) => setGlobalSettings(prev => ({ ...prev, chemistryDue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              {/* Assays Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Default Assays</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
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

              {/* Custom Deadline Button */}
              <div className="pt-3 border-t">
                <button
                  onClick={() => setShowCustomDeadlines(!showCustomDeadlines)}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{showCustomDeadlines ? 'Hide' : 'Show'} Custom Deadlines</span>
                  {showCustomDeadlines ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Custom Assay Deadlines */}
              {showCustomDeadlines && (
                <div className="space-y-3 max-h-64 overflow-y-auto p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-600 italic">Override individual assay deadlines (leave blank to use defaults)</p>
                  {Object.entries(globalSettings.allAssays).map(([assayKey, isSelected]) => {
                    if (!isSelected) return null;
                    const displayName = getAssayDisplayName(assayKey);
                    const turnaround = ASSAY_TURNAROUND_TIMES[assayKey];
                    const sampleManifest = manifests[0];
                    const defaultDeadline = sampleManifest ? 
                      calculateAssayDeadline(sampleManifest.createdDate, assayKey, globalSettings.rushTurnaround) : null;
                    
                    return (
                      <div key={assayKey} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-gray-700">{displayName}</label>
                          <span className="text-xs text-gray-500">
                            {turnaround?.method || 'N/A'} • {turnaround?.days || 0}d
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="datetime-local"
                            value={customDeadlines[assayKey] || ''}
                            onChange={(e) => setCustomDeadlines(prev => ({
                              ...prev,
                              [assayKey]: e.target.value
                            }))}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="Use default"
                          />
                          {defaultDeadline && (
                            <button
                              onClick={() => setCustomDeadlines(prev => {
                                const updated = { ...prev };
                                delete updated[assayKey];
                                return updated;
                              })}
                              className="text-xs text-blue-600 hover:text-blue-800"
                              title={`Default: ${new Date(defaultDeadline).toLocaleString()}`}
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Apply Button */}
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">{selectedCount} samples selected</div>
                <button
                  onClick={applyGlobalSettings}
                  disabled={selectedCount === 0}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
                    selectedCount > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Apply to Selected</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manifests List */}
      <div className="space-y-4">
        {manifests.map(manifest => {
          const isExpanded = expandedManifests[manifest.manifestId];
          const manifestSampleData = manifestData[manifest.manifestId] || {};
          
          return (
            <div key={manifest.manifestId} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleManifest(manifest.manifestId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    <Package className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{manifest.client}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Manifest: {manifest.manifestNumber}</span>
                        <span>{manifest.samples.length} samples</span>
                        <span>ETA: {new Date(manifest.driver.eta).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAllSamples(manifest.manifestId, manifest.samples);
                      }}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Select All
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                        <th className="py-2 px-3 text-left">
                          <CheckSquare className="w-4 h-4" />
                        </th>
                        <th className="py-2 px-3 text-left">Sample</th>
                        <th className="py-2 px-3 text-left">Type</th>
                        <th className="py-2 px-3 text-left">Test Category</th>
                        <th className="py-2 px-3 text-left">NCTL Type</th>
                        <th className="py-2 px-3 text-left">Deadlines</th>
                        <th className="py-2 px-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {manifest.samples.map((sample, idx) => {
                        const sampleKey = `${manifest.manifestId}-${idx}`;
                        const isSelected = selectedSamples[sampleKey];
                        const sampleData = manifestSampleData.samples?.[idx] || {};
                        
                        return (
                          <tr key={idx} className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                            <td className="py-2 px-3">
                              <input
                                type="checkbox"
                                checked={isSelected || false}
                                onChange={() => toggleSampleSelection(manifest.manifestId, idx)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="py-2 px-3 text-sm">
                              <div>
                                <div className="font-medium">{sample.itemName}</div>
                                <div className="text-xs text-gray-500">Tag: ...{sample.metrcTag.slice(-5)}</div>
                              </div>
                            </td>
                            <td className="py-2 px-3 text-sm">{sample.itemCategory}</td>
                            <td className="py-2 px-3 text-sm">
                              {sampleData.testCategory || '-'}
                            </td>
                            <td className="py-2 px-3 text-sm">
                              {sampleData.nctlSampleType || '-'}
                            </td>
                            <td className="py-2 px-3 text-xs">
                              <div className="flex items-center space-x-1">
                                {sampleData.groupedDeadlines?.hasVariability ? (
                                  <>
                                    <span>Variable</span>
                                    <AlertCircle className="w-3 h-3 text-orange-500" title="Assays have different deadlines" />
                                  </>
                                ) : sampleData.earliestDeadline ? (
                                  <span>{new Date(sampleData.earliestDeadline).toLocaleDateString()}</span>
                                ) : (
                                  <span>-</span>
                                )}
                                {sampleData.customDeadlines && Object.keys(sampleData.customDeadlines).length > 0 && (
                                  <span className="text-purple-600 font-bold" title="Has custom deadlines">*</span>
                                )}
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center space-x-1">
                                {sampleData.isRush && <Zap className="w-3 h-3 text-red-600" title="Rush" />}
                                {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">DPM</span>}
                              </div>
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
  );
};

export default Receiving2;