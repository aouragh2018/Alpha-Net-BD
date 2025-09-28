"use client"

import { useState } from "react"
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
import { DashboardSidebar } from "./dashboard-sidebar"
import { CartSlider } from "@/components/cart-slider"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { User, LogOut, Settings, Home, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      <header className="lg:pl-64 bg-background border-b">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <DashboardSidebar />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cart</span>
              {items.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {items.length}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/account" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
