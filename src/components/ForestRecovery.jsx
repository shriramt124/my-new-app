
import React, { useState } from 'react';

const ForestRecovery = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const forestData = [
    {
      id: 1,
      domainName: 'company.local',
      domainSid: 'S-1-5-21-237783456-789012345-567890123-1000',
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
      domainName: 'sales.company.local',
      domainSid: 'S-1-5-21-445566778-889900112-223344556-2000',
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
      domainName: 'dev.company.local',
      domainSid: 'S-1-5-21-778899001-112233445-556677889-3000',
      site: 'Dev-Site',
      samAccountName: 'DEVDC$',
      netBIOS: 'DEVDC',
      fqdn: 'devdc.dev.company.local',
      isGC: false,
      isRO: false,
      ipv4Address: '10.0.2.10',
      status: 'Active'
    },
    {
      id: 4,
      domainName: 'test.company.local',
      domainSid: 'S-1-5-21-334455667-778899001-112233445-4000',
      site: 'Test-Site',
      samAccountName: 'TESTDC$',
      netBIOS: 'TESTDC',
      fqdn: 'testdc.test.company.local',
      isGC: false,
      isRO: true,
      ipv4Address: '10.0.3.10',
      status: 'Error'
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
      setSelectedRows(new Set(forestData.map(dc => dc.id)));
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
    setSelectAll(newSelected.size === forestData.length);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'Warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'Error':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Left Sidebar */}
      <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
        isLeftSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            {!isLeftSidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white text-sm"></i>
                </div>
                <span className="font-semibold text-gray-900">Recovery</span>
              </div>
            )}
            <button
              onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className={`fas ${isLeftSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-600 text-xs`}></i>
            </button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} text-sm`}></i>
                {!isLeftSidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-tree text-white text-xs"></i>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Forest Recovery</h1>
                  <p className="text-xs text-gray-600">Recover and restore your Active Directory forest</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                <i className="fas fa-sync-alt text-xs"></i>
                <span>Refresh</span>
              </button>
              
              <button
                onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isRightSidebarOpen 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Toggle sidebar"
              >
                <i className="fas fa-bars text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Search and Filter Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search domains..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>

                <select 
                  value={domainFilter} 
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Domains</option>
                  <option value="root">Root Domain</option>
                  <option value="child">Child Domains</option>
                </select>

                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>

            {/* Forest Recovery Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900">Forest Recovery Status</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Domain Name</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Domain SID</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Site</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">SAM Account Name</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">NetBIOS</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">FQDN</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">GC</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">RO</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">IPv4 Address</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {forestData.map((dc) => (
                      <tr key={dc.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(dc.id)}
                            onChange={() => handleRowSelect(dc.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900">{dc.domainName}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-700 font-mono text-xs">{dc.domainSid}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-700">{dc.site}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-700">{dc.samAccountName}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-700">{dc.netBIOS}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-700">{dc.fqdn}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            dc.isGC 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {dc.isGC ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            dc.isRO 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {dc.isRO ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-700 font-mono text-sm">{dc.ipv4Address}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(dc.status)}
                            <span className="text-gray-700">{dc.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                <div className="text-sm text-gray-600">AD Forests</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600">AD Domains</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                <div className="text-sm text-gray-600">Domain Controllers</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={`bg-white border-l border-gray-200 flex-shrink-0 transition-all duration-300 overflow-y-auto ${
            isRightSidebarOpen ? 'w-80' : 'w-0 border-l-0'
          }`}>
            {isRightSidebarOpen && (
              <div className="w-80 p-6 space-y-6">
                {/* Dependencies Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <i className="fas fa-link text-gray-600 text-sm"></i>
                    <h3 className="text-sm font-semibold text-gray-900">Dependencies</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">DNS Services</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">LDAP Connection</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Kerberos Auth</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Replication</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <i className="fas fa-clock text-gray-600 text-sm"></i>
                    <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                          <div className="text-xs text-gray-600">{activity.target}</div>
                          <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Status</span>
                    <span className="text-xs text-green-600">Ready</span>
                  </div>
                  <div className="text-xs text-gray-500">Last refresh: 2:15 PM</div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <i className="fas fa-exclamation-triangle text-yellow-500"></i>
                      <span>1 warning</span>
                      <button className="text-blue-600 hover:text-blue-800">View Logs</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
