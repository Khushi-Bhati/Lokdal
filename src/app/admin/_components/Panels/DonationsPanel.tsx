import { useState } from "react";
import { IndianRupee, Search, Trash2, AlertCircle } from "lucide-react";
import { useData, Donation } from "@/lib/dataStore";

export default function DonationsPanel() {
  const { donations, setDonations } = useData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = donations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = donations.filter(d => d.status === "completed").reduce((sum, d) => sum + d.amount, 0);

  const handleDelete = (id: string) => {
    if (confirm("Remove this donation record?")) {
      setDonations(donations.filter(d => d.id !== id));
    }
  };

  const statusStyle: Record<Donation["status"], string> = {
    completed: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-red-50 text-red-600 border-red-200",
  };

  const methodLabel: Record<Donation["method"], string> = {
    upi: "UPI",
    card: "Card",
    netbanking: "Net Banking",
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-gray-700">₹{total.toLocaleString("en-IN")}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Total Donations</p>
          </div>
          <IndianRupee size={24} className="text-green-500" strokeWidth={1.5} />
        </div>
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-gray-700">{donations.filter(d => d.status === "completed").length}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Completed</p>
          </div>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-gray-700">{donations.filter(d => d.status === "pending").length}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Pending</p>
          </div>
          <span className="w-3 h-3 rounded-full bg-amber-400"></span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by donor name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b4d21] bg-white text-gray-900"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#0b4d21] text-gray-700"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <AlertCircle size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-bold text-xs">No donations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-5 py-4">Donor</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Method</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-green-50 text-[#0b4d21] flex items-center justify-center font-black text-xs border border-green-100">
                          {d.name[0]}
                        </div>
                        <span className="font-bold text-gray-800">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-black text-gray-900">₹{d.amount.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5 text-gray-500">{methodLabel[d.method]}</td>
                    <td className="px-5 py-3.5 text-gray-500">{new Date(d.date).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase border ${statusStyle[d.status]}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button type="button" onClick={() => handleDelete(d.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-xs text-gray-500 font-medium">
          Showing {filtered.length} of {donations.length} records
        </div>
      </div>
    </div>
  );
}
