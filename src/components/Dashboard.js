import React, { useState } from 'react';
import { Link, Inbox, Send, Brain, CheckCircle2, X, ChevronRight, Calendar, User, FileText } from 'lucide-react';

const Dashboard = ({ setCurrentView }) => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const metricsDetails = {
    connections: {
      title: 'Active Connections',
      items: [
        { name: 'Global Ingredients Co.', status: 'Active', documents: 45, lastActivity: '2 hours ago', accuracy: 92 },
        { name: 'Premium Foods Ltd.', status: 'Active', documents: 38, lastActivity: '5 hours ago', accuracy: 85 },
        { name: 'Natural Spices Inc.', status: 'Active', documents: 29, lastActivity: '1 day ago', accuracy: 78 },
        { name: 'Fresh Produce Partners', status: 'Active', documents: 22, lastActivity: '2 days ago', accuracy: 88 },
        { name: 'Organic Suppliers Ltd.', status: 'Pending', documents: 0, lastActivity: 'Pending approval', accuracy: 0 },
      ]
    },
    received: {
      title: 'Documents Received',
      items: [
        { type: 'Sales Contract', from: 'Global Ingredients Co.', date: '2024-03-15', items: 5, status: 'Processed' },
        { type: 'Purchase Order', from: 'Premium Foods Ltd.', date: '2024-03-14', items: 3, status: 'Processed' },
        { type: 'Invoice', from: 'Natural Spices Inc.', date: '2024-03-13', items: 8, status: 'Pending' },
        { type: 'Delivery Note', from: 'Fresh Produce Partners', date: '2024-03-12', items: 12, status: 'Processed' },
        { type: 'Quotation', from: 'Global Ingredients Co.', date: '2024-03-11', items: 4, status: 'Processed' },
      ]
    },
    sent: {
      title: 'Documents Sent',
      items: [
        { type: 'Purchase Order', to: 'Global Ingredients Co.', date: '2024-03-16', items: 7, status: 'Delivered' },
        { type: 'Sales Contract', to: 'Premium Foods Ltd.', date: '2024-03-15', items: 4, status: 'Delivered' },
        { type: 'Invoice', to: 'Natural Spices Inc.', date: '2024-03-14', items: 6, status: 'Pending' },
        { type: 'Quotation', to: 'Fresh Produce Partners', date: '2024-03-13', items: 3, status: 'Delivered' },
        { type: 'Delivery Note', to: 'Premium Foods Ltd.', date: '2024-03-12', items: 9, status: 'Delivered' },
      ]
    },
    accuracy: {
      title: 'Processing Accuracy',
      items: [
        { partner: 'Global Ingredients Co.', accuracy: 92, total: 45, correct: 41, needsReview: 4, trend: '+2%' },
        { partner: 'Premium Foods Ltd.', accuracy: 85, total: 38, correct: 32, needsReview: 6, trend: '+5%' },
        { partner: 'Natural Spices Inc.', accuracy: 78, total: 29, correct: 23, needsReview: 6, trend: '+1%' },
        { partner: 'Fresh Produce Partners', accuracy: 88, total: 22, correct: 19, needsReview: 3, trend: '+3%' },
      ]
    }
  };

  const closeModal = () => {
    setSelectedMetric(null);
  };

  const MetricModal = ({ metric }) => {
    if (!metric) return null;
    const details = metricsDetails[metric];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{details.title}</h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
            {metric === 'connections' && (
              <div className="space-y-3">
                {details.items.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Link className="w-5 h-5 text-primary-500" />
                        <span className="font-semibold text-gray-900">{item.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Documents:</span> {item.documents}
                      </div>
                      <div>
                        <span className="font-medium">Accuracy:</span> {item.accuracy}%
                      </div>
                      <div>
                        <span className="font-medium">Last Activity:</span> {item.lastActivity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {metric === 'received' && (
              <div className="space-y-3">
                {details.items.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Inbox className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold text-gray-900">{item.type}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">From:</span> {item.from}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {item.date}
                      </div>
                      <div>
                        <span className="font-medium">Items:</span> {item.items}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {metric === 'sent' && (
              <div className="space-y-3">
                {details.items.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Send className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-900">{item.type}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">To:</span> {item.to}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {item.date}
                      </div>
                      <div>
                        <span className="font-medium">Items:</span> {item.items}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {metric === 'accuracy' && (
              <div className="space-y-4">
                {details.items.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-gray-900">{item.partner}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">{item.accuracy}%</span>
                        <span className="text-sm text-green-600">{item.trend}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div
                        className={`h-3 rounded-full ${
                          item.accuracy >= 90 ? 'bg-green-500' :
                          item.accuracy >= 80 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{width: `${item.accuracy}%`}}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Total Documents:</span> {item.total}
                      </div>
                      <div>
                        <span className="font-medium">Correctly Mapped:</span> {item.correct}
                      </div>
                      <div>
                        <span className="font-medium">Needs Review:</span> {item.needsReview}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            {(metric === 'received' || metric === 'sent') && (
              <button
                onClick={() => {
                  closeModal();
                  setCurrentView('inbox');
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                View All Documents
              </button>
            )}
            {metric === 'accuracy' && (
              <button
                onClick={() => {
                  closeModal();
                  setCurrentView('mappings');
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                View Mapping Tables
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Exchange Dashboard</h1>
        <p className="text-gray-600">Click on any metric to view detailed information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setSelectedMetric('connections')}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Active Connections</span>
            <Link className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm text-green-600 flex items-center justify-between">
            <span>+2 this month</span>
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        <button
          onClick={() => setSelectedMetric('received')}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Documents Received</span>
            <Inbox className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-bold">156</div>
          <div className="text-sm text-gray-500 flex items-center justify-between">
            <span>This month</span>
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        <button
          onClick={() => setSelectedMetric('sent')}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Documents Sent</span>
            <Send className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-bold">203</div>
          <div className="text-sm text-gray-500 flex items-center justify-between">
            <span>This month</span>
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        <button
          onClick={() => setSelectedMetric('accuracy')}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Processing Accuracy</span>
            <Brain className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-bold">94%</div>
          <div className="text-sm text-green-600 flex items-center justify-between">
            <span>+3% improvement</span>
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Sales Contract Processed</div>
                  <div className="text-sm text-gray-500">From Global Ingredients Co.</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Send className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Purchase Order Sent</div>
                  <div className="text-sm text-gray-500">To Premium Foods Ltd.</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Link className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">New Connection Established</div>
                  <div className="text-sm text-gray-500">With Natural Spices Inc.</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Mapping Learning Progress</h2>
          <div className="space-y-4">
            <div className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors" onClick={() => setSelectedMetric('accuracy')}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Global Ingredients Co.</span>
                <span className="text-sm text-gray-500">92% accuracy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>

            <div className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors" onClick={() => setSelectedMetric('accuracy')}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Premium Foods Ltd.</span>
                <span className="text-sm text-gray-500">85% accuracy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            <div className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors" onClick={() => setSelectedMetric('accuracy')}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Natural Spices Inc.</span>
                <span className="text-sm text-gray-500">78% accuracy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMetric && <MetricModal metric={selectedMetric} />}
    </div>
  );
};

export default Dashboard;
