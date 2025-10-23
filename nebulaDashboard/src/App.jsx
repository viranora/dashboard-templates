import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataNebulaPage from './pages/DataNebulaPage'; // 1. YENİ IMPORT

// Önceki sayfaların importlarını kaldırın

function App() {
  return (
    <Routes>
      {/* Ana sayfa olarak Veri Nebulası sayfasını ayarla */}
      <Route path="/" element={<DataNebulaPage />} /> 

      {/* Bu projede başka rota yok */}
    </Routes>
  );
}

export default App;