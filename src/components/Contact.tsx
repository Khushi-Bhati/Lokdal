"use client";

import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [mapView, setMapView] = useState("states"); // states, districts, constituencies

  const events = [
    { title: "Kisan Adhikar Rally", date: "25 Nov 2023", location: "Muzaffarnagar" },
    { title: "Youth Sankalp Camp", date: "02 Dec 2023", location: "Meerut" },
    { title: "Women Empowerment Drive", date: "10 Dec 2023", location: "Baghpat" },
  ];

  return (
    <div className="bg-gray-50">
      {/* Upcoming Events Section */}
      <section className="py-20 w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl font-black text-[#084920] mb-6">Upcoming Events</h2>
            <p className="text-gray-600 mb-8">Join our upcoming events and rallies to be a part of the movement. Your participation strengthens our voice.</p>
            <Link href="#" className="inline-flex items-center gap-2 text-[#084920] font-bold border-b-2 border-[#084920] pb-1 hover:text-green-700 transition-colors">
              View All Events <ArrowRight size={16} />
            </Link>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="flex items-center gap-2 text-yellow-500 font-bold mb-3">
                  <CalendarDays size={18} />
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#084920] transition-colors">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={16} />
                  {event.location}
                </div>
              </div>
            ))}
            
            <div className="bg-[#084920] p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-[#063818] transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Host an Event?</h3>
              <p className="text-green-100 text-sm mb-4">Contact your district president to organize an event in your area.</p>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-yellow-400 group-hover:text-[#084920] transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footprints of Lokdal Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-8 lg:px-16 text-center">
          <h2 className="text-4xl font-black text-[#084920] mb-8">Footprints of Lokdal</h2>
          
          <div className="inline-flex bg-gray-100 p-1 rounded-xl mb-12">
            <button 
              onClick={() => setMapView("states")}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${mapView === "states" ? "bg-white text-[#084920] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              States
            </button>
            <button 
              onClick={() => setMapView("districts")}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${mapView === "districts" ? "bg-white text-[#084920] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Districts
            </button>
            <button 
              onClick={() => setMapView("constituencies")}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${mapView === "constituencies" ? "bg-white text-[#084920] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Constituencies
            </button>
          </div>

          {/* Map Image */}
          <div className="w-full max-w-4xl mx-auto relative">
            <Image
              src="/assets/map.png"
              alt="Footprints of Lokdal - Map"
              width={900}
              height={600}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#084920] mb-6">Be a Part of Change</h2>
          <p className="text-xl text-[#084920]/80 font-medium mb-10">
            Join the Lokdal family today and contribute to building a prosperous, self-reliant, and progressive India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#join" className="bg-[#084920] hover:bg-[#063818] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1">
              Join Lokdal Now
            </Link>
            <Link href="#donate" className="bg-white hover:bg-gray-50 text-[#084920] border-2 border-transparent px-10 py-4 rounded-xl font-bold text-lg transition-all">
              Donate to the Cause
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
