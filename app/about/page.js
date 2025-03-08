"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

export default function About() {
  // Parallax effect for hero section
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 150])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
          <Image src="/shop1.jpg" alt="Sneaker collection" fill className="object-cover brightness-75" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Branded Kicks</h1>
          <p className="text-xl md:text-2xl">Step Into Style with Authentic Sneakers</p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Our Story
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p>
                Branded Kicks was founded by a team of sneaker enthusiasts who saw a gap in the market—authentic,
                high-quality branded sneakers at <strong>affordable prices</strong>. Frustrated with overpriced
                resellers and counterfeit markets, we set out on a mission:{" "}
                <strong>to create a sneaker store that people can trust.</strong>
              </p>
              <p>
                What started as a small passion project quickly grew into a thriving sneaker community. Today, we are
                proud to provide <strong>100% genuine, stylish, and comfortable footwear</strong> to sneaker lovers
                worldwide.
              </p>
            </motion.div>

            {/* Story Image - Fixed the container */}
            <motion.div
              className="md:w-1/2 h-64 md:h-80 relative hidden md:inline-table rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image src="/side.jpg" alt="Our store beginnings" fill className="object-cover" />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">💎</span>
                </div>
                <h3 className="text-xl font-bold">Authenticity</h3>
              </div>
              <p>
                Every pair we sell is <strong>100% genuine</strong>. No fakes, no compromises.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">🔥</span>
                </div>
                <h3 className="text-xl font-bold">Exclusivity</h3>
              </div>
              <p>
                We bring you the <strong>hottest sneaker releases and rare finds</strong> before anyone else.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-xl font-bold">Affordability</h3>
              </div>
              <p>
                Premium sneakers shouldn't break the bank. We offer <strong>competitive prices</strong> so everyone can
                step up their style.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">💡</span>
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
              </div>
              <p>
                Sneakers are evolving, and so are we. We keep up with the latest trends and technologies to offer you
                the best.
              </p>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Why Choose Branded Kicks?
          </motion.h2>

          {/* Feature Image - Sneaker Showcase */}
          <motion.div
            className="relative h-80 mb-8 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <Image src="/handpick.jpg" alt="Premium sneaker collection" fill className="object-cover" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-white p-8 max-w-md">
                <h3 className="text-2xl font-bold mb-4">Handpicked, Authentic Sneakers</h3>
                <p>No imitations, no second-guessing. Only the real deal.</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✔️</span>
              </div>
              <h3 className="font-bold mb-2">Fast & Secure Shipping</h3>
              <p className="text-gray-600">Get your kicks delivered quickly and safely.</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✔️</span>
              </div>
              <h3 className="font-bold mb-2">Customer-First Approach</h3>
              <p className="text-gray-600">Your satisfaction is our top priority.</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✔️</span>
              </div>
              <h3 className="font-bold mb-2">Limited Edition Sneakers</h3>
              <p className="text-gray-600">We get our hands on exclusive pairs you won't find elsewhere.</p>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Meet Our Team
          </motion.h2>

          {/* Team Section - Add founder/team images here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Team Member 1 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/ameer.jpg" alt="Founder 1" fill className="object-cover" />
              </motion.div>
              <h3 className="font-bold text-xl">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <p className="mt-2 text-sm">Sneaker enthusiast with 15+ years in the industry.</p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/woman.jpg" alt="Founder 2" fill className="object-cover" />
              </motion.div>
              <h3 className="font-bold text-xl">Jane Smith</h3>
              <p className="text-gray-600">Creative Director</p>
              <p className="mt-2 text-sm">Former designer for major sneaker brands.</p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/aliu.jpg" alt="Founder 3" fill className="object-cover" />
              </motion.div>
              <h3 className="font-bold text-xl">Mike Johnson</h3>
              <p className="text-gray-600">Head of Acquisitions</p>
              <p className="mt-2 text-sm">Specializes in finding rare and limited edition sneakers.</p>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Join the Movement
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            Branded Kicks isn't just a store—it's a <strong>sneaker culture</strong>. Whether you're looking for
            streetwear classics, high-performance sneakers, or limited-edition collaborations, we have the perfect pair
            for you.
          </motion.p>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-6 mb-12"
          >
            <motion.a
              href="#"
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#E1306C" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#1DA1F2" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#0077B5" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 2.98 1.75 3.83 1.12.85 2.57 1.17 3.98 1.45-.65.77-1.33 1.52-1.96 2.29-.3.39-.73.76-.63 1.29.01 3.28.01 6.55-.01 9.83-.12 1.21-1.07 2.24-2.21 2.68-1.13.46-2.47.4-3.59-.08-1.15-.51-2.01-1.61-2.16-2.85-.15-1.28.27-2.64 1.17-3.54.61-.61 1.54-.93 2.4-.91 1.21.03 2.33.73 2.99 1.71.02-1.85.02-3.71 0-5.57-.74.75-1.7 1.23-2.74 1.34-2.73.25-5.61-1.4-6.87-3.85-1.3-2.43-.81-5.58 1.17-7.59 1.08-1.14 2.5-1.98 4.06-2.3.92-.21 1.87-.28 2.82-.23zm1.92 2.15c-.41-.01-.82.04-1.21.13-2.31.57-4.03 3.05-3.76 5.49.2 1.96 1.59 3.76 3.49 4.3 1.86.53 3.96-.01 5.21-1.5.95-1.09 1.4-2.67 1.11-4.12-.32-1.83-1.67-3.46-3.4-4.08-.46-.15-.94-.22-1.44-.22z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-gray-900 text-white p-8 rounded-lg text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Elevate Your Sneaker Game?</h2>
            <p className="mb-6">
              Discover our collection of authentic, premium sneakers and join the Branded Kicks community.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/catalog"
                className="inline-block bg-lime-400 text-black px-8 py-3 font-bold rounded-md hover:bg-lime-500 transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Store Location Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Visit Our Store
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {/* Store Image */}
              <motion.div
                className="h-64 md:h-full relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/shop2.jpg" alt="Our physical store" fill className="object-cover" />
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Branded Kicks Flagship Store</h3>
              <p className="mb-4">
                Experience our collection in person and get expert advice from our team of sneaker specialists.
              </p>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h4 className="font-bold">Address:</h4>
                <p>123 Sneaker Street</p>
                <p>New York, NY 10001</p>
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h4 className="font-bold">Hours:</h4>
                <p>Monday - Friday: 10am - 8pm</p>
                <p>Saturday: 10am - 6pm</p>
                <p>Sunday: 12pm - 5pm</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h4 className="font-bold">Contact:</h4>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@brandedkicks.com</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

