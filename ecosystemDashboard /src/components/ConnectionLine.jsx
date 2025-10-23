import React from 'react';
import { motion } from 'framer-motion';

// Işık darbesi animasyonu için variantlar
const pulseVariants = {
  animate: {
    // SVG path üzerinde 0'dan 1'e git (pathLength ile kullanılır)
    offsetDistance: ["0%", "100%"], 
    opacity: [0.5, 1, 0.5], // Ortada parlaklaşsın
    transition: {
      duration: 2.5, // Hız (daha düşük = daha hızlı)
      repeat: Infinity,
      ease: "linear",
    }
  }
};

const ConnectionLine = ({ fromRef, toRef, status = 'ok' }) => {
  const [coords, setCoords] = React.useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  // Widget referansları değiştiğinde veya pencere yeniden boyutlandığında
  // çizgi koordinatlarını yeniden hesapla
  React.useEffect(() => {
    const calculateCoords = () => {
      if (fromRef.current && toRef.current) {
        const rect1 = fromRef.current.getBoundingClientRect();
        const rect2 = toRef.current.getBoundingClientRect();
        
        // Merkez noktalarını hesapla
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        
        setCoords({ x1, y1, x2, y2 });
      }
    };

    calculateCoords(); // İlk hesaplama
    
    // Resize observer veya basit window resize listener daha iyi olabilir
    // Şimdilik basit tutalım
    window.addEventListener('resize', calculateCoords);
    
    // Referanslar değişirse de hesapla (eğer widgetlar hareket ediyorsa önemli)
    const observer = new MutationObserver(calculateCoords);
    if(fromRef.current) observer.observe(fromRef.current, { attributes: true, attributeFilter: ['style'] });
    if(toRef.current) observer.observe(toRef.current, { attributes: true, attributeFilter: ['style'] });


    return () => {
      window.removeEventListener('resize', calculateCoords);
      observer.disconnect();
    };
  }, [fromRef, toRef]); 

  // Duruma göre çizgi rengi
  const strokeColor = status === 'error' ? 'url(#errorGradient)' : 'url(#normalGradient)';
  const pulseColor = status === 'error' ? 'rgba(244, 63, 94, 0.8)' : '#67E8F9'; // eco-pulse

  return (
    // SVG elementi tüm ekranı kaplasın, çizgiler absolute pozisyonlu olsun
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[0]"> 
      {/* Renk Gradient Tanımları */}
       <defs>
         <linearGradient id="normalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
           <stop offset="0%" style={{stopColor: '#38BDF8', stopOpacity: 0.5}} />
           <stop offset="100%" style={{stopColor: '#A78BFA', stopOpacity: 0.5}} />
         </linearGradient>
         <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
           <stop offset="0%" style={{stopColor: '#F43F5E', stopOpacity: 0.6}} />
           <stop offset="100%" style={{stopColor: '#FBBF24', stopOpacity: 0.6}} /> 
         </linearGradient>
       </defs>

      {/* Sabit Bağlantı Çizgisi */}
      <motion.line
        x1={coords.x1}
        y1={coords.y1}
        x2={coords.x2}
        y2={coords.y2}
        stroke={strokeColor}
        strokeWidth="2"
        // strokeDasharray="5 5" // İsteğe bağlı: kesikli çizgi
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }} // Giriş animasyonu
      />

      {/* Hareket Eden Işık Darbesi (Sadece hata yoksa) */}
      {status !== 'error' && (
        // motion.path kullanarak çizgi üzerinde hareket etme
         <motion.circle 
           cx="0" cy="0" r="4" 
           fill={pulseColor}
           variants={pulseVariants}
           animate="animate"
           style={{ 
             offsetPath: `path('M ${coords.x1},${coords.y1} L ${coords.x2},${coords.y2}')`,
             filter: 'blur(2px)'
           }} 
         />
        // Veya stroke-dashoffset ile (daha basit ama daha az esnek):
        /*
        <motion.line
          x1={coords.x1} y1={coords.y1} x2={coords.x2} y2={coords.y2}
          stroke={pulseColor} strokeWidth="3"
          strokeDasharray="10 500" // Kısa çizgi, uzun boşluk
          initial={{ strokeDashoffset: 510 }} // Başlangıçta görünmez
          animate={{ strokeDashoffset: -510 }} // Sona doğru hareket et
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        */
      )}
    </svg>
  );
};

export default ConnectionLine;