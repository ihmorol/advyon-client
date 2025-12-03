import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { motion } from 'framer-motion'

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  return (
    <div className="min-h-screen bg-[#1C4645] text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 relative">
        {/* Animated Placeholder for the fixed sidebar width */}
        <motion.div 
          initial={{ width: 80 }}
          animate={{ width: isSidebarCollapsed ? 80 : 250 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:block shrink-0" 
        />
        
        <Sidebar 
          className="hidden md:flex" 
          isCollapsed={isSidebarCollapsed}
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
        />
        
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] relative z-10">
           {/* Background Effects */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#1C4645] via-[#153433] to-[#0f2524] -z-10 fixed"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10 mix-blend-overlay fixed"></div>
           
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
