
import React, { useState } from 'react';

const ForestRecovery = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  

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

  // Filter domain controllers based on search and filters
  const filteredDomainControllers = domainControllers.filter(dc => {
    const matchesSearch = searchQuery === '' || 
      dc.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dc.fqdn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dc.netBIOS.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = domainFilter === 'all' || dc.domain === domainFilter;
    const matchesStatus = statusFilter === 'all' || dc.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesDomain && matchesStatus;
  });

  const handleRowSelect = (rowId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === filteredDomainControllers.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(filteredDomainControllers.map(dc => dc.id)));
      setSelectAll(true);
    }
  };

  

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-tree text-white text-xs"></i>
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">Forest Recovery</h1>
              <p className="text-xs text-gray-600">Recover and restore your Active Directory forest</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1.5">
            <i className="fas fa-sync-alt text-xs"></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Search and Filter Section */}
          <div className="flex items-center space-x-3 mb-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search domains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <i className="fas fa-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
            </div>

            {/* Domain Filter Dropdown */}
            <div className="relative">
              <select 
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="appearance-none bg-gray-200 text-gray-800 px-3 py-1.5 pr-6 rounded-md text-xs font-medium border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="all">All Domains</option>
                <option value="praevia.local">praevia.local</option>
                <option value="company.local">company.local</option>
                <option value="dev.company.local">dev.company.local</option>
              </select>
              <i className="fas fa-chevron-down absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-gray-200 text-gray-800 px-3 py-1.5 pr-6 rounded-md text-xs font-medium border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              <i className="fas fa-chevron-down absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
            </div>
          </div>

          {/* Domain Controllers */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-3 py-2 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Select Domain Controller(s) for Forest Recovery:</h2>
            </div>
            
            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-2 py-2 text-left w-8">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="sr-only">Select All</span>
                      </label>
                    </th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-16">Type</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-32">Domain</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-24">Site</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-20">NetBIOS</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-32">FQDN</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-12">GC</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-16">Status</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-700 w-24">IP Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredDomainControllers.map((dc) => (
                    <tr 
                      key={dc.id} 
                      className={`hover:bg-gray-50 ${selectedRows.has(dc.id) ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-2 py-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(dc.id)}
                            onChange={() => handleRowSelect(dc.id)}
                            className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="px-2 py-2 text-gray-900 truncate">{dc.type}</td>
                      <td className="px-2 py-2 text-gray-700 truncate">{dc.domain}</td>
                      <td className="px-2 py-2 text-gray-700 truncate">{dc.site}</td>
                      <td className="px-2 py-2 text-gray-700 font-mono truncate">{dc.netBIOS}</td>
                      <td className="px-2 py-2 text-gray-700 font-mono truncate">{dc.fqdn}</td>
                      <td className="px-2 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          dc.isGC ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dc.isGC ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex items-center space-x-1 ${
                          dc.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          dc.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            dc.status === 'Active' ? 'bg-green-500' : 
                            dc.status === 'Warning' ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}></div>
                          <span>{dc.status}</span>
                        </span>
                      </td>
                      <td className="px-2 py-2 text-gray-700 font-mono truncate">{dc.ipv4Address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1 text-gray-900">2</div>
                <div className="text-gray-600 text-xs">AD Forests</div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1 text-gray-900">5</div>
                <div className="text-gray-600 text-xs">AD Domains</div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1 text-gray-900">12</div>
                <div className="text-gray-600 text-xs">Domain Controllers</div>
              </div>
            </div>
          </div>

          
        </div>

        {/* Right Sidebar */}
        <div className="w-72 bg-white border-l border-gray-200 p-4 space-y-4 flex-shrink-0 overflow-y-auto">
          {/* Dependencies Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center space-x-2 mb-3">
              <i className="fas fa-cog text-xs text-gray-600"></i>
              <h3 className="text-xs font-semibold text-gray-900">Dependencies</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">DNS Services</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">LDAP Connection</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Kerberos Auth</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Replication</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center space-x-2 mb-3">
              <i className="fas fa-clock text-xs text-gray-600"></i>
              <h3 className="text-xs font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-blue-500 pl-2">
                <div className="text-xs font-medium text-gray-900">Domain Controller Updated</div>
                <div className="text-xs text-gray-500 mt-0.5">DC01.company.local • 4 min ago</div>
              </div>
              <div className="border-l-2 border-green-500 pl-2">
                <div className="text-xs font-medium text-gray-900">User Group Created</div>
                <div className="text-xs text-gray-500 mt-0.5">Sales-Team • 15 min ago</div>
              </div>
              <div className="border-l-2 border-yellow-500 pl-2">
                <div className="text-xs font-medium text-gray-900">Policy Warning</div>
                <div className="text-xs text-gray-500 mt-0.5">Password policy • 1 hour ago</div>
              </div>
              <div className="border-l-2 border-green-500 pl-2">
                <div className="text-xs font-medium text-gray-900">Backup Completed</div>
                <div className="text-xs text-gray-500 mt-0.5">System state • 3 hours ago</div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-900">Ready</span>
              </div>
              <span className="text-xs text-gray-500">Last refresh: 2:15 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
