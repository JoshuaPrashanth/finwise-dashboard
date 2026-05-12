'use client'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function LoansCard() {
  const { userData } = useAuth()
  if (!userData) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }} 
      className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#0ea5e9] transition-all"
    >
      <h3 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#f97316] rounded-full"></span> Active Loans
      </h3>
      <div className="space-y-3">
        {userData.loans.map((loan, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white">{loan.name}</span>
              <span className="text-[#ef4444] text-xs">{formatINR(loan.remaining)} left</span>
            </div>
            <div className="w-full bg-[#1e293b] rounded-full h-1.5">
              <div className="bg-[#f97316] h-1.5 rounded-full" style={{ width: `${loan.paidPercent}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#94a3b8] mt-1">
              <span>{loan.paidPercent}% paid</span>
              <span>Due: {loan.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}