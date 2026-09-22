import { cn } from '../../lib/utils'

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  possible_match: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  claim_pending: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  verified: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  returned: 'bg-gray-100 text-gray-700 ring-gray-500/20',
  closed: 'bg-gray-100 text-gray-600 ring-gray-500/20',
}

const labels = {
  active: 'Active',
  possible_match: 'Possible Match',
  claim_pending: 'Claim Pending',
  verified: 'Verified',
  returned: 'Returned',
  closed: 'Closed',
}

const typeStyles = {
  lost: 'bg-red-50 text-red-700 ring-red-600/20',
  found: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
}

export function TypeBadge({ type }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        typeStyles[type] || typeStyles.active,
      )}
    >
      {type === 'lost' ? 'Lost' : 'Found'}
    </span>
  )
}

export default function ItemStatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        statusStyles[status] || statusStyles.active,
        className,
      )}
    >
      {labels[status] || labels.active}
    </span>
  )
}