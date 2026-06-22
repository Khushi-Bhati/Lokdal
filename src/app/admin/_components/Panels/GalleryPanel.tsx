"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, Images, Play, X, ExternalLink, Loader2, AlertCircle } from "lucide-react";

type GalleryCat = "Delhi Chalo" | "Lokdal Haryana President with Anna Hazare" | "Karkarta Sambhelan" | "Lokdal Jansabha" | "Dharna Pradershan" | "T-20 Championship" | "Posters" | "Videos";

const CATEGORIES: GalleryCat[] = ["Delhi Chalo","Lokdal Haryana President with Anna Hazare","Karkarta Sambhelan","Lokdal Jansabha","Dharna Pradershan","T-20 Championship","Posters","Videos"];

interface GalleryItem {
  _id: string;
  src: string;
  type: "image" | "video";
  category: string;
  title: string;
  year: number;
}

export default function GalleryPanel() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"image" | "video">("image");
  const [category, setCategory] = useState<GalleryCat>("Posters");
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchGallery = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success) setGallery(json.data);
      else setError(json.error || "Failed to load gallery.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("type", type);
      formData.append("category", type === "video" ? "Videos" : category);
      formData.append("year", year.toString());

      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        setGallery(prev => [json.data, ...prev]);
        setShowAddForm(false);
        setTitle(""); setFile(null); setType("image"); setCategory("Posters");
      } else {
        alert("Error: " + json.error);
      }
    } catch { alert("Network error."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media item?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setGallery(prev => prev.filter(i => i._id !== id));
      else alert("Error: " + json.error);
    } catch { alert("Network error."); }
  };

  const filtered = gallery.filter(item => {
    if (activeFilter === "all") return true;
    if (activeFilter === "image" || activeFilter === "video") return item.type === activeFilter;
    return item.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {["all","image","video"].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${activeFilter === f ? "bg-[#0b4d21] text-white border-[#0b4d21]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
              {f === "all" ? `All Media (${gallery.length})` : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors">
          <Plus size={16} /> Add Media
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
      {loading && <div className="flex items-center justify-center py-16 text-gray-400 gap-2"><Loader2 size={20} className="animate-spin" /><span className="text-xs font-bold">Loading from database…</span></div>}

      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-[#0b4d21] to-[#073616] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2"><Images size={16} />Upload New Media</h3>
              <button onClick={() => setShowAddForm(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Media Title</label>
                <input type="text" required placeholder="e.g. Kisan Samman Rally Meerut" value={title} onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Type</label>
                  <select value={type} onChange={e => setType(e.target.value as "image" | "video")}
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] text-gray-900">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Year</label>
                  <input type="number" required value={year} onChange={e => setYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              {type === "image" && (
                <div>
                  <label className="block text-gray-600 mb-1.5">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value as GalleryCat)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] text-gray-900">
                    {CATEGORIES.filter(c => c !== "Videos").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-gray-600 mb-1.5">Upload File</label>
                <input type="file" required accept={type === "image" ? "image/*" : "video/*"} onChange={e => setFile(e.target.files?.[0] || null)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 text-xs" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving && <Loader2 size={14} className="animate-spin" />}Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
              <Images size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-bold text-xs">No media files match your filter.</p>
            </div>
          ) : filtered.map(item => (
            <div key={item._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0">
                {item.type === "image" ? (
                  <Image src={item.src} alt={item.title} fill className="object-cover relative z-10" sizes="25vw" />
                ) : (
                  <div className="w-full h-full flex flex-col bg-gray-900 items-center justify-center text-white p-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2"><Play size={20} fill="white" /></div>
                    <span className="text-[10px] font-mono opacity-80 truncate w-full text-center">{item.src}</span>
                  </div>
                )}
                <span className={`absolute top-2 left-2 z-20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white ${item.type === "video" ? "bg-amber-600" : "bg-[#0b4d21]"}`}>{item.type}</span>
                <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                  <button type="button" onClick={() => handleDelete(item._id)} className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"><Trash2 size={16} /></button>
                  <a href={item.src} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100"><ExternalLink size={16} /></a>
                </div>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-2 min-h-[32px]">{item.title}</h4>
                  <span className="text-[9px] font-black text-[#0b4d21] uppercase tracking-wider block mt-1">{item.category}</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-gray-50 text-[10px] text-gray-400">
                  <span>Year: {item.year}</span>
                  <span className="font-mono">ID: {item._id.substring(Math.max(0, item._id.length - 6))}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
