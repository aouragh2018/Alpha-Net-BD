// Mock Domain API for Alpha Net BD
export interface DomainAvailability {
  domain: string
  extension: string
  available: boolean
  price: number
  premium?: boolean
}

export class DomainAPI {
  private static readonly domainPrices: Record<string, number> = {
    ".com": 1200,
    ".net": 1400,
    ".org": 1300,
    ".info": 800,
    ".biz": 900,
    ".co": 2500,
    ".io": 4500,
    ".bd": 2000,
    ".com.bd": 1800,
    ".net.bd": 1600,
    ".org.bd": 1500,
  }

  private static readonly unavailableDomains = [
    "google",
    "facebook",
    "amazon",
    "microsoft",
    "apple",
    "netflix",
    "youtube",
    "twitter",
    "instagram",
    "linkedin",
    "github",
    "stackoverflow",
    "reddit",
  ]

  static async checkAvailability(domainName: string): Promise<DomainAvailability[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const results: DomainAvailability[] = []
    const cleanDomain = domainName.toLowerCase().replace(/[^a-z0-9-]/g, "")

    // Check popular extensions
    const extensions = [".com", ".net", ".org", ".info", ".biz", ".co", ".io", ".bd", ".com.bd", ".net.bd"]

    for (const extension of extensions) {
      const isUnavailable =
        this.unavailableDomains.includes(cleanDomain) && [".com", ".net", ".org"].includes(extension)

      // Add some randomness for realistic results
      const randomUnavailable = Math.random() < 0.3
      const available = !isUnavailable && !randomUnavailable

      results.push({
        domain: cleanDomain,
        extension,
        available,
        price: this.domainPrices[extension] || 1000,
        premium: extension === ".io" || extension === ".co",
      })
    }

    return results
  }

  static async registerDomain(
    domain: string,
    extension: string,
    userId: string,
  ): Promise<{ success: boolean; error?: string }> {
    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const domainRecord = {
        id: Date.now().toString(),
        userId,
        domain,
        extension,
        registrationDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
        status: "active" as const,
        autoRenew: true,
        price: this.domainPrices[extension] || 1000,
      }

      // Save to mock database
      const { MockDatabase } = await import("./database")
      MockDatabase.saveDomain(domainRecord)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Domain registration failed" }
    }
  }
}
