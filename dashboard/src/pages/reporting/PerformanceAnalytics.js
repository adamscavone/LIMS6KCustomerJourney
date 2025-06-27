import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('tat');

  const metrics = {
    tat: {
      current: 22.5,
      previous: 24.8,
      target: 24,
      unit: 'hours',
      trend: 'down',
      improvement: 9.3
    },
    throughput: {
      current: 156,
      previous: 142,
      target: 150,
      unit: 'samples',
      trend: 'up',
      improvement: 9.9
    },
    failureRate: {
      current: 3.2,
      previous: 4.1,
      target: 5,
      unit: '%',
      trend: 'down',
      improvement: 22
    },
    efficiency: {
      current: 87,
      previous: 82,
      target: 85,
      unit: '%',
      trend: 'up',
      improvement: 6.1
    }
  };

  const tatBreakdown = [
    { stage: 'Receiving', avgTime: 2.5, samples: 156 },
    { stage: 'Prep', avgTime: 4.2, samples: 148 },
    { stage: 'Analysis', avgTime: 12.8, samples: 132 },
    { stage: 'Review', avgTime: 3.0, samples: 128 }
  ];

  const failureAnalysis = [
    { reason: 'Microbial Contamination', count: 8, percentage: 42 },
    { reason: 'Pesticide Detection', count: 5, percentage: 26 },
    { reason: 'Heavy Metals', count: 3, percentage: 16 },
    { reason: 'Potency Out of Range', count: 2, percentage: 11 },
    { reason: 'Other', count: 1, percentage: 5 }
  ];

  const labPerformance = [
    { assay: 'Potency', samplesProcessed: 145, avgTAT: 18.5, onTimeRate: 94 },
    { assay: 'Microbials', samplesProcessed: 132, avgTAT: 22.3, onTimeRate: 88 },
    { assay: 'Pesticides', samplesProcessed: 98, avgTAT: 26.7, onTimeRate: 82 },
    { assay: 'Heavy Metals', samplesProcessed: 76, avgTAT: 24.1, onTimeRate: 90 },
    { assay: 'Mycotoxins', samplesProcessed: 54, avgTAT: 28.9, onTimeRate: 78 }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  const getMetricColor = (current, target, type) => {
    if (type === 'tat' || type === 'failureRate') {
      return current <= target ? 'text-green-600' : 'text-red-600';
    }
    return current >= target ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
            <div className="flex space-x-2">
              {['day', 'week', 'month', 'quarter'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    timeRange === range
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {Object.entries(metrics).map(([key, metric]) => (
              <div
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${
                  selectedMetric === key ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate capitalize">
                          {key === 'tat' ? 'Average TAT' : key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            <span className={getMetricColor(metric.current, metric.target, key)}>
                              {metric.current}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">vs last {timeRange}</span>
                      <span className={`font-medium ${
                        (key === 'tat' || key === 'failureRate') && metric.trend === 'down' ? 'text-green-600' :
                        (key === 'tat' || key === 'failureRate') && metric.trend === 'up' ? 'text-red-600' :
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? '+' : '-'}{metric.improvement}%
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Target: {metric.target} {metric.unit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">TAT Breakdown by Stage</h3>
                <div className="space-y-4">
                  {tatBreakdown.map((stage) => (
                    <div key={stage.stage}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                        <span className="text-sm text-gray-500">
                          {stage.avgTime}h avg ({stage.samples} samples)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${(stage.avgTime / 22.5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Total Average TAT</span>
                    <span className="font-medium text-indigo-600">22.5 hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Failure Analysis</h3>
                <div className="space-y-3">
                  {failureAnalysis.map((item) => (
                    <div key={item.reason} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.reason}</span>
                          <span className="text-sm text-gray-500">{item.count} samples</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900 w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Total failures this {timeRange}: 19 samples (3.2% of total)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lab Performance by Assay</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assay Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Samples Processed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg TAT (hours)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        On-Time Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {labPerformance.map((assay) => (
                      <tr key={assay.assay}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {assay.assay}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {assay.samplesProcessed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {assay.avgTAT}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`font-medium ${
                            assay.onTimeRate >= 90 ? 'text-green-600' :
                            assay.onTimeRate >= 80 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {assay.onTimeRate}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                assay.onTimeRate >= 90 ? 'bg-green-500' :
                                assay.onTimeRate >= 80 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${assay.onTimeRate}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900">Key Insights</h4>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• TAT improved by 9.3% this {timeRange}</li>
                <li>• Microbial testing shows highest failure rate</li>
                <li>• Analysis stage is the primary bottleneck</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900">Achievements</h4>
              <ul className="mt-2 text-sm text-green-700 space-y-1">
                <li>• Met TAT target for 3 consecutive weeks</li>
                <li>• Potency testing at 94% on-time rate</li>
                <li>• Overall efficiency up 6.1%</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-900">Action Items</h4>
              <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                <li>• Address mycotoxin testing delays</li>
                <li>• Investigate microbial contamination spike</li>
                <li>• Optimize analysis stage workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;