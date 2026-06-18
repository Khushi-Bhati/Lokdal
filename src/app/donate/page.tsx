"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, CheckCircle2, Smartphone, CreditCard, Building2 } from "lucide-react";

const AMOUNTS = [500, 1000, 2100, 5000, 11000, 21000];

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Building2 },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [donated, setDonated] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleDonate = () => {
    if (!finalAmount || finalAmount < 1) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDonated(true);
    }, 1500);
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
            alt="Donate Hero"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />
        </div>

        {/* Card centered on hero */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 48px 0 rgba(11,77,33,0.20), 0 2px 16px 0 rgba(0,0,0,0.12)" }}
          >
            {/* Card Header */}
            <div className="flex flex-col items-center pt-8 pb-3 px-6">
              <div className="w-16 h-16 rounded-full bg-[#f4faf6] border-4 border-[#e6f2ea] flex items-center justify-center shadow mb-2">
                <Heart size={28} className="text-[#0b4d21] fill-[#0b4d21]" />
              </div>
              <h1 className="text-xl font-black text-gray-800 mt-1 text-center leading-snug">
                दान करें / Donate
              </h1>
              <p className="text-xs text-gray-400 text-center mt-1">
                Support the movement for a better India
              </p>
            </div>

            {donated ? (
              /* ── Success State ── */
              <div className="flex flex-col items-center px-6 py-10 gap-3">
                <CheckCircle2 size={56} className="text-[#0b4d21]" strokeWidth={1.5} />
                <p className="text-[#0b4d21] font-black text-lg text-center">
                  Thank You! 🙏
                </p>
                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  Your donation of{" "}
                  <span className="font-black text-gray-700">₹{finalAmount?.toLocaleString("en-IN")}</span>{" "}
                  has been received. You are now part of the change!
                </p>
                <button
                  onClick={() => { setDonated(false); setCustomAmount(""); setSelectedAmount(1000); }}
                  className="mt-2 text-xs font-bold text-[#0b4d21] underline underline-offset-2"
                >
                  Donate Again
                </button>
              </div>
            ) : (
              <>
                {/* ── Amount Selection ── */}
                <div className="px-6 pb-2">
                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    Select Amount (₹)
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        className={`rounded-xl py-2 text-sm font-black border-2 transition-all ${
                          selectedAmount === amt && !customAmount
                            ? "bg-[#0b4d21] text-white border-[#0b4d21] shadow"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0b4d21] hover:text-[#0b4d21]"
                        }`}
                      >
                        ₹{amt.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-black text-sm">₹</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      placeholder="Enter custom amount"
                      min={1}
                      className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                    />
                  </div>
                </div>

                {/* ── Divider ── */}
                <div className="flex items-center px-6 my-3 gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs font-black text-gray-400 tracking-widest px-2 py-1 rounded-full border border-gray-200 bg-gray-50">
                    Pay via
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* ── Payment Method ── */}
                <div className="px-6 pb-3">
                  <div className="flex gap-2 mb-4">
                    {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-xs font-black transition-all ${
                          paymentMethod === id
                            ? "border-[#0b4d21] bg-[#f4faf6] text-[#0b4d21]"
                            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-[#0b4d21]/40"
                        }`}
                      >
                        <Icon size={16} strokeWidth={2} />
                        {label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mb-3">
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">
                        UPI ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                      />
                      <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                        UPI: <span className="font-bold text-gray-600">lokdal@upi</span>
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="mb-3 space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number"
                        maxLength={19}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          maxLength={7}
                          className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          maxLength={4}
                          className="w-20 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="mb-3">
                      <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/30 focus:border-[#0b4d21] transition-all bg-white">
                        <option value="">Select your bank</option>
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank</option>
                        <option>Bank of Baroda</option>
                      </select>
                    </div>
                  )}

                  {/* Donate Button */}
                  <button
                    type="button"
                    onClick={handleDonate}
                    disabled={!finalAmount || finalAmount < 1 || loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#0b4d21] hover:bg-[#073616] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black text-base py-3.5 rounded-xl transition-all shadow-md"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Heart size={16} className="fill-white" />
                        Donate {finalAmount ? `₹${Number(finalAmount).toLocaleString("en-IN")}` : "Now"}
                      </>
                    )}
                  </button>
                </div>

                {/* Footer note */}
                <div className="px-6 pb-5">
                  <p className="text-center text-[10px] text-gray-400 leading-relaxed">
                    🔒 100% secure payment. Your contribution powers the movement for{" "}
                    <span className="text-[#0b4d21] font-semibold">farmers & rural India</span>.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 C360 0, 1080 0, 1440 60 L1440 60 L0 60 Z" fill="white" fillOpacity="0.95" />
          </svg>
        </div>
      </section>

      {/* ── Why Donate Section ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b4d21] mb-3">
            Your Donation Matters
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto mb-12">
            Every rupee you contribute goes directly towards empowering farmers, funding campaigns, and building a stronger India.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🌾",
                title: "Farmer Welfare",
                desc: "Funds go directly to supporting farmer rights, relief programs and agri-reforms.",
              },
              {
                icon: "📢",
                title: "Awareness Campaigns",
                desc: "Help us reach every village and spread the message of change across India.",
              },
              {
                icon: "🏫",
                title: "Youth Programs",
                desc: "Your donation supports skill development and education for rural youth.",
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
