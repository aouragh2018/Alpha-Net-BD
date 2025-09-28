import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Clock, Shield } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years Experience", value: "8+" },
    { icon: Clock, label: "Uptime Guarantee", value: "99.9%" },
    { icon: Shield, label: "Domains Managed", value: "25,000+" },
  ]

  const team = [
    {
      name: "Mehedi Pathan",
      role: "Founder & CEO",
      description: "Leading Alpha Net BD with vision for digital excellence in Bangladesh.",
      website: "https://mehedipathan.online",
    },
    {
      name: "Technical Team",
      role: "Development & Support",
      description: "Dedicated professionals ensuring 24/7 service reliability.",
    },
    {
      name: "Customer Success",
      role: "Client Relations",
      description: "Committed to providing exceptional customer experience.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Alpha Net BD</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We are Bangladesh's premier domain registration and web hosting provider, committed to empowering businesses
            and individuals with reliable digital infrastructure since 2016.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide reliable, affordable, and innovative web hosting and domain registration services that
                empower businesses and individuals in Bangladesh to establish and grow their online presence with
                confidence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading digital infrastructure provider in Bangladesh, known for exceptional service quality,
                cutting-edge technology, and unwavering commitment to customer success in the digital age.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{member.description}</p>
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Our Values</CardTitle>
            <CardDescription className="text-center">The principles that guide everything we do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Reliability</h3>
                <p className="text-sm text-muted-foreground">
                  99.9% uptime guarantee with robust infrastructure and 24/7 monitoring.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously adopting latest technologies to serve our customers better.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock technical support from our expert team.</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Clear pricing, honest communication, and no hidden fees.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
