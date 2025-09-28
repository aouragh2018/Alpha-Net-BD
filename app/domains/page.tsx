import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DomainSearch } from "@/components/domain/domain-search"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe, Shield, Zap, Clock, Award, HeadphonesIcon } from "lucide-react"

export default function DomainsPage() {
  const popularExtensions = [
    { ext: ".com", price: "৳1,200", description: "Most popular worldwide" },
    { ext: ".net", price: "৳1,400", description: "Perfect for networks" },
    { ext: ".org", price: "৳1,300", description: "Ideal for organizations" },
    { ext: ".bd", price: "৳2,500", description: "Bangladesh domain" },
    { ext: ".com.bd", price: "৳3,000", description: "Commercial Bangladesh" },
    { ext: ".info", price: "৳1,100", description: "Information websites" },
  ]

  const domainFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Activation",
      description: "Your domain is activated immediately after successful registration with no delays.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Free Privacy Protection",
      description: "Keep your personal information private with complimentary WHOIS protection service.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Easy Management",
      description: "Manage all your domains from one simple, user-friendly control panel dashboard.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Auto-Renewal",
      description: "Never lose your domain with automatic renewal options and expiry notifications.",
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Get expert help anytime with our round-the-clock customer support team.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Money-Back Guarantee",
      description: "30-day money-back guarantee if you're not completely satisfied with our service.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl overflow-x-hidden">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Find Your Perfect <span className="gradient-text">Domain</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Search and register your ideal domain name. Get started with your online presence today with competitive
            pricing and instant activation.
          </p>
        </div>

        <div className="w-full">
          <DomainSearch />
        </div>

        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-balance">
            Popular Domain Extensions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {popularExtensions.map((domain) => (
              <div key={domain.ext} className="border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl md:text-2xl font-bold text-primary">{domain.ext}</span>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {domain.price}/year
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">{domain.description}</p>
                <Button className="w-full bg-transparent" variant="outline">
                  Register Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-balance">
            Why Choose Alpha Net BD for Domains?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {domainFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="font-semibold mb-3 text-lg text-balance">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 bg-muted/30 rounded-2xl p-6 md:p-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">Transfer Your Domain to Alpha Net BD</h2>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty">
              Already have a domain? Transfer it to Alpha Net BD and enjoy better pricing, superior support, and
              advanced management tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Free Transfer</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">1 Year Extension</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">No Downtime</span>
              </div>
            </div>
            <Button size="lg" className="px-6 md:px-8">
              Start Domain Transfer
            </Button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-balance">Trusted by Thousands</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground text-sm md:text-base">Domains Registered</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-muted-foreground text-sm md:text-base">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground text-sm md:text-base">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground text-sm md:text-base">Expert Support</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
