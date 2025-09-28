"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { Check, ShoppingCart, CheckCircle } from "lucide-react"
import type { HostingPlan } from "@/lib/database"

interface HostingPlanCardProps {
  plan: HostingPlan
}

export function HostingPlanCard({ plan }: HostingPlanCardProps) {
  const { addItem, items } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  // Check if this hosting plan is already in cart
  const isHostingInCart = () => {
    return items.some((item) => item.type === "hosting" && item.planId === plan.id)
  }

  const handleAddToCart = () => {
    // Don't add if already in cart
    if (isHostingInCart()) return

    addItem({
      type: "hosting",
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      planId: plan.id,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const inCart = isHostingInCart()

  return (
    <Card className={`relative card-hover ${plan.isPopular ? "border-primary shadow-lg" : ""}`}>
      {plan.isPopular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription className="text-sm">{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">৳{plan.price}</span>
          <span className="text-muted-foreground">/{plan.duration}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full transition-all duration-200"
          variant={plan.isPopular ? "default" : "outline"}
          disabled={isAdded || inCart}
        >
          {inCart ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Already in Cart
            </>
          ) : isAdded ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
