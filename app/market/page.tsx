'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Search, ExternalLink, Sparkles,
  Bitcoin, BarChart3, Activity, Newspaper, ArrowUpRight, DollarSign
} from 'lucide-react'
import { LineChart as RechartsLine, Line, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'

// ---------- Mock Data ----------
const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 7852000, change: 2.4, volume: '₹45,200 Cr', chartData: [42000, 43500, 45000, 44500, 46000, 47800, 48500], color: '#f7931a' },
  { name: 'Ethereum', symbol: 'ETH', price: 185500, change: -0.8, volume: '₹22,100 Cr', chartData: [3100, 3050, 3150, 3200, 3180, 3120, 3080], color: '#627eea' },
  { name: 'Binance Coin', symbol: 'BNB', price: 42500, change: 1.2, volume: '₹8,700 Cr', chartData: [580, 590, 585, 600, 610, 605, 612], color: '#f3ba2f' },
  { name: 'Solana', symbol: 'SOL', price: 12500, change: 5.6, volume: '₹5,200 Cr', chartData: [140, 142, 148, 150, 155, 160, 165], color: '#14f195' },
  { name: 'Cardano', symbol: 'ADA', price: 3450, change: -1.5, volume: '₹2,300 Cr', chartData: [0.45, 0.44, 0.43, 0.42, 0.41, 0.40, 0.39], color: '#0033ad' },
]

const stockData = [
  { name: 'Reliance Industries', symbol: 'RELIANCE', price: 2850, change: 0.9, volume: '₹1,200 Cr', chartData: [2720, 2750, 2780, 2800, 2820, 2840, 2850], color: '#1e40af' },
  { name: 'Tata Consultancy', symbol: 'TCS', price: 3950, change: -0.3, volume: '₹850 Cr', chartData: [3980, 3970, 3960, 3950, 3940, 3930, 3950], color: '#0f766e' },
  { name: 'HDFC Bank', symbol: 'HDFC', price: 1680, change: 1.2, volume: '₹950 Cr', chartData: [1620, 1635, 1650, 1660, 1670, 1675, 1680], color: '#b91c1c' },
  { name: 'Infosys', symbol: 'INFY', price: 1520, change: -0.5, volume: '₹620 Cr', chartData: [1540, 1535, 1530, 1525, 1520, 1515, 1520], color: '#0ea5e9' },
  { name: 'SBI', symbol: 'SBI', price: 785, change: 2.1, volume: '₹1,500 Cr', chartData: [740, 750, 760, 770, 775, 780, 785], color: '#d97706' },
]

const indicesData = [
  { name: 'NIFTY 50', value: 22580, change: 0.7, points: 157, chartData: [22000, 22200, 22350, 22400, 22450, 22500, 22580], color: '#10b981' },
  { name: 'SENSEX', value: 74250, change: 0.6, points: 442, chartData: [73000, 73500, 73800, 74000, 74100, 74200, 74250], color: '#0ea5e9' },
  { name: 'BANK NIFTY', value: 48500, change: -0.2, points: -97, chartData: [48800, 48700, 48650, 48600, 48550, 48520, 48500], color: '#ef4444' },
]

const investmentIdeas = [
  { title: 'Green Energy Surge', description: 'Solar stocks expected to rise 15% in Q3', cta: 'View Report', url: 'https://www.moneycontrol.com', icon: '🌞' },
  { title: 'AI Sector Boom', description: 'Top AI companies to watch in 2025', cta: 'Explore', url: 'https://www.businessinsider.com', icon: '🤖' },
  { title: '₹10,000 Monthly SIP', description: 'Start a tax-saving ELSS fund today', cta: 'Apply Now', url: 'https://www.zerodha.com', icon: '📈' },
]

const ads = [
  { title: 'Trade Crypto with 0% Fees', company: 'Binance', url: 'https://www.binance.com', cta: 'Sign Up', image: '🚀' },
  { title: 'Get ₹500 Free Credit', company: 'CoinSwitch', url: 'https://www.coinswitch.co', cta: 'Claim', image: '🎁' },
]

// ---------- Helper Functions ----------
const formatINR = (num: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)
const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change}%`

// ---------- Sparkline Component ----------
const Sparkline = ({ data, color }: { data: number[]; color: string }) => (
  <ResponsiveContainer width={80} height={30}>
    <RechartsLine data={data.map((val, idx) => ({ idx, val }))}>
      <RechartsTooltip
        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#0ea5e9', color: '#fff' }}
        labelFormatter={() => ''}
        formatter={(value: number) => [`₹${value}`, 'Price']}
      />
      <Line type="monotone" dataKey="val" stroke={color} strokeWidth={1.5} dot={false} />
    </RechartsLine>
  </ResponsiveContainer>
)

// ---------- MarketTable Component (with fixed white emoji logos) ----------
const MarketTable = ({ data, type }: { data: any[]; type: 'crypto' | 'stock' | 'index' }) => {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'price' | 'change'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol?.toLowerCase().includes(search.toLowerCase())
  )
  const sorted = [...filtered].sort((a, b) => {
    let aVal = sortKey === 'price' ? (type === 'index' ? a.value : a.price) : a.change
    let bVal = sortKey === 'price' ? (type === 'index' ? b.value : b.price) : b.change
    return sortOrder === 'desc' ? bVal - aVal : aVal - bVal
  })

  const getEmoji = (name: string, symbol: string) => {
    const lowerName = name.toLowerCase()
    const lowerSym = symbol?.toLowerCase()
    if (lowerName.includes('bitcoin') || lowerSym === 'btc') return '₿'
    if (lowerName.includes('ethereum') || lowerSym === 'eth') return 'Ξ'
    if (lowerName.includes('binance') || lowerSym === 'bnb') return '🔶'
    if (lowerName.includes('solana') || lowerSym === 'sol') return '◎'
    if (lowerName.includes('cardano') || lowerSym === 'ada') return '₳'
    if (lowerName.includes('reliance')) return '🛢️'
    if (lowerName.includes('tcs')) return '💻'
    if (lowerName.includes('hdfc')) return '🏦'
    if (lowerName.includes('infosys')) return '📱'
    if (lowerName.includes('sbi')) return '🏛️'
    if (lowerName.includes('nifty')) return '📊'
    if (lowerName.includes('sensex')) return '📈'
    if (lowerName.includes('bank nifty')) return '🏦'
    return '📉'
  }

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-[#1e293b] overflow-hidden">
      <div className="p-4 border-b border-[#1e293b] flex flex-wrap gap-3 justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-[#1e293b] rounded-full text-white text-sm border border-[#334155] focus:outline-none focus:border-[#0ea5e9] w-48"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setSortKey('price'); setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc') }} className={`text-xs px-3 py-1 rounded-full ${sortKey === 'price' ? 'bg-[#0ea5e9] text-black' : 'bg-[#1e293b] text-[#94a3b8]'}`}>Price</button>
          <button onClick={() => { setSortKey('change'); setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc') }} className={`text-xs px-3 py-1 rounded-full ${sortKey === 'change' ? 'bg-[#0ea5e9] text-black' : 'bg-[#1e293b] text-[#94a3b8]'}`}>Change</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1e293b] text-[#94a3b8] text-xs">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-right">{type === 'index' ? 'Value' : 'Price (₹)'}</th>
              <th className="p-3 text-right">24h Change</th>
              <th className="p-3 text-right">Volume / Points</th>
              <th className="p-3 text-center">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, idx) => (
              <motion.tr key={item.symbol || item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {/* Fixed: added text-white to make emoji visible */}
                    <div className="w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-lg text-white">
                      {getEmoji(item.name, item.symbol)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-[10px] text-[#94a3b8]">{item.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-right font-mono text-white">{type === 'index' ? item.value.toLocaleString('en-IN') : formatINR(item.price)}</td>
                <td className="p-3 text-right">
                  <span className={`flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                    {item.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {formatChange(item.change)}
                  </span>
                </td>
                <td className="p-3 text-right text-[#94a3b8]">{item.volume || `${item.points > 0 ? '+' : ''}${item.points} pts`}</td>
                <td className="p-3 text-center"><Sparkline data={item.chartData} color={item.color} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------- Main Market Page Component ----------
export default function MarketPage() {
  const [activeTab, setActiveTab] = useState<'crypto' | 'stocks' | 'indices'>('crypto')
  const [marketNews, setMarketNews] = useState([
    { headline: 'RBI keeps repo rate unchanged at 6.5%', link: 'https://economictimes.indiatimes.com' },
    { headline: 'Bitcoin crosses ₹78 lakh amid ETF inflows', link: 'https://cointelegraph.com' },
    { headline: 'SEBI proposes new F&O regulations', link: 'https://www.moneycontrol.com' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketNews(prev => [...prev.slice(1), prev[0]])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#020617] pb-20 md:pb-0">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Animated Marquee */}
        <div className="bg-[#0f172a] rounded-2xl py-2 px-4 mb-6 overflow-hidden border border-[#1e293b]">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
            {marketNews.concat(marketNews).map((news, idx) => (
              <a key={idx} href={news.link} target="_blank" rel="noopener noreferrer" className="text-[#cbd5e1] text-sm hover:text-[#0ea5e9] transition flex items-center gap-2">
                <Newspaper size={14} className="text-[#f97316]" /> {news.headline}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 bg-[#0f172a] p-1 rounded-xl w-fit border border-[#1e293b]">
              <button
                onClick={() => setActiveTab('crypto')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'crypto' ? 'bg-[#0ea5e9] text-black shadow-md' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Bitcoin size={16} />
                <span className="text-sm font-medium">Cryptocurrency</span>
              </button>
              <button
                onClick={() => setActiveTab('stocks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'stocks' ? 'bg-[#0ea5e9] text-black shadow-md' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <BarChart3 size={16} />
                <span className="text-sm font-medium">Stocks</span>
              </button>
              <button
                onClick={() => setActiveTab('indices')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'indices' ? 'bg-[#0ea5e9] text-black shadow-md' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Activity size={16} />
                <span className="text-sm font-medium">Indices</span>
              </button>
            </div>

            {/* Animated Table */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {activeTab === 'crypto' && <MarketTable data={cryptoData} type="crypto" />}
                {activeTab === 'stocks' && <MarketTable data={stockData} type="stock" />}
                {activeTab === 'indices' && <MarketTable data={indicesData} type="index" />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Trading Insights Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-[#f97316]" size={18} />
                <h3 className="text-white font-semibold">Trading Insight</h3>
              </div>
              <p className="text-[#cbd5e1] text-sm mb-3">Bitcoin dominance rising – altcoin season may be delayed. Watch support at ₹74,000.</p>
              <div className="text-xs text-[#94a3b8] flex justify-between">
                <span>AI Analysis</span>
                <span>Updated 5 min ago</span>
              </div>
            </motion.div>

            {/* Investment Ideas */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><TrendingUp size={16} /> Investment Ideas</h3>
              <div className="space-y-3">
                {investmentIdeas.map((idea, idx) => (
                  <motion.a key={idx} href={idea.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} className="block p-3 bg-[#1e293b] rounded-xl hover:bg-[#334155] transition">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{idea.icon}</span>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{idea.title}</div>
                        <div className="text-[#94a3b8] text-xs">{idea.description}</div>
                      </div>
                      <ExternalLink size={14} className="text-[#0ea5e9]" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Sponsored Ads */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><DollarSign size={16} /> Sponsored</h3>
              <div className="space-y-3">
                {ads.map((ad, idx) => (
                  <motion.a key={idx} href={ad.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-3 bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-xl border border-[#334155]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ad.image}</span>
                      <div>
                        <div className="text-white text-sm font-medium">{ad.title}</div>
                        <div className="text-[#94a3b8] text-xs">{ad.company}</div>
                      </div>
                    </div>
                    <button className="text-[#0ea5e9] text-xs border border-[#0ea5e9] px-3 py-1 rounded-full hover:bg-[#0ea5e9] hover:text-black transition">{ad.cta}</button>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><ArrowUpRight size={16} /> Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="https://www.nseindia.com" target="_blank" className="text-[#cbd5e1] text-sm hover:text-[#0ea5e9] flex items-center gap-1">NSE India <ExternalLink size={12}/></a>
                <a href="https://www.bseindia.com" target="_blank" className="text-[#cbd5e1] text-sm hover:text-[#0ea5e9] flex items-center gap-1">BSE <ExternalLink size={12}/></a>
                <a href="https://www.coingecko.com" target="_blank" className="text-[#cbd5e1] text-sm hover:text-[#0ea5e9] flex items-center gap-1">CoinGecko <ExternalLink size={12}/></a>
                <a href="https://www.tradingview.com" target="_blank" className="text-[#cbd5e1] text-sm hover:text-[#0ea5e9] flex items-center gap-1">TradingView <ExternalLink size={12}/></a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />

      {/* Global animation style */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}