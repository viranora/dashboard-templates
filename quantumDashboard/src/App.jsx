import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuantumDashboardPage from './pages/QuantumDashboardPage'; // 1. YENİ IMPORT


function App() {
  return (
    <Routes>
      {/* Ana sayfa olarak Kuantum Dashboard sayfasını ayarla */}
      <Route path="/" element={<QuantumDashboardPage />} /> 

      {/* Bu projede başka rota yok */}
    </Routes>
  );
}

export default App;