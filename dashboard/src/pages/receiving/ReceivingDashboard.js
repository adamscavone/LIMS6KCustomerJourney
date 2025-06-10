import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight,
  MapPin,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Building2,
  Hash,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Zap,
  X
} from 'lucide-react';

const ReceivingDashboard = () => {
  const [selectedState, setSelectedState] = useState('ohio');
  const [manifests, setManifests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [expandedManifests, setExpandedManifests] = useState({});
  const [selectedManifest, setSelectedManifest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [clientFilter, setClientFilter] = useState('');
  const [showManifestEditor, setShowManifestEditor] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    loadMockData();
  }, [selectedState]);

  const loadMockData = () => {
    // Mock driver data
    const mockDrivers = [
      {
        id: 'D001',
        name: 'Mike Johnson',
        vehicle: 'Van #3',
        currentLocation: 'En route from Columbus',
        eta: new Date(Date.now() + 45 * 60000), // 45 mins from now
        manifestCount: 3,
        status: 'in_transit'
      },
      {
        id: 'D002',
        name: 'Sarah Williams',
        vehicle: 'Van #1',
        currentLocation: 'Cleveland pickup',
        eta: new Date(Date.now() + 120 * 60000), // 2 hours from now
        manifestCount: 5,
        status: 'at_pickup'
      },
      {
        id: 'D003',
        name: 'Tom Chen',
        vehicle: 'Van #2',
        currentLocation: 'Returning to lab',
        eta: new Date(Date.now() + 15 * 60000), // 15 mins from now
        manifestCount: 2,
        status: 'returning'
      }
    ];

    // Mock manifest data with Ohio/Michigan specific test categories
    const mockManifests = selectedState === 'ohio' ? [
      {
        manifestId: '0000112233',
        customerFacilityLicense: 'BRD-00000001-01',
        customerFacility: 'Green Valley Dispensary',
        recipientFacilityLicense: 'LAB-00000042-01',
        packageCount: 8,
        createdDate: new Date('2025-01-08'),
        driverId: 'D001',
        status: 'in_transit',
        eta: new Date(Date.now() + 45 * 60000),
        priority: 'rush',
        samples: [
          {
            metrcTag: '1A4060300003F2000000001',
            sourcePackage: '1A4060300002A1000000123',
            sourceHarvest: 'Harvest-2025-001 (01/02/2025)',
            itemName: 'BULK001: Blue Dream Flower',
            strain: 'Blue Dream',
            grossWeight: 15.5,
            itemCategory: 'Bulk Flower/Buds',
            testCategory: 'DPM',
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000002',
            sourcePackage: '1A4060300002A1000000124',
            sourceHarvest: 'Harvest-2025-001 (01/02/2025)',
            itemName: 'BULK002: OG Kush Flower',
            strain: 'OG Kush',
            grossWeight: 12.3,
            itemCategory: 'Bulk Flower/Buds',
            testCategory: 'DPM',
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          }
        ]
      },
      {
        manifestId: '0000112244',
        customerFacilityLicense: 'CUL-00000123-01',
        customerFacility: 'Wellness Center Ohio',
        recipientFacilityLicense: 'LAB-00000042-01',
        packageCount: 12,
        createdDate: new Date('2025-01-08'),
        driverId: 'D002',
        status: 'scheduled',
        eta: new Date(Date.now() + 120 * 60000),
        priority: 'normal',
        samples: []
      },
      {
        manifestId: '0000112255',
        customerFacilityLicense: 'PRO-00000456-01',
        customerFacility: 'Buckeye Edibles',
        recipientFacilityLicense: 'LAB-00000042-01',
        packageCount: 6,
        createdDate: new Date('2025-01-07'),
        driverId: 'D003',
        status: 'in_transit',
        eta: new Date(Date.now() + 15 * 60000),
        priority: 'normal',
        samples: []
      }
    ] : [
      // Michigan manifests with DPM early start samples
      {
        manifestId: '0000223344',
        customerFacilityLicense: 'AU-C-000001',
        customerFacility: 'Motor City Cannabis',
        recipientFacilityLicense: 'SC-000042',
        packageCount: 10,
        createdDate: new Date('2025-01-08'),
        driverId: 'D001',
        status: 'in_transit',
        eta: new Date(Date.now() + 45 * 60000),
        priority: 'normal',
        hasDPMEarlyStart: true,
        samples: [
          {
            metrcTag: '1A4060300003F2000000011',
            sourcePackage: '1A4060300002A1000000211',
            sourceHarvest: 'MI-Harvest-2025-001 (01/03/2025)',
            itemName: 'FLOWER001: Purple Haze',
            strain: 'Purple Haze',
            grossWeight: 14.2,
            itemCategory: 'Flower',
            testCategory: 'Flower',
            requiresDPMEarlyStart: true,
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000012',
            sourcePackage: '1A4060300002A1000000212',
            sourceHarvest: 'MI-Harvest-2025-001 (01/03/2025)',
            itemName: 'FLOWER002: Northern Lights',
            strain: 'Northern Lights',
            grossWeight: 16.8,
            itemCategory: 'Flower',
            testCategory: 'Flower',
            requiresDPMEarlyStart: true,
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          }
        ]
      }
    ];

    setDrivers(mockDrivers);
    setManifests(mockManifests);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // In production, this would fetch from METRC API
    await new Promise(resolve => setTimeout(resolve, 1000));
    loadMockData();
    setLastRefresh(new Date());
    setRefreshing(false);
  };

  const toggleManifestExpansion = (manifestId) => {
    setExpandedManifests(prev => ({
      ...prev,
      [manifestId]: !prev[manifestId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'at_pickup': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'returning': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'scheduled': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'rush') {
      return <Zap className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const formatLocalTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatFullDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]}, ${date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })}`;
  };

  // Get unique clients for filter dropdown
  const uniqueClients = [...new Set(manifests.map(m => m.customerFacility))].sort();

  const filteredManifests = manifests.filter(manifest => {
    const matchesSearch = manifest.manifestId.includes(searchTerm) ||
      manifest.customerFacility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manifest.customerFacilityLicense.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClient = !clientFilter || manifest.customerFacility === clientFilter;
    
    return matchesSearch && matchesClient;
  });

  const handleReceiveClick = (manifest) => {
    setSelectedManifest(manifest);
    setShowManifestEditor(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sample Receiving Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor inbound samples and driver schedules</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* State Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedState('ohio')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedState === 'ohio' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Ohio Lab
                </button>
                <button
                  onClick={() => setSelectedState('michigan')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedState === 'michigan' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Michigan Lab
                </button>
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Last updated */}
          <div className="text-sm text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>

        {/* Driver Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {drivers.map(driver => (
            <div key={driver.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.vehicle}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                  {driver.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                {driver.currentLocation}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="font-medium">ETA: {formatLocalTime(driver.eta)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-1" />
                  {driver.manifestCount} manifests
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by manifest ID, license number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Clients</option>
                {uniqueClients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Manifests List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Inbound Manifests</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredManifests.map(manifest => (
              <div key={manifest.manifestId} className="p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleManifestExpansion(manifest.manifestId)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {expandedManifests[manifest.manifestId] ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          Manifest #{manifest.manifestId}
                        </h3>
                        {getPriorityIcon(manifest.priority)}
                        {manifest.hasDPMEarlyStart && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            DPM Early Start
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span className="font-medium">{manifest.customerFacility}</span>
                        <span>•</span>
                        <span>{manifest.packageCount} packages</span>
                        <span>•</span>
                        <span>ETA: {formatLocalTime(manifest.eta)}</span>
                        <span>•</span>
                        <span>{formatFullDate(manifest.createdDate)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReceiveClick(manifest);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Receive
                  </button>
                </div>

                {/* Expanded Sample Details */}
                {expandedManifests[manifest.manifestId] && manifest.samples.length > 0 && (
                  <div className="mt-4 ml-9">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="text-left py-2">METRC Tag</th>
                          <th className="text-left py-2">Item Name</th>
                          <th className="text-left py-2">Category</th>
                          <th className="text-left py-2">Test Category</th>
                          <th className="text-left py-2">Gross Weight</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {manifest.samples.map((sample, idx) => (
                          <tr key={idx} className="text-sm">
                            <td className="py-2 font-mono text-xs">{sample.metrcTag}</td>
                            <td className="py-2">{sample.itemName}</td>
                            <td className="py-2">{sample.itemCategory}</td>
                            <td className="py-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                {sample.testCategory}
                              </span>
                              {sample.requiresDPMEarlyStart && (
                                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                  Early Start
                                </span>
                              )}
                            </td>
                            <td className="py-2">{sample.grossWeight} g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manifest Editor Modal */}
      {showManifestEditor && selectedManifest && (
        <ManifestEditor 
          manifest={selectedManifest}
          onClose={() => {
            setShowManifestEditor(false);
            setSelectedManifest(null);
          }}
          onReceive={(data) => {
            console.log('Received manifest data:', data);
            // In production, this would submit to API
            setShowManifestEditor(false);
            setSelectedManifest(null);
          }}
        />
      )}
    </div>
  );
};

// Manifest Editor Component
const ManifestEditor = ({ manifest, onClose, onReceive }) => {
  const [activeTab, setActiveTab] = useState('sampleInfo');
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [sampleData, setSampleData] = useState({});
  const [ccOrderId, setCcOrderId] = useState('');
  const [notes, setNotes] = useState('');

  // Initialize sample data
  useEffect(() => {
    const initialData = {};
    manifest.samples.forEach((sample, index) => {
      initialData[index] = {
        ...sample,
        processedProduct: {
          inhaled: false,
          solvent: false,
          potencyCategory: '',
          size: '',
          sizeUnit: 'grams',
          container: ''
        },
        bundledTests: [],
        panels: [],
        retest: false,
        shippedQty: '',
        srcPkgWgt: '',
        grossWt: sample.grossWeight || '',
        uom: 'mg/g',
        potencyTarget: {
          type: 'target',
          analytes: [{ analyte: '', target: '', rangeLow: '', rangeHigh: '' }]
        }
      };
    });
    setSampleData(initialData);
  }, [manifest]);

  const currentSample = manifest.samples[selectedSampleIndex] || {};
  const currentSampleData = sampleData[selectedSampleIndex] || {};

  const handleSampleDataChange = (field, value) => {
    setSampleData(prev => ({
      ...prev,
      [selectedSampleIndex]: {
        ...prev[selectedSampleIndex],
        [field]: value
      }
    }));
  };

  const handleProcessedProductChange = (field, value) => {
    setSampleData(prev => ({
      ...prev,
      [selectedSampleIndex]: {
        ...prev[selectedSampleIndex],
        processedProduct: {
          ...prev[selectedSampleIndex].processedProduct,
          [field]: value
        }
      }
    }));
  };

  const handleReceive = () => {
    const receiveData = {
      manifestId: manifest.manifestId,
      ccOrderId,
      notes,
      samples: sampleData
    };
    onReceive(receiveData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Edit Metrc Manifest</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Header Information Bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium">{manifest.customerFacility}</span>
          <div className="flex items-center space-x-4">
            <span className="text-sm">METRC Manifest #: <span className="font-mono">{manifest.manifestId}</span></span>
            <div className="flex items-center space-x-2">
              <label className="text-sm">CC Order ID | CC ID:</label>
              <input
                type="text"
                value={ccOrderId}
                onChange={(e) => setCcOrderId(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <span className="text-sm font-mono">{manifest.customerFacilityLicense}</span>
        </div>

        {/* Three Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Sample Information */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('sampleInfo')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'sampleInfo' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sample Info
                </button>
                <button
                  onClick={() => setActiveTab('processedProduct')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'processedProduct' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Processed Product
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'sampleInfo' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">METRC Package #:</label>
                    <input
                      type="text"
                      value={currentSample.metrcTag || ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source Package:</label>
                    <input
                      type="text"
                      value={currentSample.sourcePackage || ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source Harvest:</label>
                    <input
                      type="text"
                      value={currentSample.sourceHarvest || ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name:</label>
                    <input
                      type="text"
                      value={currentSample.itemName || ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Item Category:</label>
                    <select
                      value={currentSample.itemCategory || ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Bulk Flower/Buds">Bulk Flower/Buds</option>
                      <option value="Flower">Flower</option>
                      <option value="Concentrate">Concentrate</option>
                      <option value="InfusedEdible">Infused Edible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Strain:</label>
                    <input
                      type="text"
                      value={currentSample.strain || ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sample Needed By:</label>
                    <input
                      type="datetime-local"
                      value={currentSample.sampleNeededBy ? new Date(currentSample.sampleNeededBy).toISOString().slice(0, 16) : ''}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentSampleData.processedProduct?.inhaled || false}
                        onChange={(e) => handleProcessedProductChange('inhaled', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Inhaled</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentSampleData.processedProduct?.solvent || false}
                        onChange={(e) => handleProcessedProductChange('solvent', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Solvent</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Potency Category:</label>
                    <select
                      value={currentSampleData.processedProduct?.potencyCategory || ''}
                      onChange={(e) => handleProcessedProductChange('potencyCategory', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select...</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Size:</label>
                    <input
                      type="number"
                      value={currentSampleData.processedProduct?.size || ''}
                      onChange={(e) => handleProcessedProductChange('size', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Units:</label>
                    <select
                      value={currentSampleData.processedProduct?.sizeUnit || 'grams'}
                      onChange={(e) => handleProcessedProductChange('sizeUnit', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="grams">grams</option>
                      <option value="each">each</option>
                      <option value="ml">ml</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Container:</label>
                    <input
                      type="number"
                      value={currentSampleData.processedProduct?.container || ''}
                      onChange={(e) => handleProcessedProductChange('container', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Panel - Testing Configuration */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 space-y-6 overflow-y-auto">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Bundled Tests</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Cannabinoids</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Pesticides</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Heavy Metals</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Microbials</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Panels</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">DPM Standard Panel</span>
                    <AlertTriangle className="w-4 h-4 text-orange-500 ml-2" />
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">PPPT Panel</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">R&D Panel</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentSampleData.retest || false}
                    onChange={(e) => handleSampleDataChange('retest', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Retest</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Shipped Qty:</label>
                  <input
                    type="number"
                    value={currentSampleData.shippedQty || ''}
                    onChange={(e) => handleSampleDataChange('shippedQty', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Src Pkg Wgt:</label>
                  <input
                    type="number"
                    value={currentSampleData.srcPkgWgt || ''}
                    onChange={(e) => handleSampleDataChange('srcPkgWgt', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gross Wt (g):</label>
                  <input
                    type="number"
                    value={currentSampleData.grossWt || ''}
                    onChange={(e) => handleSampleDataChange('grossWt', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UoM:</label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="mg/g"
                        checked={currentSampleData.uom === 'mg/g'}
                        onChange={(e) => handleSampleDataChange('uom', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">mg/g</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="%"
                        checked={currentSampleData.uom === '%'}
                        onChange={(e) => handleSampleDataChange('uom', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">%</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Potency Target</h3>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      <th className="text-left">Analyte</th>
                      <th className="text-left">Target</th>
                      <th className="text-center">OR</th>
                      <th className="text-left" colSpan="2">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-xs">
                          <option value="">Select...</option>
                          <option value="THC">THC</option>
                          <option value="CBD">CBD</option>
                          <option value="CBG">CBG</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="text-center text-gray-400">OR</td>
                      <td>
                        <input
                          type="number"
                          placeholder="Low"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          placeholder="High"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel - Sample Management */}
          <div className="w-1/3 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Manifest Samples</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {manifest.samples.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSampleIndex(index)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedSampleIndex === index 
                          ? 'bg-blue-50 text-blue-700 border border-blue-300' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-sm font-medium">#{index + 1} Sample</div>
                      <div className="text-xs font-mono text-gray-500">{sample.metrcTag}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows="4"
                  placeholder="Enter any notes about this manifest..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleReceive}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Receive
          </button>
          <div className="space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Generate Confident Cannabis Order
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Refresh Manifest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivingDashboard;