"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Alert } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:8000/api/user/login", {
        email: formData.email,
        password: formData.password,
      })

      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)

        // Set default auth header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

        showAlert("success", "Login Successful", "You have been logged in successfully.")

        // Redirect to home page after successful login
        setTimeout(() => {
          router.push("/")
        }, 1000)
      }
    } catch (error) {
      console.error("Login error:", error)

      if (error.response?.data?.message) {
        showAlert("error", "Login Failed", error.response.data.message)
      } else {
        showAlert("error", "Login Failed", "Invalid email or password. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Alert isOpen={alert.isOpen} type={alert.type} title={alert.title} message={alert.message} onClose={closeAlert} />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">BrandedKicks</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-xs text-gray-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"} pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-black font-medium hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

