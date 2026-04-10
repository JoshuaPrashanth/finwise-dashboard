'use client'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Funds', value: 150000, color: '#0ea5e9' },
  { name: 'Savings', value: 100000, color: '#10b981' },
  { name: 'FDs', value: 80000, color: '#f97316' },
  { name: 'Loans', value: 95000, color: '#ef4444' },
]

const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
const total = data.reduce((sum, item) => sum + item.value, 0)
const dataWithPercent = data.map(item => ({ ...item, percent: ((item.value / total) * 100).toFixed(1) }))

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-[#1e293b] border border-[#0ea5e9] rounded-lg p-2 shadow-lg text-xs">
        <p className="text-white font-semibold">{data.name}</p>
        <p className="text-[#0ea5e9]">{formatINR(data.value)}</p>
        <p className="text-[#f97316]">{data.percent}%</p>
      </div>
    )
  }
  return null
}

export default function PortfolioCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.1 }} 
      className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#0ea5e9] transition-all h-full"
    >
      <h3 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#f97316] rounded-full"></span> Portfolio Breakdown
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
<div className="w-28 h-28 md:w-32 md:h-32 shrink-0">          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataWithPercent} cx="50%" cy="50%" innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value" stroke="#0f172a" strokeWidth={2} label={false}>
                {dataWithPercent.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full space-y-2">
          {dataWithPercent.map((item) => (
            <div key={item.name} className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }}></div>
                <span className="text-[#e2e8f0] text-sm">{item.name}</span>
              </div>
              <div className="text-right flex flex-wrap justify-end gap-1">
                <span className="text-[#0ea5e9] font-medium text-sm whitespace-nowrap">{formatINR(item.value)}</span>
                <span className="text-[#94a3b8] text-xs whitespace-nowrap">({item.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}