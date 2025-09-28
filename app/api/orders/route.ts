import { type NextRequest, NextResponse } from "next/server"
import { MockDatabase } from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd validate JWT token from headers
    const user = AuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = MockDatabase.getUserOrders(user.id)
    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Orders API error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = AuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderData = await request.json()
    const order = {
      ...orderData,
      id: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    }

    MockDatabase.saveOrder(order)
    return NextResponse.json({ order })
  } catch (error) {
    console.error("Create order API error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
