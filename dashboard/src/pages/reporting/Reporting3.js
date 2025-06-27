import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, FileText, Upload, Shield, TrendingUp } from 'lucide-react';

const Reporting3 = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [pendingSubmissions, setPendingSubmissions] = useState({});
  const [failedSamples, setFailedSamples] = useState([]);
  const [complianceMetrics, setComplianceMetrics] = useState({});

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = () => {
    // Pending reviews
    const reviews = [
      { id: 'S-2025-016', client: 'Green Valley Farms', test: 'Potency', status: 'pending', analyst: 'J. Smith', completedTime: '10:30 AM' },
      { id: 'S-2025-017', client: 'Mountain Top', test: 'Microbials', status: 'pending', analyst: 'M. Johnson', completedTime: '11:15 AM' },
      { id: 'S-2025-018', client: 'Pure Leaf Labs', test: 'Full Panel', status: 'pending', analyst: 'K. Davis', completedTime: '11:45 AM' },
      { id: 'S-2025-019', client: 'Buckeye Botanicals', test: 'Heavy Metals', status: 'pending', analyst: 'L. Wilson', completedTime: '12:00 PM' },
      { id: 'S-2025-020', client: 'Ohio Organic', test: 'Pesticides', status: 'pending', analyst: 'R. Taylor', completedTime: '12:30 PM' },
      { id: 'S-2025-021', client: 'Great Lakes Cannabis', test: 'Potency', status: 'pending', analyst: 'S. Brown', completedTime: '1:00 PM' },
      { id: 'S-2025-022', client: 'Cleveland Cultivators', test: 'Microbials', status: 'pending', analyst: 'T. Garcia', completedTime: '1:30 PM' },
      { id: 'S-2025-023', client: 'Toledo Farms', test: 'Full Panel', status: 'pending', analyst: 'U. Martinez', completedTime: '2:00 PM' }
    ];

    // Pending submissions (COA, Metrc, CC)
    const submissions = {
      coa: [
        { id: 'S-2025-010', client: 'Columbus Collective', state: 'OH' },
        { id: 'S-2025-011', client: 'Dayton Dispensary', state: 'OH' },
        { id: 'S-2025-012', client: 'Cincinnati CBD', state: 'OH' }
      ],
      metrc: [
        { id: 'S-2025-008', client: 'Toledo Farms', state: 'OH', tag: 'ABC123456' },
        { id: 'S-2025-009', client: 'Akron Gardens', state: 'OH', tag: 'DEF789012' },
        { id: 'S-2025-013', client: 'Youngstown Yields', state: 'MI', tag: 'GHI345678' },
        { id: 'S-2025-014', client: 'Canton Cannabis', state: 'MI', tag: 'JKL901234' }
      ],
      confidentCannabis: [
        { id: 'S-2025-015', client: 'Springfield Strains', product: 'Flower' },
        { id: 'S-2025-024', client: 'Findlay Farms', product: 'Concentrate' }
      ]
    };

    // Failed samples requiring action
    const failed = [
      { id: 'S-2025-025', client: 'Warren Wellness', test: 'Microbials', reason: 'Yeast/Mold: 15,000 CFU/g', action: 'Client notification sent' },
      { id: 'S-2025-026', client: 'Mansfield Medicine', test: 'Pesticides', reason: 'Bifenthrin detected', action: 'Awaiting client response' },
      { id: 'S-2025-027', client: 'Lima Labs', test: 'Heavy Metals', reason: 'Lead: 0.75 ppm', action: 'Retest scheduled' }
    ];

    // Compliance metrics
    const metrics = {
      coaCompletionRate: 92,
      metrcSubmissionRate: 88,
      avgReviewTime: 2.5,
      complianceScore: 95,
      pendingNonCompliance: 3,
      monthlySubmissions: 487
    };

    setPendingReviews(reviews);
    setPendingSubmissions(submissions);
    setFailedSamples(failed);
    setComplianceMetrics(metrics);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Compliance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{pendingReviews.length}</p>
                <p className="text-xs text-gray-500 mt-1">Avg review time: {complianceMetrics.avgReviewTime}h</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {pendingSubmissions.coa?.length + pendingSubmissions.metrc?.length + pendingSubmissions.confidentCannabis?.length || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">COA: {pendingSubmissions.coa?.length}, Metrc: {pendingSubmissions.metrc?.length}</p>
              </div>
              <Upload className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{complianceMetrics.complianceScore}%</p>
                <p className="text-xs text-gray-500 mt-1">Monthly submissions: {complianceMetrics.monthlySubmissions}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Results Pending Review */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Results Pending Review</h3>
              <span className="text-sm text-gray-500">{pendingReviews.length} items</span>
            </div>
            <div className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pendingReviews.map(review => (
                  <div key={review.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.id}</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          {review.test}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{review.client}</p>
                      <p className="text-xs text-gray-500">Completed by {review.analyst} at {review.completedTime}</p>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Submissions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Pending Submissions</h3>
            </div>
            <div className="p-6">
              {/* COA Generation */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">COA Generation</h4>
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {pendingSubmissions.coa?.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">{item.id} - {item.client}</span>
                      <span className="text-xs text-gray-500">{item.state}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrc Submission */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Metrc Submission</h4>
                  <Upload className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {pendingSubmissions.metrc?.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm text-gray-900">{item.id} - {item.client}</span>
                        <span className="text-xs text-gray-500 block">Tag: {item.tag}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.state}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confident Cannabis */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Confident Cannabis</h4>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {pendingSubmissions.confidentCannabis?.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">{item.id} - {item.client}</span>
                      <span className="text-xs text-gray-500">{item.product}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Failed Samples */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Failed Samples Requiring Action</h3>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {failedSamples.map(sample => (
                    <tr key={sample.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{sample.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{sample.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{sample.test}</td>
                      <td className="px-4 py-3 text-sm text-red-600">{sample.reason}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          {sample.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Batch Approve</p>
            <p className="text-sm text-gray-500 mt-1">Review all pending</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <FileText className="h-6 w-6 text-blue-500 mb-2" />
            <p className="font-medium text-gray-900">Generate COAs</p>
            <p className="text-sm text-gray-500 mt-1">{pendingSubmissions.coa?.length} pending</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <Upload className="h-6 w-6 text-indigo-500 mb-2" />
            <p className="font-medium text-gray-900">Submit to Metrc</p>
            <p className="text-sm text-gray-500 mt-1">{pendingSubmissions.metrc?.length} ready</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <Shield className="h-6 w-6 text-purple-500 mb-2" />
            <p className="font-medium text-gray-900">Compliance Report</p>
            <p className="text-sm text-gray-500 mt-1">View full report</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reporting3;