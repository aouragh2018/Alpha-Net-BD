"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { MockDatabase, type Domain } from "@/lib/database"
import { Globe, Search, Settings, RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DashboardDomainsPage() {
  const { user } = useAuth()
  const [domains, setDomains] = useState<Domain[]>([])
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!user) return

    const userDomains = MockDatabase.getUserDomains(user.id)
    setDomains(userDomains)
    setFilteredDomains(userDomains)
  }, [user])

  useEffect(() => {
    if (!searchTerm) {
      setFilteredDomains(domains)
    } else {
      const filtered = domains.filter((domain) =>
        `${domain.domain}${domain.extension}`.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredDomains(filtered)
    }
  }, [searchTerm, domains])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "expired":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="lg:pl-64 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">My Domains</h1>
                <p className="text-muted-foreground">Manage your registered domains</p>
              </div>
              <Button asChild>
                <Link href="/domains">
                  <Globe className="mr-2 h-4 w-4" />
                  Register New Domain
                </Link>
              </Button>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your domains..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Domains List */}
            {filteredDomains.length > 0 ? (
              <div className="grid gap-6">
                {filteredDomains.map((domain) => {
                  const daysUntilExpiry = getDaysUntilExpiry(domain.expiryDate)
                  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0

                  return (
                    <Card key={domain.id} className={isExpiringSoon ? "border-orange-500" : ""}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            {domain.domain}
                            {domain.extension}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(domain.status)}>{domain.status}</Badge>
                            {isExpiringSoon && <Badge variant="outline">Expiring Soon</Badge>}
                          </div>
                        </div>
                        <CardDescription>
                          Registered on {new Date(domain.registrationDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Expiry Date</p>
                            <p className="text-muted-foreground">{new Date(domain.expiryDate).toLocaleDateString()}</p>
                            {daysUntilExpiry > 0 && (
                              <p className={`text-xs ${isExpiringSoon ? "text-orange-600" : "text-muted-foreground"}`}>
                                {daysUntilExpiry} days remaining
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">Auto Renewal</p>
                            <p className="text-muted-foreground">{domain.autoRenew ? "Enabled" : "Disabled"}</p>
                          </div>
                          <div>
                            <p className="font-medium">Annual Price</p>
                            <p className="text-muted-foreground">৳{domain.price}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Manage DNS
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Renew Domain
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Site
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? "No domains found" : "No domains registered"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm ? "Try adjusting your search terms" : "Get started by registering your first domain"}
                  </p>
                  {!searchTerm && (
                    <Button asChild>
                      <Link href="/domains">Register Your First Domain</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
