import React, { useState } from 'react';
import './App.css';

// Import components
import Dashboard from './components/Dashboard';
import HubInbox from './components/HubInbox';
import MappingTables from './components/MappingTables';
import Navigation from './components/Navigation';
import ProcessDocumentModal from './components/ProcessDocumentModal';

// Mock Data
export const mockCompanies = [
  { id: 1, name: 'Global Ingredients Co.', registrationNumber: 'GIC-2024-001', status: 'verified', hubEnabled: true },
  { id: 2, name: 'Premium Foods Ltd.', registrationNumber: 'PFL-2024-002', status: 'verified', hubEnabled: true },
  { id: 3, name: 'Natural Spices Inc.', registrationNumber: 'NSI-2024-003', status: 'verified', hubEnabled: true },
  { id: 4, name: 'Fresh Produce Partners', registrationNumber: 'FPP-2024-004', status: 'verified', hubEnabled: true },
];

export const mockConnections = [
  { id: 1, company: 'Global Ingredients Co.', status: 'active', connectedDate: '2024-01-15', documents: 45 },
  { id: 2, company: 'Premium Foods Ltd.', status: 'pending', requestDate: '2024-03-01', documents: 0 },
];

export const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Sales Manager' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Procurement' },
  { id: 3, name: 'Mike Wilson', email: 'mike@company.com', role: 'Operations' },
];

export const mockDocuments = [
  { 
    id: 1, 
    type: 'Sales Contract',
    number: 'SC-2024-001',
    sender: 'Global Ingredients Co.',
    recipient: 'Your Company',
    date: '2024-03-15 10:30',
    status: 'unread',
    priority: 'high',
    items: [
      { product: 'Vanilla Extract', quantity: 100, unit: 'kg', price: 250 },
      { product: 'Cinnamon Powder', quantity: 50, unit: 'kg', price: 180 }
    ]
  },
  { 
    id: 2, 
    type: 'Purchase Order',
    number: 'PO-2024-002',
    sender: 'Premium Foods Ltd.',
    recipient: 'Your Company',
    date: '2024-03-14 15:45',
    status: 'processed',
    priority: 'normal'
  },
];

export const mockMappings = [
  { 
    id: 1,
    theirCode: 'VAN-EXT-001',
    theirDescription: 'Vanilla Extract Premium',
    ourCode: 'VE-100',
    ourDescription: 'Vanilla Extract 100%',
    confidence: 95,
    usage: 12
  },
  { 
    id: 2,
    theirCode: 'CIN-PWD-050',
    theirDescription: 'Cinnamon Powder Fine',
    ourCode: 'CP-FINE',
    ourDescription: 'Cinnamon Powder (Fine Grade)',
    confidence: 88,
    usage: 8
  },
];

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [mappingData, setMappingData] = useState(mockMappings);

  const appState = {
    currentView, setCurrentView,
    selectedDocument, setSelectedDocument,
    isAdmin, setIsAdmin,
    notifications, setNotifications,
    showProcessModal, setShowProcessModal,
    searchTerm, setSearchTerm,
    filterStatus, setFilterStatus,
    mappingData, setMappingData
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navigation {...appState}>
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {currentView === 'dashboard' && <Dashboard {...appState} />}
            {currentView === 'inbox' && <HubInbox {...appState} />}
            {currentView === 'mappings' && <MappingTables {...appState} />}
          </div>
        </div>
      </Navigation>

      {showProcessModal && <ProcessDocumentModal {...appState} />}
    </div>
  );
}

export default App;
