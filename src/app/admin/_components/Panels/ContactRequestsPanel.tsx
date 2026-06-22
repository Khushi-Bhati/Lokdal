"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Download,
  Loader2,
  Search,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";

type ContactRequest = {
  _id: string;
  name: string;
  mobile: string;
  subject?: string;
  message: string;
  createdAt?: string;
  status?: "unread" | "read";
};

export default function ContactRequestsPanel() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        (r.mobile || "").toLowerCase().includes(q) ||
        (r.subject || "").toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    });
  }, [requests, search]);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact-requests");
      const json = await res.json();
      if (json.success) setRequests(json.data);
      else setError(json.error || "Failed to load contact requests.");
    } catch {
      setError("Network error. Could not load contact requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id: string) => {
    if (!confirm("Delete this contact request?")) return;
    try {
      const res = await fetch(`/api/contact-requests?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setRequests((prev) => prev.filter((r) => r._id !== id));
      else alert("Error: " + json.error);
    } catch {
      alert("Network error.");
    }
  };

  const handleExport = () => {
    const headers = "ID,Name,Mobile,Subject,Message,CreatedAt\n";
    const rows = requests
      .map((r) =>
        `"${r._id}","${r.name}","${r.mobile}","${r.subject || ""}","${r.message}","${r.createdAt || ""}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lokdal_contact_requests.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, mobile, subject, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900"
            />
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors bg-white"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-1 text-xs font-bold text-gray-600">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-[#0b4d21]" />
            <span>Showing {filtered.length} results</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-xs font-bold">Loading from database…</span>
        </div>
      )}

      {!loading && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-bold">
                      No contact requests found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 text-[#0b4d21] flex items-center justify-center font-bold">
                            {r.name?.[0] || "?"}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{r.name}</p>
                            <p className="text-[10px] text-gray-400">REQ-{r._id?.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-gray-700 flex items-center gap-1">
                            <Phone size={12} className="text-[#0b4d21]" /> {r.mobile}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Mail size={12} className="text-[#0b4d21]" /> {"—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[9px]">
                          {r.subject || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-800 font-medium leading-snug line-clamp-2">{r.message}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <button
                            type="button"
                            onClick={() => deleteRequest(r._id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            aria-label="Delete request"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

