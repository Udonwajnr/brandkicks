"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Search, Menu, User, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import CartModal from "./CartModal"
import { useAuth } from "@/app/context/context"
import { useRouter } from "next/navigation"

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toggleCart, getCartItemsCount } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const profileRef = useRef(null)
  const searchRef = useRef(null)
  const router = useRouter()

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

  const toggleProfileMenu = (e) => {
    e.stopPropagation()
    setProfileMenuOpen(!profileMenuOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile menu when clicking outside
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }

      // Close search when clicking outside
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b sticky top-0 bg-white z-40">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-base font-bold uppercase">
            BrandKicks
          </Link>

          <div
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } md:flex absolute md:relative top-16 left-0 right-0 bg-white md:top-auto z-50 flex-col md:flex-row items-center md:space-x-6 text-sm font-medium uppercase p-4 md:p-0 border-b md:border-0`}
          >
            <Link href="/catalog" className="py-2 md:py-0 hover:text-gray-600">
              Catalog
            </Link>
            <Link href="/catalog?gender=male" className="py-2 md:py-0 hover:text-gray-600">
              Male
            </Link>
            <Link href="/catalog?gender=female" className="py-2 md:py-0 hover:text-gray-600">
              Female
            </Link>
            <Link href="/about" className="py-2 md:py-0 hover:text-gray-600">
              About
            </Link>
            <Link href="/contact-us" className="py-2 md:py-0 hover:text-gray-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </button>

            {/* <div ref={searchRef} className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-0 flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="border p-1 text-sm w-40 md:w-60"
                    autoFocus
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-1">
                    <X className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <button aria-label="Search" onClick={() => setSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div> */}

            <button aria-label="Favorites">
              {/* <Heart className="h-5 w-5" /> */}
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
              <div className="relative" ref={profileRef}>
                <button aria-label="Account" className="flex items-center" onClick={toggleProfileMenu}>
                  <User className="h-5 w-5" />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-50">
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
                )}
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

