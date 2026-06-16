"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, Clock, MapPin, Download } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const events = [
  {
    image: "/assets/image_27_43.png",
    day: "25", month: "MAY", year: "2025",
    title: "Kisan Samman Rally",
    desc: "A massive gathering to honor farmers and discuss key issues related to their rights, welfare and prosperity.",
    time: "10:00 AM Onwards",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    image: "/assets/image_27_45.png",
    day: "02", month: "JUN", year: "2025",
    title: "Youth Empowerment Summit",
    desc: "Inspiring the youth to become leaders of tomorrow and contribute to the nation's progress.",
    time: "11:00 AM Onwards",
    location: "Kanpur, Uttar Pradesh",
  },
  {
    image: "/assets/image_27_46.png",
    day: "10", month: "JUN", year: "2025",
    title: "Lokdal Workers' Convention",
    desc: "A conference of dedicated workers and leaders to strengthen our organization at the grassroots level.",
    time: "12:00 PM Onwards",
    location: "Meerut, Uttar Pradesh",
  },
  {
    image: "/assets/image_27_48.png",
    day: "18", month: "JUN", year: "2025",
    title: "Gram Vikas Abhiyan",
    desc: "A special initiative to visit villages, meet people and understand their challenges for a developed rural India.",
    time: "09:00 AM Onwards",
    location: "Varanasi, Uttar Pradesh",
  },
  {
    image: "/assets/image_30_53.png",
    day: "25", month: "MAY", year: "2025",
    title: "Kisan Samman Rally",
    desc: "A massive gathering to honor farmers and discuss key issues related to their rights, welfare and prosperity.",
    time: "10:00 AM Onwards",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    image: "/assets/image_20_35.png",
    day: "02", month: "JUN", year: "2025",
    title: "Youth Empowerment Summit",
    desc: "Inspiring the youth to become leaders of tomorrow and contribute to the nation's progress.",
    time: "11:00 AM Onwards",
    location: "Kanpur, Uttar Pradesh",
  },
  {
    image: "/assets/image_2_3.png",
    day: "10", month: "JUN", year: "2025",
    title: "Lokdal Workers' Convention",
    desc: "A conference of dedicated workers and leaders to strengthen our organization at the grassroots level.",
    time: "12:00 PM Onwards",
    location: "Meerut, Uttar Pradesh",
  },
  {
    image: "/assets/image_49_3.png",
    day: "18", month: "JUN", year: "2025",
    title: "Gram Vikas Abhiyan",
    desc: "A special initiative to visit villages, meet people and understand their challenges for a developed rural India.",
    time: "09:00 AM Onwards",
    location: "Varanasi, Uttar Pradesh",
  },
];

const states = ["Uttar Pradesh", "Haryana", "Rajasthan", "Bihar", "Madhya Pradesh", "Kerala"];

export default function UpcomingEventsPage() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchState = state === "" || e.location.includes(state);
    return matchSearch && matchState;
  });

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12">

        {/* ── TOP BAR ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex-shrink-0">Upcoming Events</h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0b4d21]"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* State select */}
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#0b4d21] sm:w-44"
            >
              <option value="">Select by State</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* From Date */}
            <div className="relative">
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 focus:outline-none focus:border-[#0b4d21] w-full sm:w-36"
              />
            </div>

            {/* To Date */}
            <div className="relative">
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 focus:outline-none focus:border-[#0b4d21] w-full sm:w-36"
              />
            </div>

            {/* Search button */}
            <button className="bg-[#0b4d21] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#073616] transition-colors flex-shrink-0">
              Search
            </button>
          </div>
        </div>

        {/* View Calendar */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar size={15} className="text-[#0b4d21]" /> View Calendar
          </button>
        </div>

        {/* ── EVENTS GRID ── */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-sm">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((event, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white group">

                {/* Image with date badge + logo badge */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Top-left: "लोकदल द्वारा आयोजित" badge */}
                  <div className="absolute top-2 left-2 bg-white/90 text-[#0b4d21] text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                    <Image src="/assets/logo.png" alt="logo" width={12} height={12} className="object-contain" />
                    लोकदल द्वारा आयोजित
                  </div>

                  {/* Bottom-left: date badge */}
                  <div className="absolute bottom-3 left-3 bg-[#0b4d21] text-white rounded-lg px-2.5 py-1.5 text-center shadow-md">
                    <div className="text-base font-black leading-none">{event.day}</div>
                    <div className="text-[10px] font-bold leading-tight">{event.month}</div>
                    <div className="text-[9px] leading-tight opacity-80">{event.year}</div>
                  </div>

                  {/* Bottom-right: lokdal logo circle */}
                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Image src="/assets/logo.png" alt="Lokdal" width={22} height={22} className="object-contain" />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{event.desc}</p>

                  {/* Time & Location */}
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Clock size={12} className="text-[#0b4d21] flex-shrink-0" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin size={12} className="text-[#0b4d21] flex-shrink-0" fill="#0b4d21" /> {event.location}
                    </span>
                  </div>

                  {/* Social share + download */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Link href="#" className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                      <FaFacebookF size={11} />
                    </Link>
                    <Link href="#" className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white transition-all">
                      <FaXTwitter size={11} />
                    </Link>
                    <Link href="#" className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all">
                      <FaWhatsapp size={11} />
                    </Link>
                    <button className="ml-auto w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all">
                      <Download size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
