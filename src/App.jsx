
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import ForestRecovery from './components/ForestRecovery';
import DirectoryContent from './components/DirectoryContent';
import AWSContent from './components/AWSContent';
import AzureContent from './components/AzureContent';
import ForensicsContent from './components/ForensicsContent';
import LoginScreen from './components/LoginScreen';
import Cleanup from './components/Cleanup';
import TestingPowerShell from './components/Testing_Powershell';

// Dashboard Components
const NewDashboard = () => <div className="p-8"><h1 className="text-2xl font-bold">New Dashboard</h1></div>;
const DashboardTemplates = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard Templates</h1></div>;
const DashboardPreview = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard Preview</h1></div>;
const DashboardExport = () => <div className="p-8"><h1 className="text-2xl font-bold">Export Dashboard Data</h1></div>;

// Directory Components
const DirectoryComputers = () => <div className="p-8"><h1 className="text-2xl font-bold">Directory Computers</h1></div>;
const ComputerPasswordReset = () => <div className="p-8"><h1 className="text-2xl font-bold">Computer Password Reset</h1></div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboards');
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'dashboards', label: 'Dashboards', icon: 'fas fa-chart-bar', active: activeTab === 'dashboards' },
    { id: 'directory', label: 'Active Directory', icon: 'fas fa-network-wired', active: activeTab === 'directory' },
    { id: 'aws', label: 'AWS', icon: 'fab fa-aws', active: activeTab === 'aws' },
    { id: 'azure', label: 'Azure', icon: 'fab fa-microsoft', active: activeTab === 'azure' },
    { id: 'forensics', label: 'Digital Forensics', icon: 'fas fa-search', active: activeTab === 'forensics' },
    { id: 'recovery', label: 'Forest Recovery', icon: 'fas fa-tree', active: activeTab === 'recovery' },
    { id: 'cleanup', label: 'Cleanup', icon: 'fas fa-broom', active: activeTab === 'cleanup' },
    { id: 'testing', label: 'Testing', icon: 'fas fa-vials', active: activeTab === 'testing' }
  ];

  const dependencies = [
    { name: 'DNS Services', status: 'online' },
    { name: 'LDAP Connection', status: 'online' },
    { name: 'Kerberos Auth', status: 'online' },
    { name: 'Replication', status: 'warning' }
  ];

  const recentActivities = [
    { type: 'Domain Controller Updated', detail: 'DC01.company.local', time: '4 min ago', status: 'success' },
    { type: 'User Group Created', detail: 'Sales team', time: '12 min ago', status: 'info' },
    { type: 'Policy Warning', detail: 'Password policy', time: '1 hour ago', status: 'warning' },
    { type: 'Backup Completed', detail: 'System state', time: '3 hours ago', status: 'success' }
  ];

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboards':
        return <MainContent activeTab={activeTab} />;
      case 'directory':
        return <DirectoryContent />;
      case 'aws':
        return <AWSContent />;
      case 'azure':
        return <AzureContent />;
      case 'forensics':
        return <ForensicsContent />;
      case 'recovery':
        return <ForestRecovery />;
      case 'cleanup':
        return <Cleanup />;
      case 'testing':
        return <TestingPowerShell />;
      default:
        return <MainContent activeTab={activeTab} />;
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-3 flex items-center justify-between">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <i className="fas fa-chevron-left text-indigo-600 text-sm"></i>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white text-sm"></i>
                </div>
                <span className="text-lg font-bold text-gray-900">Logo</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
            </div>

            {/* Top Navigation Icons */}
            <div className="flex items-center space-x-3">
              <button className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <i className="fas fa-cog text-sm"></i>
              </button>
              <button className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors relative">
                <i className="fas fa-bell text-sm"></i>
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
              <button className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <i className="fas fa-question-circle text-sm"></i>
              </button>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>

          {/* Navigation Dropdowns */}
          <div className="px-6 py-3 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              {[
                { id: 'dashboards', label: 'Dashboards', icon: 'fas fa-chart-bar' },
                { id: 'directory', label: 'Active Directory', icon: 'fas fa-network-wired' },
                { id: 'aws', label: 'AWS', icon: 'fab fa-aws' },
                { id: 'azure', label: 'Azure', icon: 'fab fa-microsoft' },
                { id: 'forensics', label: 'Digital Forensics', icon: 'fas fa-search' }
              ].map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === nav.id
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${nav.icon} text-sm`}></i>
                  <span>{nav.label}</span>
                  <i className="fas fa-chevron-down text-xs opacity-60"></i>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex h-screen-minus-header">
          {/* Left Sidebar */}
          <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
            isLeftSidebarCollapsed ? 'w-16' : 'w-64'
          }`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              {!isLeftSidebarCollapsed && (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                    <i className="fas fa-shield-alt text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{activeTab === 'recovery' ? 'Recovery' : 'Navigation'}</span>
                </div>
              )}
              <button
                onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              >
                <i className={`fas ${isLeftSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-600 text-xs`}></i>
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-3 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="w-5 flex justify-center">
                    <i className={`${item.icon} text-sm`}></i>
                  </div>
                  {!isLeftSidebarCollapsed && (
                    <span>{item.label}</span>
                  )}
                </button>
              ))}

              {/* Refresh buttons when not collapsed */}
              {!isLeftSidebarCollapsed && (
                <div className="pt-4 space-y-1">
                  {Array(5).fill(0).map((_, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <i className="fas fa-sync-alt text-sm"></i>
                      <span>Refresh</span>
                    </button>
                  ))}
                </div>
              )}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {renderMainContent()}
            </div>

            {/* Right Sidebar */}
            <div className={`bg-white border-l border-gray-200 flex-shrink-0 transition-all duration-300 ${
              isRightSidebarCollapsed ? 'w-0 border-l-0' : 'w-80'
            }`}>
              {!isRightSidebarCollapsed && (
                <div className="w-80 h-full overflow-y-auto">
                  {/* Dependencies Section */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-link text-indigo-600 text-sm"></i>
                        <h3 className="text-sm font-semibold text-gray-900">Dependencies</h3>
                      </div>
                      <button
                        onClick={() => setIsRightSidebarCollapsed(true)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <i className="fas fa-times text-gray-400 text-xs"></i>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {dependencies.map((dep, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{dep.name}</span>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            dep.status === 'online' ? 'bg-teal-500' : 
                            dep.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                        <i className="fas fa-clock text-indigo-600 text-xs"></i>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">Recent Activities</h4>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activity.status === 'success' ? 'bg-teal-100' :
                            activity.status === 'warning' ? 'bg-yellow-100' :
                            activity.status === 'info' ? 'bg-indigo-100' : 'bg-red-100'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'success' ? 'bg-teal-500' :
                              activity.status === 'warning' ? 'bg-yellow-500' :
                              activity.status === 'info' ? 'bg-indigo-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                            <p className="text-xs text-gray-600">{activity.detail}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Toggle Button (when collapsed) */}
            {isRightSidebarCollapsed && (
              <button
                onClick={() => setIsRightSidebarCollapsed(false)}
                className="fixed right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition-colors z-10"
              >
                <i className="fas fa-chevron-left text-gray-600 text-sm"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
