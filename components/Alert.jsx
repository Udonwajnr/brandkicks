import React from "react"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"



export function Alert({ type, title, message, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-5">
      <div
        className={cn(
          "p-4 rounded-md shadow-md border",
          type === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        )}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-sm mt-1">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className={cn(
              "p-1 rounded-full",
              type === "success" ? "hover:bg-green-100" : "hover:bg-red-100"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
