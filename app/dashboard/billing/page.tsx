"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { MockDatabase, type Order } from "@/lib/database"
import { CreditCard, Download, Eye, Calendar } from "lucide-react"

export default function DashboardBillingPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalSpent: 0,
    completedOrders: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    if (!user) return

    const userOrders = MockDatabase.getUserOrders(user.id)
    setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))

    const totalSpent = userOrders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0)

    setStats({
      totalSpent,
      completedOrders: userOrders.filter((order) => order.status === "completed").length,
      pendingOrders: userOrders.filter((order) => order.status === "pending").length,
    })
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="lg:pl-64 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Billing & Orders</h1>
              <p className="text-muted-foreground">View your order history and billing information</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedOrders}</div>
                  <p className="text-xs text-muted-foreground">Successfully processed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">Awaiting processing</p>
                </CardContent>
              </Card>
            </div>

            {/* Orders List */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>All your orders and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()} at{" "}
                              {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">৳{order.total}</p>
                            <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium text-sm">Items:</h4>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} ({item.type} • {item.duration})
                              </span>
                              <span>৳{item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Payment Method: {order.paymentMethod}</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                            {order.status === "completed" && (
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download Invoice
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground">Your order history will appear here</p>
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
