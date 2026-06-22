"use client";

import { useMemo, useState } from "react";
import { Users, Plus, Trash2, X, MapPin, Upload, Download } from "lucide-react";

type OrganisationRegion = {
  region: string;
};

type OrganisationProfile = {
  name: string;
  role: string;
  image: string;
};

type OrganisationEntry = {
  slug: string;
  title: string;
  slogan: string;
  regions: OrganisationRegion[];
  profiles: OrganisationProfile[];
};

const seed: OrganisationEntry[] = [
  {
    slug: "national-executive",
    title: "National Executives",
    slogan: "Strong Leadership. Stronger Nation.",
    regions: [{ region: "North Zone" }, { region: "South Zone" }, { region: "East Zone" }, { region: "West Zone" }],
    profiles: [
      { name: "Chaudhary Sunil Singh", role: "National President", image: "/assets/sunil profile.jpg" },
      { name: "Chaudhary Charan Singh", role: "Founder & Former PM", image: "/assets/charan profile.jpg" },
    ],
  },
  {
    slug: "uttar-pradesh",
    title: "UP Executives",
    slogan: "Strong Leadership. Stronger Uttar Pradesh.",
    regions: [{ region: "Sambhal" }, { region: "Aligarh" }],
    profiles: [{ name: "Sunil Singh", role: "State Coordinator", image: "/assets/sunil profile.jpg" }],
  },
  {
    slug: "haryana",
    title: "Haryana Executives",
    slogan: "Strong Leadership. Stronger Haryana.",
    regions: [{ region: "Rohtak" }, { region: "Hisar" }, { region: "Karnal" }, { region: "Ambala" }],
    profiles: [{ name: "Chaudhary Charan Singh", role: "Senior Leader", image: "/assets/charan profile.jpg" }],
  },
  {
    slug: "rajasthan",
    title: "Rajasthan Executives",
    slogan: "Strong Leadership. Stronger Rajasthan.",
    regions: [{ region: "Jaipur" }, { region: "Jodhpur" }, { region: "Udaipur" }, { region: "Bikaner" }],
    profiles: [{ name: "Chaudhary Rajinder Singh", role: "Senior Leader", image: "/assets/Rajinder Singh.png" }],
  },
];

function toJsonDownload(filename: string, obj: unknown) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function OrganisationPanel() {
  const [entries, setEntries] = useState<OrganisationEntry[]>(seed);
  const [selectedSlug, setSelectedSlug] = useState<string>(seed[0]?.slug ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // DB-backed load
  // Note: This panel currently mutates local state only; export uses the local state.



  const selected = useMemo(
    () => entries.find((e) => e.slug === selectedSlug) ?? entries[0],
    [entries, selectedSlug]
  );

  const [showAddRegion, setShowAddRegion] = useState(false);
  const [newRegion, setNewRegion] = useState("");

  const [showAddProfile, setShowAddProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileRole, setNewProfileRole] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");

  const updateSelected = (patch: Partial<OrganisationEntry>) => {
    setEntries((prev) => prev.map((e) => (e.slug === selected?.slug ? { ...e, ...patch } : e)));
  };

  const handleAddRegion = () => {
    if (!newRegion.trim() || !selected) return;
    updateSelected({
      regions: [...selected.regions, { region: newRegion.trim() }],
    });
    setNewRegion("");
    setShowAddRegion(false);
  };

  const handleDeleteRegion = (region: string) => {
    if (!selected) return;
    updateSelected({ regions: selected.regions.filter((r) => r.region !== region) });
  };

  const handleAddProfile = () => {
    if (!selected) return;
    if (!newProfileName.trim() || !newProfileRole.trim()) return;

    updateSelected({
      profiles: [
        ...selected.profiles,
        {
          name: newProfileName.trim(),
          role: newProfileRole.trim(),
          image: newProfileImage.trim() || "/assets/logo.png",
        },
      ],
    });

    setNewProfileName("");
    setNewProfileRole("");
    setNewProfileImage("");
    setShowAddProfile(false);
  };

  const handleDeleteProfile = (idx: number) => {
    if (!selected) return;
    updateSelected({ profiles: selected.profiles.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 bg-white border border-gray-100 rounded-sm shadow-sm p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[#0b4d21]" />
          <h3 className="text-sm font-bold text-gray-700">Organisation Management</h3>
        </div>
        <div className="flex-1" />
        <div className="flex gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => toJsonDownload("organisation-export.json", entries)}
            className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-sm transition-colors bg-white"
          >
            <Download size={14} /> Export JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - list of organisation slugs */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={16} className="text-[#0b4d21]" />
              <span className="text-xs font-bold text-gray-700">Select Organisation</span>
            </div>
          </div>

          <div className="space-y-2">
            {entries.map((e) => (
              <button
                key={e.slug}
                type="button"
                onClick={() => setSelectedSlug(e.slug)}
                className={`w-full text-left px-3 py-2 rounded-sm border transition-colors ${
                  e.slug === selectedSlug
                    ? "bg-[#0b4d21] border-[#0b4d21] text-white"
                    : "bg-white border-gray-100 hover:bg-gray-50 text-gray-800"
                }`}
              >
                <div className="text-xs font-black">{e.title}</div>
                <div className="text-[10px] font-bold text-gray-500">/{e.slug}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Middle - edit entry */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-sm shadow-sm p-4 sm:p-5">
          {!selected ? (
            <div className="py-12 text-center text-gray-400 text-xs font-bold">No data.</div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 mb-1.5 text-xs font-bold">Title</label>
                  <input
                    type="text"
                    value={selected.title}
                    onChange={(e) => updateSelected({ title: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5 text-xs font-bold">Slogan</label>
                  <textarea
                    rows={3}
                    value={selected.slogan}
                    onChange={(e) => updateSelected({ slogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="border-t border-gray-50 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-sm bg-green-50 border border-green-100 flex items-center justify-center text-[#0b4d21]">
                      <MapPin size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-700">Regions ({selected.regions.length})</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddRegion(true)}
                    className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-3 py-2 rounded-sm transition-colors"
                  >
                    <Plus size={14} /> Add Region
                  </button>
                </div>

                {selected.regions.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-xs font-bold">No regions added.</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selected.regions.map((r) => (
                      <div
                        key={r.region}
                        className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5"
                      >
                        <span className="text-xs font-black text-gray-800">{r.region}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteRegion(r.region)}
                          className="p-1 rounded-full hover:bg-red-50 hover:text-red-600 text-red-500"
                          aria-label={`Delete region ${r.region}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-50 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-sm bg-green-50 border border-green-100 flex items-center justify-center text-[#0b4d21]">
                      <Users size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-700">Executive Profiles ({selected.profiles.length})</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddProfile(true)}
                    className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-3 py-2 rounded-sm transition-colors"
                  >
                    <Plus size={14} /> Add Profile
                  </button>
                </div>

                {selected.profiles.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-xs font-bold">No profiles added.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selected.profiles.map((p, idx) => (
                      <div key={idx} className="border border-gray-100 bg-white rounded-sm p-3 flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-black text-gray-800">{p.name}</div>
                          <div className="text-[10px] font-bold text-gray-500 mt-0.5">{p.role}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteProfile(idx)}
                          className="p-1.5 rounded-sm hover:bg-red-50 hover:text-red-600 text-red-500"
                          aria-label={`Delete profile ${p.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Region Modal */}
      {showAddRegion && selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-[#0b4d21] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Add Region</h3>
              <button type="button" onClick={() => setShowAddRegion(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Region Name</label>
                <input
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  placeholder="e.g. Lucknow"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900"
                />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowAddRegion(false)} className="flex-1 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="button" onClick={handleAddRegion} className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Profile Modal */}
      {showAddProfile && selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-[#0b4d21] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Add Profile</h3>
              <button type="button" onClick={() => setShowAddProfile(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Name</label>
                <input
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="e.g. Chaudhary Rajinder Singh"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1.5">Role</label>
                <input
                  value={newProfileRole}
                  onChange={(e) => setNewProfileRole(e.target.value)}
                  placeholder="e.g. Senior Leader"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1.5">Image Path (public/) </label>
                <input
                  value={newProfileImage}
                  onChange={(e) => setNewProfileImage(e.target.value)}
                  placeholder="/assets/sunil profile.jpg"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900 font-mono text-[10px]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowAddProfile(false)} className="flex-1 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="button" onClick={handleAddProfile} className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

