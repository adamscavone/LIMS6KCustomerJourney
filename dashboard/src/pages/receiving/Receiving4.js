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
  Hash
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

const Receiving4 = () => {
  const [manifests, setManifests] = useState([]);
  const [manifestData, setManifestData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    client: '',
    manifestNumber: '',
    dateFrom: '',
    dateTo: ''
  });
  const tableRef = useRef(null);

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
          // Legacy fields for backward compatibility
          cannabinoids: defaultAssays.cannabinoids || false,
          terpenes: defaultAssays.terpenes || false,
          pesticides: defaultAssays.pesticides || false,
          micro: true,
          heavyMetals: defaultAssays.heavyMetals || false,
          solvents: defaultAssays.residualSolvents || false,
          notes: ''
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
        
        // Update legacy checkboxes
        sample.cannabinoids = assays.cannabinoids || false;
        sample.terpenes = assays.terpenes || false;
        sample.pesticides = assays.pesticides || false;
        sample.heavyMetals = assays.heavyMetals || false;
        sample.solvents = assays.residualSolvents || false;
      }
      
      // Handle assay checkbox changes
      if (field.startsWith('assay_')) {
        const assayKey = field.replace('assay_', '');
        sample.assays = { ...sample.assays, [assayKey]: value };
        
        // Recalculate deadlines
        sample.microDue = getSuggestedMicroDeadline(manifest.createdDate, sample.assays, sample.isRush);
        sample.chemistryDue = getSuggestedChemistryDeadline(manifest.createdDate, sample.assays, sample.isRush);
        sample.groupedDeadlines = getGroupedDeadlines(manifest.createdDate, sample.assays, sample.isRush);
      }
      
      return updated;
    });
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

  // Select all rows
  const selectAllRows = () => {
    const allRowKeys = [];
    manifests.forEach(manifest => {
      manifest.samples.forEach((_, idx) => {
        allRowKeys.push(`${manifest.manifestId}-${idx}`);
      });
    });
    setSelectedRows(new Set(allRowKeys));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedRows(new Set());
  };

  // Copy selected data
  const copySelectedData = () => {
    // Implementation for copying selected rows to clipboard
    console.log('Copying selected rows:', selectedRows);
  };

  // Apply bulk action
  const applyBulkAction = (field, value) => {
    const updatedData = { ...manifestData };
    selectedRows.forEach(rowKey => {
      const [manifestId, sampleIdx] = rowKey.split('-');
      if (updatedData[manifestId]?.samples[sampleIdx]) {
        updatedData[manifestId].samples[sampleIdx][field] = value;
      }
    });
    setManifestData(updatedData);
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

  // Get all rows for table
  const getAllRows = () => {
    const rows = [];
    manifests.forEach(manifest => {
      manifest.samples.forEach((sample, idx) => {
        const sampleData = manifestData[manifest.manifestId]?.samples[idx] || {};
        rows.push({
          manifestId: manifest.manifestId,
          manifest,
          sample,
          sampleIdx: idx,
          sampleData,
          rowKey: `${manifest.manifestId}-${idx}`
        });
      });
    });
    return rows;
  };

  const allRows = getAllRows();

  return (
    <div className="max-w-full p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Metrc Receiving - Spreadsheet View</h1>
            <p className="text-sm text-gray-600 mt-1">Edit all fields inline for efficient data entry</p>
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
              <span className="text-sm font-medium">{selectedRows.size} rows selected</span>
              <button
                onClick={clearSelection}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
              <button
                onClick={copySelectedData}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
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
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg" ref={tableRef}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-2 py-2">
                <button
                  onClick={selectedRows.size === allRows.length ? clearSelection : selectAllRows}
                  className="hover:bg-gray-200 rounded p-1"
                >
                  {selectedRows.size === allRows.length ? 
                    <CheckSquare className="w-4 h-4" /> : 
                    <Square className="w-4 h-4" />
                  }
                </button>
              </th>
              <th className="sticky left-8 z-10 bg-gray-50 px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Client</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manifest</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CC ID</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Metrc Tag</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Item Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">NCTL Type</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Test Category</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Potency</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Micro Due</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Chem Due</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Report Due</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Rush</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">DPM</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Assays</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allRows.map(({ manifestId, manifest, sample, sampleIdx, sampleData, rowKey }) => {
              const isSelected = selectedRows.has(rowKey);
              
              return (
                <tr key={rowKey} className={`${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <td className="sticky left-0 z-10 bg-inherit px-2 py-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRowSelection(rowKey)}
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="sticky left-8 z-10 bg-inherit px-3 py-1 text-sm whitespace-nowrap">
                    {manifest.client}
                  </td>
                  <td className="px-3 py-1 text-sm font-mono">
                    {manifest.manifestNumber}
                  </td>
                  <td className="px-3 py-1">
                    <input
                      type="text"
                      value={sampleData.ccId || ''}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'ccId', e.target.value)}
                      className="w-24 px-1 py-0.5 border border-gray-300 rounded text-sm"
                      placeholder="CC ID"
                    />
                  </td>
                  <td className="px-3 py-1 text-sm font-mono" title={sample.metrcTag}>
                    ...{sample.metrcTag.slice(-5)}
                  </td>
                  <td className="px-3 py-1 text-sm" title={sample.itemName}>
                    {sample.itemName.substring(0, 25)}...
                  </td>
                  <td className="px-3 py-1">
                    <select
                      value={sampleData.nctlSampleType || ''}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'nctlSampleType', e.target.value)}
                      className="w-32 px-1 py-0.5 border border-gray-300 rounded text-sm"
                    >
                      <option value="">Select...</option>
                      {sampleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-1">
                    <select
                      value={sampleData.testCategory || ''}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'testCategory', e.target.value)}
                      className="w-40 px-1 py-0.5 border border-gray-300 rounded text-sm"
                    >
                      {testCategories.map(cat => (
                        <option key={cat} value={cat}>{cat.substring(0, 25)}{cat.length > 25 ? '...' : ''}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-1">
                    <input
                      type="text"
                      value={sampleData.potencyTarget || ''}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'potencyTarget', e.target.value)}
                      className="w-24 px-1 py-0.5 border border-gray-300 rounded text-sm"
                      placeholder="Target"
                    />
                  </td>
                  <td className="px-3 py-1">
                    <div className="relative group">
                      <input
                        type="datetime-local"
                        value={sampleData.microDue || ''}
                        onChange={(e) => handleCellChange(manifestId, sampleIdx, 'microDue', e.target.value)}
                        className={`w-36 px-1 py-0.5 border rounded text-sm ${
                          sampleData.groupedDeadlines?.hasVariability ? 'border-orange-300' : 'border-gray-300'
                        }`}
                      />
                      {sampleData.groupedDeadlines?.hasVariability && (
                        <AlertCircle className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <div className="relative group">
                      <input
                        type="datetime-local"
                        value={sampleData.chemistryDue || ''}
                        onChange={(e) => handleCellChange(manifestId, sampleIdx, 'chemistryDue', e.target.value)}
                        className={`w-36 px-1 py-0.5 border rounded text-sm ${
                          sampleData.groupedDeadlines?.hasVariability ? 'border-orange-300' : 'border-gray-300'
                        }`}
                      />
                      {sampleData.groupedDeadlines?.hasVariability && (
                        <div className="absolute bottom-full mb-1 hidden group-hover:block z-50 pointer-events-none">
                          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            Assays have different deadlines
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <input
                      type="datetime-local"
                      value={sampleData.reportingDue || ''}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'reportingDue', e.target.value)}
                      className="w-36 px-1 py-0.5 border border-gray-300 rounded text-sm"
                    />
                  </td>
                  <td className="px-3 py-1 text-center">
                    <button
                      onClick={() => handleCellChange(manifestId, sampleIdx, 'isRush', !sampleData.isRush)}
                      className={`p-1 rounded ${sampleData.isRush ? 'bg-red-100' : 'hover:bg-gray-100'}`}
                    >
                      <Zap className={`w-3 h-3 ${sampleData.isRush ? 'text-red-600' : 'text-gray-400'}`} />
                    </button>
                  </td>
                  <td className="px-3 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={sampleData.dpmEarlyStart || false}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'dpmEarlyStart', e.target.checked)}
                      className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <label className="flex items-center" title="Cannabinoids">
                        <input
                          type="checkbox"
                          checked={sampleData.assays?.cannabinoids || sampleData.cannabinoids || false}
                          onChange={(e) => handleCellChange(manifestId, sampleIdx, 'assay_cannabinoids', e.target.checked)}
                          className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-1 text-xs">C</span>
                      </label>
                      <label className="flex items-center" title="Terpenes">
                        <input
                          type="checkbox"
                          checked={sampleData.assays?.terpenes || sampleData.terpenes || false}
                          onChange={(e) => handleCellChange(manifestId, sampleIdx, 'assay_terpenes', e.target.checked)}
                          className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-1 text-xs">T</span>
                      </label>
                      <label className="flex items-center" title="Pesticides">
                        <input
                          type="checkbox"
                          checked={sampleData.assays?.pesticides || sampleData.pesticides || false}
                          onChange={(e) => handleCellChange(manifestId, sampleIdx, 'assay_pesticides', e.target.checked)}
                          className="h-3 w-3 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-1 text-xs">P</span>
                      </label>
                      <label className="flex items-center" title="Microbial">
                        <input
                          type="checkbox"
                          checked={sampleData.micro || false}
                          onChange={(e) => handleCellChange(manifestId, sampleIdx, 'micro', e.target.checked)}
                          className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="ml-1 text-xs">M</span>
                      </label>
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <input
                      type="text"
                      value={sampleData.notes || ''}
                      onChange={(e) => handleCellChange(manifestId, sampleIdx, 'notes', e.target.value)}
                      className="w-32 px-1 py-0.5 border border-gray-300 rounded text-sm"
                      placeholder="Notes"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with summary */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {allRows.length} samples from {manifests.length} manifests
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