'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Wallet, PiggyBank, Landmark, BarChart3,
  LineChart, Calculator, X, ChevronRight, Plus, ArrowUpRight, Clock
} from 'lucide-react'
import {
  LineChart as RechartsLine, Line, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip as RechartsTooltip, AreaChart, Area,
  XAxis, YAxis, CartesianGrid
} from 'recharts'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'

// ---------- Mock Data ----------
// Loans
const loansData = [
  { id: 1, name: 'Home Loan', principalRemaining: 2850000, interestRate: 8.5, emi: 28500, nextDue: '10 May 2025', paidPercent: 35, color: '#0ea5e9' },
  { id: 2, name: 'Education Loan', principalRemaining: 275000, interestRate: 7.2, emi: 5800, nextDue: '15 May 2025', paidPercent: 39, color: '#f97316' },
  { id: 3, name: 'Personal Loan', principalRemaining: 180000, interestRate: 11.5, emi: 4200, nextDue: '1 June 2025', paidPercent: 60, color: '#ef4444' },
]

// Fixed Deposits
const fdsData = [
  { id: 1, bank: 'SBI', principal: 250000, rate: 7.1, tenure: 12, maturityAmount: 267750, startDate: '01 Jan 2025', endDate: '01 Jan 2026' },
  { id: 2, bank: 'HDFC', principal: 150000, rate: 7.4, tenure: 24, maturityAmount: 172200, startDate: '15 Mar 2025', endDate: '15 Mar 2027' },
  { id: 3, bank: 'ICICI', principal: 100000, rate: 7.0, tenure: 6, maturityAmount: 103500, startDate: '10 Apr 2025', endDate: '10 Oct 2025' },
]

// Trading Positions (current holdings)
const tradingPositions = [
  { id: 1, asset: 'Bitcoin', symbol: 'BTC', quantity: 0.05, buyPrice: 6800000, currentPrice: 7852000, currentValue: 392600, pnl: 52600, pnlPercent: 15.47 },
  { id: 2, asset: 'Ethereum', symbol: 'ETH', quantity: 2.5, buyPrice: 165000, currentPrice: 185500, currentValue: 463750, pnl: 51250, pnlPercent: 12.42 },
  { id: 3, asset: 'Reliance', symbol: 'RELIANCE', quantity: 50, buyPrice: 2650, currentPrice: 2850, currentValue: 142500, pnl: 10000, pnlPercent: 7.55 },
  { id: 4, asset: 'TCS', symbol: 'TCS', quantity: 20, buyPrice: 3850, currentPrice: 3950, currentValue: 79000, pnl: 2000, pnlPercent: 2.60 },
]

// Recent Trades
const recentTrades = [
  { id: 1, date: '2025-04-08', asset: 'Bitcoin', action: 'buy', quantity: 0.02, price: 7720000, total: 154400 },
  { id: 2, date: '2025-04-07', asset: 'Ethereum', action: 'sell', quantity: 1, price: 182000, total: 182000 },
  { id: 3, date: '2025-04-05', asset: 'Reliance', action: 'buy', quantity: 20, price: 2700, total: 54000 },
  { id: 4, date: '2025-04-03', asset: 'Solana', action: 'buy', quantity: 10, price: 12500, total: 125000 },
  { id: 5, date: '2025-04-01', asset: 'TCS', action: 'sell', quantity: 5, price: 3920, total: 19600 },
]

// Asset Allocation (for donut chart)
const allocationData = [
  { name: 'Stocks & Crypto', value: 1077850, color: '#0ea5e9' },
  { name: 'Fixed Deposits', value: 500000, color: '#f97316' },
  { name: 'Real Estate (Home)', value: 5000000, color: '#10b981' }, // approximate equity
]

// Net Worth Trend (monthly)
const netWorthHistory = [
  { month: 'Oct', netWorth: 6200000 },
  { month: 'Nov', netWorth: 6350000 },
  { month: 'Dec', netWorth: 6480000 },
  { month: 'Jan', netWorth: 6620000 },
  { month: 'Feb', netWorth: 6780000 },
  { month: 'Mar', netWorth: 6950000 },
  { month: 'Apr', netWorth: 7125000 },
]

// ---------- Helper Functions ----------
const formatINR = (num: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)
const formatNumber = (num: number) => num.toLocaleString('en-IN')

// ---------- FD Calculator Component ----------
const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7.2)
  const [tenure, setTenure] = useState(12) // months
  const [compounding, setCompounding] = useState(4) // quarterly

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
        <div>
          <label className="text-xs text-[#94a3b8] block mb-1">Principal (₹)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white border border-[#334155] focus:outline-none focus:border-[#0ea5e9]" />
        </div>
        <div>
          <label className="text-xs text-[#94a3b8] block mb-1">Interest Rate (%) p.a.</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white border border-[#334155]" />
        </div>
        <div>
          <label className="text-xs text-[#94a3b8] block mb-1">Tenure (months)</label>
          <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white border border-[#334155]" />
        </div>
        <div>
          <label className="text-xs text-[#94a3b8] block mb-1">Compounding frequency</label>
          <select value={compounding} onChange={(e) => setCompounding(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white border border-[#334155]">
            <option value={1}>Annually</option>
            <option value={2}>Half-yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>
        <div className="pt-3 border-t border-[#1e293b]">
          <div className="flex justify-between text-sm"><span className="text-[#94a3b8]">Maturity Amount</span><span className="text-white font-bold">{formatINR(maturity)}</span></div>
          <div className="flex justify-between text-sm mt-1"><span className="text-[#94a3b8]">Total Interest</span><span className="text-[#10b981]">{formatINR(interest)}</span></div>
        </div>
      </div>
    </div>
  )
}

// ---------- EMI Calculator Modal ----------
const EMICalculatorModal = ({ loan, onClose }: { loan: any; onClose: () => void }) => {
  const [prepayment, setPrepayment] = useState(0)
  const principal = loan.principalRemaining
  const rate = loan.interestRate
  const emi = loan.emi
  const newPrincipal = Math.max(0, principal - prepayment)
  // Simplified: new EMI calculation (assuming same tenure left)
  const remainingMonths = 120 // mock, in reality would be derived
  const monthlyRate = rate / 100 / 12
  const newEmi = newPrincipal > 0 ? (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1) : 0

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0f172a] rounded-2xl max-w-md w-full p-5 border border-[#0ea5e9]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold">EMI Calculator – {loan.name}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#1e293b]"><X size={20} className="text-white" /></button>
        </div>
        <div className="space-y-3">
          <div><label className="text-xs text-[#94a3b8]">Current EMI</label><p className="text-white">{formatINR(loan.emi)} / month</p></div>
          <div><label className="text-xs text-[#94a3b8]">Principal Remaining</label><p className="text-white">{formatINR(principal)}</p></div>
          <div><label className="text-xs text-[#94a3b8]">Prepayment Amount (₹)</label><input type="number" value={prepayment} onChange={(e) => setPrepayment(Number(e.target.value))} className="w-full bg-[#1e293b] rounded-xl px-3 py-2 text-white" /></div>
          <div className="pt-2 border-t border-[#1e293b]"><div className="flex justify-between"><span className="text-[#94a3b8]">New EMI (approx)</span><span className="text-[#0ea5e9] font-bold">{newPrincipal > 0 ? formatINR(Math.round(newEmi)) : '₹0'}</span></div></div>
          <button onClick={onClose} className="w-full bg-[#0ea5e9] text-black font-semibold py-2 rounded-full mt-2">Close</button>
        </div>
      </motion.div>
    </div>
  )
}

// ---------- Main Status Page ----------
export default function StatusPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'trading'>('overview')
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [netWorth, setNetWorth] = useState(0)
  const totalAssets = 7125000 // from netWorthHistory last value
  const totalLiabilities = loansData.reduce((sum, l) => sum + l.principalRemaining, 0)
  const currentNetWorth = totalAssets - totalLiabilities

  useEffect(() => {
    // Animated counter for net worth
    let start = 0
    const end = currentNetWorth
    const duration = 1000
    const stepTime = 20
    const steps = duration / stepTime
    const increment = end / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setNetWorth(end)
        clearInterval(timer)
      } else {
        setNetWorth(Math.round(start))
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [currentNetWorth])

  return (
    <div className="min-h-screen bg-[#020617] pb-20 md:pb-0">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero: Net Worth Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-2xl p-6 mb-6 border border-[#0ea5e9]/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-[#94a3b8] text-sm">Net Worth (Assets - Liabilities)</p>
              <p className="text-3xl md:text-4xl font-bold text-white">{formatINR(netWorth)}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-[#10b981]">Assets: {formatINR(totalAssets)}</span>
                <span className="text-[#ef4444]">Liabilities: {formatINR(totalLiabilities)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#0ea5e9] text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"><Plus size={16} /> Add Transaction</button>
              <button className="bg-[#1e293b] text-white px-4 py-2 rounded-full text-sm border border-[#334155]">Refresh</button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 bg-[#0f172a] p-1 rounded-xl w-fit mb-6 border border-[#1e293b]">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'loans', label: 'Loans & FDs', icon: Landmark },
            { id: 'trading', label: 'Trading Activity', icon: TrendingUp },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-[#0ea5e9] text-black shadow-md' : 'text-[#94a3b8] hover:text-white'}`}>
              <tab.icon size={16} /> <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Asset Allocation Donut */}
                <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                  <h3 className="text-white font-semibold mb-4">Asset Allocation</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {allocationData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 justify-center">
                    {allocationData.map(item => <div key={item.name} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div><span className="text-xs text-white">{item.name}</span><span className="text-xs text-[#94a3b8]">{formatINR(item.value)}</span></div>)}
                  </div>
                </div>

                {/* Net Worth Trend */}
                <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                  <h3 className="text-white font-semibold mb-4">Net Worth Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={netWorthHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis tickFormatter={(v) => `₹${v/100000}L`} stroke="#94a3b8" />
                        <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                        <Area type="monotone" dataKey="netWorth" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]"><p className="text-[#94a3b8] text-xs">Total Loans</p><p className="text-xl font-bold text-white">{formatINR(totalLiabilities)}</p></div>
                <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]"><p className="text-[#94a3b8] text-xs">FDs Total</p><p className="text-xl font-bold text-white">{formatINR(fdsData.reduce((s, f) => s + f.principal, 0))}</p></div>
                <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]"><p className="text-[#94a3b8] text-xs">Trading P&L</p><p className="text-xl font-bold text-[#10b981]">+{formatINR(tradingPositions.reduce((s, p) => s + p.pnl, 0))}</p></div>
              </div>
            </motion.div>
          )}

          {activeTab === 'loans' && (
            <motion.div key="loans" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loans Section */}
              <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Landmark size={18} /> Active Loans</h3>
                <div className="space-y-4">
                  {loansData.map(loan => (
                    <div key={loan.id} className="border-b border-[#1e293b] pb-3 last:border-0">
                      <div className="flex justify-between text-sm"><span className="text-white">{loan.name}</span><span className="text-[#ef4444]">{formatINR(loan.principalRemaining)} left</span></div>
                      <div className="w-full bg-[#1e293b] rounded-full h-2 my-2"><div className="bg-[#f97316] h-2 rounded-full" style={{ width: `${loan.paidPercent}%` }}></div></div>
                      <div className="flex justify-between text-xs text-[#94a3b8]"><span>EMI: {formatINR(loan.emi)}/month</span><span>Due: {loan.nextDue}</span><button onClick={() => setSelectedLoan(loan)} className="text-[#0ea5e9] hover:underline">Calculate EMI</button></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FDs List + Calculator */}
              <div className="space-y-6">
                <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                  <h3 className="text-white font-semibold mb-3">Fixed Deposits</h3>
                  <div className="space-y-3">
                    {fdsData.map(fd => (
                      <div key={fd.id} className="flex justify-between items-center border-b border-[#1e293b] pb-2">
                        <div><p className="text-white text-sm">{fd.bank}</p><p className="text-xs text-[#94a3b8]">{fd.principal} @ {fd.rate}% for {fd.tenure} months</p></div>
                        <div className="text-right"><p className="text-white text-sm">{formatINR(fd.maturityAmount)}</p><p className="text-xs text-[#94a3b8]">Maturity</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <FDCalculator />
              </div>
            </motion.div>
          )}

          {activeTab === 'trading' && (
            <motion.div key="trading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {/* Current Positions */}
              <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} /> Current Positions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-[#94a3b8] text-xs border-b border-[#1e293b]"><tr><th className="p-2 text-left">Asset</th><th className="p-2 text-right">Qty</th><th className="p-2 text-right">Buy Price</th><th className="p-2 text-right">Current</th><th className="p-2 text-right">P&L</th></tr></thead>
                    <tbody>
                      {tradingPositions.map(pos => (
                        <tr key={pos.id} className="border-b border-[#1e293b]">
                          <td className="p-2 text-white">{pos.asset} <span className="text-xs text-[#94a3b8]">{pos.symbol}</span></td>
                          <td className="p-2 text-right text-white">{pos.quantity}</td>
                          <td className="p-2 text-right text-white">{formatINR(pos.buyPrice)}</td>
                          <td className="p-2 text-right text-white">{formatINR(pos.currentPrice)}</td>
                          <td className={`p-2 text-right ${pos.pnl >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{pos.pnl >= 0 ? '+' : ''}{formatINR(pos.pnl)} ({pos.pnlPercent}%)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Clock size={18} /> Recent Trades</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-[#94a3b8] text-xs border-b border-[#1e293b]"><tr><th className="p-2 text-left">Date</th><th className="p-2 text-left">Asset</th><th className="p-2 text-center">Action</th><th className="p-2 text-right">Qty</th><th className="p-2 text-right">Price</th><th className="p-2 text-right">Total</th></tr></thead>
                    <tbody>
                      {recentTrades.map(trade => (
                        <tr key={trade.id} className="border-b border-[#1e293b]">
                          <td className="p-2 text-white text-xs">{trade.date}</td>
                          <td className="p-2 text-white">{trade.asset}</td>
                          <td className={`p-2 text-center text-xs font-bold ${trade.action === 'buy' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{trade.action.toUpperCase()}</td>
                          <td className="p-2 text-right text-white">{trade.quantity}</td>
                          <td className="p-2 text-right text-white">{formatINR(trade.price)}</td>
                          <td className="p-2 text-right text-white">{formatINR(trade.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <BottomNav />

      {/* EMI Modal */}
      <AnimatePresence>{selectedLoan && <EMICalculatorModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />}</AnimatePresence>
    </div>
  )
}