
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
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
          isLeftSidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isLeftSidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white text-sm"></i>
                </div>
                <span className="text-lg font-semibold text-gray-900">Logo</span>
              </div>
            )}
            <button
              onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className={`fas ${isLeftSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-600 text-sm`}></i>
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <i className={`${item.icon} text-sm`}></i>
                {!isLeftSidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tell me what you want to do..."
                  className="w-96 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
              
              {/* Dropdown Navigation */}
              <div className="flex items-center space-x-4">
                {[
                  { label: 'Dashboards', icon: 'fas fa-chart-bar' },
                  { label: 'Active Directory', icon: 'fas fa-network-wired' },
                  { label: 'AWS', icon: 'fab fa-aws' },
                  { label: 'Azure', icon: 'fab fa-microsoft' },
                  { label: 'Digital Forensics', icon: 'fas fa-search' }
                ].map((dropdown, index) => (
                  <div key={index} className="relative">
                    <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <i className={`${dropdown.icon} text-sm`}></i>
                      <span>{dropdown.label}</span>
                      <i className="fas fa-chevron-down text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <i className="fas fa-cog text-sm"></i>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <i className="fas fa-bell text-sm"></i>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <i className="fas fa-question-circle text-sm"></i>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>

          {/* Content with Right Sidebar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              {renderMainContent()}
            </div>

            {/* Right Sidebar */}
            <div className={`bg-white border-l border-gray-200 flex-shrink-0 transition-all duration-300 ${
              isRightSidebarCollapsed ? 'w-0 border-l-0' : 'w-80'
            }`}>
              {!isRightSidebarCollapsed && (
                <div className="w-80 p-6 space-y-6">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-info-circle text-blue-600 text-sm"></i>
                      <h3 className="text-sm font-semibold text-gray-900">Information</h3>
                    </div>
                    <button
                      onClick={() => setIsRightSidebarCollapsed(true)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <i className="fas fa-times text-gray-500 text-sm"></i>
                    </button>
                  </div>

                  {/* Dependencies Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fas fa-link text-gray-600 text-sm"></i>
                      <h4 className="text-sm font-semibold text-gray-900">Dependencies</h4>
                    </div>
                    <div className="space-y-3">
                      {dependencies.map((dep, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{dep.name}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            dep.status === 'online' ? 'bg-green-500' : 
                            dep.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fas fa-clock text-gray-600 text-sm"></i>
                      <h4 className="text-sm font-semibold text-gray-900">Recent Activities</h4>
                    </div>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'success' ? 'bg-green-500' :
                            activity.status === 'warning' ? 'bg-yellow-500' :
                            activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                            <p className="text-xs text-gray-600">{activity.detail}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Status</span>
                      <span className="text-sm text-green-600 font-medium">Ready</span>
                    </div>
                    <p className="text-xs text-gray-600">Last refresh: 2:15 PM</p>
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
