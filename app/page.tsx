'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import FinancialSummaryCard from '@/components/FinancialSummaryCard'
import PortfolioCard from '@/components/PortfolioCard'
import TradingCard from '@/components/TradingCard'
import LoansCard from '@/components/LoansCard'

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] pb-16 md:pb-0">
        <Header />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <FinancialSummaryCard />
            <PortfolioCard />
            <TradingCard />
            <LoansCard />
          </div>
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  )
}