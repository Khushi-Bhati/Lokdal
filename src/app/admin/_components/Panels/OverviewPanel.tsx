import { useData } from "@/lib/dataStore";
import { User, MessageSquare, IndianRupee, Bookmark, ArrowUpRight } from "lucide-react";

export default function OverviewPanel() {
  const { supporters } = useData();
  const counts = {
    supporters: supporters.length.toString(),
    messages: "16",
    donations: "₹ 20200/-",
    requests: "4"
  };

  const stats = [
    { label: "Total Users", value: counts.supporters, icon: User, iconColor: "text-blue-500" },
    { label: "Inbox Messages", value: counts.messages, icon: MessageSquare, iconColor: "text-pink-500" },
    { label: "Total Donation Funds", value: counts.donations, icon: IndianRupee, iconColor: "text-orange-500" },
    { label: "Join Lokdal Requests", value: counts.requests, icon: Bookmark, iconColor: "text-green-500" },
  ];

  const recentSignups = [
    { name: "Sanjay Singh", district: "Meerut, UP", role: "Volunteer", time: "10 mins ago" },
    { name: "Rita Devi", district: "Rohtak, HR", role: "Member", time: "1 hour ago" },
    { name: "Amit Chaudhary", district: "Aligarh, UP", role: "Volunteer", time: "2 hours ago" },
    { name: "Karan Johar", district: "Jaipur, RJ", role: "Member", time: "1 day ago" },
  ];

  const signupGrowth = [
    { month: "Jan", count: 45, pct: "45%" },
    { month: "Feb", count: 58, pct: "58%" },
    { month: "Mar", count: 72, pct: "72%" },
    { month: "Apr", count: 65, pct: "65%" },
    { month: "May", count: 88, pct: "88%" },
    { month: "Jun", count: 95, pct: "95%" },
  ];

  return (
    <div className="space-y-6">
      
      {/* ── STATS CARDS GRID (Match Screenshot Layout) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="space-y-1">
                <span className="text-2xl font-normal text-gray-700 block transition-transform group-hover:-translate-y-0.5">
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-400 tracking-wide block">
                  {stat.label}
                </span>
              </div>
              <div className="transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <Icon size={24} className={stat.iconColor} strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CHARTS & RECENT SIGNUPS SPLIT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Growth Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-5 sm:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700">Supporters Registration Trend</h3>
              <p className="text-[11px] text-gray-400">Monthly breakdown of volunteer registrations</p>
            </div>
            <span className="text-[11px] font-bold bg-[#0b4d21]/10 text-[#0b4d21] px-2 py-1 rounded">2026</span>
          </div>

          <div className="relative h-64 flex items-end gap-3 sm:gap-6 pt-6 border-b border-gray-100 px-2 sm:px-4">
            {signupGrowth.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 text-[10px] font-bold bg-slate-800 text-white py-1 px-1.5 rounded shadow-sm transform -translate-y-10">
                  {bar.count}k
                </div>
                <div 
                  style={{ height: bar.pct }}
                  className="w-full bg-[#1e293b] group-hover:bg-[#38bdf8] transition-colors relative"
                ></div>
                <span className="text-[11px] text-gray-400 mt-2 block">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Sign-ups */}
        <div className="bg-white border border-gray-100 p-5 sm:p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-gray-700">Recent Volunteers</h3>
              <p className="text-[11px] text-gray-400">Latest members joined online</p>
            </div>
            <button type="button" className="text-[11px] font-bold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-0.5">
              View All <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {recentSignups.map((signup, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0 hover:bg-gray-50/50 p-1 -mx-1 rounded transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                    {signup.name[0]}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-gray-700 leading-tight">{signup.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{signup.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[9px] font-bold text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">
                    {signup.role}
                  </span>
                  <p className="text-[9px] text-gray-400 mt-0.5">{signup.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
