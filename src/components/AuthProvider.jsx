import React, { createContext, useContext } from 'react'

const AuthContext = createContext()

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // Mock auth data for demo
  const authValue = {
    user: null,
    loading: false,
    signIn: async () => ({ data: null, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null })
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  )
}
