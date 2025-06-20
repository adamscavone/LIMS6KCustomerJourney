import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  RefreshCw,
  Save,
  AlertCircle,
  Zap,
  Copy,
  Download,
  Upload,
  Filter,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Truck,
  Hash,
  ChevronRight,
  Users,
  Building2,
  FileText,
  Beaker,
  AlertTriangle,
  FlaskConical,
  Info
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

const Receiving4 = () => {
  const [manifests, setManifests] = useState([]);
  const [manifestData, setManifestData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [expandedManifests, setExpandedManifests] = useState(new Set());
  const [expandedSamples, setExpandedSamples] = useState(new Set());
  const [filters, setFilters] = useState({
    client: '',
    manifestNumber: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // For demo purposes, assume Michigan. In production, this would come from user settings
  const [currentState] = useState('Michigan');

  // Sample type options
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

  // Generate mock data
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
          { metrcTag: 'ABC123456789', strain: 'Blue Dream', itemName: 'Blue Dream Flower - 1oz', itemCategory: 'Buds', sourcePackage: 'PLT123456789' },
          { metrcTag: 'ABC123456790', strain: 'OG Kush', itemName: 'OG Kush Flower - 1oz', itemCategory: 'Buds', sourcePackage: 'PLT123456790' },
          { metrcTag: 'ABC123456791', strain: 'Gelato', itemName: 'Gelato Live Rosin - 1g', itemCategory: 'Concentrate', sourcePackage: 'PLT123456791' },
          { metrcTag: 'ABC123456792', strain: 'Wedding Cake', itemName: 'Wedding Cake Vape Cart - 0.5g', itemCategory: 'Vape Cartridge', sourcePackage: 'PLT123456792' }
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
          { metrcTag: 'DEF123456789', strain: 'Purple Haze', itemName: 'Purple Haze Shake - 5oz', itemCategory: 'Shake', sourcePackage: 'PLT223456789' },
          { metrcTag: 'DEF123456790', strain: 'N/A', itemName: 'Strawberry Gummies - 100mg', itemCategory: 'Edibles', sourcePackage: 'PLT223456790' },
          { metrcTag: 'DEF123456791', strain: 'N/A', itemName: 'Chocolate Bar - 200mg', itemCategory: 'Edibles', sourcePackage: 'PLT223456791' }
        ]
      },
      {
        manifestId: 'M-2025-003',
        manifestNumber: '0000012347',
        createdDate: '2025-06-13T10:00:00',
        client: 'Highland Health',
        driver: { name: 'James Wilson', eta: '2025-06-13T12:30:00' },
        status: 'in_transit',
        samples: [
          { metrcTag: 'GHI123456789', strain: 'Sour Diesel', itemName: 'Sour Diesel Pre-Roll - 1g', itemCategory: 'Pre-Roll', sourcePackage: 'PLT323456789' },
          { metrcTag: 'GHI123456790', strain: 'Zkittlez', itemName: 'Zkittlez Shatter - 0.5g', itemCategory: 'Concentrate', sourcePackage: 'PLT323456790' }
        ]
      }
    ];

    // Initialize manifestData
    const initialData = {};
    mockManifests.forEach(manifest => {
      initialData[manifest.manifestId] = {
        samples: {}
      };
      manifest.samples.forEach((_, idx) => {
        const defaultAssays = getDefaultAssays('Dispensary Plant Material');
        const microDue = getSuggestedMicroDeadline(manifest.createdDate, defaultAssays, false);
        const chemDue = getSuggestedChemistryDeadline(manifest.createdDate, defaultAssays, false);
        const groupedDeadlines = getGroupedDeadlines(manifest.createdDate, defaultAssays, false);
        
        initialData[manifest.manifestId].samples[idx] = {
          ccId: '',
          nctlSampleType: '',
          testCategory: 'Dispensary Plant Material',
          potencyTarget: '',
          potencyRange: '',
          microDue: microDue || '',
          chemistryDue: chemDue || '',
          reportingDue: '',
          isRush: false,
          dpmEarlyStart: false,
          assays: defaultAssays,
          groupedDeadlines: groupedDeadlines,
          notes: '',
          isRetest: false,
          whitelistedAnalytes: {}
        };
      });
    });
    
    setManifests(mockManifests);
    setManifestData(initialData);
  }, []);

  // Handle cell changes
  const handleCellChange = (manifestId, sampleIdx, field, value) => {
    const manifest = manifests.find(m => m.manifestId === manifestId);
    
    setManifestData(prev => {
      const updated = { ...prev };
      const sample = updated[manifestId]?.samples[sampleIdx];
      if (!sample) return prev;
      
      sample[field] = value;
      
      // Recalculate deadlines if test category or rush changes
      if ((field === 'testCategory' || field === 'isRush') && manifest) {
        const assays = field === 'testCategory' ? getDefaultAssays(value) : sample.assays;
        const isRush = field === 'isRush' ? value : sample.isRush;
        
        sample.assays = assays;
        sample.microDue = getSuggestedMicroDeadline(manifest.createdDate, assays, isRush);
        sample.chemistryDue = getSuggestedChemistryDeadline(manifest.createdDate, assays, isRush);
        sample.groupedDeadlines = getGroupedDeadlines(manifest.createdDate, assays, isRush);
      }
      
      // Handle assay checkbox changes
      if (field.startsWith('assay_')) {
        const assayKey = field.replace('assay_', '');
        sample.assays = { ...sample.assays, [assayKey]: value };
        
        // If this is a retest and we're enabling an assay, initialize its whitelisted analytes
        if (sample.isRetest && value) {
          if (!sample.whitelistedAnalytes[assayKey]) {
            sample.whitelistedAnalytes[assayKey] = [];
          }
        }
        
        // Recalculate deadlines
        sample.microDue = getSuggestedMicroDeadline(manifest.createdDate, sample.assays, sample.isRush);
        sample.chemistryDue = getSuggestedChemistryDeadline(manifest.createdDate, sample.assays, sample.isRush);
        sample.groupedDeadlines = getGroupedDeadlines(manifest.createdDate, sample.assays, sample.isRush);
      }
      
      // Handle retest toggle
      if (field === 'isRetest') {
        if (value) {
          // Initialize whitelisted analytes for selected assays
          sample.whitelistedAnalytes = {};
          Object.entries(sample.assays).forEach(([assayKey, isSelected]) => {
            if (isSelected) {
              sample.whitelistedAnalytes[assayKey] = [];
            }
          });
        } else {
          // Clear whitelisted analytes when disabling retest
          sample.whitelistedAnalytes = {};
        }
      }
      
      // Handle individual analyte selection for retests
      if (field.startsWith('analyte_')) {
        const [, assayKey, analyteKey] = field.split('_');
        if (!sample.whitelistedAnalytes[assayKey]) {
          sample.whitelistedAnalytes[assayKey] = [];
        }
        
        if (value) {
          // Add analyte to whitelist
          if (!sample.whitelistedAnalytes[assayKey].includes(analyteKey)) {
            sample.whitelistedAnalytes[assayKey].push(analyteKey);
          }
        } else {
          // Remove analyte from whitelist
          sample.whitelistedAnalytes[assayKey] = sample.whitelistedAnalytes[assayKey].filter(a => a !== analyteKey);
        }
      }
      
      return updated;
    });
  };

  // Toggle manifest expansion
  const toggleManifest = (manifestId) => {
    const newExpanded = new Set(expandedManifests);
    if (newExpanded.has(manifestId)) {
      newExpanded.delete(manifestId);
    } else {
      newExpanded.add(manifestId);
    }
    setExpandedManifests(newExpanded);
  };

  // Toggle sample expansion
  const toggleSample = (sampleKey) => {
    const newExpanded = new Set(expandedSamples);
    if (newExpanded.has(sampleKey)) {
      newExpanded.delete(sampleKey);
    } else {
      newExpanded.add(sampleKey);
    }
    setExpandedSamples(newExpanded);
  };

  // Toggle row selection
  const toggleRowSelection = (rowKey) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(rowKey)) {
      newSelection.delete(rowKey);
    } else {
      newSelection.add(rowKey);
    }
    setSelectedRows(newSelection);
  };

  // Select all samples in a manifest
  const selectAllManifestSamples = (manifestId) => {
    const manifest = manifests.find(m => m.manifestId === manifestId);
    if (!manifest) return;
    
    const newSelection = new Set(selectedRows);
    const allSelected = manifest.samples.every((_, idx) => 
      selectedRows.has(`${manifestId}-${idx}`)
    );
    
    manifest.samples.forEach((_, idx) => {
      const key = `${manifestId}-${idx}`;
      if (allSelected) {
        newSelection.delete(key);
      } else {
        newSelection.add(key);
      }
    });
    
    setSelectedRows(newSelection);
  };

  // Apply bulk action
  const applyBulkAction = (field, value) => {
    const updatedData = { ...manifestData };
    selectedRows.forEach(rowKey => {
      const [manifestId, sampleIdx] = rowKey.split('-');
      if (updatedData[manifestId]?.samples[sampleIdx]) {
        handleCellChange(manifestId, parseInt(sampleIdx), field, value);
      }
    });
  };

  // Save all data
  const saveAllData = () => {
    console.log('Saving all manifest data:', manifestData);
    // Implementation for saving to backend
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format deadline date
  const formatDeadline = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="max-w-full p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Metrc Receiving</h1>
            <p className="text-sm text-gray-600 mt-1">Hierarchical manifest view with inline sample editing</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={saveAllData}
              className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save All</span>
            </button>
            <button
              onClick={() => setRefreshing(!refreshing)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Filter by client..."
              value={filters.client}
              onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="text"
              placeholder="Filter by manifest..."
              value={filters.manifestNumber}
              onChange={(e) => setFilters(prev => ({ ...prev, manifestNumber: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      {selectedRows.size > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{selectedRows.size} samples selected</span>
              <button
                onClick={() => setSelectedRows(new Set())}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <select
                onChange={(e) => applyBulkAction('testCategory', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="">Bulk Test Category...</option>
                {testCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                onChange={(e) => applyBulkAction('nctlSampleType', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="">Bulk Sample Type...</option>
                {sampleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                onClick={() => applyBulkAction('isRush', true)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center space-x-1"
              >
                <Zap className="w-3 h-3" />
                <span>Rush All</span>
              </button>
              <button
                onClick={() => applyBulkAction('dpmEarlyStart', true)}
                className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm flex items-center space-x-1"
              >
                <Clock className="w-3 h-3" />
                <span>DPM Early Start</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manifests */}
      <div className="space-y-4">
        {manifests.map(manifest => {
          const isExpanded = expandedManifests.has(manifest.manifestId);
          const manifestSamples = manifest.samples.length;
          const selectedInManifest = manifest.samples.filter((_, idx) => 
            selectedRows.has(`${manifest.manifestId}-${idx}`)
          ).length;
          
          return (
            <div key={manifest.manifestId} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Manifest Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleManifest(manifest.manifestId)}
                      className="flex items-center space-x-2 hover:bg-gray-50 rounded p-1"
                    >
                      {isExpanded ? 
                        <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      }
                    </button>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{manifest.client}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="font-mono text-sm">{manifest.manifestNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{manifestSamples} samples</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">ETA: {formatDate(manifest.driver.eta)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {selectedInManifest > 0 && (
                      <span className="text-sm text-blue-600">
                        {selectedInManifest} selected
                      </span>
                    )}
                    <button
                      onClick={() => selectAllManifestSamples(manifest.manifestId)}
                      className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      {selectedInManifest === manifestSamples ? 
                        <CheckSquare className="w-4 h-4" /> : 
                        <Square className="w-4 h-4" />
                      }
                      <span>Select All</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Samples */}
              {isExpanded && (
                <div className="divide-y divide-gray-100">
                  {manifest.samples.map((sample, sampleIdx) => {
                    const sampleKey = `${manifest.manifestId}-${sampleIdx}`;
                    const sampleData = manifestData[manifest.manifestId]?.samples[sampleIdx] || {};
                    const isSelected = selectedRows.has(sampleKey);
                    const isSampleExpanded = expandedSamples.has(sampleKey);
                    
                    return (
                      <div key={sampleKey} className={`${isSelected ? 'bg-blue-50' : ''} ${sampleData.isRetest ? 'bg-yellow-50' : ''}`}>
                        {/* Sample Row */}
                        <div className="p-4">
                          <div className="flex items-start space-x-4">
                            {/* Selection checkbox */}
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleRowSelection(sampleKey)}
                              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            
                            {/* Sample Info Grid */}
                            <div className="flex-1 grid grid-cols-12 gap-4 items-start">
                              {/* Column 1: Basic Info */}
                              <div className="col-span-3">
                                <div className="space-y-2">
                                  <div>
                                    <label className="text-xs text-gray-500">CC ID</label>
                                    <input
                                      type="text"
                                      value={sampleData.ccId || ''}
                                      onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'ccId', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                      placeholder="Enter CC ID"
                                    />
                                  </div>
                                  <div className="text-sm">
                                    <div className="flex items-center space-x-2">
                                      <Hash className="w-3 h-3 text-gray-400" />
                                      <span className="font-mono text-xs" title={sample.metrcTag}>
                                        {sample.metrcTag}
                                      </span>
                                      {sampleData.isRetest && (
                                        <span className="px-1.5 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
                                          RETEST
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1" title={sample.itemName}>
                                      {sample.itemName}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Column 2: Sample Type & Test Category */}
                              <div className="col-span-3">
                                <div className="space-y-2">
                                  <div>
                                    <label className="text-xs text-gray-500">NCTL Sample Type</label>
                                    <select
                                      value={sampleData.nctlSampleType || ''}
                                      onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'nctlSampleType', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    >
                                      <option value="">Select type...</option>
                                      {sampleTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-500">Test Category</label>
                                    <select
                                      value={sampleData.testCategory || ''}
                                      onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'testCategory', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    >
                                      {testCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {/* Column 3: Deadlines */}
                              <div className="col-span-3">
                                <div className="space-y-2">
                                  <div>
                                    <label className="text-xs text-gray-500">Micro Due</label>
                                    <div className="relative">
                                      <input
                                        type="datetime-local"
                                        value={sampleData.microDue || ''}
                                        onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'microDue', e.target.value)}
                                        className={`w-full px-2 py-1 pr-8 border rounded text-sm ${
                                          sampleData.groupedDeadlines?.hasVariability ? 'border-orange-300' : 'border-gray-300'
                                        }`}
                                      />
                                      {sampleData.groupedDeadlines?.hasVariability && (
                                        <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-500">Chemistry Due</label>
                                    <input
                                      type="datetime-local"
                                      value={sampleData.chemistryDue || ''}
                                      onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'chemistryDue', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Column 4: Options & Actions */}
                              <div className="col-span-3">
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        checked={sampleData.isRush || false}
                                        onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'isRush', e.target.checked)}
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                      />
                                      <span className="text-sm font-medium text-red-600">Rush</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        checked={sampleData.dpmEarlyStart || false}
                                        onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'dpmEarlyStart', e.target.checked)}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                      />
                                      <span className="text-sm font-medium text-purple-600">DPM Early</span>
                                    </label>
                                  </div>
                                  {currentState === 'Michigan' && (
                                    <div className="flex items-center space-x-2">
                                      <label className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.isRetest || false}
                                          onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'isRetest', e.target.checked)}
                                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm font-medium text-yellow-600">Retest</span>
                                      </label>
                                      {sampleData.isRetest && (
                                        <div className="flex items-center space-x-1 text-xs text-yellow-700">
                                          <Info className="w-3 h-3" />
                                          <span>Single-analyte testing only</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  <button
                                    onClick={() => toggleSample(sampleKey)}
                                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    <Beaker className="w-4 h-4" />
                                    <span>
                                      {isSampleExpanded ? 'Hide' : 'Show'} Assay Details
                                    </span>
                                    {isSampleExpanded ? 
                                      <ChevronUp className="w-3 h-3" /> : 
                                      <ChevronDown className="w-3 h-3" />
                                    }
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Assay Details */}
                          {isSampleExpanded && (
                            <div className="mt-4 ml-8 p-4 bg-gray-50 rounded-lg">
                              <div className="space-y-4">
                                {/* Assay Selection */}
                                <div>
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    {sampleData.isRetest ? 'Select Specific Analytes for Retest' : 'Selected Assays'}
                                    {sampleData.isRetest && (
                                      <span className="ml-2 text-xs text-yellow-700 font-normal">
                                        <AlertTriangle className="inline w-3 h-3 mr-1" />
                                        Only selected analytes will be tested
                                      </span>
                                    )}
                                  </h4>
                                  
                                  {!sampleData.isRetest ? (
                                    // Normal assay selection
                                    <div className="grid grid-cols-4 gap-3">
                                      {Object.entries(sampleData.assays || {}).map(([assayKey, isSelected]) => (
                                        <label key={assayKey} className="flex items-center space-x-2">
                                          <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, `assay_${assayKey}`, e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">{getAssayDisplayName(assayKey)}</span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : (
                                    // Retest mode - show individual analytes
                                    <div className="space-y-4">
                                      {Object.entries(sampleData.assays || {}).filter(([_, isSelected]) => isSelected).map(([assayKey]) => {
                                        const analytes = getAnalytesForAssay(assayKey);
                                        const whitelisted = sampleData.whitelistedAnalytes?.[assayKey] || [];
                                        
                                        return (
                                          <div key={assayKey} className="border border-gray-200 rounded-lg p-3">
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">
                                              {getAssayDisplayName(assayKey)}
                                              {whitelisted.length > 0 && (
                                                <span className="ml-2 text-xs text-yellow-600">
                                                  ({whitelisted.length} selected)
                                                </span>
                                              )}
                                            </h5>
                                            <div className="grid grid-cols-3 gap-2">
                                              {analytes.map(analyte => (
                                                <label 
                                                  key={analyte.key} 
                                                  className={`flex items-center space-x-2 p-2 rounded ${
                                                    whitelisted.includes(analyte.key) ? 'bg-yellow-100' : 'hover:bg-gray-50'
                                                  }`}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={whitelisted.includes(analyte.key)}
                                                    onChange={(e) => handleCellChange(
                                                      manifest.manifestId, 
                                                      sampleIdx, 
                                                      `analyte_${assayKey}_${analyte.key}`, 
                                                      e.target.checked
                                                    )}
                                                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                                  />
                                                  <span className="text-sm" title={analyte.fullName}>
                                                    {analyte.name}
                                                  </span>
                                                </label>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>

                                {/* Deadline Breakdown */}
                                {sampleData.groupedDeadlines?.groups?.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                      Deadline Breakdown
                                      {sampleData.groupedDeadlines.hasVariability && (
                                        <span className="ml-2 text-xs text-orange-600 font-normal">
                                          <AlertTriangle className="inline w-3 h-3 mr-1" />
                                          Different assays have different deadlines
                                        </span>
                                      )}
                                    </h4>
                                    <div className="space-y-2">
                                      {sampleData.groupedDeadlines.groups.map((group, idx) => (
                                        <div key={idx} className="flex items-start space-x-4 text-sm">
                                          <div className="font-medium text-gray-600 w-32">
                                            {formatDeadline(group.deadline)}
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex flex-wrap gap-2">
                                              {group.assays.map(assay => (
                                                <span
                                                  key={assay.key}
                                                  className={`px-2 py-1 rounded-full text-xs ${
                                                    group.isMicrobial ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                  }`}
                                                >
                                                  {assay.name}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Additional Options */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-gray-500">Potency Target</label>
                                    <input
                                      type="text"
                                      value={sampleData.potencyTarget || ''}
                                      onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'potencyTarget', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                      placeholder="e.g., 20% THC"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-500">Reporting Due</label>
                                    <input
                                      type="datetime-local"
                                      value={sampleData.reportingDue || ''}
                                      onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'reportingDue', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs text-gray-500">Notes</label>
                                  <textarea
                                    value={sampleData.notes || ''}
                                    onChange={(e) => handleCellChange(manifest.manifestId, sampleIdx, 'notes', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    rows="2"
                                    placeholder="Additional notes..."
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div>
          {manifests.length} manifests, {manifests.reduce((acc, m) => acc + m.samples.length, 0)} total samples
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receiving4;