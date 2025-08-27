
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import ForestRecovery from './components/ForestRecovery';
import DirectoryContent from './components/DirectoryContent';
import AWSContent from './components/AWSContent';
import AzureContent from './components/AzureContent';
import ForensicsContent from './components/ForensicsContent';

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<ForestRecovery />} />
          <Route path="/dashboards" element={<ForestRecovery />} />
          <Route path="/directory" element={<DirectoryContent />} />
          <Route path="/aws" element={<AWSContent />} />
          <Route path="/azure" element={<AzureContent />} />
          <Route path="/forensics" element={<ForensicsContent />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
