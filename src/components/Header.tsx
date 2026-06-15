"use client";

import Link from "next/link";
import { ChevronDown, UserPlus } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";

export default function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, options } = useLanguage();
  const selectedLanguage = options.find((option) => option.code === language) ?? options[0];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      {/* Top Bar */}
      <div className="w-full relative h-10 flex items-center">
        {/* The green slanted background */}
        <div className="absolute left-0 top-0 bottom-0 w-[250px] sm:w-[350px] lg:w-[450px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,0 C98,50 85,100 80,100 L0,100 Z" fill="#0b4d21" />
          </svg>
        </div>
        
        {/* Social Icons */}
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center gap-5 pl-8 md:pl-20 text-white">
            <Link href="#" className="hover:text-green-300 transition-colors"><FaFacebookF size={14} /></Link>
            <Link href="#" className="hover:text-green-300 transition-colors"><FaXTwitter size={14} /></Link>
            <Link href="#" className="hover:text-green-300 transition-colors"><FaInstagram size={14} /></Link>
            <Link href="#" className="hover:text-green-300 transition-colors"><FaYoutube size={14} /></Link>
            <Link href="#" className="hover:text-green-300 transition-colors"><FaWhatsapp size={14} /></Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 py-3 flex justify-between items-center">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt="Lokdal Logo"
            width={96}
            height={64}
            className="h-16 w-auto object-contain"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-[32px] font-black text-[#0b4d21] tracking-tight leading-none mb-1">लोकदल</span>
            <span className="text-[12px] font-bold text-gray-600 tracking-wide">पारिवर्तन है, विकल्प है</span>
          </div>
        </Link>
        
        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center text-[15px] font-bold text-gray-600">
          <Link href="/" className="text-[#0b4d21] px-4 py-2 relative">
            होम
            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#0b4d21]"></span>
          </Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="#about" className="hover:text-[#0b4d21] transition-colors px-4 py-2 flex items-center gap-1.5">
            लोकदल के बारे में <ChevronDown size={14} strokeWidth={3} className="mt-0.5" />
          </Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="#events" className="hover:text-[#0b4d21] transition-colors px-4 py-2">कार्यक्रम</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="#organization" className="hover:text-[#0b4d21] transition-colors px-4 py-2">संगठन</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="#ideology" className="hover:text-[#0b4d21] transition-colors px-4 py-2">विचारधारा</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="#issues" className="hover:text-[#0b4d21] transition-colors px-4 py-2">समाज के मुद्दे</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="#donate" className="hover:text-[#0b4d21] transition-colors px-4 py-2">दान करें</Link>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((isOpen) => !isOpen)}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 font-bold text-sm px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              aria-haspopup="menu"
              aria-expanded={isLanguageOpen}
            >
              {selectedLanguage.nativeLabel} ({selectedLanguage.label}){" "}
              <ChevronDown
                size={14}
                strokeWidth={3}
                className={`transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLanguageOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              >
                {options.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setLanguage(option.code);
                      setIsLanguageOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-bold transition-colors ${
                      option.code === language
                        ? "bg-green-50 text-[#0b4d21]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{option.nativeLabel}</span>
                    <span className="text-xs text-gray-400">{option.shortLabel}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Link href="#join" className="bg-[#0b4d21] hover:bg-[#073616] text-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 shadow-sm transition-all">
            <UserPlus size={16} strokeWidth={2.5} /> Join Lokdal
          </Link>
        </div>
        
      </div>
    </header>
  );
}
