"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/app/context/context"

export default function CartModal() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useAuth()

  const [checkoutStep, setCheckoutStep] = useState("cart") // cart, shipping, payment

  const handleCheckout = () => {
    if (cart.length === 0) {
      return
    }

    // In a real app, you would handle the checkout process here
    // For now, just simulate moving to the next step
    if (checkoutStep === "cart") {
      setCheckoutStep("shipping")
    } else if (checkoutStep === "shipping") {
      setCheckoutStep("payment")
    } else {
      // Process payment and complete order
      alert("Order placed successfully!")
      clearCart()
      closeCart()
      setCheckoutStep("cart")
    }
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Your Cart</h2>
          <button onClick={closeCart} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

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
            <button onClick={closeCart} className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
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
      </div>
    </div>
  )
}

