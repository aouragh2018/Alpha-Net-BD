"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Shield, Award, Clock, Users } from "lucide-react"

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const footerLinks = {
    Services: [
      { name: "Domain Registration", href: "/domains" },
      { name: "Web Hosting", href: "/hosting" },
      { name: "SSL Certificates", href: "/ssl" },
      { name: "Email Hosting", href: "/email" },
      { name: "VPS Hosting", href: "/vps" },
      { name: "Dedicated Servers", href: "/dedicated" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Server Status", href: "/status" },
      { name: "Documentation", href: "/docs" },
      { name: "Video Tutorials", href: "/tutorials" },
      { name: "Community Forum", href: "/forum" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press & Media", href: "/press" },
      { name: "Partner Program", href: "/partners" },
      { name: "Affiliate Program", href: "/affiliates" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Refund Policy", href: "/refund" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
      { name: "Service Level Agreement", href: "/sla" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/alphanetbd", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/alphanetbd", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/company/alphanetbd", icon: Linkedin },
    { name: "YouTube", href: "https://youtube.com/alphanetbd", icon: Youtube },
    { name: "Instagram", href: "https://instagram.com/alphanetbd", icon: Instagram },
  ]

  const trustIndicators = [
    { icon: Shield, text: "SSL Secured", description: "256-bit encryption" },
    { icon: Award, text: "ISO Certified", description: "Quality assured" },
    { icon: Clock, text: "99.9% Uptime", description: "Guaranteed SLA" },
    { icon: Users, text: "10K+ Customers", description: "Trusted by many" },
  ]

  return (
    <footer className="bg-card border-t relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url('/world-map-globe-outline-subtle-background.jpg')`,
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 pb-8 border-b">
          {trustIndicators.map((indicator) => (
            <div key={indicator.text} className="flex items-center space-x-3 text-center md:text-left">
              <indicator.icon className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm">{indicator.text}</div>
                <div className="text-xs text-muted-foreground">{indicator.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-center md:justify-start">
              <img
                src="/alpha-net-bd-logo-placeholder.jpg"
                alt="Alpha Net BD"
                className="h-12 w-12 rounded-lg hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Professional domain registration and web hosting services in Bangladesh. Your trusted partner for online
              success since 2014.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>📍 Dhaka, Bangladesh</p>
              <p>📞 +880 1700-000000</p>
              <p>✉️ support@alphanetbd.com</p>
            </div>

            <div className="flex space-x-3 pt-2 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-sm text-muted-foreground">© 2014 - {currentYear}. All rights reserved.</p>
              <div className="flex space-x-2">
                <Badge variant="outline" className="text-xs">
                  PCI DSS Compliant
                </Badge>
                <Badge variant="outline" className="text-xs">
                  GDPR Ready
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
              <p>
                Designed & Developed by{" "}
                <a
                  href="https://mehedipathan.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Mehedi Pathan
                </a>
              </p>
              <div className="flex items-center space-x-2">
                <span>Powered by</span>
                <Badge variant="secondary" className="text-xs">
                  Next.js
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Vercel
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
