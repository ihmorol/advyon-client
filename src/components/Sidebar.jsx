import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Cases",
    href: "/dashboard/cases",
    icon: FileText,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar({ className, isCollapsed, onMouseEnter, onMouseLeave }) {
  const location = useLocation()

  return (
    <motion.div 
      initial={{ width: 80 }}
      animate={{ width: isCollapsed ? 80 : 250 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 border-r border-[#3A7573]/30 bg-[#1C4645] text-white flex flex-col shadow-2xl",
        className
      )}
    >
      <div className="flex-1 py-6 flex flex-col gap-2 overflow-hidden">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className="relative flex items-center px-4 py-3 mx-2 rounded-lg transition-colors group hover:bg-[#3A7573]/20"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#3A7573]/30 rounded-lg border border-[#3A7573]/50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="min-w-[20px] flex justify-center">
                <item.icon className={cn(
                  "h-5 w-5 z-10 transition-colors",
                  isActive ? "text-[#5cdbd6]" : "text-[#B0C4C3] group-hover:text-white"
                )} />
              </div>
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "ml-3 text-sm font-medium z-10 whitespace-nowrap overflow-hidden",
                      isActive ? "text-white" : "text-[#B0C4C3] group-hover:text-white"
                    )}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {isCollapsed && isActive && (
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5cdbd6] rounded-r-full" />
              )}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-[#3A7573]/30 overflow-hidden">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start hover:bg-[#3A7573]/20 hover:text-white text-[#B0C4C3] px-2",
            isCollapsed && "justify-center"
          )}
        >
          <HelpCircle className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 whitespace-nowrap"
              >
                Help Center
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  )
}
