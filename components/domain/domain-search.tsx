"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { DomainAPI, type DomainAvailability } from "@/lib/domain-api"
import { Search, Check, X, ShoppingCart, Loader2, CheckCircle } from "lucide-react"

export function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<DomainAvailability[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [addedDomains, setAddedDomains] = useState<Set<string>>(new Set())
  const { addItem, items } = useCart()

  const isDomainInCart = (domainName: string) => {
    return items.some((item) => item.type === "domain" && item.name === domainName)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    try {
      const domainResults = await DomainAPI.checkAvailability(searchTerm.trim())
      setResults(domainResults)
    } catch (error) {
      console.error("Domain search failed:", error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddToCart = (domain: DomainAvailability) => {
    const domainName = `${domain.domain}${domain.extension}`

    addItem({
      type: "domain",
      name: domainName,
      price: domain.price,
      duration: "1 year",
    })

    setAddedDomains((prev) => new Set(prev).add(domainName))
    setTimeout(() => {
      setAddedDomains((prev) => {
        const newSet = new Set(prev)
        newSet.delete(domainName)
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="space-y-8 w-full max-w-none">
      {/* Search Form */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your domain name (e.g., mywebsite)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={isSearching}
              />
            </div>
            <Button type="submit" disabled={isSearching || !searchTerm.trim()} className="w-full sm:w-auto">
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-balance">
            {isSearching ? "Searching domains..." : `Search results for "${searchTerm}"`}
          </h2>

          {isSearching ? (
            <div className="grid gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 bg-muted rounded" />
                        <div className="w-32 h-4 bg-muted rounded" />
                        <div className="w-16 h-4 bg-muted rounded" />
                      </div>
                      <div className="w-20 h-8 bg-muted rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((domain, index) => {
                const domainName = `${domain.domain}${domain.extension}`
                const isAdded = addedDomains.has(domainName)
                const isInCart = isDomainInCart(domainName)

                return (
                  <Card key={index} className={`transition-all ${domain.available ? "hover:shadow-md" : "opacity-75"}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          {domain.available ? (
                            <Check className="h-5 w-5 text-green-500 self-start sm:self-center" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 self-start sm:self-center" />
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-lg break-all">
                                {domain.domain}
                                {domain.extension}
                              </span>
                              {domain.premium && <Badge className="text-xs">Premium</Badge>}
                            </div>
                            <span className="text-muted-foreground text-sm">৳{domain.price}/year</span>
                          </div>
                        </div>

                        {domain.available ? (
                          <Button
                            onClick={() => handleAddToCart(domain)}
                            size="sm"
                            disabled={isAdded || isInCart}
                            className="transition-all duration-200 w-full sm:w-auto"
                          >
                            {isInCart ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Already in Cart
                              </>
                            ) : isAdded ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Added!
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        ) : (
                          <Badge variant="secondary" className="w-full sm:w-auto justify-center">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No results found. Please try a different search term.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Popular Extensions */}
      {!hasSearched && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold">Popular Domain Extensions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { ext: ".com", price: 1200, desc: "Most popular" },
              { ext: ".net", price: 1400, desc: "Network sites" },
              { ext: ".org", price: 1300, desc: "Organizations" },
              { ext: ".bd", price: 2000, desc: "Bangladesh" },
              { ext: ".com.bd", price: 1800, desc: "BD Commercial" },
              { ext: ".io", price: 4500, desc: "Tech startups" },
              { ext: ".co", price: 2500, desc: "Companies" },
              { ext: ".info", price: 800, desc: "Information" },
            ].map((item) => (
              <Card key={item.ext} className="card-hover">
                <CardContent className="p-4 text-center">
                  <div className="font-bold text-lg">{item.ext}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                  <div className="font-semibold text-primary mt-2">৳{item.price}/year</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
