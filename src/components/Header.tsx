"use client";

import Link from "next/link";
import { ChevronDown, UserPlus, Menu, X, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPressOpen, setIsPressOpen] = useState(false);
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobilePressOpen, setIsMobilePressOpen] = useState(false);
  const [isMobileOrgOpen, setIsMobileOrgOpen] = useState(false);

  const { language, setLanguage } = useLanguage();

  const closeMobile = () => {
    setIsMobileOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobilePressOpen(false);
    setIsMobileOrgOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

      {/* Top Bar */}
      <div className="w-full relative h-10 flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-[250px] sm:w-[350px] lg:w-[450px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,0 C98,50 85,100 80,100 L0,100 Z" fill="#0b4d21" />
          </svg>
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-16 flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center gap-5 pl-8 md:pl-20 text-white">
            <Link href="https://www.facebook.com/Lokdalindia/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><FaFacebookF size={14} /></Link>
            <Link href="https://x.com/lokdalindia" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><FaXTwitter size={14} /></Link>
            <Link href="mailto:lokdalparty@gmail.com" className="hover:opacity-80 transition-opacity"><Mail size={14} /></Link>
            <Link href="tel:9810074878" className="hover:opacity-80 transition-opacity"><Phone size={14} /></Link>

          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4">
          <Image src="/assets/logo.png" alt="Lokdal Logo" width={96} height={64} className="h-12 sm:h-16 w-auto object-contain" priority />
          <div className="flex flex-col justify-center">
            <span className="text-2xl sm:text-[32px] font-black text-[#0b4d21] tracking-tight leading-none mb-0.5">लोकदल</span>
            <span className="text-[11px] sm:text-[12px] font-bold text-gray-600 tracking-wide">पारिवर्तन है, विकल्प है</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center text-[15px] font-bold text-gray-600">
          <Link href="/" className="text-[#0b4d21] px-4 py-2 relative">
            होम
            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#0b4d21]" />
          </Link>
          <span className="text-gray-300 font-light px-1">|</span>

          <div className="relative" onMouseEnter={() => setIsAboutOpen(true)} onMouseLeave={() => setIsAboutOpen(false)}>
            <button className="hover:text-[#0b4d21] transition-colors px-4 py-2 flex items-center gap-1.5">
              लोकदल के बारे में
              <ChevronDown size={14} strokeWidth={3} className={`mt-0.5 transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
            </button>
            {isAboutOpen && (
              <div className="absolute left-0 top-full w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                <Link href="/about/chaudhary-charan-singh" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Chaudhary Charan Singh
                </Link>
                <Link href="/about/chaudhary-sunil-singh" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Chaudhary Sunil Singh
                </Link>
                <Link href="/about/history-of-lokdal" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> History of Lokdal
                </Link>
                <Link href="/about/ideology-of-lokdal" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Ideology of Lokdal
                </Link>
                <Link href="/about/lokdal-manifesto" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Lokdal Manifesto
                </Link>

              </div>
            )}
          </div>

          <span className="text-gray-300 font-light px-1">|</span>

          {/* Press & Media Link */}
          <Link href="/press-media" className="hover:text-[#0b4d21] transition-colors px-4 py-2">
            Press &amp; Media
          </Link>

          <span className="text-gray-300 font-light px-1">|</span>

          {/* Organisation Dropdown */}
          <div className="relative" onMouseEnter={() => setIsOrgOpen(true)} onMouseLeave={() => setIsOrgOpen(false)}>
            <button className="hover:text-[#0b4d21] transition-colors px-4 py-2 flex items-center gap-1.5">
              Organisation
              <ChevronDown size={14} strokeWidth={3} className={`mt-0.5 transition-transform ${isOrgOpen ? "rotate-180" : ""}`} />
            </button>
            {isOrgOpen && (
              <div className="absolute left-0 top-full w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                <Link href="/organization/national-executive" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> National Executive
                </Link>
                <Link href="/organization/uttar-pradesh" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Uttar Pradesh
                </Link>
                <Link href="/organization/haryana" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Haryana
                </Link>
                <Link href="/organization/rajasthan" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Rajasthan
                </Link>
                <Link href="/organization/kerala" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Kerala
                </Link>
                <Link href="/organization/bihar" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0b4d21] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Bihar
                </Link>
              </div>
            )}
          </div>

          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="/upcoming-events" className="hover:text-[#0b4d21] transition-colors px-4 py-2">Upcoming Events</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="/lokdal-live" className="hover:text-[#0b4d21] transition-colors px-4 py-2">Lokdal Live</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="/elections" className="hover:text-[#0b4d21] transition-colors px-4 py-2">Elections</Link>
          <span className="text-gray-300 font-light px-1">|</span>
          <Link href="/donate" className="hover:text-[#0b4d21] transition-colors px-4 py-2">दान करें</Link>
        </nav>

        {/* Right: language toggle + join + hamburger */}
        <div className="flex items-center gap-3">

          {/* Language dropdown — desktop */}
          <div className="hidden lg:block relative">
            <button
              type="button"
              onClick={() => setIsLangOpen((v) => !v)}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {language === "en" ? "EN — English" : "हिंदी"}
              <ChevronDown size={13} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                <button
                  onClick={() => { setLanguage("en"); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors flex items-center justify-between ${language === "en" ? "text-[#0b4d21] bg-green-50" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  English <span className="text-xs text-gray-400">EN</span>
                </button>
                <button
                  onClick={() => { setLanguage("hi"); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors flex items-center justify-between ${language === "hi" ? "text-[#0b4d21] bg-green-50" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  हिंदी <span className="text-xs text-gray-400">HI</span>
                </button>
              </div>
            )}
          </div>

          {/* Join Lokdal */}
          <Link href="/join" className="hidden sm:flex bg-[#0b4d21] hover:bg-[#073616] text-white px-4 py-2 rounded-md font-bold text-sm items-center gap-2 shadow-sm transition-all">
            <UserPlus size={15} strokeWidth={2.5} /> Join Lokdal
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="xl:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">

            <Link href="/" onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#0b4d21] font-black text-sm bg-green-50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> होम
            </Link>

            {/* About accordion */}
            <div>
              <button
                onClick={() => setIsMobileAboutOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> लोकदल के बारे में
                </span>
                <ChevronDown size={14} className={`transition-transform ${isMobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileAboutOpen && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-green-100 pl-4">
                  <Link href="/about/chaudhary-charan-singh" onClick={closeMobile}
                    className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">
                    Chaudhary Charan Singh
                  </Link>
                  <Link href="/about/chaudhary-sunil-singh" onClick={closeMobile}
                    className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">
                    Chaudhary Sunil Singh
                  </Link>
                  <Link href="/about/history-of-lokdal" onClick={closeMobile}
                    className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">
                    History of Lokdal
                  </Link>
                  <Link href="/about/ideology-of-lokdal" onClick={closeMobile}
                    className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">
                    Ideology of Lokdal
                  </Link>
                  <Link href="/about/lokdal-manifesto" onClick={closeMobile}
                    className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">
                    Lokdal Manifesto
                  </Link>

                </div>
              )}
            </div>

            {/* Press & Media Link */}
            <Link href="/press-media" onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-bold text-sm hover:bg-gray-50 hover:text-[#0b4d21] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Press &amp; Media
            </Link>

            {/* Organisation accordion */}
            <div>
              <button
                onClick={() => setIsMobileOrgOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Organisation
                </span>
                <ChevronDown size={14} className={`transition-transform ${isMobileOrgOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileOrgOpen && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-green-100 pl-4">
                  <Link href="/organization/national-executive" onClick={closeMobile} className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">National Executive</Link>
                  <Link href="/organization/uttar-pradesh" onClick={closeMobile} className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">Uttar Pradesh</Link>
                  <Link href="/organization/haryana" onClick={closeMobile} className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">Haryana</Link>
                  <Link href="/organization/rajasthan" onClick={closeMobile} className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">Rajasthan</Link>
                  <Link href="/organization/kerala" onClick={closeMobile} className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">Kerala</Link>
                  <Link href="/organization/bihar" onClick={closeMobile} className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-[#0b4d21] transition-colors font-medium">Bihar</Link>
                </div>
              )}
            </div>

            {[
              { href: "/upcoming-events", label: "Upcoming Events" },
              { href: "/lokdal-live", label: "Lokdal Live" },
              { href: "/elections", label: "Elections" },
              { href: "/donate", label: "दान करें" },
            ].map(({ href, label }) => (
              <Link key={label} href={href} onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-bold text-sm hover:bg-gray-50 hover:text-[#0b4d21] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> {label}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100" />

            <Link href="/join" onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-4 py-3 rounded-lg hover:bg-[#073616] transition-colors">
              <UserPlus size={16} /> Join Lokdal
            </Link>

            {/* EN / हिंदी toggle — mobile */}
            <div className="mt-2">
              <p className="text-xs font-black text-gray-400 uppercase tracking-wider px-1 mb-2">Language</p>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => { setLanguage("en"); closeMobile(); }}
                  className={`flex-1 py-2.5 text-sm font-black transition-colors ${language === "en" ? "bg-[#0b4d21] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  EN — English
                </button>
                <div className="w-px bg-gray-200" />
                <button
                  onClick={() => { setLanguage("hi"); closeMobile(); }}
                  className={`flex-1 py-2.5 text-sm font-black transition-colors ${language === "hi" ? "bg-[#0b4d21] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  हिंदी
                </button>
              </div>
            </div>

          </nav>
        </div>
      )}

    </header>
  );
}
