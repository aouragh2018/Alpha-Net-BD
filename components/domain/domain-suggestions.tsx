"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"

interface DomainSuggestion {
  domain: string
  extension: string
  price: number
  category: string
}

interface DomainSuggestionsProps {
  searchTerm: string
}

export function DomainSuggestions({ searchTerm }: DomainSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([])
  const { addItem } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([])
      return
    }

    // Generate domain suggestions based on search term
    const generateSuggestions = () => {
      const prefixes = ["get", "my", "the", "best", "top", "pro", "new"]
      const suffixes = ["app", "hub", "zone", "pro", "online", "web", "site", "bd"]
      const extensions = [".com", ".net", ".org", ".io", ".co", ".bd"]
      const prices = { ".com": 1200, ".net": 1400, ".org": 1300, ".io": 4500, ".co": 2500, ".bd": 2000 }

      const newSuggestions: DomainSuggestion[] = []

      // Add prefix suggestions
      prefixes.forEach((prefix) => {
        extensions.forEach((ext) => {
          newSuggestions.push({
            domain: `${prefix}${searchTerm}`,
            extension: ext,
            price: prices[ext as keyof typeof prices] || 1000,
            category: "prefix",
          })
        })
      })

      // Add suffix suggestions
      suffixes.forEach((suffix) => {
        extensions.forEach((ext) => {
          newSuggestions.push({
            domain: `${searchTerm}${suffix}`,
            extension: ext,
            price: prices[ext as keyof typeof prices] || 1000,
            category: "suffix",
          })
        })
      })

      // Shuffle and limit results
      return newSuggestions.sort(() => Math.random() - 0.5).slice(0, 12)
    }

    setSuggestions(generateSuggestions())
  }, [searchTerm])

  const handleAddToCart = (suggestion: DomainSuggestion) => {
    if (!user) {
      router.push("/login")
      return
    }

    addItem({
      type: "domain",
      name: `${suggestion.domain}${suggestion.extension}`,
      price: suggestion.price,
      duration: "1 year",
    })

    router.push("/cart")
  }

  if (!searchTerm || suggestions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Domain Suggestions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">
                  {suggestion.domain}
                  {suggestion.extension}
                </span>
                {suggestion.extension === ".io" && <Badge>Premium</Badge>}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">৳{suggestion.price}/year</span>
                <Button size="sm" onClick={() => handleAddToCart(suggestion)}>
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
