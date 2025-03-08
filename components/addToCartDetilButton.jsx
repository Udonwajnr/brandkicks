"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SpinningShopButton({ spinning, size, onClick, text,handleAddToCart }) {
  const circleRef = useRef(null);
  const textPathRef = useRef(null);

  const sizeMap = {
    sm: {
      button: "w-16 h-16",
      radius: 22,
      fontSize: "text-[8px]",
      arrowSize: 20,
    },
    md: {
      button: "w-24 h-24",
      radius: 34,
      fontSize: "text-[11px]",
      arrowSize: 24,
    },
    lg: {
      button: "w-32 h-32",
      radius: 46,
      fontSize: "text-[14px]",
      arrowSize: 32,
    },
  };

  const { button, radius, fontSize, arrowSize } = sizeMap[size];

  useEffect(() => {
    if (circleRef.current && textPathRef.current) {
      textPathRef.current.setAttribute("startOffset", "0%");
    }
  }, [radius]);

  return (
    <motion.button
      className=" md:mt-0 relative flex justify-center items-center lg:inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
    >
      <div
        className={`${button} rounded-full border-2 border-black bg-white hover:bg-lime-400 transition-colors duration-300 flex items-center justify-center relative group`}
      >
        <svg className={`absolute inset-0 w-full h-full ${spinning ? "animate-spin-slow" : ""}`} viewBox="0 0 100 100">
          <defs>
            <path
              id="circle"
              d={`M 50, 50 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
              ref={circleRef}
            />
          </defs>
          <text className={`${fontSize} uppercase font-bold tracking-widest fill-black group-hover:fill-black`}>
            <textPath xlinkHref="#circle" ref={textPathRef}>
              {text ? text : "Shop Now • Shop Now • Shop Now • Shop Now •"}
            </textPath>
          </text>
        </svg>

        <svg
          width={arrowSize}
          height={arrowSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="z-10 group-hover:translate-x-1 transition-transform duration-300"
        >
          <path d="M13.5 4.5L21 12L13.5 19.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12H3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.button>
  );
}
