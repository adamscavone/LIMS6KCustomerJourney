import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, FileText } from 'lucide-react';

const CustomerCommunication = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState('snapshot');
  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: 1,
      clientName: 'Green Valley Farms',
      type: 'snapshot',
      subject: 'Test Results Ready - S-2025-001',
      sentDate: new Date(Date.now() - 3600000),
      status: 'delivered'
    },
    {
      id: 2,
      clientName: 'Mountain Top Cultivators',
      type: 'delay',
      subject: 'Sample Processing Delay - S-2025-002',
      sentDate: new Date(Date.now() - 7200000),
      status: 'delivered'
    },
    {
      id: 3,
      clientName: 'Pure Leaf Labs',
      type: 'results',
      subject: 'Final Results Available - S-2025-003',
      sentDate: new Date(Date.now() - 86400000),
      status: 'opened'
    }
  ]);

  const [clients] = useState([
    {
      id: 1,
      name: 'Green Valley Farms',
      email: 'lab@greenvalleyfarms.com',
      phone: '555-0123',
      preferredContact: 'email',
      pendingSamples: 3,
      completedSamples: 15,
      lastContact: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      name: 'Mountain Top Cultivators',
      email: 'quality@mountaintop.com',
      phone: '555-0124',
      preferredContact: 'phone',
      pendingSamples: 1,
      completedSamples: 8,
      lastContact: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      name: 'Pure Leaf Labs',
      email: 'testing@pureleaf.com',
      phone: '555-0125',
      preferredContact: 'email',
      pendingSamples: 2,
      completedSamples: 22,
      lastContact: new Date(Date.now() - 259200000)
    }
  ]);

  const emailTemplates = {
    snapshot: {
      name: 'Michigan Snapshot',
      description: 'Summary of test results for Michigan clients',
      subject: 'Test Results Summary - {sampleId}',
      body: `Dear {clientName},

Your test results are ready for sample {sampleId}.

Test Summary:
- Potency: {potencyResult}
- Microbials: {microbialResult}
- Overall Status: {overallStatus}

Please log into your portal for detailed results or contact us with any questions.

Best regards,
The Lab Team`
    },
    delay: {
      name: 'Delay Notification',
      description: 'Notify clients of processing delays',
      subject: 'Processing Update - {sampleId}',
      body: `Dear {clientName},

We wanted to inform you of a slight delay in processing your sample {sampleId}.

Current Status: {currentStage}
Expected Completion: {expectedDate}
Reason: {delayReason}

We apologize for any inconvenience and are working to complete your testing as quickly as possible.

Best regards,
The Lab Team`
    },
    results: {
      name: 'Results Ready',
      description: 'Final results notification',
      subject: 'Results Available - {sampleId}',
      body: `Dear {clientName},

Your test results for sample {sampleId} are now available.

Access your results:
- Portal: {portalLink}
- COA Download: {coaLink}

Thank you for choosing our laboratory services.

Best regards,
The Lab Team`
    }
  };

  const handleSendEmail = (client, template) => {
    const newNotification = {
      id: notificationHistory.length + 1,
      clientName: client.name,
      type: template,
      subject: emailTemplates[template].subject.replace('{sampleId}', 'S-2025-NEW'),
      sentDate: new Date(),
      status: 'sending'
    };
    
    setNotificationHistory([newNotification, ...notificationHistory]);
    
    setTimeout(() => {
      setNotificationHistory(prev => prev.map(n => 
        n.id === newNotification.id ? { ...n, status: 'delivered' } : n
      ));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Communication</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h3>
                  <div className="space-y-3">
                    {Object.entries(emailTemplates).map(([key, template]) => (
                      <div
                        key={key}
                        onClick={() => setEmailTemplate(key)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          emailTemplate === key 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-500">{template.description}</p>
                          </div>
                          <FileText className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Client List</h3>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{client.name}</h4>
                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {client.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {client.phone}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center space-x-4 text-sm">
                              <span className="text-indigo-600">
                                {client.pendingSamples} pending
                              </span>
                              <span className="text-green-600">
                                {client.completedSamples} completed
                              </span>
                              <span className="text-gray-500">
                                Last contact: {client.lastContact.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex space-x-2">
                            <button
                              onClick={() => setSelectedClient(client)}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleSendEmail(client, emailTemplate)}
                              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                              Send Email
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Template Preview</h3>
                  <div className="bg-gray-50 rounded p-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Subject: {emailTemplates[emailTemplate].subject}
                    </h4>
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                      {emailTemplates[emailTemplate].body}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Communications</h3>
                  <div className="space-y-3">
                    {notificationHistory.slice(0, 5).map((notification) => (
                      <div key={notification.id} className="border-b pb-3 last:border-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.clientName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.subject}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.sentDate.toLocaleString()}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            notification.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            notification.status === 'opened' ? 'bg-blue-100 text-blue-800' :
                            notification.status === 'sending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {notification.status === 'sending' && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                            {notification.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedClient && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedClient.name} - Communication History
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notificationHistory
                    .filter(n => n.clientName === selectedClient.name)
                    .map(notification => (
                      <div key={notification.id} className="p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium">{notification.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.sentDate.toLocaleString()} - {notification.status}
                        </p>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCommunication;