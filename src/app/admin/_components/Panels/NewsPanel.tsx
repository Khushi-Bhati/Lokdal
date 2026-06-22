"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, Newspaper, X, AlertCircle, Edit, Loader2 } from "lucide-react";

interface NewsItem {
  _id: string;
  image: string;
  text: string;
  badge: string;
  author: string;
  role: string;
  date: string;
}

export default function NewsPanel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [badge, setBadge] = useState("लोकदल अपडेट");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("सुनील सिंह");
  const [role, setRole] = useState("राष्ट्रीय अध्यक्ष, लोकदल");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchNews = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/news");
      const json = await res.json();
      if (json.success) setNews(json.data);
      else setError(json.error || "Failed to load news.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const openEdit = (item: NewsItem) => {
    setEditId(item._id); setText(item.text); setBadge(item.badge); setImage(item.image);
    setAuthor(item.author); setRole(item.role);
    setDate(item.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false); setEditId(null); setText(""); setImage("");
    setBadge("लोकदल अपडेट"); setAuthor("सुनील सिंह"); setRole("राष्ट्रीय अध्यक्ष, लोकदल");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setSaving(true);
    const payload = { image: image || "/assets/kisan.jpg", text, badge, author, role, date };
    try {
      if (editId) {
        const res = await fetch("/api/news", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, ...payload }) });
        const json = await res.json();
        if (json.success) setNews(prev => prev.map(n => n._id === editId ? json.data : n));
        else alert("Error: " + json.error);
      } else {
        const res = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const json = await res.json();
        if (json.success) setNews(prev => [json.data, ...prev]);
        else alert("Error: " + json.error);
      }
    } catch { alert("Network error."); }
    finally { setSaving(false); closeForm(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news article?")) return;
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setNews(prev => prev.filter(n => n._id !== id));
      else alert("Error: " + json.error);
    } catch { alert("Network error."); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
        <h3 className="text-sm font-bold text-gray-700">Published News ({news.length})</h3>
        <button type="button" onClick={() => { closeForm(); setShowAddForm(true); }}
          className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2 rounded-sm shadow-sm transition-colors">
          <Plus size={16} /> Publish Update
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
      {loading && <div className="flex items-center justify-center py-16 text-gray-400 gap-2"><Loader2 size={20} className="animate-spin" /><span className="text-xs font-bold">Loading from database…</span></div>}

      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-[#0b4d21] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2"><Newspaper size={16} />{editId ? "Edit Update" : "Publish Update"}</h3>
              <button onClick={closeForm}><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Headline</label>
                <textarea required rows={3} placeholder="e.g. किसान आंदोलन..." value={text} onChange={e => setText(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Category Tag</label>
                  <select value={badge} onChange={e => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-sm focus:outline-none focus:border-[#0b4d21] text-gray-900">
                    <option value="लोकदल अपडेट">लोकदल अपडेट</option>
                    <option value="प्रेस विज्ञप्ति">प्रेस विज्ञप्ति</option>
                    <option value="किसान कल्याण">किसान कल्याण</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Publish Date</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Author</label>
                  <input type="text" required value={author} onChange={e => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Author Role</label>
                  <input type="text" required value={role} onChange={e => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1.5">Image Path</label>
                <input type="text" placeholder="/assets/dharna3.jpeg" value={image} onChange={e => setImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900 font-mono text-[10px]" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving && <Loader2 size={14} className="animate-spin" />}{editId ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length === 0 ? (
            <div className="col-span-full bg-white border border-gray-100 rounded-sm py-16 text-center shadow-sm">
              <AlertCircle size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-bold text-xs">No published news found.</p>
            </div>
          ) : news.map(item => (
            <div key={item._id} className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm group flex flex-col justify-between relative transition-all hover:shadow-md">
              <div className="relative h-44 bg-gray-100 flex-shrink-0">
                <Image src={item.image} alt={item.text} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute top-3 right-3 bg-white/95 text-[#0b4d21] text-[10px] font-black px-2.5 py-0.5 rounded-sm">{item.badge}</span>
                <p className="absolute bottom-3 left-4 right-4 text-white font-black text-sm leading-snug line-clamp-2">{item.text}</p>
                <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => openEdit(item)} className="p-1.5 bg-white/90 text-blue-600 rounded-sm shadow-sm hover:bg-white"><Edit size={14} /></button>
                  <button type="button" onClick={() => handleDelete(item._id)} className="p-1.5 bg-white/90 text-red-600 rounded-sm shadow-sm hover:bg-white"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="p-3 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm bg-[#0b4d21]/10 text-[#0b4d21] flex items-center justify-center font-bold text-xs">{item.author[0]}</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 leading-tight">{item.author}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{item.role}</p>
                  </div>
                </div>
                <span className="text-[9px] text-gray-400 font-mono">{item.date ? new Date(item.date).toLocaleDateString() : ""}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
