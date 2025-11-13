import React from 'react';
import { Package, Bell, Inbox, User } from 'lucide-react';

const Navigation = ({ 
  currentView, setCurrentView, 
  isAdmin, setIsAdmin, 
  notifications 
}) => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">Document Exchange Hub</span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-2 rounded ${currentView === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('inbox')}
              className={`px-3 py-2 rounded flex items-center space-x-2 ${currentView === 'inbox' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              <Inbox className="h-4 w-4" />
              <span>Hub Inbox</span>
              {notifications > 0 && (
                <span className="bg-red-500 text-xs px-2 py-1 rounded-full">{notifications}</span>
              )}
            </button>
            <button 
              onClick={() => setCurrentView('send')}
              className={`px-3 py-2 rounded ${currentView === 'send' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Send Document
            </button>
            {isAdmin && (
              <>
                <button 
                  onClick={() => setCurrentView('partners')}
                  className={`px-3 py-2 rounded ${currentView === 'partners' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                >
                  Trading Partners
                </button>
                <button 
                  onClick={() => setCurrentView('mappings')}
                  className={`px-3 py-2 rounded ${currentView === 'mappings' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                >
                  Mapping Tables
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600"
          >
            Switch to {isAdmin ? 'User' : 'Admin'}
          </button>
          <Bell className="h-5 w-5 cursor-pointer hover:text-blue-400" />
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="text-sm">{isAdmin ? 'Admin' : 'User'}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
