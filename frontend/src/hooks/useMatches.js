import { useEffect, useState } from 'react'
import { getMatches } from '../api/matchingApi'

export function useMatches(itemId) {
  const [state, setState] = useState({ forId: null, queryItem: null, matches: [], error: null })

  useEffect(() => {
    if (!itemId) return undefined

    let active = true
    getMatches(itemId)
      .then(({ queryItem, matches }) => {
        if (active) setState({ forId: itemId, queryItem, matches, error: null })
      })
      .catch((err) => {
        if (active) {
          setState({ forId: itemId, queryItem: null, matches: [], error: err.message || 'Failed to load matches.' })
        }
      })

    return () => {
      active = false
    }
  }, [itemId])

  const loading = Boolean(itemId) && state.forId !== itemId
  const error = loading ? null : state.error
  const queryItem = loading ? null : state.queryItem
  const matches = loading ? [] : state.matches

  return { queryItem, matches, loading, error }
}