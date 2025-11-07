import { useMemo } from 'react'

function Stat({ label, value, tone = 'default' }) {
  const toneClasses = {
    default: 'bg-blue-50 text-blue-700 ring-blue-200',
    up: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    down: 'bg-rose-50 text-rose-700 ring-rose-200',
  }
  return (
    <div className={`rounded-xl px-4 py-3 ring-1 ${toneClasses[tone]} flex-1`}>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  )
}

export default function NiftyAnalysis({ breadth = { adv: 0, dec: 0, unch: 0 }, sectors = [] }) {
  const total = Math.max(1, breadth.adv + breadth.dec + breadth.unch)
  const advPct = (breadth.adv / total) * 100
  const decPct = (breadth.dec / total) * 100
  const unchPct = 100 - advPct - decPct

  const topSectors = useMemo(() => sectors.slice(0, 6), [sectors])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">NIFTY Breadth</h3>
        <div className="flex items-center gap-3">
          <Stat label="Advancing" value={breadth.adv} tone="up" />
          <Stat label="Declining" value={breadth.dec} tone="down" />
          <Stat label="Unchanged" value={breadth.unch} tone="default" />
        </div>
        <div className="mt-4 h-3 w-full rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${advPct}%` }} />
          <div className="h-full bg-rose-500" style={{ width: `${decPct}%` }} />
          <div className="h-full bg-blue-400" style={{ width: `${unchPct}%` }} />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:col-span-2">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Sector Heat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {topSectors.map((s) => {
            const positive = s.change >= 0
            return (
              <div key={s.name} className={`rounded-lg p-4 ring-1 ${positive ? 'ring-emerald-200 bg-emerald-50' : 'ring-rose-200 bg-rose-50'}`}>
                <p className="text-xs text-gray-600">{s.name}</p>
                <p className={`mt-1 text-lg font-semibold ${positive ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {positive ? '+' : ''}{s.change.toFixed(2)}%
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
