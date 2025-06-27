import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

const SampleProgressTracking = () => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [workflowStats, setWorkflowStats] = useState({
    receiving: 0,
    prep: 0,
    analysis: 0,
    review: 0,
    completed: 0
  });

  const workflowStages = [
    { name: 'Receiving', key: 'receiving', color: 'bg-gray-500' },
    { name: 'Prep', key: 'prep', color: 'bg-blue-500' },
    { name: 'Analysis', key: 'analysis', color: 'bg-yellow-500' },
    { name: 'Review', key: 'review', color: 'bg-purple-500' },
    { name: 'Completed', key: 'completed', color: 'bg-green-500' }
  ];

  useEffect(() => {
    loadSampleData();
  }, []);

  const loadSampleData = () => {
    const mockData = [
      {
        id: 'S-2025-001',
        clientName: 'Green Valley Farms',
        sampleType: 'Flower',
        workflowHistory: [
          { stage: 'Receiving', timestamp: new Date(Date.now() - 86400000 * 3), duration: 2 },
          { stage: 'Prep', timestamp: new Date(Date.now() - 86400000 * 2.5), duration: 4 },
          { stage: 'Analysis', timestamp: new Date(Date.now() - 86400000 * 2), duration: null, current: true }
        ],
        currentStage: 'Analysis',
        stuckDuration: 48,
        expectedCompletion: new Date(Date.now() + 86400000)
      },
      {
        id: 'S-2025-002',
        clientName: 'Mountain Top Cultivators',
        sampleType: 'Concentrate',
        workflowHistory: [
          { stage: 'Receiving', timestamp: new Date(Date.now() - 86400000), duration: 1 },
          { stage: 'Prep', timestamp: new Date(Date.now() - 72000000), duration: null, current: true }
        ],
        currentStage: 'Prep',
        stuckDuration: 20,
        expectedCompletion: new Date(Date.now() + 172800000)
      },
      {
        id: 'S-2025-003',
        clientName: 'Pure Leaf Labs',
        sampleType: 'Edible',
        workflowHistory: [
          { stage: 'Receiving', timestamp: new Date(Date.now() - 86400000 * 2), duration: 1 },
          { stage: 'Prep', timestamp: new Date(Date.now() - 86400000 * 1.8), duration: 3 },
          { stage: 'Analysis', timestamp: new Date(Date.now() - 86400000 * 1.5), duration: 8 },
          { stage: 'Review', timestamp: new Date(Date.now() - 86400000), duration: null, current: true }
        ],
        currentStage: 'Review',
        stuckDuration: 24,
        expectedCompletion: new Date(Date.now() + 14400000)
      }
    ];

    setSamples(mockData);
    
    const stats = {
      receiving: mockData.filter(s => s.currentStage === 'Receiving').length,
      prep: mockData.filter(s => s.currentStage === 'Prep').length,
      analysis: mockData.filter(s => s.currentStage === 'Analysis').length,
      review: mockData.filter(s => s.currentStage === 'Review').length,
      completed: mockData.filter(s => s.currentStage === 'Completed').length
    };
    setWorkflowStats(stats);
  };

  const getStageProgress = (sample) => {
    const stageOrder = ['Receiving', 'Prep', 'Analysis', 'Review', 'Completed'];
    const currentIndex = stageOrder.indexOf(sample.currentStage);
    return ((currentIndex + 1) / stageOrder.length) * 100;
  };

  const formatDuration = (hours) => {
    if (hours < 24) {
      return `${hours}h`;
    }
    return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sample Progress Tracking</h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            {workflowStages.map((stage) => (
              <div key={stage.key} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${stage.color} rounded-md p-3`}>
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stage.name}</dt>
                        <dd className="text-lg font-medium text-gray-900">{workflowStats[stage.key]} samples</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Active Samples</h3>
              <p className="mt-1 text-sm text-gray-500">Track samples through each workflow stage</p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {samples.map((sample) => (
                  <li key={sample.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-indigo-600">{sample.id}</p>
                            <p className="text-sm text-gray-500">{sample.clientName} - {sample.sampleType}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">Current Stage: <span className="font-medium">{sample.currentStage}</span></p>
                            <p className="text-sm text-gray-500">In stage for: {formatDuration(sample.stuckDuration)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center space-x-2">
                            {workflowStages.map((stage, index) => (
                              <React.Fragment key={stage.key}>
                                <div className="flex items-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    sample.workflowHistory.some(h => h.stage === stage.name) 
                                      ? stage.color + ' text-white' 
                                      : 'bg-gray-200 text-gray-400'
                                  }`}>
                                    {sample.workflowHistory.some(h => h.stage === stage.name && !h.current) ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : sample.workflowHistory.some(h => h.stage === stage.name && h.current) ? (
                                      <Clock className="h-5 w-5" />
                                    ) : (
                                      <span className="text-xs">{index + 1}</span>
                                    )}
                                  </div>
                                  <span className="ml-2 text-xs text-gray-500">{stage.name}</span>
                                </div>
                                {index < workflowStages.length - 1 && (
                                  <ArrowRight className="h-4 w-4 text-gray-400" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          
                          <div className="mt-2">
                            <div className="bg-gray-200 rounded-full h-2 w-full">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getStageProgress(sample)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm">
                          <button
                            onClick={() => setSelectedSample(sample)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                          <p className="text-gray-500">
                            Expected completion: {sample.expectedCompletion.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedSample && (
            <div className="mt-6 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Workflow History - {selectedSample.id}
                </h3>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {selectedSample.workflowHistory.map((history, idx) => (
                      <li key={idx}>
                        <div className="relative pb-8">
                          {idx !== selectedSample.workflowHistory.length - 1 && (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                history.current ? 'bg-yellow-500' : 'bg-green-500'
                              }`}>
                                {history.current ? (
                                  <Clock className="h-5 w-5 text-white" />
                                ) : (
                                  <CheckCircle className="h-5 w-5 text-white" />
                                )}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-900">
                                  {history.stage} {history.current && '(Current)'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Started: {history.timestamp.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                {history.duration && `Duration: ${formatDuration(history.duration)}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setSelectedSample(null)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleProgressTracking;