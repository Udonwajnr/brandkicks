"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setCart([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    setCart((prevCart) => {
      // Check if the product with the same ID, size, and color already exists in the cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product._id && item.size === selectedSize && item.color === selectedColor,
      )

      if (existingItemIndex !== -1) {
        // If it exists, update the quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        // If it doesn't exist, add a new item
        return [
          ...prevCart,
          {
            id: product._id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || "/placeholder.svg",
            quantity,
            size: selectedSize,
            color: selectedColor,
            brand: product.brand,
          },
        ]
      }
    })
  }

  const removeFromCart = (itemId, size, color) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === itemId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (itemId, size, color, newQuantity) => {
    if (newQuantity < 1) return

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.size === size && item.color === color ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}

