import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock, 
  ChevronDown, ChevronRight, FileText, Download, Upload,
  CheckSquare, Square, Calendar, User, Beaker, BarChart3,
  FileCheck, AlertTriangle, Info, Edit3, Save, X
} from 'lucide-react';

const ReviewQueue = () => {
  const { assayType } = useParams();
  const navigate = useNavigate();
  
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    prepQC: true,
    calibration: true,
    chromatography: true,
    replicates: true,
    manualChecks: true,
    digitalAssets: true
  });
  
  const [manualChecks, setManualChecks] = useState({
    visualVerification: false,
    prepBatchMatch: false,
    controlChartExport: false,
    primaryFindings: false,
    deviationsReviewed: false
  });
  
  const [comments, setComments] = useState({
    primary: '',
    secondary: ''
  });
  
  const [reviewDecision, setReviewDecision] = useState(null);
  const [digitalLabAssets, setDigitalLabAssets] = useState({
    methodFile: 'CANNABINOIDS_HPLC_v3.2.meth',
    calibrationFile: 'CAL_CBD_THC_2025_01.cal'
  });

  // Mock analytical batches with review status
  const mockAnalyticalBatches = {
    cannabinoids: [
      {
        id: 'AB-2025-0142',
        prepBatchIds: ['PB-2025-0341', 'PB-2025-0342'],
        instrument: 'HPLC-01',
        analysisDate: '2025-01-06',
        sampleCount: 24,
        analyst: 'Dr. Michael Chen',
        primaryReviewer: 'Dr. Sarah Chen',
        secondaryReviewer: 'Dr. Lisa Park',
        reviewStatus: 'pending_primary',
        qcData: {
          prepQC: {
            benchSheetComplete: true,
            deviationsDocumented: true,
            analyteNamesConsistent: true,
            reagentLotsDocumented: true
          },
          calibration: {
            r2Value: 0.9987,
            istdPeakArea: { withinRange: true, value: '±15%' },
            istdRSD: { value: 4.2, pass: true },
            sbisBlank: { pass: true, value: '<LOQ' },
            bbisBlank: { pass: true, value: '<LOQ' },
            icvPass: true,
            ccvPass: true,
            rrtWithinRange: true
          },
          chromatography: {
            sscDistinguishable: true,
            peakIntegration: 'meets_criteria'
          },
          replicates: {
            duplicateRPD: { max: 8.3, pass: true },
            manualCalcCheck: true
          }
        },
        files: {
          calibrationSummary: 'CAL_SUMMARY_AB-2025-0142.pdf',
          dataSummary: 'DATA_SUMMARY_AB-2025-0142.pdf',
          benchSheet: 'BENCH_AB-2025-0142.xlsx',
          controlCharts: 'QC_CHARTS_AB-2025-0142.xlsm'
        }
      },
      {
        id: 'AB-2025-0141',
        prepBatchIds: ['PB-2025-0339', 'PB-2025-0340'],
        instrument: 'HPLC-02',
        analysisDate: '2025-01-05',
        sampleCount: 18,
        analyst: 'Dr. Lisa Park',
        primaryReviewer: 'Dr. Lisa Park',
        secondaryReviewer: 'Dr. Michael Chen',
        reviewStatus: 'pending_secondary',
        primaryReviewDate: '2025-01-06 09:45:00',
        primaryReviewComments: 'All QC checks pass. Minor peak tailing on CBD standard noted but within acceptable limits.',
        qcData: {
          prepQC: {
            benchSheetComplete: true,
            deviationsDocumented: false,
            analyteNamesConsistent: true,
            reagentLotsDocumented: true
          },
          calibration: {
            r2Value: 0.9991,
            istdPeakArea: { withinRange: true, value: '±12%' },
            istdRSD: { value: 3.8, pass: true },
            sbisBlank: { pass: true, value: '<LOQ' },
            bbisBlank: { pass: true, value: '<LOQ' },
            icvPass: true,
            ccvPass: true,
            rrtWithinRange: true
          },
          chromatography: {
            sscDistinguishable: true,
            peakIntegration: 'meets_criteria'
          },
          replicates: {
            duplicateRPD: { max: 6.7, pass: true },
            manualCalcCheck: true
          }
        },
        files: {
          calibrationSummary: 'CAL_SUMMARY_AB-2025-0141.pdf',
          dataSummary: 'DATA_SUMMARY_AB-2025-0141.pdf',
          benchSheet: 'BENCH_AB-2025-0141.xlsx',
          controlCharts: 'QC_CHARTS_AB-2025-0141.xlsm'
        }
      },
      {
        id: 'AB-2025-0140',
        prepBatchIds: ['PB-2025-0337', 'PB-2025-0338'],
        instrument: 'HPLC-01',
        analysisDate: '2025-01-04',
        sampleCount: 32,
        analyst: 'Dr. Michael Chen',
        primaryReviewer: 'Dr. Sarah Chen',
        secondaryReviewer: 'Dr. Lisa Park',
        reviewStatus: 'complete',
        primaryReviewDate: '2025-01-05 14:20:00',
        secondaryReviewDate: '2025-01-06 08:15:00',
        primaryReviewComments: 'All QC within limits.',
        secondaryReviewComments: 'Approved for reporting. Control charts updated.',
        qcData: {
          prepQC: {
            benchSheetComplete: true,
            deviationsDocumented: true,
            analyteNamesConsistent: true,
            reagentLotsDocumented: true
          },
          calibration: {
            r2Value: 0.9995,
            istdPeakArea: { withinRange: true, value: '±8%' },
            istdRSD: { value: 2.1, pass: true },
            sbisBlank: { pass: true, value: '<LOQ' },
            bbisBlank: { pass: true, value: '<LOQ' },
            icvPass: true,
            ccvPass: true,
            rrtWithinRange: true
          },
          chromatography: {
            sscDistinguishable: true,
            peakIntegration: 'meets_criteria'
          },
          replicates: {
            duplicateRPD: { max: 4.2, pass: true },
            manualCalcCheck: true
          }
        },
        files: {
          calibrationSummary: 'CAL_SUMMARY_AB-2025-0140.pdf',
          dataSummary: 'DATA_SUMMARY_AB-2025-0140.pdf',
          benchSheet: 'BENCH_AB-2025-0140.xlsx',
          controlCharts: 'QC_CHARTS_AB-2025-0140.xlsm',
          finalReport: 'FINAL_QC_AB-2025-0140.pdf'
        }
      }
    ],
    terpenes: [],
    pesticides: []
  };

  const batches = mockAnalyticalBatches[assayType] || [];
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const toggleManualCheck = (check) => {
    setManualChecks(prev => ({
      ...prev,
      [check]: !prev[check]
    }));
  };
  
  const getReviewStatusBadge = (status) => {
    switch (status) {
      case 'pending_primary':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending Primary Review
          </span>
        );
      case 'pending_secondary':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending Secondary Review
          </span>
        );
      case 'complete':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Review Complete
          </span>
        );
      default:
        return null;
    }
  };
  
  const getQCStatusIcon = (pass) => {
    if (pass) {
      return <CheckCircle className="w-4 h-4 text-blue-600" />;
    }
    return <XCircle className="w-4 h-4 text-red-600" />;
  };
  
  const renderQCCheck = (label, value, pass = true) => {
    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-700">{label}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">{value}</span>
          {getQCStatusIcon(pass)}
        </div>
      </div>
    );
  };
  
  const renderManualCheck = (checkKey, label, helpText) => {
    return (
      <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
        <button
          onClick={() => toggleManualCheck(checkKey)}
          className="mt-0.5 flex-shrink-0"
        >
          {manualChecks[checkKey] ? (
            <CheckSquare className="w-5 h-5 text-blue-600" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )}
        </button>
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-900 cursor-pointer" onClick={() => toggleManualCheck(checkKey)}>
            {label}
          </label>
          {helpText && (
            <p className="text-xs text-gray-500 mt-0.5">{helpText}</p>
          )}
        </div>
      </div>
    );
  };
  
  const handleSubmitReview = () => {
    if (!reviewDecision) {
      alert('Please select Accept or Reject before submitting');
      return;
    }
    
    const allManualChecksComplete = Object.values(manualChecks).every(check => check === true);
    if (!allManualChecksComplete) {
      alert('Please complete all manual verification checks');
      return;
    }
    
    // Ensure comments are not empty (fill with N/A if needed)
    const finalComments = {
      primary: isPrimaryReview ? (comments.primary || 'N/A - No additional comments') : comments.primary,
      secondary: isSecondaryReview ? (comments.secondary || 'N/A - No additional comments') : comments.secondary
    };
    
    // In real implementation, this would save to LIMS
    console.log('Submitting review:', {
      batchId: selectedBatch.id,
      decision: reviewDecision,
      manualChecks,
      comments: finalComments,
      timestamp: new Date().toISOString()
    });
    
    alert(`Review submitted successfully for batch ${selectedBatch.id}`);
    setSelectedBatch(null);
  };

  if (!selectedBatch) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {assayType.charAt(0).toUpperCase() + assayType.slice(1)} Review Queue
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Analytical batch quality control review
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Analysis Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Samples
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Analyst
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {batches.map(batch => (
                  <tr key={batch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {batch.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {batch.analysisDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {batch.sampleCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {batch.analyst}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReviewStatusBadge(batch.reviewStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedBatch(batch)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {batch.reviewStatus === 'complete' ? 'View' : 'Review'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Review interface for selected batch
  const isReadOnly = selectedBatch.reviewStatus === 'complete';
  const isPrimaryReview = selectedBatch.reviewStatus === 'pending_primary';
  const isSecondaryReview = selectedBatch.reviewStatus === 'pending_secondary';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Analytical Batch Review: {selectedBatch.id}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {isReadOnly ? 'View completed review' : `${isPrimaryReview ? 'Primary' : 'Secondary'} review in progress`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getReviewStatusBadge(selectedBatch.reviewStatus)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Review Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Batch Metadata */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Batch Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Prep Batch IDs:</span>
                  <p className="font-medium">{selectedBatch.prepBatchIds.join(', ')}</p>
                </div>
                <div>
                  <span className="text-gray-500">Instrument:</span>
                  <p className="font-medium">{selectedBatch.instrument}</p>
                </div>
                <div>
                  <span className="text-gray-500">Analysis Date:</span>
                  <p className="font-medium">{selectedBatch.analysisDate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Sample Count:</span>
                  <p className="font-medium">{selectedBatch.sampleCount}</p>
                </div>
                <div>
                  <span className="text-gray-500">Analyst:</span>
                  <p className="font-medium">{selectedBatch.analyst}</p>
                </div>
                <div>
                  <span className="text-gray-500">SOP Version:</span>
                  <p className="font-medium">SOP-{assayType.toUpperCase()}-v3.2</p>
                </div>
              </div>
            </div>

            {/* Sample Prep QC */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('prepQC')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <h2 className="text-lg font-medium text-gray-900">Sample Prep & Batch QC</h2>
                {expandedSections.prepQC ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {expandedSections.prepQC && (
                <div className="px-6 pb-4">
                  {renderQCCheck('Bench Sheet Steps Completed', 'Yes', selectedBatch.qcData.prepQC.benchSheetComplete)}
                  {renderQCCheck('Deviations Documented', selectedBatch.qcData.prepQC.deviationsDocumented ? 'Yes' : 'No', selectedBatch.qcData.prepQC.deviationsDocumented)}
                  {renderQCCheck('Analyte Names Consistent', 'Yes', selectedBatch.qcData.prepQC.analyteNamesConsistent)}
                  {renderQCCheck('Reagent Lots Documented', 'Yes', selectedBatch.qcData.prepQC.reagentLotsDocumented)}
                </div>
              )}
            </div>

            {/* Calibration Validation */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('calibration')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <h2 className="text-lg font-medium text-gray-900">Calibration Validation</h2>
                {expandedSections.calibration ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {expandedSections.calibration && (
                <div className="px-6 pb-4">
                  {renderQCCheck('Correlation Coefficient (r²)', selectedBatch.qcData.calibration.r2Value.toFixed(4), selectedBatch.qcData.calibration.r2Value >= 0.995)}
                  {renderQCCheck('ISTD Peak Area', selectedBatch.qcData.calibration.istdPeakArea.value, selectedBatch.qcData.calibration.istdPeakArea.withinRange)}
                  {renderQCCheck('ISTD RSD', `${selectedBatch.qcData.calibration.istdRSD.value}%`, selectedBatch.qcData.calibration.istdRSD.pass)}
                  {renderQCCheck('SBIS Blank', selectedBatch.qcData.calibration.sbisBlank.value, selectedBatch.qcData.calibration.sbisBlank.pass)}
                  {renderQCCheck('BBIS Blank', selectedBatch.qcData.calibration.bbisBlank.value, selectedBatch.qcData.calibration.bbisBlank.pass)}
                  {renderQCCheck('ICV Within Criteria', 'Pass', selectedBatch.qcData.calibration.icvPass)}
                  {renderQCCheck('CCV Within Criteria', 'Pass', selectedBatch.qcData.calibration.ccvPass)}
                  {renderQCCheck('RRT Within Range', 'Yes', selectedBatch.qcData.calibration.rrtWithinRange)}
                </div>
              )}
            </div>

            {/* Chromatographic Validation */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('chromatography')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <h2 className="text-lg font-medium text-gray-900">Chromatographic Validation</h2>
                {expandedSections.chromatography ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {expandedSections.chromatography && (
                <div className="px-6 pb-4">
                  {renderQCCheck('SSC Distinguishable from Noise', 'Yes', selectedBatch.qcData.chromatography.sscDistinguishable)}
                  {renderQCCheck('Peak Integration', 'Meets Criteria', selectedBatch.qcData.chromatography.peakIntegration === 'meets_criteria')}
                </div>
              )}
            </div>

            {/* Replicates & RPD */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('replicates')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <h2 className="text-lg font-medium text-gray-900">Replicates & RPD Validation</h2>
                {expandedSections.replicates ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {expandedSections.replicates && (
                <div className="px-6 pb-4">
                  {renderQCCheck('Duplicate RPD < 20%', `Max: ${selectedBatch.qcData.replicates.duplicateRPD.max}%`, selectedBatch.qcData.replicates.duplicateRPD.pass)}
                  {renderQCCheck('Manual Calculation Check', 'Consistent', selectedBatch.qcData.replicates.manualCalcCheck)}
                </div>
              )}
            </div>

            {/* Manual Review Checks */}
            {!isReadOnly && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('manualChecks')}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                >
                  <h2 className="text-lg font-medium text-gray-900">Manual Review Checks</h2>
                  {expandedSections.manualChecks ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                {expandedSections.manualChecks && (
                  <div className="px-6 pb-4">
                    {renderManualCheck('visualVerification', 'Visual Verification of Chromatograms', 'Confirm peak shapes, noise levels, and alignment meet criteria')}
                    {renderManualCheck('prepBatchMatch', 'Prep Batch Workbooks Match LIMS IDs', 'Verify prep batch IDs in workbooks match LIMS records')}
                    {renderManualCheck('controlChartExport', 'Control Charts Exported', 'Export current batch data to control chart workbook')}
                    {isSecondaryReview && renderManualCheck('primaryFindings', 'Primary Reviewer Findings Addressed', 'Confirm all primary review comments have been resolved')}
                    {renderManualCheck('deviationsReviewed', 'Deviations Reviewed', 'All documented deviations have been investigated and justified')}
                  </div>
                )}
              </div>
            )}

            {/* Review Comments */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Review Comments</h2>
              
              {/* Show primary comments if they exist */}
              {selectedBatch.primaryReviewComments && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Review Comments ({selectedBatch.primaryReviewDate})
                  </label>
                  <div className="p-3 bg-gray-50 rounded text-sm text-gray-700">
                    {selectedBatch.primaryReviewComments}
                  </div>
                </div>
              )}
              
              {/* Show secondary comments if they exist */}
              {selectedBatch.secondaryReviewComments && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Review Comments ({selectedBatch.secondaryReviewDate})
                  </label>
                  <div className="p-3 bg-gray-50 rounded text-sm text-gray-700">
                    {selectedBatch.secondaryReviewComments}
                  </div>
                </div>
              )}
              
              {/* Input for new comments */}
              {!isReadOnly && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {isPrimaryReview ? 'Primary' : 'Secondary'} Review Comments
                    </label>
                    <button
                      onClick={() => setComments(prev => ({
                        ...prev,
                        [isPrimaryReview ? 'primary' : 'secondary']: 
                          prev[isPrimaryReview ? 'primary' : 'secondary'] || 'N/A - No additional comments'
                      }))}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Fill with N/A
                    </button>
                  </div>
                  <textarea
                    value={isPrimaryReview ? comments.primary : comments.secondary}
                    onChange={(e) => setComments(prev => ({
                      ...prev,
                      [isPrimaryReview ? 'primary' : 'secondary']: e.target.value
                    }))}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any review comments or findings..."
                  />
                </div>
              )}
            </div>

            {/* Review Decision */}
            {!isReadOnly && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Review Decision</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setReviewDecision('accept')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                      reviewDecision === 'accept'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                    Accept
                  </button>
                  <button
                    onClick={() => setReviewDecision('reject')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                      reviewDecision === 'reject'
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <XCircle className="w-5 h-5 mx-auto mb-1" />
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Digital Lab Assets */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('digitalAssets')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <h2 className="text-lg font-medium text-gray-900">Digital Lab Assets</h2>
                {expandedSections.digitalAssets ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {expandedSections.digitalAssets && (
                <div className="px-6 pb-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Method File</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={digitalLabAssets.methodFile}
                        readOnly={isReadOnly}
                        className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                      />
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calibration File</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={digitalLabAssets.calibrationFile}
                        readOnly={isReadOnly}
                        className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                      />
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* File Links */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Batch Files</h2>
              <div className="space-y-2">
                {Object.entries(selectedBatch.files).map(([key, filename]) => (
                  <a
                    key={key}
                    href="#"
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm"
                  >
                    <span className="text-gray-700">{filename}</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/bench-sheet/${selectedBatch.prepBatchIds[0]}`)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm text-blue-600 hover:text-blue-800"
                  >
                    <span>View Bench Sheets</span>
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reviewer Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Reviewers</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Primary Reviewer:</span>
                  <p className="font-medium">{selectedBatch.primaryReviewer}</p>
                  {selectedBatch.primaryReviewDate && (
                    <p className="text-xs text-gray-500">{selectedBatch.primaryReviewDate}</p>
                  )}
                </div>
                <div>
                  <span className="text-gray-500">Secondary Reviewer:</span>
                  <p className="font-medium">{selectedBatch.secondaryReviewer}</p>
                  {selectedBatch.secondaryReviewDate && (
                    <p className="text-xs text-gray-500">{selectedBatch.secondaryReviewDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {!isReadOnly && (
              <button
                onClick={handleSubmitReview}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Submit {isPrimaryReview ? 'Primary' : 'Secondary'} Review</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewQueue;