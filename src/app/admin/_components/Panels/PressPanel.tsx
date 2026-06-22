"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Newspaper, X, Edit, AlertCircle, Loader2 } from "lucide-react";

type Category = "press" | "policy" | "organization" | "speech";

interface PressItem {
  _id: string;
  title: string;
  date: string;
  category: Category;
}

const CATEGORIES: Category[] = ["press", "policy", "organization", "speech"];

const categoryColor: Record<Category, string> = {
  press: "bg-blue-50 text-blue-700 border-blue-200",
  policy: "bg-purple-50 text-purple-700 border-purple-200",
  organization: "bg-amber-50 text-amber-700 border-amber-200",
  speech: "bg-green-50 text-green-700 border-green-200",
};

export default function PressPanel() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>("press");

  const fetchPress = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/press");
      const json = await res.json();
      if (json.success) setItems(json.data);
      else setError(json.error || "Failed to load press releases.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPress(); }, [fetchPress]);

  const openEdit = (item: PressItem) => {
    setEditId(item._id); setTitle(item.title); setDate(item.date); setCategory(item.category);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false); setEditId(null); setTitle(""); setDate(""); setCategory("press");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    setSaving(true);
    try {
      if (editId) {
        const res = await fetch("/api/press", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, title, date, category }) });
        const json = await res.json();
        if (json.success) setItems(prev => prev.map(i => i._id === editId ? json.data : i));
        else alert("Error: " + json.error);
      } else {
        const res = await fetch("/api/press", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, date, category }) });
        const json = await res.json();
        if (json.success) setItems(prev => [json.data, ...prev]);
        else alert("Error: " + json.error);
      }
    } catch { alert("Network error."); }
    finally { setSaving(false); closeForm(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this press release?")) return;
    try {
      const res = await fetch(`/api/press?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setItems(prev => prev.filter(i => i._id !== id));
      else alert("Error: " + json.error);
    } catch { alert("Network error."); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
        <h3 className="text-sm font-bold text-gray-700">Press Releases ({items.length})</h3>
        <button type="button" onClick={() => { closeForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2 rounded-sm shadow-sm transition-colors">
          <Plus size={16} /> Add Press Release
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
      {loading && <div className="flex items-center justify-center py-16 text-gray-400 gap-2"><Loader2 size={20} className="animate-spin" /><span className="text-xs font-bold">Loading from database…</span></div>}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-[#0b4d21] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2"><Newspaper size={16} />{editId ? "Edit Press Release" : "Add Press Release"}</h3>
              <button onClick={closeForm}><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Title (Hindi/English)</label>
                <textarea required rows={3} value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Hon'ble Sunil Singh जी की प्रेस वार्ता..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Date</label>
                  <input type="text" required value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. 13-06-2026"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value as Category)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-sm focus:outline-none focus:border-[#0b4d21] text-gray-900">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving && <Loader2 size={14} className="animate-spin" />}{editId ? "Save Changes" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!loading && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <AlertCircle size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-bold text-xs">No press releases found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-800 font-medium max-w-xs">{item.title}</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{item.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase border ${categoryColor[item.category]}`}>{item.category}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-all"><Edit size={14} /></button>
                        <button type="button" onClick={() => handleDelete(item._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
