"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Globe2,
  Leaf,
  MapPin,
  Megaphone,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

const events = [
  {
    day: "15",
    month: "JUN",
    title: "National Executive Meeting",
    place: "New Delhi",
    time: "11:00 AM",
    detail: "Strategic discussion on strengthening organization and future roadmap.",
    icon: Users,
    tone: "from-green-700 via-green-100 to-gray-100",
  },
  {
    day: "20",
    month: "JUN",
    title: "Farmers' Convention",
    place: "Lucknow, UP",
    time: "02:00 PM",
    detail: "Empowering farmers, discussing issues and sustainable solutions.",
    icon: Leaf,
    tone: "from-lime-700 via-emerald-100 to-stone-100",
  },
  {
    day: "28",
    month: "JUN",
    title: "Youth Leadership Summit",
    place: "Bhopal, MP",
    time: "10:30 AM",
    detail: "Inspiring young minds, building leadership for tomorrow.",
    icon: Star,
    tone: "from-emerald-700 via-sky-100 to-rose-100",
  },
  {
    day: "05",
    month: "JUL",
    title: "Public Outreach Program",
    place: "Patna, Bihar",
    time: "03:00 PM",
    detail: "Connecting with communities, listening to people, working for change.",
    icon: Megaphone,
    tone: "from-slate-700 via-green-100 to-gray-100",
  },
  {
    day: "12",
    month: "JUL",
    title: "National Council Meeting",
    place: "New Delhi",
    time: "11:00 AM",
    detail: "Reviewing progress and planning next steps for nation-building.",
    icon: Users,
    tone: "from-green-800 via-amber-50 to-green-100",
  },
];

function EventVisual({ tone }: { tone: string }) {
  return (
    <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${tone}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.65),transparent_24%),radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.45),transparent_22%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-4 left-5 flex items-end gap-1.5">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="block rounded-full bg-white/85 shadow-sm"
            style={{
              height: `${18 + (index % 4) * 5}px`,
              width: `${9 + (index % 3) * 2}px`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-7 right-5 flex gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index} className="relative block h-16 w-8">
            <span className="absolute bottom-0 left-1/2 h-14 w-0.5 bg-white/80" />
            <span className="absolute left-4 top-0 h-5 w-7 rounded-sm bg-[#0b4d21] shadow-sm" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function UpcomingEvents() {
  return (
    <section className="w-full bg-white py-14 sm:py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="relative overflow-hidden pb-8">
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(11,77,33,0.06),transparent),radial-gradient(circle_at_48%_50%,rgba(11,77,33,0.08),transparent_18%)]" />
          <div className="absolute bottom-0 left-0 right-0 hidden h-16 items-end gap-2 opacity-10 md:flex">
            {Array.from({ length: 44 }).map((_, index) => (
              <span
                key={index}
                className="block rounded-t-full bg-[#0b4d21]"
                style={{
                  height: `${18 + (index % 5) * 7}px`,
                  width: `${9 + (index % 4) * 3}px`,
                }}
              />
            ))}
          </div>
          <CalendarDays
            size={130}
            className="absolute right-[38%] top-0 hidden rotate-[-4deg] text-[#0b4d21]/5 lg:block"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-black text-[#0b4d21] sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="max-w-md text-base font-medium leading-8 text-gray-700">
                Join us in our journey towards a stronger, self-reliant and
                progressive India.
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="mb-6 grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-[#0b4d21] px-5 py-3 text-sm font-bold text-white shadow-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#0b4d21]">
                    <Globe2 size={17} />
                  </span>
                  National Level
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-sm">
                  <MapPin size={18} />
                  In States
                </button>
              </div>

              <div className="ml-auto flex max-w-sm items-center gap-5 rounded-lg bg-[#f3f8f4] p-5">
                <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-[#0b4d21] text-white">
                  <CalendarDays size={28} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0b4d21]">
                    Stay Updated
                  </h3>
                  <p className="text-sm font-medium leading-6 text-gray-700">
                    Don&apos;t miss important events. Be a part of the movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-2">
          <button className="absolute -left-5 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-700 shadow-[0_8px_24px_rgba(15,23,42,0.14)]">
            <ArrowLeft size={20} />
          </button>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {events.map(({ day, month, title, place, time, detail, icon: Icon, tone }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.1)]"
              >
                <div className="relative">
                  <EventVisual tone={tone} />
                  <div className="absolute left-4 top-0 rounded-b-md bg-[#0b4d21] px-3 py-2 text-center font-black text-white shadow-md">
                    <div className="text-xl leading-none">{day}</div>
                    <div className="text-xs leading-tight">{month}</div>
                  </div>
                  <div className="absolute -bottom-5 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-green-50 text-[#0b4d21] shadow-md">
                    <Icon size={24} strokeWidth={2.4} />
                  </div>
                </div>

                <div className="border-b-[3px] border-[#0b4d21] px-5 pb-5 pt-9">
                  <h3 className="mb-4 min-h-[48px] text-lg font-black leading-6 text-gray-950 group-hover:text-[#0b4d21]">
                    {title}
                  </h3>
                  <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#0b4d21]" fill="#0b4d21" />
                      {place}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#0b4d21]" />
                      {time}
                    </span>
                  </div>
                  <p className="mb-7 min-h-[72px] text-sm font-medium leading-6 text-gray-700">
                    {detail}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-3 text-sm font-black text-[#0b4d21]"
                  >
                    View Details <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button className="absolute -right-5 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-700 shadow-[0_8px_24px_rgba(15,23,42,0.14)]">
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg bg-[#0b4d21] shadow-[0_14px_34px_rgba(11,77,33,0.22)]">
          <div className="relative grid gap-6 px-6 py-7 text-white md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%)]" />
            <div className="absolute bottom-0 right-0 hidden h-20 w-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.16),transparent)] md:block" />

            <div className="relative flex items-center gap-5">
              <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full bg-white text-[#0b4d21]">
                <CalendarDays size={34} />
              </div>
              <div>
                <h3 className="text-xl font-black">Be a Part of Change</h3>
                <p className="max-w-md text-sm font-medium leading-6 text-white/90">
                  Your participation can build a stronger and better India for
                  generations to come.
                </p>
              </div>
            </div>

            <div className="relative hidden h-16 w-px bg-white/45 md:block" />

            <div className="relative md:text-center">
              <Link
                href="#"
                className="inline-flex items-center gap-4 rounded-md bg-white px-8 py-3 text-sm font-black text-[#0b4d21] shadow-sm hover:bg-green-50"
              >
                View All Events <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
