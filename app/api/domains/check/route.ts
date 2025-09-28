import { type NextRequest, NextResponse } from "next/server"
import { DomainAPI } from "@/lib/domain-api"

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json()

    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ error: "Domain name is required" }, { status: 400 })
    }

    const results = await DomainAPI.checkAvailability(domain)
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Domain check API error:", error)
    return NextResponse.json({ error: "Failed to check domain availability" }, { status: 500 })
  }
}
