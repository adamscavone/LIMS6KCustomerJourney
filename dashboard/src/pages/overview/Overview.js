import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Package, FlaskConical, Calendar, AlertTriangle, CheckCircle, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedSection, setExpandedSection] = useState('samples');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - all samples across all pipelines
  const allSamples = [
    // Cannabinoids samples - June 4-11, 2025
    { id: '176243', orderId: 'ORD-2025-001', client: 'Green Leaf Growers', pipeline: 'Cannabinoids', status: 'ready_for_prep', receivedDate: '2025-06-11', goalDate: '2025-06-12', reportingDue: '2025-06-13T14:00:00' },
    { id: '176244', orderId: 'ORD-2025-001', client: 'Green Leaf Growers', pipeline: 'Cannabinoids', status: 'ready_for_prep', receivedDate: '2025-06-11', goalDate: '2025-06-12', reportingDue: '2025-06-13T14:00:00' },
    { id: '176245', orderId: 'ORD-2025-002', client: 'Mountain High Dispensary', pipeline: 'Cannabinoids', status: 'in_prep', receivedDate: '2025-06-10', goalDate: '2025-06-11', reportingDue: '2025-06-12T16:00:00' },
    { id: '176246', orderId: 'ORD-2025-002', client: 'Mountain High Dispensary', pipeline: 'Cannabinoids', status: 'in_prep', receivedDate: '2025-06-10', goalDate: '2025-06-11', reportingDue: '2025-06-12T16:00:00' },
    { id: '176247', orderId: 'ORD-2025-003', client: 'Wellness Center', pipeline: 'Cannabinoids', status: 'analysis', receivedDate: '2025-06-09', goalDate: '2025-06-10', reportingDue: '2025-06-11T10:00:00' },
    { id: '176248', orderId: 'ORD-2025-004', client: 'Natural Remedies', pipeline: 'Cannabinoids', status: 'primary_review', receivedDate: '2025-06-08', goalDate: '2025-06-09', reportingDue: '2025-06-10T09:00:00' },
    { id: '176249', orderId: 'ORD-2025-005', client: 'Herbal Solutions', pipeline: 'Cannabinoids', status: 'secondary_review', receivedDate: '2025-06-07', goalDate: '2025-06-08', reportingDue: '2025-06-09T11:00:00' },
    
    // Terpenes samples
    { id: '176250', orderId: 'ORD-2025-006', client: 'Botanical Gardens', pipeline: 'Terpenes', status: 'ready_for_prep', receivedDate: '2025-06-11', goalDate: '2025-06-12', reportingDue: '2025-06-13T10:00:00' },
    { id: '176251', orderId: 'ORD-2025-007', client: 'Pure Extracts', pipeline: 'Terpenes', status: 'in_prep', receivedDate: '2025-06-10', goalDate: '2025-06-11', reportingDue: '2025-06-12T15:00:00' },
    { id: '176252', orderId: 'ORD-2025-008', client: 'Terpene Labs', pipeline: 'Terpenes', status: 'analysis', receivedDate: '2025-06-09', goalDate: '2025-06-10', reportingDue: '2025-06-11T13:00:00' },
    
    // Pesticides samples
    { id: '176253', orderId: 'ORD-2025-009', client: 'Clean Green Co', pipeline: 'Pesticides', status: 'ready_for_prep', receivedDate: '2025-06-11', goalDate: '2025-06-12', reportingDue: '2025-06-13T09:00:00' },
    { id: '176254', orderId: 'ORD-2025-010', client: 'Organic Farms', pipeline: 'Pesticides', status: 'in_prep', receivedDate: '2025-06-10', goalDate: '2025-06-11', reportingDue: '2025-06-12T16:00:00' },
    { id: '176255', orderId: 'ORD-2025-011', client: 'Safe Harvest', pipeline: 'Pesticides', status: 'primary_review', receivedDate: '2025-06-08', goalDate: '2025-06-09', reportingDue: '2025-06-10T14:00:00' },
    
    // More samples with various statuses
    { id: '176256', orderId: 'ORD-2025-012', client: 'Premium Cannabis Co', pipeline: 'Cannabinoids', status: 'ready_for_prep', receivedDate: '2025-06-11', goalDate: '2025-06-12', reportingDue: '2025-06-13T08:00:00' },
    { id: '176257', orderId: 'ORD-2025-013', client: 'Craft Growers', pipeline: 'Cannabinoids', status: 'ready_for_prep', receivedDate: '2025-06-10', goalDate: '2025-06-11', reportingDue: '2025-06-12T09:00:00' },
    { id: '176258', orderId: 'ORD-2025-014', client: 'Quality First', pipeline: 'Pesticides', status: 'ready_for_prep', receivedDate: '2025-06-09', goalDate: '2025-06-10', reportingDue: '2025-06-11T10:00:00' },
  ];

  // Sort samples by received date (earliest first)
  const sortedSamples = [...allSamples].sort((a, b) => 
    new Date(a.receivedDate) - new Date(b.receivedDate)
  );

  // Calculate metrics
  const totalSamples = allSamples.length;
  const samplesByPipeline = {
    Cannabinoids: allSamples.filter(s => s.pipeline === 'Cannabinoids').length,
    Terpenes: allSamples.filter(s => s.pipeline === 'Terpenes').length,
    Pesticides: allSamples.filter(s => s.pipeline === 'Pesticides').length
  };

  const samplesByStatus = {
    'ready_for_prep': allSamples.filter(s => s.status === 'ready_for_prep').length,
    'in_prep': allSamples.filter(s => s.status === 'in_prep').length,
    'analysis': allSamples.filter(s => s.status === 'analysis').length,
    'primary_review': allSamples.filter(s => s.status === 'primary_review').length,
    'secondary_review': allSamples.filter(s => s.status === 'secondary_review').length
  };

  const overdueSamples = allSamples.filter(s => {
    const dueDate = new Date(s.reportingDue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }).length;

  const dueTodaySamples = allSamples.filter(s => {
    const dueDate = new Date(s.reportingDue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }).length;


  const getStatusColor = (status) => {
    const colors = {
      'ready_for_prep': 'text-orange-700 bg-orange-50 border-orange-300',
      'in_prep': 'text-blue-700 bg-blue-50 border-blue-300',
      'analysis': 'text-purple-700 bg-purple-50 border-purple-300',
      'primary_review': 'text-indigo-700 bg-indigo-50 border-indigo-300',
      'secondary_review': 'text-cyan-700 bg-cyan-50 border-cyan-300'
    };
    return colors[status] || 'text-gray-700 bg-gray-50 border-gray-300';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'ready_for_prep': 'Ready for Prep',
      'in_prep': 'In Preparation',
      'analysis': 'On Instrument',
      'primary_review': 'Primary Review',
      'secondary_review': 'Secondary Review'
    };
    return labels[status] || status;
  };

  const formatReceivedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Overview</h1>
          <p className="text-gray-600 mt-2">All samples currently in-house • {currentTime.toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Total Samples */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Samples</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalSamples}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Overdue/Due Today */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Critical</p>
                <div className="mt-1">
                  {overdueSamples > 0 && (
                    <p className="text-sm font-semibold text-red-700">
                      {overdueSamples} Overdue
                    </p>
                  )}
                  <p className="text-sm font-semibold text-orange-700">
                    {dueTodaySamples} Due Today
                  </p>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </div>


          {/* Pipeline Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">By Pipeline</p>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs">
                    <span className="font-semibold">{samplesByPipeline.Cannabinoids}</span> Cannabinoids
                  </p>
                  <p className="text-xs">
                    <span className="font-semibold">{samplesByPipeline.Terpenes}</span> Terpenes
                  </p>
                  <p className="text-xs">
                    <span className="font-semibold">{samplesByPipeline.Pesticides}</span> Pesticides
                  </p>
                </div>
              </div>
              <FlaskConical className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Workflow Status Distribution</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-700">{samplesByStatus.ready_for_prep}</div>
                <div className="text-sm text-gray-600 mt-1">Ready for Prep</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">{samplesByStatus.in_prep}</div>
                <div className="text-sm text-gray-600 mt-1">In Preparation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">{samplesByStatus.analysis}</div>
                <div className="text-sm text-gray-600 mt-1">On Instrument</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-700">{samplesByStatus.primary_review}</div>
                <div className="text-sm text-gray-600 mt-1">Primary Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-700">{samplesByStatus.secondary_review}</div>
                <div className="text-sm text-gray-600 mt-1">Secondary Review</div>
              </div>
            </div>
          </div>
        </div>

        {/* All Samples Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <button
              onClick={() => setExpandedSection(expandedSection === 'samples' ? null : 'samples')}
              className="flex items-center justify-between w-full"
            >
              <h2 className="text-lg font-medium text-gray-900">All Samples (Earliest to Latest)</h2>
              {expandedSection === 'samples' ? 
                <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </button>
          </div>
          
          {expandedSection === 'samples' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sample ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pipeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Until Due
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedSamples.map((sample) => {
                    const daysUntilDue = getDaysUntilDue(sample.reportingDue);
                    return (
                      <tr key={sample.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sample.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sample.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sample.client}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sample.pipeline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sample.status)}`}>
                            {getStatusLabel(sample.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatReceivedDate(sample.receivedDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDueDate(sample.reportingDue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${
                            daysUntilDue < 0 ? 'text-red-700' :
                            daysUntilDue === 0 ? 'text-orange-700' :
                            daysUntilDue === 1 ? 'text-blue-700' :
                            'text-gray-600'
                          }`}>
                            {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                             daysUntilDue === 0 ? 'Due today' :
                             daysUntilDue === 1 ? 'Due tomorrow' :
                             `${daysUntilDue} days`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/prep-batch/cannabinoids')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Sample Prep</h3>
                <p className="text-sm text-gray-600 mt-1">Manage preparation batches</p>
              </div>
              <FlaskConical className="w-8 h-8 text-blue-600" />
            </div>
          </button>

          <button
            onClick={() => navigate('/receiving')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Receiving</h3>
                <p className="text-sm text-gray-600 mt-1">Process incoming manifests</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </button>

          <button
            onClick={() => navigate('/review-queue/cannabinoids')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Review Queue</h3>
                <p className="text-sm text-gray-600 mt-1">Analytical batch review</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;