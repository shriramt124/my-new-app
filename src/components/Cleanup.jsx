
import React, { useState } from 'react';

const Cleanup = () => {
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
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-broom text-white text-sm"></i>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Active Directory Cleanup</h1>
            <p className="text-sm text-gray-600">Perform cleanup operations on your Active Directory environment</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-triangle text-yellow-400 text-lg"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Warning: Cleanup Operations
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    These cleanup operations can have significant impact on your Active Directory environment. 
                    Please ensure you have proper backups and understand the implications before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Clean-up Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-broom text-white text-sm"></i>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Cleanup Options</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Select All */}
              <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={cleanupOptions.selectAll}
                    onChange={() => handleCleanupOption('selectAll')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-blue-900">Select All Options</span>
                </label>
              </div>

              {/* Cleanup Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cleanupItems.map((item) => (
                  <label key={item.key} className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 cursor-pointer transition-colors">
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
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  {Object.values(cleanupOptions).filter(Boolean).length - (cleanupOptions.selectAll ? 1 : 0)} of {cleanupItems.length} options selected
                </div>
                <div className="flex space-x-3">
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                    <i className="fas fa-times text-sm"></i>
                    <span>Cancel</span>
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                    <i className="fas fa-play text-sm"></i>
                    <span>Start Cleanup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleanup Status</h3>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Ready to perform cleanup operations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cleanup;
