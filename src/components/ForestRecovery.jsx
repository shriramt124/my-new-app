
import React, { useState } from 'react';

const ForestRecovery = ({ isCollapsed }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const domainControllers = [
    {
      id: 1,
      type: 'Root',
      domain: 'company.local',
      domainSid: 'S-1-5-21-237783...',
      site: 'Default-First-Site-Name',
      samAccountName: 'DC01$',
      netBIOS: 'DC01',
      fqdn: 'dc01.company.local',
      isGC: true,
      isRO: false,
      ipv4Address: '10.0.0.1',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Child',
      domain: 'sales.company.local',
      domainSid: 'S-1-5-21-445566...',
      site: 'Sales-Site',
      samAccountName: 'SALESDC$',
      netBIOS: 'SALESDC',
      fqdn: 'salesdc.sales.company.local',
      isGC: false,
      isRO: false,
      ipv4Address: '10.0.1.10',
      status: 'Warning'
    },
    {
      id: 3,
      type: 'Child',
      domain: 'dev.company.local',
      domainSid: 'S-1-5-21-778899...',
      site: 'Dev-Site',
      samAccountName: 'DEVDC$',
      netBIOS: 'DEVDC',
      fqdn: 'devdc.dev.company.local',
      isGC: false,
      isRO: false,
      ipv4Address: '10.0.2.10',
      status: 'Active'
    }
  ];

  const recentActivity = [
    { action: 'Domain Controller Updated', target: 'DC01.company.local', time: '4 min ago' },
    { action: 'User Group Created', target: 'Sales-Team', time: '15 min ago' },
    { action: 'Policy Warning', target: 'Password policy', time: '1 hour ago' },
    { action: 'Backup Completed', target: 'System state', time: '3 hours ago' }
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(domainControllers.map(dc => dc.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === domainControllers.length);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>;
      case 'Warning':
        return <div className="w-2 h-2 bg-amber-400 rounded-full"></div>;
      case 'Error':
        return <div className="w-2 h-2 bg-red-400 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className={`bg-gradient-to-br from-cyber-black via-cyber-darker to-cyber-black min-h-screen transition-all duration-300 ${
      isCollapsed ? 'ml-16' : 'ml-64'
    }`}>
      {/* Main Container */}
      <div className="flex min-h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header Section */}
          <div className="bg-cyber-darker/90 backdrop-blur-sm border-b border-cyber-light/10 px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Left Side - Page Title */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-tree text-white text-lg"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white mb-1">Page heading</h1>
                  <p className="text-sm text-gray-400">Recover and restore your Active Directory forest</p>
                </div>
              </div>
              
              {/* Right Side - Action Buttons */}
              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <i className="fas fa-sync-alt text-sm"></i>
                  <span>Refresh</span>
                </button>
                
                <button
                  onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                  className={`p-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                    isRightSidebarOpen 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                  title="Toggle Dependencies and Recent Activity"
                >
                  <i className="fas fa-bars text-sm"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Content Wrapper */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
              {/* Search and Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search domains..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-600 rounded-lg bg-cyber-dark/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>

                <select 
                  value={domainFilter} 
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg bg-cyber-dark/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Domains</option>
                  <option value="root">Root Domain</option>
                  <option value="child">Child Domains</option>
                </select>

                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg bg-cyber-dark/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              {/* Domain Controllers Table */}
              <div className="bg-cyber-dark/50 backdrop-blur-sm rounded-xl border border-cyber-light/20 overflow-hidden shadow-xl">
                <div className="px-6 py-4 bg-cyber-dark/60 border-b border-cyber-light/20">
                  <h3 className="text-lg font-semibold text-white">Domain Controllers</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-cyber-dark/40 border-b border-cyber-light/20">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-gray-300 w-12">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="rounded border-gray-400 text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Type</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Domain</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Domain SID</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Site</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">SAM Account</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">NetBIOS</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">FQDN</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-300">GC</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-300">RO</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">IPv4 Address</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-300">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-light/10">
                      {domainControllers.map((dc) => (
                        <tr key={dc.id} className="hover:bg-cyber-light/5 transition-colors">
                          <td className="py-4 px-6">
                            <input
                              type="checkbox"
                              checked={selectedRows.has(dc.id)}
                              onChange={() => handleRowSelect(dc.id)}
                              className="rounded border-gray-400 text-blue-600 focus:ring-blue-500 focus:ring-2"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300">{dc.type}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-sitemap text-blue-400 text-sm"></i>
                              <span className="font-medium text-white">{dc.domain}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-400 font-mono text-xs">{dc.domainSid}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300">{dc.site}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300">{dc.samAccountName}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300">{dc.netBIOS}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300">{dc.fqdn}</span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            {dc.isGC ? (
                              <i className="fas fa-check text-emerald-400"></i>
                            ) : (
                              <i className="fas fa-times text-red-400"></i>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {dc.isRO ? (
                              <i className="fas fa-check text-emerald-400"></i>
                            ) : (
                              <i className="fas fa-times text-red-400"></i>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300 font-mono">{dc.ipv4Address}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(dc.status)}
                              <span className="text-gray-300">{dc.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-cyber-dark/50 backdrop-blur-sm rounded-xl p-6 border border-cyber-light/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">2</div>
                      <div className="text-sm text-gray-400">AD Forests</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-tree text-blue-400"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-cyber-dark/50 backdrop-blur-sm rounded-xl p-6 border border-cyber-light/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">5</div>
                      <div className="text-sm text-gray-400">AD Domains</div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-sitemap text-emerald-400"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-cyber-dark/50 backdrop-blur-sm rounded-xl p-6 border border-cyber-light/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">12</div>
                      <div className="text-sm text-gray-400">Domain Controllers</div>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-server text-purple-400"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className={`bg-cyber-darker/90 backdrop-blur-sm border-l border-cyber-light/10 transition-all duration-300 overflow-y-auto ${
              isRightSidebarOpen ? 'w-80' : 'w-0 border-l-0'
            }`}>
              {isRightSidebarOpen && (
                <div className="w-80 p-6 space-y-6">
                  {/* Dependencies Section */}
                  <div className="bg-cyber-dark/40 backdrop-blur-sm rounded-xl p-5 border border-cyber-light/20 shadow-lg">
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fas fa-link text-blue-400"></i>
                      <h3 className="text-lg font-semibold text-white">Dependencies</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'DNS Services', status: 'active' },
                        { name: 'LDAP Connection', status: 'active' },
                        { name: 'Kerberos Auth', status: 'active' },
                        { name: 'Replication', status: 'active' }
                      ].map((dep, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-300">{dep.name}</span>
                          <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity Section */}
                  <div className="bg-cyber-dark/40 backdrop-blur-sm rounded-xl p-5 border border-cyber-light/20 shadow-lg">
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fas fa-clock text-blue-400"></i>
                      <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                    </div>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{activity.action}</div>
                            <div className="text-xs text-gray-400 mt-1">{activity.target}</div>
                            <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Summary */}
                  <div className="bg-cyber-dark/40 backdrop-blur-sm rounded-xl p-5 border border-cyber-light/20 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Status</span>
                      <span className="text-sm text-emerald-400 font-medium">Ready</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-4">Last refresh: 2:15 PM</div>
                    
                    <div className="pt-4 border-t border-cyber-light/20">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-amber-400">
                          <i className="fas fa-exclamation-triangle text-xs"></i>
                          <span>1 warning</span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          View Logs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
