"use client";

import {
  CalendarDays,
  GraduationCap,
  Landmark,
  MapPin,
  Sprout,
  Tractor,
  UserRound,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "500+",
    label: "Districts Reached",
  },
  {
    icon: Users,
    value: "2,500+",
    label: "Public Meetings Conducted",
  },
  {
    icon: Tractor,
    value: "1 Lakh+",
    label: "Farmers Benefited",
  },
  {
    icon: UserRound,
    value: "50,000+",
    label: "Youth Volunteers",
  },
];

const milestones = [
  {
    year: "2024",
    items: ["Organized National Farmers Convention", "Expanded presence in 20+ districts"],
  },
  {
    year: "2023",
    items: ["Youth Leadership Campaign launched", "Public welfare initiatives across multiple states"],
  },
  {
    year: "2022",
    items: ["Membership drive crossed major milestone", "State-level organizational expansion"],
  },
];

const cards = [
  {
    title: "Farmers Welfare",
    text: "Supporting farmers through awareness campaigns and policy advocacy.",
    icon: Sprout,
    visual: "from-lime-700 via-green-100 to-emerald-50",
  },
  {
    title: "Education Support",
    text: "Scholarships, awareness programs, and youth development initiatives.",
    icon: GraduationCap,
    visual: "from-sky-700 via-blue-100 to-slate-50",
  },
  {
    title: "Social Welfare",
    text: "Community outreach and public welfare activities across regions.",
    icon: Users,
    visual: "from-amber-700 via-orange-100 to-green-50",
  },
  {
    title: "Grassroots Development",
    text: "Strengthening local leadership and organizational networks.",
    icon: Landmark,
    visual: "from-green-700 via-slate-100 to-blue-50",
  },
];

function AchievementPhoto({ visual }: { visual: string }) {
  return (
    <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${visual}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.65),transparent_24%),radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.45),transparent_22%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/25 to-transparent" />
      <div className="absolute bottom-3 left-5 flex items-end gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="block h-10 w-7 rounded-t-full bg-white/85 shadow-sm" />
        ))}
      </div>
      <div className="absolute bottom-4 right-5 h-12 w-24 rounded-t-full border-t-2 border-white/70" />
      <div className="absolute bottom-2 right-12 h-14 w-0.5 bg-white/80" />
      <div className="absolute bottom-11 right-12 h-5 w-9 rounded-sm bg-[#0b4d21]" />
    </div>
  );
}

export default function Achievements() {
  return (
    <section className="w-full bg-white py-12">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="mb-8">
          <h2 className="mb-3 text-3xl font-black text-[#0b4d21] sm:text-4xl">
            Our Achievement
          </h2>
          <p className="max-w-3xl text-sm font-medium leading-5 text-black">
            Our commitment to public welfare, farmers, youth, and grassroots
            development continues to create measurable impact across India.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 hidden h-24 bg-[linear-gradient(to_bottom,rgba(11,77,33,0.08),transparent)] lg:block" />

          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-lg border border-green-300 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full bg-green-100 text-[#0b4d21]">
                    <Icon size={42} fill="currentColor" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="text-3xl font-black leading-tight text-[#0b4d21]">
                      {value}
                    </div>
                    <div className="max-w-[150px] text-sm font-black leading-5 text-black">
                      {label}
                    </div>
                    <div className="mt-3 h-0.5 w-10 bg-[#0b4d21]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-6 rounded-lg border border-green-300 bg-white px-6 py-5">
            <div className="absolute -top-2 left-[8%] h-4 w-4 rounded-full bg-[#0b4d21]" />
            <div className="absolute -top-2 left-[41%] h-4 w-4 rounded-full bg-[#0b4d21]" />
            <div className="absolute -top-2 left-[72%] h-4 w-4 rounded-full bg-[#0b4d21]" />

            <div className="grid gap-8 lg:grid-cols-3">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex gap-6 ${
                    index === milestones.length - 1
                      ? ""
                      : "lg:border-r lg:border-dashed lg:border-green-400"
                  }`}
                >
                  <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full bg-[#0b4d21] text-white shadow-md">
                    <CalendarDays size={31} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-black text-[#0b4d21]">
                      {milestone.year}
                    </h3>
                    <ul className="space-y-2 text-sm font-medium leading-5 text-black">
                      {milestone.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0b4d21]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ title, text, icon: Icon, visual }) => (
              <article
                key={title}
                className="overflow-hidden rounded-lg border border-green-300 bg-white text-center shadow-sm"
              >
                <div className="relative">
                  <AchievementPhoto visual={visual} />
                  <div className="absolute -bottom-8 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full bg-green-50 text-[#0b4d21] shadow-md">
                    <Icon size={34} fill="currentColor" strokeWidth={2.1} />
                  </div>
                </div>
                <div className="px-6 pb-5 pt-10">
                  <h3 className="mb-3 text-lg font-black text-[#0b4d21]">
                    {title}
                  </h3>
                  <p className="mx-auto min-h-[50px] max-w-[250px] text-sm font-medium leading-6 text-black">
                    {text}
                  </p>
                  <div className="mx-auto mt-4 h-0.5 w-10 bg-[#0b4d21]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
