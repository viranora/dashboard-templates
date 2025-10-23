import React, { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Particle from '../components/Particle';

// Pencere boyutunu almak için hook (Particle'da da var, belki tek bir yerden import edilebilir)
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize(); 
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const DataNebulaPage = () => {
  // Fare pozisyonunu takip et
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Pencere boyutunu al
  const [windowWidth, windowHeight] = useWindowSize(); 

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Oluşturulacak parçacık sayısı
  const particleCount = 150; // Performansa göre ayarlayın

  // useMemo ile parçacık listesini sadece bir kere oluştur
  const particles = useMemo(() => 
    Array.from({ length: particleCount }).map((_, i) => (
      <Particle 
        key={i} 
        mouseX={mouseX} 
        mouseY={mouseY}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    // eslint-disable-next-line react-hooks/exhaustive-deps
    )), [particleCount, windowWidth, windowHeight]); // Boyut değişirse yeniden oluştur

  return (
    // Ana container, tam ekranı kaplar
    <div className="fixed inset-0 z-0 bg-space-bg"> 
      {/* Pencere boyutu hazırsa parçacıkları render et */}
      {windowWidth > 0 && windowHeight > 0 && particles}

      {/* İsteğe Bağlı: Kontrol Paneli Alanı (Gelecekte Eklenebilir) */}
      {/* <motion.div 
        className="absolute top-4 left-4 z-10 p-4 bg-black/50 backdrop-blur-md rounded-lg border border-white/10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-white mb-2">Controls</h2>
        <p className="text-sm text-gray-400">Filters coming soon...</p>
      </motion.div> 
      */}

       {/* İsteğe Bağlı: Ortada Başlık */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-5]">
         <motion.h1 
           className="text-6xl md:text-8xl font-thin text-white/10 tracking-widest"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 2 }}
         >
           NEBULA
         </motion.h1>
       </div>

    </div>
  );
};

export default DataNebulaPage;