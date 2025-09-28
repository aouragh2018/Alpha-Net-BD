"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { AuthService, type AuthUser } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: { email: string; password: string; name: string; phone?: string }) => Promise<{
    success: boolean
    error?: string
  }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = await AuthService.login(email, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }

  const register = async (userData: { email: string; password: string; name: string; phone?: string }) => {
    const result = await AuthService.register(userData)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
