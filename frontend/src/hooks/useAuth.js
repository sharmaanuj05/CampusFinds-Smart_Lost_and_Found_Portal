import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function useAuth() {
  return useAuthContext()
}