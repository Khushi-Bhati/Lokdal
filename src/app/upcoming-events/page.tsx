import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, MapPin } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";

const socialLinks = {
  facebook: "https://www.facebook.com/Lokdalindia/",
  twitter: "https://x.com/lokdalindia",
  whatsapp: "https://wa.me/919810074878",
};

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
            {events.map((event) => (
              <div
                key={event._id}
                className="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white group"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={event.image || "/assets/kisan.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 bg-white/90 text-[#0b4d21] text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                    <Image src="/assets/logo.png" alt="logo" width={12} height={12} className="object-contain" />
                    लोकदल द्वारा आयोजित
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0b4d21] text-white rounded-lg px-2.5 py-1.5 text-center shadow-md">
                    <div className="text-base font-black leading-none">{event.day}</div>
                    <div className="text-[10px] font-bold leading-tight">{event.month}</div>
                    <div className="text-[9px] leading-tight opacity-80">{event.year}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{event.detail}</p>
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Clock size={12} className="text-[#0b4d21] flex-shrink-0" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin size={12} className="text-[#0b4d21] flex-shrink-0" fill="#0b4d21" /> {event.place}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lokdal on Facebook"
                      className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <FaFacebookF size={11} />
                    </a>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lokdal on X"
                      className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white transition-all"
                    >
                      <FaXTwitter size={11} />
                    </a>
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lokdal on WhatsApp"
                      className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all"
                    >
                      <FaWhatsapp size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
