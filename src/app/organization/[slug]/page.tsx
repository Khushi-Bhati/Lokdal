import Image from "next/image";
import Link from "next/link";
import { Share2, Phone, Mail, User, Bookmark, Users } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrganizationRegions from "@/components/OrganizationRegions";

type OrganizationData = {
  title: string;
  slogan: string;
  regions: string[];
};

const orgData: Record<string, OrganizationData> = {
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
          <OrganizationRegions
            slug={slug}
            title={data.title}
            titleName={titleName}
            regions={data.regions}
          />

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
                { name: "Chaudhary Charan Singh", role: "Founder & Former PM", image: "/assets/charan profile.jpg" },
                { name: "Chaudhary Sunil Singh", role: "National President", image: "/assets/sunil profile.jpg" },
                { name: "Chaudhary Rajinder Singh", role: "Senior Leader", image: "/assets/Rajinder Singh.png" }
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="relative w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden border border-gray-200">
                    <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
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
                <h3 className="text-lg font-black text-gray-800">Today&apos;s Pick</h3>
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
