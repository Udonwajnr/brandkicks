"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Heart, ShoppingCart, Search, Filter, X, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert"
import { useAuth } from "../context/context"
import { useSearchParams } from "next/navigation"
// Price range options
const priceRanges = [
  { label: "$100 - $250", value: "100-250" },
  { label: "$251 - $400", value: "251-400" },
  { label: "$401 - $1000", value: "401-1000" },
]

// Color options with their display values
const colorOptions = [
  { value: "white", class: "bg-white border" },
  { value: "black", class: "bg-black" },
  { value: "red", class: "bg-red-600" },
  { value: "blue", class: "bg-blue-600" },
  { value: "purple", class: "bg-purple-600" },
  { value: "green", class: "bg-green-500" },
  { value: "yellow", class: "bg-yellow-400" },
  { value: "orange", class: "bg-orange-500" },
  { value: "gray", class: "bg-gray-500" },
  { value: "cyan", class: "bg-cyan-400" },
]

const GENDERS = ["Male", "Female", "Unisex"]

export default function Catalog() {
  // State for products and loading
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const {addToCart } = useAuth()
  const searchParams = useSearchParams()

  // State for brands (dynamically loaded from products)
  const [availableBrands, setAvailableBrands] = useState([])

  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Alert state
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  })

  // Filter state
  const [filters, setFilters] = useState({
    priceRanges: [],
    colors: [],
    brands: [],
    gender: "Male", // Default to Male products
    search: "",
  })

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const gender = searchParams.get("gender")

    if (gender) {
      const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()

      if (GENDERS.includes(formattedGender)) {
        setFilters((prev) => ({ ...prev, gender: formattedGender }))
      }
    }
  }, [searchParams])

  // Apply filters when filter state or products change
  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const showAlert = (type, title, message) => {
    setAlert({
      isOpen: true,
      type,
      title,
      message,
    })

    // Auto-close after 5 seconds
    setTimeout(() => {
      closeAlert()
    }, 5000)
  }

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }))
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get("http://localhost:8000/api/products")
      setProducts(response.data)

      // Extract unique brands and count products for each
      const brands = response.data.reduce((acc, product) => {
        if (product.brand) {
          if (!acc[product.brand]) {
            acc[product.brand] = 0
          }
          acc[product.brand]++
        }
        return acc
      }, {})

      const brandArray = Object.entries(brands).map(([name, count]) => ({
        name,
        count,
      }))

      setAvailableBrands(brandArray)

      // Show success alert
      // if (response.data.length > 0) {
      //   showAlert("success", "Products Loaded", `Successfully loaded ${response.data.length} products.`)
      // }
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products. Please try again later.")

      // Show error alert
      showAlert("error", "Error Loading Products", "Failed to load products. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...products]

    // Filter by gender
    if (filters.gender) {
      result = result.filter((product) => product.gender === filters.gender || product.gender === "Unisex")
    }

    // Filter by price ranges
    if (filters.priceRanges.length > 0) {
      result = result.filter((product) => {
        return filters.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          return product.price >= min && product.price <= max
        })
      })
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      result = result.filter(
        (product) => product.color && product.color.some((c) => filters.colors.includes(c.toLowerCase())),
      )
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      result = result.filter((product) => filters.brands.includes(product.brand))
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.brand?.toLowerCase().includes(searchTerm),
      )
    }

    setFilteredProducts(result)
  }

  const handleGenderChange = (gender) => {
    setFilters((prev) => ({ ...prev, gender }))
  }

  const handlePriceRangeChange = (range) => {
    setFilters((prev) => {
      const updatedRanges = prev.priceRanges.includes(range)
        ? prev.priceRanges.filter((r) => r !== range)
        : [...prev.priceRanges, range]

      return { ...prev, priceRanges: updatedRanges }
    })
  }

  const handleColorChange = (color) => {
    setFilters((prev) => {
      const updatedColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color]

      return { ...prev, colors: updatedColors }
    })
  }

  const handleBrandChange = (brand) => {
    setFilters((prev) => {
      const updatedBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand]

      return { ...prev, brands: updatedBrands }
    })
  }

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const resetFilters = () => {
    setFilters({
      priceRanges: [],
      colors: [],
      brands: [],
      gender: "Male", // Default to Male
      search: "",
    })

    // Show alert when filters are reset
    showAlert("success", "Filters Reset", "All filters have been cleared.")
  }

  const toggleMobileFilters = () => {
    setShowMobileFilters((prev) => !prev)
  }

  const addToWishlist = (product) => {
    // This would normally add the product to the wishlist
    // For now, just show an alert
    showAlert("success", "Added to Wishlist", `${product.name} has been added to your wishlist.`)
  }

  return (
    <>
      {/* Custom Alert */}
      <Alert isOpen={alert.isOpen} type={alert.type} title={alert.title} message={alert.message} onClose={closeAlert} />

      <section className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">CATALOG</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {GENDERS.map((category) => (
              <button
                key={category}
                className={`py-3 text-center font-medium transition-colors ${
                  filters.gender === category ? "bg-lime-400" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleGenderChange(category)}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button
              onClick={toggleMobileFilters}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Filters Sidebar - Desktop & Mobile */}
            <div className={`
              ${showMobileFilters ? "block" : "hidden"} md:block 
              md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto
            `}>
              <div className="border p-4 mb-4 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold mb-2">FILTERS</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                    Reset All
                  </Button>
                </div>
              </div>

              <div className="border p-4 mb-4 bg-white">
                <h3 className="font-bold mb-2">PRICE</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${range.value}`}
                          checked={filters.priceRanges.includes(range.value)}
                          onCheckedChange={() => handlePriceRangeChange(range.value)}
                        />
                        <Label htmlFor={`price-${range.value}`} className="text-sm">
                          {range.label}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-500">
                        (
                        {
                          filteredProducts.filter((p) => {
                            const [min, max] = range.value.split("-").map(Number)
                            return p.price >= min && p.price <= max
                          }).length
                        }
                        )
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border p-4 mb-4 bg-white">
                <h3 className="font-bold mb-2">COLORS</h3>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className={`${color.class} w-6 h-6 rounded-sm cursor-pointer relative ${
                        filters.colors.includes(color.value) ? "ring-2 ring-black" : ""
                      }`}
                      onClick={() => handleColorChange(color.value)}
                    >
                      {filters.colors.includes(color.value) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className={`h-2 w-2 rounded-full ${color.value === "white" ? "bg-black" : "bg-white"}`}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border p-4 bg-white">
                <h3 className="font-bold mb-2">BRAND</h3>
                <div className="space-y-2">
                  {availableBrands.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand.name}`}
                          checked={filters.brands.includes(brand.name)}
                          onCheckedChange={() => handleBrandChange(brand.name)}
                        />
                        <Label htmlFor={`brand-${brand.name}`} className="text-sm">
                          {brand.name.toUpperCase()}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-500">({brand.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-span-3">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                  <p>{error}</p>
                  <Button onClick={fetchProducts} variant="outline" className="mt-2">
                    Try Again
                  </Button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-gray-100 p-8 text-center rounded-md">
                  <p className="text-gray-600 mb-4">No products found matching your filters.</p>
                  <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                    </p>
                    <div className="flex items-center gap-2">
                      {(filters.priceRanges.length > 0 || filters.colors.length > 0 || filters.brands.length > 0) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetFilters}
                          className="text-xs flex items-center gap-1"
                        >
                          <X className="h-3 w-3" />
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="bg-white p-4 relative group">
                        {product.newlyAdded && (
                          <div className="absolute top-2 left-2 z-10 bg-lime-400 px-2 py-1 text-xs font-bold">NEW</div>
                        )}
                        <button className="absolute top-4 right-4 z-10" onClick={() => addToWishlist(product)}>
                          <Heart className="h-5 w-5" />
                        </button>
                        <Link href={`/catalog/${product.slug}`} className="block">
                          <div className="relative h-48 mb-4 overflow-hidden">
                            <Image
                              src={product.images[0] || `/placeholder.svg?height=200&width=200`}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="text-sm font-bold uppercase mb-1">{product.name}</div>
                          <div className="flex items-center justify-between">
                            <div className="text-red-600 font-bold">${product.price}</div>
                            <button
                              className="bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                              onClick={(e) => {
                                e.preventDefault()
                                addToCart(product)
                              }}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </button>
                          </div>
                          {product.brand && <div className="text-sm text-gray-500 mt-1">{product.brand}</div>}
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
