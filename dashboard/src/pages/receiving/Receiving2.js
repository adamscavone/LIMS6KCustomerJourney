import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  X,
  Edit
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
import { 
  ANALYTE_DEFINITIONS,
  getAnalytesForAssay,
  hasIndividualAnalytes
} from '../../utils/analyteDefinitions';

const Receiving2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse URL parameters to determine active tab
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab') || 'pending';
  
  const [selectedState, setSelectedState] = useState('ohio');
  const [currentState] = useState('Michigan'); // For demo purposes
  const [manifests, setManifests] = useState([]);
  const [receivedManifests, setReceivedManifests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [expandedManifests, setExpandedManifests] = useState({});
  const [expandedActiveManifests, setExpandedActiveManifests] = useState({});
  const [manifestData, setManifestData] = useState({});
  const [selectedSamples, setSelectedSamples] = useState({});
  const [showDetailedDeadlines, setShowDetailedDeadlines] = useState(false);
  const [showCustomDeadlines, setShowCustomDeadlines] = useState(false);
  const [customDeadlines, setCustomDeadlines] = useState({});
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [globalSettings, setGlobalSettings] = useState({
    testCategory: 'keep',
    nctlSampleType: '',
    dpmEarlyStart: false,
    rushTurnaround: false,
    microDue: '',
    chemistryDue: '',
    otherDue: '',
    allAssays: {},
    isRetest: false,
    whitelistedAnalytes: {}
  });

  // Update active tab when URL changes
  useEffect(() => {
    const newTab = searchParams.get('tab') || 'pending';
    setActiveTab(newTab);
  }, [location.search]);
  
  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'pending') {
      navigate('/receiving2');
    } else {
      navigate(`/receiving2?tab=${tab}`);
    }
  };
  
  // Check if all samples in a manifest have valid sample types
  const areAllSampleTypesValid = (manifestId) => {
    const manifest = manifests.find(m => m.manifestId === manifestId);
    if (!manifest) return false;
    
    // Check each sample
    for (let i = 0; i < manifest.samples.length; i++) {
      const sampleData = manifestData[manifestId]?.samples?.[i] || {};
      const manifestSample = manifest.samples[i];
      
      // Get the current sample type value
      const sampleType = sampleData.nctlSampleType || getDefaultSampleType(manifestSample.itemCategory, manifestSample.itemName);
      
      // Check if sample type is empty or unselected
      if (!sampleType || sampleType === '') {
        return false;
      }
    }
    
    return true;
  };

  // Handle receiving a manifest
  const handleReceiveManifest = (manifestId) => {
    // Validate all samples have sample types
    if (!areAllSampleTypesValid(manifestId)) {
      alert('All samples must have a sample type selected before receiving the manifest.');
      return;
    }
    
    const data = manifestData[manifestId];
    
    // Find the manifest to receive
    const manifestToReceive = manifests.find(m => m.manifestId === manifestId);
    if (manifestToReceive) {
      // Add received timestamp and move to received manifests
      const receivedManifest = {
        ...manifestToReceive,
        receivedAt: new Date(),
        receivedBy: 'Dr. Sarah Chen', // In production, this would be the current user
        status: 'active',
        manifestData: data
      };
      
      // Add to received manifests
      setReceivedManifests(prev => [...prev, receivedManifest]);
      
      // Remove from pending manifests
      setManifests(prev => prev.filter(m => m.manifestId !== manifestId));
      
      // Close the expansion
      setExpandedManifests(prev => ({
        ...prev,
        [manifestId]: false
      }));
      
      // Clear selected samples
      setSelectedSamples({});
      
      // Switch to active tab to show the received manifest
      handleTabChange('active');
    }
  };

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

  // Generate mock manifests based on selected state
  useEffect(() => {
    const ohioManifests = [
      {
        manifestId: 'M-OH-2025-001',
        manifestNumber: '0000012345',
        createdDate: '2025-06-13T08:00:00',
        client: 'Green Valley Dispensary',
        driver: { name: 'Mike Thompson', eta: '2025-06-13T10:30:00' },
        status: 'in_transit',
        state: 'ohio',
        samples: [
          { metrcTag: 'OH-ABC123456789', strain: 'Blue Dream', itemName: 'Blue Dream Flower - 1oz', itemCategory: 'Buds', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'OH-ABC123456790', strain: 'OG Kush', itemName: 'OG Kush Flower - 1oz', itemCategory: 'Buds', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'OH-ABC123456791', strain: 'Gelato', itemName: 'Gelato Live Rosin - 1g', itemCategory: 'Concentrate', testCategory: 'Solvent Based Product (Not Previously Tested)' },
          { metrcTag: 'OH-ABC123456792', strain: 'Wedding Cake', itemName: 'Wedding Cake Vape Cart - 0.5g', itemCategory: 'Vape Cartridge', testCategory: 'Solvent Based Product (Not Previously Tested)' }
        ]
      },
      {
        manifestId: 'M-OH-2025-002',
        manifestNumber: '0000012346',
        createdDate: '2025-06-13T09:15:00',
        client: 'Sunrise Cannabis Co',
        driver: { name: 'Sarah Johnson', eta: '2025-06-13T11:45:00' },
        status: 'in_transit',
        state: 'ohio',
        samples: [
          { metrcTag: 'OH-DEF123456789', strain: 'Purple Haze', itemName: 'Purple Haze Shake - 5oz', itemCategory: 'Shake', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'OH-DEF123456790', strain: 'N/A', itemName: 'Strawberry Gummies - 100mg', itemCategory: 'Edibles', testCategory: 'Non-Solvent Product (Not Previously Tested)' },
          { metrcTag: 'OH-DEF123456791', strain: 'N/A', itemName: 'Chocolate Bar - 200mg', itemCategory: 'Edibles', testCategory: 'Non-Solvent Product (Not Previously Tested)' }
        ]
      },
      {
        manifestId: 'M-OH-2025-003',
        manifestNumber: '0000012347',
        createdDate: '2025-06-13T10:30:00',
        client: 'Ohio Natural Wellness',
        driver: { name: 'David Lee', eta: '2025-06-13T13:00:00' },
        status: 'in_transit',
        state: 'ohio',
        samples: [
          { metrcTag: 'OH-GHI123456789', strain: 'Gorilla Glue', itemName: 'GG4 Flower - 3.5g', itemCategory: 'Buds', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'OH-GHI123456790', strain: 'Sour Diesel', itemName: 'Sour D Pre-Roll - 1g', itemCategory: 'Pre-Roll', testCategory: 'Dispensary Plant Material' }
        ]
      }
    ];

    const michiganManifests = [
      {
        manifestId: 'M-MI-2025-001',
        manifestNumber: '0000098765',
        createdDate: '2025-06-13T07:30:00',
        client: 'Detroit Green Solutions',
        driver: { name: 'Jennifer Smith', eta: '2025-06-13T09:45:00' },
        status: 'in_transit',
        state: 'michigan',
        samples: [
          { metrcTag: 'MI-XYZ789012345', strain: 'Northern Lights', itemName: 'Northern Lights Flower - 3.5g', itemCategory: 'Buds', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'MI-XYZ789012346', strain: 'Girl Scout Cookies', itemName: 'GSC Flower - 7g', itemCategory: 'Buds', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'MI-XYZ789012347', strain: 'N/A', itemName: 'THC Tincture - 30ml', itemCategory: 'Tincture', testCategory: 'Non-Solvent Product (Not Previously Tested)' }
        ]
      },
      {
        manifestId: 'M-MI-2025-002',
        manifestNumber: '0000098766',
        createdDate: '2025-06-13T08:45:00',
        client: 'Ann Arbor Organics',
        driver: { name: 'Robert Johnson', eta: '2025-06-13T11:00:00' },
        status: 'in_transit',
        state: 'michigan',
        samples: [
          { metrcTag: 'MI-LMN456789012', strain: 'Jack Herer', itemName: 'Jack Herer Pre-Roll Pack - 5x0.5g', itemCategory: 'Pre-Roll', testCategory: 'Dispensary Plant Material' },
          { metrcTag: 'MI-LMN456789013', strain: 'Zkittlez', itemName: 'Zkittlez Live Resin - 1g', itemCategory: 'Concentrate', testCategory: 'Solvent Based Product (Not Previously Tested)' },
          { metrcTag: 'MI-LMN456789014', strain: 'N/A', itemName: 'Mixed Berry Gummies - 200mg', itemCategory: 'Edibles', testCategory: 'Non-Solvent Product (Not Previously Tested)' },
          { metrcTag: 'MI-LMN456789015', strain: 'N/A', itemName: 'Dark Chocolate Bar - 100mg', itemCategory: 'Edibles', testCategory: 'Non-Solvent Product (Not Previously Tested)' }
        ]
      }
    ];

    // Set manifests based on selected state
    if (selectedState === 'ohio') {
      setManifests(ohioManifests);
    } else {
      setManifests(michiganManifests);
    }
    
    // Clear any received manifests when switching states
    setReceivedManifests([]);
    setSelectedSamples({});
    setManifestData({});
  }, [selectedState]);

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
    const isCurrentlySelected = selectedSamples[key];
    
    // Get the sample being clicked
    const manifest = manifests.find(m => m.manifestId === manifestId);
    const clickedSample = manifest?.samples[sampleIdx];
    
    if (!clickedSample) return;
    
    let newSelectedSamples = { ...selectedSamples };
    
    if (!isCurrentlySelected) {
      // Selecting a new sample
      // Check if any samples are already selected
      const selectedKeys = Object.keys(selectedSamples).filter(k => selectedSamples[k]);
      
      if (selectedKeys.length > 0) {
        // Check test category of first selected sample
        const [firstManifestId, firstSampleIdx] = selectedKeys[0].split('-');
        const firstManifest = manifests.find(m => m.manifestId === firstManifestId);
        const firstSample = firstManifest?.samples[parseInt(firstSampleIdx)];
        
        if (firstSample && firstSample.testCategory !== clickedSample.testCategory) {
          // Different test category - clear all selections
          newSelectedSamples = { [key]: true };
        } else {
          // Same test category - add to selection
          newSelectedSamples[key] = true;
        }
      } else {
        // First sample being selected
        newSelectedSamples[key] = true;
      }
      
      // Update test configuration based on selected sample
      const selectedCount = Object.values(newSelectedSamples).filter(Boolean).length;
      if (selectedCount === 1) {
        // Set test category and calculate dates
        const defaultAssays = getDefaultAssays(clickedSample.testCategory);
        
        const microDeadline = getSuggestedMicroDeadline(
          manifest.createdDate, 
          defaultAssays, 
          globalSettings.rushTurnaround
        );
        const chemDeadline = getSuggestedChemistryDeadline(
          manifest.createdDate, 
          defaultAssays, 
          globalSettings.rushTurnaround
        );
        
        setGlobalSettings(prev => ({
          ...prev,
          testCategory: clickedSample.testCategory,
          allAssays: defaultAssays,
          microDue: microDeadline ? new Date(microDeadline).toISOString().slice(0, 16) : '',
          chemistryDue: chemDeadline ? new Date(chemDeadline).toISOString().slice(0, 16) : '',
          otherDue: ''
        }));
      }
    } else {
      // Deselecting
      newSelectedSamples[key] = false;
      
      // If no samples remain selected, reset to "keep"
      const remainingCount = Object.values(newSelectedSamples).filter(Boolean).length;
      if (remainingCount === 0) {
        setGlobalSettings(prev => ({
          ...prev,
          testCategory: 'keep',
          allAssays: {},
          microDue: '',
          chemistryDue: '',
          otherDue: ''
        }));
      }
    }
    
    setSelectedSamples(newSelectedSamples);
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
    // Check if any samples are selected
    const selectedKeys = Object.keys(selectedSamples).filter(key => selectedSamples[key]);
    if (selectedKeys.length === 0) {
      alert('Please select at least one sample to configure.');
      return;
    }
    
    const updatedData = { ...manifestData };
    let configuredCount = 0;
    let errorMessages = [];
    
    // First pass: validate all selected samples
    for (const key of selectedKeys) {
      const [manifestId, sampleIdx] = key.split('-');
      const manifest = manifests.find(m => m.manifestId === manifestId);
      if (!manifest) continue;
      
      const existingSampleData = updatedData[manifestId]?.samples?.[parseInt(sampleIdx)] || {};
      const manifestSample = manifest.samples[parseInt(sampleIdx)];
      
      // Check if sample type is set (either from previous config or default)
      const sampleType = existingSampleData.nctlSampleType || 
                        globalSettings.nctlSampleType || 
                        getDefaultSampleType(manifestSample.itemCategory, manifestSample.itemName);
      
      if (!sampleType) {
        errorMessages.push(`Sample ${manifestSample.metrcTag} requires a sample type`);
      }
    }
    
    if (errorMessages.length > 0) {
      alert('Configuration errors:\n' + errorMessages.join('\n'));
      return;
    }
    
    // Second pass: apply configurations
    selectedKeys.forEach(key => {
      const [manifestId, sampleIdx] = key.split('-');
      const manifest = manifests.find(m => m.manifestId === manifestId);
      if (!manifest) return; // Skip if manifest not found
      
      if (!updatedData[manifestId]) {
        updatedData[manifestId] = { samples: {} };
      }
      if (!updatedData[manifestId].samples[parseInt(sampleIdx)]) {
        updatedData[manifestId].samples[parseInt(sampleIdx)] = {};
      }
      
      const sample = updatedData[manifestId].samples[parseInt(sampleIdx)];
      const manifestSample = manifest.samples[parseInt(sampleIdx)];
      
      // Apply test category only if not "keep"
      if (globalSettings.testCategory !== 'keep') {
        sample.testCategory = globalSettings.testCategory;
      } else {
        // Keep existing test category from sample data or manifest sample
        if (!sample.testCategory) {
          sample.testCategory = manifestSample.testCategory || 'Dispensary Plant Material';
        }
      }
      
      // Apply sample type
      if (globalSettings.nctlSampleType) {
        sample.nctlSampleType = globalSettings.nctlSampleType;
      } else if (!sample.nctlSampleType) {
        sample.nctlSampleType = getDefaultSampleType(manifestSample.itemCategory, manifestSample.itemName);
      }
      
      sample.dpmEarlyStart = globalSettings.dpmEarlyStart;
      sample.isRush = globalSettings.rushTurnaround;
      sample.assays = { ...globalSettings.allAssays };
      sample.isRetest = globalSettings.isRetest;
      sample.whitelistedAnalytes = globalSettings.isRetest ? { ...globalSettings.whitelistedAnalytes } : {};
      
      // Calculate deadlines
      if (manifest) {
        const microDeadline = getSuggestedMicroDeadline(manifest.createdDate, globalSettings.allAssays, globalSettings.rushTurnaround);
        const chemDeadline = getSuggestedChemistryDeadline(manifest.createdDate, globalSettings.allAssays, globalSettings.rushTurnaround);
        
        sample.microDue = globalSettings.microDue || microDeadline || '';
        sample.chemistryDue = globalSettings.chemistryDue || chemDeadline || '';
        sample.otherDue = globalSettings.otherDue || '';
        sample.applied = true;
        configuredCount++;
      }
    });
    
    // Update state
    setManifestData(updatedData);
    
    // Clear selections
    setSelectedSamples({});
    
    // Simple success message
    if (configuredCount > 0) {
      alert(`Successfully applied settings to ${configuredCount} samples.`);
    }
  };

  // Calculate selected count
  const selectedCount = Object.values(selectedSamples).filter(Boolean).length;
  const totalSampleCount = manifests.reduce((sum, m) => sum + m.samples.length, 0);
  
  // Analyze common due dates for selected samples
  const getCommonDueDates = () => {
    const selectedKeys = Object.keys(selectedSamples).filter(key => selectedSamples[key]);
    if (selectedKeys.length === 0) {
      return { chemistryDue: null, microDue: null, otherDue: null, hasCommon: false };
    }
    
    let chemistryDates = new Set();
    let microDates = new Set();
    let otherDates = new Set();
    
    // Calculate due dates for each selected sample
    selectedKeys.forEach(key => {
      const [manifestId, sampleIdx] = key.split('-');
      const manifest = manifests.find(m => m.manifestId === manifestId);
      
      if (manifest) {
        // Check if sample has saved data
        const sampleData = manifestData[manifestId]?.samples?.[parseInt(sampleIdx)];
        
        // Calculate the expected due dates
        const microDeadline = getSuggestedMicroDeadline(
          manifest.createdDate, 
          globalSettings.allAssays, 
          globalSettings.rushTurnaround
        );
        const chemDeadline = getSuggestedChemistryDeadline(
          manifest.createdDate, 
          globalSettings.allAssays, 
          globalSettings.rushTurnaround
        );
        
        // Use saved data if available, otherwise use calculated
        const chemDate = sampleData?.chemistryDue || (chemDeadline ? new Date(chemDeadline).toISOString().slice(0, 16) : '');
        const microDate = sampleData?.microDue || (microDeadline ? new Date(microDeadline).toISOString().slice(0, 16) : '');
        const otherDate = sampleData?.otherDue || '';
        
        chemistryDates.add(chemDate);
        microDates.add(microDate);
        otherDates.add(otherDate);
      }
    });
    
    return {
      chemistryDue: chemistryDates.size === 1 ? [...chemistryDates][0] : null,
      microDue: microDates.size === 1 ? [...microDates][0] : null,
      otherDue: otherDates.size === 1 ? [...otherDates][0] : null,
      hasCommonChemistry: chemistryDates.size === 1,
      hasCommonMicro: microDates.size === 1,
      hasCommonOther: otherDates.size === 1
    };
  };
  
  const commonDueDates = getCommonDueDates();
  
  // Get the test category of currently selected samples
  const getSelectedTestCategory = () => {
    const selectedKeys = Object.keys(selectedSamples).filter(key => selectedSamples[key]);
    if (selectedKeys.length === 0) return null;
    
    const [firstManifestId, firstSampleIdx] = selectedKeys[0].split('-');
    const firstManifest = manifests.find(m => m.manifestId === firstManifestId);
    const firstSample = firstManifest?.samples[parseInt(firstSampleIdx)];
    
    return firstSample?.testCategory || null;
  };
  
  const selectedTestCategory = getSelectedTestCategory();
  
  
  // Get the currently expanded manifest
  const getExpandedManifest = () => {
    const expandedManifestId = Object.keys(expandedManifests).find(id => expandedManifests[id]);
    if (!expandedManifestId) return null;
    return manifests.find(m => m.manifestId === expandedManifestId);
  };
  
  const expandedManifest = getExpandedManifest();
  const manifestSampleCount = expandedManifest ? expandedManifest.samples.length : totalSampleCount;
  const manifestSelectedCount = expandedManifest 
    ? expandedManifest.samples.filter((_, idx) => selectedSamples[`${expandedManifest.manifestId}-${idx}`]).length
    : selectedCount;

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
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Receipt ({manifests.length})
          </button>
          <button
            onClick={() => handleTabChange('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Manifests ({receivedManifests.length})
          </button>
          <button
            onClick={() => handleTabChange('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manifest Archive
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'pending' && (
        <>
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
          {/* Manifests Container */}
          <div className="bg-white border-2 border-blue-200 rounded-lg shadow-lg">
            {/* Container Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Pending Metrc Manifests
              </h2>
              <p className="text-sm text-blue-100 mt-1">
                Select samples from manifests to configure testing
              </p>
            </div>
            
            {/* Manifests List */}
            <div className="p-4 space-y-3">
              {selectedTestCategory && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Test Category Selected:</span> {selectedTestCategory}
                    <br />
                    <span className="text-xs">Only samples with this test category can be selected</span>
                  </p>
                </div>
              )}
              
              {manifests.map(manifest => {
                const isExpanded = expandedManifests[manifest.manifestId];
                const manifestSelectedCount = manifest.samples.filter((_, idx) => 
                  selectedSamples[`${manifest.manifestId}-${idx}`]
                ).length;
                
                return (
                  <div key={manifest.manifestId} className="bg-white rounded-lg border border-gray-200">
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
                            const canSelect = !selectedTestCategory || selectedTestCategory === sample.testCategory;
                            
                            return (
                              <tr key={idx} className={`${
                                isSelected ? 'bg-blue-50' : 
                                sampleData.isRetest ? 'bg-yellow-50' :
                                canSelect ? 'hover:bg-gray-50' : 'opacity-50'
                              } transition-colors`}>
                                <td className="py-3 px-4">
                                  <input
                                    type="checkbox"
                                    checked={isSelected || false}
                                    onChange={() => toggleSampleSelection(manifest.manifestId, idx)}
                                    disabled={!canSelect}
                                    className={`h-4 w-4 ${
                                      canSelect ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'
                                    } border-gray-300 rounded`}
                                    title={!canSelect ? `Cannot select - different test category (${sample.testCategory})` : ''}
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <div className="font-medium text-gray-900">{sample.itemName}</div>
                                    <div className="text-xs text-gray-500">
                                      Tag: ...{sample.metrcTag.slice(-5)} | {sample.strain !== 'N/A' && `Strain: ${sample.strain}`}
                                      {sampleData.isRetest && (
                                        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
                                          RETEST
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {sample.itemCategory}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {sampleData.testCategory || sample.testCategory || 'Dispensary Plant Material'}
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
                      
                      {/* Receive Manifest Button */}
                      <div className="p-4 bg-gray-50 border-t">
                        {(() => {
                          const allTypesValid = areAllSampleTypesValid(manifest.manifestId);
                          
                          return (
                            <>
                              {!allTypesValid && (
                                <p className="text-xs text-red-600 mb-2 text-center">
                                  All samples must have a sample type selected
                                </p>
                              )}
                              <button
                                onClick={() => handleReceiveManifest(manifest.manifestId)}
                                disabled={!allTypesValid}
                                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium ${
                                  allTypesValid 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                <Check className="w-4 h-4" />
                                <span>Receive Manifest</span>
                              </button>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                  </div>
                );
              })}
            </div>
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
                    if (newCategory !== 'keep') {
                      const defaultAssays = getDefaultAssays(newCategory);
                      setGlobalSettings(prev => ({ 
                        ...prev, 
                        testCategory: newCategory,
                        allAssays: defaultAssays
                      }));
                    } else {
                      setGlobalSettings(prev => ({ 
                        ...prev, 
                        testCategory: newCategory
                      }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="keep">Keep Test Categories...</option>
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
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {currentState === 'Michigan' && globalSettings.isRetest ? 'Select Specific Analytes for Retest' : 'Required Assays'}
                </h3>
                {currentState === 'Michigan' && globalSettings.isRetest ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xs text-yellow-700 mb-2">
                      <AlertTriangle className="inline w-3 h-3 mr-1" />
                      Only selected analytes will be tested
                    </div>
                    {Object.entries(globalSettings.allAssays).filter(([_, isSelected]) => isSelected).map(([assayKey]) => {
                      const analytes = getAnalytesForAssay(assayKey);
                      const whitelisted = globalSettings.whitelistedAnalytes[assayKey] || [];
                      
                      if (analytes.length === 0) return null;
                      
                      return (
                        <div key={assayKey} className="border border-gray-200 rounded-lg p-3 bg-white">
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
                                className={`flex items-center space-x-2 p-2 rounded text-xs cursor-pointer ${
                                  whitelisted.includes(analyte.key) ? 'bg-yellow-100 border border-yellow-300' : 'hover:bg-gray-50 border border-gray-200'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={whitelisted.includes(analyte.key)}
                                  onChange={(e) => {
                                    const updatedWhitelisted = { ...globalSettings.whitelistedAnalytes };
                                    if (!updatedWhitelisted[assayKey]) {
                                      updatedWhitelisted[assayKey] = [];
                                    }
                                    
                                    if (e.target.checked) {
                                      if (!updatedWhitelisted[assayKey].includes(analyte.key)) {
                                        updatedWhitelisted[assayKey].push(analyte.key);
                                      }
                                    } else {
                                      updatedWhitelisted[assayKey] = updatedWhitelisted[assayKey].filter(a => a !== analyte.key);
                                    }
                                    
                                    setGlobalSettings(prev => ({
                                      ...prev,
                                      whitelistedAnalytes: updatedWhitelisted
                                    }));
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
                ) : (
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
                )}
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
                {currentState === 'Michigan' && (
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={globalSettings.isRetest}
                      onChange={(e) => {
                        const isRetest = e.target.checked;
                        setGlobalSettings(prev => ({ 
                          ...prev, 
                          isRetest,
                          whitelistedAnalytes: isRetest ? {} : prev.whitelistedAnalytes
                        }));
                      }}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Michigan Retest</span>
                    <Info className="w-4 h-4 text-yellow-600" title="Single-analyte testing only" />
                  </label>
                )}
              </div>

              {/* Deadlines */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Deadlines/TATs
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      Chemistry Due
                      <span 
                        className="ml-1 text-gray-400 cursor-help group relative"
                        title="Deadline for chemistry assays (HPLC, GCMS, LCMS, ICPMS methods). Individual assays may have different turnaround times."
                      >
                        <Info className="w-3 h-3" />
                        <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-64 z-10">
                          Deadline for chemistry assays (HPLC, GCMS, LCMS, ICPMS methods). Individual assays may have different turnaround times.
                        </span>
                      </span>
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={globalSettings.chemistryDue || ''}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, chemistryDue: e.target.value }))}
                    disabled={selectedCount > 0 && !commonDueDates.hasCommonChemistry}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      selectedCount > 0 && !commonDueDates.hasCommonChemistry ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      Microbial Due
                      <span 
                        className="ml-1 text-gray-400 cursor-help group relative"
                        title="Deadline for microbial assays (culture, petrifilm, PCR methods). Culture-based tests typically take longer than PCR."
                      >
                        <Info className="w-3 h-3" />
                        <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-64 z-10">
                          Deadline for microbial assays (culture, petrifilm, PCR methods). Culture-based tests typically take longer than PCR.
                        </span>
                      </span>
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={globalSettings.microDue || ''}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, microDue: e.target.value }))}
                    disabled={selectedCount > 0 && !commonDueDates.hasCommonMicro}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      selectedCount > 0 && !commonDueDates.hasCommonMicro ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      Other Due
                      <span 
                        className="ml-1 text-gray-400 cursor-help group relative"
                        title="Deadline for other assays (moisture content, water activity, foreign matter, etc.) that don't fall under chemistry or microbial categories."
                      >
                        <Info className="w-3 h-3" />
                        <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-64 z-10">
                          Deadline for other assays (moisture content, water activity, foreign matter, etc.) that don't fall under chemistry or microbial categories.
                        </span>
                      </span>
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={globalSettings.otherDue || ''}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, otherDue: e.target.value }))}
                    disabled={selectedCount > 0 && !commonDueDates.hasCommonOther}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      selectedCount > 0 && !commonDueDates.hasCommonOther ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
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
        </div>
      </div>
        </>
      )}
      
      {/* Active Manifests Tab */}
      {activeTab === 'active' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Active Manifests
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manifests that have been received and are being processed
            </p>
          </div>
          
          {receivedManifests.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No active manifests</h3>
              <p className="mt-1 text-sm text-gray-500">
                Receive manifests from the Pending Receipt tab to see them here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client / Manifest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Samples
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {receivedManifests.map((manifest) => {
                    const isExpanded = expandedActiveManifests[manifest.manifestId];
                    return (
                      <React.Fragment key={manifest.manifestId}>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {manifest.client}
                              </div>
                              <div className="text-sm text-gray-500">
                                {manifest.manifestNumber}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {manifest.samples.length} samples
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>
                              <div>{new Date(manifest.receivedAt).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-400">
                                {new Date(manifest.receivedAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">30%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setExpandedActiveManifests(prev => ({
                                ...prev,
                                [manifest.manifestId]: !prev[manifest.manifestId]
                              }))}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        
                        {isExpanded && (
                          <tr>
                            <td colSpan="5" className="px-6 py-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">
                                  Full sample details and configuration available when expanded
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Archive Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Manifest Archive
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Historical manifests that have been completed
            </p>
          </div>
          
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No archived manifests</h3>
            <p className="mt-1 text-sm text-gray-500">
              Completed manifests will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receiving2;
