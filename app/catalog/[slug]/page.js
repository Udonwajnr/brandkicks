"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import SiteHeader from "@/components/SiteHeader"
import { Alert } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { useAuth } from "@/app/context/context"

export default function ProductDetailPage({ params }) {
  const { slug } = params
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  })

  const { addToCart, openCart } = useAuth()

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(`http://localhost:8000/api/products/${slug}`)
        setProduct(response.data)

        if (response.data.color && response.data.color.length > 0) {
          setSelectedColor(response.data.color[0])
        }

        if (response.data.size && response.data.size.length > 0) {
          setSelectedSize(response.data.size[0])
        }

        if (response.data.brand) {
          const relatedResponse = await axios.get(
            `http://localhost:8000/api/products?brand=${response.data.brand}&limit=4`,
          )
          const filteredRelated = relatedResponse.data.filter((item) => item.slug !== slug)
          setRelatedProducts(filteredRelated.slice(0, 4))
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product information.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductData()
  }, [slug])

  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message })
    setTimeout(() => closeAlert(), 5000)
  }

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }))
  }

  const handleImageNavigation = (direction) => {
    if (!product?.images?.length) return

    setCurrentImageIndex((prev) => {
      if (direction === "next") {
        return prev === product.images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? product.images.length - 1 : prev - 1
    })
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showAlert("error", "Selection Required", "Please select a size before adding to cart")
      return
    }

    addToCart(product, 1, selectedSize, selectedColor)
    showAlert("success", "Added to Cart", `${product.name} has been added to your cart`)

    // Open cart after a short delay
    setTimeout(() => {
      openCart()
    }, 1000)
  }

  const addToWishlist = () => {
    showAlert("success", "Added to Wishlist", `${product.name} has been added to your wishlist`)
  }
  
  if (isLoading) return null
  if (error) return <div className="text-center py-12">{error}</div>
  if (!product) return null

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <Alert isOpen={alert.isOpen} type={alert.type} title={alert.title} message={alert.message} onClose={closeAlert} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button className="absolute top-2 right-2 z-10" onClick={addToWishlist}>
              <Heart className="w-5 h-5" />
            </button>

            <div className="relative aspect-square bg-white mb-4 border">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                <Image
                  src={product.images?.[currentImageIndex] || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square bg-white border ${
                    currentImageIndex === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-8"
          >
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

            {product.brand && (
              <div className="mb-4 text-sm">
                <span className="font-medium">BRAND:</span> {product.brand}
              </div>
            )}

            {product.gender && (
              <div className="mb-4 text-sm">
                <span className="font-medium">GENDER:</span> {product.gender}
              </div>
            )}

            {product.color?.length > 0 && (
              <div className="mb-8">
                <div className="text-sm mb-2 font-medium">COLORS</div>
                <div className="flex gap-2">
                  {product.color.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 border ${selectedColor === color ? "border-black" : "border-gray-200"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="text-sm mb-2">USE THE SIZE CHART TO CHECK YOUR SIZE OR FOOT LENGTH.</div>
              <div className="text-sm font-medium mb-4">CHOOSE SIZE</div>
              {product.size?.length > 0 ? (
                <div className="grid grid-cols-6 gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border text-sm ${
                        selectedSize === size ? "border-black" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No sizes available</div>
              )}
              <button className="text-sm underline mt-2">SIZE CHART</button>
            </div>

            {product.description && <div className="mb-6 text-sm text-gray-600">{product.description}</div>}

            <div className="flex items-center justify-between mb-8">
              <div className="text-xl font-medium">$ {product.price}</div>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* New Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24 mb-12"
        >
          <h2 className="text-2xl font-bold mb-8">NEW PRODUCTS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product, i) => (
              <motion.div
                key={product._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <button
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() =>
                    showAlert("success", "Added to Wishlist", `${product.name} has been added to your wishlist`)
                  }
                >
                  <Heart className="w-4 h-4" />
                </button>
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square bg-white mb-4 border">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <div className="text-sm text-red-600">$ {product.price}</div>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault()
                        addToCart(product, 1, product.size?.[0], product.color?.[0])
                        showAlert("success", "Added to Cart", `${product.name} has been added to your cart`)
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  )
}

