import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";

interface SiteEvent {
  _id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  detail: string;
  level: "national" | "state";
  image?: string;
}

const fallbackEventImages = [
  "/assets/kisan.jpg",
  "/assets/samman-2.jpg",
  "/assets/p2.jpg",
  "/assets/charan head.jpeg",
  "/assets/gallery head.jpeg",
  "/assets/24.jpeg",
  "/assets/12 (1).jpeg",
  "/assets/3.jpg",
];

function fallbackEventImage(index: number) {
  return fallbackEventImages[index % fallbackEventImages.length];
}

async function getEvents(): Promise<SiteEvent[]> {
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return events.map((e: any) => ({ ...e, _id: e._id.toString() }));
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function UpcomingEventsPage() {
  const events = await getEvents();

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">Upcoming Events</h1>

        {events.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm font-bold">
            No upcoming events at the moment. Please check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {events.map((event, index) => (

              <article
                key={event._id}
                className="group min-w-0 rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="relative h-44 overflow-visible">
                  <Image
                    src={event.image ?? fallbackEventImage(index)}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-0 left-3 bg-[#0b4d21] text-white text-center px-2.5 py-1.5 rounded-b-md shadow-md">
                    <div className="text-lg font-black leading-none">{event.day}</div>
                    <div className="text-[10px] font-bold leading-tight">{event.month}</div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-green-50 border-2 border-white flex items-center justify-center shadow-md">
                    <Users size={16} className="text-[#0b4d21]" strokeWidth={2.4} />
                  </div>
                </div>

                <div className="pt-6 px-4 pb-4 border-b-[3px] border-[#0b4d21]">
                  <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-3 leading-tight min-h-[36px]">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-[#0b4d21]" fill="#0b4d21" />
                      {event.place}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-[#0b4d21]" />
                      {event.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[48px]">{event.detail}</p>
                
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

