"use client";

import Image from "next/image";
import { MapPin, Users, Wheat, UserCheck, CalendarDays, GraduationCap, Building2 } from "lucide-react";

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
  return (
    <section className="w-full bg-white py-14 sm:py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Our Achievement</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-xl">
          Our commitment to public welfare, farmers, youth, and grassroots development continues to create measurable impact across India.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="border border-gray-100 rounded-xl px-5 py-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-[#0b4d21]" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0b4d21] leading-tight">{value}</p>
                <p className="text-xs text-gray-600 font-medium leading-tight mt-0.5">{label}</p>
                <div className="w-6 h-0.5 bg-[#0b4d21] mt-2 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Timeline row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 relative">
          {/* Connecting dots line (desktop) */}
          <div className="hidden sm:block absolute top-0 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-gray-200 translate-y-0" />

          {timeline.map(({ year, points }, idx) => (
            <div key={year} className="border border-gray-100 rounded-xl px-5 py-5 shadow-sm relative">
              {/* Dot on top */}
              <div className={`hidden sm:block absolute -top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#0b4d21] ${idx === 0 ? "bg-[#0b4d21]" : "bg-white"}`} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <CalendarDays size={18} className="text-[#0b4d21]" />
                </div>
                <span className="text-lg font-black text-gray-900">{year}</span>
              </div>
              <ul className="space-y-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21] flex-shrink-0 mt-1.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(({ image, icon: Icon, title, desc }) => (
            <div key={title} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              {/* Image with icon bubble */}
              <div className="relative h-36 overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-green-100 flex items-center justify-center shadow-md">
                  <Icon size={18} className="text-[#0b4d21]" />
                </div>
              </div>
              {/* Text */}
              <div className="pt-7 px-5 pb-5">
                <h3 className="text-sm font-black text-[#0b4d21] mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{desc}</p>
                <div className="w-6 h-0.5 bg-[#0b4d21] rounded-full" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
