"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, Bookmark, Calendar, PlayCircle } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pressReleases = [
  { date: "13-06-2026", title: "Hon'ble Sunil Singh जी की प्रेस वार्ता के मुख्य बिंदु" },
  { date: "11-06-2026", title: "किसान, युवा और ग्रामीण विकास पर लोकदल की प्राथमिकताएं" },
  { date: "10-06-2026", title: "Hon'ble Sunil Singh जी ने केंद्र सरकार की नीतियों पर उठाए प्रश्न" },
  { date: "09-06-2026", title: "NDA बैठक में लोकदल की अहम प्रस्तावनाएं" },
  { date: "08-06-2026", title: "मीडिया के सवालों के जवाब में लोकदल का आधिकारिक बयान" },
  { date: "07-06-2026", title: "लोकदल की संगठनात्मक बैठक सफलतापूर्वक संपन्न" },
  { date: "06-06-2026", title: "दिल्ली अधिवेशन में Sunil Singh जी का प्रेरणादायक संबोधन" },
  { date: "05-06-2026", title: "बिहार दौरे पर Hon'ble Sunil Singh जी, कई जनसभाओं को किया संबोधित" },

  { date: "02-06-2026", title: "Hon'ble Sunil Singh जी का युवा सम्मेलन को संबोधन" },

];

const socialLinks = {
  facebook: "https://www.facebook.com/Lokdalindia/",
  twitter: "https://x.com/Lokdalindia",
  youtube: "https://www.youtube.com/@Lokdalindia",
};

const pressCardImages = [
  "/assets/gallery-5.jpg",
  "/assets/7(1).jpg",
  "/assets/hazare3.jpg",
  "/assets/hazare2.jpg",
  "/assets/gallery-5.jpg",
  "/assets/7(1).jpg",
  "/assets/dharna1.jpeg",
  "/assets/dharna3.jpeg",
  "/assets/gallery-9.jpg"

];

// Convert dd-mm-yyyy to a Date object for comparison
function parseDate(dateStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split("-");
  return new Date(`${yyyy}-${mm}-${dd}`);
}

export default function PressMediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  const filteredReleases = useMemo(() => {
    return pressReleases.filter((pr) => {
      // Title filter
      if (appliedSearch && !pr.title.toLowerCase().includes(appliedSearch.toLowerCase())) {
        return false;
      }
      // Date range filter
      if (appliedFrom || appliedTo) {
        const prDate = parseDate(pr.date);
        if (appliedFrom) {
          const from = new Date(appliedFrom);
          if (prDate < from) return false;
        }
        if (appliedTo) {
          const to = new Date(appliedTo);
          if (prDate > to) return false;
        }
      }
      return true;
    });
  }, [appliedSearch, appliedFrom, appliedTo]);

  const handleSearch = () => {
    setAppliedSearch(searchQuery);
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
  };

  const handleReset = () => {
    setSearchQuery("");
    setFromDate("");
    setToDate("");
    setAppliedSearch("");
    setAppliedFrom("");
    setAppliedTo("");
  };
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* ── SEARCH BAR & FILTERS ── */}
      <div className="w-full bg-white border-b border-gray-100 py-4 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row justify-end items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input type="text" placeholder="Search By Title" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="border border-gray-200 rounded-md px-4 py-2 text-sm w-full sm:w-64 outline-none focus:border-[#0b4d21]" />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500 w-full outline-none focus:border-[#0b4d21]" />
            <span className="text-gray-400">-</span>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500 w-full outline-none focus:border-[#0b4d21]" />
          </div>
          <button onClick={handleSearch} className="bg-[#0b4d21] text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-[#073616] w-full sm:w-auto">
            Search
          </button>
          {(appliedSearch || appliedFrom || appliedTo) && (
            <button onClick={handleReset} className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-100 w-full sm:w-auto">
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8">

        {/* HERO BANNER - FULL WIDTH */}
        <div className="relative w-full min-h-[450px] sm:min-h-[550px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-sm mb-8 flex items-center">
          <div className="absolute inset-0 z-0">
            <Image src="/assets/press img.png" alt="Press Media Banner" fill className="object-cover object-center" priority />
          </div>

          <div className="relative z-10 p-8 sm:p-12 w-full md:w-2/3 lg:w-1/2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl border-2 border-[#0b4d21] flex items-center justify-center text-[#0b4d21] shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
              </div>
              <div>
                <h1 className="text-4xl sm:text-6xl font-black text-[#0b4d21] leading-tight">प्रेस विज्ञप्ति</h1>
                <p className="text-gray-800 font-bold mt-1 text-sm sm:text-base">लोकदल की आधिकारिक घोषणाएं, बयान और अपडेट</p>
              </div>
            </div>

            <div className="w-12 h-0.5 bg-green-500 mb-8" />

            <div className="mt-8">
              <p className="flex items-center gap-2 text-sm text-[#0b4d21] font-bold mb-2">
                <Calendar size={16} /> 13 जून 2026
              </p>
              <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-6 leading-snug">
                Hon&apos;ble Sunil Singh जी की प्रेस वार्ता के मुख्य बिंदु...
              </h2>
              <button className="bg-[#0b4d21] text-white px-6 py-2.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#073616] transition-colors">
                पूरा पढ़ें <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN (Main Content) ── */}
          <div className="w-full lg:w-[70%] flex flex-col gap-8">

            {/* GRID OF CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredReleases.length === 0 && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 py-16 text-center">
                  <p className="text-gray-500 text-lg font-bold">कोई प्रेस विज्ञप्ति नहीं मिली</p>
                  <p className="text-gray-400 text-sm mt-2">कृपया अपने खोज फ़िल्टर बदलें</p>
                </div>
              )}

              {filteredReleases.slice(0, 3).map((pr, i) => (
                <div key={`top-${i}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className=" p-5 h-40 flex items-center relative overflow-hidden">
                    <Image
                      src={pressCardImages[i % pressCardImages.length]}
                      alt={pr.title}
                      fill
                      className="object-cover opacity-80"
                      sizes="(min-width: 768px) 23vw, (min-width: 640px) 45vw, 100vw"
                    />

                    <div className="text-white text-3xl font-black relative z-10 leading-tight">प्रेस<br />विज्ञप्ति</div>
                    <div className="absolute -right-4 -bottom-4 opacity-20">
                      <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21.88a1 1 0 0 1-1.06-.11l-3.66-2.93H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11.84a2 2 0 0 1-2 2h-2.28l-3.66 2.93A1 1 0 0 1 11 21.88z" /></svg>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center text-gray-500 text-xs mb-3">
                      <span>{pr.date}</span>
                      <Bookmark size={14} className="cursor-pointer hover:text-[#0b4d21]" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[15px] mb-5 leading-snug flex-grow">{pr.title}</h3>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex gap-2">
                        <div className="bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:opacity-80"><FaFacebookF size={12} /></div>
                        <div className="bg-sky-500 text-white p-1.5 rounded-full cursor-pointer hover:opacity-80"><FaXTwitter size={12} /></div>
                        <div className="bg-green-500 text-white p-1.5 rounded-full cursor-pointer hover:opacity-80"><FaWhatsapp size={12} /></div>
                      </div>
                      <button className="text-[#0b4d21] text-xs font-bold flex items-center gap-1 hover:underline">
                        पूरा पढ़ें <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* WIDE BANNER MIDDLE - only show when there are results */}
              {filteredReleases.length > 0 && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl overflow-hidden border border-green-200 flex flex-col sm:flex-row items-center p-6 gap-6 relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0 relative z-10">
                    <Image src="/assets/sunil singh img.png" alt="Sunil Singh" fill className="object-cover object-top" />
                  </div>
                  <div className="text-center sm:text-left flex-grow relative z-10">
                    <h3 className="text-2xl font-black text-[#0b4d21]">लोकदल संकल्प यात्रा</h3>
                    <p className="text-gray-700 font-bold">गांव-गांव, हर दिल तक</p>
                  </div>
                  <button className="bg-white text-[#0b4d21] border border-[#0b4d21] px-6 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-green-50 transition-colors relative z-10 whitespace-nowrap">
                    अधिक जानें <ArrowRight size={16} />
                  </button>
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 mix-blend-multiply hidden md:block">
                    <Image src="/assets/hero image.png" alt="Crowd" fill className="object-cover" />
                  </div>
                </div>
              )}

              {/* REMAINING CARDS */}
              {filteredReleases.slice(3).map((pr, i) => (
                <div key={`rest-${i}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="bg-[#0b4d21] p-5 h-40 flex items-center relative overflow-hidden">
                    <Image
                      src={pressCardImages[(i + 3) % pressCardImages.length]}
                      alt={pr.title}
                      fill
                      className="object-cover opacity-80"
                      sizes="(min-width: 768px) 23vw, (min-width: 640px) 45vw, 100vw"
                    />

                    <div className="text-white text-3xl font-black relative z-10 leading-tight">प्रेस<br />विज्ञप्ति</div>
                    <div className="absolute -right-4 -bottom-4 opacity-20">
                      <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21.88a1 1 0 0 1-1.06-.11l-3.66-2.93H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11.84a2 2 0 0 1-2 2h-2.28l-3.66 2.93A1 1 0 0 1 11 21.88z" /></svg>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center text-gray-500 text-xs mb-3">
                      <span>{pr.date}</span>
                      <Bookmark size={14} className="cursor-pointer hover:text-[#0b4d21]" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[15px] mb-5 leading-snug flex-grow">{pr.title}</h3>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex gap-2">
                        <div className="bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:opacity-80"><FaFacebookF size={12} /></div>
                        <div className="bg-sky-500 text-white p-1.5 rounded-full cursor-pointer hover:opacity-80"><FaXTwitter size={12} /></div>
                        <div className="bg-green-500 text-white p-1.5 rounded-full cursor-pointer hover:opacity-80"><FaWhatsapp size={12} /></div>
                      </div>
                      <button className="text-[#0b4d21] text-xs font-bold flex items-center gap-1 hover:underline">
                        पूरा पढ़ें <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT COLUMN (Sidebar) ── */}
          <div className="w-full lg:w-[30%] flex flex-col gap-6">

            {/* Subscribe Box */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-3 text-lg">प्रेस विज्ञप्ति सब्सक्राइब करें</h3>
              <div className="flex gap-2">
                <input type="email" placeholder="अपना ईमेल दर्ज करें" className="border border-gray-200 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0b4d21]" />
                <button className="bg-[#0b4d21] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#073616]">खोजें</button>
              </div>
            </div>

            {/* Press Conference Video */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-4 text-lg">लोकदल प्रेस कॉन्फ्रेंस</h3>
              <div className="relative rounded-lg overflow-hidden aspect-video mb-3 bg-black">
                <video
                  className="h-full w-full object-cover"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/15.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-sm font-bold text-gray-800 leading-snug">
                LIVE: माननीय Sunil Singh जी की प्रेस वार्ता<br />किसान, युवा और देश के भविष्य पर चर्चा
              </p>
            </div>
            {/* 
           

            {/* Social Media Connect */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-4 text-lg">सोशल मीडिया से जुड़ें</h3>
              <div className="flex gap-4 border-b border-gray-100 mb-4">
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 text-sm font-bold border-b-2 border-blue-600 pb-2"><FaFacebookF /> Facebook</a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 text-sm font-bold pb-2 hover:text-sky-500"><FaXTwitter /> Twitter</a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 text-sm font-bold pb-2 hover:text-red-500"><FaYoutube /> Youtube</a>
              </div>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="relative block h-72 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <Image src="/assets/image.png" alt="Lokdal Facebook page" fill className="object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
                <div className="hidden">
                  <div className="flex items-center gap-2">
                    <Image src="/assets/image.png" alt="Lokdal Logo" width={32} height={32} className="border border-gray-100 rounded-sm" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 flex items-center gap-1">Lokdal Official <span className="w-3 h-3 bg-blue-500 text-white rounded-full text-[8px] flex items-center justify-center">✓</span></p>
                      <p className="text-[10px] text-gray-500">12,45,678 followers</p>
                    </div>
                  </div>
                </div>
                <div className="hidden">
                  <span className="flex-1 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex justify-center items-center gap-1 border-r border-gray-100"><FaFacebookF /> Follow Page</span>
                  <span className="flex-1 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex justify-center items-center gap-1"><ArrowRight size={12} /> Share</span>
                </div>
                <div className="hidden">
                  <Image src="/assets/sunil singh img.png" alt="Sunil Singh" fill className="object-cover object-top" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle size={48} className="text-white/80 cursor-pointer hover:text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-[10px] uppercase tracking-wider mb-1">एक विचार, एक परिवार</p>
                    <h4 className="text-2xl font-black leading-none">लोकदल</h4>
                    <ul className="text-xs font-bold mt-2">
                      <li>• सेवा</li>
                      <li>• संपर्क</li>
                      <li>• संघर्ष</li>
                    </ul>
                  </div>
                </div>
              </a>
            </div>

            {/* Banner AD */}
            <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-between p-4 border border-green-200 shadow-sm">
              <div className="w-1/3 h-full relative">
                {/* Left flag part */}
                <div className="absolute inset-0 bg-[#0b4d21] rounded-lg transform -skew-x-12 -left-4 w-[120%] flex items-center justify-center">
                  <span className="text-white font-black text-xl transform skew-x-12">लोकदल</span>
                </div>
              </div>
              <div className="w-2/3 text-right">
                <p className="text-xs font-black text-[#0b4d21]">12 वर्षों का</p>
                <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">लोकदल<br />संकल्प</h3>
                <p className="text-[10px] font-bold text-gray-600">सेवा • संपर्क • संघर्ष</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
