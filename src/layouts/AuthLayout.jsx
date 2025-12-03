import { Outlet } from "react-router-dom";
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import MouseSpotlight from '../features/auth/components/MouseSpotlight';
import FloatingParticles from '../features/auth/components/FloatingParticles';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen w-full bg-[#1C4645] text-white overflow-hidden flex items-center justify-center selection:bg-[#3A7573] selection:text-white">
      
      {/* 1. Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C4645] via-[#153433] to-[#0f2524] z-0"></div>
      
      {/* 2. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#3A7573 1px, transparent 1px), linear-gradient(90deg, #3A7573 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* 3. Animated Elements */}
      <FloatingParticles />
      <MouseSpotlight />

      {/* 4. Main Content Container */}
      <div className="relative container mx-auto px-4 z-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 h-full">
        
        {/* Left Side: Brand & Marketing (Hidden on small mobile for focus) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block max-w-lg"
        >
          <div className="flex items-center gap-3 mb-6">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3A7573] to-[#5cdbd6] flex items-center justify-center shadow-2xl shadow-[#3A7573]/30 border border-white/10">
                <span className="font-bold text-2xl text-white">A</span>
             </div>
             <h1 className="text-4xl font-bold tracking-tight text-white">ADVYON</h1>
          </div>
          
          <h2 className="text-5xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B0C4C3] to-white/50">
            Future of Legal <br/> Intelligence.
          </h2>
          
          <p className="text-lg text-[#B0C4C3] mb-8 leading-relaxed">
            Experience the next generation of case management. 
            AI-driven insights, secure document handling, and seamless collaboration.
          </p>

          <div className="flex items-center gap-4 text-sm font-medium text-[#3A7573]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C4645]/50 border border-[#3A7573]/30 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4" /> AI Powered
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C4645]/50 border border-[#3A7573]/30 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4" /> Bank-Grade Security
            </div>
          </div>
        </motion.div>

        {/* Right Side: Login Card (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="relative group">
            {/* Glowing Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3A7573] to-[#5cdbd6] rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
            <Outlet />
          </div>
          
          <p className="text-center text-xs text-white/30 mt-8">
            © 2025 Advyon Inc. All rights reserved.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
