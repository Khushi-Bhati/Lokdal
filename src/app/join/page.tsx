"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Send, CheckCircle2, ChevronDown } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

export default function JoinPage() {
  const [mobile, setMobile] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length >= 10 && agreed) {
      setOtpSent(true);
      setTimeout(() => setSubmitted(true), 1200);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ── Hero Section ── */}
      <section className="relative w-full" style={{ minHeight: "calc(100vh - 80px)" }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/join hero img.png"
            alt="Join Lokdal Hero"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Card centered on hero */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 48px 0 rgba(11,77,33,0.18), 0 2px 16px 0 rgba(0,0,0,0.10)" }}
          >
            {/* Card Header */}
            <div className="flex flex-col items-center pt-8 pb-4 px-6">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-[#e6f2ea] flex items-center justify-center shadow mb-2 overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="Lokdal Logo"
                  width={64}
                  height={64}
                  className="object-contain w-16 h-16"
                />
              </div>
              <h1 className="text-lg font-black text-gray-800 mt-1 text-center leading-snug">
                Give a missed call on
              </h1>
            </div>

            {/* Missed Call Button */}
            <div className="px-6 pb-2">
              <div className="flex items-center justify-center gap-3 bg-[#0b4d21] text-white rounded-xl px-5 py-3.5 font-black text-xl tracking-wider shadow">
                <Phone size={22} strokeWidth={2.5} className="text-white" />
                88 00 00 2024
              </div>
              <p className="text-center text-gray-600 font-semibold text-sm mt-3 mb-1">
                and become a part of Lokdal
              </p>
            </div>

            {/* Divider with OR */}
            <div className="flex items-center px-6 my-3 gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-black text-gray-400 tracking-widest px-2 py-1 rounded-full border border-gray-200 bg-gray-50">
                or
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Mobile Input */}
            <div className="px-6 pb-2">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Enter Your Mobile Number <span className="text-red-500">*</span>
              </label>

              {submitted ? (
                <div className="flex flex-col items-center py-6 gap-3">
                  <CheckCircle2 size={48} className="text-[#0b4d21]" strokeWidth={1.5} />
                  <p className="text-[#0b4d21] font-black text-base text-center">
                    OTP Sent Successfully!
                  </p>
                  <p className="text-gray-500 text-xs text-center">
                    Please check your mobile for the OTP.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    {/* Country Code Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((v) => !v)}
                        className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors min-w-[72px]"
                      >
                        <span>{countryCode.flag}</span>
                        <span>{countryCode.code}</span>
                        <ChevronDown size={12} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1">
                          {COUNTRY_CODES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c); setDropdownOpen(false); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-green-50 hover:text-[#0b4d21] transition-colors"
                            >
                              <span>{c.flag}</span>
                              <span className="font-bold">{c.code}</span>
                              <span className="text-gray-400 text-xs">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/, "").slice(0, 10))}
                      placeholder="Enter Mobile Number"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                    />

                    {/* Send OTP Button */}
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={mobile.length < 10 || !agreed}
                      className="flex items-center gap-1.5 bg-[#0b4d21] hover:bg-[#073616] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm px-3.5 py-2.5 rounded-xl transition-all shadow-sm whitespace-nowrap"
                    >
                      <Send size={14} />
                      Send OTP
                    </button>
                  </div>

                  {/* Agree Checkbox */}
                  <label className="flex items-start gap-2.5 mt-4 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        onClick={() => setAgreed((v) => !v)}
                        className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                          agreed ? "bg-[#0b4d21] border-[#0b4d21]" : "bg-white border-gray-300 group-hover:border-[#0b4d21]"
                        }`}
                        style={{ width: 18, height: 18 }}
                      >
                        {agreed && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 leading-snug">
                      I certify that above provided information is correct and there is no mistake. I know that all further communication will be done on above provided details
                    </span>
                  </label>
                </>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-6 pt-3 pb-6">
              {!submitted && (
                <p className="text-center text-[10px] text-gray-400">
                  By joining, you agree to our{" "}
                  <span className="text-[#0b4d21] font-semibold cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 C360 0, 1080 0, 1440 60 L1440 60 L0 60 Z" fill="white" fillOpacity="0.95" />
          </svg>
        </div>
      </section>

      {/* ── Why Join Section ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b4d21] mb-3">
            Why Join Lokdal?
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-12">
            Be part of a movement that fights for farmers, empowers youth, and builds a progressive India.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🌾",
                title: "Farmers First",
                desc: "Committed to the rights and prosperity of every farmer across India.",
              },
              {
                icon: "🤝",
                title: "United Community",
                desc: "Join millions of supporters working together for social justice.",
              },
              {
                icon: "🚀",
                title: "Youth Empowerment",
                desc: "Creating opportunities and a better future for the youth of India.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center bg-[#f4faf6] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-5xl mb-4">{icon}</span>
                <h3 className="text-lg font-black text-[#0b4d21] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
