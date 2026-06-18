"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MapPin, Clock, CalendarDays, Globe2 } from "lucide-react";
import { Users, Leaf, Star, Megaphone } from "lucide-react";

const events = [
  {
    day: "15", month: "JUN",
    image: "/assets/dharna1.jpeg",
    icon: Users,
    title: "National Executive Meeting",
    place: "New Delhi", time: "11:00 AM",
    detail: "Strategic discussion on strengthening organization and future roadmap.",
  },
  {
    day: "20", month: "JUN",
    image: "/assets/dharna3.jpeg",
    icon: Leaf,
    title: "Farmers' Convention",
    place: "Lucknow, UP", time: "02:00 PM",
    detail: "Empowering farmers, discussing issues and sustainable solutions.",
  },
  {
    day: "28", month: "JUN",
    image: "/assets/join.jpg",
    icon: Star,
    title: "Youth Leadership Summit",
    place: "Bhopal, MP", time: "10:30 AM",
    detail: "Inspiring young minds, building leadership for tomorrow.",
  },
  {
    day: "05", month: "JUL",
    image: "/assets/samman-2.jpg",
    icon: Megaphone,
    title: "Public Outreach Program",
    place: "Patna, Bihar", time: "03:00 PM",
    detail: "Connecting with communities, listening to people, working for change.",
  },
  {
    day: "12", month: "JUL",
    image: "/assets/kisan.jpg",
    icon: Users,
    title: "National Council Meeting",
    place: "New Delhi", time: "11:00 AM",
    detail: "Reviewing progress and planning next steps for nation-building.",
  },
];

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

export default function UpcomingEventsSection() {
  return (
    <section className="w-full bg-white">

      {/* ══════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════ */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-14 sm:py-16">

        {/* Top header row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
          {/* Left: title + subtitle */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Upcoming Events</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Join us in our journey towards a stronger,<br />
              self-reliant and progressive India.
            </p>
          </div>

          {/* Right: tabs + stay updated */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            {/* Tab buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-[#0b4d21] text-white text-sm font-bold px-5 py-2.5 rounded-lg">
                <Globe2 size={16} /> National Level
              </button>
              <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin size={16} /> In States
              </button>
            </div>
            {/* Stay Updated card */}
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
              <div className="w-11 h-11 rounded-full bg-[#0b4d21] flex items-center justify-center flex-shrink-0">
                <CalendarDays size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Stay Updated</p>
                <p className="text-xs text-gray-500 leading-relaxed">Don&apos;t miss important events.<br />Be a part of the movement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events cards row with arrows */}
        <div className="relative">
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} className="text-gray-700" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {events.map(({ day, month, image, icon: Icon, title, place, time, detail }) => (
              <article key={title} className="group rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                {/* Image with date badge + icon */}
                <div className="relative h-36 overflow-hidden">
                  <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Date badge */}
                  <div className="absolute top-0 left-3 bg-[#0b4d21] text-white text-center px-2.5 py-1.5 rounded-b-md shadow-md">
                    <div className="text-lg font-black leading-none">{day}</div>
                    <div className="text-[10px] font-bold leading-tight">{month}</div>
                  </div>
                  {/* Icon bubble */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-green-50 border-2 border-white flex items-center justify-center shadow-md">
                    <Icon size={16} className="text-[#0b4d21]" strokeWidth={2.4} />
                  </div>
                </div>

                {/* Card body */}
                <div className="pt-6 px-4 pb-4 border-b-[3px] border-[#0b4d21]">
                  <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-3 leading-tight min-h-[36px]">
                    {title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-[#0b4d21]" fill="#0b4d21" />{place}</span>
                    <span className="flex items-center gap-1"><Clock size={11} className="text-[#0b4d21]" />{time}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[48px]">{detail}</p>
                  <Link href="/upcoming-events" className="inline-flex items-center gap-2 text-xs font-black text-[#0b4d21]">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ArrowRight size={16} className="text-gray-700" />
          </button>
        </div>

        {/* Be a Part of Change banner */}
        <div className="mt-12 rounded-xl bg-[#0b4d21] overflow-hidden">
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-10 py-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(255,255,255,0.12),transparent_30%)]" />
            <div className="relative flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CalendarDays size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-1">Be a Part of Change</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Your participation can build a stronger and better India for generations to come.
                </p>
              </div>
            </div>
            <div className="relative hidden sm:block h-12 w-px bg-white/30" />
            <Link
              href="/upcoming-events"
              className="relative flex-shrink-0 inline-flex items-center gap-3 bg-white text-[#0b4d21] font-black text-sm px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              View All Events <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HIS IDEOLOGY + CTA + LEADERS + UPDATES
      ══════════════════════════════════════ */}
      <div className="w-full px-4 sm:px-8 lg:px-16 pb-14 sm:pb-16 space-y-14">

       

        {/* BE PART OF THE CHANGE */}
        <div className="bg-green-50 border border-green-100 rounded-2xl px-6 sm:px-10 py-7 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white border border-green-200 flex items-center justify-center flex-shrink-0 text-2xl shadow-sm">
              👥
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1">
                Be <span className="text-[#0b4d21]">Part of the</span> Change
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Carry forward the ideals of Chaudhary Charan Singh<br className="hidden sm:block" />
                and build a stronger, just and equal India.
              </p>
            </div>
          </div>
          <Link href="/join" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-7 py-3 rounded-lg hover:bg-[#073616] transition-colors whitespace-nowrap">
            Join Lokdal <ArrowRight size={16} />
          </Link>
        </div>


        

      </div>
    </section>
  );
}
