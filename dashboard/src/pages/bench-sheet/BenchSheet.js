import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Send, Plus, Trash2, AlertTriangle, 
  FileText, Calendar, User, Beaker, Search, ChevronDown,
  CheckCircle, Info, Scale, Droplet, AlertCircle
} from 'lucide-react';

const BenchSheet = () => {
  const { prepBatchId } = useParams();
  const navigate = useNavigate();
  
  const [isDraft, setIsDraft] = useState(true);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [prepBatch, setPrepBatch] = useState(null);
  
  // Batch-level metadata
  const [batchMetadata, setBatchMetadata] = useState({
    prepBatchId: prepBatchId || '',
    analyticalBatchId: '',
    sampleMatrix: '',
    weighedBy: 'Dr. Sarah Chen', // Default to current user
    extractedBy: 'Dr. Sarah Chen',
    dilutedBy: 'Dr. Sarah Chen',
    analyzedBy: 'Dr. Sarah Chen',
    preparationDate: new Date().toISOString().split('T')[0],
    sopVersion: ''
  });
  
  // Sample preparation data - will be populated from prep batch
  const [samples, setSamples] = useState([]);
  
  // Reagent and equipment
  const [reagents, setReagents] = useState([
    { id: '1', nctlId: '', itemName: '', expirationDate: '', isExpired: false }
  ]);
  
  const [equipment, setEquipment] = useState({
    waterbathId: '',
    sonicatorId: '',
    balanceId: '',
    repeaterId: ''
  });
  
  const [comments, setComments] = useState('');
  
  // Mock data
  const sampleMatrixOptions = [
    'Concentrate',
    'Plant Material',
    'Edible',
    'Topical',
    'Tincture',
    'Vape Cartridge'
  ];
  
  const sampleTypeOptions = [
    'LCB',
    'LCS',
    'Sample',
    'Duplicate',
    'Matrix Spike',
    'Matrix Spike Duplicate'
  ];
  
  const productTypes = [
    'Ad Hoc - Experimental', 'Badder', 'Balm', 'Beverage', 'Butane Hash Oil',
    'Bits', 'Bitz', 'Brownies', 'Buckeye', 'Budder', 'Candy', 'Capsules',
    'Caramels', 'Carmel Turtle', 'Chocolate', 'Chocolate (Caramel)/ Choc. Caramel Bites',
    'Crude', 'Coconut Oil', 'CO2', 'Concentrates', 'Cookies', 'Crumble',
    'Diamonds', 'Distillate', 'Emulsions', 'Fat-based Confectionaries', 'FECO',
    'Flower', 'Freeze Pop Sauce', 'Fudge (quechers)', 'Ghee', 'Granolas',
    'Gummies', 'Gummy', 'Gummy Tincture', 'Hard Candies', 'Hash', 'Hash Oil',
    'Hashtroid', 'Honeys', 'hot coco mix', 'Hot Sauce', 'Ice Hash', 'Ice Water Hash',
    'Infused Beverage', 'Infused Sugar for Coco Mix (Distillate)', 'Infusion Powder',
    'Isolate', 'Kief', 'Plant Tissue', 'Lip Balm', 'Lotion', 'Marshmallow Fluff',
    'Massage Oil', 'MCT Oil', 'Mello Bar', 'Meteor Bites', 'Mints', 'Mouth Spray',
    'Muscle Spray'
  ];
  
  const userOptions = [
    'Dr. Sarah Chen',
    'Dr. Michael Chen',
    'Dr. Lisa Park',
    'Dr. James Wilson',
    'Dr. Emily Zhang'
  ];
  
  const mockReagents = [
    { nctlId: 'NCTL-2024-001', itemName: 'Methanol, HPLC Grade', expirationDate: '2025-12-31' },
    { nctlId: 'NCTL-2024-002', itemName: 'Acetonitrile, HPLC Grade', expirationDate: '2025-11-30' },
    { nctlId: 'NCTL-2024-003', itemName: 'Water, HPLC Grade', expirationDate: '2026-01-15' },
    { nctlId: 'NCTL-2023-099', itemName: 'Isopropanol, ACS Grade', expirationDate: '2024-12-15' } // Expired
  ];
  
  const mockEquipment = {
    waterbaths: ['WB-001', 'WB-002', 'WB-003'],
    sonicators: ['SON-001', 'SON-002'],
    balances: ['BAL-001', 'BAL-002', 'BAL-003', 'BAL-004'],
    repeaters: ['REP-001', 'REP-002']
  };
  
  // Mock prep batch data - in real app, this would be fetched from LIMS
  const mockPrepBatches = {
    'PB-CAN-2025-0001': {
      id: 'PB-CAN-2025-0001',
      createdAt: '2025-01-06 08:30 AM',
      analyst: 'Dr. Sarah Chen',
      status: 'open',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      samples: [
        {
          id: 'S001',
          orderId: 'ORD-2025-14872',
          ccId: '.14872',
          limsId: '171747',
          packageId: '1A4070300005C31000012260',
          client: 'King City Gardens',
          sampleName: 'Cookie Kush Big Buds',
          strain: 'Cookie Kush',
          productCategory: 'Bulk Flower/Buds',
          receivedOn: '2025-01-02',
          priority: 'rush',
          testCategories: ['TERPS', 'DPM'],
          tests: ['Cannabinoids', 'Terpenes'],
          coaDueDate: '2025-01-06',
          shippedQty: 28.62
        },
        {
          id: 'S002',
          orderId: 'ORD-2025-14873',
          ccId: '.14873',
          limsId: '171748',
          packageId: '1A4070300005C31000012261',
          client: 'King City Gardens',
          sampleName: 'Cookie Kush Small Buds',
          strain: 'Cookie Kush',
          productCategory: 'Bulk Flower/Buds',
          receivedOn: '2025-01-02',
          priority: 'rush',
          testCategories: ['TERPS', 'DPM'],
          tests: ['Cannabinoids', 'Terpenes'],
          coaDueDate: '2025-01-06',
          shippedQty: 27.79
        },
        {
          id: 'S003',
          orderId: 'ORD-2025-14874',
          ccId: '.14874',
          limsId: '171749',
          packageId: '1A4070300005C31000012262',
          client: 'King City Gardens',
          sampleName: 'Slurri Crasher Small Buds',
          strain: 'Slurri Crasher',
          productCategory: 'Bulk Flower/Buds',
          receivedOn: '2025-01-02',
          priority: 'rush',
          testCategories: ['TERPS', 'DPM'],
          tests: ['Cannabinoids', 'Terpenes'],
          coaDueDate: '2025-01-06',
          shippedQty: 6.0
        }
      ]
    },
    'PB-2025-0001': {
      // Legacy format for backward compatibility
      id: 'PB-2025-0001',
      createdAt: '2025-01-06 08:30 AM',
      analyst: 'Dr. Sarah Chen',
      status: 'open',
      sop: 'SOP-CANNABINOIDS-PREP-v3.2',
      samples: [
        {
          id: 'S001',
          orderId: 'ORD-2025-14872',
          ccId: '.14872',
          limsId: '171747',
          packageId: '1A4070300005C31000012260',
          client: 'King City Gardens',
          sampleName: 'Cookie Kush Big Buds',
          strain: 'Cookie Kush',
          productCategory: 'Bulk Flower/Buds',
          receivedOn: '2025-01-02',
          priority: 'rush',
          testCategories: ['TERPS', 'DPM'],
          tests: ['Cannabinoids', 'Terpenes'],
          coaDueDate: '2025-01-06',
          shippedQty: 28.62
        }
      ]
    },
    'PB-TERP-2025-0001': {
      id: 'PB-TERP-2025-0001',
      createdAt: '2025-01-06 09:15 AM',
      analyst: 'Dr. Michael Chen',
      status: 'open',
      sop: 'SOP-TERPENES-PREP-v2.1',
      samples: [
        {
          id: 'S010',
          orderId: 'ORD-2025-15009',
          ccId: '.15009',
          limsId: '171884',
          packageId: '1A4070300002D51000001706',
          client: 'Sun Theory Ohio',
          sampleName: 'Bulk Sativa Rosin',
          strain: '',
          productCategory: 'Bulk Concentrate',
          receivedOn: '2025-01-05',
          priority: 'standard',
          testCategories: ['TERPS', 'NSPNPT'],
          tests: ['Terpenes'],
          coaDueDate: '2025-01-08',
          shippedQty: 4.2,
          notes: 'Blind Duplicate Concentrate'
        }
      ]
    }
  };
  
  // Load prep batch data and initialize samples
  useEffect(() => {
    const batch = mockPrepBatches[prepBatchId];
    if (batch) {
      setPrepBatch(batch);
      
      // Set analyst from prep batch
      setBatchMetadata(prev => ({
        ...prev,
        weighedBy: batch.analyst,
        extractedBy: batch.analyst,
        dilutedBy: batch.analyst,
        analyzedBy: batch.analyst
      }));
      
      // Initialize samples from prep batch
      const benchSheetSamples = [
        // Always start with LCB and LCS
        {
          id: '1',
          sampleType: 'LCB',
          sampleId: 'LCB',
          productType: 'N/A',
          replicateNumber: 1,
          sampleWeight: '',
          dilutionFactor: '',
          extractionVolume: '40.0',
          extractionUnit: 'mL',
          sampleDescription: 'Laboratory Control Blank',
          comments: ''
        },
        {
          id: '2',
          sampleType: 'LCS',
          sampleId: 'LCS',
          productType: 'N/A',
          replicateNumber: 1,
          sampleWeight: '',
          dilutionFactor: '',
          extractionVolume: '40.0',
          extractionUnit: 'mL',
          sampleDescription: 'Laboratory Control Sample',
          comments: ''
        },
        // Add samples from prep batch
        ...batch.samples.map((sample, index) => ({
          id: (index + 3).toString(),
          sampleType: 'Sample',
          sampleId: sample.limsId,
          sampleName: sample.sampleName,
          client: sample.client,
          productType: sample.productCategory || 'Flower',
          replicateNumber: 1,
          sampleWeight: '',
          dilutionFactor: '',
          extractionVolume: '40.0',
          extractionUnit: 'mL',
          sampleDescription: sample.sampleName,
          comments: ''
        }))
      ];
      
      setSamples(benchSheetSamples);
    }
  }, [prepBatchId]);
  
  // Update extraction volume defaults based on matrix
  useEffect(() => {
    const matrixDefaults = {
      'Plant Material': '40.0',
      'Concentrate': '50.0',
      'Edible': '20.0',
      'Topical': '25.0',
      'Tincture': '10.0',
      'Vape Cartridge': '5.0'
    };
    
    if (batchMetadata.sampleMatrix && matrixDefaults[batchMetadata.sampleMatrix]) {
      setSamples(samples => samples.map(sample => ({
        ...sample,
        extractionVolume: matrixDefaults[batchMetadata.sampleMatrix]
      })));
    }
  }, [batchMetadata.sampleMatrix]);
  
  const updateSample = (id, field, value) => {
    // Prevent negative values for weight and extraction volume
    if ((field === 'sampleWeight' || field === 'extractionVolume') && value !== '') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue < 0) {
        return; // Don't update if negative
      }
    }
    
    setSamples(samples.map(sample => 
      sample.id === id ? { ...sample, [field]: value } : sample
    ));
  };
  
  const addReagent = () => {
    const newReagent = {
      id: Date.now().toString(),
      nctlId: '',
      itemName: '',
      expirationDate: '',
      isExpired: false
    };
    setReagents([...reagents, newReagent]);
  };
  
  const removeReagent = (id) => {
    setReagents(reagents.filter(r => r.id !== id));
  };
  
  const updateReagent = (id, nctlId) => {
    const selectedReagent = mockReagents.find(r => r.nctlId === nctlId);
    if (selectedReagent) {
      const expirationDate = new Date(selectedReagent.expirationDate);
      const isExpired = expirationDate < new Date();
      
      setReagents(reagents.map(reagent => 
        reagent.id === id 
          ? { 
              ...reagent, 
              nctlId: selectedReagent.nctlId,
              itemName: selectedReagent.itemName,
              expirationDate: selectedReagent.expirationDate,
              isExpired
            } 
          : reagent
      ));
    }
  };
  
  const fillEmptyFieldsWithNA = () => {
    // Fill empty sample fields with N/A (only for optional fields)
    setSamples(samples.map(sample => ({
      ...sample,
      // Only fill weight with N/A for LCB samples
      sampleWeight: sample.sampleWeight || (sample.sampleType === 'LCB' ? 'N/A' : sample.sampleWeight),
      sampleDescription: sample.sampleDescription || 'N/A',
      comments: sample.comments || 'N/A',
      dilutionFactor: sample.dilutionFactor || 'N/A'
    })));
    
    // Fill empty equipment fields with N/A
    setEquipment({
      ...equipment,
      waterbathId: equipment.waterbathId || 'N/A',
      sonicatorId: equipment.sonicatorId || 'N/A',
      repeaterId: equipment.repeaterId || 'N/A'
    });
    
    // Fill comments if empty
    setComments(comments || 'N/A - No additional comments');
  };

  const validateBenchSheet = () => {
    const errors = [];
    
    // Batch metadata validation
    if (!batchMetadata.sampleMatrix) errors.push('Sample matrix is required');
    
    // Sample validation
    samples.forEach((sample, index) => {
      const sampleLabel = `Sample ${index + 1} (${sample.sampleId})`;
      
      // Weight is required for all samples except LCB (must be filled with value or N/A)
      if (sample.sampleType !== 'LCB' && !sample.sampleWeight) {
        errors.push(`${sampleLabel}: Sample weight is required (enter value or N/A)`);
      }
      
      // All samples must have extraction volume
      if (!sample.extractionVolume) {
        errors.push(`${sampleLabel}: Extraction volume is required`);
      }
      
      // Dilution factor must be filled
      if (!sample.dilutionFactor) {
        errors.push(`${sampleLabel}: Dilution factor is required (enter value or N/A)`);
      }
      
      // Sample description must be filled
      if (!sample.sampleDescription) {
        errors.push(`${sampleLabel}: Sample description is required`);
      }
      
      // Comments must be filled (with value or N/A)
      if (!sample.comments) {
        errors.push(`${sampleLabel}: Comments are required (enter text or N/A)`);
      }
      
      // Product type required for actual samples
      if (sample.sampleType !== 'LCB' && sample.sampleType !== 'LCS' && !sample.productType) {
        errors.push(`${sampleLabel}: Product type is required`);
      }
    });
    
    // Reagent validation
    if (reagents.length === 0 || !reagents.some(r => r.nctlId)) {
      errors.push('At least one reagent must be selected');
    }
    if (reagents.some(r => r.nctlId && r.isExpired)) {
      errors.push('Warning: Expired reagents selected');
    }
    
    // Equipment validation
    if (!equipment.balanceId) errors.push('Balance ID is required');
    if (!equipment.waterbathId) errors.push('Waterbath ID is required (select equipment or N/A)');
    if (!equipment.sonicatorId) errors.push('Sonicator ID is required (select equipment or N/A)');
    if (!equipment.repeaterId) errors.push('Repeater ID is required (select equipment or N/A)');
    
    // Comments validation
    if (!comments) errors.push('Additional comments are required (enter text or N/A)');
    
    return errors;
  };
  
  const saveDraft = () => {
    console.log('Saving draft...', {
      batchMetadata,
      samples,
      reagents,
      equipment,
      comments
    });
    alert('Draft saved successfully');
  };
  
  const finalizeAndSubmit = () => {
    const errors = validateBenchSheet();
    if (errors.length > 0) {
      setShowValidationErrors(true);
      alert(`Validation errors:\n${errors.join('\n')}`);
      return;
    }
    
    console.log('Finalizing bench sheet...', {
      batchMetadata,
      samples,
      reagents,
      equipment,
      comments,
      timestamp: new Date().toISOString(),
      preparedBy: batchMetadata.weighedBy
    });
    
    setIsDraft(false);
    alert('Bench sheet finalized and submitted successfully');
    // Extract assay type from prep batch ID (e.g., PB-CAN-2025-0001 -> cannabinoids)
    const assayTypeMap = {
      'CAN': 'cannabinoids',
      'TERP': 'terpenes',
      'PEST': 'pesticides'
    };
    const assayCode = prepBatchId.split('-')[1];
    const assayType = assayTypeMap[assayCode] || 'cannabinoids';
    navigate(`/prep-batch/${assayType}`);
  };
  
  if (!prepBatch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading prep batch data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Bench Sheet Creation
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Prep Batch: {prepBatchId} {isDraft && <span className="text-orange-600">(Draft)</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={saveDraft}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Draft</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile/Tablet: Stack vertically. Desktop: Side by side */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Main Content - Left on desktop, full width on mobile */}
          <div className="lg:order-1 lg:col-span-2 space-y-6">
            {/* Batch Metadata */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Batch Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prep Batch ID
                    </label>
                    <input
                      type="text"
                      value={batchMetadata.prepBatchId}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Analyst
                    </label>
                    <input
                      type="text"
                      value={prepBatch.analyst}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sample Matrix <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={batchMetadata.sampleMatrix}
                      onChange={(e) => setBatchMetadata({...batchMetadata, sampleMatrix: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select matrix...</option>
                      {sampleMatrixOptions.map(matrix => (
                        <option key={matrix} value={matrix}>{matrix}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preparation Date
                    </label>
                    <input
                      type="date"
                      value={batchMetadata.preparationDate}
                      onChange={(e) => setBatchMetadata({...batchMetadata, preparationDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">SOP:</span>
                      <span className="ml-2 font-medium">{prepBatch.sop}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 font-medium capitalize">{prepBatch.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-2 font-medium">{prepBatch.createdAt}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Samples:</span>
                      <span className="ml-2 font-medium">{prepBatch.samples.length + 2} (incl. QCs)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Preparation Table */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Sample Preparation Data</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => fillEmptyFieldsWithNA()}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors flex items-center space-x-1"
                    title="Fill all empty optional fields with N/A"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Fill Empty with N/A</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sample Type
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sample ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sample Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Type
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rep #
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight (g)
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dilution
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Extraction Vol
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {samples.map((sample, index) => (
                      <tr key={sample.id}>
                        <td className="px-3 py-2">
                          <span className="text-sm font-medium text-gray-900">{sample.sampleType}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-sm text-gray-900">{sample.sampleId}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-sm text-gray-600">
                            {sample.sampleName || sample.sampleDescription}
                            {sample.client && <span className="block text-xs text-gray-500">{sample.client}</span>}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {sample.sampleType === 'LCB' || sample.sampleType === 'LCS' ? (
                            <span className="text-sm text-gray-500">N/A</span>
                          ) : (
                            <select
                              value={sample.productType || ''}
                              onChange={(e) => updateSample(sample.id, 'productType', e.target.value)}
                              className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="">Select type...</option>
                              {productTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={sample.replicateNumber}
                            onChange={(e) => updateSample(sample.id, 'replicateNumber', e.target.value)}
                            className="w-16 text-sm border border-gray-300 rounded px-2 py-1"
                            min="1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            step="0.0001"
                            min="0"
                            value={sample.sampleWeight}
                            onChange={(e) => updateSample(sample.id, 'sampleWeight', e.target.value)}
                            placeholder={sample.sampleType === 'LCB' ? 'N/A' : '0.0000'}
                            disabled={sample.sampleType === 'LCB'}
                            className="w-24 text-sm border border-gray-300 rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={sample.dilutionFactor}
                            onChange={(e) => updateSample(sample.id, 'dilutionFactor', e.target.value)}
                            placeholder="1"
                            className="w-16 text-sm border border-gray-300 rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex space-x-1">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={sample.extractionVolume}
                              onChange={(e) => updateSample(sample.id, 'extractionVolume', e.target.value)}
                              className="w-16 text-sm border border-gray-300 rounded px-2 py-1"
                            />
                            <select
                              value={sample.extractionUnit}
                              onChange={(e) => updateSample(sample.id, 'extractionUnit', e.target.value)}
                              className="w-16 text-sm border border-gray-300 rounded px-1 py-1"
                            >
                              <option value="mL">mL</option>
                              <option value="µL">µL</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={sample.comments}
                            onChange={(e) => updateSample(sample.id, 'comments', e.target.value)}
                            className="w-32 text-sm border border-gray-300 rounded px-2 py-1"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Comments</h2>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                placeholder="Enter any additional observations, sample appearance notes, or preparation comments..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={finalizeAndSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Finalize & Submit</span>
              </button>
            </div>
          </div>

          {/* Equipment and Reagents - Top on mobile, right on desktop */}
          <div className="lg:order-2 lg:col-span-1 space-y-6">
            {/* Reagents */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Reagents</h2>
              
              <div className="space-y-3">
                {reagents.map((reagent, index) => (
                  <div key={reagent.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      NCTL ID or Lot #
                    </label>
                    <select
                      value={reagent.nctlId}
                      onChange={(e) => updateReagent(reagent.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select reagent...</option>
                      {mockReagents.map(r => (
                        <option key={r.nctlId} value={r.nctlId}>
                          {r.nctlId} - {r.itemName}
                        </option>
                      ))}
                    </select>
                    
                    {reagent.itemName && (
                      <div className="text-sm">
                        <p className="text-gray-700">{reagent.itemName}</p>
                        <p className="text-gray-500">
                          Expires: {reagent.expirationDate}
                          {reagent.isExpired && (
                            <span className="ml-2 text-red-600 font-medium">
                              <AlertTriangle className="w-4 h-4 inline" /> Expired
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      {index === reagents.length - 1 ? (
                        <button
                          onClick={addReagent}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Plus className="w-4 h-4 inline" /> Add Another
                        </button>
                      ) : (
                        <button
                          onClick={() => removeReagent(reagent.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          <Trash2 className="w-4 h-4 inline" /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {reagents.some(r => r.isExpired) && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-800">
                      Warning: Expired reagents selected. Please verify before proceeding.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Equipment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balance ID <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={equipment.balanceId}
                    onChange={(e) => setEquipment({...equipment, balanceId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select balance...</option>
                    {mockEquipment.balances.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waterbath ID
                  </label>
                  <select
                    value={equipment.waterbathId}
                    onChange={(e) => setEquipment({...equipment, waterbathId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select waterbath...</option>
                    <option value="N/A">N/A - Not Used</option>
                    {mockEquipment.waterbaths.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sonicator ID
                  </label>
                  <select
                    value={equipment.sonicatorId}
                    onChange={(e) => setEquipment({...equipment, sonicatorId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select sonicator...</option>
                    <option value="N/A">N/A - Not Used</option>
                    {mockEquipment.sonicators.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repeater ID
                  </label>
                  <select
                    value={equipment.repeaterId}
                    onChange={(e) => setEquipment({...equipment, repeaterId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select repeater...</option>
                    <option value="N/A">N/A - Not Used</option>
                    {mockEquipment.repeaters.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchSheet;