// Authentication utilities for Alpha Net BD
import { MockDatabase, type User } from "./database"

export interface AuthUser {
  id: string
  email: string
  name: string
  phone?: string
}

export class AuthService {
  private static readonly AUTH_KEY = "alpha_net_auth_user"

  static getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem(this.AUTH_KEY)
    return userData ? JSON.parse(userData) : null
  }

  static async login(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const user = MockDatabase.getUserByEmail(email)

      if (!user) {
        return { success: false, error: "User not found" }
      }

      if (user.password !== password) {
        return { success: false, error: "Invalid password" }
      }

      if (!user.isActive) {
        return { success: false, error: "Account is inactive" }
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      }

      localStorage.setItem(this.AUTH_KEY, JSON.stringify(authUser))
      return { success: true, user: authUser }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  static async register(userData: {
    email: string
    password: string
    name: string
    phone?: string
  }): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      // Check if user already exists
      const existingUser = MockDatabase.getUserByEmail(userData.email)
      if (existingUser) {
        return { success: false, error: "User already exists" }
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
        isActive: true,
      }

      MockDatabase.saveUser(newUser)

      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
      }

      localStorage.setItem(this.AUTH_KEY, JSON.stringify(authUser))
      return { success: true, user: authUser }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.AUTH_KEY)
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}
