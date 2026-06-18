"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";

type OrganizationRegionsProps = {
  slug: string;
  title: string;
  titleName: string;
  regions: string[];
};

function regionPath(region: string) {
  return region.toLowerCase().replace(/ /g, "-");
}

export default function OrganizationRegions({ slug, title, titleName, regions }: OrganizationRegionsProps) {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const visibleRegions = useMemo(() => {
    if (selectedRegion === "All") {
      return regions;
    }

    return regions.filter((region) => region === selectedRegion);
  }, [regions, selectedRegion]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-2 text-gray-700 font-bold whitespace-nowrap">
          <MapPin className="text-[#0b4d21]" size={20} />
          Regional List :
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedRegion("All")}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              selectedRegion === "All"
                ? "bg-[#0b4d21] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                selectedRegion === region
                  ? "bg-[#0b4d21] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-2">
          <Users size={28} className="text-[#0b4d21]" />
          Regional List Of {title} :-
        </h2>
        <p className="text-gray-600 font-medium">
          Explore the leadership network across the regions of {titleName}. Select a region to view the executive team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {visibleRegions.map((region) => (
          <Link
            href={`/organization/${slug}/${regionPath(region)}`}
            key={region}
            className="bg-white border border-gray-100 hover:border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#0b4d21]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16" />
                  <path d="M12 2v20" />
                  <path d="M8 22v-6a4 4 0 0 1 8 0v6" />
                  <path d="M14 6L10 6" />
                </svg>
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
    </>
  );
}
