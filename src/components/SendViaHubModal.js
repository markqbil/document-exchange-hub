import React, { useState } from 'react';
import { X, Send, Building2, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockUsers } from '../App';

function SendViaHubModal({ setShowSendModal, selectedCompany }) {
  const [step, setStep] = useState(1); // 1: Select recipients, 2: Confirm, 3: Success
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [priority, setPriority] = useState('normal');
  const [notes, setNotes] = useState('');

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSend = () => {
    // Here would be the API call to send the document
    console.log('Sending document to:', selectedCompany?.name);
    console.log('Notify users:', selectedUsers);
    console.log('Priority:', priority);
    console.log('Notes:', notes);
    setStep(3);
  };

  const handleClose = () => {
    setShowSendModal(false);
    setStep(1);
    setSelectedUsers([]);
    setNotifyUsers(true);
    setPriority('normal');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 && 'Send via Hub'}
            {step === 2 && 'Confirm Sending'}
            {step === 3 && 'Document Sent!'}
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
          {/* Step 1: Select Recipients and Options */}
          {step === 1 && (
            <div>
              {/* Recipient Company */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Sending to:</h3>
                    <p className="text-blue-800">{selectedCompany?.name || 'No company selected'}</p>
                  </div>
                </div>
              </div>

              {/* Priority */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPriority('low')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      priority === 'low'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Low</div>
                      <div className="text-xs text-gray-600">Standard delivery</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setPriority('normal')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      priority === 'normal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Normal</div>
                      <div className="text-xs text-gray-600">Regular processing</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setPriority('high')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      priority === 'high'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">High</div>
                      <div className="text-xs text-gray-600">Urgent attention</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Internal Notifications */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Notify Internal Team
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyUsers}
                      onChange={(e) => setNotifyUsers(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {notifyUsers && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-2">Select team members to notify:</p>
                    {mockUsers.map((user) => (
                      <label
                        key={user.id}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUser(user.id)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <User className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.role} • {user.email}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internal Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any internal notes about this document..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  These notes are for internal use only and will not be sent to the recipient
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Confirm */}
          {step === 2 && (
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Document Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient:</span>
                    <span className="font-medium text-gray-900">{selectedCompany?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span className={`font-medium ${
                      priority === 'high' ? 'text-red-600' :
                      priority === 'normal' ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                  </div>
                  {notifyUsers && selectedUsers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Internal Notifications:</span>
                      <span className="font-medium text-gray-900">{selectedUsers.length} team member(s)</span>
                    </div>
                  )}
                </div>
              </div>

              {notifyUsers && selectedUsers.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Will be notified:</h3>
                  <div className="space-y-1">
                    {selectedUsers.map((userId) => {
                      const user = mockUsers.find(u => u.id === userId);
                      return user ? (
                        <div key={userId} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-gray-900">{user.name}</span>
                          <span className="text-gray-500">({user.email})</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {notes && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Internal Notes:</h3>
                  <p className="text-sm text-gray-700">{notes}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Ready to send?</h4>
                    <p className="text-sm text-blue-800">
                      The document will be securely transmitted via the Hub. The recipient will be able to
                      view and process it immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your document has been securely sent to <strong>{selectedCompany?.name}</strong>
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Document appears in their Hub Inbox immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>AI mapping will process product codes automatically</span>
                  </li>
                  {notifyUsers && selectedUsers.length > 0 && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{selectedUsers.length} team member(s) have been notified</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You can track delivery status in your Dashboard</span>
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
                onClick={handleSend}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Document
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

export default SendViaHubModal;
