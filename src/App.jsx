
import React, { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import ForestRecovery from './components/ForestRecovery';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboards');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'dashboards' ? <ForestRecovery /> : <MainContent activeTab={activeTab} />}
    </div>
  );
};

export default App;
