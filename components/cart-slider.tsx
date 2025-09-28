"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { X, ShoppingCart, Trash2 } from "lucide-react"

interface CartSliderProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSlider({ isOpen, onClose }: CartSliderProps) {
  const { items, removeItem, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleCheckout = () => {
    if (!user) {
      onClose()
      router.push("/login?redirect=/checkout")
      return
    }
    onClose()
    router.push("/checkout")
  }

  const handleContinueShopping = () => {
    onClose()
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Cart Slider */}
      <div
        className={`fixed left-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <p className="text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mb-6">Add some hosting plans or domains to get started</p>
                <Button onClick={handleContinueShopping} className="w-full">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.duration}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-end">
                      <span className="font-semibold text-primary">৳{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 bg-muted/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">৳{total}</span>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    {user ? "Proceed to Checkout" : "Login & Checkout"}
                  </Button>
                  <Button variant="outline" onClick={handleContinueShopping} className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </div>

                {!user && (
                  <p className="text-xs text-muted-foreground text-center">You'll be prompted to login at checkout</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
