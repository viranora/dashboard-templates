import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuantumWidget from '../components/QuantumWidget';

// Dashboard için animasyon variantları (isteğe bağlı)
const dashboardVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      delayChildren: 0.2, 
      staggerChildren: 0.1 
    } 
  },
};

const QuantumDashboardPage = () => {
  // Hangi widget'ın üzerine gelindiğini takip etmek için state
  // null = hiçbirinin üzerinde değil
  const [focusedIndex, setFocusedIndex] = useState(null); 

  // Örnek widget verileri (içerik ve grid pozisyonu)
  const widgets = [
    { id: 'w1', content: 'Widget 1: Overview', gridClass: 'col-span-2 row-span-1' },
    { id: 'w2', content: 'Widget 2: Stats', gridClass: 'col-span-1 row-span-1' },
    { id: 'w3', content: 'Widget 3: Chart', gridClass: 'col-span-1 row-span-2' },
    { id: 'w4', content: 'Widget 4: Feed', gridClass: 'col-span-2 row-span-1' },
    { id: 'w5', content: 'Widget 5: Quick Actions', gridClass: 'col-span-1 row-span-1' },
  ];

  return (
    // Ana container, padding ve perspective sağlar
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 perspective-container" style={{ perspective: '2000px' }}> 
      
      <motion.div 
        className="grid grid-cols-3 grid-rows-3 gap-4 md:gap-6 w-full max-w-4xl h-[70vh] md:h-[80vh]"
        variants={dashboardVariants}
        initial="hidden"
        animate="visible"
      >
        {widgets.map((widget, index) => (
          <div
            key={widget.id}
            className={widget.gridClass} // Grid pozisyonunu ayarla
            // Fare bu alana girdiğinde/çıktığında focus state'ini güncelle
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(null)}
          >
            <QuantumWidget 
              // isFocused prop'unu hesapla:
              // focusedIndex null ise (kimse focuslu değilse) true
              // Değilse, sadece bu widget focuslu ise true
              isFocused={focusedIndex === null ? true : focusedIndex === index}
              className="h-full" // Widget'ın grid alanını doldurmasını sağla
            >
              {/* Widget içeriğini buraya yerleştir */}
              <div className="flex items-center justify-center h-full">
                <p className="text-xl font-semibold text-gray-300">{widget.content}</p>
              </div>
            </QuantumWidget>
          </div>
        ))}
      </motion.div>
      
    </div>
  );
};

export default QuantumDashboardPage;