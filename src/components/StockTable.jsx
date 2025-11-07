import { useMemo } from 'react'

function headerClass(extra = '') {
  return `px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${extra}`
}

function cellClass(extra = '') {
  return `px-3 py-2 text-sm text-gray-800 ${extra}`
}

export default function StockTable({ title, data = [], highlight = 'volume', limit = 20 }) {
  const rows = useMemo(() => data.slice(0, limit), [data, limit])

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <span className="text-xs text-gray-500">Top {limit}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-white">
            <tr>
              <th className={headerClass()}>Symbol</th>
              <th className={headerClass('text-right')}>Price</th>
              <th className={headerClass('text-right')}>Change %</th>
              <th className={headerClass('text-right')}>Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => {
              const positive = row.change >= 0
              return (
                <tr key={row.symbol} className="hover:bg-gray-50/70">
                  <td className={cellClass()}>{row.symbol}</td>
                  <td className={cellClass('text-right font-medium')}>{row.price.toFixed(2)}</td>
                  <td className={cellClass(`text-right ${positive ? 'text-emerald-600' : 'text-rose-600'}`)}>
                    {positive ? '+' : ''}{row.change.toFixed(2)}%
                  </td>
                  <td className={cellClass('text-right')}>{row.volume.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
