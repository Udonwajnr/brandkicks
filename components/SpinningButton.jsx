"use client";

import { useEffect, useRef } from "react";

const SpinningShopButton = () => {
  const circleRef = useRef(null);
  const textPathRef = useRef(null);

  useEffect(() => {
    if (circleRef.current && textPathRef.current) {
      // Set the text path to follow the circle properly
      textPathRef.current.setAttribute("startOffset", "0%");
    }
  }, []);

  return (
    <div className="mt-8 relative inline-block">
      <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center relative">
        {/* Spinning Circular Text */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <path
              id="circle"
              d="M 50, 50 m -25, 0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
              ref={circleRef}
            />
          </defs>
          <text className="text-[7px] uppercase font-bold tracking-wider fill-black">
            <textPath xlinkHref="#circle" ref={textPathRef}>
              Shop Now • Shop Now • Shop Now •
            </textPath>
          </text>
        </svg>

        {/* Arrow in the center */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10">
          <path
            d="M13.5 4.5L21 12L13.5 19.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M21 12H3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default SpinningShopButton;
