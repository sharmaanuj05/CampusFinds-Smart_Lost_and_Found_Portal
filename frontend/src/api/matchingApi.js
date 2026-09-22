import { mockItems } from '../data/mockItems'
import { mockMatches } from '../data/mockMatches'
import { mockDelay } from '../lib/utils'

export async function getMatches(itemId) {
  await mockDelay(650)
  const queryItem = mockItems.find((item) => item.id === itemId)
  if (!queryItem) {
    throw new Error('Item not found.')
  }
  const matches = mockMatches
    .filter((match) => match.queryItemId === itemId)
    .map((match) => {
      const candidate = mockItems.find(
        (item) => item.id === match.candidateItemId,
      )
      return {
        id: match.id,
        score: match.score,
        signals: match.signals,
        explanation: match.explanation,
        candidate: candidate ? { ...candidate } : null,
      }
    })
    .filter((match) => match.candidate)
    .sort((a, b) => b.score - a.score)
  return { queryItem: { ...queryItem }, matches }
}