"use client";

import { UserPlus, User, Users, Handshake, Target, Home, GraduationCap, ShieldCheck, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 w-full px-4 sm:px-8 lg:px-16 bg-white relative z-20">
      
      {/* Main Dual Card Container - Full Width */}
      <div className="relative w-full flex flex-col lg:flex-row gap-6 lg:gap-0 min-h-[300px]">
        
        {/* Left Content (Join Lokdal) */}
        <div className="w-full lg:w-[48%] relative">
          <div 
            className="w-full h-full bg-[#0b4d21] text-white p-6 lg:p-8 xl:p-10 flex flex-col items-center text-center rounded-2xl lg:rounded-l-2xl lg:rounded-r-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)" }}
          >
            {/* Subtle background overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 w-full lg:pr-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">Join Lokdal</h2>
              <p className="text-white/90 mb-8 text-sm font-medium">Be a part of the movement for positive change.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col items-center text-center border-r border-white/20 last:border-0 px-2">
                  <UserPlus size={24} className="mb-3 text-white" />
                  <h4 className="font-bold text-[11px] uppercase tracking-wide mb-1">Join the Organization</h4>
                  <p className="text-[10px] text-white/70 leading-tight">Connect with the team</p>
                </div>
                <div className="flex flex-col items-center text-center border-r border-white/20 last:border-0 px-2">
                  <User size={24} className="mb-3 text-white" />
                  <h4 className="font-bold text-[11px] uppercase tracking-wide mb-1">Become a Member</h4>
                  <p className="text-[10px] text-white/70 leading-tight">Member of Lokdal</p>
                </div>
                <div className="flex flex-col items-center text-center border-r border-white/20 last:border-0 px-2">
                  <Users size={24} className="mb-3 text-white" />
                  <h4 className="font-bold text-[11px] uppercase tracking-wide mb-1">Empower Youth</h4>
                  <p className="text-[10px] text-white/70 leading-tight">Walk with the youth</p>
                </div>
                <div className="flex flex-col items-center text-center border-r-0 px-2">
                  <Handshake size={24} className="mb-3 text-white" />
                  <h4 className="font-bold text-[11px] uppercase tracking-wide mb-1">Strengthen Org</h4>
                  <p className="text-[10px] text-white/70 leading-tight">For society & change</p>
                </div>
              </div>

              <button className="bg-white text-[#0b4d21] font-bold px-8 py-2.5 rounded-md mt-8 flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg mx-auto">
                Join Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content (Support for Change) */}
        <div className="w-full lg:w-[52%] relative -ml-0 lg:-ml-8" style={{ filter: "drop-shadow(0px 0px 1px #0b4d21)" }}>
          <div 
            className="w-full h-full bg-white p-6 lg:p-8 xl:p-10 flex flex-col items-center text-center rounded-2xl lg:rounded-r-2xl lg:rounded-l-none"
            style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <div className="relative z-10 w-full lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-[#0b4d21]">Support for Change</h2>
              <p className="text-gray-600 mb-8 text-sm font-medium">Your support gives strength to public welfare work.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#0b4d21]/20 flex items-center justify-center mb-3">
                    <Target size={20} className="text-[#0b4d21]" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#0b4d21] uppercase tracking-wide mb-1">Public Campaigns</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">Raising voice for issues</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#0b4d21]/20 flex items-center justify-center mb-3">
                    <Home size={20} className="text-[#0b4d21]" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#0b4d21] uppercase tracking-wide mb-1">Rural Development</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">Building villages</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#0b4d21]/20 flex items-center justify-center mb-3">
                    <GraduationCap size={20} className="text-[#0b4d21]" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#0b4d21] uppercase tracking-wide mb-1">Youth & Education</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">New thinking, bright future</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#0b4d21]/20 flex items-center justify-center mb-3">
                    <ShieldCheck size={20} className="text-[#0b4d21]" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#0b4d21] uppercase tracking-wide mb-1">Accountability</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">Contribution with honesty</p>
                </div>
              </div>

              <button className="bg-[#0b4d21] text-white font-bold px-8 py-2.5 rounded-md mt-8 flex items-center gap-2 hover:bg-[#073616] transition-colors shadow-lg mx-auto">
                Donate Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Logo Circle - Positioned perfectly in the gap */}
        <div className="hidden lg:flex absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white rounded-full shadow-2xl border-4 border-[#0b4d21]/5 items-center justify-center z-20 overflow-hidden">
          <Image
            src="/assets/logo.png"
            alt="Lokdal Logo"
            width={100}
            height={100}
            className="w-full h-full object-contain p-2"
          />
        </div>

      </div>

      {/* Bottom Horizontal Features Bar - Full Width */}
      <div className="bg-white rounded-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-4 lg:p-2 flex flex-col md:flex-row justify-between items-center mt-12 w-full mx-auto divide-y md:divide-y-0 md:divide-x divide-gray-100">
        
        <div className="flex items-center gap-4 px-6 w-full md:w-1/4 py-4 md:py-3 group cursor-pointer">
          <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
            <GraduationCap size={24} className="text-[#0b4d21]" />
          </div>
          <div>
            <h4 className="font-bold text-[#0b4d21] text-base mb-0.5">शिक्षा का अधिकार</h4>
            <p className="text-xs text-gray-500">हर बच्चे को बेहतर शिक्षा</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-6 w-full md:w-1/4 py-4 md:py-3 group cursor-pointer">
          <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
            <Leaf size={24} className="text-[#0b4d21]" />
          </div>
          <div>
            <h4 className="font-bold text-[#0b4d21] text-base mb-0.5">किसान का सम्मान</h4>
            <p className="text-xs text-gray-500">किसानों के साथ, किसानों के लिए</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-6 w-full md:w-1/4 py-4 md:py-3 group cursor-pointer">
          <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
            <Users size={24} className="text-[#0b4d21]" />
          </div>
          <div>
            <h4 className="font-bold text-[#0b4d21] text-base mb-0.5">समाज का उत्थान</h4>
            <p className="text-xs text-gray-500">समानता, न्याय और विकास</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-6 w-full md:w-1/4 py-4 md:py-3 group cursor-pointer">
          <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
            <ShieldCheck size={24} className="text-[#0b4d21]" />
          </div>
          <div>
            <h4 className="font-bold text-[#0b4d21] text-base mb-0.5">भ्रष्टाचार का विरोध</h4>
            <p className="text-xs text-gray-500">स्वच्छ राजनीति, साफ प्रशासन</p>
          </div>
        </div>

      </div>

    </section>
  );
}
