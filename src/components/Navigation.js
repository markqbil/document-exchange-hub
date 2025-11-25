import React, { useState } from 'react';
import {
  Package, Bell, Inbox, Table2, ChevronDown, ChevronRight,
  User, Settings, Menu
} from 'lucide-react';

const Navigation = ({
  currentView, setCurrentView,
  isAdmin, setIsAdmin,
  notifications,
  children
}) => {
  const [isQbilHubExpanded, setIsQbilHubExpanded] = useState(true);

  const handleQbilHubClick = () => {
    setIsQbilHubExpanded(!isQbilHubExpanded);
    if (!isQbilHubExpanded) {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-sidebar text-white flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-light">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-qbil-blue" />
            <div>
              <div className="text-lg font-semibold">Document Hub</div>
              <div className="text-xs text-gray-400">Document Exchange</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-1 px-2">
            {/* Qbil Hub - Main Menu Item */}
            <button
              onClick={handleQbilHubClick}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                currentView === 'dashboard' || currentView === 'inbox' || currentView === 'mappings'
                  ? 'bg-qbil-blue text-white'
                  : 'text-gray-300 hover:bg-sidebar-light'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5" />
                <span className="font-medium">Qbil Hub</span>
              </div>
              <div className="flex items-center space-x-2">
                {notifications > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {notifications}
                  </span>
                )}
                {isQbilHubExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>

            {/* Submenu Items - Only show when expanded */}
            {isQbilHubExpanded && (
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    currentView === 'dashboard'
                      ? 'bg-sidebar-light text-white'
                      : 'text-gray-300 hover:bg-sidebar-light'
                  }`}
                >
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  onClick={() => setCurrentView('inbox')}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
                    currentView === 'inbox'
                      ? 'bg-sidebar-light text-white'
                      : 'text-gray-300 hover:bg-sidebar-light'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Inbox className="h-4 w-4" />
                    <span className="font-medium">Hub Inbox</span>
                  </div>
                  {notifications > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      {notifications}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentView('mappings')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    currentView === 'mappings'
                      ? 'bg-sidebar-light text-white'
                      : 'text-gray-300 hover:bg-sidebar-light'
                  }`}
                >
                  <Table2 className="h-4 w-4" />
                  <span className="font-medium">Mapping Tables</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="border-t border-sidebar-light p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-qbil-blue rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium">{isAdmin ? 'Admin User' : 'Standard User'}</div>
                <div className="text-xs text-gray-400">{isAdmin ? 'Administrator' : 'User'}</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="mt-3 w-full px-3 py-2 bg-sidebar-light text-white rounded-lg text-sm hover:bg-sidebar-dark transition-colors"
          >
            Switch to {isAdmin ? 'User' : 'Admin'} Mode
          </button>
        </div>
      </div>

      {/* Top Bar */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {currentView === 'dashboard' && 'Qbil Hub - Dashboard'}
                {currentView === 'inbox' && 'Qbil Hub - Inbox'}
                {currentView === 'mappings' && 'Qbil Hub - Mapping Tables'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
