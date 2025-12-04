import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const Dashboard = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <p className="text-[#B0C4C3]">
          Welcome back to your dashboard.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", sub: "+20.1% from last month", icon: "dollar" },
          { title: "Subscriptions", value: "+2350", sub: "+180.1% from last month", icon: "users" },
          { title: "Sales", value: "+12,234", sub: "+19% from last month", icon: "credit-card" },
          { title: "Active Now", value: "+573", sub: "+201 since last hour", icon: "activity" }
        ].map((card, index) => (
          <motion.div key={index} variants={item}>
            <Card className="bg-[#1C4645]/50 border-[#3A7573]/30 backdrop-blur-sm text-white hover:bg-[#3A7573]/10 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#B0C4C3]">
                  {card.title}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-[#5cdbd6]"
                >
                  {card.icon === "dollar" && <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />}
                  {card.icon === "users" && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {card.icon === "credit-card" && <><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></>}
                  {card.icon === "activity" && <path d="M22 12h-4l-3 9L9 3l-3 9H2" />}
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-[#B0C4C3]/70">
                  {card.sub}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Dashboard
