import { RotateCcw, Search } from 'lucide-react'
import { CATEGORIES, ITEM_LOCATIONS } from '../../data/mockItems'
import { selectClass } from '../../lib/fieldStyles'

const DATE_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
]

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most recent' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name', label: 'Name A–Z' },
]

export default function ItemFilters({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch })

  const hasFilters =
    value.search || value.type || value.category || value.location || value.dateRange

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="relative lg:col-span-4">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <label htmlFor="item-search" className="sr-only">
            Search items
          </label>
          <input
            id="item-search"
            type="search"
            value={value.search || ''}
            onChange={(event) => update({ search: event.target.value })}
            placeholder="Search by name, location, keyword…"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <label className="block lg:col-span-2">
          <span className="sr-only">Report type</span>
          <select
            value={value.type || ''}
            onChange={(event) => update({ type: event.target.value })}
            className={selectClass}
          >
            <option value="">Lost / Found</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </label>

        <label className="block lg:col-span-2">
          <span className="sr-only">Category</span>
          <select
            value={value.category || ''}
            onChange={(event) => update({ category: event.target.value })}
            className={selectClass}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block lg:col-span-2">
          <span className="sr-only">Location</span>
          <select
            value={value.location || ''}
            onChange={(event) => update({ location: event.target.value })}
            className={selectClass}
          >
            <option value="">All locations</option>
            {ITEM_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="block lg:col-span-2">
          <span className="sr-only">Time range</span>
          <select
            value={value.dateRange || 'any'}
            onChange={(event) => update({ dateRange: event.target.value })}
            className={selectClass}
          >
            {DATE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block lg:col-span-2">
          <span className="sr-only">Sort by</span>
          <select
            value={value.sort || 'recent'}
            onChange={(event) => update({ sort: event.target.value })}
            className={selectClass}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {hasFilters && (
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">
            Filters applied to campus reports.
          </p>
          <button
            type="button"
            onClick={() =>
              onChange({
                search: '',
                type: '',
                category: '',
                location: '',
                dateRange: 'any',
                sort: 'recent',
              })
            }
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}