import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EcosystemDashboardPage from './pages/EcosystemDashboardPage'; // 1. YENİ IMPORT

// Önceki sayfaların importlarını kaldırın

function App() {
  return (
    <Routes>
      {/* Ana sayfa olarak Ekosistem Dashboard sayfasını ayarla */}
      <Route path="/" element={<EcosystemDashboardPage />} /> 

      {/* Bu projede başka rota yok */}
    </Routes>
  );
}

export default App;