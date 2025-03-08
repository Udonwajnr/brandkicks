"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">Have questions about our products or services? We're here to help!</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 md:p-8 rounded-lg shadow-md border"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Order Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lime-500 hover:bg-lime-600 text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-lime-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Our Store</h3>
                      <p className="text-gray-600">
                        123 Sneaker Street
                        <br />
                        Footwear District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-lime-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600">
                        +1 (555) 123-4567
                        <br />
                        Monday to Friday, 9am to 6pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-lime-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">
                        info@sneakersshop.com
                        <br />
                        support@sneakersshop.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-lime-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Opening Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 8:00 PM
                        <br />
                        Saturday: 10:00 AM - 6:00 PM
                        <br />
                        Sunday: 12:00 PM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              {/* <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Find Us</h3>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Store location map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-lg shadow-md">
                      <MapPin className="h-6 w-6 text-lime-500" />
                    </div>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How long does shipping take?",
                answer:
                  "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 business day delivery.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We offer a 30-day return policy for unworn items in original packaging. Return shipping is free for exchanges.",
              },
              {
                question: "Do you ship internationally?",
                answer:
                  "Yes, we ship to most countries worldwide. International shipping times vary by location, typically 7-14 business days.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="bg-white p-6 rounded-lg shadow-sm border"
              >
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-6">Subscribe to our newsletter for the latest product releases and exclusive offers.</p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Your email address" type="email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-lime-500 hover:bg-lime-600 text-black whitespace-nowrap">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

