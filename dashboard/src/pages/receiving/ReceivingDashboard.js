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
  Zap
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
        driverId: 'D001',
        status: 'in_transit',
        eta: new Date(Date.now() + 45 * 60000),
        priority: 'rush',
        sampleCount: 8,
        samples: [
          {
            metrcTag: '1A4060300003F2000000001',
            sourcePackage: '1A4060300002A1000000123',
            strain: 'Blue Dream',
            grossWeight: 15.5,
            itemCategory: 'Flower',
            testCategory: 'DPM',
            client: 'Green Valley Dispensary'
          },
          {
            metrcTag: '1A4060300003F2000000002',
            sourcePackage: '1A4060300002A1000000124',
            strain: 'OG Kush',
            grossWeight: 12.3,
            itemCategory: 'Flower',
            testCategory: 'DPM',
            client: 'Green Valley Dispensary'
          },
          {
            metrcTag: '1A4060300003F2000000003',
            sourcePackage: '1A4060300002A1000000125',
            strain: 'Gorilla Glue #4',
            grossWeight: 18.7,
            itemCategory: 'Flower',
            testCategory: 'PPM',
            client: 'Wellness Center Ohio'
          },
          {
            metrcTag: '1A4060300003F2000000004',
            sourcePackage: '1A4060300002A1000000126',
            strain: 'Wedding Cake',
            grossWeight: 0,
            unitCount: 100,
            itemCategory: 'InfusedEdible',
            testCategory: 'PPPT',
            client: 'Buckeye Edibles'
          },
          {
            metrcTag: '1A4060300003F2000000005',
            sourcePackage: '1A4060300002A1000000127',
            strain: 'N/A',
            grossWeight: 0,
            unitCount: 50,
            itemCategory: 'Concentrate',
            testCategory: 'NSPNPT',
            client: 'Extract Labs Ohio'
          }
        ]
      },
      {
        manifestId: '0000112244',
        driverId: 'D002',
        status: 'scheduled',
        eta: new Date(Date.now() + 120 * 60000),
        priority: 'normal',
        sampleCount: 12,
        samples: [] // Would be populated when manifest is selected
      },
      {
        manifestId: '0000112255',
        driverId: 'D003',
        status: 'in_transit',
        eta: new Date(Date.now() + 15 * 60000),
        priority: 'normal',
        sampleCount: 6,
        samples: []
      }
    ] : [
      // Michigan manifests with DPM early start samples
      {
        manifestId: '0000223344',
        driverId: 'D001',
        status: 'in_transit',
        eta: new Date(Date.now() + 45 * 60000),
        priority: 'normal',
        sampleCount: 10,
        hasDPMEarlyStart: true,
        samples: [
          {
            metrcTag: '1A4060300003F2000000011',
            sourcePackage: '1A4060300002A1000000211',
            strain: 'Purple Haze',
            grossWeight: 14.2,
            itemCategory: 'Flower',
            testCategory: 'Flower',
            requiresDPMEarlyStart: true,
            client: 'Motor City Cannabis'
          },
          {
            metrcTag: '1A4060300003F2000000012',
            sourcePackage: '1A4060300002A1000000212',
            strain: 'Northern Lights',
            grossWeight: 16.8,
            itemCategory: 'Flower',
            testCategory: 'Flower',
            requiresDPMEarlyStart: true,
            client: 'Motor City Cannabis'
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

  const formatETA = (date) => {
    const now = new Date();
    const diffMs = date - now;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) return 'Overdue';
    if (diffMins === 0) return 'Arriving now';
    if (diffMins < 60) return `${diffMins} min`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const filteredManifests = manifests.filter(manifest => 
    manifest.manifestId.includes(searchTerm) ||
    manifest.samples.some(sample => 
      sample.metrcTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.client.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
                  <span className="font-medium">ETA: {formatETA(driver.eta)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-1" />
                  {driver.manifestCount} manifests
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by manifest ID, METRC tag, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
                        <span>{manifest.sampleCount} samples</span>
                        <span>•</span>
                        <span>ETA: {formatETA(manifest.eta)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedManifest(manifest);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Process Manifest
                  </button>
                </div>

                {/* Expanded Sample Details */}
                {expandedManifests[manifest.manifestId] && manifest.samples.length > 0 && (
                  <div className="mt-4 ml-9">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="text-left py-2">METRC Tag</th>
                          <th className="text-left py-2">Client</th>
                          <th className="text-left py-2">Type</th>
                          <th className="text-left py-2">Test Category</th>
                          <th className="text-left py-2">Weight/Units</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {manifest.samples.map((sample, idx) => (
                          <tr key={idx} className="text-sm">
                            <td className="py-2 font-mono text-xs">{sample.metrcTag}</td>
                            <td className="py-2">{sample.client}</td>
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
                            <td className="py-2">
                              {sample.grossWeight > 0 ? `${sample.grossWeight}g` : `${sample.unitCount} units`}
                            </td>
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
    </div>
  );
};

export default ReceivingDashboard;