'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Bell, TrendingUp, CreditCard, User, LogOut, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Market', href: '/market', icon: TrendingUp },
  { name: 'Credit Score', href: '/credit', icon: CreditCard },
  { name: 'Status', href: '/status', icon: User },
]

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)
  const openMenu = () => setIsOpen(true)

  const menuContent = isOpen && mounted ? createPortal(
    <>
      {/* Overlay: very blurry, but only slightly dark (so background is unreadable but not black) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-2xl z-[9998]"
        onClick={closeMenu}
      />

      {/* Menu panel – slides from left */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-[#0f172a] shadow-2xl z-[9999] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#1e293b]">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#0ea5e9] to-[#f97316] bg-clip-text text-transparent">
              Finwise
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1">Financial Dashboard</p>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-full hover:bg-[#1e293b] transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Navigation – no profile section */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0ea5e9]/10 to-[#0c4e6e]/10 text-white border-l-2 border-[#0ea5e9]'
                    : 'text-[#cbd5e1] hover:bg-white/5'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-[#0ea5e9]' : 'text-[#94a3b8] group-hover:text-white'} />
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-5 border-t border-[#1e293b] space-y-2">
          <button className="flex items-center gap-3 px-4 py-2 w-full rounded-xl text-[#cbd5e1] hover:bg-white/5 transition-colors text-sm">
            <Settings size={18} />
            Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-2 w-full rounded-xl text-red-400 hover:bg-white/5 transition-colors text-sm">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.aside>
    </>,
    document.body
  ) : null

  return (
    <>
      <button
        onClick={openMenu}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#1e293b] hover:bg-[#0ea5e9] transition-all duration-200 shadow-md"
        aria-label="Menu"
      >
        <Menu size={20} className="text-white" />
      </button>
      {menuContent}
    </>
  )
}