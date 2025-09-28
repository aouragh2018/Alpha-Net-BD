import { type NextRequest, NextResponse } from "next/server"
import { DomainAPI } from "@/lib/domain-api"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { domain, extension, userId } = await request.json()

    if (!domain || !extension || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify user authentication (in a real app, you'd validate JWT token)
    const user = AuthService.getCurrentUser()
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await DomainAPI.registerDomain(domain, extension, userId)

    if (result.success) {
      return NextResponse.json({ success: true, message: "Domain registered successfully" })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Domain registration API error:", error)
    return NextResponse.json({ error: "Failed to register domain" }, { status: 500 })
  }
}
