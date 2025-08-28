import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed, tabs }) => {
  const location = useLocation();
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname.split('/');
    return path[1] || 'directory';
  };

  const activeTab = getActiveTab();
  
  // Recovery sidebar items
  const [recoveryItems, setRecoveryItems] = useState([
    { icon: 'fas fa-tachometer-alt', label: 'Active Directory', active: true },
    { icon: 'fas fa-chart-line', label: 'Analytics', active: false },
    { icon: 'fas fa-file-alt', label: 'Reports', active: false },
    { icon: 'fas fa-cog', label: 'Settings', active: false }
  ]);

  return (
    <div 
      className={`fixed left-0 top-0 bottom-0 bg-cyber-black border-r border-cyber-light/20 shadow-cyber transition-all duration-300 z-30 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-cyber-light/20">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-cyber-accent rounded-md flex items-center justify-center shadow-cyber-sm">
            <i className="fas fa-shield-alt text-white"></i>
          </div>
          {!isCollapsed && (
            <span className="ml-3 font-bold text-white text-lg">CyberDefense</span>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-cyber-accent transition-colors"
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <NavLink
                to={`/${tab.id}`}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 ${isActive 
                    ? 'bg-cyber-light/10 text-cyber-accent border-l-2 border-cyber-accent' 
                    : 'text-gray-400 hover:bg-cyber-light/5 hover:text-gray-200'}`
                }
              >
                <i className={`${tab.icon} ${isCollapsed ? 'text-xl' : 'text-lg mr-3'}`}></i>
                {!isCollapsed && <span>{tab.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Recovery Items */}
        {activeTab === 'directory' && (
          <div className="mt-6">
            <div className={`${isCollapsed ? 'text-center' : 'px-4'} mb-2`}>
              {!isCollapsed && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recovery</p>}
            </div>
            <ul className="space-y-1">
              {recoveryItems.map((item, index) => (
                <li key={index}>
                  <div 
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-2 cursor-pointer ${item.active 
                      ? 'bg-cyber-accent/20 text-cyber-accent border-l-2 border-cyber-accent' 
                      : 'text-gray-400 hover:bg-cyber-light/5 hover:text-gray-200'}`}
                    onClick={() => {
                      const updatedItems = recoveryItems.map((i, idx) => ({
                        ...i,
                        active: idx === index
                      }));
                      setRecoveryItems(updatedItems);
                    }}
                  >
                    <i className={`${item.icon} ${isCollapsed ? 'text-xl' : 'text-lg mr-3'}`}></i>
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyber-light/20">
        <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed && <span className="text-xs text-gray-500">v1.0.0</span>}
          <button className="text-gray-400 hover:text-cyber-accent transition-colors">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;