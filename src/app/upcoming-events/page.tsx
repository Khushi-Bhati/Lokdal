"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, MapPin, Download } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = {
  facebook: "https://www.facebook.com/Lokdalindia/",
  twitter: "https://x.com/lokdalindia",
  whatsapp: "https://wa.me/919810074878",
};

const events = [
  {
    image: "/assets/kisan.jpg",
    day: "25", month: "MAY", year: "2025",
    title: "Kisan Samman Rally",
    desc: "A massive gathering to honor farmers and discuss key issues related to their rights, welfare and prosperity.",
    time: "10:00 AM Onwards",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    image: "/assets/delhichalo-16.jpg",
    day: "02", month: "JUN", year: "2025",
    title: "Youth Empowerment Summit",
    desc: "Inspiring the youth to become leaders of tomorrow and contribute to the nation's progress.",
    time: "11:00 AM Onwards",
    location: "Kanpur, Uttar Pradesh",
  },
  {
    image: "/assets/dharna5.jpeg",
    day: "10", month: "JUN", year: "2025",
    title: "Lokdal Workers' Convention",
    desc: "A conference of dedicated workers and leaders to strengthen our organization at the grassroots level.",
    time: "12:00 PM Onwards",
    location: "Meerut, Uttar Pradesh",
  },
  {
    image: "/assets/6.jpg",
    day: "18", month: "JUN", year: "2025",
    title: "Gram Vikas Abhiyan",
    desc: "A special initiative to visit villages, meet people and understand their challenges for a developed rural India.",
    time: "09:00 AM Onwards",
    location: "Varanasi, Uttar Pradesh",
  },
  {
    image: "/assets/dharna1.jpeg",
    day: "22", month: "JUN", year: "2025",
    title: "Kisan Mahapanchayat",
    desc: "State-level farmers' gathering to discuss MSP, loan waiver and rural development.",
    time: "10:00 AM Onwards",
    location: "Rohtak, Haryana",
  },
  {
    image: "/assets/join.jpg",
    day: "05", month: "JUL", year: "2025",
    title: "Rajasthan Kisan Sammelan",
    desc: "Empowering farmers across Rajasthan with policy discussions and community outreach.",
    time: "11:00 AM Onwards",
    location: "Jaipur, Rajasthan",
  },
  {
    image: "/assets/4.jpg",
    day: "12", month: "JUL", year: "2025",
    title: "Bihar Jan Sampark Abhiyan",
    desc: "Connecting with communities across Bihar to listen to people and work for change.",
    time: "02:00 PM Onwards",
    location: "Patna, Bihar",
  },
  {
    image: "/assets/hazare1.jpg",
    day: "20", month: "JUL", year: "2025",
    title: "Kerala Youth Leadership Camp",
    desc: "Building tomorrow's leaders through workshops, discussions and community service.",
    time: "09:30 AM Onwards",
    location: "Kochi, Kerala",
  },
];

export default function UpcomingEventsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">Upcoming Events</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {events.map((event, idx) => (
            <div key={idx} className="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white group">
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 bg-white/90 text-[#0b4d21] text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                  <Image src="/assets/logo.png" alt="logo" width={12} height={12} className="object-contain" />
                  लोकदल द्वारा आयोजित
                </div>
                <div className="absolute bottom-3 left-3 bg-[#0b4d21] text-white rounded-lg px-2.5 py-1.5 text-center shadow-md">
                  <div className="text-base font-black leading-none">{event.day}</div>
                  <div className="text-[10px] font-bold leading-tight">{event.month}</div>
                  <div className="text-[9px] leading-tight opacity-80">{event.year}</div>
                </div>
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md">
                  <Image src="/assets/logo.png" alt="Lokdal" width={22} height={22} className="object-contain" />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-2 leading-tight">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{event.desc}</p>
                <div className="flex flex-col gap-1 mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock size={12} className="text-[#0b4d21] flex-shrink-0" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={12} className="text-[#0b4d21] flex-shrink-0" fill="#0b4d21" /> {event.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lokdal on Facebook"
                    className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <FaFacebookF size={11} />
                  </a>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lokdal on X"
                    className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white transition-all"
                  >
                    <FaXTwitter size={11} />
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lokdal on WhatsApp"
                    className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all"
                  >
                    <FaWhatsapp size={11} />
                  </a>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
