
import React from 'react';

const MainContent = ({ activeTab }) => {
  const getTabContent = () => {
    switch (activeTab) {
      case 'dashboards':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Dashboard Overview</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Create and manage your dashboards with powerful analytics tools and real-time insights.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Users', value: '2,847', change: '+12%', icon: 'fas fa-users', color: 'blue', bg: 'from-blue-500 to-blue-600' },
                { title: 'Active Sessions', value: '1,234', change: '+5%', icon: 'fas fa-chart-line', color: 'emerald', bg: 'from-emerald-500 to-emerald-600' },
                { title: 'Revenue', value: '$45,320', change: '+8%', icon: 'fas fa-dollar-sign', color: 'purple', bg: 'from-purple-500 to-purple-600' },
                { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: 'fas fa-percentage', color: 'orange', bg: 'from-orange-500 to-orange-600' }
              ].map((stat, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-gradient-to-br ${stat.bg} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <i className={`${stat.icon} text-white text-xl`}></i>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'fas fa-plus-circle', label: 'Create Dashboard', color: 'blue' },
                  { icon: 'fas fa-chart-bar', label: 'View Analytics', color: 'emerald' },
                  { icon: 'fas fa-download', label: 'Export Data', color: 'purple' },
                  { icon: 'fas fa-cog', label: 'Settings', color: 'gray' }
                ].map((action, index) => (
                  <button key={index} className={`p-4 rounded-xl border-2 border-gray-100 hover:border-${action.color}-200 hover:bg-${action.color}-50 transition-all duration-200 text-center group`}>
                    <i className={`${action.icon} text-2xl text-${action.color}-600 mb-2 group-hover:scale-110 transition-transform duration-200`}></i>
                    <p className="text-sm font-medium text-gray-700">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'directory':
        return (
          <div>
            <h1>Directory Management</h1>
          </div>
        );
      
      case 'aws':
        return (
          <div>
            <h1>Aws management</h1>
          </div>
        );
      
      case 'azure':
        return (
          <div>
            <h1>azure management</h1>
          </div>
        );
      
      case 'forensics':
        return (
          <div className="space-y-8">
            <h1>Forensics management</h1>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">
              <i className="fas fa-mouse-pointer"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-600">Select a tab to view content</h3>
            <p className="text-gray-500 mt-2">Choose from the navigation above to explore different sections</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
