"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function AdminChaudharySunilSinghPanel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0b4d21]/10 flex items-center justify-center border border-[#0b4d21]/20">
            <Users size={18} className="text-[#0b4d21]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Chaudhary Sunil Singh</h2>
            <p className="text-xs text-gray-500">About page preview (public content)</p>
          </div>
        </div>

        <Link
          href="/about/chaudhary-sunil-singh"
          className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors w-fit"
        >
          Open on site <ArrowRight size={14} />
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="relative w-full h-[220px] bg-gray-100">
          <Image
            src="/assets/hero image.png"
            alt="Chaudhary Sunil Singh"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <p className="text-xs font-black text-[#0b4d21] tracking-[0.2em] uppercase mb-2">Highlights</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• National President of Lok Dal</li>
                <li>• Focus on welfare of farmers & rural communities</li>
                <li>• Continues the legacy of Chaudhary Charan Singh</li>
              </ul>

              <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-xs font-black text-[#0b4d21] tracking-wide uppercase">Leadership focus</p>
                <p className="text-sm text-gray-700 mt-1">Empowering agriculture and championing the rights of common people.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-100">
                <Image src="/assets/sunil profile.jpg" alt="Sunil Singh profile" fill className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-24 rounded-xl overflow-hidden border border-gray-100">
                  <Image src="/assets/chairman.png" alt="Sunil Singh" fill className="object-cover" />
                </div>
                <div className="relative h-24 rounded-xl overflow-hidden border border-gray-100">
                  <Image src="/assets/6 (1).jpg" alt="Sunil Singh" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-xs text-gray-500">
            Tip: If you later add a CMS/editor for leader content, this panel can be converted into an editable form.
          </div>
        </div>
      </div>
    </div>
  );
}

