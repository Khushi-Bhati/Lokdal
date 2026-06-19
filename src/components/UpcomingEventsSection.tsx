"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, CalendarDays, Globe2 } from "lucide-react";
import { Users, Leaf, Star, Megaphone } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type EventLevel = "national" | "state";

const events = [
  {
    day: "15", month: "JUN",
    image: "/assets/dharna1.jpeg",
    icon: Users,
    title: "National Executive Meeting",
    place: "New Delhi", time: "11:00 AM",
    detail: "Strategic discussion on strengthening organization and future roadmap.",
    level: "national" as EventLevel,
  },
  {
    day: "20", month: "JUN",
    image: "/assets/dharna3.jpeg",
    icon: Leaf,
    title: "Farmers' Convention",
    place: "Lucknow, UP", time: "02:00 PM",
    detail: "Empowering farmers, discussing issues and sustainable solutions.",
    level: "state" as EventLevel,
  },
  {
    day: "28", month: "JUN",
    image: "/assets/join.jpg",
    icon: Star,
    title: "Youth Leadership Summit",
    place: "Bhopal, MP", time: "10:30 AM",
    detail: "Inspiring young minds, building leadership for tomorrow.",
    level: "state" as EventLevel,
  },
  {
    day: "05", month: "JUL",
    image: "/assets/samman-2.jpg",
    icon: Megaphone,
    title: "Public Outreach Program",
    place: "Patna, Bihar", time: "03:00 PM",
    detail: "Connecting with communities, listening to people, working for change.",
    level: "state" as EventLevel,
  },
  {
    day: "12", month: "JUL",
    image: "/assets/kisan.jpg",
    icon: Users,
    title: "National Council Meeting",
    place: "New Delhi", time: "11:00 AM",
    detail: "Reviewing progress and planning next steps for nation-building.",
    level: "national" as EventLevel,
  },
  {
    day: "18", month: "JUL",
    image: "/assets/dharna5.jpeg",
    icon: Megaphone,
    title: "Kisan Samman Rally",
    place: "New Delhi", time: "10:00 AM",
    detail: "Honouring farmers and discussing national agricultural policy reforms.",
    level: "national" as EventLevel,
  },
  {
    day: "25", month: "JUL",
    image: "/assets/samman-2.jpg",
    icon: Star,
    title: "Lokdal Annual Convention",
    place: "New Delhi", time: "09:30 AM",
    detail: "Annual gathering of leaders to chart Lokdal's vision for a stronger India.",
    level: "national" as EventLevel,
  },
  {
    day: "08", month: "JUL",
    image: "/assets/6.jpg",
    icon: Leaf,
    title: "Gram Vikas Abhiyan",
    place: "Varanasi, UP", time: "09:00 AM",
    detail: "Village outreach to understand rural challenges and drive development.",
    level: "state" as EventLevel,
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

function UpcomingEventsCarousel({
  events,
}: {
  events: Array<{
    day: string;
    month: string;
    image: string;
    icon: any;
    title: string;
    place: string;
    time: string;
    detail: string;
  }>;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.75);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={updateScrollButtons}
        onMouseEnter={updateScrollButtons}
        onFocus={updateScrollButtons}
        className="overflow-x-auto scroll-smooth scrollbar-none px-1"
      >
        <div className="flex gap-4 pb-2">
          {events.map(({ day, month, image, icon: Icon, title, place, time, detail }) => (
            <article
              key={title}
              className="group min-w-[280px] sm:min-w-[300px] lg:min-w-[280px] rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="relative h-36 overflow-visible">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-0 left-3 bg-[#0b4d21] text-white text-center px-2.5 py-1.5 rounded-b-md shadow-md">
                  <div className="text-lg font-black leading-none">{day}</div>
                  <div className="text-[10px] font-bold leading-tight">{month}</div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-green-50 border-2 border-white flex items-center justify-center shadow-md">
                  <Icon size={16} className="text-[#0b4d21]" strokeWidth={2.4} />
                </div>
              </div>

              <div className="pt-6 px-4 pb-4 border-b-[3px] border-[#0b4d21]">
                <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-3 leading-tight min-h-[36px]">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-[#0b4d21]" fill="#0b4d21" />
                    {place}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-[#0b4d21]" />
                    {time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[48px]">{detail}</p>
                <Link
                  href="/upcoming-events"
                  className="inline-flex items-center gap-2 text-xs font-black text-[#0b4d21]"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>


    </div>
  );
}

export default function UpcomingEventsSection() {
  const [activeLevel, setActiveLevel] = useState<EventLevel>("national");

  const filteredEvents = useMemo(
    () => events.filter((e) => e.level === activeLevel).slice(0, 4),
    [activeLevel]
  );

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
              <button
                type="button"
                onClick={() => setActiveLevel("national")}
                className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors ${
                  activeLevel === "national"
                    ? "bg-[#0b4d21] text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Globe2 size={16} /> National Level
              </button>
              <button
                type="button"
                onClick={() => setActiveLevel("state")}
                className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors ${
                  activeLevel === "state"
                    ? "bg-[#0b4d21] text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
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

        {/* Events cards row */}
        <div className="relative">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">No events found for this filter.</p>
          ) : (
            <UpcomingEventsCarousel events={filteredEvents} />
          )}
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
