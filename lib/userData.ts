export type UserData = {
  // Home Page
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  portfolio: { name: string; value: number; color: string }[]
  tradingWalletBalance: number
  loans: { name: string; remaining: number; paidPercent: number; dueDate: string }[]
  // Credit Score Page
  creditScore: number
  creditHistory: { month: string; score: number }[]
  loanHistory: { type: string; amount: number; status: string; date: string }[]
  // Status Page
  netWorth: number
  fds: { bank: string; principal: number; rate: number; tenure: number; maturity: number }[]
  tradingPositions: { asset: string; symbol: string; quantity: number; buyPrice: number; currentPrice: number; pnl: number; pnlPercent: number }[]
  recentTrades: { date: string; asset: string; action: string; quantity: number; price: number; total: number }[]
  // Market Page (optional – can use generic data or per-user watchlist)
  // For simplicity, market data can be common, but we can vary if needed.
}

export const userDataMap: Record<string, UserData> = {
  arun: {
    totalBalance: 320000,
    monthlyIncome: 65000,
    monthlyExpenses: 42000,
    portfolio: [
      { name: 'Funds', value: 120000, color: '#0ea5e9' },
      { name: 'Savings', value: 80000, color: '#10b981' },
      { name: 'FDs', value: 60000, color: '#f97316' },
      { name: 'Loans', value: 60000, color: '#ef4444' },
    ],
    tradingWalletBalance: 25000,
    loans: [
      { name: 'Personal Loan', remaining: 120000, paidPercent: 40, dueDate: '10 May', emi: 4200 },
      { name: 'Education Loan', remaining: 200000, paidPercent: 20, dueDate: '1 June', emi: 5800 },
    ],
    creditScore: 685,
    creditHistory: [
      { month: 'Nov', score: 660 },
      { month: 'Dec', score: 668 },
      { month: 'Jan', score: 672 },
      { month: 'Feb', score: 678 },
      { month: 'Mar', score: 682 },
      { month: 'Apr', score: 685 },
    ],
    loanHistory: [
      { type: 'Car Loan', amount: 500000, status: 'repaid', date: '15 Mar 2024' },
      { type: 'Personal Loan', amount: 150000, status: 'lapsed', date: '20 Jan 2025' },
    ],
    netWorth: 5600000,
    fds: [{ bank: 'SBI', principal: 60000, rate: 7.1, tenure: 12, maturity: 64260 }],
    tradingPositions: [
      { asset: 'Bitcoin', symbol: 'BTC', quantity: 0.02, buyPrice: 6800000, currentPrice: 7852000, pnl: 21040, pnlPercent: 15.5 },
    ],
    recentTrades: [
      { date: '2025-04-05', asset: 'Bitcoin', action: 'buy', quantity: 0.01, price: 7700000, total: 77000 },
    ],
  },
  rahul: {
    totalBalance: 850000,
    monthlyIncome: 120000,
    monthlyExpenses: 55000,
    portfolio: [
      { name: 'Funds', value: 300000, color: '#0ea5e9' },
      { name: 'Savings', value: 250000, color: '#10b981' },
      { name: 'FDs', value: 200000, color: '#f97316' },
      { name: 'Loans', value: 100000, color: '#ef4444' },
    ],
    tradingWalletBalance: 75000,
    loans: [
      { name: 'Home Loan', remaining: 3500000, paidPercent: 30, dueDate: '5 May', emi: 28500 },
    ],
    creditScore: 745,
    creditHistory: [
      { month: 'Nov', score: 710 },
      { month: 'Dec', score: 720 },
      { month: 'Jan', score: 728 },
      { month: 'Feb', score: 735 },
      { month: 'Mar', score: 740 },
      { month: 'Apr', score: 745 },
    ],
    loanHistory: [
      { type: 'Car Loan', amount: 800000, status: 'repaid', date: '10 Dec 2024' },
    ],
    netWorth: 8500000,
    fds: [{ bank: 'HDFC', principal: 200000, rate: 7.4, tenure: 24, maturity: 229600 }],
    tradingPositions: [
      { asset: 'Ethereum', symbol: 'ETH', quantity: 2, buyPrice: 165000, currentPrice: 185500, pnl: 41000, pnlPercent: 12.4 },
      { asset: 'Reliance', symbol: 'RELIANCE', quantity: 50, buyPrice: 2650, currentPrice: 2850, pnl: 10000, pnlPercent: 7.5 },
    ],
    recentTrades: [
      { date: '2025-04-02', asset: 'Ethereum', action: 'buy', quantity: 1, price: 180000, total: 180000 },
      { date: '2025-04-01', asset: 'Reliance', action: 'sell', quantity: 20, price: 2750, total: 55000 },
    ],
  },
  anita: {
    totalBalance: 210000,
    monthlyIncome: 55000,
    monthlyExpenses: 38000,
    portfolio: [
      { name: 'Funds', value: 80000, color: '#0ea5e9' },
      { name: 'Savings', value: 70000, color: '#10b981' },
      { name: 'FDs', value: 40000, color: '#f97316' },
      { name: 'Loans', value: 20000, color: '#ef4444' },
    ],
    tradingWalletBalance: 10000,
    loans: [
      { name: 'Education Loan', remaining: 450000, paidPercent: 50, dueDate: '20 May', emi: 5800 },
    ],
    creditScore: 712,
    creditHistory: [
      { month: 'Nov', score: 690 },
      { month: 'Dec', score: 695 },
      { month: 'Jan', score: 702 },
      { month: 'Feb', score: 707 },
      { month: 'Mar', score: 710 },
      { month: 'Apr', score: 712 },
    ],
    loanHistory: [
      { type: 'Personal Loan', amount: 100000, status: 'repaid', date: '5 Feb 2025' },
    ],
    netWorth: 2100000,
    fds: [{ bank: 'ICICI', principal: 40000, rate: 7.0, tenure: 6, maturity: 41400 }],
    tradingPositions: [],
    recentTrades: [],
  },
  vikram: {
    totalBalance: 1250000,
    monthlyIncome: 180000,
    monthlyExpenses: 90000,
    portfolio: [
      { name: 'Funds', value: 500000, color: '#0ea5e9' },
      { name: 'Savings', value: 400000, color: '#10b981' },
      { name: 'FDs', value: 250000, color: '#f97316' },
      { name: 'Loans', value: 100000, color: '#ef4444' },
    ],
    tradingWalletBalance: 120000,
    loans: [
      { name: 'Home Loan', remaining: 2800000, paidPercent: 44, dueDate: '12 May', emi: 25500 },
    ],
    creditScore: 788,
    creditHistory: [
      { month: 'Nov', score: 760 },
      { month: 'Dec', score: 768 },
      { month: 'Jan', score: 774 },
      { month: 'Feb', score: 780 },
      { month: 'Mar', score: 784 },
      { month: 'Apr', score: 788 },
    ],
    loanHistory: [
      { type: 'Car Loan', amount: 1200000, status: 'repaid', date: '20 Nov 2024' },
      { type: 'Personal Loan', amount: 300000, status: 'repaid', date: '10 Mar 2025' },
    ],
    netWorth: 12500000,
    fds: [{ bank: 'Axis', principal: 250000, rate: 7.2, tenure: 18, maturity: 277000 }],
    tradingPositions: [
      { asset: 'Bitcoin', symbol: 'BTC', quantity: 0.1, buyPrice: 6000000, currentPrice: 7852000, pnl: 185200, pnlPercent: 30.9 },
      { asset: 'Solana', symbol: 'SOL', quantity: 50, buyPrice: 12000, currentPrice: 12500, pnl: 25000, pnlPercent: 4.2 },
    ],
    recentTrades: [
      { date: '2025-04-07', asset: 'Bitcoin', action: 'buy', quantity: 0.05, price: 7700000, total: 385000 },
      { date: '2025-04-06', asset: 'Solana', action: 'sell', quantity: 10, price: 12300, total: 123000 },
    ],
  },
  priya: {
    totalBalance: 430000,
    monthlyIncome: 82000,
    monthlyExpenses: 47000,
    portfolio: [
      { name: 'Funds', value: 180000, color: '#0ea5e9' },
      { name: 'Savings', value: 120000, color: '#10b981' },
      { name: 'FDs', value: 90000, color: '#f97316' },
      { name: 'Loans', value: 40000, color: '#ef4444' },
    ],
    tradingWalletBalance: 35000,
    loans: [
      { name: 'Personal Loan', remaining: 80000, paidPercent: 60, dueDate: '25 May', emi: 3500 },
    ],
    creditScore: 698,
    creditHistory: [
      { month: 'Nov', score: 670 },
      { month: 'Dec', score: 678 },
      { month: 'Jan', score: 684 },
      { month: 'Feb', score: 690 },
      { month: 'Mar', score: 694 },
      { month: 'Apr', score: 698 },
    ],
    loanHistory: [
      { type: 'Education Loan', amount: 300000, status: 'repaid', date: '15 Jan 2025' },
    ],
    netWorth: 4300000,
    fds: [{ bank: 'SBI', principal: 90000, rate: 7.1, tenure: 12, maturity: 96390 }],
    tradingPositions: [
      { asset: 'TCS', symbol: 'TCS', quantity: 10, buyPrice: 3850, currentPrice: 3950, pnl: 1000, pnlPercent: 2.6 },
    ],
    recentTrades: [
      { date: '2025-04-03', asset: 'TCS', action: 'buy', quantity: 5, price: 3900, total: 19500 },
    ],
  },
  arjun: {
    totalBalance: 520000,
    monthlyIncome: 95000,
    monthlyExpenses: 60000,
    portfolio: [
      { name: 'Funds', value: 220000, color: '#0ea5e9' },
      { name: 'Savings', value: 150000, color: '#10b981' },
      { name: 'FDs', value: 100000, color: '#f97316' },
      { name: 'Loans', value: 50000, color: '#ef4444' },
    ],
    tradingWalletBalance: 50000,
    loans: [
      { name: 'Car Loan', remaining: 350000, paidPercent: 65, dueDate: '18 May', emi: 10500 },
    ],
    creditScore: 735,
    creditHistory: [
      { month: 'Nov', score: 700 },
      { month: 'Dec', score: 710 },
      { month: 'Jan', score: 718 },
      { month: 'Feb', score: 725 },
      { month: 'Mar', score: 730 },
      { month: 'Apr', score: 735 },
    ],
    loanHistory: [
      { type: 'Home Loan', amount: 2000000, status: 'repaid', date: '10 Oct 2024' },
    ],
    netWorth: 5200000,
    fds: [{ bank: 'HDFC', principal: 100000, rate: 7.4, tenure: 24, maturity: 114800 }],
    tradingPositions: [
      { asset: 'Infosys', symbol: 'INFY', quantity: 20, buyPrice: 1500, currentPrice: 1520, pnl: 400, pnlPercent: 1.3 },
    ],
    recentTrades: [],
  },
  neha: {
    totalBalance: 310000,
    monthlyIncome: 68000,
    monthlyExpenses: 45000,
    portfolio: [
      { name: 'Funds', value: 130000, color: '#0ea5e9' },
      { name: 'Savings', value: 100000, color: '#10b981' },
      { name: 'FDs', value: 60000, color: '#f97316' },
      { name: 'Loans', value: 20000, color: '#ef4444' },
    ],
    tradingWalletBalance: 15000,
    loans: [
      { name: 'Education Loan', remaining: 250000, paidPercent: 70, dueDate: '5 June', emi: 5800 },
    ],
    creditScore: 705,
    creditHistory: [
      { month: 'Nov', score: 680 },
      { month: 'Dec', score: 688 },
      { month: 'Jan', score: 694 },
      { month: 'Feb', score: 698 },
      { month: 'Mar', score: 702 },
      { month: 'Apr', score: 705 },
    ],
    loanHistory: [
      { type: 'Personal Loan', amount: 50000, status: 'repaid', date: '20 Feb 2025' },
    ],
    netWorth: 3100000,
    fds: [{ bank: 'ICICI', principal: 60000, rate: 7.0, tenure: 6, maturity: 62100 }],
    tradingPositions: [],
    recentTrades: [],
  },
  rohit: {
    totalBalance: 680000,
    monthlyIncome: 110000,
    monthlyExpenses: 72000,
    portfolio: [
      { name: 'Funds', value: 280000, color: '#0ea5e9' },
      { name: 'Savings', value: 200000, color: '#10b981' },
      { name: 'FDs', value: 150000, color: '#f97316' },
      { name: 'Loans', value: 50000, color: '#ef4444' },
    ],
    tradingWalletBalance: 60000,
    loans: [
      { name: 'Home Loan', remaining: 1800000, paidPercent: 55, dueDate: '22 May', emi: 18500 },
    ],
    creditScore: 765,
    creditHistory: [
      { month: 'Nov', score: 740 },
      { month: 'Dec', score: 748 },
      { month: 'Jan', score: 754 },
      { month: 'Feb', score: 758 },
      { month: 'Mar', score: 762 },
      { month: 'Apr', score: 765 },
    ],
    loanHistory: [
      { type: 'Car Loan', amount: 600000, status: 'repaid', date: '1 Dec 2024' },
    ],
    netWorth: 6800000,
    fds: [{ bank: 'Axis', principal: 150000, rate: 7.2, tenure: 18, maturity: 166200 }],
    tradingPositions: [
      { asset: 'Bitcoin', symbol: 'BTC', quantity: 0.03, buyPrice: 7000000, currentPrice: 7852000, pnl: 25560, pnlPercent: 12.2 },
    ],
    recentTrades: [],
  },
  kavya: {
    totalBalance: 470000,
    monthlyIncome: 89000,
    monthlyExpenses: 53000,
    portfolio: [
      { name: 'Funds', value: 190000, color: '#0ea5e9' },
      { name: 'Savings', value: 140000, color: '#10b981' },
      { name: 'FDs', value: 100000, color: '#f97316' },
      { name: 'Loans', value: 40000, color: '#ef4444' },
    ],
    tradingWalletBalance: 28000,
    loans: [
      { name: 'Personal Loan', remaining: 60000, paidPercent: 70, dueDate: '28 May', emi: 2800 },
    ],
    creditScore: 718,
    creditHistory: [
      { month: 'Nov', score: 690 },
      { month: 'Dec', score: 698 },
      { month: 'Jan', score: 705 },
      { month: 'Feb', score: 710 },
      { month: 'Mar', score: 714 },
      { month: 'Apr', score: 718 },
    ],
    loanHistory: [
      { type: 'Education Loan', amount: 400000, status: 'repaid', date: '5 Mar 2025' },
    ],
    netWorth: 4700000,
    fds: [{ bank: 'SBI', principal: 100000, rate: 7.1, tenure: 12, maturity: 107100 }],
    tradingPositions: [
      { asset: 'Ethereum', symbol: 'ETH', quantity: 1, buyPrice: 170000, currentPrice: 185500, pnl: 15500, pnlPercent: 9.1 },
    ],
    recentTrades: [],
  },
  meena: {
    totalBalance: 380000,
    monthlyIncome: 75000,
    monthlyExpenses: 49000,
    portfolio: [
      { name: 'Funds', value: 160000, color: '#0ea5e9' },
      { name: 'Savings', value: 110000, color: '#10b981' },
      { name: 'FDs', value: 70000, color: '#f97316' },
      { name: 'Loans', value: 40000, color: '#ef4444' },
    ],
    tradingWalletBalance: 20000,
    loans: [
      { name: 'Car Loan', remaining: 250000, paidPercent: 50, dueDate: '15 May', emi: 8500 },
    ],
    creditScore: 692,
    creditHistory: [
      { month: 'Nov', score: 670 },
      { month: 'Dec', score: 676 },
      { month: 'Jan', score: 682 },
      { month: 'Feb', score: 686 },
      { month: 'Mar', score: 689 },
      { month: 'Apr', score: 692 },
    ],
    loanHistory: [
      { type: 'Personal Loan', amount: 100000, status: 'repaid', date: '10 Jan 2025' },
    ],
    netWorth: 3800000,
    fds: [{ bank: 'HDFC', principal: 70000, rate: 7.4, tenure: 24, maturity: 80360 }],
    tradingPositions: [],
    recentTrades: [],
  },
}