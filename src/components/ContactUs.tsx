"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", mobile: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    { icon: MapPin, label: "Office Address", value: "8, Mall Avenue, Lucknow (U.P.) — 226001" },
    { icon: Phone, label: "Helpline", value: "88 00 00 2024" },
    { icon: Mail, label: "Email", value: "contact@lokdal.in" },
    { icon: Clock, label: "Office Hours", value: "Mon – Sat: 10:00 AM – 6:00 PM" },
  ];

  return (
    <section className="bg-[#f4faf6] py-20 px-4 sm:px-8 lg:px-16 w-full" id="contact">

      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-[#0b4d21] bg-[#0b4d21]/10 px-4 py-1.5 rounded-full mb-4">
          Get In Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
          Contact <span className="text-[#0b4d21]">Us</span>
        </h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Have a question, suggestion, or want to connect with Lokdal? We'd love to hear from you.
        </p>
      </div>

      {/* Main Grid — full width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">

        {/* ── Left: Info Cards + Map ── */}
        <div className="flex flex-col gap-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0b4d21]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#0b4d21]" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-72 w-full">
            <iframe
              title="Lokdal Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.4876408764747!2d80.93907!3d26.85048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999582d4b3c5b4d%3A0x45a9c7c3b5e8b123!2sMall%20Avenue%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* ── Right: Contact Form ── */}
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <CheckCircle2 size={60} className="text-[#0b4d21]" strokeWidth={1.5} />
              <h3 className="text-2xl font-black text-gray-900">Message Sent!</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Thank you for reaching out. Our team will get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", subject: "", message: "" }); }}
                className="mt-2 text-sm font-bold text-[#0b4d21] underline underline-offset-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-black text-gray-900 mb-1">Send a Message</h3>
              <p className="text-gray-400 text-sm mb-8">Fill in the form and we'll get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name + Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/25 focus:border-[#0b4d21] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                      Mobile <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/25 focus:border-[#0b4d21] transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/25 focus:border-[#0b4d21] transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Join Lokdal</option>
                    <option>Donation Query</option>
                    <option>Event / Rally</option>
                    <option>Press &amp; Media</option>
                    <option>Complaint / Grievance</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={4}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b4d21]/25 focus:border-[#0b4d21] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0b4d21] hover:bg-[#073616] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black text-base py-3.5 rounded-xl transition-all shadow-md mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
