"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type UpdateCategory = "all" | "kisan" | "events" | "samman";

const UPDATE_TABS: { id: UpdateCategory; label: string }[] = [
  { id: "all", label: "All Updates" },
  { id: "kisan", label: "Kisan" },
  { id: "events", label: "Events" },
  { id: "samman", label: "Samman" },
];

const leaders = [
  { name: "CHAUDHARY\nCHARAN SINGH", image: "/assets/charan profile.jpg" },
  { name: "CHAUDHARY SUNIL\nSINGH", image: "/assets/sunil profile.jpg" },
  { name: "CHAUDHARY\nRAJENDRA SINGH", image: "/assets/Rajinder Singh.png" },
];

const updates = [
  { image: "/assets/dharna5.jpeg", text: "हम इस लड़ाई का हिस्सा बनते चले हैं", badge: "लोकदल अपडेट" },
  { image: "/assets/7.jpg", text: "बनाए लोगों में चिलन नहीं वे हिन्दुस्तान हमारा है", badge: "लोकदल अपडेट" },
  { image: "/assets/dharna1.jpeg", text: "किसान आंदोलन", badge: "लोकदल अपडेट" },
  { image: "/assets/gallery-9.jpg", text: "किसान दिवस", badge: "लोकदल अपडेट" },
  { image: "/assets/kisan.jpg", text: "किसानों के हित में फैसले", badge: "लोकदल अपडेट" },
  { image: "/assets/dharna5.jpeg", text: "लोकदल का महासम्मेलन", badge: "लोकदल अपडेट" },
];

export default function ChaudharySunilSinghPage() {
  const [activeCategory, setActiveCategory] = useState<UpdateCategory>("all");

  const filteredUpdates = useMemo(() => {
    if (activeCategory === "all") return updates;
    return updates.filter((u) => {
      if (activeCategory === "kisan") return u.text.includes("किसान");
      if (activeCategory === "events") return u.text.includes("लड़ाई") || u.text.includes("हिन्दुस्तान");
      if (activeCategory === "samman") return u.text.includes("महासम्म");
      return true;
    });
  }, [activeCategory]);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/hero image.png"
          alt="Chaudhary Sunil Singh"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-3 drop-shadow-md">
            CHAUDHARY SUNIL SINGH
          </h1>
          <p className="text-sm sm:text-lg font-bold text-white tracking-widest uppercase mb-8 drop-shadow-md">
            President of Lokdal
          </p>
          <div className="animate-bounce">
            <ChevronDown size={32} className="text-white" strokeWidth={3} />
          </div>
        </div>
      </section>

      {/* ── ABOUT + PHOTO GRID ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

          {/* Left: text */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/assets/logo.png" alt="Lokdal Logo" width={60} height={40} className="h-10 w-auto object-contain" />
              <span className="text-2xl sm:text-3xl font-black text-[#0b4d21]">लोकदल</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 uppercase">
              ABOUT CHAUDHARY SUNIL SINGH
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Sunil Singh is an Indian politician and the national president of the Lok Dal, a political party in India. He is known for his commitment to the welfare of farmers and rural communities.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              In 2018 he was considered to join the Samajwadi Party. He has been a Member of Legislative Council (MLC) in Uttar Pradesh. His leadership continues the legacy of Chaudhary Charan Singh, focusing on empowering the agricultural sector and championing the rights of the common people.
            </p>
          </div>

          {/* Right: photo collage */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-80 sm:h-96">
              {/* Background image / offset image */}
              <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-2xl overflow-hidden shadow-lg z-0 grayscale">
                <Image src="/assets/sunil profile.jpg" alt="Historical Photo" fill className="object-cover" />
              </div>
              {/* Foreground main image */}
              <div className="absolute bottom-0 left-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10 bg-white flex items-center justify-center">
                {/* Flag background effect with Sunil Singh portrait */}
                <div className="absolute inset-0 opacity-50">
                  <div className="w-full h-1/3 bg-orange-200" />
                  <div className="w-full h-1/3 bg-white flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-800 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-blue-800"></div>
                    </div>
                  </div>
                  <div className="w-full h-1/3 bg-green-200" />
                </div>
                <Image src="/assets/sunil singh img.png" alt="Chaudhary Sunil Singh" fill className="object-cover object-top z-20" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── PARTY LEADERS ── */}
      <section className="w-full bg-white pb-16 sm:pb-20">
        <div className="w-full px-4 flex flex-col items-center">
          <p className="text-xs font-black text-[#0b4d21] tracking-widest uppercase mb-1">LOKDAL</p>
          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-12 uppercase">PARTY LEADERS</h2>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {leaders.map((l) => {
              const href = l.name.includes("CHARAN") && !l.name.includes("SUNIL")
                ? "/about/chaudhary-charan-singh"
                : l.name.includes("SUNIL")
                  ? "/about/chaudhary-sunil-singh"
                  : "/about/chaudhary-charan-singh";
              return (
              <Link key={l.name} href={href} className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gray-100 relative shadow-sm hover:shadow-md hover:border-[#0b4d21] transition-all cursor-pointer">
                  <Image src={l.image} alt={l.name} fill className="object-cover object-top" />
                </div>
                <p className="text-xs sm:text-sm font-black text-blue-900 text-center leading-tight whitespace-pre-line group-hover:text-[#0b4d21] transition-colors">
                  {l.name}
                </p>
              </Link>
            );})}
          </div>
        </div>
      </section>

      {/* ── DONATION BANNER ── */}
      <section className="w-full bg-[#0b4d21] py-16 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            Let's Support Lokdal for making bright future.
          </h2>
          <Link
            href="/donate"
            className="inline-block bg-white text-[#0b4d21] font-black text-sm px-8 py-3 rounded hover:bg-gray-100 transition-colors uppercase tracking-wide"
          >
            DONATE NOW
          </Link>
        </div>
      </section>

      {/* ── DAILY UPDATES ── */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="w-full px-4 sm:px-8 lg:px-16 flex flex-col items-center">
          <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-1">DAILY</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-900 mb-6 uppercase">UPDATES</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {UPDATE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-colors ${
                  activeCategory === tab.id
                    ? "bg-[#0b4d21] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredUpdates.length === 0 ? (
            <p className="text-gray-400 text-sm py-8">No updates in this category.</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 w-full">
            {filteredUpdates.map((u, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md group cursor-pointer border border-gray-100 flex flex-col">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                  <Image src={u.image} alt={u.text} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
