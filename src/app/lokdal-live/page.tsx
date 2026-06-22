"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, MapPin, Play, ArrowRight, Video } from "lucide-react";

const states = ["Uttar Pradesh", "Haryana", "Rajasthan", "Bihar", "Madhya Pradesh"];
const categories = ["Speech", "Press Conference", "Public Meeting", "Rally", "Convention"];

type GalleryTab = "photos" | "videos" | "speeches";

const galleryItems = {
  photos: [
    "/assets/dharna1.jpeg",
    "/assets/dharna3.jpeg",
    "/assets/kisan.jpg",
    "/assets/join.jpg",
    "/assets/gallery-5.jpg",
  ],
  videos: [
    "/videos/6.mp4",
    "/videos/8.mp4",
    "/videos/10.mp4",
    "/videos/14.mp4",
    "/videos/15.mp4",
  ],
  speeches: [
    "/videos/10.mp4",
    "/videos/15.mp4",
  ],
};

const recentBroadcasts = [
  {
    image: "",
    video: "/videos/6.mp4",
    title: "LIVE: Yuva Hunkar Rally in Kanpur",
    date: "22 May 2025",
    dateValue: "2025-05-22",
    location: "Kanpur, Uttar Pradesh",
    state: "Uttar Pradesh",
    category: "Rally",
  },
  {
    image: "",
    video: "/videos/8.mp4",
    title: "LIVE: Press Conference in Patna",
    date: "21 May 2025",
    dateValue: "2025-05-21",
    location: "Patna, Bihar",
    state: "Bihar",
    category: "Press Conference",
  },
  {
    image: "",
    video: "/videos/15.mp4",
    title: "LIVE: Kisan Mahapanchayat in Meerut",
    date: "20 May 2025",
    dateValue: "2025-05-20",
    location: "Meerut, Uttar Pradesh",
    state: "Uttar Pradesh",
    category: "Public Meeting",
  },
  {
    image: "",
    video: "/videos/14.mp4",
    title: "LIVE: Organization Meeting in Bhopal",
    date: "19 May 2025",
    dateValue: "2025-05-19",
    location: "Bhopal, Madhya Pradesh",
    state: "Madhya Pradesh",
    category: "Convention",
  },
 
];

export default function LokdalLivePage() {

  const [galleryTab, setGalleryTab] = useState<GalleryTab>("videos");
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const recentSectionRef = useRef<HTMLDivElement>(null);

  const filteredBroadcasts = recentBroadcasts;


  const handleSearchSubmit = () => {
    recentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWatchNow = () => {
    featuredVideoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    void featuredVideoRef.current?.play().catch(() => {});
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="w-full  overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[300px] sm:min-h-[420px]">

          {/* Left: green text panel - 35% */}
          <div className="relative w-full lg:w-[35%] px-5 sm:px-10 lg:px-16 py-8 sm:py-14 flex flex-col justify-center overflow-hidden">
            <Image
              src="/assets/green left.png"
              alt=""
              fill
              className="object-cover object-left"
            />
            <div className="absolute inset-0 bg-white/75" />
            <div className="relative z-10">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0b4d21] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Broadcast
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-[#0b4d21] leading-none mb-3">
                LOKDAL LIVE
              </h1>
              <h2 className="text-sm sm:text-xl font-black text-gray-950 leading-snug mb-3">
                Speeches, press conferences and public meetings from Lokdal leaders.
              </h2>
              <div className="w-10 h-1 bg-[#0b4d21] mb-4 rounded-full" />
              <p className="text-xs sm:text-[15px] text-gray-700 leading-relaxed">
                Watch live addresses, press conferences and public meetings from Lokdal leaders across the country.
              </p>
            </div>

            {/* Bottom event info */}
            <div className="relative z-10 mt-6 border-l-4 border-[#0b4d21] bg-white/85 px-3 py-3 shadow-sm">
              <p className="text-gray-950 font-black text-xs sm:text-base mb-1.5">LIVE: Kisan Sammelan in Lucknow</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-xs font-bold">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0b4d21]" /> 25 May 2025</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#0b4d21]" /> Lucknow, UP</span>
              </div>
            </div>
          </div>

          {/* Right: video - 65% */}
          <div className="relative w-full lg:w-[65%] h-52 sm:h-80 lg:h-auto min-h-[220px]">
            <video
              className="absolute inset-0 h-full w-full object-cover object-top"
              controls
              muted
              playsInline
              preload="metadata"
              poster=""
            >
              <source src="/videos/15.mp4" type="video/mp4" />
            </video>


            {/* LIVE badge — top left */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
              </span>
            </div>

            {/* Play button — center */}
          </div>

        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-10">

        {/* ── FEATURED BROADCAST ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <div className="relative w-full lg:w-[48%] h-52 sm:h-64 lg:h-auto flex-shrink-0">
            <video
              ref={featuredVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
              poster=""
            >
              <source src="/videos/10.mp4" type="video/mp4" />
            </video>
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
            </span>
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">
            <p className="text-[10px] font-black text-[#0b4d21] tracking-[0.15em] uppercase mb-3">Featured Broadcast</p>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight mb-3">
              LIVE: Lokdal National Executive Meeting Address by Shri Sunil Singh
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Watch Chaudhary Sunil Singh address the national executive meeting and outline Lokdal&apos;s vision for a stronger, farmer-first India.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0b4d21]" /> 24 May 2025</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#0b4d21]" fill="#0b4d21" /> New Delhi</span>
            </div>
            <button
              type="button"
              onClick={handleWatchNow}
              className="inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#073616] transition-colors w-fit"
            >
              <Play size={13} fill="white" /> Watch Now <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ── RECENT BROADCASTS ── */}
        <div ref={recentSectionRef} className="mb-10 scroll-mt-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <Video size={18} className="text-[#0b4d21]" /> Recent Broadcasts
            </h2>

          </div>

          {recentBroadcasts.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredBroadcasts.map((video, idx) => (
                <div key={idx} className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative h-44 sm:h-52 lg:h-48 xl:h-56 overflow-hidden">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      poster={video.image}
                    >
                      <source src={video.video} type="video/mp4" />
                    </video>
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> LIVE
                    </span>
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
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center">
              <p className="text-sm font-bold text-gray-700">No broadcasts found</p>
              <p className="mt-1 text-xs text-gray-500">Try changing the search, state, category or date filters.</p>
            </div>
          )}
        </div>

        {/* ── UPCOMING LIVE SCHEDULE ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-[#0b4d21]" /> Upcoming Live Schedule
            </h2>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block border border-gray-100 rounded-xl overflow-hidden shadow-sm">
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

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {[
              { date: "25 May 2025", event: "Kisan Sammelan", location: "Lucknow, Uttar Pradesh" },
              { date: "28 May 2025", event: "Press Conference", location: "New Delhi" },
              { date: "30 May 2025", event: "Yuva Charchaa", location: "Kanpur, Uttar Pradesh" },
              { date: "02 June 2025", event: "Lokdal Vichar Manch", location: "Patna, Bihar" },
            ].map((row, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm bg-white">
                <p className="text-sm font-black text-gray-900 mb-1.5">{row.event}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={11} className="text-[#0b4d21]" /> {row.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-[#0b4d21]" /> {row.location}</span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#0b4d21] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" /> Upcoming
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
          <div className="flex flex-wrap gap-2 mb-5">
            {([
              { id: "photos" as GalleryTab, label: "Photos", icon: "🖼️" },
              { id: "videos" as GalleryTab, label: "Videos", icon: "📹" },
              { id: "speeches" as GalleryTab, label: "Speeches", icon: "🎙️" },
            ]).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGalleryTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                  galleryTab === tab.id
                    ? "bg-[#0b4d21] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xs">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          {galleryTab === "photos" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {galleryItems.photos.map((src, idx) => (
                <div key={idx} className="relative h-48 sm:h-44 xl:h-52 rounded-xl overflow-hidden group cursor-pointer">
                  <Image src={src} alt={`Gallery photo ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {galleryItems[galleryTab].map((src, idx) => (
                <div key={idx} className="relative h-48 sm:h-44 xl:h-52 rounded-xl overflow-hidden group cursor-pointer">
                  <video className="h-full w-full object-cover" controls muted playsInline preload="metadata">
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <Footer />
    </main>
  );
}
