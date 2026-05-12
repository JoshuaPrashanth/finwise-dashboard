'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Bell, TrendingUp, CreditCard, User } from 'lucide-react'

const navItems = [
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Market', href: '/market', icon: TrendingUp },
  { name: 'Home', href: '/', icon: Home },
  { name: 'Credit', href: '/credit', icon: CreditCard },
  { name: 'Status', href: '/status', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/90 backdrop-blur-md border-t border-[#1e293b] z-40 md:hidden">
      <div className="flex justify-evenly items-stretch">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-xl transition-all duration-150 active:scale-95"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <item.icon
                  size={22}
                  className={`transition-colors ${
                    isActive ? 'text-[#0ea5e9]' : 'text-[#94a3b8]'
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-[#0ea5e9]' : 'text-[#94a3b8]'
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-2 w-1 h-1 bg-[#0ea5e9] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}