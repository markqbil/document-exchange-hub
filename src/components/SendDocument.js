import React, { useState } from 'react';
import {
  Send, Mail, Package, Plus, Trash2, CheckCircle2
} from 'lucide-react';
import { mockCompanies } from '../App';

function SendDocument({ setShowSendModal, selectedCompany, setSelectedCompany }) {
  const [sendMethod, setSendMethod] = useState('hub'); // 'hub' or 'email'
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [recipient, setRecipient] = useState('');
  const [emailRecipients, setEmailRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([
    { product: '', quantity: '', unit: 'kg', price: '' }
  ]);

  const hubEnabledCompanies = mockCompanies.filter(c => c.hubEnabled);

  const addItem = () => {
    setItems([...items, { product: '', quantity: '', unit: 'kg', price: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSendViaHub = () => {
    if (!recipient || !documentType || !documentNumber) {
      alert('Please fill in all required fields');
      return;
    }
    const company = hubEnabledCompanies.find(c => c.id === parseInt(recipient));
    setSelectedCompany(company);
    setShowSendModal(true);
  };

  const handleSendViaEmail = () => {
    if (!emailRecipients || !subject || !documentType) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Email functionality would be implemented here. Document would be sent to: ' + emailRecipients);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Document</h1>
        <p className="text-gray-600">Send documents to your trading partners via Hub or email</p>
      </div>

      {/* Send Method Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSendMethod('hub')}
            className={`p-4 border-2 rounded-lg transition-all ${
              sendMethod === 'hub'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className={`w-6 h-6 ${sendMethod === 'hub' ? 'text-primary-600' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Via Hub</div>
                <div className="text-sm text-gray-600">Send securely through the Document Hub</div>
              </div>
              {sendMethod === 'hub' && <CheckCircle2 className="w-5 h-5 text-primary-600 ml-auto" />}
            </div>
          </button>
          <button
            onClick={() => setSendMethod('email')}
            className={`p-4 border-2 rounded-lg transition-all ${
              sendMethod === 'email'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className={`w-6 h-6 ${sendMethod === 'email' ? 'text-primary-600' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Via Email</div>
                <div className="text-sm text-gray-600">Send via traditional email</div>
              </div>
              {sendMethod === 'email' && <CheckCircle2 className="w-5 h-5 text-primary-600 ml-auto" />}
            </div>
          </button>
        </div>
      </div>

      {/* Document Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type <span className="text-red-500">*</span>
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select type...</option>
              <option value="purchase-order">Purchase Order</option>
              <option value="sales-contract">Sales Contract</option>
              <option value="invoice">Invoice</option>
              <option value="delivery-note">Delivery Note</option>
              <option value="quotation">Quotation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="e.g., PO-2024-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Recipient Details - Hub Method */}
      {sendMethod === 'hub' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipient (Hub)</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trading Partner <span className="text-red-500">*</span>
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select trading partner...</option>
              {hubEnabledCompanies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name} ({company.registrationNumber})
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-600">
              Only companies connected via Hub are shown
            </p>
          </div>
        </div>
      )}

      {/* Recipient Details - Email Method */}
      {sendMethod === 'email' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipient (Email)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Addresses <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
                placeholder="email@example.com, another@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-600">Separate multiple emails with commas</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Document subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional message to include with the document"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Document Items */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Document Items</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <input
                    type="text"
                    value={item.product}
                    onChange={(e) => updateItem(index, 'product', e.target.value)}
                    placeholder="Product name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={item.unit}
                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="units">units</option>
                    <option value="boxes">boxes</option>
                    <option value="pallets">pallets</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(index)}
                      className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        {sendMethod === 'hub' ? (
          <button
            onClick={handleSendViaHub}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send via Hub
          </button>
        ) : (
          <button
            onClick={handleSendViaEmail}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send via Email
          </button>
        )}
      </div>
    </div>
  );
}

export default SendDocument;
