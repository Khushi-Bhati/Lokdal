"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, MapPin, Play, ArrowRight, Video } from "lucide-react";

const recentBroadcasts = [
  {
    image: "/assets/image_27_43.png",
    title: "LIVE: Kisan Samman Rally",
    date: "25 May 2025",
    location: "Lucknow, UP",
  },
  {
    image: "/assets/image_27_45.png",
    title: "LIVE: Press Conference",
    date: "22 May 2025",
    location: "New Delhi",
  },
  {
    image: "/assets/image_27_46.png",
    title: "LIVE: Kisan Mahapanchayat",
    date: "20 May 2025",
    location: "Meerut, UP",
  },
  {
    image: "/assets/image_27_48.png",
    title: "LIVE: Constitution Meeting",
    date: "18 May 2025",
    location: "Kanpur, UP",
  },
  {
    image: "/assets/image_30_53.png",
    title: "LIVE: Youth Convention",
    date: "15 May 2025",
    location: "Agra, UP",
  },
  {
    image: "/assets/image_20_35.png",
    title: "LIVE: Public Address",
    date: "12 May 2025",
    location: "Varanasi, UP",
  },
  {
    image: "/assets/image_2_3.png",
    title: "LIVE: Gram Sabha",
    date: "10 May 2025",
    location: "Mathura, UP",
  },
  {
    image: "/assets/image_49_3.png",
    title: "LIVE: Farmers' Summit",
    date: "08 May 2025",
    location: "Prayagraj, UP",
  },
];

const states = ["Uttar Pradesh", "Haryana", "Rajasthan", "Bihar", "Madhya Pradesh"];
const categories = ["Speech", "Press Conference", "Public Meeting", "Rally", "Convention"];

export default function LokdalLivePage() {
  const [search, setSearch] = useState("");

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="w-full  overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[300px] sm:min-h-[420px]">

          {/* Left: green text panel - 35% */}
          <div className="relative w-full lg:w-[35%] px-10 sm:px-16 lg:px-20 py-10 sm:py-14 flex flex-col justify-between overflow-hidden">
            {/* Green left bg image */}
            <Image
              src="/assets/green left.png"
              alt=""
              fill
              className="object-cover object-left"
            />
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b4d21] leading-tight mb-2">
                LOKDAL LIVE
              </h1>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-snug mb-3">
                Live Speeches, Press Conferences<br />& Public Meetings
              </h2>
              <div className="w-8 h-0.5 bg-[#0b4d21] mb-4" />
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
                Watch live addresses, press conferences and public meetings from Lokdal leaders across the country.
              </p>
            </div>

            {/* Bottom event info */}
            <div className="relative z-10 mt-8 sm:mt-10">
              <p className="text-gray-900 font-black text-sm sm:text-base mb-2">LIVE: Kisan Sammelan in Lucknow</p>
              <div className="flex flex-wrap items-center gap-3 text-gray-600 text-xs">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0b4d21]" /> 25 May 2025</span>
                <span className="w-px h-3 bg-gray-400" />
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#0b4d21]" /> Lucknow, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Right: photo - 65% */}
          <div className="relative w-full lg:w-[65%] h-56 sm:h-80 lg:h-auto min-h-[260px]">
            <Image
              src="/assets/image_27_43.png"
              alt="Lokdal Live"
              fill
              className="object-cover object-top"
              priority
            />


            {/* LIVE badge — top left */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
              </span>
            </div>

            {/* Play button — center */}
            <button className="absolute inset-0 flex items-center justify-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/30 border-2 border-white flex items-center justify-center group-hover:bg-black/50 transition-colors backdrop-blur-sm shadow-lg">
                <Play size={24} className="text-white fill-white ml-1" />
              </div>
            </button>
          </div>

        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0b4d21]"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-[#0b4d21]">
            <option value="">Select State</option>
            {states.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-[#0b4d21]">
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="date" placeholder="From Date" className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-[#0b4d21]" />
          <input type="date" placeholder="To Date" className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-[#0b4d21]" />
          <button className="bg-[#0b4d21] text-white font-bold text-sm px-8 py-2.5 rounded-lg hover:bg-[#073616] transition-colors flex-shrink-0">
            Search
          </button>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-10">

        {/* ── FEATURED BROADCAST ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <div className="relative w-full lg:w-[48%] h-52 sm:h-64 lg:h-auto flex-shrink-0">
            <Image src="/assets/image_27_43.png" alt="Featured Broadcast" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
            </span>
            <button className="absolute inset-0 flex items-center justify-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/30 border-2 border-white flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <Play size={22} className="text-white fill-white ml-1" />
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">
            <p className="text-[10px] font-black text-[#0b4d21] tracking-[0.15em] uppercase mb-3">Featured Broadcast</p>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight mb-3">
              LIVE: Lokdal National Executive Meeting Address by Shri Sunil Singh
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Watch Chaudhary Sunil Singh address the national executive meeting and outline Lokdal's vision for a stronger, farmer-first India.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0b4d21]" /> 24 May 2025</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#0b4d21]" fill="#0b4d21" /> New Delhi</span>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#073616] transition-colors w-fit">
              <Play size={13} fill="white" /> Watch Now <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── RECENT BROADCASTS ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <Video size={18} className="text-[#0b4d21]" /> Recent Broadcasts
            </h2>
            <Link href="#" className="text-sm font-bold text-[#0b4d21] flex items-center gap-1 hover:underline">
              View All Videos <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { image: "/assets/image_27_43.png", title: "LIVE: Yuva Hunkar Rally in Kanpur", date: "22 May 2025", location: "Kanpur, Uttar Pradesh" },
              { image: "/assets/image_27_45.png", title: "LIVE: Press Conference in Patna", date: "21 May 2025", location: "Patna, Bihar" },
              { image: "/assets/image_27_46.png", title: "LIVE: Kisan Mahapanchayat in Meerut", date: "20 May 2025", location: "Meerut, Uttar Pradesh" },
              { image: "/assets/image_27_48.png", title: "LIVE: Organization Meeting in Bhopal", date: "19 May 2025", location: "Bhopal, Madhya Pradesh" },
            ]
              .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
              .map((video, idx) => (
              <div key={idx} className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative h-36 sm:h-40 overflow-hidden">
                  <Image src={video.image} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> LIVE
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-black/40 border border-white flex items-center justify-center">
                      <Play size={14} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-black text-gray-900 group-hover:text-[#0b4d21] transition-colors leading-tight mb-2 line-clamp-2">{video.title}</h4>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                    <Calendar size={10} className="text-[#0b4d21]" /> {video.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <MapPin size={10} className="text-[#0b4d21]" fill="#0b4d21" /> {video.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── UPCOMING LIVE SCHEDULE ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-[#0b4d21]" /> Upcoming Live Schedule
            </h2>
            <Link href="#" className="text-sm font-bold text-[#0b4d21] flex items-center gap-1 hover:underline">
              View Full Schedule <ArrowRight size={14} />
            </Link>
          </div>

          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-100 px-4 py-3">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Date</span>
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Event</span>
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Location</span>
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Status</span>
            </div>
            {[
              { date: "25 May 2025", event: "Kisan Sammelan", location: "Lucknow, Uttar Pradesh" },
              { date: "28 May 2025", event: "Press Conference", location: "New Delhi" },
              { date: "30 May 2025", event: "Yuva Charchaa", location: "Kanpur, Uttar Pradesh" },
              { date: "02 June 2025", event: "Lokdal Vichar Manch", location: "Patna, Bihar" },
            ].map((row, idx, arr) => (
              <div key={idx} className={`grid grid-cols-4 px-4 py-3.5 items-center ${idx !== arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm text-gray-600">{row.date}</span>
                <span className="text-sm text-gray-800 font-medium">{row.event}</span>
                <span className="text-sm text-gray-600">{row.location}</span>
                <span className="flex items-center gap-1.5 text-sm text-[#0b4d21] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#0b4d21]" /> Upcoming
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── LOKDAL MEDIA GALLERY ── */}
        <div className="mb-10">
          <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 mb-5">
            <Video size={18} className="text-[#0b4d21]" /> Lokdal Media Gallery
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {[
              { label: "Photos", icon: "🖼️", active: true },
              { label: "Videos", icon: "📹", active: false },
              { label: "Speeches", icon: "🎙️", active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  tab.active
                    ? "bg-[#0b4d21] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xs">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              "/assets/image_27_43.png",
              "/assets/image_27_45.png",
              "/assets/image_27_46.png",
              "/assets/image_27_48.png",
              "/assets/image_30_53.png",
            ].map((src, idx) => (
              <div key={idx} className="relative h-28 sm:h-32 lg:h-24 xl:h-28 rounded-xl overflow-hidden group cursor-pointer">
                <Image src={src} alt={`Gallery ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/40 border border-white/80 flex items-center justify-center">
                    <Play size={13} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
