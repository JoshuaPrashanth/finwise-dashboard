"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FinancialSummaryCard from "@/components/FinancialSummaryCard";
import PortfolioCard from "@/components/PortfolioCard";
import TradingCard from "@/components/TradingCard";
import LoansCard from "@/components/LoansCard";
import {
  TrendingUp,
  TrendingDown,
  Package,
  BarChart3,
  DollarSign,
  Factory,
  Utensils,
  Globe,
  Zap,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// ---------- Mock Data ----------

// Food Industry Data
const foodQuarterlyData = [
  {
    quarter: "Q1 2024",
    revenue: 4280,
    revenueGrowth: 5.2,
    demand: 86,
    commodityPrice: 112,
  },
  {
    quarter: "Q2 2024",
    revenue: 4450,
    revenueGrowth: 4.0,
    demand: 88,
    commodityPrice: 108,
  },
  {
    quarter: "Q3 2024",
    revenue: 4720,
    revenueGrowth: 6.1,
    demand: 91,
    commodityPrice: 105,
  },
  {
    quarter: "Q4 2024",
    revenue: 5150,
    revenueGrowth: 9.1,
    demand: 94,
    commodityPrice: 98,
  },
];

const exportImport = {
  export: 3420,
  import: 2890,
  exportGrowth: 8.2,
  importGrowth: 3.5,
};

// Chemical Industry Data
const chemicalQuarterlyData = [
  {
    quarter: "Q1 2024",
    profitMargin: 18.2,
    production: 1240,
    rawMaterialCost: 245,
  },
  {
    quarter: "Q2 2024",
    profitMargin: 17.5,
    production: 1280,
    rawMaterialCost: 252,
  },
  {
    quarter: "Q3 2024",
    profitMargin: 19.1,
    production: 1350,
    rawMaterialCost: 238,
  },
  {
    quarter: "Q4 2024",
    profitMargin: 20.4,
    production: 1420,
    rawMaterialCost: 225,
  },
];

// Combined Market Insights – sector comparison only
const sectorComparison = [
  { sector: "Food Processing", growth: 8.5, value: 85 },
  { sector: "Chemicals", growth: 7.2, value: 72 },
  { sector: "Pharma", growth: 10.1, value: 101 },
  { sector: "Textiles", growth: 3.2, value: 32 },
  { sector: "Automotive", growth: 5.8, value: 58 },
];

// ---------- Helper Components ----------
const KpiCard = ({
  title,
  value,
  change,
  icon: Icon,
  changeType = "positive",
  suffix = "",
}) => (
  <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b] hover:border-[#0ea5e9] transition-all duration-200 hover:scale-[1.02]">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[#94a3b8] text-sm">{title}</span>
      <Icon className="text-[#0ea5e9]" size={20} />
    </div>
    <div className="text-2xl font-bold text-white">
      {value}
      {suffix}
    </div>
    <div
      className={`flex items-center gap-1 text-sm mt-1 ${changeType === "positive" ? "text-[#10b981]" : "text-[#ef4444]"}`}
    >
      {changeType === "positive" ? (
        <TrendingUp size={14} />
      ) : (
        <TrendingDown size={14} />
      )}
      <span>{Math.abs(change)}%</span>
      <span className="text-[#94a3b8] text-xs">vs last month</span>
    </div>
  </div>
);

const TrendBadge = ({ value, isPositive }) => (
  <span
    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#ef4444]/20 text-[#ef4444]"}`}
  >
    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
    {Math.abs(value)}%
  </span>
);

// ---------- Main Homepage Component ----------
export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] pb-16 md:pb-0">
        <Header />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Existing Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <FinancialSummaryCard />
            <PortfolioCard />
            <TradingCard />
            <LoansCard />
          </div>

          {/* ========== SECTION 1: FOOD INDUSTRY FINANCIAL TRENDS ========== */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="text-[#0ea5e9]" size={24} />
              <h2 className="text-white text-xl font-semibold">
                Food Industry Financial Trends
              </h2>
            </div>
            <div className="space-y-6">
              {/* KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Revenue Growth"
                  value="+12.4"
                  change={12.4}
                  icon={TrendingUp}
                  changeType="positive"
                  suffix="%"
                />
                <KpiCard
                  title="Commodity Price Index"
                  value="98.2"
                  change={-3.5}
                  icon={DollarSign}
                  changeType="negative"
                  suffix=" pts"
                />
                <KpiCard
                  title="Demand Analytics"
                  value="94"
                  change={+5.2}
                  icon={BarChart3}
                  changeType="positive"
                  suffix="%"
                />
                <KpiCard
                  title="Export/Import Ratio"
                  value="1.18"
                  change={+2.1}
                  icon={Globe}
                  changeType="positive"
                  suffix=""
                />
              </div>
              {/* Chart + Metrics */}
              <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                <h3 className="text-white font-semibold mb-4">
                  Quarterly Performance & Trend
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={foodQuarterlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="quarter" stroke="#94a3b8" />
                        <YAxis
                          yAxisId="left"
                          stroke="#94a3b8"
                          tickFormatter={(v) => `₹${v / 100}Cr`}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#f97316"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            borderColor: "#0ea5e9",
                          }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#0ea5e9"
                          strokeWidth={2}
                          name="Revenue (₹ Cr)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="commodityPrice"
                          stroke="#f97316"
                          strokeWidth={2}
                          name="Commodity Price Index"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#1e293b] rounded-xl p-3">
                      <p className="text-[#94a3b8] text-xs">Export Trend</p>
                      <p className="text-white text-lg font-bold">
                        ₹{exportImport.export} Cr
                      </p>
                      <TrendBadge
                        value={exportImport.exportGrowth}
                        isPositive={true}
                      />
                    </div>
                    <div className="bg-[#1e293b] rounded-xl p-3">
                      <p className="text-[#94a3b8] text-xs">Import Trend</p>
                      <p className="text-white text-lg font-bold">
                        ₹{exportImport.import} Cr
                      </p>
                      <TrendBadge
                        value={exportImport.importGrowth}
                        isPositive={true}
                      />
                    </div>
                    <div className="bg-[#1e293b] rounded-xl p-3">
                      <p className="text-[#94a3b8] text-xs">
                        Top Trending Commodity
                      </p>
                      <p className="text-white text-md font-semibold">
                        Wheat +8.2%
                      </p>
                      <p className="text-[#10b981] text-xs">
                        Soybean +5.1% • Sugar +3.4%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SECTION 2: CHEMICAL INDUSTRY PROFITS & LOSSES ========== */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Factory className="text-[#f97316]" size={24} />
              <h2 className="text-white text-xl font-semibold">
                Chemical Industry Profits & Losses
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Avg. Profit Margin"
                  value="20.4"
                  change={+2.3}
                  icon={TrendingUp}
                  changeType="positive"
                  suffix="%"
                />
                <KpiCard
                  title="Production (KT)"
                  value="1420"
                  change={+8.7}
                  icon={Package}
                  changeType="positive"
                  suffix=" KT"
                />
                <KpiCard
                  title="Raw Material Index"
                  value="225"
                  change={-6.5}
                  icon={DollarSign}
                  changeType="positive"
                  suffix=" pts"
                />
                <KpiCard
                  title="Net P&L (₹ Cr)"
                  value="487"
                  change={+12.1}
                  icon={TrendingUp}
                  changeType="positive"
                  suffix=" Cr"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 size={18} /> Production & Margin Trend
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chemicalQuarterlyData}>
                        <CartesianGrid stroke="#1e293b" />
                        <XAxis dataKey="quarter" stroke="#94a3b8" />
                        <YAxis yAxisId="left" stroke="#94a3b8" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#f97316"
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1e293b" }}
                        />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="production"
                          stroke="#0ea5e9"
                          fill="#0ea5e9"
                          fillOpacity={0.2}
                          name="Production (KT)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="profitMargin"
                          stroke="#f97316"
                          strokeWidth={2}
                          name="Profit Margin %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle size={18} /> Market Movement Indicators
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-[#1e293b] p-3 rounded-xl">
                      <p className="text-[#94a3b8] text-xs">
                        Raw Material Fluctuation (QoQ)
                      </p>
                      <p className="text-white text-xl font-bold">-6.5%</p>
                      <span className="text-[#10b981] text-xs">
                        Benefiting margins
                      </span>
                    </div>
                    <div className="bg-[#1e293b] p-3 rounded-xl">
                      <p className="text-[#94a3b8] text-xs">Market Sentiment</p>
                      <p className="text-white text-xl font-bold">Bullish</p>
                      <div className="w-full bg-[#334155] rounded-full h-2 mt-2">
                        <div className="bg-[#10b981] h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-[#1e293b] p-3 rounded-xl">
                      <p className="text-[#94a3b8] text-xs">
                        Gains/Losses (YTD)
                      </p>
                      <p className="text-white text-xl font-bold text-[#10b981]">
                        +₹2,340 Cr
                      </p>
                      <span className="text-[#94a3b8] text-xs">12.8% ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SECTION 3: COMBINED MARKET INSIGHTS (Sector Comparison only) ========== */}
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-[#10b981]" size={24} />
              <h2 className="text-white text-xl font-semibold">
                Combined Market Insights
              </h2>
            </div>
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]">
              <h3 className="text-white font-semibold mb-3">
                Sector Comparison (Growth %)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sectorComparison}
                    layout="vertical"
                    margin={{ left: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      type="number"
                      stroke="#94a3b8"
                      tickFormatter={(v) => `${v}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="sector"
                      stroke="#94a3b8"
                      width={100}
                    />
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      contentStyle={{ backgroundColor: "#1e293b" }}
                    />
                    <Bar dataKey="growth" fill="#0ea5e9" radius={[0, 4, 4, 0]}>
                      {sectorComparison.map((entry, idx) => (
                        <Cell
                          key={idx}
                          fill={entry.growth >= 0 ? "#0ea5e9" : "#ef4444"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
