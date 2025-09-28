"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { MockDatabase, type CartItem } from "@/lib/database"

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = MockDatabase.getCart()
    setItems(savedCart)
  }, [])

  const addItem = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: Date.now().toString(),
      quantity: 1,
    }
    const updatedItems = [...items, newItem]
    setItems(updatedItems)
    MockDatabase.saveCart(updatedItems)
  }

  const removeItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId)
    setItems(updatedItems)
    MockDatabase.saveCart(updatedItems)
  }

  const clearCart = () => {
    setItems([])
    MockDatabase.clearCart()
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
