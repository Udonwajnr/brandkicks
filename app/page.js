"use client"
import Image from "next/image"
import SpinningShopButton from "@/components/SpinningShopButton"
import NewProductsPage from "@/components/NewProductPage"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"

export default function SneakersShop() {
  const brands = [
    {
      logo: "/nike.png",
      shoe: "/nike-shoe.png",
      name: "Nike",
    },
    {
      logo: "/aasics.png",
      shoe: "/aasicshoe.png",
      name: "Asics",
    },
    {
      logo: "/adidas.png",
      shoe: "/addidas.png",
      name: "Adidas",
    },
    {
      logo: "/puma.png",
      shoe: "/puma-shoe.png",
      name: "Puma",
    },
    {
      logo: "/reebok.png",
      shoe: "/pngwing.com (17).png",
      name: "Reebok",
    },
    {
      logo: "/columbia.png",
      shoe: "/pngwing.com (18).png",
      name: "Columbia",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [currentShoe, setCurrentShoe] = useState(brands[0].shoe) // Default to first brand's shoe

  // Refs for scroll animations
  const heroRef = useRef(null)
  const brandsRef = useRef(null)
  const championsImageRef = useRef(null)
  const championsTextRef = useRef(null)

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const brandsInView = useInView(brandsRef, { once: true, amount: 0.3 })
  const championsImageInView = useInView(championsImageRef, { once: true, amount: 0.3 })
  const championsTextInView = useInView(championsTextRef, { once: true, amount: 0.3 })

  // Parallax effect for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 100])

  // Update the current shoe when activeIndex changes
  useEffect(() => {
    if (activeIndex !== null) {
      setCurrentShoe(brands[activeIndex].shoe)
    } else {
      setCurrentShoe(brands[0].shoe) // Default to first brand's shoe when no brand is selected
    }
  }, [activeIndex, brands])

  return (
    <main className="min-h-screen bg-white overflow-x-hidden overflow-y-hidden">
      {/* Hero Section */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <motion.div 
            ref={heroRef}
            className="grid gap-8 py-8 md:py-16 relative z-10"
            style={{ y: heroY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-8xl font-bold uppercase leading-tight text-center md:text-left">
                New Arrival
                <br />
                Sneakers
              </h1>
              <p className="my-7 text-lg w-40">Choose your best sneakers</p>

              {/* Circular Button */}
              <SpinningShopButton spinning={true} href={"/catalog"}/>
            </motion.div>

            {/* Shoe image that changes based on active brand */}
            <div className="absolute right-0 -z-10 w-full h-full flex justify-end items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentShoe}
                  initial={{ opacity: 0, y: 20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -20, rotate: 5 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Image
                    src={currentShoe || "/placeholder.svg"}
                    alt={
                      activeIndex !== null ? `${brands[activeIndex].name} Sneakers` : "Orange Nike Air Jordan Sneakers"
                    }
                    width={1000}
                    height={1000}
                    className="object-contain mx-auto"
                  />
                  <motion.div 
                    className="absolute md:left-40 md:top-[300px] top-[100px] bg-lime-400 py-1 px-3 -rotate-12 text-sm font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    15% DISCOUNT
                    <br />
                    ONLY NOW!
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Brand Logos */}
          <motion.div 
            ref={brandsRef}
            className="grid grid-cols-3 md:grid-cols-6 gap-2 py-6 border-t border-b"
            initial={{ opacity: 0, y: 50 }}
            animate={brandsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                className={`
                  flex items-center justify-center border cursor-pointer transition-all duration-300 h-20 
                  bg-white
                  ${
                    activeIndex === index
                      ? "bg-gradient-to-b from-lime-400/20 to-lime-400/40 border-lime-500 shadow-md"
                      : "hover:bg-gray-50"
                  }
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={brandsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-full h-full flex items-center justify-center p-2 relative">
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 border-2 border-lime-500 pointer-events-none"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Hover glow effect */}
                  {hoverIndex === index && activeIndex !== index && (
                    <motion.div
                      className="absolute inset-0 bg-gray-100 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <motion.img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className={`
                      max-h-full max-w-full object-contain transition-all duration-300
                      ${activeIndex === index ? "filter drop-shadow-md" : "opacity-80 hover:opacity-100"}
                    `}
                    animate={{
                      scale: activeIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Champions Section */}
          <div className="grid md:grid-cols-2 gap-8 py-12">
            <motion.div 
              ref={championsImageRef}
              className="relative h-64 md:h-auto bg-gray-100 overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={championsImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/basketball.jpg"
                alt="Basketball player"
                width={400}
                height={400}
                className="object-cover h-full w-full"
              />
            </motion.div>
            <motion.div 
              ref={championsTextRef}
              className="flex flex-col  justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={championsTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <div className="">
                <h2 className="text-3xl md:text-7xl font-bold uppercase leading-tight text-center ">
                  Champions
                  Choose Us
                </h2>

              </div>
              <motion.p 
                className="mt-6 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={championsTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We make sneakers for everyday walks, running, stylish looks. We work only with official suppliers, so
                all sneakers are 100% original.
              </motion.p>
              <motion.p 
                className="mt-4 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={championsTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Our online store features brands that customers love and are looking for. Unique models or collections
                that are not available in other stores. Fast delivery to all regions.
              </motion.p>
              <motion.p 
                className="mt-4 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={championsTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Possibility of return or exchange if the product does not fit. Special offers for those who buy online
                or on a certain date. Consultants who help choose the perfect model by size or purpose.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <NewProductsPage />
    </main>
  )
}
