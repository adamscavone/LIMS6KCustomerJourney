import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Package,
  Save,
  AlertTriangle,
  CheckCircle,
  Plus,
  Minus,
  Hash,
  Building2,
  FlaskConical,
  Target,
  Send,
  ArrowLeft,
  Info,
  Edit3,
  X,
  ChevronDown,
  Search
} from 'lucide-react';

const SampleProcessing = () => {
  const { manifestId } = useParams();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState(null);
  const [samples, setSamples] = useState([]);
  const [selectedSamples, setSelectedSamples] = useState(new Set());
  const [labState, setLabState] = useState('ohio');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cannabinoidTargets, setCannabinoidTargets] = useState({});
  const [showCannabinoidModal, setShowCannabinoidModal] = useState(false);
  const [currentSampleForTargets, setCurrentSampleForTargets] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showConfidentCannabis, setShowConfidentCannabis] = useState(false);

  // Ohio test categories
  const ohioTestCategories = [
    { value: 'DPM', label: 'Dispensary Plant Material' },
    { value: 'PPM', label: 'Processor Plant Material' },
    { value: 'NSMJ', label: 'Non-Solvent Marijuana Ingredient' },
    { value: 'NSPNPT', label: 'Non-Solvent Product Not Previously Tested' },
    { value: 'PPPT', label: 'Processed Product Previously Tested' },
    { value: 'BULK', label: 'Bulk Flower' },
    { value: 'R&D', label: 'Research & Development' },
    { value: 'R&D VIR', label: 'R&D Viral Testing' }
  ];

  // Michigan test categories
  const michiganTestCategories = [
    { value: 'Flower', label: 'Flower' },
    { value: 'Concentrate', label: 'Concentrate/Extract' },
    { value: 'InfusedEdible', label: 'Infused Edible' },
    { value: 'InfusedNonEdible', label: 'Infused Non-Edible' },
    { value: 'R&D', label: 'Research & Development' }
  ];

  // Enhanced sample types for internal use
  const enhancedSampleTypes = [
    { value: 'flower_indoor', label: 'Flower - Indoor' },
    { value: 'flower_outdoor', label: 'Flower - Outdoor' },
    { value: 'flower_greenhouse', label: 'Flower - Greenhouse' },
    { value: 'preroll_single', label: 'Pre-roll - Single' },
    { value: 'preroll_multi', label: 'Pre-roll - Multi-pack' },
    { value: 'concentrate_shatter', label: 'Concentrate - Shatter' },
    { value: 'concentrate_wax', label: 'Concentrate - Wax' },
    { value: 'concentrate_oil', label: 'Concentrate - Oil' },
    { value: 'concentrate_rosin', label: 'Concentrate - Rosin' },
    { value: 'edible_chocolate', label: 'Edible - Chocolate' },
    { value: 'edible_gummy', label: 'Edible - Gummy' },
    { value: 'edible_beverage', label: 'Edible - Beverage' },
    { value: 'topical_lotion', label: 'Topical - Lotion' },
    { value: 'topical_balm', label: 'Topical - Balm' },
    { value: 'vape_cartridge', label: 'Vape - Cartridge' },
    { value: 'vape_disposable', label: 'Vape - Disposable' }
  ];

  // Cannabinoid list
  const cannabinoids = [
    'THC', 'THCA', 'CBD', 'CBDA', 'CBG', 'CBGA', 
    'CBN', 'CBC', 'THCV', 'CBDV', 'D8-THC'
  ];

  // Mock clients with Confident Cannabis accounts
  const clientsWithCC = [
    'Green Valley Dispensary',
    'Wellness Center Ohio',
    'Motor City Cannabis',
    'Buckeye Edibles'
  ];

  useEffect(() => {
    loadManifestData();
  }, [manifestId]);

  const loadManifestData = () => {
    // In production, this would fetch from METRC API
    // Mock data for demonstration
    const mockManifest = {
      manifestId: manifestId,
      driverId: 'D001',
      status: 'arrived',
      eta: new Date(),
      priority: 'normal',
      sampleCount: 5
    };

    const mockSamples = [
      {
        metrcTag: '1A4060300003F2000000001',
        sourcePackage: '1A4060300002A1000000123',
        strain: 'Blue Dream',
        grossWeight: 15.5,
        unitCount: 0,
        itemCategory: 'Flower',
        testCategory: 'DPM',
        client: 'Green Valley Dispensary',
        enhancedType: 'flower_indoor',
        requiresAllTests: true,
        additionalTests: ['terpenes']
      },
      {
        metrcTag: '1A4060300003F2000000002',
        sourcePackage: '1A4060300002A1000000124',
        strain: 'OG Kush',
        grossWeight: 12.3,
        unitCount: 0,
        itemCategory: 'Flower',
        testCategory: 'DPM',
        client: 'Green Valley Dispensary',
        enhancedType: 'flower_indoor',
        requiresAllTests: true,
        additionalTests: []
      },
      {
        metrcTag: '1A4060300003F2000000003',
        sourcePackage: '1A4060300002A1000000125',
        strain: 'Gorilla Glue #4',
        grossWeight: 18.7,
        unitCount: 0,
        itemCategory: 'Flower',
        testCategory: 'PPM',
        client: 'Wellness Center Ohio',
        enhancedType: 'flower_greenhouse',
        requiresAllTests: false,
        additionalTests: []
      },
      {
        metrcTag: '1A4060300003F2000000004',
        sourcePackage: '1A4060300002A1000000126',
        strain: 'Wedding Cake',
        grossWeight: 0,
        unitCount: 100,
        itemCategory: 'InfusedEdible',
        testCategory: 'PPPT',
        client: 'Buckeye Edibles',
        enhancedType: 'edible_gummy',
        requiresAllTests: false,
        additionalTests: []
      },
      {
        metrcTag: '1A4060300003F2000000005',
        sourcePackage: '1A4060300002A1000000127',
        strain: 'N/A',
        grossWeight: 0,
        unitCount: 50,
        itemCategory: 'Concentrate',
        testCategory: 'NSPNPT',
        client: 'Extract Labs Ohio',
        enhancedType: 'concentrate_oil',
        requiresAllTests: true,
        additionalTests: ['terpenes']
      }
    ];

    setManifest(mockManifest);
    setSamples(mockSamples);
    
    // Generate order number
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const orderSeq = Math.floor(Math.random() * 9000) + 1000;
    setOrderNumber(`${year}${month}-NCTL-${orderSeq}`);
    
    setLoading(false);
  };

  const handleTestCategoryChange = (sampleIndex, newCategory) => {
    const updatedSamples = [...samples];
    updatedSamples[sampleIndex].testCategory = newCategory;
    
    // Update required tests based on category
    if (['DPM', 'NSPNPT'].includes(newCategory)) {
      updatedSamples[sampleIndex].requiresAllTests = true;
    } else {
      updatedSamples[sampleIndex].requiresAllTests = false;
    }
    
    setSamples(updatedSamples);
  };

  const handleEnhancedTypeChange = (sampleIndex, newType) => {
    const updatedSamples = [...samples];
    updatedSamples[sampleIndex].enhancedType = newType;
    setSamples(updatedSamples);
  };

  const handleAdditionalTestToggle = (sampleIndex, test) => {
    const updatedSamples = [...samples];
    const currentTests = updatedSamples[sampleIndex].additionalTests || [];
    
    if (currentTests.includes(test)) {
      updatedSamples[sampleIndex].additionalTests = currentTests.filter(t => t !== test);
    } else {
      updatedSamples[sampleIndex].additionalTests = [...currentTests, test];
    }
    
    setSamples(updatedSamples);
  };

  const handleSetCannabinoidTargets = (sampleIndex) => {
    setCurrentSampleForTargets(sampleIndex);
    setShowCannabinoidModal(true);
  };

  const saveCannabinoidTargets = () => {
    // Targets are already saved in state
    setShowCannabinoidModal(false);
    setCurrentSampleForTargets(null);
  };

  const handleRushToggle = (sampleIndex) => {
    const updatedSamples = [...samples];
    updatedSamples[sampleIndex].isRush = !updatedSamples[sampleIndex].isRush;
    setSamples(updatedSamples);
  };

  const handleDPMEarlyStartToggle = (sampleIndex) => {
    const updatedSamples = [...samples];
    updatedSamples[sampleIndex].isDPMEarlyStart = !updatedSamples[sampleIndex].isDPMEarlyStart;
    setSamples(updatedSamples);
  };

  const handleSaveManifest = async () => {
    setSaving(true);
    // In production, this would save to the database
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    navigate('/receiving');
  };

  const handleGenerateConfidentCannabisOrder = async () => {
    setSaving(true);
    // In production, this would call the Confident Cannabis API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample numbers
    const updatedSamples = samples.map((sample, index) => ({
      ...sample,
      sampleNumber: `${orderNumber}.${(index + 1).toString().padStart(5, '0')}`
    }));
    
    setSamples(updatedSamples);
    setShowConfidentCannabis(true);
    setSaving(false);
  };

  const getTestCategories = () => {
    return labState === 'ohio' ? ohioTestCategories : michiganTestCategories;
  };

  const filteredClients = clientsWithCC.filter(client =>
    client.toLowerCase().includes(clientSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading manifest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/receiving')}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Process Manifest #{manifestId}
                </h1>
                <p className="text-gray-600 mt-1">
                  Order: {orderNumber} • {samples.length} samples
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleGenerateConfidentCannabisOrder}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                disabled={saving}
              >
                <Send className="w-4 h-4" />
                <span>Generate CC Order</span>
              </button>
              <button
                onClick={handleSaveManifest}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save & Complete'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Samples Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sample Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    METRC Tag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Strain/Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sample Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Additional Tests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {samples.map((sample, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-mono text-gray-900">{sample.metrcTag}</div>
                        {sample.sampleNumber && (
                          <div className="text-xs text-gray-500">{sample.sampleNumber}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sample.client}</div>
                      {clientsWithCC.includes(sample.client) && (
                        <span className="text-xs text-purple-600">CC Account</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sample.strain}</div>
                      <div className="text-xs text-gray-500">
                        {sample.grossWeight > 0 ? `${sample.grossWeight}g` : `${sample.unitCount} units`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={sample.testCategory}
                        onChange={(e) => handleTestCategoryChange(index, e.target.value)}
                        className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        {getTestCategories().map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={sample.enhancedType}
                        onChange={(e) => handleEnhancedTypeChange(index, e.target.value)}
                        className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select type...</option>
                        {enhancedSampleTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={sample.additionalTests?.includes('terpenes') || false}
                            onChange={() => handleAdditionalTestToggle(index, 'terpenes')}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">Terpenes</span>
                        </label>
                        {sample.requiresAllTests && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            All tests required
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={sample.isRush || false}
                            onChange={() => handleRushToggle(index)}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm">Rush</span>
                        </label>
                        {labState === 'michigan' && sample.testCategory === 'Flower' && (
                          <label className="flex items-center space-x-1">
                            <input
                              type="checkbox"
                              checked={sample.isDPMEarlyStart || false}
                              onChange={() => handleDPMEarlyStartToggle(index)}
                              className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm">DPM Early</span>
                          </label>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {sample.requiresAllTests && (
                        <button
                          onClick={() => handleSetCannabinoidTargets(index)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Set Targets
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confident Cannabis Status */}
        {showConfidentCannabis && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="font-semibold text-green-900">
                  Confident Cannabis Order Created Successfully
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Order {orderNumber} has been transmitted with {samples.length} samples
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cannabinoid Targets Modal */}
      {showCannabinoidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Set Cannabinoid Targets
                </h3>
                <button
                  onClick={() => setShowCannabinoidModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Set target concentrations for {samples[currentSampleForTargets]?.strain}
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {cannabinoids.map(cannabinoid => (
                  <div key={cannabinoid} className="flex items-center space-x-4">
                    <label className="w-24 text-sm font-medium text-gray-700">
                      {cannabinoid}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={cannabinoidTargets[`${currentSampleForTargets}-${cannabinoid}`] || ''}
                      onChange={(e) => {
                        setCannabinoidTargets(prev => ({
                          ...prev,
                          [`${currentSampleForTargets}-${cannabinoid}`]: e.target.value
                        }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCannabinoidModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCannabinoidTargets}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Targets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleProcessing;