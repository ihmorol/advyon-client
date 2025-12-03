import RippleBackground from './RippleBackground';
import FloatingParticles from '../../features/auth/components/FloatingParticles';
import { cn } from "@/lib/utils";

const DynamicBackground = ({ children, className }) => {
  return (
    <div className={cn("relative min-h-screen w-full bg-[#1C4645] text-white overflow-hidden flex items-center justify-center selection:bg-[#3A7573] selection:text-white", className)}>
      
      {/* 1. WebGL Ripple Background (Replaces static gradient and grid) */}
      <RippleBackground />

      {/* 2. Animated Elements (Particles add depth on top of the ripples) */}
      <FloatingParticles />

      {/* 3. Content */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
