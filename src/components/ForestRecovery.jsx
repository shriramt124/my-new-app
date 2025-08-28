
import React, { useState } from 'react';

const ForestRecovery = ({ isCollapsed }) => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Sample data for the table
  const domainData = [
    {
      id: 1,
      checked: false,
      type: 'DC',
      domain: 'DC01.company.local',
      domainSid: 'S-1-5-21-...',
      site: 'Default-First-Site',
      samAccount: 'DC01$',
      netBios: 'COMPANY',
      fqdn: 'dc01.company.local',
      status: 'Active'
    },
    {
      id: 2,
      checked: false,
      type: 'DC',
      domain: 'DC02.company.local',
      domainSid: 'S-1-5-21-...',
      site: 'Default-First-Site',
      samAccount: 'DC02$',
      netBios: 'COMPANY',
      fqdn: 'dc02.company.local',
      status: 'Warning'
    },
    {
      id: 3,
      checked: false,
      type: 'DC',
      domain: 'DC03.company.local',
      domainSid: 'S-1-5-21-...',
      site: 'Branch-Site',
      samAccount: 'DC03$',
      netBios: 'COMPANY',
      fqdn: 'dc03.company.local',
      status: 'Active'
    },
    {
      id: 4,
      checked: false,
      type: 'DC',
      domain: 'DC04.company.local',
      domainSid: 'S-1-5-21-...',
      site: 'Branch-Site',
      samAccount: 'DC04$',
      netBios: 'COMPANY',
      fqdn: 'dc04.company.local',
      status: 'Error'
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: 'Domain Controller Updated',
      description: 'DC01.company.local',
      time: '4 min ago',
      icon: 'fas fa-server',
      color: 'text-cyber-accent'
    },
    {
      id: 2,
      type: 'User Group Created',
      description: 'sales-team',
      time: '4 min ago',
      icon: 'fas fa-users',
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'Policy Warning',
      description: 'Password policy',
      time: '1 hour ago',
      icon: 'fas fa-exclamation-triangle',
      color: 'text-yellow-400'
    }
  ];

  const dependencies = [
    { name: 'DNS Services', status: 'active' },
    { name: 'LDAP Connection', status: 'active' },
    { name: 'Kerberos Auth', status: 'warning' },
    { name: 'Replication', status: 'active' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-emerald-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30';
      case 'warning': return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30';
      case 'error': return 'bg-red-900/30 text-red-300 border-red-500/30';
      default: return 'bg-gray-900/30 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className={`h-screen bg-cyber-darker overflow-hidden transition-all duration-300 ${
      isCollapsed ? 'ml-16' : 'ml-64'
    }`}>
      <div className="flex h-full">
        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isRightSidebarOpen ? 'mr-80' : 'mr-0'
        }`}>
          {/* Page Header */}
          <div className="bg-cyber-dark border-b border-cyber-light/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-tree text-white text-sm"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-cyber-light">Forest Recovery</h1>
                  <p className="text-sm text-cyber-light/60">Recover and restore your Active Directory forest</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-cyber-accent text-white rounded-lg hover:bg-cyber-accent/90 transition-colors">
                  <i className="fas fa-sync-alt text-sm"></i>
                  <span>Refresh</span>
                </button>
                <button 
                  onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                  className="w-10 h-10 bg-cyber-dark border border-cyber-light/20 rounded-lg flex items-center justify-center text-cyber-light hover:bg-cyber-light/10 transition-colors"
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-cyber-dark border-b border-cyber-light/10 px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-cyber-darker text-cyber-light border border-cyber-light/20 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-cyber-accent focus:border-cyber-accent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-cyber-light/40"></i>
                  </div>
                </div>
              </div>
              <select 
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-cyber-darker text-cyber-light border border-cyber-light/20 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-cyber-accent focus:border-cyber-accent"
              >
                <option>All Domains</option>
                <option>company.local</option>
                <option>branch.local</option>
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-cyber-darker text-cyber-light border border-cyber-light/20 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-cyber-accent focus:border-cyber-accent"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Warning</option>
                <option>Error</option>
              </select>
            </div>
          </div>

          {/* Table Section */}
          <div className="flex-1 p-6 overflow-hidden">
            <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 overflow-hidden h-full">
              <div className="overflow-auto h-full">
                <table className="w-full text-sm">
                  <thead className="bg-cyber-darker border-b border-cyber-light/10 sticky top-0">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light w-12">
                        <input type="checkbox" className="rounded border-cyber-light/20 bg-cyber-darker" />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Domain</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Domain SID</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Site</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Sam Account</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Net BIOS</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">FQDN</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domainData.map((item) => (
                      <tr key={item.id} className="border-b border-cyber-light/5 hover:bg-cyber-light/5">
                        <td className="py-3 px-4">
                          <input type="checkbox" className="rounded border-cyber-light/20 bg-cyber-darker" />
                        </td>
                        <td className="py-3 px-4 text-cyber-light/80">{item.type}</td>
                        <td className="py-3 px-4 text-cyber-light">{item.domain}</td>
                        <td className="py-3 px-4 text-cyber-light/60 font-mono text-xs">{item.domainSid}</td>
                        <td className="py-3 px-4 text-cyber-light/80">{item.site}</td>
                        <td className="py-3 px-4 text-cyber-light/80 font-mono text-xs">{item.samAccount}</td>
                        <td className="py-3 px-4 text-cyber-light/80">{item.netBios}</td>
                        <td className="py-3 px-4 text-cyber-light/80">{item.fqdn}</td>
                        <td className="py-3 px-4">
                          <button className="text-cyber-accent hover:text-cyber-accent/80 transition-colors">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-cyber-dark border-t border-cyber-light/10 px-6 py-4">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-cyber-light/80">Total Count</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-cyber-light/80">Warning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-cyber-light/80">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`fixed right-0 top-0 bottom-0 bg-cyber-dark border-l border-cyber-light/10 transition-all duration-300 overflow-y-auto z-40 ${
          isRightSidebarOpen ? 'w-80 translate-x-0' : 'w-80 translate-x-full'
        }`}>
          <div className="h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-cyber-light/10 bg-cyber-darker">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-cyber-light">Information Panel</h3>
                <button
                  onClick={() => setIsRightSidebarOpen(false)}
                  className="text-cyber-light/50 hover:text-cyber-light transition-colors"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="p-4 space-y-6">
              {/* Dependencies Section */}
              <div className="bg-cyber-darker rounded-lg border border-cyber-light/10 p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-link text-cyber-accent"></i>
                  <h4 className="text-sm font-semibold text-cyber-light">Dependencies</h4>
                </div>
                <div className="space-y-3">
                  {dependencies.map((dep, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-cyber-light/80">{dep.name}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        dep.status === 'active' ? 'bg-emerald-500' : 
                        dep.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities Section */}
              <div className="bg-cyber-darker rounded-lg border border-cyber-light/10 p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-history text-purple-400"></i>
                  <h4 className="text-sm font-semibold text-cyber-light">Recent Activities</h4>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-cyber-dark border border-cyber-light/20 flex items-center justify-center flex-shrink-0`}>
                        <i className={`${activity.icon} text-xs ${activity.color}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-cyber-light">{activity.type}</p>
                        <p className="text-xs text-cyber-light/60 truncate">{activity.description}</p>
                        <p className="text-xs text-cyber-light/40 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
