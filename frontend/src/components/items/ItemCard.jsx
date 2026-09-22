import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/utils'
import CategoryPlaceholder from '../ui/CategoryPlaceholder'
import ItemStatusBadge, { TypeBadge } from './ItemStatusBadge'

function excerpt(text, max = 110) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trim()}…` : text
}

export default function ItemCard({ item }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300">
      <Link
        to={`/items/${item.id}`}
        className="block aspect-[16/10] overflow-hidden border-b border-gray-100 bg-gray-50"
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <CategoryPlaceholder category={item.category} name={item.name} />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={item.type} />
          <ItemStatusBadge status={item.status} />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900">
            <Link to={`/items/${item.id}`} className="hover:text-indigo-700">
              {item.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">{item.category}</p>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          {excerpt(item.description)}
        </p>

        <div className="mt-auto space-y-1.5 pt-1 text-xs text-gray-500">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {item.location}
          </p>
          <p>{formatDate(item.date)}</p>
        </div>

        <Link
          to={`/items/${item.id}`}
          className="mt-2 inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}