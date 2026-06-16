"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ideology = [
  { icon: "🤚", title: "NO CORRUPTION", desc: "He stood for a society built on truth, transparency and zero tolerance towards corruption." },
  { icon: "👥", title: "BY THE PEOPLE - FOR THE PEOPLE", desc: "He believed in simple living and public service as the true essence of democratic leadership." },
  { icon: "⚙️", title: "DEMOCRACY", desc: "He strengthened democracy by empowering the last person and ensuring their voice is heard." },
  { icon: "🌱", title: "SUPPORT KISAN", desc: "He was a strong voice for farmers and worked tirelessly for their rights, dignity and prosperity." },
];

const leaders = [
  { name: "CHAUDHARY\nCHARAN SINGH", image: "/assets/image_2_14.png" },
  { name: "CHAUDHARY SUNIL\nSINGH", image: "/assets/sunil singh img.png" },
  { name: "CHAUDHARY\nRAJENDRA SINGH", image: "/assets/image_5_17.png" },
];

const updates = [
  { image: "/assets/image_27_43.png", text: "हम इस लड़ाई का हिस्सा बनते चले हैं", badge: "लोकदल अपडेट" },
  { image: "/assets/image_27_45.png", text: "बनाए लोगों में चिलन नहीं वे हिन्दुस्तान हमारा है", badge: "लोकदल अपडेट" },
  { image: "/assets/image_27_46.png", text: "किसान आंदोलन", badge: "लोकदल अपडेट" },
];

export default function ChaudharyCharanSinghPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="w-full">
        <Image
          src="/assets/charan hero.png"
          alt="Chaudhary Charan Singh"
          width={1920}
          height={600}
          className="w-full h-auto"
          priority
        />
      </section>

      {/* ── ABOUT + PHOTO GRID ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-10 sm:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Left: text */}
          <div className="w-full lg:w-[38%]">
            <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-2">About</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
              Chaudhary<br />Charan Singh
            </h2>
            <div className="w-8 h-0.5 bg-[#0b4d21] mb-5" />
            <p className="text-sm text-gray-600 leading-relaxed mb-7">
              Born on 23 December 1902, Chaudhary Charan Singh was a freedom fighter, farmer leader and the 5th Prime
              Minister of India. He dedicated his life to the upliftment of farmers, the poor and the marginalized
              sections of society. His principles of honesty, simplicity and social justice continue to inspire
              millions even today.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#073616] transition-colors"
            >
              Know More About His Life <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right: photo collage */}
          <div className="w-full lg:w-[62%]">
            {/* Mobile / tablet: simple 2-col grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
              {["/assets/image_2_14.png", "/assets/image_5_17.png", "/assets/image_10_24.png", "/assets/image_11_26.png"].map((src, i) => (
                <div key={i} className="relative h-36 sm:h-48 rounded-xl overflow-hidden">
                  <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover grayscale" />
                </div>
              ))}
            </div>

            {/* Desktop: asymmetric collage matching Figma */}
            <div className="hidden lg:flex gap-3 relative">
              {/* Green bg card behind right column */}
              <div className="absolute right-0 top-6 w-[47%] h-[calc(100%-24px)] bg-green-50 rounded-2xl" />

              {/* Left column – 3 images */}
              <div className="w-[53%] flex flex-col gap-3 z-10">
                <div className="relative h-44 rounded-xl overflow-hidden">
                  <Image src="/assets/image_2_14.png" alt="Photo 1" fill className="object-cover grayscale" />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden">
                  <Image src="/assets/image_10_24.png" alt="Photo 3" fill className="object-cover grayscale" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <Image src="/assets/image_20_35.png" alt="Photo 5" fill className="object-cover grayscale" />
                </div>
              </div>

              {/* Right column – 2 images offset down */}
              <div className="w-[47%] flex flex-col gap-3 pt-8 z-10">
                <div className="relative h-44 rounded-xl overflow-hidden">
                  <Image src="/assets/image_5_17.png" alt="Photo 2" fill className="object-cover grayscale" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <Image src="/assets/image_11_26.png" alt="Photo 4" fill className="object-cover grayscale" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── HIS IDEOLOGY + CTA + LEADERS + UPDATES ── */}
      <section className="w-full bg-white py-10 sm:py-14">
        <div className="w-full px-4 sm:px-8 lg:px-16 space-y-10 sm:space-y-14">

          {/* HIS IDEOLOGY */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-6">His Ideology</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {ideology.map((item) => (
                <div key={item.title} className="border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-50 flex items-center justify-center text-xl sm:text-2xl mb-3 border border-green-100">
                    {item.icon}
                  </div>
                  <h3 className="text-[11px] font-black text-[#0b4d21] tracking-wide mb-2 leading-tight">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BE PART OF THE CHANGE */}
          <div className="bg-green-50 border border-green-100 rounded-2xl px-5 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border border-green-200 flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl shadow-sm">
                👥
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900 mb-1">
                  Be <span className="text-[#0b4d21]">Part of the</span> Change
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Carry forward the ideals of Chaudhary Charan Singh and build a stronger, just and equal India.
                </p>
              </div>
            </div>
            <Link
              href="#"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-[#073616] transition-colors whitespace-nowrap"
            >
              Join Lokdal <ArrowRight size={15} />
            </Link>
          </div>

          {/* PARTY LEADERS */}
          <div>
            <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-1">Party</p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2">Leaders</h2>
            <div className="w-10 h-1 bg-[#0b4d21] mb-6" />

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Leader circles – scrollable on mobile */}
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 lg:pb-0 lg:flex-wrap lg:overflow-visible">
                {leaders.map((l) => (
                  <div key={l.name} className="flex flex-col items-center gap-2 w-20 sm:w-28 flex-shrink-0">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-200 relative">
                      <Image src={l.image} alt={l.name} fill className="object-cover object-top grayscale" />
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-black text-gray-700 text-center leading-tight whitespace-pre-line">
                      {l.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Large photo */}
              <div className="w-full sm:w-64 lg:w-72 h-44 sm:h-52 rounded-xl overflow-hidden relative flex-shrink-0">
                <Image src="/assets/image_2_14.png" alt="Chaudhary Charan Singh" fill className="object-cover grayscale" />
              </div>

              {/* A Life of Service */}
              <div className="flex-1 w-full bg-green-50 border border-green-100 rounded-xl p-5 sm:p-6">
                <p className="text-[10px] font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-2">A Life of Service</p>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3">Chaudhary Charan Singh</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  From fighting for India's freedom to becoming the Prime Minister, Chaudhary Charan Singh's life was
                  a testament to his unwavering dedication to the farmers, the poor and the nation.
                </p>
              </div>
            </div>
          </div>

          {/* DAILY UPDATES */}
          <div>
            <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-1">Daily</p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-6">Updates</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {updates.map((u) => (
                <div key={u.text} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer">
                  <div className="relative h-40 sm:h-44 overflow-hidden">
                    <Image src={u.image} alt={u.text} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-white/90 text-[#0b4d21] text-[10px] font-black px-2 py-0.5 rounded">
                      {u.badge}
                    </span>
                    <p className="absolute bottom-3 left-3 right-3 text-white font-black text-sm leading-tight">{u.text}</p>
                  </div>
                  <div className="bg-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image src="/assets/sunil singh img.png" alt="सुनील सिंह" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900">सुनील सिंह</p>
                        <p className="text-[10px] text-gray-500">राष्ट्रीय अध्यक्ष, लोकदल</p>
                      </div>
                    </div>
                    <Link href="#" className="w-8 h-8 rounded-full border-2 border-[#0b4d21] flex items-center justify-center text-[#0b4d21] hover:bg-[#0b4d21] hover:text-white transition-all flex-shrink-0">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
