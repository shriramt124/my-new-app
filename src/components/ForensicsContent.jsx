
import React from 'react';

const ForensicsContent = ({ isCollapsed }) => {
  return (
    <div className={`flex-1 overflow-y-auto bg-gradient-to-br from-cyber-black via-cyber-darker to-cyber-black min-h-screen pt-32 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Digital Forensics</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Conduct digital investigations and manage forensic evidence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Active Cases', value: '12', icon: 'fas fa-folder-open', color: 'cyber-danger' },
                { title: 'Evidence Items', value: '348', icon: 'fas fa-file-archive', color: 'cyber-accent' },
                { title: 'Reports Generated', value: '67', icon: 'fas fa-file-alt', color: 'cyber-success' },
                { title: 'Analysis Hours', value: '1,245', icon: 'fas fa-clock', color: 'cyber-purple' }
              ].map((stat, index) => (
                <div key={index} className="stat-card transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-cyber-light/70 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-cyber-light">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-${stat.color} rounded-xl shadow-cyber-sm`}>
                      <i className={`${stat.icon} text-cyber-black text-xl`}></i>
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

export default ForensicsContent;
