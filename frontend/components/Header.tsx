'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import HamburgerMenu from './HamburgerMenu'

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Capitalize first letter of username
  const displayName = user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Account'

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-sm border-b border-[#1e293b]">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HamburgerMenu />
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#f97316] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">₹</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">Finwise</span>
            </div>
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2d3a4e] transition px-3 py-1.5 rounded-full text-white border border-[#334155] text-sm"
          >
            <User size={16} />
            <span className="hidden sm:inline">{displayName}</span>
          </button>

          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-40 bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-lg py-1 z-50"
            >
              <Link href="/status">
                <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-[#1e293b] text-white text-sm">
                  <User size={14} /> Profile
                </button>
              </Link>
              <Link href="/settings">
                <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-[#1e293b] text-white text-sm">
                  <Settings size={14} /> Settings
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 w-full hover:bg-[#1e293b] text-red-400 text-sm"
              >
                <LogOut size={14} /> Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}