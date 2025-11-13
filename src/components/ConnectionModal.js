import React, { useState } from 'react';
import { X, Building2, Shield, CheckCircle2, Search } from 'lucide-react';
import { mockCompanies } from '../App';

function ConnectionModal({ setShowConnectionModal }) {
  const [step, setStep] = useState(1); // 1: Select company, 2: Review, 3: Success
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [message, setMessage] = useState('');

  const availableCompanies = mockCompanies.filter(c => c.status === 'verified' && c.hubEnabled);

  const filteredCompanies = availableCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setStep(2);
  };

  const handleSubmitRequest = () => {
    // Here would be the API call to submit the connection request
    console.log('Submitting connection request to:', selectedCompany.name);
    console.log('Message:', message);
    setStep(3);
  };

  const handleClose = () => {
    setShowConnectionModal(false);
    setStep(1);
    setSelectedCompany(null);
    setMessage('');
    setSearchTerm('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 && 'New Connection Request'}
            {step === 2 && 'Review Connection'}
            {step === 3 && 'Request Sent!'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Step 1: Select Company */}
          {step === 1 && (
            <div>
              <p className="text-gray-600 mb-4">
                Search for a verified company to connect with via the Document Hub
              </p>

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by company name or registration number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Companies List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCompanies.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Building2 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No companies found</p>
                  </div>
                ) : (
                  filteredCompanies.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => handleSelectCompany(company)}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all text-left"
                    >
                      <div className="flex items-start gap-3">
                        <Building2 className="w-6 h-6 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.registrationNumber}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                              Verified
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Hub Enabled
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 2: Review and Send */}
          {step === 2 && selectedCompany && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-1">{selectedCompany.name}</h3>
                    <p className="text-sm text-blue-800">{selectedCompany.registrationNumber}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Verified
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Hub Enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your connection request will be sent to {selectedCompany.name}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>They will review and approve your request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Once approved, you can exchange documents securely via the Hub</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>AI-powered mapping will automatically learn your product codes</span>
                  </li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message to your connection request..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Introduce yourself or explain why you want to connect
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && selectedCompany && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your connection request has been sent to <strong>{selectedCompany.name}</strong>
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-gray-900 mb-2">What's Next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• You'll receive a notification when they respond</li>
                  <li>• The request status will appear in Trading Partners</li>
                  <li>• Once approved, you can start exchanging documents</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          {step === 1 && (
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
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
                onClick={handleSubmitRequest}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Send Request
              </button>
            </>
          )}
          {step === 3 && (
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

export default ConnectionModal;
