'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, Bell, DollarSign, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Demo notifications data
const allNotifications = [
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
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago -> yesterday
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

function groupNotifications(notifs: typeof allNotifications) {
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

export default function NotificationsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState(allNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const { today, yesterday, earlier } = groupNotifications(notifications)

  const NotificationGroup = ({ title, items }: { title: string; items: typeof notifications }) => (
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-[#94a3b8] mb-2">{title}</h4>
      {items.map((notif) => (
        <div
          key={notif.id}
          className={`relative bg-[#1e293b] rounded-xl p-3 mb-2 border-l-4 ${
            notif.read ? 'border-[#334155]' : 'border-[#0ea5e9]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {notif.type === 'market' && <TrendingUp size={14} className="text-[#0ea5e9]" />}
                {notif.type === 'loan' && <Calendar size={14} className="text-[#f97316]" />}
                {notif.type === 'investment' && <DollarSign size={14} className="text-[#10b981]" />}
                <span className="text-sm font-medium text-white">{notif.title}</span>
              </div>
              <p className="text-xs text-[#cbd5e1] mb-2">{notif.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#94a3b8]">{formatTime(notif.timestamp)}</span>
                <a
                  href={notif.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markAsRead(notif.id)}
                  className="text-xs text-[#0ea5e9] hover:text-[#38bdf8] flex items-center gap-1"
                >
                  {notif.actionLabel} <ExternalLink size={10} />
                </a>
              </div>
            </div>
            <button
              onClick={() => dismissNotification(notif.id)}
              className="text-[#94a3b8] hover:text-white ml-2"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#0f172a] border-l border-[#1e293b] z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-[#1e293b]">
              <h2 className="text-lg font-bold text-white">Notifications</h2>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-[#0ea5e9] hover:text-[#38bdf8]"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#1e293b]">
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {notifications.length === 0 ? (
                <div className="text-center text-[#94a3b8] py-8">No notifications</div>
              ) : (
                <>
                  {today.length > 0 && <NotificationGroup title="Today" items={today} />}
                  {yesterday.length > 0 && <NotificationGroup title="Yesterday" items={yesterday} />}
                  {earlier.length > 0 && <NotificationGroup title="Earlier" items={earlier} />}
                  <div className="mt-4 text-center">
                    <Link href="/alerts" onClick={onClose}>
                      <span className="text-xs text-[#0ea5e9] hover:underline">View all notifications</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}