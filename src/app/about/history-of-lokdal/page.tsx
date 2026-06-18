"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const timeline = [
  {
    year: "1974",
    title: "Foundation of Lokdal",
    desc: "Lokdal was founded by Chaudhary Charan Singh as a political party dedicated to the rights and welfare of farmers, backward classes, and the rural poor of India.",
  },
  {
    year: "1977",
    title: "Rise to National Prominence",
    desc: "Lokdal played a pivotal role in the Janata Party alliance, which swept to power in the historic 1977 general elections, ending the Emergency imposed by the Congress government.",
  },
  {
    year: "1979",
    title: "Prime Ministership",
    desc: "Chaudhary Charan Singh became the 5th Prime Minister of India on 28 July 1979, making Lokdal's vision of farmer-centric governance a national reality.",
  },
  {
    year: "1984",
    title: "Dalit Mazdoor Kisan Party",
    desc: "The party was renamed and restructured to broaden its base, championing the cause of dalits, labourers and kisans across Uttar Pradesh and beyond.",
  },
  {
    year: "1996",
    title: "Rashtriya Lok Dal",
    desc: "Under continued leadership, the party evolved and strengthened its position as the voice of the rural heartland, particularly in western Uttar Pradesh.",
  },
  {
    year: "2023",
    title: "Lokdal Reborn",
    desc: "Under the leadership of Chaudhary Sunil Singh, Lokdal was re-established to carry forward the unfinished mission of Chaudhary Charan Singh — justice, equality and prosperity for every farmer and common citizen.",
  },
];

export default function HistoryOfLokdalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* Title Bar */}
      <div className="w-full bg-[#0b4d21] py-10 px-4 sm:px-8 lg:px-16 text-center">
        <p className="text-green-300 text-xs font-black tracking-[0.2em] uppercase mb-2">Our Journey</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white">History of Lokdal</h1>
        <p className="text-green-200 text-sm mt-2 font-medium">लोकदल का इतिहास</p>
      </div>

      {/* Intro */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-green-100">
              <Image src="/assets/charan profile.jpg" alt="Chaudhary Charan Singh" fill className="object-cover object-top grayscale" />
            </div>
            <div>
              <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-1">Founded by</p>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Chaudhary Charan Singh</h2>
              <div className="w-8 h-0.5 bg-[#0b4d21] mb-4" />
              <p className="text-sm text-gray-600 leading-relaxed">
                Lokdal was born out of the vision of a great leader who believed that the true strength of India lies
                in its villages, its farmers and its common people. From its founding to the present day, Lokdal has
                been the voice of the voiceless — fighting for justice, equality and dignity for every Indian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full px-4 sm:px-8 lg:px-16 pb-14">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Our Timeline</h2>
        <div className="w-8 h-0.5 bg-[#0b4d21] mb-8" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] sm:left-[36px] top-0 bottom-0 w-0.5 bg-green-100" />

          <div className="space-y-6">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-5 sm:gap-7 items-start relative">
                {/* Year badge */}
                <div className="flex-shrink-0 w-14 sm:w-18 flex flex-col items-center z-10">
                  <div className="w-14 h-14 rounded-full bg-[#0b4d21] text-white flex items-center justify-center font-black text-xs text-center leading-tight">
                    {item.year}
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 mt-1">
                  <h3 className="text-sm font-black text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
