"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Plus, Minus, Trash2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { useAuth } from "@/app/context/context"

export default function CartModal() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart, getCartTotal,user } = useAuth()

  const [checkoutStep, setCheckoutStep] = useState("cart") // cart, shipping, payment
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
  })

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)

    // If authenticated, try to get user info
    if (token) {
      fetchUserInfo(token)
    }
  }, [isCartOpen])

  const fetchUserInfo = async (token) => {
    try {

      if (user !== null) {
        const user = response.data.user
        setUserInfo({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          zipCode: user.zipCode || "",
          country: user.country || "United States",
        })
      }
    } catch (error) {
      console.error("Error fetching user info:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateShippingInfo = () => {
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "zipCode"]
    const emptyFields = requiredFields.filter((field) => !userInfo[field])

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(", ")}`)
      return false
    }

    if (!userInfo.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }

    return true
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError("Your cart is empty")
      return
    }

    if (!isAuthenticated) {
      setError("Please sign in to continue with checkout")
      return
    }

    // Move to shipping info step
    if (checkoutStep === "cart") {
      setCheckoutStep("shipping")
      setError(null)
    }
    // Validate shipping info and move to payment step
    else if (checkoutStep === "shipping") {
      if (validateShippingInfo()) {
        setCheckoutStep("payment")
        setError(null)
      }
    }
    // Process payment and place order
    else if (checkoutStep === "payment") {
      placeOrder()
    }
  }

  const placeOrder = async () => {
    if (!isAuthenticated) {
      setError("Please sign in to place an order")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("token")

      const orderData = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          address: userInfo.address,
          city: userInfo.city,
          zipCode: userInfo.zipCode,
          country: userInfo.country,
          phone: userInfo.phone,
        },
        totalAmount: getCartTotal(),
      }

      const response = await axios.post("http://localhost:8000/api/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Order placed successfully
      alert("Order placed successfully! Order ID: " + response.data.orderId)
      clearCart()
      closeCart()
      setCheckoutStep("cart")
    } catch (error) {
      console.error("Error placing order:", error)
      setError(error.response?.data?.message || "Failed to place order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (checkoutStep === "shipping") {
      setCheckoutStep("cart")
    } else if (checkoutStep === "payment") {
      setCheckoutStep("shipping")
    }
    setError(null)
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">
            {checkoutStep === "cart"
              ? "Your Cart"
              : checkoutStep === "shipping"
                ? "Shipping Information"
                : "Payment Details"}
          </h2>
          <button onClick={closeCart} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 mx-4 mt-4 rounded-md text-sm">{error}</div>
        )}

        {checkoutStep === "cart" && (
          <>
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 py-4 border-b"
                      >
                        <div className="w-20 h-20 bg-gray-50 p-2 flex-shrink-0 border">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium">{item.name}</h3>
                              <div className="mt-1 text-xs text-gray-500">
                                {item.size && <p>Size: {item.size}</p>}
                                {item.color && (
                                  <div className="flex items-center gap-1">
                                    <span>Color:</span>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium">${item.price}</div>
                              <button
                                onClick={() => removeFromCart(item.id, item.size, item.color)}
                                className="text-gray-400 hover:text-red-500 mt-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center border inline-flex">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="p-1"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 border-x min-w-[2rem] text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="p-1"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={clearCart}
                      className="flex-1 border border-black py-2 text-center hover:bg-gray-100 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="flex-1 bg-black text-white py-2 text-center hover:bg-gray-800 transition-colors"
                    >
                      Checkout
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">Shipping & taxes calculated at checkout</p>
                </div>
              </>
            )}
          </>
        )}

        {checkoutStep === "shipping" && (
          <div className="flex-1 overflow-y-auto p-4">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={userInfo.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={userInfo.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                  name="country"
                  value={userInfo.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
            </form>

            <div className="flex gap-2 mt-6">
              <button
                onClick={goBack}
                className="flex-1 border border-black py-2 text-center hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-black text-white py-2 text-center hover:bg-gray-800 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {checkoutStep === "payment" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">$10.00</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${(getCartTotal() + 10).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <div className="space-y-2">
                <div className="border p-3 rounded-md flex items-center">
                  <input type="radio" id="card" name="paymentMethod" defaultChecked />
                  <label htmlFor="card" className="ml-2">
                    Credit Card
                  </label>
                </div>
                <div className="border p-3 rounded-md flex items-center">
                  <input type="radio" id="paypal" name="paymentMethod" />
                  <label htmlFor="paypal" className="ml-2">
                    PayPal
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                <p>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p>{userInfo.address}</p>
                <p>
                  {userInfo.city}, {userInfo.zipCode}
                </p>
                <p>{userInfo.country}</p>
                <p>{userInfo.phone}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={goBack}
                className="flex-1 border border-black py-2 text-center hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={placeOrder}
                disabled={isLoading}
                className="flex-1 bg-black text-white py-2 text-center hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

