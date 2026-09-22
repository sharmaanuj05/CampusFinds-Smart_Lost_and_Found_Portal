import { cn } from '../../lib/utils'

const signalMeta = {
  visual: { label: 'Visual similarity', bar: 'bg-indigo-500' },
  category: { label: 'Category', bar: 'bg-emerald-500' },
  location: { label: 'Location relevance', bar: 'bg-amber-500' },
  date: { label: 'Date proximity', bar: 'bg-sky-500' },
}

export default function MatchScore({ score, signals }) {
  const order = ['visual', 'category', 'location', 'date']

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-gray-900">
          {score}
        </span>
        <span className="text-sm font-medium text-gray-500">Match Score</span>
      </div>

      <dl className="space-y-2.5">
        {order.map((key) => {
          const meta = signalMeta[key]
          const value = signals[key] || 0
          return (
            <div key={key}>
              <div className="flex items-center justify-between text-xs">
                <dt className="text-gray-600">{meta.label}</dt>
                <dd className="font-medium text-gray-900">{value}</dd>
              </div>
              <div
                role="meter"
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={meta.label}
                className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200"
              >
                <div
                  className={cn('h-full rounded-full', meta.bar)}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          )
        })}
      </dl>
    </div>
  )
}