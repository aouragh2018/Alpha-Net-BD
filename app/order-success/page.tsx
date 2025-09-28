"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { MockDatabase, type Order } from "@/lib/database"
import { CheckCircle, Download, ExternalLink } from "lucide-react"

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    if (orderId) {
      const orderData = MockDatabase.getOrderById(orderId)
      setOrder(orderData)
    }
  }, [orderId])

  if (!order) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
              <p className="text-muted-foreground mb-6">The order you're looking for could not be found.</p>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been processed successfully.
              </p>
            </div>

            {/* Order Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Details
                  <Badge variant="secondary">#{order.id}</Badge>
                </CardTitle>
                <CardDescription>Order placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({item.type} • {item.duration})
                      </span>
                    </div>
                    <span className="font-medium">৳{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-bold text-lg">
                  <span>Total Paid</span>
                  <span>৳{order.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
                <CardDescription>Here's what happens after your successful order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Services Activated</h4>
                    <p className="text-sm text-muted-foreground">
                      Your domains and hosting services have been automatically activated and are ready to use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Access Your Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage all your services, view invoices, and configure settings from your dashboard.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Email Confirmation</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll receive detailed setup instructions and login credentials via email within 5 minutes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link href="/dashboard">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>

            {/* Support */}
            <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is available 24/7 to help you get started with your new services.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
