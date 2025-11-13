import React, { useState } from 'react';
import {
  Search, Plus, Edit, Trash2, CheckCircle2, AlertCircle, Brain,
  TrendingUp, Download, Save, X
} from 'lucide-react';

function MappingTables({ mappingData, setMappingData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConfidence, setFilterConfidence] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredMappings = mappingData.filter(mapping => {
    const matchesSearch =
      mapping.theirCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.theirDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.ourCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.ourDescription.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filterConfidence === 'high') matchesFilter = mapping.confidence >= 90;
    else if (filterConfidence === 'medium') matchesFilter = mapping.confidence >= 70 && mapping.confidence < 90;
    else if (filterConfidence === 'low') matchesFilter = mapping.confidence < 70;

    return matchesSearch && matchesFilter;
  });

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 90) return <CheckCircle2 className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const handleEdit = (mapping) => {
    setEditingId(mapping.id);
    setEditForm({ ...mapping });
  };

  const handleSave = () => {
    setMappingData(mappingData.map(m => m.id === editingId ? editForm : m));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this mapping?')) {
      setMappingData(mappingData.filter(m => m.id !== id));
    }
  };

  const handleAddNew = () => {
    const newMapping = {
      id: Math.max(...mappingData.map(m => m.id), 0) + 1,
      theirCode: '',
      theirDescription: '',
      ourCode: '',
      ourDescription: '',
      confidence: 0,
      usage: 0
    };
    setMappingData([...mappingData, newMapping]);
    setEditingId(newMapping.id);
    setEditForm(newMapping);
  };

  const calculateStats = () => {
    const total = mappingData.length;
    const highConfidence = mappingData.filter(m => m.confidence >= 90).length;
    const mediumConfidence = mappingData.filter(m => m.confidence >= 70 && m.confidence < 90).length;
    const lowConfidence = mappingData.filter(m => m.confidence < 70).length;
    const avgConfidence = mappingData.reduce((sum, m) => sum + m.confidence, 0) / total;
    const totalUsage = mappingData.reduce((sum, m) => sum + m.usage, 0);

    return { total, highConfidence, mediumConfidence, lowConfidence, avgConfidence, totalUsage };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Mapping Tables</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Mapping
          </button>
        </div>
        <p className="text-gray-600">Manage product code mappings and AI learning progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Mappings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Brain className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Confidence</p>
              <p className="text-2xl font-bold text-green-600">{stats.highConfidence}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Medium Confidence</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.mediumConfidence}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-primary-600">{stats.avgConfidence.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsage}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search mappings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterConfidence}
              onChange={(e) => setFilterConfidence(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Confidence</option>
              <option value="high">High (90%+)</option>
              <option value="medium">Medium (70-89%)</option>
              <option value="low">Low (&lt;70%)</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Mappings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Their Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Their Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Our Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Our Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMappings.map((mapping) => (
                <tr key={mapping.id} className="hover:bg-gray-50">
                  {editingId === mapping.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.theirCode}
                          onChange={(e) => setEditForm({ ...editForm, theirCode: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.theirDescription}
                          onChange={(e) => setEditForm({ ...editForm, theirDescription: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.ourCode}
                          onChange={(e) => setEditForm({ ...editForm, ourCode: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.ourDescription}
                          onChange={(e) => setEditForm({ ...editForm, ourDescription: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.confidence}
                          onChange={(e) => setEditForm({ ...editForm, confidence: parseInt(e.target.value) })}
                          min="0"
                          max="100"
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.usage}
                          onChange={(e) => setEditForm({ ...editForm, usage: parseInt(e.target.value) })}
                          min="0"
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={handleSave}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{mapping.theirCode}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{mapping.theirDescription}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{mapping.ourCode}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{mapping.ourDescription}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(mapping.confidence)}`}>
                          {getConfidenceIcon(mapping.confidence)}
                          {mapping.confidence}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{mapping.usage}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(mapping)}
                            className="p-1 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(mapping.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMappings.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mappings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add First Mapping
            </button>
          </div>
        )}
      </div>

      {/* AI Learning Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Brain className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">AI-Powered Mapping</h3>
            <p className="text-sm text-blue-800">
              The system learns from each document you process. High-confidence mappings are automatically applied
              to future documents, while low-confidence mappings require manual review. The more you use the system,
              the more accurate it becomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MappingTables;
