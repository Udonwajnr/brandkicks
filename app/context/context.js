"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Base API URL
const BASE_URL = "http://localhost:8000"; // Replace with actual API URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is in .env.local

// Create Context
const AuthContext = createContext(undefined);

// AuthProvider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [product,setProduct] = useState([]) 
  const router = useRouter();
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  // Create Axios Instance (Without Authorization Header)
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  // Attach Axios Interceptor (Fetch Token Dynamically)
  api.interceptors.request.use(
    async (config) => {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("token"); // Get the latest token
        console.log("🔹 Token from localStorage:", accessToken);

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Load token from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await api.get("/api/user/profile");
        console.log(response)
        setUser(response.data);
      } catch (error) {
        console.error("Auth check error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setToken("");
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [token]); // Runs when token changes

  useEffect(()=>{
        getProduct()
  },[])

  useEffect(() => {
    if(typeof window !== "undefined"){
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }
  }, [])

  useEffect(() => {
    if(typeof window !=="undefined" && cart.length > 0){
        localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart])

  // Login Function
  const login = async (email, password) => {
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      })

      const { token, user } = response.data

      // Save token
      localStorage.setItem("token", token)
      setUser(user)
      return user
    } finally {
      setIsLoading(false)
    }
  }

  // Signup Function
  const signup = async (name, email, password) => {
    setIsLoading(true)

    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    router.push("/auth/login")
  }

  const getProduct =async()=>{
    await api.get("/api/products")
    .then((response)=>setProduct(response.data))
    .catch((err)=>{console.log(err)})
  }


  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
  setCart((prevCart) => {
    // Ensure previous cart is an array
    if (!Array.isArray(prevCart)) return [];

    // Check if the product with the same ID, size, and color already exists
    const existingItemIndex = prevCart.findIndex(
      (item) => item.id === product._id && item.size === selectedSize && item.color === selectedColor
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      updatedCart = prevCart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item to cart
      updatedCart = [
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
      ];
    }

    // Update localStorage immediately after updating state
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return updatedCart;
  });
};

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
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        api,
        product,
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
    </AuthContext.Provider>
  );
}

// Hook to use Auth Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
