
import React, { useState } from 'react';

const ForestRecovery = ({ isCollapsed }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
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

  const sidebarItems = [
    { icon: 'fas fa-tachometer-alt', label: 'Active Directory', active: true },
    { icon: 'fas fa-chart-line', label: 'Analytics', active: false },
    { icon: 'fas fa-file-alt', label: 'Reports', active: false },
    { icon: 'fas fa-cog', label: 'Settings', active: false }
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
        return <div className="w-2 h-2 bg-cyber-accent rounded-full"></div>;
      case 'Warning':
        return <div className="w-2 h-2 bg-cyber-yellow rounded-full"></div>;
      case 'Error':
        return <div className="w-2 h-2 bg-cyber-red rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-cyber-light/30 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-cyber-black min-h-screen w-full overflow-hidden">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 w-full transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <div className="bg-cyber-darker border-b border-cyber-dark/50 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-cyber-accent rounded-lg flex items-center justify-center shadow-cyber-sm">
                  <i className="fas fa-tree text-cyber-black text-xs"></i>
                </div>
                <div>
                  <h1 className="text-base font-semibold text-cyber-light">Forest Recovery</h1>
                  <p className="text-xs text-cyber-light/70">Recover and restore your Active Directory forest</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="bg-cyber-accent hover:bg-cyber-accent/80 text-cyber-black px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1 shadow-cyber-sm"
                onClick={() => {
                  // Add refresh functionality here
                  console.log('Refreshing data...');
                }}
              >
                <i className="fas fa-sync-alt text-xs"></i>
                <span>Refresh</span>
              </button>
              
              <button
                onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isRightSidebarOpen 
                    ? 'bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30' 
                    : 'bg-cyber-dark text-cyber-light/70 hover:bg-cyber-dark/80'
                }`}
                title="Toggle sidebar"
              >
                <i className="fas fa-bars text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Content Area */}
          <div className={`flex-1 p-4 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${
            isRightSidebarOpen ? 'mr-80' : 'mr-0'
          }`}>
            {/* Search and Filter Section */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search domains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-6 pr-3 py-1.5 text-xs border border-cyber-light/30 rounded-lg bg-cyber-dark text-cyber-light focus:outline-none focus:ring-1 focus:ring-cyber-accent focus:border-cyber-accent"
                />
                <i className="fas fa-search absolute left-2 top-1/2 transform -translate-y-1/2 text-cyber-light/50 text-xs"></i>
              </div>

              <select 
                value={domainFilter} 
                onChange={(e) => setDomainFilter(e.target.value)}
                className="px-2 py-1.5 text-xs border border-cyber-light/30 rounded-lg bg-cyber-dark text-cyber-light focus:outline-none focus:ring-1 focus:ring-cyber-accent"
              >
                <option value="all">All Domains</option>
                <option value="root">Root Domain</option>
                <option value="child">Child Domains</option>
              </select>

              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1.5 text-xs border border-cyber-light/30 rounded-lg bg-cyber-dark text-cyber-light focus:outline-none focus:ring-1 focus:ring-cyber-accent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            {/* Domain Controllers Table */}
            <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 overflow-hidden shadow-cyber-sm flex-1">
              <div className="px-4 py-3 border-b border-cyber-light/10 bg-cyber-darker">
                <h3 className="text-sm font-semibold text-cyber-light">Domain Controllers</h3>
              </div>
              
              <div className="overflow-auto h-full">
                <table className="w-full text-xs">
                  <thead className="bg-cyber-darker border-b border-cyber-light/10 sticky top-0 z-10">
                    <tr>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light sticky left-0 bg-cyber-darker z-20" style={{ width: '30px' }}>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="rounded border-cyber-light/30 text-cyber-accent bg-cyber-dark focus:ring-cyber-accent"
                        />
                      </th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '60px' }}>Type</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '140px' }}>Domain</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '120px' }}>Domain SID</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '120px' }}>Site</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '100px' }}>SAM Account</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '80px' }}>NetBIOS</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '180px' }}>FQDN</th>
                      <th className="text-center py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '40px' }}>GC</th>
                      <th className="text-center py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '40px' }}>RO</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '100px' }}>IPv4 Address</th>
                      <th className="text-left py-2 px-2 font-medium text-cyber-light whitespace-nowrap" style={{ width: '80px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-light/10">
                    {domainControllers.map((dc) => (
                      <tr key={dc.id} className="hover:bg-cyber-darker">
                        <td className="py-2 px-2 sticky left-0 bg-cyber-dark hover:bg-cyber-darker z-10" style={{ width: '30px' }}>
                          <input
                            type="checkbox"
                            checked={selectedRows.has(dc.id)}
                            onChange={() => handleRowSelect(dc.id)}
                            className="rounded border-cyber-light/30 text-cyber-accent bg-cyber-dark focus:ring-cyber-accent"
                          />
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap" style={{ width: '60px' }}>
                          <span className="text-cyber-light/70 text-xs">{dc.type}</span>
                        </td>
                        <td className="py-2 px-2" style={{ width: '140px' }}>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-sitemap text-cyber-light/50 text-xs"></i>
                            <span className="font-medium text-cyber-light truncate text-xs" title={dc.domain}>{dc.domain}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2" style={{ width: '120px' }}>
                          <span className="text-cyber-light/70 font-mono text-xs truncate block" title={dc.domainSid}>{dc.domainSid}</span>
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap" style={{ width: '120px' }}>
                          <span className="text-cyber-light/70 text-xs truncate block" title={dc.site}>{dc.site}</span>
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap" style={{ width: '100px' }}>
                          <span className="text-cyber-light/70 text-xs">{dc.samAccountName}</span>
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap" style={{ width: '80px' }}>
                          <span className="text-cyber-light/70 text-xs">{dc.netBIOS}</span>
                        </td>
                        <td className="py-2 px-2" style={{ width: '180px' }}>
                          <span className="text-cyber-light/70 truncate block text-xs" title={dc.fqdn}>{dc.fqdn}</span>
                        </td>
                        <td className="py-2 px-2 text-center" style={{ width: '40px' }}>
                          {dc.isGC ? (
                            <i className="fas fa-check text-cyber-accent text-xs"></i>
                          ) : (
                            <i className="fas fa-times text-cyber-red text-xs"></i>
                          )}
                        </td>
                        <td className="py-2 px-2 text-center" style={{ width: '40px' }}>
                          {dc.isRO ? (
                            <i className="fas fa-check text-cyber-accent text-xs"></i>
                          ) : (
                            <i className="fas fa-times text-cyber-red text-xs"></i>
                          )}
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap" style={{ width: '100px' }}>
                          <span className="text-cyber-light/70 font-mono text-xs">{dc.ipv4Address}</span>
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap" style={{ width: '80px' }}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(dc.status)}
                            <span className="text-gray-700 text-xs">{dc.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Cards - Moved to bottom */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-3 text-center shadow-cyber-sm">
                <div className="text-lg font-bold text-cyber-accent mb-1">2</div>
                <div className="text-xs text-cyber-light/70">AD Forests</div>
              </div>
              <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-3 text-center shadow-cyber-sm">
                <div className="text-lg font-bold text-cyber-accent mb-1">5</div>
                <div className="text-xs text-cyber-light/70">AD Domains</div>
              </div>
              <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-3 text-center shadow-cyber-sm">
                <div className="text-lg font-bold text-cyber-accent mb-1">12</div>
                <div className="text-xs text-cyber-light/70">Domain Controllers</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Fixed positioning */}
          <div className={`fixed right-0 top-0 bottom-0 bg-cyber-darker border-l border-cyber-dark/30 transition-all duration-300 overflow-y-auto z-40 ${
            isRightSidebarOpen ? 'w-80 translate-x-0' : 'w-80 translate-x-full'
          }`}>
            <div className="h-full">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-cyber-dark/30 bg-cyber-darker">
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
              <div className="p-4 space-y-4">
                {/* Dependencies Section */}
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-3 shadow-cyber-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <i className="fas fa-link text-cyber-light/70 text-sm"></i>
                    <h3 className="text-sm font-semibold text-cyber-light">Dependencies</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyber-light/70">DNS Services</span>
                      <div className="w-2 h-2 bg-cyber-accent rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyber-light/70">LDAP Connection</span>
                      <div className="w-2 h-2 bg-cyber-accent rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyber-light/70">Kerberos Auth</span>
                      <div className="w-2 h-2 bg-cyber-accent rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyber-light/70">Replication</span>
                      <div className="w-2 h-2 bg-cyber-accent rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-3 shadow-cyber-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <i className="fas fa-clock text-cyber-light/70 text-sm"></i>
                    <h3 className="text-sm font-semibold text-cyber-light">Recent Activity</h3>
                  </div>
                  <div className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyber-accent rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-cyber-light">{activity.action}</div>
                          <div className="text-xs text-cyber-light/70">{activity.target}</div>
                          <div className="text-xs text-cyber-light/50 mt-0.5">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-3 shadow-cyber-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-cyber-light/70">Status</span>
                    <span className="text-xs text-cyber-accent">Ready</span>
                  </div>
                  <div className="text-xs text-cyber-light/50">Last refresh: 2:15 PM</div>
                  
                  <div className="mt-3 pt-3 border-t border-cyber-light/10">
                    <div className="flex items-center space-x-2 text-xs text-cyber-light/70">
                      <i className="fas fa-exclamation-triangle text-cyber-yellow"></i>
                      <span>1 warning</span>
                      <button className="text-cyber-accent hover:text-cyber-accent/80">View Logs</button>
                    </div>
                  </div>
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
