'use client'
import { useState, useEffect, useMemo } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, DollarSign, ExternalLink, X } from 'lucide-react'

const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function AlertsPage() {
  const { user, userData } = useAuth()
  const [dismissed, setDismissed] = useState<number[]>([])

  // Load dismissed alerts from localStorage for this user
  useEffect(() => {
    if (user?.username) {
      const key = `finwise_dismissed_${user.username}`
      const stored = localStorage.getItem(key)
      if (stored) {
        try {
          setDismissed(JSON.parse(stored))
        } catch (e) {}
      }
    }
  }, [user])

  // Save dismissed alerts to localStorage whenever they change
  useEffect(() => {
    if (user?.username) {
      const key = `finwise_dismissed_${user.username}`
      localStorage.setItem(key, JSON.stringify(dismissed))
    }
  }, [dismissed, user])

  const generateAlerts = () => {
    if (!userData) return []
    const alerts = []

    // Loan due reminders (use fixed due date as timestamp)
    userData.loans.forEach((loan, idx) => {
      // Parse due date to approximate timestamp (e.g., "10 May" -> May 10 of current year)
      const dueParts = loan.dueDate.split(' ')
      const day = parseInt(dueParts[0])
      const monthMap: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
      const month = monthMap[dueParts[1]]
      const now = new Date()
      let dueDate = new Date(now.getFullYear(), month, day)
      if (dueDate < now) dueDate.setFullYear(now.getFullYear() + 1)
      alerts.push({
        id: idx + 100,
        title: `${loan.name} EMI Due`,
        description: `Your EMI of ${formatINR(loan.emi || 0)} is due on ${loan.dueDate}.`,
        type: 'loan',
        timestamp: dueDate,
        actionLabel: 'Pay Now',
        actionUrl: 'https://www.bankofindia.co.in',
        read: false,
      })
    })

    // Trading P&L alerts (use a fixed timestamp from the trade date if available, else now)
    userData.tradingPositions.forEach((pos, idx) => {
      if (pos.pnl > 10000) {
        // Use the most recent trade date for this asset if exists, else now
        let tradeDate = new Date()
        const relatedTrade = userData.recentTrades.find(t => t.asset === pos.asset)
        if (relatedTrade) tradeDate = new Date(relatedTrade.date)
        alerts.push({
          id: idx + 200,
          title: `${pos.asset} Up ${pos.pnlPercent}%`,
          description: `Your ${pos.asset} position is up by ${formatINR(pos.pnl)}.`,
          type: 'market',
          timestamp: tradeDate,
          actionLabel: 'View Position',
          actionUrl: '/status',
          read: false,
        })
      }
    })

    // FD maturity reminders (use maturity date from FD end date, approximate)
    userData.fds.forEach((fd, idx) => {
      // Assume 12-month FD => maturity date roughly 1 year from start, but we'll use a mock date
      const maturityDate = new Date()
      maturityDate.setMonth(maturityDate.getMonth() + fd.tenure)
      alerts.push({
        id: idx + 300,
        title: `${fd.bank} FD Maturing Soon`,
        description: `Your FD of ${formatINR(fd.principal)} matures on ${maturityDate.toLocaleDateString('en-IN')}.`,
        type: 'investment',
        timestamp: maturityDate,
        actionLabel: 'Renew',
        actionUrl: 'https://www.sbi.co.in',
        read: false,
      })
    })

    // Sort by timestamp (most recent first)
    return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  const allAlerts = useMemo(() => generateAlerts(), [userData])
  const visibleAlerts = allAlerts.filter(a => !dismissed.includes(a.id))

  const dismissAlert = (id: number) => {
    setDismissed(prev => [...prev, id])
  }

  if (!userData) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] pb-20 md:pb-0">
        <Header />
        <main className="max-w-[1200px] mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white mb-6">Notifications</h1>
          {visibleAlerts.length === 0 ? (
            <div className="text-center text-[#94a3b8] py-12">No new notifications</div>
          ) : (
            <div className="space-y-3">
              {visibleAlerts.map(alert => (
                <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`bg-[#0f172a] border rounded-xl p-4 ${alert.read ? 'border-[#1e293b]' : 'border-[#0ea5e9] shadow-md'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {alert.type === 'market' && <TrendingUp size={16} className="text-[#0ea5e9]" />}
                        {alert.type === 'loan' && <Calendar size={16} className="text-[#f97316]" />}
                        {alert.type === 'investment' && <DollarSign size={16} className="text-[#10b981]" />}
                        <span className="text-base font-semibold text-white">{alert.title}</span>
                      </div>
                      <p className="text-sm text-[#cbd5e1] mb-3">{alert.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#94a3b8]">{alert.timestamp.toLocaleDateString('en-IN')}</span>
                        <a href={alert.actionUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0ea5e9] hover:text-[#38bdf8] flex items-center gap-1">{alert.actionLabel} <ExternalLink size={12} /></a>
                      </div>
                    </div>
                    <button onClick={() => dismissAlert(alert.id)} className="text-[#94a3b8] hover:text-white ml-3 p-1"><X size={16} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  )
}