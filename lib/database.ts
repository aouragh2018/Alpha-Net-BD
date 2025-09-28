// Mock database layer for Alpha Net BD hosting application
export interface User {
  id: string
  email: string
  password: string
  name: string
  phone?: string
  createdAt: string
  isActive: boolean
}

export interface Domain {
  id: string
  userId: string
  domain: string
  extension: string
  registrationDate: string
  expiryDate: string
  status: "active" | "expired" | "pending"
  autoRenew: boolean
  price: number
}

export interface HostingPlan {
  id: string
  name: string
  description: string
  features: string[]
  price: number
  duration: "monthly" | "yearly"
  diskSpace: string
  bandwidth: string
  databases: number
  emailAccounts: number
  isPopular?: boolean
}

export interface UserHosting {
  id: string
  userId: string
  planId: string
  domain: string
  purchaseDate: string
  expiryDate: string
  status: "active" | "suspended" | "expired"
  autoRenew: boolean
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "completed" | "failed"
  paymentMethod: string
  createdAt: string
  completedAt?: string
}

export interface OrderItem {
  type: "domain" | "hosting"
  name: string
  price: number
  duration: string
}

export interface CartItem {
  id: string
  type: "domain" | "hosting"
  name: string
  price: number
  duration: string
  planId?: string
  quantity?: number
}

// Mock data
export const mockHostingPlans: HostingPlan[] = [
  {
    id: "basic",
    name: "Basic Hosting",
    description: "Perfect for personal websites and blogs",
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "100 GB Bandwidth",
      "1 Database",
      "5 Email Accounts",
      "Free SSL Certificate",
      "24/7 Support",
    ],
    price: 299,
    duration: "yearly",
    diskSpace: "10 GB",
    bandwidth: "100 GB",
    databases: 1,
    emailAccounts: 5,
  },
  {
    id: "premium",
    name: "Premium Hosting",
    description: "Great for growing businesses",
    features: [
      "5 Websites",
      "50 GB SSD Storage",
      "500 GB Bandwidth",
      "10 Databases",
      "25 Email Accounts",
      "Free SSL Certificate",
      "Daily Backups",
      "24/7 Support",
    ],
    price: 599,
    duration: "yearly",
    diskSpace: "50 GB",
    bandwidth: "500 GB",
    databases: 10,
    emailAccounts: 25,
    isPopular: true,
  },
  {
    id: "business",
    name: "Business Hosting",
    description: "For high-traffic websites and applications",
    features: [
      "Unlimited Websites",
      "100 GB SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Databases",
      "100 Email Accounts",
      "Free SSL Certificate",
      "Daily Backups",
      "Priority Support",
      "Free CDN",
    ],
    price: 999,
    duration: "yearly",
    diskSpace: "100 GB",
    bandwidth: "Unlimited",
    databases: 999,
    emailAccounts: 100,
  },
]

// Local storage utilities
export class MockDatabase {
  private static getFromStorage<T>(key: string): T[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  }

  private static saveToStorage<T>(key: string, data: T[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(key, JSON.stringify(data))
  }

  // User operations
  static getUsers(): User[] {
    return this.getFromStorage<User>("alpha_net_users")
  }

  static saveUser(user: User): void {
    const users = this.getUsers()
    const existingIndex = users.findIndex((u) => u.id === user.id)
    if (existingIndex >= 0) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }
    this.saveToStorage("alpha_net_users", users)
  }

  static getUserByEmail(email: string): User | null {
    const users = this.getUsers()
    return users.find((u) => u.email === email) || null
  }

  static getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find((u) => u.id === id) || null
  }

  // Domain operations
  static getUserDomains(userId: string): Domain[] {
    const domains = this.getFromStorage<Domain>("alpha_net_domains")
    return domains.filter((d) => d.userId === userId)
  }

  static saveDomain(domain: Domain): void {
    const domains = this.getFromStorage<Domain>("alpha_net_domains")
    domains.push(domain)
    this.saveToStorage("alpha_net_domains", domains)
  }

  // Hosting operations
  static getUserHosting(userId: string): UserHosting[] {
    const hosting = this.getFromStorage<UserHosting>("alpha_net_hosting")
    return hosting.filter((h) => h.userId === userId)
  }

  static saveHosting(hosting: UserHosting): void {
    const hostingList = this.getFromStorage<UserHosting>("alpha_net_hosting")
    hostingList.push(hosting)
    this.saveToStorage("alpha_net_hosting", hostingList)
  }

  // Order operations
  static getUserOrders(userId: string): Order[] {
    const orders = this.getFromStorage<Order>("alpha_net_orders")
    return orders.filter((o) => o.userId === userId)
  }

  static saveOrder(order: Order): void {
    const orders = this.getFromStorage<Order>("alpha_net_orders")
    orders.push(order)
    this.saveToStorage("alpha_net_orders", orders)
  }

  static getOrderById(orderId: string): Order | null {
    const orders = this.getFromStorage<Order>("alpha_net_orders")
    return orders.find((o) => o.id === orderId) || null
  }

  // Cart operations
  static getCart(): CartItem[] {
    return this.getFromStorage<CartItem>("alpha_net_cart")
  }

  static saveCart(cart: CartItem[]): void {
    this.saveToStorage("alpha_net_cart", cart)
  }

  static addToCart(item: CartItem): void {
    const cart = this.getCart()
    cart.push(item)
    this.saveCart(cart)
  }

  static removeFromCart(itemId: string): void {
    const cart = this.getCart()
    const updatedCart = cart.filter((item) => item.id !== itemId)
    this.saveCart(updatedCart)
  }

  static clearCart(): void {
    this.saveCart([])
  }
}
