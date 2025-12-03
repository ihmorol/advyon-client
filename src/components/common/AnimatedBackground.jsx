import FloatingParticles from '@/features/auth/components/FloatingParticles';
import MouseSpotlight from '@/features/auth/components/MouseSpotlight';
import React from 'react';

const AnimatedBackground = () => {
  return (
    <>
      {/* 1. Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C4645] via-[#153433] to-[#0f2524] z-0"></div>

      {/* 2. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#3A7573 1px, transparent 1px), linear-gradient(90deg, #3A7573 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* 3. Animated Elements */}
      <FloatingParticles />
      <MouseSpotlight />
    </>
  );
};

export default AnimatedBackground;
