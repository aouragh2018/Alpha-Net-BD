"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutPage() {
  const { items } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  if (items.length === 0) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your order and start your online journey</p>
            </div>

            <CheckoutForm />
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
