import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

const QueueAssessment = () => {
  const [samples, setSamples] = useState([]);
  const [filters, setFilters] = useState({
    urgency: 'all',
    stage: 'all',
    client: ''
  });

  useEffect(() => {
    loadQueueData();
  }, [filters]);

  const loadQueueData = () => {
    const mockData = [
      {
        id: 'S-2025-001',
        clientName: 'Green Valley Farms',
        sampleType: 'Flower',
        currentStage: 'Analysis',
        dueDate: new Date(Date.now() - 86400000), // Yesterday
        tatStatus: 'overdue',
        hoursRemaining: -24,
        priority: 'critical'
      },
      {
        id: 'S-2025-002',
        clientName: 'Mountain Top Cultivators',
        sampleType: 'Concentrate',
        currentStage: 'Prep',
        dueDate: new Date(Date.now() + 14400000), // 4 hours from now
        tatStatus: 'at-risk',
        hoursRemaining: 4,
        priority: 'high'
      },
      {
        id: 'S-2025-003',
        clientName: 'Pure Leaf Labs',
        sampleType: 'Edible',
        currentStage: 'Review',
        dueDate: new Date(Date.now() + 86400000), // Tomorrow
        tatStatus: 'on-track',
        hoursRemaining: 24,
        priority: 'normal'
      },
      {
        id: 'S-2025-004',
        clientName: 'Sunshine Gardens',
        sampleType: 'Flower',
        currentStage: 'Analysis',
        dueDate: new Date(Date.now() + 7200000), // 2 hours from now
        tatStatus: 'at-risk',
        hoursRemaining: 2,
        priority: 'high'
      },
      {
        id: 'S-2025-005',
        clientName: 'Crystal Creek Cannabis',
        sampleType: 'Tincture',
        currentStage: 'Receiving',
        dueDate: new Date(Date.now() + 172800000), // 2 days from now
        tatStatus: 'on-track',
        hoursRemaining: 48,
        priority: 'normal'
      }
    ];
    setSamples(mockData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-track':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'critical') {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    } else if (priority === 'high') {
      return <Clock className="h-5 w-5 text-yellow-600" />;
    }
    return null;
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffHours < 0) {
      return `${Math.abs(diffHours)} hours overdue`;
    } else if (diffHours < 24) {
      return `${diffHours} hours remaining`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} days remaining`;
    }
  };

  const filteredSamples = samples.filter(sample => {
    if (filters.urgency !== 'all' && sample.tatStatus !== filters.urgency) return false;
    if (filters.stage !== 'all' && sample.currentStage !== filters.stage) return false;
    if (filters.client && !sample.clientName.toLowerCase().includes(filters.client.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Queue Assessment</h1>
            <div className="flex space-x-4">
              <div className="text-sm">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {samples.filter(s => s.tatStatus === 'overdue').length} Overdue
                </span>
              </div>
              <div className="text-sm">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {samples.filter(s => s.tatStatus === 'at-risk').length} At Risk
                </span>
              </div>
              <div className="text-sm">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {samples.filter(s => s.tatStatus === 'on-track').length} On Track
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Urgency Filter</label>
                  <select
                    value={filters.urgency}
                    onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Samples</option>
                    <option value="overdue">Overdue Only</option>
                    <option value="at-risk">At Risk Only</option>
                    <option value="on-track">On Track Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stage Filter</label>
                  <select
                    value={filters.stage}
                    onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Stages</option>
                    <option value="Receiving">Receiving</option>
                    <option value="Prep">Prep</option>
                    <option value="Analysis">Analysis</option>
                    <option value="Review">Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Search</label>
                  <input
                    type="text"
                    value={filters.client}
                    onChange={(e) => setFilters({ ...filters, client: e.target.value })}
                    placeholder="Search by client name..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredSamples.map((sample) => (
                <li key={sample.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getPriorityIcon(sample.priority)}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{sample.id}</p>
                          <p className="text-sm text-gray-500">{sample.clientName}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(sample.tatStatus)}`}>
                          {formatDueDate(sample.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Sample Type: {sample.sampleType}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          Current Stage: <span className="ml-1 font-medium">{sample.currentStage}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Due: {sample.dueDate.toLocaleDateString()} {sample.dueDate.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueAssessment;