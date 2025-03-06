"use client"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Search } from "lucide-react"
import SpinningShopButton from "@/components/SpinningButton";
import BrandLogo from "@/components/BrandLogos";
import SiteHeader from "@/components/SiteHeader";
import NewProductsPage from "@/components/NewProductPage";
import { useState } from "react";

export default function SneakersShop() {
  const brands = [
    { default: "/nike.webp", active: "/nike-active.webp" },
    { default: "/aasics.png", active: "/aasics-active.png" },
    { default: "/adidas.png", active: "/adidas-active.png" },
    { default: "/puma.png", active: "/puma-active.png" },
    { default: "/reebok.png", active: "/reebok-active.png" },
    { default: "/columbia.png", active: "/columbia-active.png" },
  ];
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <SiteHeader/>
          

          {/* Hero Content */}
          <div className=" grid  gap-8 py-8 md:py-16 relative z-10 ">
            <div className="flex flex-col  ">
              <h1 className="text-4xl md:text-8xl font-bold uppercase leading-tight ">
                New Arrival
                <br />
                Sneakers
              </h1>
              <p className="my-7 text-lg">Choose your best sneakers</p>

      {/* Circular Button */}
                  <SpinningShopButton/>                  
            </div>

            <div className="absolute right-0 -z-10">
              <Image
                src="/pngwing.png"
                alt="Orange Nike Air Jordan Sneakers"
                width={900}
                height={900}
                className="object-contain mx-auto"
              />
              <div className="absolute  md:left-40 md:top-[300px] bg-lime-400 py-1 px-3 -rotate-12 text-sm font-bold">
                15% DISCOUNT
                <br />
                ONLY NOW!
              </div>
            </div>
          </div>

          {/* Brand Logos */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 py-6 border-t border-b">
      {brands.map((brand, index) => (
        <div
          key={index}
          className={`flex items-center justify-center border cursor-pointer transition-all duration-300 ${
            activeIndex === index ? "bg-gray-200" : ""
          }`}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => setActiveIndex(index)}
        >
          <img
            src={hoverIndex === index || activeIndex === index ? brand.active : brand.default}
            alt="Brand Logo"
            className="w-[100%] transition-transform duration-300"
          />
        </div>
      ))}
    </div>


          {/* Champions Section */}
          <div className="grid md:grid-cols-2 gap-8 py-12">
            <div className="relative h-64 md:h-auto bg-gray-100">
              <Image
                src="/basketball.jpg"
                alt="Basketball player"
                width={400}
                height={400}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
                Champions
                <br />
                Choose Us
              </h2>
              <p className="mt-6 text-sm leading-relaxed">
                We make sneakers for everyday walks, running, stylish looks. We work only with official suppliers, so
                all sneakers are 100% original.
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Our online store features brands that customers love and are looking for. Unique models or collections
                that are not available in other stores. Fast delivery to all regions.
              </p>
            </div>
          </div>
        </div>
      </section>


      <NewProductsPage/>
     
    </main>
  )
}

