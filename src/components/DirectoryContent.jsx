
import React from 'react';

const DirectoryContent = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Active Directory Management</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Manage your Active Directory infrastructure, users, and domain controllers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Domain Users', value: '1,245', icon: 'fas fa-users', color: 'blue' },
                { title: 'Domain Computers', value: '847', icon: 'fas fa-desktop', color: 'emerald' },
                { title: 'Security Groups', value: '156', icon: 'fas fa-shield-alt', color: 'purple' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-${stat.color}-500 rounded-xl shadow-lg`}>
                      <i className={`${stat.icon} text-white text-xl`}></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryContent;
