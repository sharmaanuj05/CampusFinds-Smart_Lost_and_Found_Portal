import { useCallback, useMemo, useState } from 'react'
import * as authApi from '../api/authApi'
import { AuthContext } from '../hooks/useAuth'

const SESSION_KEY = 'campusfinds_user'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const loggedInUser = await authApi.login(credentials)
      setUser({ ...loggedInUser, token: 'mock-token' })
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (details) => {
    setLoading(true)
    try {
      const newUser = await authApi.register(details)
      setUser({ ...newUser, token: 'mock-token' })
      return newUser
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}