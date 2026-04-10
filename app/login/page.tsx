'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const success = login(username, password)
    if (success) {
      router.push('/')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] rounded-2xl p-8 w-full max-w-md border border-[#1e293b]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#f97316] flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">₹</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome Back</h2>
        <p className="text-[#94a3b8] text-center mb-6">Sign in to your Finwise account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#cbd5e1] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#0ea5e9]"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#cbd5e1] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#0ea5e9]"
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#f97316] text-black font-semibold py-2 rounded-xl hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-[#94a3b8]">
          Demo accounts: arun/arun123, rahul/pass123, anita/welcome1, etc.
        </div>
      </motion.div>
    </div>
  )
}