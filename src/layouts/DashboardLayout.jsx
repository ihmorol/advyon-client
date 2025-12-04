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
        
        <main className="flex-1 pr-3 pb-3 overflow-y-auto h-[calc(100vh-4rem)] relative z-10">
           {/* Background Effects */}
           <div className="absolute inset-0 bg-primary -z-10 fixed"></div>
           
          <div className="bg-white rounded-2xl shadow-2xl min-h-full p-6 text-gray-800">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
