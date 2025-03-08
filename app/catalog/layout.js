"use client"
import { Suspense } from "react"

export default function AdminLayout({children}) {
  return (
    <>
        <Suspense>
            {children}
        </Suspense>
    </>
  )
}

