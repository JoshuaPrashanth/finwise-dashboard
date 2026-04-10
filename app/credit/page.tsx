'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, CheckCircle, XCircle, AlertCircle,
  Shield, CreditCard, BarChart3, Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'

// External links for loan applications (demo)
const loanApplicationLinks: Record<string, string> = {
  'Home Loan': 'https://www.hdfc.com/home-loan',
  'Car Loan': 'https://www.sbi.co.in/car-loan',
  'Personal Loan': 'https://www.icicibank.com/personal-loan',
  'Education Loan': 'https://www.bankofbaroda.in/education-loan',
  'Credit Card': 'https://www.axisbank.com/credit-card',
}

// ---------- Helper: Apply Now handler ----------
const handleApplyNow = (loanName: string) => {
  const url = loanApplicationLinks[loanName]
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    alert(`Application for ${loanName} will open soon. (Demo)`)
  }
}

// ---------- Semi-Circle Gauge Component ----------
const CreditScoreGauge = ({ score, maxScore }: { score: number; maxScore: number }) => {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = 120
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference * (1 - score / maxScore)

  useEffect(() => {
    let start = 0
    const end = score
    const duration = 1500
    const stepTime = 20
    const steps = duration / stepTime
    const increment = end / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setAnimatedScore(end)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(start))
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [score])

  return (
    <div className="relative w-64 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 300 180">
        <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="#1e293b" strokeWidth="20" strokeLinecap="round" />
        <path
          d="M 30 150 A 120 120 0 0 1 270 150"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 bottom-0 top-1/2 flex flex-col items-center justify-end pb-4">
        <span className="text-4xl font-bold text-white">{animatedScore}</span>
        <span className="text-sm text-[#94a3b8]">OF {maxScore}</span>
      </div>
    </div>
  )
}

// ---------- Score factors (can be common, but scores can be personalized if needed) ----------
const scoreFactors = [
  { name: 'Payment History', impact: 35, score: 95, color: '#10b981', tip: 'Always pay EMIs/credit card bills on time.' },
  { name: 'Credit Utilization', impact: 30, score: 72, color: '#f97316', tip: 'Keep credit usage below 30% of limit.' },
  { name: 'Credit Age', impact: 15, score: 68, color: '#f97316', tip: 'Avoid closing old credit accounts.' },
  { name: 'Credit Mix', impact: 10, score: 80, color: '#0ea5e9', tip: 'Maintain a mix of secured & unsecured loans.' },
  { name: 'New Credit', impact: 10, score: 65, color: '#ef4444', tip: 'Limit hard inquiries; don\'t apply for multiple loans at once.' },
]

const insights = [
  { text: 'Your payment history is excellent. Keep it up!', type: 'positive', icon: CheckCircle },
  { text: 'High credit utilization is hurting your score. Try to reduce usage below 30%.', type: 'warning', icon: AlertCircle },
  { text: 'Your credit age is low – consider keeping older accounts active.', type: 'info', icon: Clock },
]

// ---------- Main Page ----------
export default function CreditPage() {
  const { userData } = useAuth()
  if (!userData) return null // will redirect via ProtectedRoute

  const MAX_SCORE = 999
  const currentScore = userData.creditScore
  const scoreHistory = userData.creditHistory
  const loanHistory = userData.loanHistory

  // Compute loan eligibility based on user's score
  const eligibilityRules = [
    { name: 'Home Loan', minScore: 650, eligible: currentScore >= 650, interestRate: '8.5% - 9.5%', maxAmount: '₹50 Lakh' },
    { name: 'Car Loan', minScore: 600, eligible: currentScore >= 600, interestRate: '7.8% - 8.8%', maxAmount: '₹15 Lakh' },
    { name: 'Personal Loan', minScore: 700, eligible: currentScore >= 700, interestRate: '10.5% - 12.5%', maxAmount: '₹10 Lakh' },
    { name: 'Education Loan', minScore: 550, eligible: currentScore >= 550, interestRate: '8.0% - 9.0%', maxAmount: '₹25 Lakh' },
    { name: 'Credit Card', minScore: 650, eligible: currentScore >= 650, interestRate: '18% - 24%', maxAmount: '₹2 Lakh' },
  ]

  // Calculate totals for quick stats
  const totalRepaid = loanHistory.filter(l => l.status === 'repaid').reduce((sum, l) => sum + l.amount, 0)
  const totalLapsed = loanHistory.filter(l => l.status === 'lapsed').reduce((sum, l) => sum + l.amount, 0)
  const repaidCount = loanHistory.filter(l => l.status === 'repaid').length
  const lapsedCount = loanHistory.filter(l => l.status === 'lapsed').length

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] pb-20 md:pb-0">
        <Header />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Gauge + Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f172a] rounded-2xl p-6 border border-[#1e293b] flex flex-col items-center"
            >
              <h2 className="text-white font-semibold mb-2">YOUR CREDIT SCORE</h2>
              <CreditScoreGauge score={currentScore} maxScore={MAX_SCORE} />
              <div className="mt-4 text-center">
                <p className="text-[#94a3b8] text-sm">Last updated: 10 April 2025</p>
                <p className="text-[#10b981] text-sm flex items-center justify-center gap-1 mt-1">
                  <TrendingUp size={14} /> +{(currentScore - scoreHistory[0].score)} points in 3 months
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]">
                <p className="text-[#94a3b8] text-xs">Total Loans Repaid</p>
                <p className="text-2xl font-bold text-white">{repaidCount}</p>
                <p className="text-[#10b981] text-xs mt-1">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalRepaid)} cleared</p>
              </div>
              <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]">
                <p className="text-[#94a3b8] text-xs">Lapsed Loans</p>
                <p className="text-2xl font-bold text-white">{lapsedCount}</p>
                <p className="text-[#ef4444] text-xs mt-1">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalLapsed)} defaulted</p>
              </div>
              <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]">
                <p className="text-[#94a3b8] text-xs">Credit Cards Active</p>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-[#f97316] text-xs mt-1">Total limit: ₹4.5 Lakh</p>
              </div>
              <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e293b]">
                <p className="text-[#94a3b8] text-xs">Credit Utilization</p>
                <p className="text-2xl font-bold text-white">42%</p>
                <p className="text-[#ef4444] text-xs mt-1">Ideal below 30%</p>
              </div>
            </div>
          </div>

          {/* Score Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b] mb-6"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-[#0ea5e9]" /> What Affects Your Score</h3>
            <div className="space-y-3">
              {scoreFactors.map(factor => (
                <div key={factor.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{factor.name}</span>
                    <span className="text-[#94a3b8]">{factor.impact}% weight</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#1e293b] rounded-full h-2">
                      <div className="bg-[#f97316] h-2 rounded-full" style={{ width: `${factor.score}%` }}></div>
                    </div>
                    <span className="text-xs text-white">{factor.score}%</span>
                  </div>
                  <p className="text-xs text-[#94a3b8] mt-1">{factor.tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Loan History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b] mb-6"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><CreditCard size={18} className="text-[#10b981]" /> Loan History (Repaid / Lapsed)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[#94a3b8] text-xs border-b border-[#1e293b]">
                  <tr><th className="p-2 text-left">Loan Type</th><th className="p-2 text-right">Amount</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Date / Reason</th></tr>
                </thead>
                <tbody>
                  {loanHistory.map((loan, idx) => (
                    <tr key={idx} className="border-b border-[#1e293b]">
                      <td className="p-2 text-white">{loan.type}</td>
                      <td className="p-2 text-right text-white">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(loan.amount)}</td>
                      <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs ${loan.status === 'repaid' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#ef4444]/20 text-[#ef4444]'}`}>{loan.status.toUpperCase()}</span></td>
                      <td className="p-2 text-[#94a3b8] text-xs">{loan.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Loan Eligibility with Working Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b] mb-6"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Shield size={18} className="text-[#f97316]" /> Loan Eligibility (Based on Your Score)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibilityRules.map(loan => (
                <div key={loan.name} className={`p-3 rounded-xl border ${loan.eligible ? 'border-[#10b981]/30 bg-[#10b981]/5' : 'border-[#ef4444]/30 bg-[#ef4444]/5'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{loan.name}</p>
                      <p className="text-xs text-[#94a3b8]">Interest: {loan.interestRate} | Up to {loan.maxAmount}</p>
                    </div>
                    {loan.eligible ? <CheckCircle size={18} className="text-[#10b981]" /> : <XCircle size={18} className="text-[#ef4444]" />}
                  </div>
                  <div className="mt-2">
                    {loan.eligible ? (
                      <button
                        onClick={() => handleApplyNow(loan.name)}
                        className="text-xs bg-[#0ea5e9] text-black px-3 py-1 rounded-full hover:bg-[#38bdf8] transition"
                      >
                        Apply Now →
                      </button>
                    ) : (
                      <p className="text-xs text-[#ef4444]">Minimum score required: {loan.minScore}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Score History + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-[#0ea5e9]" /> Score History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis domain={['auto', 'auto']} stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#0ea5e9', color: '#fff' }} formatter={(val) => [`${val}`, 'Score']} />
                    <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><AlertCircle size={18} className="text-[#f97316]" /> Credit Insights</h3>
              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-[#1e293b] rounded-xl">
                    <insight.icon size={18} className={insight.type === 'positive' ? 'text-[#10b981]' : insight.type === 'warning' ? 'text-[#f97316]' : 'text-[#0ea5e9]'} />
                    <p className="text-sm text-white flex-1">{insight.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-[#0ea5e9]/10 to-[#f97316]/10 rounded-xl border border-[#0ea5e9]/30">
                <p className="text-xs text-[#94a3b8]">💡 Pro Tip: Pay off your lapsed loan or settle it to improve your score significantly.</p>
              </div>
            </motion.div>
          </div>
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  )
}