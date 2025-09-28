import { type NextRequest, NextResponse } from "next/server"
import { PaymentGateway } from "@/lib/payment-gateway"
import { MockDatabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json()

    // Process payment through mock gateway
    const result = await PaymentGateway.processPayment(paymentData)

    if (result.success) {
      // Update order status in database
      const order = MockDatabase.getOrderById(paymentData.orderId)
      if (order) {
        order.status = "completed"
        order.completedAt = new Date().toISOString()
        MockDatabase.saveOrder(order)
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
