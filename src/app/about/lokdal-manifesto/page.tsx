"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";

const pillars = [
  {
    icon: "🌾",
    title: "Farmers First",
    desc: "Guarantee minimum support price for all crops, full debt waiver for farmers, and free electricity for agricultural use.",
  },
  {
    icon: "⚖️",
    title: "Social Justice",
    desc: "Equal rights and opportunities for Dalits, OBCs and minorities. Strict implementation of reservation policies and elimination of caste-based discrimination.",
  },
  {
    icon: "📚",
    title: "Education for All",
    desc: "Free and quality education up to the university level for every child. Special focus on rural and government schools.",
  },
  {
    icon: "🏥",
    title: "Healthcare",
    desc: "Universal healthcare coverage for every citizen. Free medicine and treatment at government hospitals. One doctor per 1,000 people in rural areas.",
  },
  {
    icon: "💼",
    title: "Employment",
    desc: "Guaranteed employment for the youth. Skill development programs and support for small and medium enterprises.",
  },
  {
    icon: "🚰",
    title: "Rural Development",
    desc: "Clean drinking water, electricity, roads and sanitation for every village. Special funds for the development of backward regions.",
  },
  {
    icon: "🤝",
    title: "Women Empowerment",
    desc: "33% reservation for women in all government jobs and elected bodies. Protection from domestic violence and equal pay for equal work.",
  },
  {
    icon: "🌿",
    title: "Environment",
    desc: "Protecting rivers, forests and land from exploitation. Promoting sustainable farming and renewable energy sources.",
  },
];

export default function LokdalManifestoPage() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* Title Bar */}
      <div className="w-full bg-[#0b4d21] py-10 px-4 sm:px-8 lg:px-16 text-center">
        <p className="text-green-300 text-xs font-black tracking-[0.2em] uppercase mb-2">{t("Our Achievement")}</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Lokdal Manifesto</h1>
        <p className="text-green-200 text-sm mt-2 font-medium">लोकदल का घोषणापत्र</p>
      </div>

      {/* Intro */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-2">Our Promise to India</p>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">पारिवर्तन है, विकल्प है</h2>
          <div className="w-8 h-0.5 bg-[#0b4d21] mb-5" />
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            The Lokdal Manifesto is our solemn promise to the people of India — especially to the farmers,
            the workers, the youth and the marginalised communities who have long been ignored by mainstream
            politics. We believe in a society built on truth, equality and shared prosperity.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            Inspired by the ideals of Chaudhary Charan Singh, our manifesto commits to putting the last person
            first — because a nation's greatness is measured by how well it treats its most vulnerable citizens.
          </p>
          <a
            href="/assets/Lokdal Manifesto.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0b4d21] text-white font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#073616] transition-colors"
          >
            {t("Read More")}
          </a>
        </div>
      </section>

      {/* Pillars */}
      <section className="w-full px-4 sm:px-8 lg:px-16 pb-14">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Key Commitments</h2>
        <div className="w-8 h-0.5 bg-[#0b4d21] mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-2xl mb-3">
                {item.icon}
              </div>
              <h3 className="text-xs font-black text-[#0b4d21] tracking-wide mb-2 leading-tight">{t(item.title)}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{t(item.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
