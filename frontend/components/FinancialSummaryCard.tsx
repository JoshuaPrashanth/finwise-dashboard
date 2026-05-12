'use client'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function FinancialSummaryCard() {
  const { userData } = useAuth()
  if (!userData) return null

  const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#0ea5e9] transition-all"
    >
      <h3 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#f97316] rounded-full"></span> Financial Summary
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[#cbd5e1] text-sm">Total Balance</span>
          <span className="text-xl font-bold text-[#0ea5e9]">{formatINR(userData.totalBalance)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#cbd5e1] text-sm">Monthly Income</span>
          <span className="text-[#10b981] font-semibold">{formatINR(userData.monthlyIncome)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#cbd5e1] text-sm">Monthly Expenses</span>
          <span className="text-[#ef4444] font-semibold">{formatINR(userData.monthlyExpenses)}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-[#1e293b] mt-2">
          <span className="text-xs text-[#94a3b8]">vs last month</span>
          <span className="flex items-center gap-1 text-[#f97316] text-xs"><TrendingUp size={14} /> +8%</span>
        </div>
      </div>
    </motion.div>
  )
}