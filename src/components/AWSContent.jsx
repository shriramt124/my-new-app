
import React from 'react';

const AWSContent = ({ isCollapsed }) => {
  return (
    <div className={`flex-1 overflow-y-auto bg-gradient-to-br from-cyber-black via-cyber-darker to-cyber-black min-h-screen pt-32 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cyber-light mb-3">AWS Management</h2>
              <p className="text-lg text-cyber-light/70 max-w-2xl mx-auto">Manage your AWS cloud resources and services from a unified interface.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'EC2 Instances', value: '24', icon: 'fas fa-server', color: 'cyber-teal' },
                { title: 'S3 Buckets', value: '12', icon: 'fas fa-cube', color: 'cyber-accent' },
                { title: 'RDS Databases', value: '6', icon: 'fas fa-database', color: 'cyber-success' },
                { title: 'Lambda Functions', value: '38', icon: 'fas fa-code', color: 'cyber-purple' }
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

export default AWSContent;
