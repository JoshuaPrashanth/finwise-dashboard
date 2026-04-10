'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import { TrendingUp, Calendar, DollarSign, ExternalLink, X } from 'lucide-react'
import Link from 'next/link'

// Demo notifications (same as before)
const initialNotifications = [
  {
    id: 1,
    title: 'BTC hits new high',
    description: 'Bitcoin crossed ₹72,00,000. Consider reviewing your portfolio.',
    type: 'market',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    actionLabel: 'Trade Now',
    actionUrl: 'https://www.binance.com',
    read: false,
  },
  {
    id: 2,
    title: 'Education Loan EMI Due',
    description: 'Your EMI of ₹5,800 is due on 15th May.',
    type: 'loan',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // yesterday
    actionLabel: 'Pay Now',
    actionUrl: 'https://www.bankofindia.co.in',
    read: false,
  },
  {
    id: 3,
    title: 'New Investment Scheme',
    description: 'SEBI launches new tax-saving fund with 14% projected returns.',
    type: 'investment',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    actionLabel: 'Apply Now',
    actionUrl: 'https://www.mfcentral.com',
    read: true,
  },
]

function groupNotifications(notifs: typeof initialNotifications) {
  const today: typeof notifs = []
  const yesterday: typeof notifs = []
  const earlier: typeof notifs = []
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  notifs.forEach((n) => {
    if (n.timestamp >= startOfToday) today.push(n)
    else if (n.timestamp >= startOfYesterday) yesterday.push(n)
    else earlier.push(n)
  })
  return { today, yesterday, earlier }
}

function formatTime(timestamp: Date) {
  const now = new Date()
  const diffMs = now.getTime() - timestamp.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`
  return timestamp.toLocaleDateString('en-IN')
}

export default function AlertsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const { today, yesterday, earlier } = groupNotifications(notifications)

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const NotificationGroup = ({ title, items }: { title: string; items: typeof notifications }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-[#94a3b8] mb-3">{title}</h3>
      {items.map((notif) => (
        <div
          key={notif.id}
          className={`bg-[#0f172a] border rounded-xl p-4 mb-3 transition-all hover:border-[#0ea5e9] ${
            notif.read ? 'border-[#1e293b]' : 'border-[#0ea5e9] shadow-md'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {notif.type === 'market' && <TrendingUp size={16} className="text-[#0ea5e9]" />}
                {notif.type === 'loan' && <Calendar size={16} className="text-[#f97316]" />}
                {notif.type === 'investment' && <DollarSign size={16} className="text-[#10b981]" />}
                <span className="text-base font-semibold text-white">{notif.title}</span>
              </div>
              <p className="text-sm text-[#cbd5e1] mb-3">{notif.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#94a3b8]">{formatTime(notif.timestamp)}</span>
                <a
                  href={notif.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markAsRead(notif.id)}
                  className="text-sm text-[#0ea5e9] hover:text-[#38bdf8] flex items-center gap-1"
                >
                  {notif.actionLabel} <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <button
              onClick={() => dismissNotification(notif.id)}
              className="text-[#94a3b8] hover:text-white ml-3 p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#020617] pb-20 md:pb-0">
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#0ea5e9] hover:text-[#38bdf8]"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center text-[#94a3b8] py-12">No notifications</div>
        ) : (
          <>
            {today.length > 0 && <NotificationGroup title="Today" items={today} />}
            {yesterday.length > 0 && <NotificationGroup title="Yesterday" items={yesterday} />}
            {earlier.length > 0 && <NotificationGroup title="Earlier" items={earlier} />}
          </>
        )}
      </main>
      <BottomNav />
    </div>
  )
}