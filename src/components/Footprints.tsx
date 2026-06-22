"use client";

import { Flag, Handshake, MapPin, Network, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";

const stats = [
  {
    icon: MapPin,
    value: "500+",
    label: "Districts",
    caption: "Active Presence",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Blocks",
    caption: "Our Reach",
  },
  {
    icon: Users,
    value: "2L+",
    label: "Active Workers",
    caption: "Strong Organization",
  },
  {
    icon: Flag,
    value: "35+",
    label: "Years",
    caption: "Of Public Service",
  },
];

const highlights = [
  {
    icon: Users,
    title: "Nationwide Presence",
    text: "Working in every region, every community.",
  },
  {
    icon: ShieldCheck,
    title: "People First Approach",
    text: "Policies and programs focused on people's welfare.",
  },
  {
    icon: Network,
    title: "Strong Grassroots Network",
    text: "From village to nation, we stand together.",
  },
  {
    icon: Handshake,
    title: "Commitment to Change",
    text: "Dedicated to building an inclusive and progressive India.",
  },
];


export default function Footprints() {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-white py-10 sm:py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-[1fr_1.1fr_0.9fr]">
          <div>
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-4xl font-black text-gray-950">
              {t("Footprints of")} <span className="text-[#0b4d21]">{t("लोकदल")}</span>
            </h2>
            <p className="mb-6 sm:mb-8 max-w-md text-sm font-medium leading-7 text-gray-600">
              {t("A strong presence across India, working for people, for progress and for a better tomorrow.")}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {stats.map(({ icon: Icon, value, label, caption }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-3 sm:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="grid h-10 w-10 sm:h-16 sm:w-16 flex-shrink-0 place-items-center rounded-full bg-green-100 text-[#0b4d21]">
                      <Icon size={20} fill="currentColor" strokeWidth={2.4} />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-black text-[#0b4d21]">{value}</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-950">{t(label)}</div>
                      <div className="text-[10px] sm:text-xs font-medium text-gray-500 hidden sm:block">{t(caption)}</div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-5 h-0.5 w-8 bg-[#0b4d21]" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image src="/assets/map.png" alt="Footprints of Lokdal - India Map" width={500} height={420} className="w-full h-auto object-contain" priority />
          </div>

          <div className="rounded-l-none border-gray-200 lg:border-l lg:pl-8">
            <div className="mb-6 sm:mb-10 grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <Link href="/organization/national-executive" className="bg-[#0b4d21] px-3 sm:px-5 py-3 text-xs sm:text-sm font-bold text-white text-center">{t("At National Level")}</Link>
              <Link href="/organization/uttar-pradesh" className="bg-white px-3 sm:px-5 py-3 text-xs sm:text-sm font-bold text-gray-900 text-center hover:bg-gray-50 transition-colors">{t("In States")}</Link>
            </div>
            <div className="space-y-0">
              {highlights.map(({ icon: Icon, title, text }, index) => (
                <div key={title} className={`flex gap-3 sm:gap-5 py-4 sm:py-5 ${index === highlights.length - 1 ? "" : "border-b border-dashed border-gray-200"}`}>
                  <div className="grid h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 place-items-center rounded-full bg-white text-[#0b4d21] shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xs sm:text-sm font-black text-[#0b4d21]">{t(title)}</h3>
                    <p className="text-xs sm:text-sm font-medium leading-6 text-gray-600">{t(text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
