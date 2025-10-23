import React, { useState, useRef, createRef } from 'react';
import { motion } from 'framer-motion';
import OrganicWidget from '../components/OrganicWidget';
import ConnectionLine from '../components/ConnectionLine';

// Dashboard için animasyon variantları
const dashboardVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      // Widgetların aynı anda başlaması için stagger'ı düşür
      staggerChildren: 0.1 
    } 
  },
};

const EcosystemDashboardPage = () => {
  // Widgetların durumunu tutalım (örnek)
  const [widgetStatus, setWidgetStatus] = useState({
    'users': 'ok',
    'sessions': 'ok',
    'errors': 'ok', // Başlangıçta 'ok'
    'revenue': 'ok',
  });

  // Widget DOM elementlerine referanslar oluşturmak için
  // useRef'leri bir map içinde tutalım
  const widgetRefs = useRef({});
  const widgetIds = ['users', 'sessions', 'errors', 'revenue'];
  widgetIds.forEach(id => {
    widgetRefs.current[id] = widgetRefs.current[id] || createRef();
  });

  // Bağlantıları tanımla: [fromId, toId]
  const connections = [
    ['users', 'sessions'],
    ['sessions', 'errors'],
    ['sessions', 'revenue'],
  ];

  // Örnek: Hata durumunu değiştirmek için bir fonksiyon (test için)
  const toggleErrorStatus = () => {
    setWidgetStatus(prev => ({
      ...prev,
      errors: prev.errors === 'ok' ? 'error' : 'ok',
      // Hata varsa session'ları da etkileyebiliriz (isteğe bağlı)
      sessions: prev.errors === 'ok' ? 'warning' : 'ok', 
    }));
  };
  
  // Komşu itme efekti için (basitleştirilmiş - sadece state tutar)
  const [hoveredWidget, setHoveredWidget] = useState(null);

  return (
    // Ana container, widgetları serbestçe konumlandırabilmek için relative
    <div className="relative w-screen h-screen p-8 md:p-16 overflow-hidden"> 
      
      {/* Bağlantı Çizgileri (Widgetların arkasında, z-0) */}
      {connections.map(([fromId, toId]) => (
        <ConnectionLine 
          key={`${fromId}-${toId}`}
          fromRef={widgetRefs.current[fromId]}
          toRef={widgetRefs.current[toId]}
          // Çizginin durumu, bağlandığı widget'ların durumuna bağlı olabilir
          // Şimdilik basitçe 'to' widget'ının durumunu alalım
          status={widgetStatus[toId]} 
        />
      ))}

      {/* Widgetları yerleştirmek için absolute pozisyonlama kullanacağız */}
      {/* Veya daha dinamik bir layout kütüphanesi kullanılabilir */}
      <motion.div 
        className="relative w-full h-full"
        variants={dashboardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Kullanıcılar Widget'ı */}
        <motion.div 
          ref={widgetRefs.current['users']}
          className="absolute top-[10%] left-[10%] w-[250px] h-[150px]"
          // Komşu itme efekti (çok basit simülasyon)
          animate={{ scale: hoveredWidget && hoveredWidget !== 'users' ? 0.95 : 1 }}
        >
          <OrganicWidget 
            status={widgetStatus['users']}
            onHoverStart={() => setHoveredWidget('users')}
            onHoverEnd={() => setHoveredWidget(null)}
          >
            <h3 className="text-lg font-semibold text-white mb-2">New Users</h3>
            <p className="text-3xl font-bold text-eco-pulse">1,234</p>
          </OrganicWidget>
        </motion.div>

        {/* Oturumlar Widget'ı */}
        <motion.div 
          ref={widgetRefs.current['sessions']}
          className="absolute top-[30%] left-[40%] w-[300px] h-[200px]"
          animate={{ scale: hoveredWidget && hoveredWidget !== 'sessions' ? 0.95 : 1 }}
        >
          <OrganicWidget 
            status={widgetStatus['sessions']}
             onHoverStart={() => setHoveredWidget('sessions')}
            onHoverEnd={() => setHoveredWidget(null)}
          >
             <h3 className="text-lg font-semibold text-white mb-2">Active Sessions</h3>
             <p className="text-4xl font-bold text-eco-pulse">5,678</p>
          </OrganicWidget>
        </motion.div>

        {/* Hatalar Widget'ı */}
         <motion.div 
           ref={widgetRefs.current['errors']}
           className="absolute top-[15%] right-[15%] w-[200px] h-[120px]"
           animate={{ scale: hoveredWidget && hoveredWidget !== 'errors' ? 0.95 : 1 }}
         >
           <OrganicWidget 
             status={widgetStatus['errors']}
             onHoverStart={() => setHoveredWidget('errors')}
            onHoverEnd={() => setHoveredWidget(null)}
           >
             <h3 className="text-md font-semibold text-white mb-1">Errors</h3>
             <p className={`text-2xl font-bold ${widgetStatus['errors'] === 'error' ? 'text-eco-error animate-pulse' : 'text-eco-pulse'}`}>
               {widgetStatus['errors'] === 'error' ? 15 : 2}
             </p>
           </OrganicWidget>
         </motion.div>

        {/* Gelir Widget'ı */}
         <motion.div 
           ref={widgetRefs.current['revenue']}
           className="absolute bottom-[20%] right-[30%] w-[280px] h-[180px]"
           animate={{ scale: hoveredWidget && hoveredWidget !== 'revenue' ? 0.95 : 1 }}
         >
           <OrganicWidget 
             status={widgetStatus['revenue']}
             onHoverStart={() => setHoveredWidget('revenue')}
             onHoverEnd={() => setHoveredWidget(null)}
           >
             <h3 className="text-lg font-semibold text-white mb-2">Revenue (Today)</h3>
             <p className="text-3xl font-bold text-green-400">$9,876</p>
           </OrganicWidget>
         </motion.div>
        
      </motion.div>

      {/* Test Butonu */}
      <button 
        onClick={toggleErrorStatus}
        className="fixed bottom-5 right-5 z-20 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700"
      >
        Toggle Error State
      </button>

    </div>
  );
};

export default EcosystemDashboardPage;