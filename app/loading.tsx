'use client'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#020617] z-50 flex flex-col items-center justify-center gap-6">
      {/* Rotating gradient ring */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-conic-gradient animate-[spin_1.5s_linear_infinite]"></div>
        <div className="absolute inset-1 rounded-full bg-[#020617] flex items-center justify-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#0ea5e9] to-[#f97316] bg-clip-text text-transparent animate-pulse">
            ₹
          </span>
        </div>
      </div>
      <p className="text-[#94a3b8] text-sm tracking-wide animate-pulse">Loading Finwise</p>

      <style jsx global>{`
        .bg-conic-gradient {
          background: conic-gradient(from 0deg, #0ea5e9, #f97316, #0ea5e9);
        }
      `}</style>
    </div>
  )
}