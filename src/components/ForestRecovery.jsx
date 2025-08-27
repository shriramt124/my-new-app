
import React, { useState } from 'react';

const ForestRecovery = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [cleanupOptions, setCleanupOptions] = useState({
    selectAll: false,
    authRestoreSysvol: false,
    cleanDNS: false,
    currentUserPasswordReset: false,
    domainControllerPasswordReset: false,
    metadataCleanup: false,
    removeCertificates: false,
    removeExternalTrusts: false,
    removeSecrets: false,
    resetAllComputerAccounts: false,
    resetAllUserPasswords: false,
    resetDSRMPassword: false,
    resetKrbtgtPassword: false,
    resetRID500Password: false,
    resetRODCRevealed: false,
    resetTierZeroPasswords: false,
    resetTrusts: false,
    seizeFSMORoles: false
  });

  const domainControllers = [
    {
      id: 1,
      type: 'Forest Root',
      domain: 'praevia.local',
      domainSid: 'S-1-5-21-237783...',
      site: 'London',
      samAccountName: 'AU09$',
      netBIOS: 'AU09',
      fqdn: 'au09.praevia.local',
      isGC: true,
      isRO: false,
      ipv4Address: '10.0.0.10',
      status: 'Active',
      lastUpdate: '2025-01-15 14:30'
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

  const handleCleanupOption = (option) => {
    if (option === 'selectAll') {
      const newValue = !cleanupOptions.selectAll;
      const newOptions = Object.keys(cleanupOptions).reduce((acc, key) => {
        acc[key] = newValue;
        return acc;
      }, {});
      setCleanupOptions(newOptions);
    } else {
      const newOptions = {
        ...cleanupOptions,
        [option]: !cleanupOptions[option]
      };
      const otherOptions = Object.keys(newOptions).filter(key => key !== 'selectAll');
      const allSelected = otherOptions.every(key => newOptions[key]);
      newOptions.selectAll = allSelected;
      setCleanupOptions(newOptions);
    }
  };

  const cleanupItems = [
    { key: 'authRestoreSysvol', label: 'Auth Restore Sysvol' },
    { key: 'cleanDNS', label: 'Clean DNS' },
    { key: 'currentUserPasswordReset', label: 'Current User Password Reset' },
    { key: 'domainControllerPasswordReset', label: 'Domain Controller Password Reset' },
    { key: 'metadataCleanup', label: 'Metadata Cleanup' },
    { key: 'removeCertificates', label: 'Remove Certificates' },
    { key: 'removeExternalTrusts', label: 'Remove External Trusts' },
    { key: 'removeSecrets', label: 'Remove Secrets' },
    { key: 'resetAllComputerAccounts', label: 'Reset All Computer Accounts' },
    { key: 'resetAllUserPasswords', label: 'Reset All User Passwords' },
    { key: 'resetDSRMPassword', label: 'Reset DSRM Password' },
    { key: 'resetKrbtgtPassword', label: 'Reset Krbtgt Password' },
    { key: 'resetRID500Password', label: 'Reset RID 500 Password' },
    { key: 'resetRODCRevealed', label: 'Reset RODC Revealed' },
    { key: 'resetTierZeroPasswords', label: 'Reset Tier Zero Passwords' },
    { key: 'resetTrusts', label: 'Reset Trusts' },
    { key: 'seizeFSMORoles', label: 'Seize FSMO Roles' }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Main Content Area */}
      <div className="flex">
        {/* Left Main Content */}
        <div className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Forest Recovery Overview</h1>
            <div className="flex items-center space-x-4 mb-4">
              <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white">
                <option>All Domains</option>
                <option>praevia.local</option>
              </select>
              <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white">
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
          <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-300">Domain</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-300">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-300">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-300">Controllers</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-300">Last Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {domainControllers.map((dc) => (
                    <tr key={dc.id} className="hover:bg-gray-750">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(dc.id)}
                          onChange={() => handleRowSelect(dc.id)}
                          className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <i className="fas fa-sitemap text-yellow-500 mr-2"></i>
                          <span className="text-white font-medium">{dc.domain}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{dc.type}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-green-400">{dc.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">3</td>
                      <td className="px-4 py-3 text-gray-400">{dc.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">2</div>
              <div className="text-gray-400 text-sm">AD Forests</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">5</div>
              <div className="text-gray-400 text-sm">AD Domains</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">12</div>
              <div className="text-gray-400 text-sm">Domain Controllers</div>
            </div>
          </div>

          {/* Clean-up Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-broom text-white text-sm"></i>
                </div>
                <h2 className="text-lg font-semibold text-white">Recovery Operations</h2>
              </div>
            </div>

            <div className="p-4">
              {/* Select All */}
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/50 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={cleanupOptions.selectAll}
                    onChange={() => handleCleanupOption('selectAll')}
                    className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-blue-300">Select All Operations</span>
                </label>
              </div>

              {/* Cleanup Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {cleanupItems.map((item) => (
                  <label key={item.key} className="flex items-center p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={cleanupOptions[item.key]}
                      onChange={() => handleCleanupOption(item.key)}
                      className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-300">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-700">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <i className="fas fa-play text-sm"></i>
                  <span>Start Recovery</span>
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <i className="fas fa-download text-sm"></i>
                  <span>Export Configuration</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 space-y-6">
          {/* Dependencies */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <i className="fas fa-link text-blue-400"></i>
                <h3 className="text-sm font-semibold text-white">Dependencies</h3>
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
                  <span className="text-sm text-gray-300">{dep.name}</span>
                  <span className={`w-2 h-2 rounded-full ${dep.status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-yellow-400"></i>
                <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
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
                    <span className="text-sm font-medium text-white">{activity.action}</span>
                  </div>
                  <div className="ml-4 text-xs text-gray-400">{activity.target} • {activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <i className="fas fa-server text-green-400"></i>
                <h3 className="text-sm font-semibold text-white">System Status</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Ready</span>
                <span className="text-xs text-gray-400">Last refresh: 2:15 PM</span>
              </div>
              <div className="text-xs text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                All services operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
