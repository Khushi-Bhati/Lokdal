"use client";

import Image from "next/image";
import { Calendar, PlayCircle, ArrowRight } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useData } from "@/lib/dataStore";

const socialLinks = {
  facebook: "https://www.facebook.com/Lokdalindia/",
  twitter: "https://x.com/lokdalindia",
  whatsapp: "https://wa.me/919810074878",
  youtube: "https://www.youtube.com/@Lokdalindia",
};

const pressCardImages = [
  "/assets/gallery-5.jpg",
  "/assets/hazare3.jpg",
  "/assets/hazare2.jpg",
  "/assets/gallery-5.jpg",
  "/assets/dharna1.jpeg",
  "/assets/dharna3.jpeg",
  "/assets/gallery-9.jpg",
];

function PressCardSocialLinks() {
  return (
    <div className="flex gap-2">
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-1.5 rounded-full hover:opacity-80"><FaFacebookF size={12} /></a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white p-1.5 rounded-full hover:opacity-80"><FaXTwitter size={12} /></a>
      <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white p-1.5 rounded-full hover:opacity-80"><FaWhatsapp size={12} /></a>
    </div>
  );
}

export default function PressMediaPage() {
  const { press: pressReleases } = useData();

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8">

        {/* HERO BANNER */}
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
                <Calendar size={16} /> {pressReleases[0]?.date || ""}
              </p>
              <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-6 leading-snug">
                {pressReleases[0]?.title || ""}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[70%] flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {pressReleases.slice(0, 3).map((pr, i) => (
                <div key={pr.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="p-5 h-40 flex items-center relative overflow-hidden">
                    <Image src={pressCardImages[i % pressCardImages.length]} alt={pr.title} fill className="object-cover opacity-80" sizes="23vw" />
                    <div className="text-white text-3xl font-black relative z-10 leading-tight">प्रेस<br />विज्ञप्ति</div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-gray-500 text-xs mb-3">{pr.date}</span>
                    <h3 className="font-bold text-gray-900 text-[15px] mb-5 leading-snug flex-grow">{pr.title}</h3>
                    <PressCardSocialLinks />
                  </div>
                </div>
              ))}

              {/* Banner */}
              <div className="col-span-1 sm:col-span-2 md:col-span-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl overflow-hidden border border-green-200 flex flex-col sm:flex-row items-center p-6 gap-6 relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0 relative z-10">
                  <Image src="/assets/sunil singh img.png" alt="Sunil Singh" fill className="object-cover object-top" />
                </div>
                <div className="text-center sm:text-left flex-grow relative z-10">
                  <h3 className="text-2xl font-black text-[#0b4d21]">लोकदल संकल्प यात्रा</h3>
                  <p className="text-gray-700 font-bold">गांव-गांव, हर दिल तक</p>
                </div>
              </div>

              {pressReleases.slice(3).map((pr, i) => (
                <div key={pr.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="bg-[#0b4d21] p-5 h-40 flex items-center relative overflow-hidden">
                    <Image src={pressCardImages[(i + 3) % pressCardImages.length]} alt={pr.title} fill className="object-cover opacity-80" sizes="23vw" />
                    <div className="text-white text-3xl font-black relative z-10 leading-tight">प्रेस<br />विज्ञप्ति</div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-gray-500 text-xs mb-3">{pr.date}</span>
                    <h3 className="font-bold text-gray-900 text-[15px] mb-5 leading-snug flex-grow">{pr.title}</h3>
                    <PressCardSocialLinks />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-[30%] flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-3 text-lg">प्रेस विज्ञप्ति सब्सक्राइब करें</h3>
              <div className="flex gap-2">
                <input type="email" placeholder="अपना ईमेल दर्ज करें" className="border border-gray-200 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0b4d21]" />
                <button className="bg-[#0b4d21] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#073616]">खोजें</button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-4 text-lg">लोकदल प्रेस कॉन्फ्रेंस</h3>
              <div className="relative rounded-lg overflow-hidden aspect-video mb-3 bg-black">
                <video className="h-full w-full object-cover" controls muted playsInline preload="metadata">
                  <source src="/videos/15.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-sm font-bold text-gray-800 leading-snug">LIVE: माननीय Sunil Singh जी की प्रेस वार्ता<br />किसान, युवा और देश के भविष्य पर चर्चा</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-4 text-lg">सोशल मीडिया से जुड़ें</h3>
              <div className="flex gap-4 border-b border-gray-100 mb-4">
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 text-sm font-bold border-b-2 border-blue-600 pb-2"><FaFacebookF /> Facebook</a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 text-sm font-bold pb-2 hover:text-sky-500"><FaXTwitter /> Twitter</a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 text-sm font-bold pb-2 hover:text-red-500"><FaYoutube /> Youtube</a>
              </div>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="relative block h-72 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <Image src="/assets/image.png" alt="Lokdal Facebook page" fill className="object-cover" sizes="30vw" />
              </a>
            </div>

            <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-between p-4 border border-green-200 shadow-sm">
              <div className="w-1/3 h-full relative">
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
