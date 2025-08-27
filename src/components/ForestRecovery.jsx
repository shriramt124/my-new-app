
import React, { useState } from 'react';

const ForestRecovery = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const domainControllers = [
    {
      id: 1,
      domain: 'company.local',
      type: 'Root',
      status: 'Active',
      controllers: 3,
      lastUpdate: '2025-01-15 14:30',
      icon: 'fas fa-sitemap'
    },
    {
      id: 2,
      domain: 'sales.company.local', 
      type: 'Child',
      status: 'Warning',
      controllers: 2,
      lastUpdate: '2025-01-15 13:45',
      icon: 'fas fa-building'
    },
    {
      id: 3,
      domain: 'dev.company.local',
      type: 'Child', 
      status: 'Active',
      controllers: 1,
      lastUpdate: '2025-01-15 14:15',
      icon: 'fas fa-code'
    }
  ];

  const handleRowSelect = (rowId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === domainControllers.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(domainControllers.map(dc => dc.id)));
      setSelectAll(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content Area */}
      <div className="flex">
        {/* Left Main Content */}
        <div className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Active Directory Overview</h1>
            <div className="flex items-center space-x-4 mb-4">
              <select className="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Domains</option>
                <option>company.local</option>
                <option>sales.company.local</option>
                <option>dev.company.local</option>
              </select>
              <select className="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Warning</option>
                <option>Error</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2">
                <i className="fas fa-sync-alt text-sm"></i>
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Domain Controllers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Domain</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Controllers</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Last Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {domainControllers.map((dc) => (
                    <tr key={dc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(dc.id)}
                          onChange={() => handleRowSelect(dc.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <i className={`${dc.icon} text-blue-500 mr-2`}></i>
                          <span className="text-gray-900 font-medium">{dc.domain}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{dc.type}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            dc.status === 'Active' ? 'bg-green-500' : 
                            dc.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                          <span className={`${
                            dc.status === 'Active' ? 'text-green-700' : 
                            dc.status === 'Warning' ? 'text-yellow-700' : 'text-red-700'
                          }`}>{dc.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{dc.controllers}</td>
                      <td className="px-4 py-3 text-gray-500">{dc.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
              <div className="text-gray-600 text-sm">AD Forests</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
              <div className="text-gray-600 text-sm">AD Domains</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
              <div className="text-gray-600 text-sm">Domain Controllers</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 space-y-6 bg-gray-50 border-l border-gray-200">
          {/* Dependencies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <i className="fas fa-link text-blue-500"></i>
                <h3 className="text-sm font-semibold text-gray-900">Dependencies</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: 'DNS Services', status: true },
                { name: 'LDAP Connection', status: true },
                { name: 'Kerberos Auth', status: true },
                { name: 'Replication', status: true }
              ].map((dep, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{dep.name}</span>
                  <span className={`w-2 h-2 rounded-full ${dep.status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-yellow-500"></i>
                <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { action: 'Domain Controller Updated', target: 'DC01.company.local', time: '4 min ago' },
                { action: 'User Group Created', target: 'Sales Team', time: '15 min ago' },
                { action: 'Policy Warning', target: 'Password policy', time: '1 hour ago' },
                { action: 'Backup Completed', target: 'System state', time: '3 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                  </div>
                  <div className="ml-4 text-xs text-gray-500">{activity.target} • {activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
