"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { PaymentGateway } from "@/lib/payment-gateway"
import { MockDatabase, type Order, type OrderItem } from "@/lib/database"
import { CreditCard, Smartphone, Building, Loader2, CheckCircle } from "lucide-react"

export function CheckoutForm() {
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState("")

  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setError("")
    setIsProcessing(true)

    try {
      // Create order
      const newOrderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      const orderItems: OrderItem[] = items.map((item) => ({
        type: item.type,
        name: item.name,
        price: item.price,
        duration: item.duration,
      }))

      const order: Order = {
        id: newOrderId,
        userId: user.id,
        items: orderItems,
        total,
        status: "pending",
        paymentMethod,
        createdAt: new Date().toISOString(),
      }

      // Save order to database
      MockDatabase.saveOrder(order)

      // Process payment
      const paymentResult = await PaymentGateway.processPayment({
        amount: total,
        currency: "BDT",
        orderId: newOrderId,
        customerEmail: billingInfo.email || user.email,
        customerName: billingInfo.name || user.name,
        items: orderItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: 1,
        })),
      })

      if (paymentResult.success) {
        // Update order status
        order.status = "completed"
        order.completedAt = new Date().toISOString()
        MockDatabase.saveOrder(order)

        // Process domain registrations and hosting activations
        for (const item of items) {
          if (item.type === "domain") {
            // Register domain
            const [domainName, extension] = item.name.split(".")
            await import("@/lib/domain-api").then(({ DomainAPI }) =>
              DomainAPI.registerDomain(domainName, `.${extension}`, user.id),
            )
          } else if (item.type === "hosting" && item.planId) {
            // Activate hosting
            const hosting = {
              id: Date.now().toString(),
              userId: user.id,
              planId: item.planId,
              domain: `temp-${Date.now()}.alphanetbd.com`, // Temporary domain
              purchaseDate: new Date().toISOString(),
              expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
              status: "active" as const,
              autoRenew: true,
            }
            MockDatabase.saveHosting(hosting)
          }
        }

        // Clear cart
        clearCart()

        setSuccess(true)
        setOrderId(newOrderId)

        // Redirect to success page after 3 seconds
        setTimeout(() => {
          router.push(`/order-success?orderId=${newOrderId}`)
        }, 3000)
      } else {
        setError(paymentResult.error || "Payment failed")
        // Update order status to failed
        order.status = "failed"
        MockDatabase.saveOrder(order)
      }
    } catch (err) {
      setError("An unexpected error occurred during checkout")
      console.error("Checkout error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-4">
            Your order #{orderId} has been processed successfully. You will be redirected to the order confirmation
            page.
          </p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Enter your billing details for the order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={billingInfo.name}
                onChange={handleBillingChange}
                placeholder={user?.name || "Enter your full name"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={billingInfo.email}
                onChange={handleBillingChange}
                placeholder={user?.email || "Enter your email"}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={billingInfo.phone}
                onChange={handleBillingChange}
                placeholder={user?.phone || "Enter your phone number"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={billingInfo.city}
                onChange={handleBillingChange}
                placeholder="Enter your city"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={billingInfo.address}
              onChange={handleBillingChange}
              placeholder="Enter your full address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={billingInfo.postalCode}
              onChange={handleBillingChange}
              placeholder="Enter postal code"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                <span>Credit/Debit Card</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mobile" id="mobile" />
              <Label htmlFor="mobile" className="flex items-center space-x-2 cursor-pointer">
                <Smartphone className="h-4 w-4" />
                <span>Mobile Banking (bKash/Nagad)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex items-center space-x-2 cursor-pointer">
                <Building className="h-4 w-4" />
                <span>Bank Transfer</span>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="number"
                    value={cardInfo.number}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="name"
                    value={cardInfo.name}
                    onChange={handleCardChange}
                    placeholder="Name on card"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    value={cardInfo.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "mobile" && (
            <div className="pt-4 border-t">
              <Alert>
                <AlertDescription>
                  You will be redirected to your mobile banking app to complete the payment after placing the order.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="pt-4 border-t">
              <Alert>
                <AlertDescription>
                  Bank transfer details will be provided after placing the order. Payment must be completed within 24
                  hours.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground ml-2">({item.duration})</span>
              </div>
              <span>৳{item.price}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳{total}</span>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay ৳${total}`
        )}
      </Button>
    </form>
  )
}
