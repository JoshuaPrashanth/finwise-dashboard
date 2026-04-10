'use client'
import { motion } from 'framer-motion'

const loans = [
  { name: 'Personal Loan', remaining: 180000, paid: 60, due: '15 May' },
  { name: 'Education Loan', remaining: 275000, paid: 39, due: '1 June' },
]
const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function LoansCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }} 
      className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#0ea5e9] transition-all overflow-hidden"
    >
      <h3 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#f97316] rounded-full"></span> Active Loans
      </h3>
      <div className="space-y-3 break-words">
        {loans.map(loan => (
          <div key={loan.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white truncate">{loan.name}</span>
              <span className="text-[#ef4444] text-xs truncate ml-2">{formatINR(loan.remaining)} left</span>
            </div>
            <div className="w-full bg-[#1e293b] rounded-full h-1.5">
              <div className="bg-[#f97316] h-1.5 rounded-full" style={{ width: `${loan.paid}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#94a3b8] mt-1">
              <span>{loan.paid}% paid</span>
              <span>Due: {loan.due}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}