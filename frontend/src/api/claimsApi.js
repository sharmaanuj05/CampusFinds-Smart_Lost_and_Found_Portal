import { mockItems } from '../data/mockItems'
import { mockDelay } from '../lib/utils'

const storedClaims = []

export async function createClaim({ itemId, verification }) {
  await mockDelay(700)
  const item = mockItems.find((entry) => entry.id === itemId)
  if (!item) {
    throw new Error('Item not found.')
  }
  const claim = {
    id: `c_${Date.now()}`,
    itemId,
    status: 'claim_pending',
    verification,
    submittedAt: new Date().toISOString(),
  }
  storedClaims.unshift(claim)
  return { ...claim }
}

export async function getClaim(id) {
  await mockDelay(400)
  const claim = storedClaims.find((entry) => entry.id === id)
  if (!claim) {
    throw new Error('Claim not found.')
  }
  return { ...claim }
}

export async function getMyClaims(ids = []) {
  await mockDelay(400)
  return storedClaims.filter((claim) => ids.includes(claim.id))
}