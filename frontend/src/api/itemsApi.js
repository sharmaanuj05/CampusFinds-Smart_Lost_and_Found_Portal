import { mockItems } from '../data/mockItems'
import { mockDelay } from '../lib/utils'

const stored = [...mockItems]

function matchesSearch(item, term) {
  if (!term) return true
  const needle = term.trim().toLowerCase()
  return (
    item.name.toLowerCase().includes(needle) ||
    item.description.toLowerCase().includes(needle) ||
    item.location.toLowerCase().includes(needle) ||
    item.category.toLowerCase().includes(needle)
  )
}

function sortItems(items, sort) {
  switch (sort) {
    case 'recent':
      return [...items].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )
    case 'oldest':
      return [...items].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      )
    case 'name':
      return [...items].sort((a, b) => a.name.localeCompare(b.name))
    default:
      return items
  }
}

export async function getItems(params = {}) {
  await mockDelay()
  const { type, category, location, search, sort } = params
  let result = stored.filter(
    (item) =>
      (!type || item.type === type) &&
      (!category || item.category === category) &&
      (!location || item.location === location),
  )
  result = result.filter((item) => matchesSearch(item, search))
  return sortItems(result, sort)
}

export async function getItem(id) {
  await mockDelay(350)
  const item = stored.find((entry) => entry.id === id)
  if (!item) {
    throw new Error('Item not found.')
  }
  return { ...item }
}

export async function createItem(payload) {
  await mockDelay(700)
  const newItem = {
    id: `i_${Date.now()}`,
    ...payload,
    status: 'active',
    createdAt: new Date().toISOString(),
  }
  stored.unshift(newItem)
  return { ...newItem }
}

export async function updateItem(id, payload) {
  await mockDelay(500)
  const index = stored.findIndex((entry) => entry.id === id)
  if (index === -1) {
    throw new Error('Item not found.')
  }
  stored[index] = { ...stored[index], ...payload }
  return { ...stored[index] }
}

export async function deleteItem(id) {
  await mockDelay(400)
  const index = stored.findIndex((entry) => entry.id === id)
  if (index === -1) {
    throw new Error('Item not found.')
  }
  stored.splice(index, 1)
  return true
}

export async function getItemsByReporter(email) {
  await mockDelay(400)
  return stored
    .filter(
      (item) => item.reportedBy.toLowerCase() === String(email).toLowerCase(),
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}