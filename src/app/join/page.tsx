"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Send, CheckCircle2, ChevronDown, User, MapPin } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

const STATES = [
  "Uttar Pradesh", "Haryana", "Rajasthan", "Bihar", "Madhya Pradesh",
  "Kerala", "Punjab", "Maharashtra", "Delhi", "Other",
];

const INTERESTS = [
  "Volunteer / Ground Worker",
  "Youth Wing",
  "Farmer Outreach",
  "Social Media & Digital",
  "Election Campaign",
  "General Member",
];

type Step = "mobile" | "otp" | "profile" | "done";

export default function JoinPage() {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [interest, setInterest] = useState("");
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullMobile = useMemo(() => `${countryCode.code}${mobile}`, [countryCode.code, mobile]);

  const handleSendOtp = () => {
    setError("");
    if (mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!agreed) {
      setError("Please accept the terms to continue.");
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    if (otp !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    setStep("profile");
  };

  const handleSubmitProfile = () => {
    setError("");
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!state) {
      setError("Please select your state.");
      return;
    }
    if (!district.trim()) {
      setError("Please enter your district.");
      return;
    }
    if (!interest) {
      setError("Please select how you'd like to contribute.");
      return;
    }
    setStep("done");
  };

  const resetForm = () => {
    setStep("mobile");
    setMobile("");
    setOtp("");
    setGeneratedOtp("");
    setName("");
    setState("");
    setDistrict("");
    setInterest("");
    setAgreed(false);
    setError("");
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="relative w-full" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/join hero img.png"
            alt="Join Lokdal Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 48px 0 rgba(11,77,33,0.18), 0 2px 16px 0 rgba(0,0,0,0.10)" }}
          >
            <div className="flex flex-col items-center pt-8 pb-4 px-6">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-[#e6f2ea] flex items-center justify-center shadow mb-2 overflow-hidden">
                <Image src="/assets/logo.png" alt="Lokdal Logo" width={64} height={64} className="object-contain w-16 h-16" />
              </div>
              <h1 className="text-lg font-black text-gray-800 mt-1 text-center leading-snug">
                {step === "done" ? "Welcome to Lokdal!" : "Join the Lokdal Movement"}
              </h1>
              {step !== "done" && (
                <p className="text-xs text-gray-500 text-center mt-1">
                  Step {step === "mobile" ? 1 : step === "otp" ? 2 : 3} of 3
                </p>
              )}
            </div>

            {step === "mobile" && (
              <>
                <div className="px-6 pb-2">
                  <div className="flex items-center justify-center gap-3 bg-[#0b4d21] text-white rounded-xl px-5 py-3.5 font-black text-xl tracking-wider shadow mb-3">
                    <Phone size={22} strokeWidth={2.5} />
                    88 00 00 2024
                  </div>
                  <p className="text-center text-gray-600 font-semibold text-sm mb-4">
                    Give a missed call or register below
                  </p>
                </div>

                <div className="flex items-center px-6 my-2 gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs font-black text-gray-400 tracking-widest px-2 py-1 rounded-full border border-gray-200 bg-gray-50">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="px-6 pb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    Enter Your Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative" ref={dropdownRef}>
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
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Mobile Number"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={mobile.length < 10 || !agreed}
                      className="flex items-center gap-1.5 bg-[#0b4d21] hover:bg-[#073616] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm px-3.5 py-2.5 rounded-xl transition-all shadow-sm whitespace-nowrap"
                    >
                      <Send size={14} />
                      OTP
                    </button>
                  </div>

                  <label className="flex items-start gap-2.5 mt-4 cursor-pointer group">
                    <div
                      onClick={() => setAgreed((v) => !v)}
                      className={`mt-0.5 rounded border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
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
                    <span className="text-xs text-gray-500 leading-snug">
                      I certify that the information provided is correct. All further communication will be sent to this number.
                    </span>
                  </label>
                </div>
              </>
            )}

            {step === "otp" && (
              <div className="px-6 pb-6">
                <p className="text-sm text-gray-600 text-center mb-1">
                  OTP sent to <span className="font-bold text-gray-900">{fullMobile}</span>
                </p>
                <p className="text-[10px] text-[#0b4d21] font-bold text-center mb-4">
                  Demo OTP: {generatedOtp}
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-black tracking-[0.4em] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] mb-4"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-sm py-3 rounded-xl transition-all mb-2"
                >
                  Verify OTP
                </button>
                <button type="button" onClick={() => { setStep("mobile"); setOtp(""); setError(""); }} className="w-full text-xs font-bold text-gray-500 hover:text-[#0b4d21]">
                  Change mobile number
                </button>
              </div>
            )}

            {step === "profile" && (
              <div className="px-6 pb-6 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1"><User size={12} className="inline mr-1" />Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1"><MapPin size={12} className="inline mr-1" />State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] bg-white"
                  >
                    <option value="">Select your state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">District *</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Your district"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">How would you like to contribute? *</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] bg-white"
                  >
                    <option value="">Select interest area</option>
                    {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleSubmitProfile}
                  className="w-full bg-[#0b4d21] hover:bg-[#073616] text-white font-black text-sm py-3.5 rounded-xl transition-all mt-2"
                >
                  Complete Registration
                </button>
              </div>
            )}

            {step === "done" && (
              <div className="flex flex-col items-center px-6 py-8 gap-3">
                <CheckCircle2 size={56} className="text-[#0b4d21]" strokeWidth={1.5} />
                <p className="text-[#0b4d21] font-black text-lg text-center">Registration Successful!</p>
                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  Thank you, <span className="font-bold text-gray-700">{name}</span>! You are now part of Lokdal as a{" "}
                  <span className="font-bold text-gray-700">{interest}</span> member from{" "}
                  <span className="font-bold text-gray-700">{district}, {state}</span>.
                </p>
                <button type="button" onClick={resetForm} className="mt-2 text-xs font-bold text-[#0b4d21] underline underline-offset-2">
                  Register another member
                </button>
              </div>
            )}

            {error && step !== "done" && (
              <p className="px-6 pb-4 text-xs font-bold text-red-500 text-center">{error}</p>
            )}

            {step === "mobile" && (
              <div className="px-6 pt-2 pb-6">
                <p className="text-center text-[10px] text-gray-400">
                  By joining, you agree to our{" "}
                  <span className="text-[#0b4d21] font-semibold cursor-pointer hover:underline">Terms & Conditions</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 C360 0, 1080 0, 1440 60 L1440 60 L0 60 Z" fill="white" fillOpacity="0.95" />
          </svg>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b4d21] mb-3">Why Join Lokdal?</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-12">
            Be part of a movement that fights for farmers, empowers youth, and builds a progressive India.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: "🌾", title: "Farmers First", desc: "Committed to the rights and prosperity of every farmer across India." },
              { icon: "🤝", title: "United Community", desc: "Join millions of supporters working together for social justice." },
              { icon: "🚀", title: "Youth Empowerment", desc: "Creating opportunities and a better future for the youth of India." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center bg-[#f4faf6] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
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
