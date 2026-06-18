"use client";

import { ArrowRight, CalendarDays, Star, Users, Mail } from "lucide-react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Leaders() {
  const [activeInspiration, setActiveInspiration] = useState<"charan" | "sunil">("charan");

  const inspirationImages = {
    charan: [
      { src: "/assets/charan profile.jpg", alt: "Choudhary Charan Singh" },
      { src: "/assets/charan singh hero.png", alt: "Choudhary Charan Singh" },
    ],
    sunil: [
      { src: "/assets/sunil profile.jpg", alt: "Choudhary Sunil Singh" },
      { src: "/assets/sunil singh img.png", alt: "Choudhary Sunil Singh" },
    ],
  };

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ====== LEFT COLUMN (65%) ====== */}
          <div className="w-full lg:w-[63%]">

            {/* --- Recent Activities --- */}
            <div className="mb-14">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-0">
                  <span className="w-1 h-7 bg-[#0b4d21] rounded-full mr-3 inline-block"></span>
                  Recent Activities
                </h2>
                <Link href="/upcoming-events" className="border-2 border-[#0b4d21] text-[#0b4d21] font-bold text-sm px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0b4d21] hover:text-white transition-all">
                  सभी देखें <ArrowRight size={16} />
                </Link>
              </div>

              {/* Content Grid */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Large Featured Card */}
                <div className="w-full md:w-[55%] group cursor-pointer">
                  <div className="w-full h-[280px] bg-gray-200 rounded-2xl overflow-hidden relative mb-4">
                    <Image src="/assets/dharna3.jpeg" alt="Dharna Pradershan" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0b4d21] transition-colors">Dharna Pradershan</h3>
                  <p className="text-sm text-gray-500 mb-1">By Chaudhary Sunil Singh</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <CalendarDays size={13} /> 02 जुलाई 2024 | 02:45 PM
                    </p>
                    <div className="w-8 h-8 rounded-full border-2 border-[#0b4d21] flex items-center justify-center group-hover:bg-[#0b4d21] transition-colors">
                      <ArrowRight size={14} className="text-[#0b4d21] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Two Smaller Stacked Cards */}
                <div className="w-full md:w-[45%] flex flex-col gap-5">
                  {/* Card 1 */}
                  <div className="flex gap-4 group cursor-pointer">
                    <div className="w-[140px] h-[100px] bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <Image src="/assets/dharna1.jpeg" alt="Dharna Pradershan" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-1">Dharna Pradershan</h4>
                      <p className="text-xs text-gray-500 mb-1">By Chaudhary Sunil Singh</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <CalendarDays size={11} /> 02 जुलाई 2024
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex gap-4 group cursor-pointer">
                    <div className="w-[140px] h-[100px] bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <Image src="/assets/join.jpg" alt="Cash Prize Distribution" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-1">Cash Prize Distribution</h4>
                      <p className="text-xs text-gray-500 mb-1">Cricket Match</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <CalendarDays size={11} /> 30 जून 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Our Inspiration --- */}
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Star size={22} className="text-[#0b4d21]" fill="#0b4d21" /> Our Inspiration
                </h2>
                {/* Tab Pills */}
                <div className="flex gap-6 text-sm font-bold text-gray-400">
                  <button
                    type="button"
                    onClick={() => setActiveInspiration("charan")}
                    className={`pb-1 transition-colors ${
                      activeInspiration === "charan"
                        ? "text-gray-900 border-b-[3px] border-[#0b4d21]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Choudhary Charan Singh
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInspiration("sunil")}
                    className={`pb-1 transition-colors ${
                      activeInspiration === "sunil"
                        ? "text-gray-900 border-b-[3px] border-[#0b4d21]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Choudhary Sunil Singh
                  </button>
                </div>
              </div>

              {/* Historical Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {inspirationImages[activeInspiration].map((image) => (
                  <div key={image.src} className="w-full h-[360px] bg-gray-200 rounded-2xl overflow-hidden relative group cursor-pointer">
                    <Image src={image.src} alt={image.alt} fill className="object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ====== RIGHT SIDEBAR (35%) ====== */}
          <div className="w-full lg:w-[37%] flex flex-col gap-6">

            {/* --- About Lokdal Card --- */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#0b4d21] flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-white" />
                </div>
                About Lokdal
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Presently senior social activist and politician Mr. Sunil Singh Ji
                is its national president, who is born in a patriotic elite family
                in Aligarh district of Uttar Pradesh. Mr. Sunil Singh has
                graduated in Engineering and Masters in Management. Mr.
                Sunil Singh has also been a member of Uttar Pradesh
                Legislative Council.
              </p>
              <Link href="/about/chaudhary-sunil-singh" className="inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#073616] transition-colors">
                और जानें <ArrowRight size={16} />
              </Link>
            </div>

            {/* --- Top Profiles Card --- */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#0b4d21] flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-white" />
                </div>
                Top Profiles
              </h3>

              {[
                { name: "Choudhary Charan Singh", href: "/about/chaudhary-charan-singh", image: "/assets/charan profile.jpg" },
                { name: "Choudhary Sunil Singh", href: "/about/chaudhary-sunil-singh", image: "/assets/sunil profile.jpg" },
                { name: "Choudhary Rajinder Singh", href: "/about/chaudhary-charan-singh", image: "/assets/Rajinder Singh.png" },
              ].map((p, idx) => (
                <Link href={p.href} key={idx} className="flex items-center justify-between py-3 group cursor-pointer border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative">
                      <Image src={p.image} alt={p.name} fill className="object-cover object-top" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[#0b4d21] transition-colors">{p.name}</span>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[#0b4d21] transition-colors" />
                </Link>
              ))}

              <div className="text-right mt-3">
                <Link href="/about/chaudhary-charan-singh" className="text-[#0b4d21] font-bold text-sm inline-flex items-center gap-1 hover:underline">
                  सभी प्रोफाइल देखें <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* --- Stay Connected Card --- */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#0b4d21] flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-white" />
                </div>
                Stay connected
              </h3>
              <div className="flex gap-4">
                <Link href="https://www.facebook.com/Lokdalindia/" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0b4d21] hover:text-white text-gray-600 transition-all">
                  <FaFacebookF size={16} />
                </Link>
                <Link href="https://x.com/lokdalindia" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0b4d21] hover:text-white text-gray-600 transition-all">
                  <FaXTwitter size={16} />
                </Link>
                <Link href="https://www.youtube.com/@lokdalindia" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0b4d21] hover:text-white text-gray-600 transition-all">
                  <FaYoutube size={16} />
                </Link>
                <Link href="https://www.instagram.com/lokdalindia" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0b4d21] hover:text-white text-gray-600 transition-all">
                  <FaInstagram size={16} />
                </Link>
                <Link href="mailto:lokdalparty@gmail.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0b4d21] hover:text-white text-gray-600 transition-all">
                  <Mail size={16} />
                </Link>
              </div>
            </div>

            {/* --- Today's Pick Card --- */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#0b4d21] flex items-center justify-center flex-shrink-0">
                  <Star size={16} className="text-white" fill="white" />
                </div>
                Today&apos;s Pick
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden relative">
                  <Image src="/assets/image_13_30.png" alt="Today's Pick" fill className="object-cover" />
                </div>
                <p className="text-sm text-gray-700 font-medium leading-snug">&ldquo;किसान और मजदूर का राज,&rdquo;</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
