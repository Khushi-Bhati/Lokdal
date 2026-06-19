"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const aboutLinks = [
  { label: "History of Lokdal", href: "about/history-of-lokdal" },
  { label: "Chaudhary Charan Singh", href: "/about/chaudhary-charan-singh" },
  { label: "Chaudhary Sunil Singh", href: "/about/chaudhary-sunil-singh" },
 
  { label: "Ideaology of Lokdal", href: "about/ideology-of-lokdal" },
  { label: "Lokdal Manifesto", href: "about/lokdal-manifesto" },
];

const orgLinks = [
  { label: "National Executive", href: "/organization/national-executive" },
  { label: "Uttar Pradesh Executive", href: "/organization/uttar-pradesh" },
  { label: "Haryana Executive", href: "/organization/haryana" },
  { label: "Rajasthan Executive", href: "/organization/rajasthan" },
  { label: "Kerala Executive", href: "/organization/kerala" },
  { label: "Andhra Pradesh Executive", href: "/organization/andhra-pradesh" },
  { label: "Bihar Executive", href: "/organization/bihar" },
  { label: "Manipur Executive", href: "/organization/manipur" },
];

const deptLinks = [
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Press & Media", href: "/press-media" },
  { label: "Lokdal-Live", href: "/lokdal-live" },
  
];

const otherLinks = [
  { label: "Gallery", href: "/gallery" },
 
  { label: "Donate", href: "/donate" },
  { label: "Join Lokdal", href: "/join" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left: Logo + tagline + address */}
          <div className="w-full lg:w-[260px] flex-shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/assets/logo.png" alt="Lokdal Logo" width={52} height={52} className="object-contain" />
              <span className="text-3xl font-black text-[#0b4d21]">लोकदल</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              लोकदल का संकल्प – किसान, मजदूर, युवा और हर नागरिक के अधिकार, सम्मान और समृद्धि के लिए समर्पित।
            </p>
            <div className="w-10 h-0.5 bg-[#0b4d21] mb-5" />
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin size={16} className="text-[#0b4d21] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Office Address</p>
                <p>8, Mall Avenue,</p>
                <p>Lucknow (U.P.)</p>
              </div>
            </div>
          </div>

          {/* Right: Link Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* About Lokdal */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <div className="w-5 h-5 rounded-full border-2 border-[#0b4d21] flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-black text-[#0b4d21]">i</span>
                </div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">About Lokdal</h4>
              </div>
              <ul className="space-y-2.5">
                {aboutLinks.map(({ label, href }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-[#0b4d21] flex-shrink-0" />
                    <Link href={href} className="text-sm text-gray-600 hover:text-[#0b4d21] transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organization */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <div className="w-5 h-5 rounded-full bg-[#0b4d21]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-black text-[#0b4d21]">👥</span>
                </div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Organization</h4>
              </div>
              <ul className="space-y-2.5">
                {orgLinks.map(({ label, href }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-[#0b4d21] flex-shrink-0" />
                    <Link href={href} className="text-sm text-gray-600 hover:text-[#0b4d21] transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <div className="w-5 h-5 rounded-full bg-[#0b4d21]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-black text-[#0b4d21]">🏢</span>
                </div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Departments</h4>
              </div>
              <ul className="space-y-2.5">
                {deptLinks.map(({ label, href }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-[#0b4d21] flex-shrink-0" />
                    <Link href={href} className="text-sm text-gray-600 hover:text-[#0b4d21] transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Links */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <div className="w-5 h-5 rounded-full bg-[#0b4d21]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-black text-[#0b4d21]">🔗</span>
                </div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Other Links</h4>
              </div>
              <ul className="space-y-2.5">
                {otherLinks.map(({ label, href }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-[#0b4d21] flex-shrink-0" />
                    <Link href={href} className="text-sm text-gray-600 hover:text-[#0b4d21] transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="w-full px-4 sm:px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Stay Connected */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <p className="text-xs font-black text-gray-800 uppercase tracking-wider mb-1">Stay Connected With Us</p>
              <p className="text-xs text-gray-500">Follow us on social media and stay updated<br className="hidden sm:block" /> with our latest initiatives and news.</p>
            </div>
            <div className="flex gap-3">
              <Link href="https://www.facebook.com/Lokdalindia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaFacebookF size={15} />
              </Link>
              <Link href="https://x.com/lokdalindia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaXTwitter size={15} />
              </Link>
              <Link href="mailto:lokdalparty@gmail.com" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <Mail size={15} />
              </Link>
              <Link href="tel:9810074878" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <Phone size={15} />
              </Link>
            </div>
          </div>

          {/* Join Lokdal CTA */}
          <Link
            href="/join"
            className="flex items-center gap-4 border-2 border-[#0b4d21] rounded-lg px-5 py-3 hover:bg-green-50 transition-colors group flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#0b4d21] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🚩</span>
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Join Lokdal</p>
              <p className="text-xs text-gray-500">Be a part of the change</p>
            </div>
            <ChevronRight size={18} className="text-[#0b4d21] group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </footer>
  );
}
