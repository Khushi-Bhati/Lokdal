"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "./LanguageProvider";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full h-[480px] sm:h-[540px] flex items-center bg-[#084920] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/hero image.png" alt="Hero background" fill className="object-cover object-center" priority />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-black text-[#0b4d21] leading-tight mb-3 sm:mb-4 drop-shadow-sm">
          {t("पारवर्तन है,")}<br />{t("विकल्प है")} <span className="text-[#0b4d21]">{t("लोकदल")}</span>
        </h1>
        <p className="text-xs sm:text-base text-gray-800 font-medium mb-6 sm:mb-8 flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-1.5 items-center justify-center px-2">
          <span>{t("शिक्षा का अधिकार")}</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span>{t("भ्रष्टाचार का विरोध")}</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span>{t("किसान का सम्मान")}</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span>{t("समाज का उत्थान")}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full px-4 sm:px-0 sm:w-auto">
          <Link href="/join" className="bg-[#0b4d21] hover:bg-[#073616] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md">
            {t("हमारे साथ जुड़ें")} <ArrowRight size={16} />
          </Link>
          <Link href="/about/chaudhary-charan-singh" className="border-2 border-[#0b4d21] text-[#0b4d21] bg-white/70 hover:bg-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all">
            {t("लोकदल के बारे में")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
