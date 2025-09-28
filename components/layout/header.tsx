"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { CartSlider } from "@/components/cart-slider"
import { Menu, ShoppingCart, User, LogOut, Settings, CreditCard, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()

  useEffect(() => {
    const announcementClosed = localStorage.getItem("announcement-closed")
    if (announcementClosed === "true") {
      setShowAnnouncement(false)
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false)
    localStorage.setItem("announcement-closed", "true")
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Domains", href: "/domains" },
    { name: "Hosting", href: "/hosting" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const announcements = [
    "🎉 New Year Special: 50% OFF on all hosting plans! Use code: NEWYEAR2025",
    "🚀 Free SSL Certificate with every hosting plan - Limited time offer!",
    "💰 Domain Transfer Special: Get 1 year extension FREE on transfers",
    "⚡ Upgrade to Premium Hosting and get 3 months FREE - Ends soon!",
    "🔒 Enhanced Security: Free DDoS protection with all hosting plans",
    "🌟 24/7 Support: Expert technical support available round the clock",
    "💎 Premium Features: Free daily backups and malware scanning included",
    "🚀 Lightning Fast: SSD storage and CDN included with all plans",
  ]

  return (
    <>
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-2 px-4 relative overflow-hidden">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll-right whitespace-nowrap">
                <span className="inline-block text-sm font-medium">
                  {announcements.map((announcement, index) => (
                    <span key={index} className="mx-8">
                      {announcement}
                    </span>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {announcements.map((announcement, index) => (
                    <span key={`duplicate-${index}`} className="mx-8">
                      {announcement}
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseAnnouncement}
              className="text-primary-foreground hover:bg-primary-foreground/20 h-6 w-6 p-0 flex-shrink-0 ml-2"
              title="Close announcement"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      )}

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <img
                  src="/alpha-net-bd-logo-placeholder-with-an-letters.jpg"
                  alt="Alpha Net BD"
                  className="h-12 w-12 rounded-lg hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative" onClick={handleCartClick}>
                <ShoppingCart className="h-4 w-4" />
                {items.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {items.length}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/billing" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-gradient-to-br from-background to-muted/50 p-6">
                  <div className="flex items-center justify-center mb-8">
                    <img src="/alpha-net-bd-logo-placeholder.jpg" alt="Alpha Net BD" className="h-10 w-10 rounded-lg" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-lg font-medium hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {!user && (
                      <div className="pt-6 border-t space-y-3 mt-6">
                        <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                          <Link href="/register">Sign Up</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/login">Sign In</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
