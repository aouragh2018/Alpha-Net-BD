"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { MockDatabase, type Domain, type UserHosting, type Order } from "@/lib/database"
import { Globe, Server, CreditCard, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const [domains, setDomains] = useState<Domain[]>([])
  const [hosting, setHosting] = useState<UserHosting[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalDomains: 0,
    activeDomains: 0,
    totalHosting: 0,
    activeHosting: 0,
    totalSpent: 0,
    expiringServices: 0,
  })

  useEffect(() => {
    if (!user) return

    // Load user data
    const userDomains = MockDatabase.getUserDomains(user.id)
    const userHosting = MockDatabase.getUserHosting(user.id)
    const userOrders = MockDatabase.getUserOrders(user.id)

    setDomains(userDomains)
    setHosting(userHosting)
    setOrders(userOrders)

    // Calculate stats
    const totalSpent = userOrders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0)

    const expiringServices = [
      ...userDomains.filter((domain) => {
        const expiryDate = new Date(domain.expiryDate)
        const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        return expiryDate <= thirtyDaysFromNow
      }),
      ...userHosting.filter((host) => {
        const expiryDate = new Date(host.expiryDate)
        const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        return expiryDate <= thirtyDaysFromNow
      }),
    ].length

    setStats({
      totalDomains: userDomains.length,
      activeDomains: userDomains.filter((d) => d.status === "active").length,
      totalHosting: userHosting.length,
      activeHosting: userHosting.filter((h) => h.status === "active").length,
      totalSpent,
      expiringServices,
    })
  }, [user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="lg:pl-64 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">Here's an overview of your Alpha Net BD services.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDomains}</div>
                  <p className="text-xs text-muted-foreground">{stats.activeDomains} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hosting Services</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalHosting}</div>
                  <p className="text-xs text-muted-foreground">{stats.activeHosting} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">৳{stats.totalSpent}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.expiringServices}</div>
                  <p className="text-xs text-muted-foreground">Next 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Domains */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Domains
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/domains">View All</Link>
                    </Button>
                  </CardTitle>
                  <CardDescription>Your recently registered domains</CardDescription>
                </CardHeader>
                <CardContent>
                  {domains.length > 0 ? (
                    <div className="space-y-4">
                      {domains.slice(0, 3).map((domain) => (
                        <div key={domain.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {domain.domain}
                              {domain.extension}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires: {new Date(domain.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={domain.status === "active" ? "default" : "secondary"}>{domain.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No domains registered yet</p>
                      <Button asChild>
                        <Link href="/domains">Register Domain</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Hosting */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Hosting Services
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/hosting">View All</Link>
                    </Button>
                  </CardTitle>
                  <CardDescription>Your active hosting services</CardDescription>
                </CardHeader>
                <CardContent>
                  {hosting.length > 0 ? (
                    <div className="space-y-4">
                      {hosting.slice(0, 3).map((host) => (
                        <div key={host.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{host.domain}</p>
                            <p className="text-sm text-muted-foreground">
                              Expires: {new Date(host.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={host.status === "active" ? "default" : "secondary"}>{host.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No hosting services yet</p>
                      <Button asChild>
                        <Link href="/hosting">Choose Plan</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Orders
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/billing">View All</Link>
                  </Button>
                </CardTitle>
                <CardDescription>Your recent purchases and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders
                      .slice(0, 5)
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">#{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item
                              {order.items.length > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">৳{order.total}</p>
                            <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
