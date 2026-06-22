"use client";

import Image from "next/image";
import { MapPin, Users, Wheat, UserCheck, CalendarDays, GraduationCap, Building2 } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

const stats = [
  { icon: MapPin, value: "500+", label: "Districts Reached" },
  { icon: Users, value: "2,500+", label: "Public Meetings Conducted" },
  { icon: Wheat, value: "1 Lakh+", label: "Farmers Benefited" },
  { icon: UserCheck, value: "50,000+", label: "Youth Volunteers" },
];

const timeline = [
  {
    year: "2024",
    points: [
      "Organized National Farmers Convention",
      "Expanded presence in 20+ districts",
    ],
  },
  {
    year: "2023",
    points: [
      "Youth Leadership Campaign launched",
      "Public welfare initiatives across multiple states",
    ],
  },
  {
    year: "2022",
    points: [
      "Membership drive crossed major milestone",
      "State-level organizational expansion",
    ],
  },
];

const categories = [
  {
    image: "/assets/kisan.jpg",
    icon: Wheat,
    title: "Farmers Welfare",
    desc: "Supporting farmers through awareness campaigns and policy advocacy.",
  },
  {
    image: "/assets/join.jpg",
    icon: GraduationCap,
    title: "Education Support",
    desc: "Scholarships, awareness programs, and youth development initiatives.",
  },
  {
    image: "/assets/dharna1.jpeg",
    icon: Users,
    title: "Social Welfare",
    desc: "Community outreach and public welfare activities across regions.",
  },
  {
    image: "/assets/samman-2.jpg",
    icon: Building2,
    title: "Grassroots Development",
    desc: "Strengthening local leadership and organizational networks.",
  },
];

export default function OurAchievements() {
  const { t } = useTranslation();
  return (
   <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
  <div className="max-w-8xl mx-auto">
    <h2 className="text-xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-3">{t("Our Achievement")}</h2>
    <p className="text-xs sm:text-base text-gray-500 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
      {t("Our commitment to public welfare, farmers, youth, and grassroots development continues to create measurable impact across India.")}
    </p>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="border border-gray-100 rounded-xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-[#0b4d21]" />
          </div>
          <div>
            <p className="text-base sm:text-2xl font-black text-[#0b4d21] leading-tight">{value}</p>
            <p className="text-[10px] sm:text-xs text-gray-600 font-medium mt-0.5">{t(label)}</p>
            <div className="w-4 sm:w-6 h-0.5 bg-[#0b4d21] mt-1.5 rounded-full" />
          </div>
        </div>
      ))}
    </div>

    {/* Timeline */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
      <div className="hidden md:block absolute top-0 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-gray-200" />
      {timeline.map(({ year, points }, idx) => (
        <div key={year} className="border border-gray-100 rounded-xl p-3 sm:p-5 shadow-sm relative bg-white">
          <div className={`hidden md:block absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#0b4d21] ${idx === 0 ? "bg-[#0b4d21]" : "bg-white"}`} />
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <CalendarDays size={15} className="text-[#0b4d21]" />
            </div>
            <span className="text-sm sm:text-lg font-black text-gray-900">{year}</span>
          </div>
          <ul className="space-y-1.5 sm:space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21] mt-1.5 flex-shrink-0" />
                {t(p)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Categories */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
      {categories.map(({ image, icon: Icon, title, desc }) => (
        <div key={title} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group bg-white">
          <div className="relative h-28 sm:h-40 overflow-visible">
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-green-100 flex items-center justify-center shadow-lg z-10">
              <Icon size={18} className="text-[#0b4d21]" />
            </div>
          </div>
          <div className="pt-6 sm:pt-8 px-3 sm:px-5 pb-4 sm:pb-5">
            <h3 className="text-xs sm:text-sm font-black text-[#0b4d21] mb-1 sm:mb-2">{t(title)}</h3>
            <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed mb-2 sm:mb-3 hidden sm:block">{t(desc)}</p>
            <div className="w-5 h-0.5 bg-[#0b4d21] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
