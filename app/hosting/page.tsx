import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HostingPlanCard } from "@/components/hosting/hosting-plan-card"
import { mockHostingPlans } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Server, Shield, Zap, HeadphonesIcon, Database, Globe } from "lucide-react"

export default function HostingPage() {
  const hostingFeatures = [
    {
      icon: <Server className="h-6 w-6" />,
      title: "SSD Storage",
      description: "Lightning-fast SSD storage for optimal website performance and quick loading times.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Free SSL Certificate",
      description: "Secure your website with free SSL certificates included with all hosting plans.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "99.9% Uptime",
      description: "Reliable hosting with guaranteed 99.9% uptime backed by our SLA agreement.",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Daily Backups",
      description: "Automatic daily backups ensure your data is always safe and recoverable.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "CDN Integration",
      description: "Global content delivery network for faster loading times worldwide.",
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support from our expert hosting specialists.",
    },
  ]

  const technologies = [
    { name: "PHP", version: "8.2", logo: "🐘" },
    { name: "MySQL", version: "8.0", logo: "🐬" },
    { name: "Node.js", version: "18.x", logo: "🟢" },
    { name: "Python", version: "3.11", logo: "🐍" },
    { name: "WordPress", version: "Latest", logo: "📝" },
    { name: "cPanel", version: "Latest", logo: "⚙️" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Web Hosting <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect hosting plan for your website. All plans include free SSL, daily backups, and 24/7
            support with Bangladesh's most reliable hosting infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockHostingPlans.map((plan) => (
            <HostingPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Alpha Net BD Hosting?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostingFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="font-semibold mb-3 text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Supported Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our hosting platform supports the latest technologies and frameworks to power your applications.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech) => (
              <div key={tech.name} className="text-center p-4 rounded-lg border bg-background/50">
                <div className="text-3xl mb-2">{tech.logo}</div>
                <div className="font-semibold text-sm">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.version}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Performance Guarantee</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We guarantee exceptional performance with our state-of-the-art infrastructure and monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">&lt;200ms</div>
              <div className="text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30-Day</div>
              <div className="text-muted-foreground">Money Back</div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact our team for enterprise hosting solutions, dedicated servers, and custom configurations tailored to
            your specific business requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Contact Sales
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              View Enterprise Plans
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
