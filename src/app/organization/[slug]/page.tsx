import Image from "next/image";
import Link from "next/link";
import { Users, MapPin, Share2, Phone, Mail, ChevronRight, User, Bookmark } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const orgData: Record<string, any> = {
  "national-executive": {
    title: "National Executives",
    slogan: "Strong Leadership. Stronger Nation.",
    regions: ["North Zone", "South Zone", "East Zone", "West Zone"],
  },
  "uttar-pradesh": {
    title: "UP Executives",
    slogan: "Strong Leadership. Stronger Uttar Pradesh.",
    regions: ["Sambhal", "Bro Code"],
  },
  "haryana": {
    title: "Haryana Executives",
    slogan: "Strong Leadership. Stronger Haryana.",
    regions: ["Rohtak", "Hisar", "Karnal", "Ambala"],
  },
  "rajasthan": {
    title: "Rajasthan Executives",
    slogan: "Strong Leadership. Stronger Rajasthan.",
    regions: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
  },
  "kerala": {
    title: "Kerala Executives",
    slogan: "Strong Leadership. Stronger Kerala.",
    regions: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kannur"],
  },
  "bihar": {
    title: "Bihar Executives",
    slogan: "Strong Leadership. Stronger Bihar.",
    regions: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  },
};

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = orgData[slug] || orgData["uttar-pradesh"];
  const titleName = data.title.replace(" Executives", "");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-start overflow-hidden px-8 sm:px-16 lg:px-24">
        <Image
          src="/assets/organisation hero.png"
          alt="Organisation Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-left w-full px-4 sm:px-8 lg:px-16">
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 drop-shadow-md">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-white max-w-2xl drop-shadow-md">
            {data.slogan}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column */}
        <div className="flex-1">
          {/* Top Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 text-gray-700 font-bold whitespace-nowrap">
              <MapPin className="text-[#0b4d21]" size={20} />
              Regional List :
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-1.5 bg-[#0b4d21] text-white rounded-full text-sm font-bold shadow-sm">All</button>
              {data.regions.map((r: string) => (
                <button key={r} className="px-4 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-bold transition-colors">{r}</button>
              ))}
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-2">
              <Users size={28} className="text-[#0b4d21]" />
              Regional List Of {data.title} :-
            </h2>
            <p className="text-gray-600 font-medium">
              Explore the leadership network across the regions of {titleName}. Select a region to view the executive team.
            </p>
          </div>

          {/* Region Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {data.regions.map((region: string, idx: number) => (
              <Link href={`/organization/${slug}/${region.toLowerCase().replace(/ /g, '-')}`} key={idx} className="bg-white border border-gray-100 hover:border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#0b4d21]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16"/><path d="M12 2v20"/><path d="M8 22v-6a4 4 0 0 1 8 0v6"/><path d="M14 6L10 6"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#0b4d21] transition-colors">{region}</h3>
                    <p className="text-sm text-gray-500 font-medium">View executives from {region}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21] group-hover:bg-[#0b4d21] group-hover:text-white transition-colors">
                  <ChevronRight size={18} />
                </div>
              </Link>
            ))}
          </div>

          {/* Green Banner */}
          <div className="bg-[#0b4d21] rounded-2xl p-8 text-white relative overflow-hidden flex items-center min-h-[160px] shadow-sm">
            <div className="relative z-10 w-full sm:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-black italic leading-tight">
                &quot;Strong regions build a strong state.<br/>Strong state builds a strong nation.&quot;
              </h3>
            </div>
            {/* Banner Graphics - faint text overlay instead of image as placeholder */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8 overflow-hidden">
               <svg viewBox="0 0 100 100" fill="currentColor" className="w-48 h-48 rotate-12">
                 <path d="M50 0L100 50L50 100L0 50Z" />
               </svg>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6">
          
          {/* About Lokdal Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <User size={16} />
              </span>
              About Lokdal
            </h3>
            <p className="text-gray-600 text-sm font-medium leading-relaxed">
              Presently senior social activist and politician Mr. Sunil Singh Ji is its national president. Lok Dal was formed by the former Prime Minister of India, Charan Singh, who is considered a messiah by farmers and marginalized communities.
            </p>
          </div>

          {/* Top Profiles Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <Users size={16} />
              </span>
              Top Profiles
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Chaudhary Charan Singh", role: "Founder & Former PM" },
                { name: "Chaudhary Sunil Singh", role: "National President" },
                { name: "Chaudhary Rajinder Singh", role: "Senior Leader" }
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 leading-tight">{p.name}</h4>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mt-0.5">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stay Connected Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                <Share2 size={16} />
              </span>
              Stay Connected
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link href="https://www.facebook.com/Lokdalindia/" target="_blank" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaFacebookF size={14} />
              </Link>
              <Link href="https://x.com/lokdalindia" target="_blank" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaXTwitter size={14} />
              </Link>
              <Link href="mailto:lokdalparty@gmail.com" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <Mail size={14} />
              </Link>
              <Link href="tel:9810074878" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <Phone size={14} />
              </Link>
              <Link href="https://wa.me/919810074878" target="_blank" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0b4d21] hover:text-white hover:border-[#0b4d21] transition-all">
                <FaWhatsapp size={14} />
              </Link>
            </div>
          </div>

          {/* Today's Pick */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
             <div className="w-full flex items-center justify-start gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#0b4d21]">
                  <Bookmark size={16} />
                </span>
                <h3 className="text-lg font-black text-gray-800">Today's Pick</h3>
             </div>
             <div className="w-full bg-green-50 rounded-xl p-6 flex flex-col items-center justify-center border border-green-100/50">
               <Image src="/assets/logo.png" alt="Lokdal Logo" width={80} height={80} className="object-contain mb-2" />
               <span className="text-lg font-black text-[#0b4d21]">लोकदल</span>
             </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
