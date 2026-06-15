"use client";

import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function News() {
  const newsItems = [
    {
      date: "October 10, 2023",
      title: "Kisan Maha Panchayat in Meerut",
      description: "Thousands of farmers gathered to demand fair MSP and discuss agricultural reforms under the leadership of RLD."
    },
    {
      date: "September 25, 2023",
      title: "Youth Employment Campaign Launch",
      description: "RLD launches a statewide campaign focusing on generating employment opportunities for rural youth and students."
    },
    {
      date: "August 15, 2023",
      title: "Independence Day Celebrations & Sankalp",
      description: "Flag hoisting ceremonies held across all district offices with a renewed pledge to serve the marginalized communities."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-3xl font-black text-[#084920] mb-2">Recent Activities</h2>
            <p className="text-gray-500">Stay updated with our latest campaigns and events across the state.</p>
          </div>
          <Link href="#" className="hidden sm:flex items-center gap-2 text-[#084920] font-bold hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="w-full h-48 bg-zinc-200 relative overflow-hidden">
                {/* Dummy Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 font-bold tracking-widest text-sm">NEWS IMAGE PLACEHOLDER</span>
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-[#084920] font-semibold mb-3 bg-green-50 w-fit px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#084920] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <Link href="#" className="text-[#084920] font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="#" className="inline-flex items-center gap-2 text-[#084920] font-bold border-2 border-[#084920] px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
            View All Activities <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
