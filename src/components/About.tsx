"use client";

import Link from "next/link";
import { UserPlus, User, Users, Handshake, Target, Home, GraduationCap, ShieldCheck, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "./LanguageProvider";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-10 sm:py-16 w-full px-4 sm:px-8 lg:px-16 bg-white relative z-20">
      <div className="relative w-full flex flex-col lg:flex-row gap-6 lg:gap-0 min-h-[300px]">
        <div className="w-full lg:w-[48%] relative">
          <div className="w-full h-full bg-[#0b4d21] text-white p-5 sm:p-8 xl:p-10 flex flex-col items-center text-center rounded-2xl lg:rounded-l-2xl lg:rounded-r-none" style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)" }}>
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 w-full lg:pr-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-7">{t("Join Lokdal")}</h2>
              <p className="text-white/90 mb-5 sm:mb-8 text-sm font-medium">{t("Be a part of the movement for positive change.")}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
                {[
                  { Icon: UserPlus, title: "Join the Organization", desc: "Connect with the team" },
                  { Icon: User, title: "Become a Member", desc: "Member of Lokdal" },
                  { Icon: Users, title: "Empower Youth", desc: "Walk with the youth" },
                  { Icon: Handshake, title: "Strengthen Org", desc: "For society & change" },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="flex flex-col items-center text-center px-1">
                    <Icon size={20} className="mb-2 text-white" />
                    <h4 className="font-bold text-[10px] uppercase tracking-wide mb-1 leading-tight">{t(title)}</h4>
                    <p className="text-[9px] text-white/70 leading-tight hidden sm:block">{t(desc)}</p>
                  </div>
                ))}
              </div>
              <Link href="/join" className="bg-white text-[#0b4d21] font-bold px-6 sm:px-8 py-2.5 rounded-md mt-6 sm:mt-8 inline-flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                {t("Join Now")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[52%] relative -ml-0 lg:-ml-8" style={{ filter: "drop-shadow(0px 0px 1px #0b4d21)" }}>
          <div className="w-full h-full bg-white p-5 sm:p-8 xl:p-10 flex flex-col items-center text-center rounded-2xl lg:rounded-r-2xl lg:rounded-l-none" style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}>
            <div className="relative z-10 w-full lg:pl-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#0b4d21]">{t("Support for Change")}</h2>
              <p className="text-gray-600 mb-5 sm:mb-8 text-sm font-medium">{t("Your support gives strength to public welfare work.")}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
                {[
                  { Icon: Target, title: "Public Campaigns", desc: "Raising voice for issues" },
                  { Icon: Home, title: "Rural Development", desc: "Building villages" },
                  { Icon: GraduationCap, title: "Youth & Education", desc: "New thinking, bright future" },
                  { Icon: ShieldCheck, title: "Accountability", desc: "Contribution with honesty" },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 rounded-full border-2 border-[#0b4d21]/20 flex items-center justify-center mb-2">
                      <Icon size={18} className="text-[#0b4d21]" />
                    </div>
                    <h4 className="font-bold text-[10px] text-[#0b4d21] uppercase tracking-wide mb-1 leading-tight">{t(title)}</h4>
                    <p className="text-[9px] text-gray-500 leading-tight hidden sm:block">{t(desc)}</p>
                  </div>
                ))}
              </div>
              <Link href="/donate" className="bg-[#0b4d21] text-white font-bold px-6 sm:px-8 py-2.5 rounded-md mt-6 sm:mt-8 inline-flex items-center gap-2 hover:bg-[#073616] transition-colors shadow-lg">
                {t("Donate Now")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white rounded-full shadow-2xl border-4 border-[#0b4d21]/5 items-center justify-center z-20 overflow-hidden">
          <Image src="/assets/logo.png" alt="Lokdal Logo" width={100} height={100} className="w-full h-full object-contain p-2" />
        </div>
      </div>
      <div className="bg-white rounded-2xl sm:rounded-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-4 flex flex-col md:flex-row justify-between items-start md:items-center mt-8 sm:mt-12 w-full divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {[
          { Icon: GraduationCap, title: "शिक्षा का अधिकार", desc: "हर बच्चे को बेहतर शिक्षा" },
          { Icon: Leaf, title: "किसान का सम्मान", desc: "किसानों के साथ, किसानों के लिए" },
          { Icon: Users, title: "समाज का उत्थान", desc: "समानता, न्याय और विकास" },
          { Icon: ShieldCheck, title: "भ्रष्टाचार का विरोध", desc: "स्वच्छ राजनीति, साफ प्रशासन" },
        ].map(({ Icon, title, desc }, i) => (
          <div key={i} className="flex items-center gap-3 px-4 sm:px-6 w-full md:w-1/4 py-3 group cursor-pointer">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
              <Icon size={20} className="text-[#0b4d21]" />
            </div>
            <div>
              <h4 className="font-bold text-[#0b4d21] text-sm sm:text-base mb-0.5">{t(title)}</h4>
              <p className="text-xs text-gray-500">{t(desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

