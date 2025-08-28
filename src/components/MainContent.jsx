
import React from 'react';

const MainContent = ({ activeTab }) => {
  const getTabContent = () => {
    switch (activeTab) {
      case 'dashboards':
        return (
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-tree text-white text-sm"></i>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Forest Recovery</h1>
                  <p className="text-sm text-gray-600">Recover and restore your Active Directory forest</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <i className="fas fa-sync-alt text-sm"></i>
                  <span>Refresh</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <i className="fas fa-bars text-sm"></i>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search domains..."
                  className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
              
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Domains</option>
                <option>Root Domain</option>
                <option>Child Domains</option>
              </select>
              
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Warning</option>
                <option>Error</option>
              </select>
            </div>

            {/* Domain Controllers Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Domain Controllers</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain SID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAM Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net BIOS</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FQDN</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RO</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { type: 'Root', domain: 'company.local', domainSid: 'S-1-5-21-237783...', site: 'Default-First-Site-Name', samAccount: 'DC01$', netBios: 'DC01', fqdn: 'dc01.company.local', gc: true, ro: false },
                      { type: 'Child', domain: 'sales.company.local', domainSid: 'S-1-5-21-445566...', site: 'Sales-Site', samAccount: 'SALESDC$', netBios: 'SALESDC', fqdn: 'salesdc.sales.company.local', gc: false, ro: false },
                      { type: 'Child', domain: 'dev.company.local', domainSid: 'S-1-5-21-778899...', site: 'Dev-Site', samAccount: 'DEVDC$', netBios: 'DEVDC', fqdn: 'devdc.dev.company.local', gc: false, ro: false }
                    ].map((dc, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dc.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dc.domain}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dc.domainSid}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dc.site}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dc.samAccount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dc.netBios}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{dc.fqdn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dc.gc ? <i className="fas fa-check text-green-500"></i> : <i className="fas fa-times text-gray-400"></i>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dc.ro ? <i className="fas fa-check text-green-500"></i> : <i className="fas fa-times text-gray-400"></i>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-pie text-blue-600 text-3xl"></i>
                  </div>
                  <p className="text-sm text-gray-500">Chart visualization will be displayed here</p>
                  <div className="flex items-center justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Total Count</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Warning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-6">
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a module</h3>
              <p className="text-gray-500">Choose from the sidebar to access different security tools</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      {getTabContent()}
    </div>
  );
};

export default MainContent;
