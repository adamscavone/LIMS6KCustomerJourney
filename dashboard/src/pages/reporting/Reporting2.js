import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, BarChart3, Activity } from 'lucide-react';

const Reporting2 = () => {
  const [criticalSamples, setCriticalSamples] = useState([]);
  const [workflowStats, setWorkflowStats] = useState({});
  const [failedTests, setFailedTests] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Critical samples (overdue + at risk)
    const critical = [
      { id: 'S-2025-001', client: 'Green Valley Farms', status: 'overdue', stage: 'Analysis', hoursOverdue: 24, priority: 'DPM' },
      { id: 'S-2025-002', client: 'Mountain Top', status: 'overdue', stage: 'Review', hoursOverdue: 12, priority: 'Rush' },
      { id: 'S-2025-003', client: 'Pure Leaf Labs', status: 'at-risk', stage: 'Prep', hoursLeft: 2, priority: 'Standard' },
      { id: 'S-2025-004', client: 'Buckeye Botanicals', status: 'at-risk', stage: 'Analysis', hoursLeft: 4, priority: 'DPM' },
      { id: 'S-2025-005', client: 'Ohio Organic', status: 'at-risk', stage: 'Review', hoursLeft: 6, priority: 'Standard' }
    ];

    // Workflow distribution
    const workflow = {
      receiving: { count: 12, percentage: 8 },
      prep: { count: 28, percentage: 18 },
      analysis: { count: 45, percentage: 29 },
      review: { count: 38, percentage: 25 },
      reporting: { count: 31, percentage: 20 }
    };

    // Recent failed tests
    const failed = [
      { id: 'S-2025-010', client: 'Toledo Farms', test: 'Microbials', reason: 'Yeast/Mold: 12,500 CFU/g', date: '06/26/25 10:30' },
      { id: 'S-2025-011', client: 'Akron Gardens', test: 'Pesticides', reason: 'Bifenthrin detected', date: '06/26/25 09:15' },
      { id: 'S-2025-012', client: 'Columbus Collective', test: 'Heavy Metals', reason: 'Lead: 0.65 ppm', date: '06/26/25 08:45' }
    ];

    // Performance metrics
    const metrics = {
      avgTAT: { current: 22.5, target: 24, trend: 'down' },
      onTimeRate: { current: 87, target: 85, trend: 'up' },
      firstPassRate: { current: 94.2, target: 95, trend: 'stable' },
      samplesProcessed: { today: 42, yesterday: 38, weekTotal: 186 }
    };

    setCriticalSamples(critical);
    setWorkflowStats(workflow);
    setFailedTests(failed);
    setPerformanceMetrics(metrics);
  };

  const getStatusColor = (status) => {
    return status === 'overdue' ? 'text-red-600 bg-red-50' : 'text-orange-600 bg-orange-50';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Performance Overview */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{performanceMetrics.avgTAT?.current}h</p>
              <p className="text-sm text-gray-500">Avg TAT</p>
              <p className="text-xs mt-1">
                Target: {performanceMetrics.avgTAT?.target}h 
                <span className={performanceMetrics.avgTAT?.trend === 'down' ? 'text-green-600' : 'text-red-600'}>
                  {' '}{getTrendIcon(performanceMetrics.avgTAT?.trend)}
                </span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{performanceMetrics.onTimeRate?.current}%</p>
              <p className="text-sm text-gray-500">On-Time Rate</p>
              <p className="text-xs mt-1">
                Target: {performanceMetrics.onTimeRate?.target}%
                <span className={performanceMetrics.onTimeRate?.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {' '}{getTrendIcon(performanceMetrics.onTimeRate?.trend)}
                </span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{performanceMetrics.firstPassRate?.current}%</p>
              <p className="text-sm text-gray-500">First Pass Rate</p>
              <p className="text-xs mt-1">
                Target: {performanceMetrics.firstPassRate?.target}%
                <span className="text-gray-600">
                  {' '}{getTrendIcon(performanceMetrics.firstPassRate?.trend)}
                </span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{performanceMetrics.samplesProcessed?.today}</p>
              <p className="text-sm text-gray-500">Samples Today</p>
              <p className="text-xs mt-1">Week Total: {performanceMetrics.samplesProcessed?.weekTotal}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Critical Samples */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Critical Samples Requiring Attention</h3>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {criticalSamples.map(sample => (
                  <div key={sample.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{sample.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`}>
                          {sample.status === 'overdue' ? `${sample.hoursOverdue}h overdue` : `${sample.hoursLeft}h left`}
                        </span>
                        {sample.priority === 'DPM' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">DPM</span>
                        )}
                        {sample.priority === 'Rush' && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">RUSH</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{sample.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Stage: {sample.stage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow Distribution */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Workflow Distribution</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(workflowStats).map(([stage, data]) => (
                  <div key={stage}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium capitalize text-gray-700">{stage}</span>
                      <span className="text-sm text-gray-600">{data.count} samples</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Total Active Samples: <span className="font-medium text-gray-900">154</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Failed Tests */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Failed Tests</h3>
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {failedTests.map(test => (
                    <tr key={test.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{test.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{test.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{test.test}</td>
                      <td className="px-4 py-3 text-sm text-red-600">{test.reason}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{test.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">View All Failed Tests</button>
              <Activity className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-medium text-gray-900">Generate Metrc Reports</p>
                <p className="text-sm text-gray-500 mt-1">12 samples ready</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-medium text-gray-900">Review Pending Results</p>
                <p className="text-sm text-gray-500 mt-1">8 awaiting approval</p>
              </div>
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-medium text-gray-900">Performance Analytics</p>
                <p className="text-sm text-gray-500 mt-1">View detailed metrics</p>
              </div>
              <BarChart3 className="h-6 w-6 text-indigo-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reporting2;