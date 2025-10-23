import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Rastgele sayı
const random = (min, max) => Math.random() * (max - min) + min;

const Particle = ({ mouseX, mouseY, windowWidth, windowHeight }) => {
  
  // Parçacığın kendine özgü özelliklerini SADECE İLK RENDER'DA belirle (useMemo)
  const properties = useMemo(() => ({
    size: random(3, 8),      // Boyut (3px - 8px)
    // Renk: Mavi, Mor veya Pembe tonlarından biri
    color: ['bg-particle-blue', 'bg-particle-purple', 'bg-particle-pink'][Math.floor(random(0, 3))],
    // Başlangıç Pozisyonu (Ekranın herhangi bir yeri)
    initialX: random(0, windowWidth),
    initialY: random(0, windowHeight),
    // Hafif Sürekli Hareket Hızı ve Yönü
    driftX: random(-0.1, 0.1), 
    driftY: random(-0.1, 0.1),
    // Fareye Tepki Gecikmesi (düşük = hızlı tepki)
    lag: random(1, 10), 
    opacity: random(0.3, 0.8), // Şeffaflık
  }), [windowWidth, windowHeight]); // Pencere boyutu değişirse yeniden hesapla

  // Parçacığın mevcut pozisyonunu tutan motion value'lar
  // Başlangıçta rastgele pozisyonda başlasın
  const particleX = useMotionValue(properties.initialX);
  const particleY = useMotionValue(properties.initialY);

  // Fare etkileşimini yumuşatmak için spring
  const springConfig = { damping: 40, stiffness: 50 - properties.lag * 3, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Fare yakınsa parçacığı iten güç hesaplaması
  const repelForce = useTransform(
    // Hem X hem de Y mesafesini kullanarak toplam mesafeyi hesapla
    [smoothMouseX, smoothMouseY], 
    ([latestMouseX, latestMouseY]) => {
      const currentX = particleX.get();
      const currentY = particleY.get();
      const dx = currentX - latestMouseX;
      const dy = currentY - latestMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100; // Etkileşim mesafesi
      
      if (distance < maxDistance) {
        // Mesafe azaldıkça itme gücü (ters yönde) artsın
        const force = (1 - distance / maxDistance) * 30; // Max 30px itme
        const angle = Math.atan2(dy, dx); // İtme açısı
        return { 
          x: Math.cos(angle) * force, 
          y: Math.sin(angle) * force 
        };
      }
      return { x: 0, y: 0 }; // Mesafe dışındaysa itme yok
    }
  );

  // Parçacığın pozisyonunu sürekli güncelle (drift + repel)
  useEffect(() => {
    // Basit bir animasyon döngüsü simülasyonu
    let animationFrameId;
    const update = () => {
      const currentRepel = repelForce.get();
      let newX = particleX.get() + properties.driftX + currentRepel.x;
      let newY = particleY.get() + properties.driftY + currentRepel.y;

      // Ekran sınırlarından dışarı çıkarsa ters taraftan geri getir (wrap around)
      if (newX < 0) newX = windowWidth;
      if (newX > windowWidth) newX = 0;
      if (newY < 0) newY = windowHeight;
      if (newY > windowHeight) newY = 0;

      particleX.set(newX);
      particleY.set(newY);
      animationFrameId = requestAnimationFrame(update);
    };
    
    animationFrameId = requestAnimationFrame(update);
    
    return () => cancelAnimationFrame(animationFrameId); // Component kaldırıldığında döngüyü durdur

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repelForce, properties.driftX, properties.driftY, windowWidth, windowHeight]); // Bağımlılıkları dikkatli ayarla


  return (
    <motion.div
      className={`absolute rounded-full ${properties.color}`}
      style={{
        width: properties.size,
        height: properties.size,
        opacity: properties.opacity,
        // Doğrudan motion value'ları kullan
        x: particleX, 
        y: particleY,
        // İsteğe bağlı: Parlama efekti
        // filter: 'blur(1px)', 
        // boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
      }}
      // Başlangıç animasyonu (isteğe bağlı)
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: random(0.5, 1.5), delay: random(0, 1) }}
    />
  );
};

export default Particle;