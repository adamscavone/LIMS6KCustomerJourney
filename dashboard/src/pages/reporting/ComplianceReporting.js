import React, { useState } from 'react';
import { FileDown, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const ComplianceReporting = () => {
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [reportType, setReportType] = useState('metrc');
  const [submissionStatus, setSubmissionStatus] = useState({});
  
  const [samples] = useState([
    {
      id: 'S-2025-001',
      clientName: 'Green Valley Farms',
      sampleType: 'Flower',
      state: 'OH',
      metrcTag: 'ABC123456789',
      status: 'completed',
      results: { thc: 22.5, cbd: 0.8, pass: true },
      coaGenerated: true,
      metrcSubmitted: false,
      confidentCannabisSubmitted: true
    },
    {
      id: 'S-2025-002',
      clientName: 'Mountain Top Cultivators',
      sampleType: 'Concentrate',
      state: 'MI',
      metrcTag: 'DEF987654321',
      status: 'completed',
      results: { thc: 78.3, cbd: 2.1, pass: false },
      coaGenerated: false,
      metrcSubmitted: false,
      confidentCannabisSubmitted: false
    },
    {
      id: 'S-2025-003',
      clientName: 'Pure Leaf Labs',
      sampleType: 'Edible',
      state: 'OH',
      metrcTag: 'GHI456789123',
      status: 'completed',
      results: { thc: 98.5, cbd: 0.0, pass: true },
      coaGenerated: true,
      metrcSubmitted: true,
      confidentCannabisSubmitted: true
    }
  ]);

  const handleGenerateCOA = (sampleId) => {
    console.log(`Generating COA for ${sampleId}`);
    setSubmissionStatus({ ...submissionStatus, [sampleId]: 'generating' });
    
    setTimeout(() => {
      setSubmissionStatus({ ...submissionStatus, [sampleId]: 'coa-generated' });
    }, 2000);
  };

  const handleMetrcSubmit = (sampleIds) => {
    console.log(`Submitting to Metrc:`, sampleIds);
    sampleIds.forEach(id => {
      setSubmissionStatus(prev => ({ ...prev, [id]: 'submitting-metrc' }));
    });
    
    setTimeout(() => {
      sampleIds.forEach(id => {
        setSubmissionStatus(prev => ({ ...prev, [id]: 'metrc-submitted' }));
      });
    }, 3000);
  };

  const handleConfidentCannabisSubmit = (sampleIds) => {
    console.log(`Submitting to Confident Cannabis:`, sampleIds);
    sampleIds.forEach(id => {
      setSubmissionStatus(prev => ({ ...prev, [id]: 'submitting-cc' }));
    });
    
    setTimeout(() => {
      sampleIds.forEach(id => {
        setSubmissionStatus(prev => ({ ...prev, [id]: 'cc-submitted' }));
      });
    }, 2500);
  };

  const toggleSampleSelection = (sampleId) => {
    setSelectedSamples(prev => 
      prev.includes(sampleId) 
        ? prev.filter(id => id !== sampleId)
        : [...prev, sampleId]
    );
  };

  const getStateSpecificRequirements = (state) => {
    const requirements = {
      OH: ['Moisture content required for COA', 'Metrc API submission required', 'PDF COA must be signed'],
      MI: ['Michigan Snapshots report required', 'Metrc submission within 24 hours', 'Email notification to client']
    };
    return requirements[state] || [];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Compliance Reporting</h1>

          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Report Type Selection</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  onClick={() => setReportType('metrc')}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    reportType === 'metrc' 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Metrc Submission</p>
                  <p className="text-sm text-gray-500">Submit results to state system</p>
                </button>
                
                <button
                  onClick={() => setReportType('coa')}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    reportType === 'coa' 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileDown className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">COA Generation</p>
                  <p className="text-sm text-gray-500">Create certificates of analysis</p>
                </button>
                
                <button
                  onClick={() => setReportType('confident')}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    reportType === 'confident' 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Confident Cannabis</p>
                  <p className="text-sm text-gray-500">Submit to marketplace</p>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Completed Samples</h3>
                {selectedSamples.length > 0 && (
                  <div className="flex space-x-3">
                    {reportType === 'metrc' && (
                      <button
                        onClick={() => handleMetrcSubmit(selectedSamples)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                      >
                        Submit {selectedSamples.length} to Metrc
                      </button>
                    )}
                    {reportType === 'coa' && (
                      <button
                        onClick={() => selectedSamples.forEach(id => handleGenerateCOA(id))}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                      >
                        Generate {selectedSamples.length} COAs
                      </button>
                    )}
                    {reportType === 'confident' && (
                      <button
                        onClick={() => handleConfidentCannabisSubmit(selectedSamples)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
                      >
                        Submit {selectedSamples.length} to CC
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {samples.map((sample) => (
                <li key={sample.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSamples.includes(sample.id)}
                      onChange={() => toggleSampleSelection(sample.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sample.id}</p>
                          <p className="text-sm text-gray-500">
                            {sample.clientName} - {sample.sampleType} ({sample.state})
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Metrc Tag: {sample.metrcTag}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            sample.results.pass 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {sample.results.pass ? 'PASS' : 'FAIL'}
                          </span>
                          <span className="text-xs text-gray-500">
                            THC: {sample.results.thc}% | CBD: {sample.results.cbd}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-4">
                        <div className="flex items-center text-sm">
                          {sample.coaGenerated || submissionStatus[sample.id] === 'coa-generated' ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                          )}
                          <span className={sample.coaGenerated ? 'text-green-600' : 'text-gray-500'}>
                            COA {sample.coaGenerated ? 'Generated' : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          {sample.metrcSubmitted || submissionStatus[sample.id] === 'metrc-submitted' ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                          )}
                          <span className={sample.metrcSubmitted ? 'text-green-600' : 'text-gray-500'}>
                            Metrc {sample.metrcSubmitted ? 'Submitted' : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          {sample.confidentCannabisSubmitted || submissionStatus[sample.id] === 'cc-submitted' ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                          )}
                          <span className={sample.confidentCannabisSubmitted ? 'text-green-600' : 'text-gray-500'}>
                            CC {sample.confidentCannabisSubmitted ? 'Submitted' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      
                      {submissionStatus[sample.id] && (
                        <div className="mt-2">
                          <p className="text-sm text-indigo-600">
                            {submissionStatus[sample.id] === 'generating' && 'Generating COA...'}
                            {submissionStatus[sample.id] === 'submitting-metrc' && 'Submitting to Metrc...'}
                            {submissionStatus[sample.id] === 'submitting-cc' && 'Submitting to Confident Cannabis...'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 ml-8">
                    <p className="text-xs text-gray-500 font-medium mb-1">State Requirements:</p>
                    <ul className="text-xs text-gray-400 space-y-0.5">
                      {getStateSpecificRequirements(sample.state).map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {reportType === 'metrc' && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Non-Compliance Testing</h4>
              <p className="text-sm text-blue-700">
                For samples that fail testing, use the Non-Compliance Report template to document:
              </p>
              <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
                <li>Initial test results and failure reasons</li>
                <li>Remediation steps taken by client</li>
                <li>Re-test results and final disposition</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceReporting;