"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, Phone, Mail, Bookmark, User, Users, ChevronRight } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type IdeologyTag = "all" | "farmers" | "justice" | "democracy" | "education" | "unity";

const FILTER_TABS: { id: IdeologyTag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "farmers", label: "Farmers" },
  { id: "justice", label: "Justice" },
  { id: "democracy", label: "Democracy" },
  { id: "education", label: "Education" },
  { id: "unity", label: "Unity" },
];

const ideologies = [
  {
    icon: "🌾",
    title: "Farmers & Rural First",
    tags: ["farmers"] as IdeologyTag[],
    desc: "Lokdal believes the backbone of India is its farmers and villages. Every policy must prioritise agricultural welfare, fair MSP, debt relief and rural infrastructure.",
    points: ["Minimum Support Price guarantee", "Debt waiver for small farmers", "Free irrigation & electricity", "Rural road & market connectivity"],
  },
  {
    icon: "⚖️",
    title: "Social Justice & Equality",
    tags: ["justice"] as IdeologyTag[],
    desc: "A just society treats every citizen equally regardless of caste, religion or gender. Lokdal stands firm for reservation rights, anti-discrimination laws and equal opportunity.",
    points: ["Full implementation of reservation", "Rights for Dalits & OBCs", "Zero tolerance for discrimination", "Equal pay for equal work"],
  },
  {
    icon: "🚫",
    title: "Zero Corruption",
    tags: ["justice", "democracy"] as IdeologyTag[],
    desc: "Chaudhary Charan Singh's legacy is built on absolute integrity. Lokdal carries that torch — demanding transparent governance and accountability at every level.",
    points: ["Transparent public spending", "Right to Information strengthened", "Independent anti-corruption body", "E-governance for accountability"],
  },
  {
    icon: "👥",
    title: "By the People, For the People",
    tags: ["democracy"] as IdeologyTag[],
    desc: "True democracy means the common person has a voice. Lokdal champions decentralisation, local governance and grassroots participation.",
    points: ["Empowered Panchayati Raj", "Local body elections on time", "Community decision-making", "Decentralised development funds"],
  },
  {
    icon: "📚",
    title: "Education & Youth",
    tags: ["education"] as IdeologyTag[],
    desc: "The future belongs to the youth. Lokdal commits to free quality education, skill development and employment opportunities for every young Indian.",
    points: ["Free education up to university", "Skill development centres", "Guaranteed employment schemes", "Special scholarships for rural youth"],
  },
  {
    icon: "🤝",
    title: "Secularism & Unity",
    tags: ["unity"] as IdeologyTag[],
    desc: "India's strength lies in its diversity. Lokdal is committed to a secular, inclusive India where every community lives with dignity and harmony.",
    points: ["Protection of minority rights", "Communal harmony initiatives", "Equal law for all citizens", "Unity in diversity"],
  },
];

export default function IdeologyOfLokdalPage() {
  const [activeTag, setActiveTag] = useState<IdeologyTag>("all");

  const filteredIdeologies = useMemo(() => {
    if (activeTag === "all") return ideologies;
    return ideologies.filter((item) => item.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/organisation hero.png"
          alt="Ideology of Lokdal"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 flex flex-col items-center text-center">
          <p className="text-green-300 text-xs font-black tracking-[0.2em] uppercase mb-3">Our Beliefs</p>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 drop-shadow-md">
            Ideology of Lokdal
          </h1>
          <p className="text-lg sm:text-xl font-bold text-white max-w-2xl drop-shadow-md">
            Rooted in Truth. Committed to Justice. Built for Every Indian.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 text-gray-700 font-bold whitespace-nowrap">
              <span className="text-[#0b4d21]">🏛️</span>
              Core Principles :
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTag(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    activeTag === tab.id
                      ? "bg-[#0b4d21] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-2">
              <span className="text-[#0b4d21] text-3xl">🌿</span>
              Core Ideology of Lokdal :-
            </h2>
            <p className="text-gray-600 font-medium">
              Inspired by the life and vision of Chaudhary Charan Singh, Lokdal&apos;s ideology is the compass that guides every decision, every movement and every promise we make to the people of India.
            </p>
          </div>

          {filteredIdeologies.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">No principles match this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {filteredIdeologies.map((item) => (
                <div key={item.title} className="bg-white border border-gray-100 hover:border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-2xl flex-shrink-0 border border-green-100">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-800 text-base group-hover:text-[#0b4d21] transition-colors leading-tight mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 border-t border-gray-50 pt-4">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <ChevronRight size={14} className="text-[#0b4d21] flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="bg-[#0b4d21] rounded-2xl p-8 text-white relative overflow-hidden flex items-center min-h-[160px] shadow-sm">
            <div className="relative z-10 w-full sm:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-black italic leading-tight">
                &quot;A nation that ignores its farmers<br />ignores its own foundation.&quot;
              </h3>
              <p className="text-green-300 font-bold text-sm mt-3">— Chaudhary Charan Singh</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-48 h-48 rotate-12">
                <path d="M50 0L100 50L50 100L0 50Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[320px] flex flex-col gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <User size={16} />
              </span>
              About Lokdal
            </h3>
            <p className="text-gray-600 text-sm font-medium leading-relaxed">
              Presently senior social activist and politician Mr. Sunil Singh Ji is its national president. Lok Dal was founded by former Prime Minister Chaudhary Charan Singh, who is considered a messiah by farmers and marginalised communities across India.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <Users size={16} />
              </span>
              Top Profiles
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Chaudhary Charan Singh", role: "Founder & Former PM", href: "/about/chaudhary-charan-singh" },
                { name: "Chaudhary Sunil Singh", role: "National President", href: "/about/chaudhary-sunil-singh" },
                { name: "Chaudhary Rajinder Singh", role: "Senior Leader", href: "/about/chaudhary-charan-singh" },
              ].map((p) => (
                <Link key={p.name} href={p.href} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0 group">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-200">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 leading-tight group-hover:text-[#0b4d21] transition-colors">{p.name}</h4>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mt-0.5">{p.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <Share2 size={16} />
              </span>
              Stay Connected
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link href="https://www.facebook.com/Lokdalindia/" target="_blank" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaFacebookF size={14} />
              </Link>
              <Link href="https://x.com/lokdalindia" target="_blank" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaXTwitter size={14} />
              </Link>
              <Link href="mailto:lokdalparty@gmail.com" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <Mail size={14} />
              </Link>
              <Link href="tel:9810074878" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <Phone size={14} />
              </Link>
              <Link href="https://wa.me/919810074878" target="_blank" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaWhatsapp size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-start gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <Bookmark size={16} />
              </span>
              <h3 className="text-lg font-black text-gray-800">Today&apos;s Pick</h3>
            </div>
            <div className="w-full bg-green-50 rounded-xl p-6 flex flex-col items-center justify-center border border-green-100/50">
              <Image src="/assets/logo.png" alt="Lokdal Logo" width={80} height={80} className="object-contain mb-2" />
              <span className="text-lg font-black text-[#0b4d21]">लोकदल</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
