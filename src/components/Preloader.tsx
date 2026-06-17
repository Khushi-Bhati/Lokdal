"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Prevent scrolling on body while preloader is active
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1850);

    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2350);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-white flex items-center justify-center transition-opacity duration-500 ease-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-6 md:gap-8 p-6">
        {/* Logo and Party Name */}
        <div className="flex items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt="Lokdal Logo"
            width={120}
            height={80}
            className="w-20 h-auto sm:w-28 object-contain"
            priority
          />
          <span className="text-4xl sm:text-6xl font-black text-[#0b4d21] tracking-tight select-none">
            लोकदल
          </span>
        </div>

        {/* Concentric Spinning Red Arcs */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute preloader-spinner-outer" />
          <div className="absolute preloader-spinner-inner" />
        </div>
      </div>
    </div>
  );
}
