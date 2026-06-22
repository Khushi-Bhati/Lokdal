"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, X, Play, Images } from "lucide-react";
import { useData } from "@/lib/dataStore";

type GalleryCategory =
  | "all"
  | "Delhi Chalo"
  | "Lokdal Haryana President with Anna Hazare"
  | "Karkarta Sambhelan"
  | "Lokdal Jansabha"
  | "Dharna Pradershan"
  | "T-20 Championship"
  | "Posters"
  | "Videos";






// Use the GalleryItem type from the shared datastore to avoid type mismatches
// (e.g. category being a `GalleryCategory` enum vs a plain `string`).
// Keep the page-local GalleryItem type consistent with the page's GalleryCategory.
// (The datastore's GalleryItem defines `category` as `string`, which breaks TS assignability.)

type GalleryItem = {
  id: string;
  src: string;
  type: "image" | "video";
  // datastore uses `string`; page UI expects `GalleryCategory`.
  // Keep it as `string` here so `setLightboxItem(item)` accepts items from `useData()`.
  category: string;
  title: string;
  year: number;
};



const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Delhi Chalo", label: "Delhi Chalo" },
  { id: "Lokdal Haryana President with Anna Hazare", label: "Lokdal Haryana President with Anna Hazare" },
  { id: "Karkarta Sambhelan", label: "Karkarta Sambhelan" },
  { id: "Lokdal Jansabha", label: "Lokdal Jansabha" },
  { id: "Dharna Pradershan", label: "Dharna Pradershan" },
  { id: "T-20 Championship", label: "T-20 Championship" },
  { id: "Posters", label: "Posters" },
  { id: "Videos", label: "Videos" },
];


export default function GalleryPage() {
  const { gallery: galleryItems } = useData();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  // Ensure filter works even if sidebar categories don't include every possible GalleryItem.category
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);


  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxItem, closeLightbox]);

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/charan singh hero.png"
          alt="Chaudhary Charan Singh"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-[0.2em] drop-shadow-lg">
            GALLERY
          </h1>
          <button
            type="button"
            onClick={scrollToGallery}
            aria-label="Scroll to gallery"
            className="mt-6 animate-bounce text-white/90 hover:text-white transition-colors"
          >
            <ChevronDown size={36} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* Gallery content */}
      <section ref={galleryRef} className="scroll-mt-20 w-full px-4 sm:px-8 lg:px-16 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* Sidebar filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm sticky top-24">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Images size={14} className="text-[#0b4d21]" />
                Categories
              </h2>
              <nav className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                      activeCategory === cat.id
                        ? "bg-[#0b4d21] text-white shadow-sm"
                        : "text-gray-600 hover:bg-green-50 hover:text-[#0b4d21]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
              <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </aside>

          {/* Image grid */}
          <div className="flex-1 min-w-0">
            {filteredItems.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-xl py-20 text-center shadow-sm">
                <p className="text-gray-500 font-bold">No media found in this category.</p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className="mt-3 text-sm font-bold text-[#0b4d21] hover:underline"
                >
                  View all gallery
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxItem(item)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#0b4d21] focus:ring-offset-2"
                  >
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <>
                        <video
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                          poster=""
                        >
                          <source src={item.src} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play size={24} className="text-[#0b4d21] ml-1" fill="#0b4d21" />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <p className="text-white text-xs font-bold leading-tight">{item.title}</p>
                      <p className="text-white/70 text-[10px] font-medium mt-0.5">{item.year}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video max-h-[75vh] rounded-xl overflow-hidden bg-black">
              {lightboxItem.type === "image" ? (
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              ) : (
                <video
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  <source src={lightboxItem.src} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-white font-black text-lg">{lightboxItem.title}</h3>
              <p className="text-white/60 text-sm font-medium mt-1">{lightboxItem.year}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

