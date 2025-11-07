import { Search, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const timeframes = [
  { key: '1D', label: '1D' },
  { key: '1W', label: '1W' },
  { key: '1M', label: '1M' },
  { key: '3M', label: '3M' },
]

export default function Header({ query, onQueryChange, timeframe, onTimeframeChange }) {
  const [localQuery, setLocalQuery] = useState(query || '')

  // Debounce search input updates to parent
  useEffect(() => {
    const t = setTimeout(() => onQueryChange(localQuery), 200)
    return () => clearTimeout(t)
  }, [localQuery, onQueryChange])

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">India Stock Analyzer</h1>
          <p className="text-sm text-gray-500">Live-style dashboard for high-volume and circuit moves</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search symbol or sector..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur"
          />
        </div>

        <div className="flex items-center gap-2 p-1 rounded-lg border border-gray-200 bg-white/70">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => onTimeframeChange(tf.key)}
              className={classNames(
                'px-3 py-1.5 rounded-md text-sm font-medium transition',
                timeframe === tf.key ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
