'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function TradingCard() {
  const { userData } = useAuth()
  const [modal, setModal] = useState<'deposit'|'withdraw'|null>(null)
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(userData?.tradingWalletBalance || 0)

  if (!userData) return null

  const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  const handleSubmit = () => {
    const numAmount = Number(amount)
    if (!amount || numAmount <= 0) return
    if (modal === 'withdraw' && numAmount > balance) return
    const newBalance = modal === 'deposit' ? balance + numAmount : balance - numAmount
    setBalance(newBalance)
    setModal(null)
    setAmount('')
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }} 
        className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#0ea5e9] transition-all"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider">Trading Wallet</h3>
          <Wallet className="text-[#0ea5e9]" size={18} />
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-[#0ea5e9]">{formatINR(balance)}</span>
          <span className="text-[#94a3b8] text-xs ml-1">available</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={()=>setModal('deposit')} className="flex-1 bg-[#0ea5e9] text-[#020617] font-semibold py-1.5 rounded-full text-sm hover:bg-[#38bdf8]">Deposit</button>
          <button onClick={()=>alert('Market section coming soon')} className="flex-1 bg-[#f97316] text-white font-semibold py-1.5 rounded-full text-sm hover:bg-[#fb923c]">Trade Now</button>
          <button onClick={()=>setModal('withdraw')} className="flex-1 bg-[#1e293b] text-white border border-[#334155] py-1.5 rounded-full text-sm hover:bg-[#334155]">Withdraw</button>
        </div>
        <div className="mt-4 pt-3 border-t border-[#1e293b]">
          <div className="text-xs text-[#94a3b8] mb-1">Market snapshot</div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-[#1e293b] px-2 py-1 rounded-full text-xs text-white">
              BTC <span className="text-[#10b981]">+2.1%</span><ArrowUpRight size={12} className="text-[#10b981]"/>
            </div>
            <div className="flex items-center gap-1 bg-[#1e293b] px-2 py-1 rounded-full text-xs text-white">
              ETH <span className="text-[#ef4444]">-0.5%</span><ArrowDownRight size={12} className="text-[#ef4444]"/>
            </div>
            <div className="flex items-center gap-1 bg-[#1e293b] px-2 py-1 rounded-full text-xs text-white">
              S&P <span className="text-[#10b981]">+0.8%</span><ArrowUpRight size={12} className="text-[#10b981]"/>
            </div>
          </div>
        </div>
      </motion.div>
      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] border border-[#0ea5e9] rounded-2xl max-w-md w-full p-5">
            <h3 className="text-xl font-bold text-[#0ea5e9] mb-3">{modal === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}</h3>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-full p-2.5 my-3 text-white focus:outline-none focus:border-[#f97316]"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={handleSubmit} className="flex-1 bg-[#0ea5e9] text-[#020617] font-semibold py-2 rounded-full">Confirm</button>
              <button onClick={() => { setModal(null); setAmount(''); }} className="flex-1 bg-[#1e293b] text-white py-2 rounded-full">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}