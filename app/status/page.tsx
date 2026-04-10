'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Landmark, Calculator, X, Plus, Clock } from 'lucide-react'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'

const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

// FD Calculator Component (same as before, but can be extracted)
const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7.2)
  const [tenure, setTenure] = useState(12)
  const [compounding, setCompounding] = useState(4)
  const calculateMaturity = () => {
    const r = rate / 100 / compounding
    const n = tenure / 12 * compounding
    const amount = principal * Math.pow(1 + r, n)
    return Math.round(amount)
  }
  const maturity = calculateMaturity()
  const interest = maturity - principal
  return (
    <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Calculator size={18} className="text-[#0ea5e9]" /> FD Calculator</h3>
      <div className="space-y-4">
        <div><label className="text-xs text-[#94a3b8] block mb-1">Principal (₹)</label><input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white border border-[#334155]" /></div>
        <div><label className="text-xs text-[#94a3b8] block mb-1">Interest Rate (%) p.a.</label><input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white" /></div>
        <div><label className="text-xs text-[#94a3b8] block mb-1">Tenure (months)</label><input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white" /></div>
        <div><label className="text-xs text-[#94a3b8] block mb-1">Compounding frequency</label><select value={compounding} onChange={(e) => setCompounding(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white"><option value={1}>Annually</option><option value={2}>Half-yearly</option><option value={4}>Quarterly</option><option value={12}>Monthly</option></select></div>
        <div className="pt-3 border-t border-[#1e293b]"><div className="flex justify-between text-sm"><span className="text-[#94a3b8]">Maturity Amount</span><span className="text-white font-bold">{formatINR(maturity)}</span></div><div className="flex justify-between text-sm mt-1"><span className="text-[#94a3b8]">Total Interest</span><span className="text-[#10b981]">{formatINR(interest)}</span></div></div>
      </div>
    </div>
  )
}

// EMI Calculator Modal (simplified)
const EMICalculatorModal = ({ loan, onClose }: { loan: any; onClose: () => void }) => {
  const [prepayment, setPrepayment] = useState(0)
  const principal = loan.remaining
  const rate = 8.5 // dummy
  const remainingMonths = 120
  const monthlyRate = rate / 100 / 12
  const newPrincipal = Math.max(0, principal - prepayment)
  const newEmi = newPrincipal > 0 ? (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1) : 0
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0f172a] rounded-2xl max-w-md w-full p-5 border border-[#0ea5e9]">
        <div className="flex justify-between items-center mb-4"><h3 className="text-white font-bold">EMI Calculator – {loan.name}</h3><button onClick={onClose}><X size={20} className="text-white" /></button></div>
        <div className="space-y-3"><div><label className="text-xs text-[#94a3b8]">Current EMI</label><p className="text-white">{formatINR(loan.emi || 0)} / month</p></div><div><label className="text-xs text-[#94a3b8]">Principal Remaining</label><p className="text-white">{formatINR(principal)}</p></div><div><label className="text-xs text-[#94a3b8]">Prepayment Amount (₹)</label><input type="number" value={prepayment} onChange={(e) => setPrepayment(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white" /></div><div className="pt-2 border-t"><div className="flex justify-between"><span className="text-[#94a3b8]">New EMI (approx)</span><span className="text-[#0ea5e9] font-bold">{newPrincipal > 0 ? formatINR(Math.round(newEmi)) : '₹0'}</span></div></div><button onClick={onClose} className="w-full bg-[#0ea5e9] text-black font-semibold py-2 rounded-full mt-2">Close</button></div>
      </motion.div>
    </div>
  )
}

export default function StatusPage() {
  const { userData } = useAuth()
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  if (!userData) return null

  const totalAssets = userData.netWorth + userData.loans.reduce((sum, l) => sum + l.remaining, 0) // simplified
  const totalLiabilities = userData.loans.reduce((sum, l) => sum + l.remaining, 0)
  const netWorth = userData.netWorth

  // Asset allocation for donut (from portfolio + FDs)
  const allocationData = [
    { name: 'Stocks & Crypto', value: userData.portfolio.find(p => p.name === 'Funds')?.value || 0, color: '#0ea5e9' },
    { name: 'Fixed Deposits', value: userData.fds.reduce((s, f) => s + f.principal, 0), color: '#f97316' },
    { name: 'Savings', value: userData.portfolio.find(p => p.name === 'Savings')?.value || 0, color: '#10b981' },
  ].filter(a => a.value > 0)

  // Net worth history – we can generate a simple trend based on current net worth (mock)
  const netWorthHistory = [
    { month: 'Oct', netWorth: netWorth * 0.85 },
    { month: 'Nov', netWorth: netWorth * 0.88 },
    { month: 'Dec', netWorth: netWorth * 0.91 },
    { month: 'Jan', netWorth: netWorth * 0.94 },
    { month: 'Feb', netWorth: netWorth * 0.97 },
    { month: 'Mar', netWorth: netWorth * 0.99 },
    { month: 'Apr', netWorth: netWorth },
  ].map(item => ({ ...item, netWorth: Math.round(item.netWorth) }))

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] pb-20 md:pb-0">
        <Header />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Net Worth Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-2xl p-6 mb-6 border border-[#0ea5e9]/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div><p className="text-[#94a3b8] text-sm">Net Worth (Assets - Liabilities)</p><p className="text-3xl md:text-4xl font-bold text-white">{formatINR(netWorth)}</p><div className="flex gap-4 mt-2 text-sm"><span className="text-[#10b981]">Assets: {formatINR(totalAssets)}</span><span className="text-[#ef4444]">Liabilities: {formatINR(totalLiabilities)}</span></div></div>
              <div className="flex gap-2"><button className="bg-[#0ea5e9] text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"><Plus size={16} /> Add Transaction</button><button className="bg-[#1e293b] text-white px-4 py-2 rounded-full text-sm border border-[#334155]">Refresh</button></div>
            </div>
          </motion.div>

          {/* Two-column layout for overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Allocation Donut */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-4">Asset Allocation</h3>
              <div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{allocationData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}</Pie><RechartsTooltip formatter={(val: number) => formatINR(val)} /></PieChart></ResponsiveContainer></div>
              <div className="mt-4 flex flex-wrap gap-3 justify-center">{allocationData.map(item => <div key={item.name} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div><span className="text-xs text-white">{item.name}</span><span className="text-xs text-[#94a3b8]">{formatINR(item.value)}</span></div>)}</div>
            </div>

            {/* Net Worth Trend */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-4">Net Worth Trend</h3>
              <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={netWorthHistory}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b" /><XAxis dataKey="month" stroke="#94a3b8" /><YAxis tickFormatter={(v) => `₹${v/100000}L`} stroke="#94a3b8" /><RechartsTooltip formatter={(val: number) => formatINR(val)} /><Area type="monotone" dataKey="netWorth" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} /></AreaChart></ResponsiveContainer></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]"><p className="text-[#94a3b8] text-xs">Total Loans</p><p className="text-xl font-bold text-white">{formatINR(totalLiabilities)}</p></div>
            <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]"><p className="text-[#94a3b8] text-xs">FDs Total</p><p className="text-xl font-bold text-white">{formatINR(userData.fds.reduce((s, f) => s + f.principal, 0))}</p></div>
            <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]"><p className="text-[#94a3b8] text-xs">Trading P&L</p><p className="text-xl font-bold text-[#10b981]">+{formatINR(userData.tradingPositions.reduce((s, p) => s + p.pnl, 0))}</p></div>
          </div>

          {/* Loans & FDs Section (tabs? but we'll show both) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Landmark size={18} /> Active Loans</h3>
              <div className="space-y-4">{userData.loans.map((loan, idx) => (<div key={idx} className="border-b border-[#1e293b] pb-3 last:border-0"><div className="flex justify-between text-sm"><span className="text-white">{loan.name}</span><span className="text-[#ef4444]">{formatINR(loan.remaining)} left</span></div><div className="w-full bg-[#1e293b] rounded-full h-2 my-2"><div className="bg-[#f97316] h-2 rounded-full" style={{ width: `${loan.paidPercent}%` }}></div></div><div className="flex justify-between text-xs text-[#94a3b8]"><span>EMI: {formatINR(loan.emi || 0)}/month</span><span>Due: {loan.dueDate}</span><button onClick={() => setSelectedLoan(loan)} className="text-[#0ea5e9] hover:underline">Calculate EMI</button></div></div>))}</div>
            </div>
            <div className="space-y-6"><div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]"><h3 className="text-white font-semibold mb-3">Fixed Deposits</h3><div className="space-y-3">{userData.fds.map((fd, idx) => (<div key={idx} className="flex justify-between items-center border-b border-[#1e293b] pb-2"><div><p className="text-white text-sm">{fd.bank}</p><p className="text-xs text-[#94a3b8]">{formatINR(fd.principal)} @ {fd.rate}% for {fd.tenure} months</p></div><div className="text-right"><p className="text-white text-sm">{formatINR(fd.maturity)}</p><p className="text-xs text-[#94a3b8]">Maturity</p></div></div>))}</div></div><FDCalculator /></div>
          </div>

          {/* Trading Positions */}
          <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b] mt-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} /> Current Positions</h3>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="text-[#94a3b8] text-xs border-b border-[#1e293b]"><tr><th className="p-2 text-left">Asset</th><th className="p-2 text-right">Qty</th><th className="p-2 text-right">Buy Price</th><th className="p-2 text-right">Current</th><th className="p-2 text-right">P&L</th></tr></thead><tbody>{userData.tradingPositions.map((pos, idx) => (<tr key={idx} className="border-b border-[#1e293b]"><td className="p-2 text-white">{pos.asset} <span className="text-xs text-[#94a3b8]">{pos.symbol}</span></td><td className="p-2 text-right text-white">{pos.quantity}</td><td className="p-2 text-right text-white">{formatINR(pos.buyPrice)}</td><td className="p-2 text-right text-white">{formatINR(pos.currentPrice)}</td><td className={`p-2 text-right ${pos.pnl >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{pos.pnl >= 0 ? '+' : ''}{formatINR(pos.pnl)} ({pos.pnlPercent}%)</td></tr>))}</tbody></table></div>
          </div>

          {/* Recent Trades */}
          <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b] mt-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Clock size={18} /> Recent Trades</h3>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="text-[#94a3b8] text-xs border-b border-[#1e293b]"><tr><th className="p-2 text-left">Date</th><th className="p-2 text-left">Asset</th><th className="p-2 text-center">Action</th><th className="p-2 text-right">Qty</th><th className="p-2 text-right">Price</th><th className="p-2 text-right">Total</th></tr></thead><tbody>{userData.recentTrades.map((trade, idx) => (<tr key={idx} className="border-b border-[#1e293b]"><td className="p-2 text-white text-xs">{trade.date}</td><td className="p-2 text-white">{trade.asset}</td><td className={`p-2 text-center text-xs font-bold ${trade.action === 'buy' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{trade.action.toUpperCase()}</td><td className="p-2 text-right text-white">{trade.quantity}</td><td className="p-2 text-right text-white">{formatINR(trade.price)}</td><td className="p-2 text-right text-white">{formatINR(trade.total)}</td></tr>))}</tbody></table></div>
          </div>
        </main>
        <BottomNav />
        {selectedLoan && <EMICalculatorModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />}
      </div>
    </ProtectedRoute>
  )
}