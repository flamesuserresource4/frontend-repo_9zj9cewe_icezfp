import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

export default function MarketOverview({ indices }) {
  const items = [
    {
      name: 'NIFTY 50',
      value: indices?.nifty50?.value ?? 0,
      change: indices?.nifty50?.change ?? 0,
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'NIFTY BANK',
      value: indices?.banknifty?.value ?? 0,
      change: indices?.banknifty?.change ?? 0,
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      name: 'NIFTY IT',
      value: indices?.niftyit?.value ?? 0,
      change: indices?.niftyit?.change ?? 0,
      icon: TrendingDown,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(({ name, value, change, icon: Icon, color }) => {
        const positive = change >= 0
        return (
          <div key={name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{name}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-2xl font-semibold">{value.toLocaleString()}</h3>
                  <span className={
                    `text-sm font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`
                  }>
                    {positive ? '+' : ''}{change.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
