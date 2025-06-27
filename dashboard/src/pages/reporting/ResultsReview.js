import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

const ResultsReview = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [reviewFilters, setReviewFilters] = useState({
    testType: 'all',
    status: 'pending',
    client: ''
  });

  useEffect(() => {
    loadPendingReviews();
  }, [reviewFilters]);

  const loadPendingReviews = () => {
    const mockData = [
      {
        id: 'S-2025-001',
        clientName: 'Green Valley Farms',
        sampleType: 'Flower',
        testResults: {
          potency: {
            thc: 22.5,
            cbd: 0.8,
            total: 23.3,
            status: 'pass',
            actionLimit: 30,
            reviewed: false
          },
          microbials: {
            totalYeastMold: 8500,
            eColi: 'ND',
            salmonella: 'ND',
            status: 'pass',
            actionLimit: 10000,
            reviewed: false
          },
          pesticides: {
            detected: [],
            status: 'pass',
            reviewed: false
          },
          moisture: {
            value: 11.2,
            status: 'pass',
            actionLimit: 15,
            reviewed: false,
            requiredForCOA: true // Ohio specific
          }
        },
        overallStatus: 'pending',
        dateCompleted: new Date(Date.now() - 7200000),
        analyst: 'John Smith',
        notes: 'All tests within normal ranges'
      },
      {
        id: 'S-2025-002',
        clientName: 'Mountain Top Cultivators',
        sampleType: 'Concentrate',
        testResults: {
          potency: {
            thc: 78.3,
            cbd: 2.1,
            total: 80.4,
            status: 'pass',
            actionLimit: 100,
            reviewed: false
          },
          microbials: {
            totalYeastMold: 12000,
            eColi: 'ND',
            salmonella: 'ND',
            status: 'fail',
            actionLimit: 10000,
            reviewed: false
          },
          heavyMetals: {
            lead: 0.45,
            cadmium: 0.12,
            arsenic: 0.08,
            mercury: 0.02,
            status: 'pass',
            reviewed: false
          }
        },
        overallStatus: 'fail',
        dateCompleted: new Date(Date.now() - 3600000),
        analyst: 'Jane Doe',
        notes: 'Yeast/Mold exceeds action limit'
      },
      {
        id: 'S-2025-003',
        clientName: 'Pure Leaf Labs',
        sampleType: 'Edible',
        testResults: {
          potency: {
            thc: 98.5,
            cbd: 0.0,
            total: 98.5,
            status: 'warning',
            actionLimit: 100,
            reviewed: false,
            note: 'Near upper limit - verify calculation'
          },
          microbials: {
            totalYeastMold: 500,
            eColi: 'ND',
            salmonella: 'ND',
            status: 'pass',
            actionLimit: 10000,
            reviewed: true
          }
        },
        overallStatus: 'pending',
        dateCompleted: new Date(Date.now() - 1800000),
        analyst: 'Mike Johnson',
        notes: 'High potency - please verify'
      }
    ];
    setPendingReviews(mockData);
  };

  const handleApprove = (sampleId, testType) => {
    setPendingReviews(prev => prev.map(sample => {
      if (sample.id === sampleId) {
        const updated = { ...sample };
        if (testType) {
          updated.testResults[testType].reviewed = true;
        } else {
          updated.overallStatus = 'approved';
        }
        return updated;
      }
      return sample;
    }));
  };

  const handleReject = (sampleId, testType, reason) => {
    console.log(`Rejecting ${sampleId} - ${testType}: ${reason}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'text-green-600 bg-green-100';
      case 'fail':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredReviews = pendingReviews.filter(sample => {
    if (reviewFilters.status === 'pending' && sample.overallStatus === 'approved') return false;
    if (reviewFilters.status === 'approved' && sample.overallStatus !== 'approved') return false;
    if (reviewFilters.client && !sample.clientName.toLowerCase().includes(reviewFilters.client.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Results Review & Quality Control</h1>

          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Review Status</label>
                  <select
                    value={reviewFilters.status}
                    onChange={(e) => setReviewFilters({ ...reviewFilters, status: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Test Type</label>
                  <select
                    value={reviewFilters.testType}
                    onChange={(e) => setReviewFilters({ ...reviewFilters, testType: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Tests</option>
                    <option value="potency">Potency</option>
                    <option value="microbials">Microbials</option>
                    <option value="pesticides">Pesticides</option>
                    <option value="heavyMetals">Heavy Metals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Search</label>
                  <input
                    type="text"
                    value={reviewFilters.client}
                    onChange={(e) => setReviewFilters({ ...reviewFilters, client: e.target.value })}
                    placeholder="Search by client..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((sample) => (
              <div key={sample.id} className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{sample.id}</h3>
                      <p className="text-sm text-gray-500">{sample.clientName} - {sample.sampleType}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Completed: {sample.dateCompleted.toLocaleString()} by {sample.analyst}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      sample.overallStatus === 'fail' ? 'bg-red-100 text-red-800' :
                      sample.overallStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sample.overallStatus === 'fail' ? 'Failed' :
                       sample.overallStatus === 'approved' ? 'Approved' : 'Pending Review'}
                    </div>
                  </div>

                  {sample.notes && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                      <p className="text-sm text-yellow-800">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Note: {sample.notes}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {Object.entries(sample.testResults).map(([testType, results]) => (
                      <div key={testType} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 capitalize">{testType}</h4>
                            <div className="mt-2 text-sm text-gray-600">
                              {testType === 'potency' && (
                                <div>
                                  THC: {results.thc}% | CBD: {results.cbd}% | Total: {results.total}%
                                  {results.actionLimit && ` (Limit: ${results.actionLimit}%)`}
                                </div>
                              )}
                              {testType === 'microbials' && (
                                <div>
                                  Yeast/Mold: {results.totalYeastMold} CFU/g (Limit: {results.actionLimit})
                                  <br />E. coli: {results.eColi} | Salmonella: {results.salmonella}
                                </div>
                              )}
                              {testType === 'pesticides' && (
                                <div>
                                  {results.detected.length === 0 ? 'No pesticides detected' : 
                                   `${results.detected.length} pesticides detected`}
                                </div>
                              )}
                              {testType === 'moisture' && (
                                <div>
                                  Moisture: {results.value}% (Limit: {results.actionLimit}%)
                                  {results.requiredForCOA && 
                                    <span className="ml-2 text-xs text-indigo-600">(Required for COA)</span>
                                  }
                                </div>
                              )}
                              {testType === 'heavyMetals' && (
                                <div>
                                  Pb: {results.lead} | Cd: {results.cadmium} | As: {results.arsenic} | Hg: {results.mercury} ppm
                                </div>
                              )}
                            </div>
                            {results.note && (
                              <p className="mt-1 text-xs text-yellow-600">{results.note}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(results.status)}`}>
                              {results.status.toUpperCase()}
                            </span>
                            {!results.reviewed && sample.overallStatus !== 'approved' && (
                              <>
                                <button
                                  onClick={() => handleApprove(sample.id, testType)}
                                  className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleReject(sample.id, testType, 'Needs re-testing')}
                                  className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {results.reviewed && (
                              <Check className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {sample.overallStatus === 'pending' && (
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={() => setSelectedSample(sample)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleApprove(sample.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Approve All Results
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsReview;