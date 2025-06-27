import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ClipboardCheck, 
  FileText,
  Users,
  TrendingUp,
  Clock,
  FlaskConical
} from 'lucide-react';

const ReportingDashboard = () => {
  const reportingModules = [
    {
      title: 'Sample Reporting',
      description: 'Modern interface for reviewing and reporting sample results with improved UI/UX',
      icon: FlaskConical,
      link: '/reporting/samples',
      color: 'bg-blue-600',
      featured: true
    },
    {
      title: 'Comprehensive Reporting Queue',
      description: 'Unified dashboard with real-time workflow tracking and state-specific features',
      icon: Clock,
      link: '/reporting/queue',
      color: 'bg-indigo-600'
    },
    {
      title: 'Queue Assessment',
      description: 'View prioritized queue with TAT at-risk samples',
      icon: Clock,
      link: '/reporting/queue-assessment',
      color: 'bg-red-500'
    },
    {
      title: 'Sample Progress Tracking',
      description: 'Monitor samples through workflow stages',
      icon: TrendingUp,
      link: '/reporting/sample-progress',
      color: 'bg-blue-500'
    },
    {
      title: 'Results Review',
      description: 'Review and approve test results',
      icon: ClipboardCheck,
      link: '/reporting/results-review',
      color: 'bg-green-500'
    },
    {
      title: 'Compliance Reporting',
      description: 'Generate regulatory reports and COAs',
      icon: FileText,
      link: '/reporting/compliance',
      color: 'bg-purple-500'
    },
    {
      title: 'Customer Communication',
      description: 'Client notifications and snapshots',
      icon: Users,
      link: '/reporting/customer-communication',
      color: 'bg-yellow-500'
    },
    {
      title: 'Performance Analytics',
      description: 'TAT metrics and lab performance',
      icon: BarChart3,
      link: '/reporting/performance',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Reporting Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reportingModules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.link}
                  to={module.link}
                  className={`group relative rounded-lg p-6 bg-white hover:shadow-lg transition-shadow duration-200 ${
                    module.featured ? 'ring-2 ring-indigo-500 lg:col-span-3' : ''
                  }`}
                >
                  <div>
                    <span className={`${module.color} inline-flex p-3 rounded-lg text-white`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {module.description}
                    </p>
                  </div>
                  <span
                    className="absolute top-6 right-6 text-gray-400 group-hover:text-gray-600"
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingDashboard;