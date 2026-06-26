"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, Plus, Trash2, Video, X, Loader2, AlertCircle } from "lucide-react";

type VideoItem = {
  _id: string;
  src: string;
  type: "image" | "video";
  category: string;
  title: string;
  year: number;
};

export default function LokdalLivePanel() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Failed to load Lokdal Live videos.");
        return;
      }

      const list: VideoItem[] = Array.isArray(json.data) ? json.data : [];
      // Prefer explicit type
      const onlyVideos = list.filter((i) => i.type === "video");

      // If you later add dedicated category (e.g., "Lokdal Live"), uncomment this:
      // const filtered = onlyVideos.filter((i) => i.category === "Lokdal Live");
      // setVideos(filtered);

      setVideos(onlyVideos);
    } catch {
      setError("Network error. Could not load videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchVideos();
  }, []);

  const filteredVideos = useMemo(() => videos, [videos]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !file) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title.trim());
      formData.append("type", "video");
      // Gallery API will store category as "Videos" when type is video.
      // If you add a dedicated category later, update API + frontend.
      formData.append("category", "Videos");
      formData.append("year", String(year));

      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      const json = await res.json();

      if (!json.success) {
        alert("Error: " + (json.error || "Failed to upload video"));
        return;
      }

      const created: VideoItem = json.data;
      if (created?.type === "video") setVideos((prev) => [created, ...prev]);
      setShowAddForm(false);
      setTitle("");
      setFile(null);
    } catch {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this Lokdal Live video?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
      } else {
        alert("Error: " + (json.error || "Failed to delete"));
      }
    } catch {
      alert("Network error.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Video size={18} className="text-[#0b4d21]" />
          <h3 className="text-sm font-bold text-gray-700">Lokdal Live Videos ({filteredVideos.length})</h3>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          <Plus size={16} /> Add Video
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-xs font-bold">Loading videos from database…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.length === 0 ? (
            <div className="col-span-full bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
              <Play size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-bold text-xs">No Lokdal Live videos found.</p>
            </div>
          ) : (
            filteredVideos.map((item) => (
              <div key={item._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">
                <div className="relative aspect-[4/3] bg-gray-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Play size={26} fill="white" className="text-white" />
                  </div>
                  <span className="absolute top-2 left-2 z-20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">
                    video
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-2">{item.title}</h4>
                    <span className="text-[9px] font-black text-[#0b4d21] uppercase tracking-wider block mt-1">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50 text-[10px] text-gray-400 font-bold">
                    <span>Year: {item.year}</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all"
                      aria-label="Delete video"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-[#0b4d21] to-[#073616] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Video size={16} /> Upload Lokdal Live Video
              </h3>
              <button type="button" onClick={() => setShowAddForm(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Video Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LIVE: Rally in Kanpur"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Year</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-wider mb-1">Type</div>
                  <div className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-xs font-bold">
                    video (Lokdal Live)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1.5">Upload File</label>
                <input
                  type="file"
                  required
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

