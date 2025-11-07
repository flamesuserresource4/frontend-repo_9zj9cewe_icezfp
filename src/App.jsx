import { useMemo, useState } from 'react'
import Header from './components/Header'
import MarketOverview from './components/MarketOverview'
import StockTable from './components/StockTable'
import NiftyAnalysis from './components/NiftyAnalysis'

// Mock data generator to simulate Indian market focus (can be wired to backend later)
function genStock(symbol) {
  const price = 50 + Math.random() * 1500
  const change = (Math.random() - 0.5) * 10
  const volume = Math.floor(1_00_000 + Math.random() * 2_00_00_000)
  return { symbol, price, change, volume }
}

const symbols = [
  'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'LT', 'ITC', 'TATAMOTORS', 'SBIN', 'ADANIENT',
  'HCLTECH', 'BHARTIARTL', 'MARUTI', 'ASIANPAINT', 'AXISBANK', 'ULTRACEMCO', 'WIPRO', 'SUNPHARMA', 'ONGC', 'POWERGRID'
]

export default function App() {
  const [query, setQuery] = useState('')
  const [timeframe, setTimeframe] = useState('1D')

  const universe = useMemo(() => symbols.map(genStock), [])

  const filtered = useMemo(() => {
    const q = query.trim().toUpperCase()
    return q ? universe.filter((s) => s.symbol.includes(q)) : universe
  }, [query, universe])

  const highVolume = useMemo(() => [...filtered].sort((a, b) => b.volume - a.volume).slice(0, 20), [filtered])
  const topGainers = useMemo(() => [...filtered].sort((a, b) => b.change - a.change).slice(0, 20), [filtered])
  const topLosers = useMemo(() => [...filtered].sort((a, b) => a.change - b.change).slice(0, 20), [filtered])

  const indices = {
    nifty50: { value: 22450 + Math.random() * 100, change: (Math.random() - 0.5) * 1.2 },
    banknifty: { value: 48200 + Math.random() * 100, change: (Math.random() - 0.5) * 1.2 },
    niftyit: { value: 35300 + Math.random() * 100, change: (Math.random() - 0.5) * 1.2 },
  }

  const breadth = { adv: Math.floor(28 + Math.random() * 12), dec: Math.floor(12 + Math.random() * 10), unch: 50 - (Math.floor(28 + Math.random() * 12) + Math.floor(12 + Math.random() * 10)) }

  const sectors = [
    { name: 'Auto', change: (Math.random() - 0.5) * 2.5 },
    { name: 'Bank', change: (Math.random() - 0.5) * 2.5 },
    { name: 'IT', change: (Math.random() - 0.5) * 2.5 },
    { name: 'FMCG', change: (Math.random() - 0.5) * 2.5 },
    { name: 'Pharma', change: (Math.random() - 0.5) * 2.5 },
    { name: 'Energy', change: (Math.random() - 0.5) * 2.5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header
          query={query}
          onQueryChange={setQuery}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />

        <div className="mt-6">
          <MarketOverview indices={indices} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockTable title="High Volume Buys" data={highVolume} highlight="volume" />
          <StockTable title="Upper Circuit / Top Gainers" data={topGainers} highlight="change" />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockTable title="Lower Circuit / Top Losers" data={topLosers} highlight="change" />
          <NiftyAnalysis breadth={breadth} sectors={sectors} />
        </div>

        <p className="mt-8 text-xs text-gray-500">
          Data simulated for demo. Connect to your backend or broker APIs for live NSE/BSE data.
        </p>
      </div>
    </div>
  )
}
