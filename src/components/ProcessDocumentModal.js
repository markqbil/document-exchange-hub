import React, { useState } from 'react';
import {
  X, CheckCircle2, AlertCircle, ArrowRight, Brain,
  Package, Edit, Save
} from 'lucide-react';
import { mockMappings } from '../App';

function ProcessDocumentModal({ setShowProcessModal, selectedDocument, mappingData }) {
  const [step, setStep] = useState(1); // 1: Review, 2: Map products, 3: Confirm, 4: Success
  const [mappedItems, setMappedItems] = useState(
    selectedDocument?.items?.map(item => ({
      ...item,
      mappedCode: '',
      mappedDescription: '',
      confidence: 0,
      manualOverride: false
    })) || []
  );
  const [editingIndex, setEditingIndex] = useState(null);

  // Auto-suggest mappings based on existing mapping data
  const suggestMapping = (productName) => {
    const mapping = mockMappings.find(m =>
      m.theirDescription.toLowerCase().includes(productName.toLowerCase()) ||
      productName.toLowerCase().includes(m.theirDescription.toLowerCase())
    );
    return mapping || null;
  };

  // Initialize with auto-suggestions
  React.useEffect(() => {
    if (selectedDocument?.items) {
      const autoMapped = selectedDocument.items.map(item => {
        const suggestion = suggestMapping(item.product);
        return {
          ...item,
          mappedCode: suggestion?.ourCode || '',
          mappedDescription: suggestion?.ourDescription || '',
          confidence: suggestion?.confidence || 0,
          manualOverride: false
        };
      });
      setMappedItems(autoMapped);
    }
  }, [selectedDocument]);

  const handleManualEdit = (index, field, value) => {
    const newItems = [...mappedItems];
    newItems[index][field] = value;
    newItems[index].manualOverride = true;
    newItems[index].confidence = 100; // Manual edits get 100% confidence
    setMappedItems(newItems);
  };

  const handleSaveEdit = (index) => {
    setEditingIndex(null);
  };

  const handleProcess = () => {
    // Here would be the API call to process and save the document
    console.log('Processing document:', selectedDocument);
    console.log('Mapped items:', mappedItems);
    setStep(4);
  };

  const handleClose = () => {
    setShowProcessModal(false);
    setStep(1);
    setMappedItems([]);
    setEditingIndex(null);
  };

  if (!selectedDocument) {
    return null;
  }

  const allItemsMapped = mappedItems.every(item => item.mappedCode && item.mappedDescription);
  const highConfidenceItems = mappedItems.filter(item => item.confidence >= 90).length;
  const lowConfidenceItems = mappedItems.filter(item => item.confidence < 70 && item.confidence > 0).length;
  const unmappedItems = mappedItems.filter(item => !item.mappedCode).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 && 'Review Document'}
              {step === 2 && 'Map Product Codes'}
              {step === 3 && 'Confirm Processing'}
              {step === 4 && 'Document Processed!'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedDocument.type} #{selectedDocument.number}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        {step < 4 && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-sm font-medium">Review</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-sm font-medium">Map</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Step 1: Review Document */}
          {step === 1 && (
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Document Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedDocument.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Number:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedDocument.number}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">From:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedDocument.sender}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 text-gray-700">{selectedDocument.date}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">Document Items</h3>
              <div className="space-y-3">
                {selectedDocument.items?.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="col-span-2">
                        <span className="text-gray-600">Product:</span>
                        <div className="font-medium text-gray-900">{item.product}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <div className="text-gray-900">{item.quantity} {item.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <div className="text-gray-900">${item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Map Product Codes */}
          {step === 2 && (
            <div>
              {/* Mapping Stats */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-xs text-blue-600 mb-1">Total Items</div>
                  <div className="text-xl font-bold text-blue-900">{mappedItems.length}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-xs text-green-600 mb-1">High Confidence</div>
                  <div className="text-xl font-bold text-green-900">{highConfidenceItems}</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-xs text-yellow-600 mb-1">Need Review</div>
                  <div className="text-xl font-bold text-yellow-900">{lowConfidenceItems}</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-xs text-red-600 mb-1">Unmapped</div>
                  <div className="text-xl font-bold text-red-900">{unmappedItems}</div>
                </div>
              </div>

              {/* AI Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">AI Mapping Active</h4>
                    <p className="text-sm text-blue-800">
                      The system has automatically suggested mappings based on previous documents.
                      Review and adjust as needed. Your corrections will improve future predictions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapping Items */}
              <div className="space-y-4">
                {mappedItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {item.confidence >= 90 ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : item.confidence > 0 ? (
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        {/* Their Product */}
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 mb-1">Their Product:</div>
                          <div className="font-medium text-gray-900">{item.product}</div>
                          <div className="text-sm text-gray-600">{item.quantity} {item.unit} @ ${item.price}</div>
                        </div>

                        {/* Mapped Product */}
                        {editingIndex === index ? (
                          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                            <div>
                              <label className="text-xs text-gray-600 mb-1 block">Our Product Code:</label>
                              <input
                                type="text"
                                value={item.mappedCode}
                                onChange={(e) => handleManualEdit(index, 'mappedCode', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Enter product code"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 mb-1 block">Our Product Description:</label>
                              <input
                                type="text"
                                value={item.mappedDescription}
                                onChange={(e) => handleManualEdit(index, 'mappedDescription', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Enter product description"
                              />
                            </div>
                            <button
                              onClick={() => handleSaveEdit(index)}
                              className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-xs text-primary-600">Our Product:</div>
                              <div className="flex items-center gap-2">
                                {item.manualOverride && (
                                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">Manual</span>
                                )}
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  item.confidence >= 90 ? 'bg-green-100 text-green-800' :
                                  item.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                  item.confidence > 0 ? 'bg-orange-100 text-orange-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {item.confidence}% confidence
                                </span>
                                <button
                                  onClick={() => setEditingIndex(index)}
                                  className="p-1 text-primary-600 hover:bg-primary-100 rounded transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="font-medium text-primary-900">
                              {item.mappedCode || <span className="text-red-600">Not mapped</span>}
                            </div>
                            <div className="text-sm text-primary-800">
                              {item.mappedDescription || <span className="text-red-600">Please map this item</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Processing Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Document:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {selectedDocument.type} #{selectedDocument.number}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">From:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedDocument.sender}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Items:</span>
                    <span className="ml-2 font-medium text-gray-900">{mappedItems.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Mapped Items:</span>
                    <span className="ml-2 font-medium text-green-600">{mappedItems.filter(i => i.mappedCode).length}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">Mapped Products</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mappedItems.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-600 mb-1">{item.product}</div>
                        <div className="text-xs text-gray-500">{item.quantity} {item.unit}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.mappedCode}</div>
                        <div className="text-xs text-gray-600">{item.mappedDescription}</div>
                        <div className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                          item.confidence >= 90 ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.confidence}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Ready to Process</h4>
                    <p className="text-sm text-green-800">
                      All items have been reviewed and mapped. The document will be saved to your system
                      and the AI will learn from these mappings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Processed Successfully!</h3>
              <p className="text-gray-600 mb-6">
                {selectedDocument.type} #{selectedDocument.number} has been processed and saved
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-2">Processing Complete</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{mappedItems.length} items successfully mapped</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>AI learning updated with your mappings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>Document saved to your system</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          {step === 1 && (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!allItemsMapped}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  allItemsMapped
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Review & Confirm
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleProcess}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Process Document
              </button>
            </>
          )}
          {step === 4 && (
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessDocumentModal;
