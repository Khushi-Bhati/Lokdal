import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, User, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type OrgInfo = {
  title: string;
  stateName: string;
};

const orgMeta: Record<string, OrgInfo> = {
  "national-executive": { title: "National Executives", stateName: "India" },
  "uttar-pradesh": { title: "UP Executives", stateName: "Uttar Pradesh" },
  "haryana": { title: "Haryana Executives", stateName: "Haryana" },
  "rajasthan": { title: "Rajasthan Executives", stateName: "Rajasthan" },
  "kerala": { title: "Kerala Executives", stateName: "Kerala" },
  "bihar": { title: "Bihar Executives", stateName: "Bihar" },
};

function formatRegion(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const executives = [
  { name: "District President", role: "Regional Head" },
  { name: "General Secretary", role: "Organization" },
  { name: "Treasurer", role: "Finance" },
  { name: "Youth Wing Head", role: "Youth Affairs" },
];

export default async function OrganizationRegionPage({
  params,
}: {
  params: Promise<{ slug: string; region: string }>;
}) {
  const { slug, region } = await params;
  const meta = orgMeta[slug] || orgMeta["uttar-pradesh"];
  const regionName = formatRegion(region);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="w-full px-4 sm:px-8 lg:px-16 py-8">
        <Link
          href={`/organization/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0b4d21] hover:underline mb-6"
        >
          <ChevronLeft size={16} /> Back to {meta.title}
        </Link>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-[#0b4d21] flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-[#0b4d21] uppercase tracking-wider mb-1">{meta.stateName}</p>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{regionName}</h1>
              <p className="text-sm text-gray-500 mt-2">Regional executive team for {regionName} under {meta.title}.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {executives.map((exec, idx) => (
              <div key={exec.name} className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="relative w-12 h-12 rounded-full bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                  <Image
                    src={idx % 2 === 0 ? "/assets/sunil profile.jpg" : "/assets/charan profile.jpg"}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{exec.name}</h3>
                  <p className="text-xs text-gray-500">{exec.role} · {regionName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0b4d21] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users size={32} className="text-green-200 flex-shrink-0" />
            <div>
              <h3 className="font-black text-lg">Want to join the team in {regionName}?</h3>
              <p className="text-sm text-green-100">Become a Lokdal volunteer and serve your community.</p>
            </div>
          </div>
          <Link
            href="/join"
            className="flex-shrink-0 bg-white text-[#0b4d21] font-black text-sm px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            Join Lokdal
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
