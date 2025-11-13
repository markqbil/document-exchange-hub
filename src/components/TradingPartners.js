import React, { useState } from 'react';
import {
  Building2, Plus, Search, CheckCircle2, Clock, XCircle, Shield,
  Edit, Trash2, Link, Users, FileText
} from 'lucide-react';
import { mockConnections, mockCompanies } from '../App';

function TradingPartners({ setShowConnectionModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const connections = mockConnections;
  const companies = mockCompanies;

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conn.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'inactive':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleApproveConnection = (id) => {
    alert(`Connection ${id} would be approved here`);
  };

  const handleRejectConnection = (id) => {
    alert(`Connection ${id} would be rejected here`);
  };

  const handleDeleteConnection = (id) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      alert(`Connection ${id} would be deleted here`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Trading Partners</h1>
          <button
            onClick={() => setShowConnectionModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Connection
          </button>
        </div>
        <p className="text-gray-600">Manage your trading partner connections and permissions</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search trading partners..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{connections.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {connections.filter(c => c.status === 'active').length}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {connections.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-primary-600">
                {connections.reduce((sum, c) => sum + c.documents, 0)}
              </p>
            </div>
            <FileText className="w-8 h-8 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {filteredConnections.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trading partners found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => setShowConnectionModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add First Partner
            </button>
          </div>
        ) : (
          filteredConnections.map((connection) => (
            <div key={connection.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(connection.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">{connection.company}</h3>
                        {getStatusBadge(connection.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                        {connection.connectedDate && (
                          <div>
                            <span className="text-gray-500">Connected:</span>
                            <span className="ml-2 text-gray-700">{connection.connectedDate}</span>
                          </div>
                        )}
                        {connection.requestDate && (
                          <div>
                            <span className="text-gray-500">Requested:</span>
                            <span className="ml-2 text-gray-700">{connection.requestDate}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-500">Documents:</span>
                          <span className="ml-2 font-medium text-gray-900">{connection.documents}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Hub Status:</span>
                          <span className="ml-2 text-green-600 flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            Enabled
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {connection.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApproveConnection(connection.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectConnection(connection.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteConnection(connection.id)}
                          className="p-2 border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Partner Info */}
                {connection.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Link className="w-4 h-4" />
                        <span>Hub Connection Active</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Automated Mapping Enabled</span>
                      </div>
                      <button className="ml-auto text-primary-600 hover:text-primary-700 font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Available Companies to Connect */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Companies</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-4">
            Companies registered in the Hub that you can connect with:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies
              .filter(company => !connections.find(c => c.company === company.name))
              .map((company) => (
                <div
                  key={company.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">{company.name}</h4>
                        <p className="text-sm text-gray-600">{company.registrationNumber}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            {company.status}
                          </span>
                          {company.hubEnabled && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Hub Enabled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowConnectionModal(true)}
                      className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingPartners;
