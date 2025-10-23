import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const QuantumWidget = ({ children, className = "", isFocused }) => {
  const ref = useRef(null); 

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Yumuşatma ayarları aynı kalabilir veya biraz düşürülebilir
  const smoothOptions = { damping: 25, stiffness: 200, mass: 0.1 }; 
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - left - width / 2) / (width / 2));
    mouseY.set((event.clientY - top - height / 2) / (height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 1. GÜNCELLEME: Eğim Açısını Çok Daha Fazla Artır
  // Önceden: [-1, 1], [15, -15] idi, şimdi [-1, 1], [30, -30] yapalım
  const rotateX = useTransform(smoothMouseY, [-1, 1], [30, -30]); // Max 30 derece eğim
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-30, 30]); // Max 30 derece eğim

  return (
    <motion.div
      ref={ref}
      className={`relative bg-black/30 backdrop-blur-md rounded-xl border border-widget-border shadow-lg overflow-hidden ${className}`}
      style={{
        perspective: '1000px', 
        rotateX, // Çok daha büyük açılar kullanılacak
        rotateY, // Çok daha büyük açılar kullanılacak
        scale: isFocused ? 1.05 : 1, 
        zIndex: isFocused ? 10 : 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ 
        type: 'spring', 
        stiffness: 250, // Biraz daha sert yapalım
        damping: 25,   // Sönümlemeyi de ayarlayalım
      }}
    >
      {/* İçerik */}
      <div className="p-4 md:p-6 h-full">
         {children || <p className="text-gray-500 text-center italic">Widget İçeriği</p>}
      </div>

      {/* Odaklanınca kenar parlaması */}
       <motion.div 
         className="absolute inset-0 border-2 border-neon-cyan rounded-xl pointer-events-none"
         initial={{ opacity: 0 }}
         animate={{ opacity: isFocused ? 0.5 : 0 }} 
         transition={{ duration: 0.3 }}
         style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)' }} 
       />
    </motion.div>
  );
};

export default QuantumWidget;