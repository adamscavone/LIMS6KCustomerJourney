import React, { useState, useEffect } from 'react';
import { Clock, Package, Users, BarChart3, Filter, ArrowRight, Activity } from 'lucide-react';

const Reporting4 = () => {
  const [workflowSamples, setWorkflowSamples] = useState({});
  const [clientMetrics, setClientMetrics] = useState([]);
  const [tatBreakdown, setTatBreakdown] = useState({});
  const [activeFilters, setActiveFilters] = useState({ client: '', pipeline: 'all' });

  useEffect(() => {
    loadWorkflowData();
  }, [activeFilters]);

  const loadWorkflowData = () => {
    // Workflow distribution with sample details
    const workflow = {
      receiving: {
        count: 12,
        samples: [
          { id: 'S-2025-030', client: 'Green Valley Farms', pipeline: 'Cannabinoids', receivedTime: '8:00 AM' },
          { id: 'S-2025-031', client: 'Mountain Top', pipeline: 'Terpenes', receivedTime: '8:30 AM' },
          { id: 'S-2025-032', client: 'Pure Leaf Labs', pipeline: 'Pesticides', receivedTime: '9:00 AM' }
        ]
      },
      prep: {
        count: 28,
        samples: [
          { id: 'S-2025-025', client: 'Buckeye Botanicals', pipeline: 'Cannabinoids', timeInStage: '2h 15m' },
          { id: 'S-2025-026', client: 'Ohio Organic', pipeline: 'Cannabinoids', timeInStage: '1h 45m' },
          { id: 'S-2025-027', client: 'Great Lakes Cannabis', pipeline: 'Pesticides', timeInStage: '3h 30m' }
        ]
      },
      analysis: {
        count: 45,
        samples: [
          { id: 'S-2025-020', client: 'Cleveland Cultivators', pipeline: 'Cannabinoids', instrument: 'HPLC-01', progress: 75 },
          { id: 'S-2025-021', client: 'Toledo Farms', pipeline: 'Pesticides', instrument: 'LCMS-02', progress: 45 },
          { id: 'S-2025-022', client: 'Akron Gardens', pipeline: 'Terpenes', instrument: 'GCMS-01', progress: 90 }
        ]
      },
      review: {
        count: 38,
        samples: [
          { id: 'S-2025-015', client: 'Columbus Collective', pipeline: 'Cannabinoids', reviewer: 'Dr. Chen', stage: 'Primary' },
          { id: 'S-2025-016', client: 'Dayton Dispensary', pipeline: 'Pesticides', reviewer: 'Dr. Smith', stage: 'Secondary' },
          { id: 'S-2025-017', client: 'Cincinnati CBD', pipeline: 'Cannabinoids', reviewer: 'Dr. Johnson', stage: 'Primary' }
        ]
      },
      reporting: {
        count: 31,
        samples: [
          { id: 'S-2025-010', client: 'Youngstown Yields', pipeline: 'Full Panel', awaitingCOA: true },
          { id: 'S-2025-011', client: 'Canton Cannabis', pipeline: 'Cannabinoids', awaitingMetrc: true },
          { id: 'S-2025-012', client: 'Springfield Strains', pipeline: 'Terpenes', complete: true }
        ]
      }
    };

    // Client-specific metrics
    const clients = [
      { name: 'Green Valley Farms', activeSamples: 8, avgTAT: 20, onTimeRate: 95, totalThisMonth: 42 },
      { name: 'Mountain Top', activeSamples: 5, avgTAT: 22, onTimeRate: 88, totalThisMonth: 28 },
      { name: 'Pure Leaf Labs', activeSamples: 6, avgTAT: 18, onTimeRate: 100, totalThisMonth: 35 },
      { name: 'Buckeye Botanicals', activeSamples: 4, avgTAT: 24, onTimeRate: 82, totalThisMonth: 22 },
      { name: 'Ohio Organic', activeSamples: 7, avgTAT: 19, onTimeRate: 92, totalThisMonth: 38 }
    ];

    // TAT breakdown by stage
    const tat = {
      receiving: { avg: 2.5, target: 4 },
      prep: { avg: 6.0, target: 8 },
      analysis: { avg: 8.5, target: 10 },
      review: { avg: 4.0, target: 4 },
      reporting: { avg: 1.5, target: 2 },
      total: { avg: 22.5, target: 28 }
    };

    setWorkflowSamples(workflow);
    setClientMetrics(clients);
    setTatBreakdown(tat);
  };

  const workflowStages = [
    { key: 'receiving', name: 'Receiving', color: 'bg-gray-500', icon: Package },
    { key: 'prep', name: 'Sample Prep', color: 'bg-blue-500', icon: Activity },
    { key: 'analysis', name: 'Analysis', color: 'bg-purple-500', icon: BarChart3 },
    { key: 'review', name: 'Review', color: 'bg-orange-500', icon: Clock },
    { key: 'reporting', name: 'Reporting', color: 'bg-green-500', icon: ArrowRight }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Workflow Pipeline Overview */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Workflow Pipeline</h2>
            <div className="flex space-x-2">
              <select 
                value={activeFilters.pipeline}
                onChange={(e) => setActiveFilters({ ...activeFilters, pipeline: e.target.value })}
                className="text-sm border-gray-300 rounded-md"
              >
                <option value="all">All Pipelines</option>
                <option value="cannabinoids">Cannabinoids</option>
                <option value="terpenes">Terpenes</option>
                <option value="pesticides">Pesticides</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            {workflowStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <React.Fragment key={stage.key}>
                  <div className="flex-1">
                    <div className={`${stage.color} rounded-lg p-4 text-white`}>
                      <Icon className="h-6 w-6 mb-2" />
                      <p className="text-xs font-medium">{stage.name}</p>
                      <p className="text-2xl font-bold mt-1">{workflowSamples[stage.key]?.count || 0}</p>
                    </div>
                  </div>
                  {index < workflowStages.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Samples by Stage */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Samples by Stage</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {workflowStages.map(stage => (
                  <div key={stage.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 capitalize">{stage.name}</h4>
                      <span className="text-sm text-gray-500">{workflowSamples[stage.key]?.count || 0} samples</span>
                    </div>
                    <div className="space-y-2">
                      {workflowSamples[stage.key]?.samples.map(sample => (
                        <div key={sample.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{sample.id}</span>
                            <span className="text-gray-600">{sample.client}</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {sample.pipeline}
                            </span>
                          </div>
                          <div className="text-right text-gray-500">
                            {sample.receivedTime && `Received: ${sample.receivedTime}`}
                            {sample.timeInStage && `Time: ${sample.timeInStage}`}
                            {sample.progress && (
                              <div className="flex items-center space-x-2">
                                <span>{sample.instrument}</span>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${sample.progress}%` }}
                                  />
                                </div>
                                <span>{sample.progress}%</span>
                              </div>
                            )}
                            {sample.reviewer && `${sample.reviewer} - ${sample.stage}`}
                            {sample.awaitingCOA && <span className="text-orange-600">Awaiting COA</span>}
                            {sample.awaitingMetrc && <span className="text-blue-600">Awaiting Metrc</span>}
                            {sample.complete && <span className="text-green-600">Complete</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Metrics */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Top Clients</h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {clientMetrics.map(client => (
                  <div key={client.name} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{client.name}</span>
                      <span className="text-sm text-gray-500">{client.activeSamples} active</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500">Avg TAT</p>
                        <p className="font-medium">{client.avgTAT}h</p>
                      </div>
                      <div>
                        <p className="text-gray-500">On-Time</p>
                        <p className="font-medium">{client.onTimeRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Monthly</p>
                        <p className="font-medium">{client.totalThisMonth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TAT Breakdown */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">TAT Performance by Stage</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {Object.entries(tatBreakdown).map(([stage, data]) => (
                <div key={stage} className="text-center">
                  <p className="text-sm font-medium text-gray-600 capitalize mb-2">{stage}</p>
                  <p className="text-2xl font-bold text-gray-900">{data.avg}h</p>
                  <p className="text-xs text-gray-500">Target: {data.target}h</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          data.avg <= data.target ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((data.avg / data.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <Filter className="h-6 w-6 text-indigo-500 mb-2" />
            <p className="font-medium text-gray-900">Advanced Filters</p>
            <p className="text-sm text-gray-500 mt-1">Filter by date, client, test</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <Activity className="h-6 w-6 text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Workflow Analytics</p>
            <p className="text-sm text-gray-500 mt-1">Bottleneck analysis</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <Clock className="h-6 w-6 text-orange-500 mb-2" />
            <p className="font-medium text-gray-900">TAT Reports</p>
            <p className="text-sm text-gray-500 mt-1">Export detailed reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reporting4;