"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[540px] flex items-center bg-[#084920] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero image.png"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />

      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0b4d21] leading-tight mb-4 drop-shadow-sm">
          पारवर्तन है,<br />विकल्प है <span className="text-[#0b4d21]">लोकदल</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-800 font-medium mb-8 flex flex-wrap gap-x-4 gap-y-2 items-center justify-center">
          <span>शिक्षा का अधिकार</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span>भ्रष्टाचार का विरोध</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span>किसान का सम्मान</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span>समाज का उत्थान</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#join"
            className="bg-[#0b4d21] hover:bg-[#073616] text-white px-8 py-3 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md"
          >
            हमारे साथ जुड़ें <ArrowRight size={18} />
          </Link>
          <Link
            href="#about"
            className="border-2 border-[#0b4d21] text-[#0b4d21] bg-white/70 hover:bg-white px-8 py-3 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all"
          >
            लोकदल के बारे में <ArrowRight size={18} />
          </Link>
        </div>
      </div>


    </section>
  );
}
