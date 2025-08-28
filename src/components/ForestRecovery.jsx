
import React, { useState } from 'react';

const ForestRecovery = ({ isCollapsed }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

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
        <div className="bg-cyber-darker border-b border-cyber-dark/50 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyber-accent rounded-lg flex items-center justify-center shadow-cyber-sm">
                  <i className="fas fa-tree text-cyber-black text-sm"></i>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-cyber-light">Forest Recovery</h1>
                  <p className="text-sm text-cyber-light/70">Recover and restore your Active Directory forest</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                className="bg-cyber-accent hover:bg-cyber-accent/80 text-cyber-black px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-cyber-sm"
                onClick={() => {
                  console.log('Refreshing data...');
                }}
              >
                <i className="fas fa-sync-alt text-sm"></i>
                <span>Refresh</span>
              </button>
              
              <button
                onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                className="bg-cyber-accent hover:bg-cyber-accent/80 text-cyber-black p-2 rounded-lg transition-colors shadow-cyber-sm"
                title="Toggle sidebar"
              >
                <i className="fas fa-bars text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className={`flex-1 p-6 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${
            isRightSidebarOpen ? 'mr-80' : 'mr-0'
          }`}>
            {/* Search and Filter Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 text-sm border border-cyber-light/30 rounded-lg bg-cyber-dark text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-accent focus:border-cyber-accent"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 text-sm"></i>
              </div>

              <select 
                value={domainFilter} 
                onChange={(e) => setDomainFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-cyber-light/30 rounded-lg bg-cyber-dark text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-accent"
              >
                <option value="all">All Domains</option>
                <option value="root">Root Domain</option>
                <option value="child">Child Domains</option>
              </select>

              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-cyber-light/30 rounded-lg bg-cyber-dark text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-accent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            {/* Table Container */}
            <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 shadow-cyber-sm flex-1 flex flex-col">
              <div className="px-6 py-4 border-b border-cyber-light/10 bg-cyber-darker">
                <h3 className="text-lg font-semibold text-cyber-light">Domain Controllers</h3>
              </div>
              
              {/* Horizontally Scrollable Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-cyber-darker border-b border-cyber-light/10 sticky top-0 z-10">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light w-12">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="rounded border-cyber-light/30 text-cyber-accent bg-cyber-dark focus:ring-cyber-accent"
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Domain</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Domain SID</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Site</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">SAM Account</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Net BIOS</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">FQDN</th>
                      <th className="text-center py-3 px-4 font-medium text-cyber-light whitespace-nowrap">GC</th>
                      <th className="text-center py-3 px-4 font-medium text-cyber-light whitespace-nowrap">RO</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">IPv4 Address</th>
                      <th className="text-left py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Status</th>
                      <th className="text-center py-3 px-4 font-medium text-cyber-light whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-light/10">
                    {domainControllers.map((dc) => (
                      <tr key={dc.id} className="hover:bg-cyber-darker/50 transition-colors">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(dc.id)}
                            onChange={() => handleRowSelect(dc.id)}
                            className="rounded border-cyber-light/30 text-cyber-accent bg-cyber-dark focus:ring-cyber-accent"
                          />
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70">{dc.type}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <i className="fas fa-sitemap text-cyber-light/50"></i>
                            <span className="font-medium text-cyber-light">{dc.domain}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70 font-mono text-xs">{dc.domainSid}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70">{dc.site}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70">{dc.samAccountName}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70">{dc.netBIOS}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70">{dc.fqdn}</span>
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          {dc.isGC ? (
                            <i className="fas fa-check text-cyber-accent"></i>
                          ) : (
                            <i className="fas fa-times text-cyber-red"></i>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          {dc.isRO ? (
                            <i className="fas fa-check text-cyber-accent"></i>
                          ) : (
                            <i className="fas fa-times text-cyber-red"></i>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-cyber-light/70 font-mono">{dc.ipv4Address}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(dc.status)}
                            <span className="text-cyber-light/70">{dc.status}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <button className="text-cyber-light/50 hover:text-cyber-accent transition-colors">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-4 text-center">
                  <div className="text-2xl font-bold text-cyber-accent mb-2">2</div>
                  <div className="text-sm text-cyber-light/70">AD Forests</div>
                </div>
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-4 text-center">
                  <div className="text-2xl font-bold text-cyber-accent mb-2">5</div>
                  <div className="text-sm text-cyber-light/70">AD Domains</div>
                </div>
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-4 text-center">
                  <div className="text-2xl font-bold text-cyber-accent mb-2">12</div>
                  <div className="text-sm text-cyber-light/70">Domain Controllers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={`fixed right-0 top-0 bottom-0 bg-cyber-darker border-l border-cyber-dark/30 transition-all duration-300 overflow-y-auto z-40 ${
            isRightSidebarOpen ? 'w-80 translate-x-0' : 'w-80 translate-x-full'
          }`}>
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-cyber-dark/30 bg-cyber-darker flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-cyber-light">Information Panel</h3>
                  <button
                    onClick={() => setIsRightSidebarOpen(false)}
                    className="text-cyber-light/50 hover:text-cyber-light transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                {/* Dependencies Section */}
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <i className="fas fa-link text-cyber-accent"></i>
                    <h4 className="font-semibold text-cyber-light">Dependencies</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cyber-light/70">DNS Services</span>
                      <div className="w-3 h-3 bg-cyber-accent rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cyber-light/70">LDAP Connection</span>
                      <div className="w-3 h-3 bg-cyber-accent rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cyber-light/70">Kerberos Auth</span>
                      <div className="w-3 h-3 bg-cyber-accent rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cyber-light/70">Replication</span>
                      <div className="w-3 h-3 bg-cyber-accent rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities Section */}
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <i className="fas fa-clock text-cyber-accent"></i>
                    <h4 className="font-semibold text-cyber-light">Recent Activities</h4>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyber-accent rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-cyber-light">{activity.action}</div>
                          <div className="text-sm text-cyber-light/70">{activity.target}</div>
                          <div className="text-xs text-cyber-light/50 mt-1">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-cyber-dark rounded-lg border border-cyber-light/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-cyber-light/70">Status</span>
                    <span className="text-sm text-cyber-accent font-medium">Ready</span>
                  </div>
                  <div className="text-xs text-cyber-light/50 mb-4">Last refresh: 2:15 PM</div>
                  
                  <div className="pt-3 border-t border-cyber-light/10">
                    <div className="flex items-center space-x-2 text-sm text-cyber-light/70">
                      <i className="fas fa-exclamation-triangle text-cyber-yellow"></i>
                      <span>1 warning</span>
                      <button className="text-cyber-accent hover:text-cyber-accent/80 text-xs">View Logs</button>
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
