import { useEffect, useState } from 'react'
import { getItems } from '../api/itemsApi'

const DEFAULT_FILTERS = {
  search: '',
  type: '',
  category: '',
  location: '',
  dateRange: 'any',
  sort: 'recent',
}

function applyDateRange(items, range) {
  if (!range || range === 'any') return items
  const cutoff = Date.now() - (range === '7d' ? 7 : 30) * 24 * 60 * 60 * 1000
  return items.filter(
    (item) =>
      new Date(item.date).getTime() >= cutoff &&
      new Date(item.date).getTime() <= Date.now(),
  )
}

export function useItems(initialFilters = {}) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const timer = setTimeout(() => {
      setLoading(true)
      setError(null)
      getItems(filters)
        .then((data) => {
          if (active) setItems(applyDateRange(data, filters.dateRange))
        })
        .catch((err) => {
          if (active) setError(err.message || 'Failed to load items.')
        })
        .finally(() => {
          if (active) setLoading(false)
        })
    }, 250)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [filters])

  return { items, loading, error, filters, setFilters }
}