// Mock Payment Gateway for Alpha Net BD
export interface PaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerEmail: string
  customerName: string
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  error?: string
  paymentMethod?: string
}

export class PaymentGateway {
  static async processPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    try {
      // Mock payment success (90% success rate)
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        // Log successful payment
        console.log("[v0] Payment processed successfully:", {
          transactionId,
          amount: paymentData.amount,
          orderId: paymentData.orderId,
        })

        return {
          success: true,
          transactionId,
          paymentMethod: "Credit Card",
        }
      } else {
        return {
          success: false,
          error: "Payment declined by bank",
        }
      }
    } catch (error) {
      return {
        success: false,
        error: "Payment processing failed",
      }
    }
  }

  static async refundPayment(transactionId: string, amount: number): Promise<PaymentResponse> {
    // Simulate refund processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const refundId = `REF_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      console.log("[v0] Refund processed:", {
        originalTransaction: transactionId,
        refundId,
        amount,
      })

      return {
        success: true,
        transactionId: refundId,
        paymentMethod: "Credit Card Refund",
      }
    } catch (error) {
      return {
        success: false,
        error: "Refund processing failed",
      }
    }
  }
}
