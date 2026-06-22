"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Download, UserCheck, Trash2, ShieldAlert, Plus, X, Loader2, AlertCircle } from "lucide-react";

interface Supporter {
  _id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  role: "Volunteer" | "Member";
  status: "Active" | "Pending";
  joinedDate: string;
}

export default function SupportersPanel() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [role, setRole] = useState<"Volunteer" | "Member">("Volunteer");
  const [status, setStatus] = useState<"Active" | "Pending">("Active");

  const fetchSupporters = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/supporters");
      const json = await res.json();
      if (json.success) setSupporters(json.data);
      else setError(json.error || "Failed to load supporters.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSupporters(); }, [fetchSupporters]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !state || !district) return;
    setSaving(true);
    try {
      const res = await fetch("/api/supporters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, state, district, role, status, joinedDate: new Date() }),
      });
      const json = await res.json();
      if (json.success) {
        setSupporters(prev => [json.data, ...prev]);
        setShowAddForm(false);
        setName(""); setEmail(""); setPhone(""); setState(""); setDistrict(""); setRole("Volunteer"); setStatus("Active");
      } else { alert("Error: " + json.error); }
    } catch { alert("Network error."); }
    finally { setSaving(false); }
  };

  const toggleStatus = async (supporter: Supporter) => {
    const newStatus = supporter.status === "Active" ? "Pending" : "Active";
    try {
      const res = await fetch(`/api/supporters?id=${supporter._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) setSupporters(prev => prev.map(s => s._id === supporter._id ? json.data : s));
      else alert("Error: " + json.error);
    } catch { alert("Network error."); }
  };

  const deleteSupporter = async (id: string) => {
    if (!confirm("Remove this supporter?")) return;
    try {
      const res = await fetch(`/api/supporters?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setSupporters(prev => prev.filter(s => s._id !== id));
      else alert("Error: " + json.error);
    } catch { alert("Network error."); }
  };

  const handleExport = () => {
    const headers = "ID,Name,Email,Phone,State,District,Role,Status,JoinedDate\n";
    const rows = supporters.map(s => `"${s._id}","${s.name}","${s.email}","${s.phone}","${s.state}","${s.district}","${s.role}","${s.status}","${s.joinedDate}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "lokdal_supporters.csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const filtered = supporters.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.district.toLowerCase().includes(searchTerm.toLowerCase()) || s.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch && (roleFilter === "all" || s.role === roleFilter) && (statusFilter === "all" || s.status === statusFilter);
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name, district, or state..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <button type="button" onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors">
              <Plus size={14} /> Add Supporter
            </button>
            <button type="button" onClick={handleExport}
              className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors bg-white">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-50 text-xs font-bold text-gray-600">
          <div className="flex items-center gap-2"><Filter size={13} className="text-[#0b4d21]" /><span>Filters:</span></div>
          <div className="flex items-center gap-1.5">
            <span className="font-normal text-gray-500">Role:</span>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border border-gray-200 bg-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#0b4d21]">
              <option value="all">All</option><option value="Volunteer">Volunteer</option><option value="Member">Member</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-normal text-gray-500">Status:</span>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 bg-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#0b4d21]">
              <option value="all">All</option><option value="Active">Active</option><option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
      {loading && <div className="flex items-center justify-center py-16 text-gray-400 gap-2"><Loader2 size={20} className="animate-spin" /><span className="text-xs font-bold">Loading from database…</span></div>}

      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-[#0b4d21] to-[#073616] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2"><UserCheck size={16} />Add New Supporter</h3>
              <button onClick={() => setShowAddForm(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Full Name</label>
                <input type="text" required placeholder="e.g. Ramesh Singh" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Email</label>
                  <input type="email" required placeholder="e.g. ramesh@example.com" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Phone</label>
                  <input type="text" required placeholder="+91 99999 88888" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">State</label>
                  <input type="text" required placeholder="e.g. Uttar Pradesh" value={state} onChange={e => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">District</label>
                  <input type="text" required placeholder="e.g. Meerut" value={district} onChange={e => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Role</label>
                  <select value={role} onChange={e => setRole(e.target.value as "Volunteer" | "Member")} className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] text-gray-900">
                    <option value="Volunteer">Volunteer</option><option value="Member">Member</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Status</label>
                  <select value={status} onChange={e => setStatus(e.target.value as "Active" | "Pending")} className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b4d21] text-gray-900">
                    <option value="Active">Active</option><option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving && <Loader2 size={14} className="animate-spin" />}Save Supporter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!loading && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4">Name</th><th className="px-6 py-4">Contact</th><th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Type</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Joined</th><th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-bold">No supporters found.</td></tr>
                ) : filtered.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 text-[#0b4d21] flex items-center justify-center font-bold">{s.name[0]}</div>
                        <div><p className="font-bold text-gray-900">{s.name}</p><p className="text-[10px] text-gray-400">LKD-{s._id.slice(-6)}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><p className="text-gray-700">{s.email}</p><p className="text-[10px] text-gray-400">{s.phone}</p></td>
                    <td className="px-6 py-4"><p className="text-gray-800 font-medium">{s.district}</p><p className="text-[10px] text-gray-400">{s.state}</p></td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold text-[9px] ${s.role === "Member" ? "bg-blue-50 border border-blue-100 text-blue-700" : "bg-purple-50 border border-purple-100 text-purple-700"}`}>{s.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button type="button" onClick={() => toggleStatus(s)}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold text-[9px] border ${s.status === "Active" ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.status === "Active" ? "bg-green-600" : "bg-amber-500"}`}></span>{s.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{s.joinedDate ? new Date(s.joinedDate).toLocaleDateString() : ""}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button type="button" onClick={() => toggleStatus(s)} className="p-1.5 text-gray-500 hover:text-[#0b4d21] hover:bg-green-50 rounded-lg"><UserCheck size={15} /></button>
                        <button type="button" onClick={() => deleteSupporter(s._id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <p className="font-medium">Showing {filtered.length} of {supporters.length} supporters</p>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <ShieldAlert size={12} className="text-[#0b4d21]" /><span>Authorized access only</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
