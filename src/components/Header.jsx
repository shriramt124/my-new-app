import React, { useState, useRef, useEffect } from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const tabs = [
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: 'fas fa-chart-bar',
      items: [
        { icon: 'fas fa-plus-circle', label: 'New Dashboard', desc: 'Create a new dashboard from scratch' },
        { icon: 'fas fa-palette', label: 'Templates', desc: 'Use pre-built dashboard templates' },
        { icon: 'fas fa-eye', label: 'Preview Mode', desc: 'Preview your dashboard' },
        { icon: 'fas fa-download', label: 'Export Data', desc: 'Export dashboard data' }
      ]
    },
    {
      id: 'directory',
      label: 'Active Directory',
      icon: 'fas fa-users',
      items: [
        { 
          icon: 'fas fa-desktop', 
          label: 'Computers', 
          desc: 'Manage domain computers',
          submenu: [
            { icon: 'fas fa-key', label: 'Account Password Reset', desc: 'Reset computer accounts' },
            { icon: 'fas fa-shield-alt', label: 'Domain Controllers', desc: 'Manage domain controllers' },
            { icon: 'fas fa-server', label: 'Servers', desc: 'Manage domain servers' },
            { icon: 'fas fa-laptop', label: 'Workstations', desc: 'Manage user workstations' }
          ]
        },
        { icon: 'fas fa-user-friends', label: 'Identities', desc: 'Manage user identities' },
        { icon: 'fas fa-cloud-upload-alt', label: 'Azure Isolation', desc: 'Azure AD integration' },
        { icon: 'fas fa-history', label: 'Restore from Backup', desc: 'Restore AD objects' }
      ]
    },
    {
      id: 'aws',
      label: 'AWS',
      icon: 'fab fa-aws',
      items: [
        { icon: 'fas fa-server', label: 'EC2 Instances', desc: 'Manage virtual servers' },
        { icon: 'fas fa-cube', label: 'S3 Storage', desc: 'Object storage service' },
        { icon: 'fas fa-database', label: 'RDS Database', desc: 'Relational database service' },
        { icon: 'fas fa-chart-line', label: 'CloudWatch', desc: 'Monitoring and logging' }
      ]
    },
    {
      id: 'azure',
      label: 'Azure',
      icon: 'fab fa-microsoft',
      items: [
        { icon: 'fas fa-server', label: 'Virtual Machines', desc: 'Create and manage VMs' },
        { icon: 'fas fa-network-wired', label: 'Virtual Networks', desc: 'Configure network topology' },
        { icon: 'fas fa-shield-virus', label: 'Security Center', desc: 'Unified security management' },
        { icon: 'fas fa-history', label: 'Backup & Restore', desc: 'Data backup solutions' }
      ]
    },
    {
      id: 'forensics',
      label: 'Digital Forensics',
      icon: 'fas fa-search',
      items: [
        { icon: 'fas fa-search-plus', label: 'Evidence Search', desc: 'Search through digital evidence' },
        { icon: 'fas fa-folder-plus', label: 'New Case', desc: 'Create new investigation case' },
        { icon: 'fas fa-file-alt', label: 'Generate Report', desc: 'Create investigation report' },
        { icon: 'fas fa-camera', label: 'Evidence Capture', desc: 'Capture digital evidence' }
      ]
    }
  ];

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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  const currentTab = tabs.find(tab => tab.id === activeDropdown);

  return (
    <div className="relative bg-white shadow-lg border-b border-gray-200/60 z-50">
      {/* Top Bar with Logo and Search */}
      <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 border-b border-gray-200/50">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-shield-alt text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Logo</h1>
          </div>
        </div>

        {/* Search Bar - Centered */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Tell me what you want to do..." 
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-12 pr-6 py-3 text-sm border rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none transition-all duration-300 placeholder-gray-500 ${
                isSearchFocused 
                  ? 'ring-2 ring-blue-500/30 border-blue-400 bg-white shadow-xl' 
                  : 'border-gray-300/60 hover:border-gray-400/60 hover:bg-white shadow-sm'
              }`}
            />
            <i className={`fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-colors ${
              isSearchFocused ? 'text-blue-500' : 'text-gray-400'
            }`}></i>
          </div>
        </div>

        {/* Right me Controls */}
        <div className="flex items-center space-x-2">
          {['fas fa-cog', 'fas fa-bell', 'fas fa-user-circle', 'fas fa-question-circle'].map((icon, index) => (
            <button 
              key={index}
              className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
            >
              <i className={`${icon} text-lg group-hover:scale-110 transition-transform`}></i>
            </button>
          ))}
        </div>
      </div>

      {/* Tab ka Navigation */}
      <div className="relative">
        <div className="flex items-center justify-center px-8 py-2 bg-gradient-to-r from-white via-gray-50/50 to-white">
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(tab.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`group relative px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-2 rounded-lg ${
                    activeTab === tab.id
                      ? 'text-blue-700 bg-blue-50/90 shadow-md border border-blue-200/50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50/80'
                  }`}
                >
                  <i className={`${tab.icon} text-sm transition-transform group-hover:scale-110`}></i>
                  <span className="font-medium">{tab.label}</span>
                  <i className={`fas fa-chevron-down text-xs transition-all duration-200 ${
                    activeDropdown === tab.id ? 'rotate-180 opacity-100' : 'opacity-60'
                  }`}></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dropdown Menu */}
        {activeDropdown && currentTab && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl border border-gray-200/60 z-50 animate-in slide-in-from-top-2 duration-200"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-4xl mx-auto px-8 py-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  {currentTab.items.map((item, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => !item.submenu && setActiveDropdown(null)}
                        onMouseEnter={() => item.submenu && handleSubmenuHover(item.label)}
                        className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200">
                          <i className={`${item.icon} text-sm text-gray-600 group-hover:text-blue-700`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-900">
                            {item.label}
                          </h4>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                        {item.submenu && (
                          <i className="fas fa-chevron-right text-xs text-gray-400 group-hover:text-blue-600"></i>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Submenu Panel */}
                {activeSubmenu && (
                  <div className="space-y-2 border-l border-gray-200 pl-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{activeSubmenu}</h3>
                    {currentTab.items.find(item => item.label === activeSubmenu)?.submenu?.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200">
                          <i className={`${subItem.icon} text-sm text-gray-600 group-hover:text-blue-700`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-900">
                            {subItem.label}
                          </h4>
                          <p className="text-xs text-gray-600">{subItem.desc}</p>
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
  );
};

export default Header;