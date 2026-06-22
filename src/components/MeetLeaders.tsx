"use client";

import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "./LanguageProvider";

export default function MeetLeaders() {
  const { t } = useTranslation();
  const leaders = [
    { name: "Chaudhary Charan Singh", title: "Founder & Inspiration", image: "/assets/charan profile.jpg" },
    { name: "Chaudhary Sunil Singh", title: "National President", image: "/assets/sunil profile.jpg" },
    { name: "Chaudhary Rajinder Singh", title: "National General Secretary", image: "/assets/Rajinder Singh.png" },
    { name: "Chaudhary Mahesh Singh", title: "National Vice President", image: "/assets/featured1.jpg" },
    { name: "Chaudhary Balraj Singh", title: "National Secretary", image: "/assets/featured3.jpg" },
  ];

  const leaderLinks = [
    "/about/chaudhary-charan-singh",
    "/about/chaudhary-sunil-singh",
    "/about/chaudhary-charan-singh",
    "/about/chaudhary-charan-singh",
    "/about/chaudhary-charan-singh",
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 italic mb-2">{t("Meet Our Leaders")}</h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
              {t("Dedicated leaders working day and night for the welfare of farmers, youth, and every citizen together, we are building a stronger, self-reliant and progressive India")}
            </p>
          </div>
        </div>

        <div className="relative sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {leaders.map((leader, idx) => (
              <Link
                href={leaderLinks[idx]}
                key={idx}
                className="bg-green-50/60 rounded-xl p-2.5 pb-3 flex flex-col items-center text-center group cursor-pointer hover:shadow-md transition-shadow border border-green-100/50"
              >
                <div className="w-full h-52 sm:h-64 lg:h-80 bg-gradient-to-b from-green-100/80 to-green-50 rounded-lg mb-2 overflow-hidden relative">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover object-top" />
                </div>
                <h3 className="font-bold text-[10px] sm:text-xs text-gray-900 group-hover:text-[#0b4d21] transition-colors mb-0.5 leading-tight">
                  {leader.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#0b4d21] font-medium italic mb-2">{t(leader.title)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

