import React from 'react';
import { motion } from 'framer-motion';

// Widget için animasyon varyantları (giriş animasyonu)
const widgetVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 20 }
  },
};

const OrganicWidget = ({ children, className = "", status = 'ok', onHoverStart, onHoverEnd }) => {
  // Duruma göre stil belirle
  const isError = status === 'error';
  const borderColor = isError ? 'border-eco-error' : 'border-eco-border';
  const shadowColor = isError ? 'shadow-glow-error' : 'shadow-glow-sky';

  return (
    <motion.div
      className={`relative bg-black/40 backdrop-blur-lg border ${borderColor} shadow-lg overflow-hidden 
                 ${className}`}
      // Organik şekil için çok yüksek border-radius
      style={{ borderRadius: '50px' }} 
      variants={widgetVariants} // Giriş animasyonu için
      // Idle "nefes alma" animasyonu (Tailwind'den)
      // animate={!isError ? "breathe" : ""} // Sadece hata yoksa nefes alsın
      // VEYA Framer Motion ile:
      animate={{ 
          scale: [1, 1.02, 1], 
          opacity: [0.8, 1, 0.8],
          boxShadow: isError ? ['0 0 15px rgba(244, 63, 94, 0.4)', '0 0 30px rgba(244, 63, 94, 0.7)', '0 0 15px rgba(244, 63, 94, 0.4)'] 
                             : ['0 0 10px rgba(14, 165, 233, 0.3)', '0 0 20px rgba(14, 165, 233, 0.5)', '0 0 10px rgba(14, 165, 233, 0.3)']
      }}
      transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          // Hata durumunda renk geçişi için
          backgroundColor: { duration: 0.5 },
          borderColor: { duration: 0.5 },
      }}
      // Hover efektleri
      whileHover={{ 
        scale: 1.05, // Hafifçe büyüt
        boxShadow: isError ? '0 0 40px rgba(244, 63, 94, 0.8)' : '0 0 30px rgba(14, 165, 233, 0.6)', // Parlamayı artır
        zIndex: 10, // Öne çıkar
      }}
      // Hover başlangıç/bitiş olaylarını parent'a bildir (komşu itme için hazırlık)
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* İçerik */}
      <div className="p-4 md:p-6 h-full relative z-[1]"> 
        {children || <p className="text-gray-500 text-center italic">Widget Content</p>}
      </div>

      {/* İsteğe Bağlı: Hata durumunda titreme efekti */}
      {isError && (
        <motion.div 
           className="absolute inset-0 border-2 border-eco-error rounded-[50px] pointer-events-none"
           animate={{ opacity: [0, 0.7, 0, 0.5, 0] }}
           transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default OrganicWidget;