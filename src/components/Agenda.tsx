"use client";

import { ArrowRight, ArrowLeft, CalendarDays, MapPin, Star, Handshake, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type ActivityCategory = "latest" | "rally" | "ceremony";

const CATEGORY_TABS: { id: ActivityCategory; label: string }[] = [
  { id: "latest", label: "ताजा" },
  { id: "rally", label: "जनसभा/सम्मेलन कार्यक्रम" },
  { id: "ceremony", label: "समारोह/पुरस्कार वितरण" },
];

export default function Agenda() {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>("latest");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activities = [
    {
      title: "धर्म प्रदर्शन एवं जनसभाग्रम",
      date: "12 मई 2024",
      image: "/assets/dharna1.jpeg",
      category: "latest" as ActivityCategory,
    },
    {
      title: "नकद पुरस्कार वितरण कार्यक्रम",
      date: "10 मई 2024",
      image: "/assets/join.jpg",
      category: "ceremony" as ActivityCategory,
    },
    {
      title: "क्रिकेट प्रतियोगिता (T-20)",
      date: "08 मई 2024",
      image: "/assets/dharna3.jpeg",
      category: "ceremony" as ActivityCategory,
    },
    {
      title: "किसान महापंचायत",
      date: "05 मई 2024",
      image: "/assets/kisan.jpg",
      category: "rally" as ActivityCategory,
    },
    {
      title: "युवा संकल्प सम्मेलन",
      date: "03 मई 2024",
      image: "/assets/dharna5.jpeg",
      category: "rally" as ActivityCategory,
    },
  ];

  const filteredActivities = useMemo(() => {
    if (activeCategory === "latest") return activities;
    return activities.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const scrollActivities = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  const stats = [
    { icon: <Handshake size={28} className="text-white" />, value: "10L+", label: "समर्थक" },
    { icon: <MapPin size={28} className="text-white" />, value: "75+", label: "जिले में सक्रिय" },
    { icon: <Users size={28} className="text-white" />, value: "500+", label: "संगठन इकाईयों" },
    { icon: <Star size={28} className="text-white" />, value: "25+", label: "जन कल्याण कार्यक्रम" },
    { icon: <Star size={28} className="text-white" />, value: "20+", label: "वर्ष का जनसेवा अनुभव" },
  ];

  return (
    <section className="w-full bg-white">
      
      {/* Top Content: Activities + About */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          
          {/* Left Column: मुख्य गतिविधियों */}
          <div className="w-full lg:w-[55%] border border-gray-200 rounded-2xl p-6 lg:p-8">
            
            {/* Header Row */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0b4d21]">मुख्य गतिविधियों</h3>
              <Link href="/upcoming-events" className="text-[#0b4d21] font-bold text-sm flex items-center gap-1 hover:underline">
                सभी देखें <ArrowRight size={16} />
              </Link>
            </div>

            {/* Green Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === tab.id
                      ? "bg-[#0b4d21] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Activity Cards Slider */}
            <div className="relative">
              {filteredActivities.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">इस श्रेणी में कोई गतिविधि नहीं मिली।</p>
              ) : (
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-1">
                {filteredActivities.map((activity, idx) => (
                  <div key={idx} className="min-w-[200px] flex-1 group cursor-pointer">
                    {/* Image */}
                    <div className="w-full h-40 bg-gray-200 rounded-xl mb-3 overflow-hidden relative">
                      <Image src={activity.image} alt={activity.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1.5 group-hover:text-[#0b4d21] transition-colors leading-tight">{activity.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <CalendarDays size={12} /> {activity.date}
                    </p>
                  </div>
                ))}
              </div>
              )}
              
              {/* Navigation Arrows */}
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => scrollActivities("left")}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollActivities("right")}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ArrowRight size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: लोकदल के बारे में */}
          <div className="w-full lg:w-[45%] border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col">
            
            <h3 className="text-2xl font-bold text-[#0b4d21] mb-4 border-b-2 border-[#0b4d21] pb-3 inline-block self-start">लोकदल के बारे में</h3>
            
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              {/* Text Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  राजित समाजवादी एवं नेता श्री सुनील सिंह जी
                  उत्तर प्रदेश के अलीगढ़ जनपद से एक जानी-मानी
                  हस्ती हैं। वे ईमानदारी एवं मेहनतकश में
                  विश्वास हैं और बहु पार्टी से समाज सेवा एवं अपरिचित
                  के कामों में संलग्न हैं।
                </p>
                <Link href="/about/chaudhary-sunil-singh" className="inline-flex items-center gap-2 text-[#0b4d21] font-bold text-sm border-2 border-[#0b4d21] px-5 py-2 rounded-md hover:bg-[#0b4d21] hover:text-white transition-all">
                  और जानें
                </Link>
              </div>
              
              {/* Leader Photo */}
              <div className="w-full md:w-[240px] flex flex-col items-center flex-shrink-0">
                <div className="w-[210px] h-[260px] sm:w-[230px] sm:h-[285px] rounded-xl overflow-hidden border border-green-100 relative">
                  <Image
                    src="/assets/chairman.png"
                    alt="श्री सुनील सिंह"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h4 className="font-bold text-[#0b4d21] text-sm mt-3 text-center">श्री सुनील सिंह</h4>
                <p className="text-xs text-gray-500 text-center">राष्ट्रीय अध्यक्ष, लोकदल</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Green Stats Bar */}
      <div className="w-full bg-[#0b4d21] py-5">
        <div className="w-full px-4 sm:px-8 lg:px-16">
          <div className="flex flex-wrap justify-between items-center divide-x divide-white/20">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 lg:px-10 py-2 flex-1 min-w-[180px] justify-center">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div>
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <p className="text-xs text-white/80 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
