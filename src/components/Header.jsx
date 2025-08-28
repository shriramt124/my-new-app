
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = ({ currentUser, onLogout, isCollapsed, setIsCollapsed }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tabs = [
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: 'fas fa-chart-bar',
      path: '/dashboards',
      items: [
        { icon: 'fas fa-plus-circle', label: 'New Dashboard', desc: 'Create a new dashboard from scratch', path: '/dashboards/new' },
        { icon: 'fas fa-palette', label: 'Templates', desc: 'Use pre-built dashboard templates', path: '/dashboards/templates' },
        { icon: 'fas fa-eye', label: 'Preview Mode', desc: 'Preview your dashboard', path: '/dashboards/preview' },
        { icon: 'fas fa-download', label: 'Export Data', desc: 'Export dashboard data', path: '/dashboards/export' },
        { icon: 'fas fa-download', label: 'Testing', desc: 'Testing', path: '/testing' }
      ]
    },
    {
      id: 'directory',
      label: 'Active Directory',
      icon: 'fas fa-users',
      path: '/directory',
      items: [
        {
          icon: 'fas fa-desktop',
          label: 'Computers',
          desc: 'Manage domain computers',
          path: '/directory/computers',
          submenu: [
            { icon: 'fas fa-key', label: 'Account Password Reset', desc: 'Reset computer accounts', path: '/directory/computers/password-reset' },
            { icon: 'fas fa-shield-alt', label: 'Domain Controllers', desc: 'Manage domain controllers', path: '/directory/computers/domain-controllers' },
            { icon: 'fas fa-server', label: 'Servers', desc: 'Manage domain servers', path: '/directory/computers/servers' },
            { icon: 'fas fa-laptop', label: 'Workstations', desc: 'Manage user workstations', path: '/directory/computers/workstations' }
          ]
        },
        { icon: 'fas fa-user-friends', label: 'Identities', desc: 'Manage user identities', path: '/directory/identities' },
        { icon: 'fas fa-cloud-upload-alt', label: 'Azure Isolation', desc: 'Azure AD integration', path: '/directory/azure-isolation' },
        { icon: 'fas fa-broom', label: 'Cleanup', desc: 'Perform AD cleanup operations', path: '/directory/cleanup' },
        { icon: 'fas fa-history', label: 'Restore from Backup', desc: 'Restore AD objects', path: '/directory/restore-backup' }
      ]
    },
    {
      id: 'aws',
      label: 'AWS',
      icon: 'fab fa-aws',
      path: '/aws',
      items: [
        { icon: 'fas fa-server', label: 'EC2 Instances', desc: 'Manage virtual servers', path: '/aws/ec2' },
        { icon: 'fas fa-cube', label: 'S3 Storage', desc: 'Object storage service', path: '/aws/s3' },
        { icon: 'fas fa-database', label: 'RDS Database', desc: 'Relational database service', path: '/aws/rds' },
        { icon: 'fas fa-chart-line', label: 'CloudWatch', desc: 'Monitoring and logging', path: '/aws/cloudwatch' }
      ]
    },
    {
      id: 'azure',
      label: 'Azure',
      icon: 'fab fa-microsoft',
      path: '/azure',
      items: [
        { icon: 'fas fa-server', label: 'Virtual Machines', desc: 'Create and manage VMs', path: '/azure/vms' },
        { icon: 'fas fa-network-wired', label: 'Virtual Networks', desc: 'Configure network topology', path: '/azure/vnets' },
        { icon: 'fas fa-shield-virus', label: 'Security Center', desc: 'Unified security management', path: '/azure/security-center' },
        { icon: 'fas fa-history', label: 'Backup & Restore', desc: 'Data backup solutions', path: '/azure/backup' }
      ]
    },
    {
      id: 'forensics',
      label: 'Digital Forensics',
      icon: 'fas fa-search',
      path: '/forensics',
      items: [
        { icon: 'fas fa-search-plus', label: 'Evidence Search', desc: 'Search through digital evidence', path: '/forensics/search' },
        { icon: 'fas fa-folder-plus', label: 'New Case', desc: 'Create new investigation case', path: '/forensics/new-case' },
        { icon: 'fas fa-file-alt', label: 'Generate Report', desc: 'Create investigation report', path: '/forensics/report' },
        { icon: 'fas fa-camera', label: 'Evidence Capture', desc: 'Capture digital evidence', path: '/forensics/capture' }
      ]
    }
  ];

  // Get current active tab based on location
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/dashboards') return 'dashboards';
    const matchedTab = tabs.find(tab => currentPath.startsWith(tab.path));
    if (matchedTab) return matchedTab.id;
    return null;
  };

  const activeTab = getCurrentTab();

  // Handle mouse enter with delay
  const handleMouseEnter = (tabId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(tabId);
      setActiveSubmenu(null);
    }, 150);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 200);
  };

  // Handle dropdown mouse enter (cancel close timeout)
  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  // Handle submenu hover
  const handleSubmenuHover = (itemLabel) => {
    setActiveSubmenu(itemLabel);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tab) => {
    navigate(tab.path);
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  const currentTab = tabs.find(tab => tab.id === activeDropdown);

  return (
    <>
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} tabs={tabs} />
      
      {/* Main Header */}
      <div 
        className={`fixed top-0 right-0 bg-cyber-darker border-b border-cyber-light/20 shadow-cyber-sm transition-all duration-300 z-20 ${isCollapsed ? 'left-16' : 'left-64'}`}
      >
        {/* Top Row: Search, Profile, Settings, Help */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-cyber-light/20">
          {/* Search Bar */}
          <div className="flex-1 mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full bg-cyber-dark/70 text-gray-300 border rounded-lg py-1.5 px-4 pl-10 focus:outline-none focus:ring-1 transition-all ${isSearchFocused ? 'border-cyber-accent ring-cyber-accent/30' : 'border-cyber-light/20'}`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Settings */}
            <button className="text-gray-400 hover:text-cyber-accent transition-colors">
              <i className="fas fa-cog"></i>
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button className="text-gray-400 hover:text-cyber-accent transition-colors">
                <i className="fas fa-bell"></i>
                <span className="absolute -top-1 -right-1 bg-cyber-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
            </div>
            
            {/* Help */}
            <button className="text-gray-400 hover:text-cyber-accent transition-colors">
              <i className="fas fa-question-circle"></i>
            </button>
            
            {/* User Menu */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
              >
                <div className="h-8 w-8 rounded-full bg-cyber-accent flex items-center justify-center text-white font-semibold">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-cyber-dark border border-cyber-light/30 rounded-md shadow-cyber-sm py-1 z-50">
                  <div className="px-4 py-2 border-b border-cyber-light/20">
                    <p className="text-sm font-medium text-white">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-gray-400">{currentUser?.username || 'user@example.com'}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyber-light/10 hover:text-cyber-accent">
                    <i className="fas fa-user-circle mr-2"></i> Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyber-light/10 hover:text-cyber-accent">
                    <i className="fas fa-cog mr-2"></i> Account Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyber-light/10 hover:text-cyber-accent">
                    <i className="fas fa-bell mr-2"></i> Notifications
                  </a>
                  <div className="border-t border-cyber-light/20 mt-1"></div>
                  <button 
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-cyber-danger hover:bg-cyber-light/10 hover:text-cyber-danger"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Tab Navigation */}
      <div className="relative">
        <div className="flex items-center justify-center px-8 py-2 bg-gradient-to-r from-cyber-dark via-cyber-darker/90 to-cyber-dark border-b border-cyber-light/20">
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(tab.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`group relative px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-2 rounded-lg ${
                    activeTab === tab.id
                      ? 'text-cyber-accent bg-cyber-light/10 shadow-md border border-cyber-light/20'
                      : 'text-gray-300 hover:text-cyber-accent hover:bg-cyber-light/5'
                  }`}
                >
                  <i className={`${tab.icon} text-sm transition-transform group-hover:scale-110`}></i>
                  <span className="font-medium">{tab.label}</span>
                  {tab.items && tab.items.length > 0 && (
                    <i className={`fas fa-chevron-down text-xs transition-all duration-200 ${
                      activeDropdown === tab.id ? 'rotate-180 opacity-100' : 'opacity-60'
                    }`}></i>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dropdown Menu */}
        {activeDropdown && currentTab && (
          <div
            className="absolute top-full left-0 right-0 bg-cyber-darker/98 backdrop-blur-xl shadow-cyber-lg border border-cyber-light/20 z-50 animate-in slide-in-from-top-2 duration-200"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-4xl mx-auto px-8 py-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  {currentTab.items.map((item, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => {
                          if (item.path) {
                            navigate(item.path);
                            setActiveDropdown(null);
                          } else if (!item.submenu) {
                            setActiveDropdown(null);
                          }
                        }}
                        onMouseEnter={() => item.submenu && handleSubmenuHover(item.label)}
                        className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-cyber-light/10 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyber-dark to-cyber-darker rounded-lg flex items-center justify-center group-hover:from-cyber-accent/20 group-hover:to-cyber-accent/10 transition-all duration-200">
                          <i className={`${item.icon} text-sm text-gray-400 group-hover:text-cyber-accent`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-200 group-hover:text-cyber-accent">
                            {item.label}
                          </h4>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                        {item.submenu && (
                          <i className="fas fa-chevron-right text-xs text-gray-400 group-hover:text-cyber-accent"></i>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Submenu Panel */}
                {activeSubmenu && (
                  <div className="space-y-2 border-l border-cyber-light/20 pl-6">
                    <h3 className="text-sm font-bold text-gray-200 mb-3">{activeSubmenu}</h3>
                    {currentTab.items.find(item => item.label === activeSubmenu)?.submenu?.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (subItem.path) {
                            navigate(subItem.path);
                            setActiveDropdown(null);
                          } else {
                            setActiveDropdown(null);
                          }
                        }}
                        className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-cyber-light/10 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyber-dark to-cyber-darker rounded-lg flex items-center justify-center group-hover:from-cyber-accent/20 group-hover:to-cyber-accent/10 transition-all duration-200">
                          <i className={`${subItem.icon} text-sm text-gray-400 group-hover:text-cyber-accent`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-200 group-hover:text-cyber-accent">
                            {subItem.label}
                          </h4>
                          <p className="text-xs text-gray-400">{subItem.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Header;
