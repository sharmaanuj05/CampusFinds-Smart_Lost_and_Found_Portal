import { mockDelay } from '../lib/utils'

const USERS_KEY = 'campusfinds_users'
const SESSION_KEY = 'campusfinds_user'

export const DEMO_USER = {
  id: 'u_demo',
  name: 'Demo Student',
  email: 'demo@campus.edu',
  password: 'demo1234',
  token: 'mock-token-demo',
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

export async function login({ email, password }) {
  await mockDelay(600)
  const users = getStoredUsers()
  const allUsers = [DEMO_USER, ...users]
  const user = allUsers.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  )
  if (!user) {
    throw new Error('No account found with that email.')
  }
  if (user.password !== password) {
    throw new Error('Incorrect password. Please try again.')
  }
  const publicUser = { id: user.id, name: user.name, email: user.email }
  const session = { ...publicUser, token: 'mock-token' }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return publicUser
}

export async function register({ name, email, password }) {
  await mockDelay(600)
  const normalizedEmail = email.trim().toLowerCase()
  const users = getStoredUsers()
  if (
    users.some((u) => u.email.toLowerCase() === normalizedEmail) ||
    DEMO_USER.email.toLowerCase() === normalizedEmail
  ) {
    throw new Error('An account with this email already exists.')
  }
  const newUser = {
    id: `u_${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    token: 'mock-token',
  }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
  const publicUser = { id: newUser.id, name: newUser.name, email: newUser.email }
  const session = { ...publicUser, token: 'mock-token' }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return publicUser
}

export async function logout() {
  await mockDelay(200)
  localStorage.removeItem(SESSION_KEY)
  return true
}