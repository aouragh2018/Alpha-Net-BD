"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Home, ArrowLeft, Search, HelpCircle, Phone, Mail, Globe, Server, Shield, Clock } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/domains?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const popularPages = [
    { name: "Domain Search", href: "/domains", icon: Globe, description: "Find your perfect domain" },
    { name: "Web Hosting", href: "/hosting", icon: Server, description: "Reliable hosting plans" },
    { name: "SSL Certificates", href: "/ssl", icon: Shield, description: "Secure your website" },
    { name: "Support Center", href: "/contact", icon: HelpCircle, description: "Get help from experts" },
  ]

  const quickLinks = [
    { name: "Check Domain", href: "/domains" },
    { name: "Hosting Plans", href: "/hosting" },
    { name: "About Us", href: "/about" },
    { name: "Contact Support", href: "/contact" },
    { name: "Server Status", href: "/status" },
    { name: "Knowledge Base", href: "/help" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Main 404 Card */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <div className="text-8xl font-bold gradient-text mb-4">404</div>
                <h1 className="text-3xl font-bold mb-3">Oops! Page Not Found</h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved. Let's help you find what you need.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Search for domains, hosting, or help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button type="submit" className="rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/domains">
                    <Globe className="mr-2 h-4 w-4" />
                    Search Domains
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="lg">
                  <Link href="javascript:history.back()">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Link>
                </Button>
              </div>

              {/* Contact Support */}
              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground mb-4">Still can't find what you're looking for?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">
                      <Mail className="mr-2 h-3 w-3" />
                      Email Support
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="tel:+8801700000000">
                      <Phone className="mr-2 h-3 w-3" />
                      Call Us: +880 1700-000000
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Pages */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Popular Pages
                </h2>
                <div className="grid gap-3">
                  {popularPages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <page.icon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground">{page.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded hover:bg-muted/50"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">Need Immediate Help?</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">24/7 Support</Badge>
                    <Badge variant="secondary">Live Chat</Badge>
                    <Badge variant="secondary">99.9% Uptime</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
