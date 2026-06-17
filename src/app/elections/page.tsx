"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  UserPlus, 
  Map, 
  Flame, 
  CheckCircle2, 
  ChevronDown 
} from "lucide-react";

// States data database
interface StateCampaignData {
  id: string;
  name: string;
  status: "Active Campaign" | "Upcoming Campaign" | "Upcoming";
  candidates: number;
  seats: number;
  rallies: number;
  volunteers: string;
  progress: number;
}

const statesDatabase: Record<string, StateCampaignData> = {
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    status: "Active Campaign",
    candidates: 85,
    seats: 80,
    rallies: 12,
    volunteers: "8,500+",
    progress: 75,
  },
  "bihar": {
    id: "bihar",
    name: "Bihar",
    status: "Active Campaign",
    candidates: 40,
    seats: 40,
    rallies: 6,
    volunteers: "3,500+",
    progress: 60,
  },
  "madhya-pradesh": {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    status: "Upcoming Campaign",
    candidates: 15,
    seats: 29,
    rallies: 2,
    volunteers: "1,200+",
    progress: 20,
  },
  "rajasthan": {
    id: "rajasthan",
    name: "Rajasthan",
    status: "Active Campaign",
    candidates: 25,
    seats: 25,
    rallies: 4,
    volunteers: "2,800+",
    progress: 45,
  },
  "haryana": {
    id: "haryana",
    name: "Haryana",
    status: "Active Campaign",
    candidates: 10,
    seats: 10,
    rallies: 5,
    volunteers: "2,000+",
    progress: 80,
  },
  "punjab": {
    id: "punjab",
    name: "Punjab",
    status: "Upcoming",
    candidates: 8,
    seats: 13,
    rallies: 1,
    volunteers: "800",
    progress: 15,
  },
  "maharashtra": {
    id: "maharashtra",
    name: "Maharashtra",
    status: "Upcoming",
    candidates: 12,
    seats: 48,
    rallies: 2,
    volunteers: "1,000+",
    progress: 10,
  },
  "karnataka": {
    id: "karnataka",
    name: "Karnataka",
    status: "Upcoming",
    candidates: 5,
    seats: 28,
    rallies: 0,
    volunteers: "500",
    progress: 5,
  },
};

// Map polygon points for schematic India map representation
const mapPolygons = [
  { id: "uttar-pradesh", name: "Uttar Pradesh", points: "140,110 160,115 175,130 190,135 185,150 170,165 155,160 140,150 135,135" },
  { id: "bihar", name: "Bihar", points: "190,135 210,132 230,138 232,150 215,162 195,155 185,150" },
  { id: "madhya-pradesh", name: "Madhya Pradesh", points: "115,160 140,150 155,160 170,165 185,185 160,210 130,205 110,195 105,180" },
  { id: "rajasthan", name: "Rajasthan", points: "80,105 110,100 135,115 135,135 115,160 85,150 75,130" },
  { id: "haryana", name: "Haryana", points: "105,85 125,82 135,92 135,115 110,110" },
  { id: "punjab", name: "Punjab", points: "95,65 115,62 125,82 105,85" },
  { id: "maharashtra", name: "Maharashtra", points: "85,190 110,195 130,205 160,210 155,255 100,245 80,225" },
  { id: "karnataka", name: "Karnataka", points: "95,245 120,250 115,310 95,295 90,265" }
];

const baseRegions = [
  { id: "jk", name: "Jammu & Kashmir", points: "100,20 120,15 130,30 125,50 110,65 95,65 90,45" },
  { id: "gujarat", name: "Gujarat", points: "45,150 85,150 85,190 60,195 50,175" },
  { id: "tamil-nadu", name: "Tamil Nadu", points: "115,310 135,310 130,360 110,355 105,330" },
  { id: "kerala", name: "Kerala", points: "95,295 115,310 105,330 95,330" },
  { id: "ap-telangana", name: "AP & Telangana", points: "130,205 165,225 155,255 135,310 120,250" },
  { id: "odisha", name: "Odisha", points: "165,165 195,175 180,215 165,225" },
  { id: "west-bengal", name: "West Bengal", points: "230,138 245,145 235,185 220,165 215,162" },
  { id: "north-east", name: "North East States", points: "245,120 275,115 285,140 265,145 250,135" }
];

const IndiaSilhouette = () => (
  <svg 
    viewBox="0 0 64 64" 
    fill="currentColor" 
    className="w-12 h-12 text-white opacity-95"
  >
    <path d="M28,8 L30,4 L34,4 L38,8 L40,11 L43,11 L43,14 L41,16 L40,18 L39,21 L35,22 L33,26 L30,28 L28,33 L26,35 L26,38 L25,41 L23,43 L21,46 L20,49 L18,52 L16,55 L13,57 L11,57 L10,54 L11,51 L10,48 L8,47 L6,46 L5,44 L5,41 L7,40 L9,40 L10,38 L11,35 L12,33 L14,31 L14,29 L12,27 L11,25 L12,22 L11,19 L9,17 L7,16 L5,15 L4,13 L5,11 L7,10 L9,10 L10,8 L11,6 L12,4 L14,3 L16,3 Z" />
  </svg>
);

export default function ElectionsPage() {
  const [selectedState, setSelectedState] = useState<string>("uttar-pradesh");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeStateData = statesDatabase[selectedState] || statesDatabase["uttar-pradesh"];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const campaigns = [
    {
      title: "Jan Sampark Abhiyan",
      desc: "Connecting every village, every family",
      image: "/assets/image_27_43.png",
      states: "15 States",
      volunteers: "12,500+",
    },
    {
      title: "Kisan Samvad Yatra",
      desc: "Farmers first, always first",
      image: "/assets/image_27_46.png",
      states: "12 States",
      volunteers: "9,800+",
    },
    {
      title: "Yuva Sankalp Rally",
      desc: "Empowering youth, building tomorrow",
      image: "/assets/image_27_48.png",
      states: "10 States",
      volunteers: "15,200+",
    },
  ];

  const stats = [
    { label: "States", value: "18", desc: "Where we are campaigning", icon: "india" },
    { label: "Candidates", value: "320+", desc: "Strong candidates across India", icon: Users },
    { label: "Constituencies", value: "450+", desc: "Fighting for people, fighting for change", icon: MapPin },
    { label: "Volunteers", value: "50,000+", desc: "People powering Lokdal's mission", icon: Users },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* ── SECTION 1: HERO SECTION ── */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-36 px-4 sm:px-8 lg:px-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/elections bg image.png"
            alt="Elections Campaign Background"
            fill
            className="object-cover object-right lg:object-center"
            priority
          />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-8 flex flex-col items-start pl-4 lg:pl-12">
            <span className="inline-block text-xs sm:text-sm font-black uppercase tracking-widest text-[#0b4d21] bg-[#0b4d21]/10 px-4 py-2 rounded-full mb-6">
              LOKDAL ELECTION 2029
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] mb-6 tracking-tight">
              India Needs <span className="text-[#0b4d21]">Change.</span><br />
              Farmers Need <span className="text-[#0b4d21]">Justice.</span><br />
              Youth Need <span className="text-[#0b4d21]">Opportunity.</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
              Join Lokdal's nationwide movement for a stronger, self-reliant and farmer-focused India.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/join" 
                className="bg-[#0b4d21] hover:bg-[#073616] text-white px-6 py-4 rounded-xl font-bold text-base flex items-center gap-2.5 shadow-md shadow-green-900/10 transition-all hover:-translate-y-0.5"
              >
                <Users size={18} />
                Join Campaign
              </Link>
              <Link 
                href="#tracker" 
                className="border-2 border-[#0b4d21] text-[#0b4d21] bg-white hover:bg-green-50 px-6 py-4 rounded-xl font-bold text-base flex items-center gap-2.5 transition-all"
              >
                <FileText size={18} className="text-[#0b4d21]" />
                View Election Plan
              </Link>
            </div>
          </div>

          {/* Right column empty to show background image graphics */}
          <div className="lg:col-span-4 min-h-[150px] lg:min-h-0" />
        </div>
      </section>

      {/* ── SECTION 2: STATE ELECTION TRACKER ── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-16 bg-white w-full border-t border-gray-100" id="tracker">
        <div className="w-full">
          
          {/* Overlapping Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-20 -mt-32 mb-20">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={i} 
                  className="bg-[#0b4d21] text-white rounded-2xl p-6 flex items-center gap-5 shadow-lg border border-[#093e1a] relative overflow-hidden group hover:-translate-y-1 transition-all animate-fade-in-up"
                >
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl">
                    {stat.icon === "india" ? (
                      <IndiaSilhouette />
                    ) : typeof IconComponent !== "string" ? (
                      <IconComponent size={28} className="text-white" strokeWidth={1.5} />
                    ) : null}
                  </div>
                  <div>
                    <h4 className="text-3xl font-black leading-none mb-1">{stat.value}</h4>
                    <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1.5">{stat.label}</p>
                    <p className="text-xs text-green-100/70 leading-snug">{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-widest text-[#0b4d21] bg-[#0b4d21]/10 px-4 py-1.5 rounded-full mb-3">
                STATE ELECTION TRACKER
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Know Your State. <span className="text-[#0b4d21]">Track The Change.</span>
              </h2>
            </div>

            {/* Selector Dropdown for Mobile / Tablet */}
            <div className="mt-6 md:mt-0 relative w-full sm:w-64">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Select State</label>
              <div className="relative">
                <select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0b4d21] focus:ring-1 focus:ring-[#0b4d21] cursor-pointer"
                >
                  {Object.values(statesDatabase).map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Map Column */}
            <div className="lg:col-span-5 bg-gray-50 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border border-gray-100 min-h-[360px]">
              <div className="w-full flex items-center justify-between mb-4 border-b border-gray-200/60 pb-3">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Interactive Map</span>
                <span className="text-[11px] font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-md">Click a state to track</span>
              </div>
              
              <div className="w-full max-w-[320px] aspect-square relative flex items-center justify-center">
                <svg viewBox="0 0 320 380" className="w-full h-full max-h-[340px]">
                  {/* Base non-campaign regions */}
                  <g fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
                    {baseRegions.map((region) => (
                      <polygon 
                        key={region.id} 
                        points={region.points} 
                        className="transition-colors hover:fill-slate-200"
                      />
                    ))}
                  </g>

                  {/* Active/Selectable States */}
                  <g stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                    {mapPolygons.map((polygon) => {
                      const isSelected = selectedState === polygon.id;
                      const stateInfo = statesDatabase[polygon.id];
                      
                      // Theme colors based on status and selection
                      let fillCol = "#e2e8f0"; // fallback
                      if (isSelected) {
                        fillCol = "#0b4d21";
                      } else if (stateInfo?.status === "Active Campaign") {
                        fillCol = "#a7f3d0"; // light green
                      } else {
                        fillCol = "#e2e8f0"; // light gray
                      }

                      return (
                        <polygon 
                          key={polygon.id} 
                          points={polygon.points} 
                          fill={fillCol}
                          onClick={() => setSelectedState(polygon.id)}
                          className="cursor-pointer transition-all duration-300 hover:opacity-90 hover:stroke-green-600"
                        />
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>

            {/* Campaign Progress / Stats Panel Column */}
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    {activeStateData.name}
                  </h3>
                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                    activeStateData.status === "Active Campaign" 
                      ? "bg-green-100 text-green-700" 
                      : activeStateData.status === "Upcoming Campaign"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {activeStateData.status}
                  </span>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Candidates", value: activeStateData.candidates },
                    { label: "Seats", value: activeStateData.seats },
                    { label: "Upcoming Rallies", value: activeStateData.rallies },
                    { label: "Volunteers", value: activeStateData.volunteers }
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-black text-gray-800">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-bold text-gray-500 uppercase tracking-wider text-xs">Campaign Progress</span>
                    <span className="font-black text-[#0b4d21]">{activeStateData.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#0b4d21] to-[#10b981] h-full rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${activeStateData.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <Link 
                href="/join" 
                className="w-full border-2 border-[#0b4d21] hover:bg-green-50 text-[#0b4d21] font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
              >
                View State Campaign
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* States Sidebar List */}
            <div className="lg:col-span-3 bg-gray-50 rounded-3xl p-5 border border-gray-100 flex flex-col justify-between max-h-[500px]">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3 px-2 border-b border-gray-200/50 pb-2">All States</p>
                <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[340px] pr-1 scrollbar-thin">
                  {Object.values(statesDatabase).map((state) => {
                    const isSelected = selectedState === state.id;
                    return (
                      <button
                        key={state.id}
                        onClick={() => setSelectedState(state.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between border ${
                          isSelected 
                            ? "bg-green-50 text-[#0b4d21] border-[#0b4d21]/20 font-black shadow-sm" 
                            : "bg-white text-gray-600 hover:bg-white border-transparent hover:border-gray-200"
                        }`}
                      >
                        {state.name}
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0b4d21]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <a 
                href="#tracker"
                className="w-full border border-gray-200 bg-white text-gray-700 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mt-4"
              >
                View All States
                <ChevronRight size={14} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: ONGOING CAMPAIGNS ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#f4faf6] w-full border-t border-gray-100">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-widest text-[#0b4d21] bg-[#0b4d21]/10 px-4 py-1.5 rounded-full mb-3">
                ONGOING CAMPAIGNS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Our Campaigns. <span className="text-[#0b4d21]">Our Commitment.</span>
              </h2>
            </div>

            {/* Slider Control Buttons */}
            <div className="flex gap-3 mt-6 sm:mt-0">
              <button 
                onClick={() => handleScroll("left")}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => handleScroll("right")}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards slider */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          >
            {campaigns.map((camp, i) => (
              <div 
                key={i} 
                className="w-full sm:w-[360px] flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 transition-all snap-start flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-100">
                    <Image 
                      src={camp.image} 
                      alt={camp.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-black text-gray-900 mb-2 leading-snug">
                      {camp.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {camp.desc}
                    </p>
                  </div>
                </div>

                {/* Footer specs banner */}
                <div className="bg-[#0b4d21] text-white px-6 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
                    <span>{camp.states}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{camp.volunteers}</span>
                    <span className="text-[10px] text-green-300">Participants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              href="/join" 
              className="bg-transparent hover:bg-[#0b4d21] border-2 border-[#0b4d21] text-[#0b4d21] hover:text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all group"
            >
              View All Campaigns
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
