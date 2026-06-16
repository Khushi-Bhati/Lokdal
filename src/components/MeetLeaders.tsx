"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function MeetLeaders() {
  const leaders = [
    { name: "Chaudhary Charan Singh", title: "Founder & Inspiration", image: "/assets/image_2_14.png" },
    { name: "Chaudhary Sunil Singh", title: "National President", image: "/assets/sunil singh img.png" },
    { name: "Chaudhary Rajinder Singh", title: "National General Secretary", image: "/assets/image_5_17.png" },
    { name: "Chaudhary Mahesh Singh", title: "National Vice President", image: "/assets/image_10_24.png" },
    { name: "Chaudhary Balraj Singh", title: "National Secretary", image: "/assets/image_11_26.png" },
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 italic mb-2">Meet Our Leaders</h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
              Dedicated leaders working day and night for the welfare of farmers, youth, and every citizen together,
              we are building a stronger, self-reliant and progressive India
            </p>
          </div>
          <Link href="#" className="bg-[#0b4d21] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#073616] transition-colors flex-shrink-0 whitespace-nowrap">
            View All Leaders <ArrowRight size={14} />
          </Link>
        </div>

        {/* Leaders Carousel */}
        <div className="relative sm:px-6">
          {/* Left Arrow */}
          <button className="hidden sm:flex absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-gray-300 bg-white items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowLeft size={16} className="text-gray-600" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {leaders.map((leader, idx) => (
              <div key={idx} className="bg-green-50/60 rounded-xl p-2.5 pb-3 flex flex-col items-center text-center group cursor-pointer hover:shadow-md transition-shadow border border-green-100/50">
                <div className="w-full h-28 sm:h-32 lg:h-40 bg-gradient-to-b from-green-100/80 to-green-50 rounded-lg mb-2 overflow-hidden relative">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover object-top" />
                </div>
                <h3 className="font-bold text-[10px] sm:text-xs text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-0.5 leading-tight">{leader.name}</h3>
                <p className="text-[10px] sm:text-xs text-[#0b4d21] font-medium italic mb-2">{leader.title}</p>
                <div className="flex gap-1.5">
                  <Link href="#" className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                    <FaFacebookF size={9} />
                  </Link>
                  <Link href="#" className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                    <FaXTwitter size={9} />
                  </Link>
                  <Link href="#" className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                    <FaInstagram size={9} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="hidden sm:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-gray-300 bg-white items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowRight size={16} className="text-gray-600" />
          </button>
        </div>

      </div>
    </section>
  );
}
