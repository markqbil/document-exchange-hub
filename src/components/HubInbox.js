import React, { useState, useEffect } from 'react';
import {
  Search, Download, Eye, Clock, AlertCircle,
  CheckCircle2, FileText, Package, User, Users
} from 'lucide-react';
import { ordersApi } from '../services/qbilApi';

function HubInbox({
  selectedDocument, setSelectedDocument,
  showProcessModal, setShowProcessModal,
  searchTerm, setSearchTerm,
  filterStatus, setFilterStatus
}) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipientFilter, setRecipientFilter] = useState('personal'); // 'personal' or 'company'

  // Fetch orders from API on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await ordersApi.getOrders();

        // Transform API orders into document format for display
        const transformedDocs = response.data.map(order => ({
          id: order.id,
          type: order.type,
          number: order.orderNumber,
          sender: order.supplier.name,
          recipient: order.customer.name,
          recipientType: order.recipientType || 'personal', // 'personal' or 'company'
          date: new Date(order.createdAt).toLocaleDateString(),
          status: order.status === 'confirmed' ? 'processed' : 'unread',
          priority: order.priority || 'normal',
          items: order.items,
          totalAmount: order.totalAmount
        }));

        setDocuments(transformedDocs);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredDocuments = documents.filter(doc => {
    // Hide processed documents - they've already been handled
    if (doc.status === 'processed') return false;

    const matchesSearch = doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    const matchesRecipient = recipientFilter === 'company' || doc.recipientType === recipientFilter;
    return matchesSearch && matchesFilter && matchesRecipient;
  });

  // Group documents by type
  const groupedDocuments = filteredDocuments.reduce((groups, doc) => {
    const type = doc.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(doc);
    return groups;
  }, {});

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'processed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      normal: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return priority ? (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority] || 'bg-gray-100 text-gray-800'}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    ) : null;
  };

  const handleProcessDocument = (doc) => {
    setSelectedDocument(doc);
    setShowProcessModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">Receive and process documents from your trading partners</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error loading documents: {error}</span>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="processed">Processed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Recipient Filter Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show documents for:</span>
            <div className="inline-flex rounded-lg border border-gray-300">
              <button
                onClick={() => setRecipientFilter('personal')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  recipientFilter === 'personal'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } rounded-l-lg`}
              >
                <User className="w-4 h-4" />
                Me
              </button>
              <button
                onClick={() => setRecipientFilter('company')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  recipientFilter === 'company'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } rounded-r-lg border-l border-gray-300`}
              >
                <Users className="w-4 h-4" />
                My Company
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Grouped by Type */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading documents...</h3>
            <p className="text-gray-600">Please wait while we fetch your orders</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No unread documents</h3>
            <p className="text-gray-600">All documents have been processed</p>
          </div>
        ) : (
          Object.entries(groupedDocuments).map(([type, docs]) => (
            <div key={type} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Group Header */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    {type}
                  </h3>
                  <span className="text-sm text-gray-500">{docs.length} document{docs.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Documents List */}
              <div className="divide-y divide-gray-200">
                {docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleProcessDocument(doc)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status */}
                        <div className="flex-shrink-0">
                          {getStatusIcon(doc.status)}
                        </div>

                        {/* Document Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-semibold text-gray-900">#{doc.number}</span>
                            {getPriorityBadge(doc.priority)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>From: <span className="font-medium text-gray-900">{doc.sender}</span></span>
                            <span>{doc.date}</span>
                            <span>{doc.items ? doc.items.length : 0} items</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleProcessDocument(doc)}
                            className="p-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                            title="Process"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <FileText className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-yellow-600">
                {documents.filter(d => d.status === 'unread').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processed</p>
              <p className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === 'processed').length}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HubInbox;
