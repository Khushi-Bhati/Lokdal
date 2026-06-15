"use client";

import Link from "next/link";
import { Users, Hash, Camera, PlaySquare, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#052b13] text-white pt-20 pb-10 border-t-8 border-yellow-400">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & About */}
          <div>
            <div className="mb-6">
              <span className="text-4xl font-black text-white tracking-tight block">लोकदल</span>
              <span className="text-sm font-semibold text-yellow-400 tracking-wider">पारिवर्तन है, विकल्प है</span>
            </div>
            <p className="text-green-100/80 mb-6 leading-relaxed">
              Dedicated to the welfare of farmers, laborers, and rural communities, striving to build a prosperous, self-reliant, and progressive India.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#052b13] transition-colors">
                <Users size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#052b13] transition-colors">
                <Hash size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#052b13] transition-colors">
                <Camera size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#052b13] transition-colors">
                <PlaySquare size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-green-100/80 font-medium">
              <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-yellow-400 transition-colors">About Lokdal</Link></li>
              <li><Link href="#events" className="hover:text-yellow-400 transition-colors">Our Activities</Link></li>
              <li><Link href="#leaders" className="hover:text-yellow-400 transition-colors">Our Leaders</Link></li>
              <li><Link href="#ideology" className="hover:text-yellow-400 transition-colors">Ideology</Link></li>
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">Important Links</h4>
            <ul className="space-y-4 text-green-100/80 font-medium">
              <li><Link href="#join" className="hover:text-yellow-400 transition-colors">Join as Member</Link></li>
              <li><Link href="#volunteer" className="hover:text-yellow-400 transition-colors">Become a Volunteer</Link></li>
              <li><Link href="#donate" className="hover:text-yellow-400 transition-colors">Donate Now</Link></li>
              <li><Link href="#gallery" className="hover:text-yellow-400 transition-colors">Media Gallery</Link></li>
              <li><Link href="#press" className="hover:text-yellow-400 transition-colors">Press Releases</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-green-100/80 font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-yellow-400 flex-shrink-0 mt-1" />
                <span>National Headquarters,<br />123 Lokdal Marg, New Delhi 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-yellow-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-yellow-400 flex-shrink-0" />
                <span>contact@lokdal.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-100/60 font-medium">
          <p>&copy; {new Date().getFullYear()} Rashtriya Lok Dal. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
