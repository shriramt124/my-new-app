
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
      ipv4Address: '10.0.0.10'
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
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-tree text-white text-sm"></i>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Forest Recovery</h1>
              <p className="text-sm text-gray-600">Recover and restore your Active Directory forest</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
            <i className="fas fa-sync-alt text-sm"></i>
            <span>Refresh Forest Discovery</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6 space-y-6">
          {/* Domain Controllers */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Select Domain Controller(s) for Forest Recovery:</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="sr-only">Select All</span>
                      </label>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Domain</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">DomainSid</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Site</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">SamAccountN...</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">NetBIOS</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">FQDN</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">IsGC</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">IsRO</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">IPv4Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {domainControllers.map((dc) => (
                    <tr 
                      key={dc.id} 
                      className={`hover:bg-gray-50 ${selectedRows.has(dc.id) ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(dc.id)}
                            onChange={() => handleRowSelect(dc.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{dc.type}</td>
                      <td className="px-4 py-3 text-gray-700">{dc.domain}</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{dc.domainSid}</td>
                      <td className="px-4 py-3 text-gray-700">{dc.site}</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{dc.samAccountName}</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{dc.netBIOS}</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{dc.fqdn}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          dc.isGC ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dc.isGC ? 'True' : 'False'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          !dc.isRO ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dc.isRO ? 'True' : 'False'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{dc.ipv4Address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2</div>
                <div className="text-gray-300 text-sm">AD Forests</div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-gray-300 text-sm">AD Domains</div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-gray-300 text-sm">Domain Controllers</div>
              </div>
            </div>
          </div>

          {/* Clean-up Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-broom text-white text-sm"></i>
                </div>
                <h2 className="text-base font-semibold text-gray-900">Clean-up</h2>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Select All */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={cleanupOptions.selectAll}
                    onChange={() => handleCleanupOption('selectAll')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-blue-900">Select All</span>
                </label>
              </div>

              {/* Cleanup Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cleanupItems.map((item) => (
                  <label key={item.key} className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={cleanupOptions[item.key]}
                      onChange={() => handleCleanupOption(item.key)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <i className="fas fa-play text-sm"></i>
                  <span>Start</span>
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <i className="fas fa-times text-sm"></i>
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-900 text-white p-6 space-y-6">
          {/* Dependencies Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-cog text-sm"></i>
              <h3 className="text-sm font-semibold">Dependencies</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">DNS Services</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">LDAP Connection</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Kerberos Auth</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Replication</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-clock text-sm"></i>
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-3">
                <div className="text-sm font-medium">Domain Controller Updated</div>
                <div className="text-xs text-gray-400">DC01.company.local • 4 min ago</div>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <div className="text-sm font-medium">User Group Created</div>
                <div className="text-xs text-gray-400">Sales-Team • 15 min ago</div>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3">
                <div className="text-sm font-medium">Policy Warning</div>
                <div className="text-xs text-gray-400">Password policy • 1 hour ago</div>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <div className="text-sm font-medium">Backup Completed</div>
                <div className="text-xs text-gray-400">System state • 3 hours ago</div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Ready</span>
              </div>
              <span className="text-xs text-gray-400">Last refresh: 2:15 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
