import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import Dashboard from './components/Dashboard';
import HubInbox from './components/HubInbox';
import MappingTables from './components/MappingTables';
import Navigation from './components/Navigation';
import ProcessDocumentModal from './components/ProcessDocumentModal';
import { ordersApi } from './services/qbilApi';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [notifications, setNotifications] = useState(0);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch unread document count for notifications
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await ordersApi.getOrders();
        // Count only unread/pending documents (not processed)
        const unreadCount = response.data.filter(order =>
          order.status !== 'confirmed'
        ).length;
        setNotifications(unreadCount);
      } catch (err) {
        console.error('Failed to fetch unread count:', err);
      }
    };

    fetchUnreadCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const appState = {
    currentView, setCurrentView,
    selectedDocument, setSelectedDocument,
    isAdmin, setIsAdmin,
    notifications, setNotifications,
    showProcessModal, setShowProcessModal,
    searchTerm, setSearchTerm,
    filterStatus, setFilterStatus
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
