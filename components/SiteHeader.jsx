"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Search, Menu, User } from "lucide-react"
import { useState, useEffect } from "react"
import CartModal from "./CartModal"
import { useAuth } from "@/app/context/context"

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toggleCart, getCartItemsCount } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    window.location.href = "/auth/login"
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-sm font-medium uppercase">
            Shop Life
          </Link>

          <div
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } md:flex absolute md:relative top-16 left-0 right-0 bg-white md:top-auto z-50 flex-col md:flex-row items-center md:space-x-6 text-sm font-medium uppercase p-4 md:p-0 border-b md:border-0`}
          >
            <Link href="/about" className="py-2 md:py-0 hover:text-gray-600">
              About
            </Link>
            <Link href="/new-products" className="py-2 md:py-0 hover:text-gray-600">
              New
            </Link>
            <Link href="/catalog" className="py-2 md:py-0 hover:text-gray-600">
              Catalog
            </Link>
            <Link href="/men" className="py-2 md:py-0 hover:text-gray-600">
              Men
            </Link>
            <Link href="/women" className="py-2 md:py-0 hover:text-gray-600">
              Women
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </button>

            <button aria-label="Search">
              <Search className="h-5 w-5" />
            </button>

            <button aria-label="Favorites">
              <Heart className="h-5 w-5" />
            </button>

            <button aria-label="Cart" onClick={toggleCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <button aria-label="Account" className="flex items-center">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md hidden group-hover:block z-50">
                  <div className="py-1">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="text-sm font-medium">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </div>

      <CartModal />
    </header>
  )
}

