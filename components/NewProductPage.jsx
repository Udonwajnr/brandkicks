"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

import { useAuth } from "@/app/context/context"
import { motion, useInView } from "framer-motion"
import SpinningShopButton from "./SpinningShopButton"

export default function NewProductsPage() {
  const { product, addToCart } = useAuth()

  // Refs for scroll animations
  const titleRef = useRef(null)
  const productsRef = useRef(null)
  const forWhomTitleRef = useRef(null)
  const forWhomRef = useRef(null)

  // Check if elements are in view
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 })
  const productsInView = useInView(productsRef, { once: true, amount: 0.2 })
  const forWhomTitleInView = useInView(forWhomTitleRef, { once: true, amount: 0.5 })
  const forWhomInView = useInView(forWhomRef, { once: true, amount: 0.3 })

  return (
    <main className="bg-white">
      {/* New Products Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <motion.h2
            ref={titleRef}
            className="text-3xl font-bold mb-8 bg-lime-400 inline-block px-4 py-1"
            initial={{ opacity: 0, x: -30 }}
            animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            NEW PRODUCTS
          </motion.h2>

          <motion.div
            ref={productsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={productsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.slice(0, 4).map((product, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <button className="absolute top-2 right-2 z-10">
                  {/* <Heart className="h-5 w-5" /> */}
                </button>
                <Link href={`/catalog/${product.slug}`} className="block">
                  <div className="relative h-[360px] mb-2 bg-gray-50 p-4 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={`${product.images[0]}`}
                        alt={product.name}
                        width={180}
                        height={180}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="text-sm font-bold uppercase mb-1">{product.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-red-600 font-bold">$ {product.price}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Whom You Choose Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <motion.h2
            ref={forWhomTitleRef}
            className="text-5xl md:text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={forWhomTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            FOR WHOM YOU CHOOSE
          </motion.h2>

          <motion.div
            ref={forWhomRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={forWhomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="relative bg-gray-100 overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={forWhomInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/man.jpg"
                alt="Man in teal outfit with sneakers"
                width={1000}
                height={1000}
                className="transition-transform duration-500 hover:scale-105"
              />
              <motion.div
                className="absolute bottom-4 left-4"
                initial={{ opacity: 0, y: 20 }}
                animate={forWhomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                <SpinningShopButton text={"For Men  • For Men • or Men"} href = "/catalog?gender=male"/>
                {/* <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.5 4.5L21 12L13.5 19.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M21 12H3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div> */}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative bg-gray-100 overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={forWhomInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/g.jpg"
                alt="Woman in red jacket with sneakers"
                width={1000}
                height={1000}
                className="transition-transform duration-500 hover:scale-105"
              />
              <motion.div
                className="absolute bottom-4 left-4"
                initial={{ opacity: 0, y: 20 }}
                animate={forWhomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >

                <SpinningShopButton text={"For women•For Women•For Wo"} href = "/catalog?gender=female"/>
                {/* <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.5 4.5L21 12L13.5 19.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M21 12H3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div> */}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}