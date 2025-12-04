import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WaterWaveEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-20), newRipple]); // Keep last 20 ripples
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cleanup old ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) => prev.filter((ripple) => Date.now() - ripple.id < 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ 
              opacity: 0.5, 
              scale: 0,
              x: ripple.x,
              y: ripple.y,
            }}
            animate={{ 
              opacity: 0, 
              scale: 2,
              transition: { duration: 1, ease: "easeOut" }
            }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid rgba(58, 117, 115, 0.5)',
              backgroundColor: 'rgba(58, 117, 115, 0.1)',
              transform: 'translate(-50%, -50%)', // Center the ripple
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WaterWaveEffect;
