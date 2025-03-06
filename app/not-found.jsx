"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 relative">
          <div className="text-[150px] font-bold text-black leading-none">404</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-lime-400 rounded-full -z-10 opacity-50"></div>

          {/* Sneaker illustration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
            <Image
              src="/placeholder.svg?height=120&width=240"
              alt="Sneaker outline"
              width={240}
              height={120}
              className="opacity-20"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the sneakers you're looking for. The page may have moved or doesn't exist.
        </p>

        {/* <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for sneakers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-black hover:bg-gray-800">
              Search
            </Button>
          </div>
        </form> */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button variant="outline" className="flex items-center justify-center" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button className="bg-black hover:bg-gray-800 flex items-center justify-center" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Brandedkicks • All rights reserved</p>
      </div>
    </div>
  )
}

