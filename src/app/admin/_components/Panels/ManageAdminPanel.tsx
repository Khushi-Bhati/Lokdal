import { useState } from "react";
import { Plus, Trash2, Eye, EyeOff, ShieldCheck, KeyRound, UserCog, CheckCircle2, X } from "lucide-react";

interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Editor";
  createdAt: string;
}

export default function ManageAdminPanel() {
  // ── Admin Accounts ────────────────────────────────────────────────────────
  const [admins, setAdmins] = useState<AdminAccount[]>([
    { id: "1", name: "Admin", email: "admin@lokdal.org", role: "Super Admin", createdAt: "2024-01-01" },
  ]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<AdminAccount["role"]>("Editor");
  const [newPass, setNewPass] = useState("");

  // ── Change Password ───────────────────────────────────────────────────────
  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState("");

  // ── Site Settings ─────────────────────────────────────────────────────────
  const [siteName, setSiteName] = useState("Lokdal Official");
  const [contactEmail, setContactEmail] = useState("info@lokdal.org");
  const [contactPhone, setContactPhone] = useState("+91 98100 74878");
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPass) return;
    setAdmins([...admins, { id: Date.now().toString(), name: newName, email: newEmail, role: newRole, createdAt: new Date().toISOString().split("T")[0] }]);
    setShowAddAdmin(false);
    setNewName(""); setNewEmail(""); setNewRole("Editor"); setNewPass("");
  };

  const handleDeleteAdmin = (id: string) => {
    if (admins.find(a => a.id === id)?.role === "Super Admin") return;
    if (confirm("Remove this admin account?")) setAdmins(admins.filter(a => a.id !== id));
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    if (currentPass !== "lokdal2026") { setPassError("Current password is incorrect."); return; }
    if (newPassword.length < 8) { setPassError("New password must be at least 8 characters."); return; }
    if (newPassword !== confirmPass) { setPassError("Passwords do not match."); return; }
    setPassSuccess(true);
    setCurrentPass(""); setNewPassword(""); setConfirmPass("");
    setTimeout(() => setPassSuccess(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">

      {/* ── Admin Accounts ── */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserCog size={16} className="text-[#0b4d21]" />
            <h3 className="text-sm font-bold text-gray-700">Admin Accounts ({admins.length})</h3>
          </div>
          <button type="button" onClick={() => setShowAddAdmin(true)}
            className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2 rounded-sm transition-colors">
            <Plus size={14} /> Add Admin
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">Role</th>
              <th className="px-5 py-3.5">Created</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {admins.map(admin => (
              <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0b4d21]/10 text-[#0b4d21] flex items-center justify-center font-black text-xs">{admin.name[0]}</div>
                    <span className="font-bold text-gray-800">{admin.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{admin.email}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase border ${admin.role === "Super Admin" ? "bg-green-50 border-green-200 text-green-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
                    {admin.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-400">{admin.createdAt}</td>
                <td className="px-5 py-3.5 text-right">
                  {admin.role !== "Super Admin" ? (
                    <button type="button" onClick={() => handleDeleteAdmin(admin.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all">
                      <Trash2 size={14} />
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-300 font-bold px-2">Protected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-[#0b4d21] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2"><UserCog size={16} />Add New Admin</h3>
              <button onClick={() => setShowAddAdmin(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Full Name</label>
                <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1.5">Email</label>
                <input type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="e.g. rahul@lokdal.org"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Role</label>
                  <select value={newRole} onChange={e => setNewRole(e.target.value as AdminAccount["role"])}
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-sm focus:outline-none focus:border-[#0b4d21] text-gray-900">
                    <option value="Editor">Editor</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Password</label>
                  <input type="password" required value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowAddAdmin(false)} className="flex-1 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm">Create Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Change Password ── */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <KeyRound size={16} className="text-[#0b4d21]" />
            <h3 className="text-sm font-bold text-gray-700">Change Password</h3>
          </div>
          <form onSubmit={handleChangePassword} className="p-5 space-y-4 text-xs font-bold text-gray-700">
            {[
              { label: "Current Password", value: currentPass, set: setCurrentPass, show: showCurrent, toggle: setShowCurrent },
              { label: "New Password", value: newPassword, set: setNewPassword, show: showNew, toggle: setShowNew },
              { label: "Confirm New Password", value: confirmPass, set: setConfirmPass, show: showConfirm, toggle: setShowConfirm },
            ].map(({ label, value, set, show, toggle }) => (
              <div key={label}>
                <label className="block text-gray-600 mb-1.5">{label}</label>
                <div className="relative">
                  <input type={show ? "text" : "password"} required value={value} onChange={e => set(e.target.value)} placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                  <button type="button" onClick={() => toggle(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            ))}
            {passError && <p className="text-red-500 text-[11px]">{passError}</p>}
            {passSuccess && (
              <div className="flex items-center gap-2 text-green-600 text-[11px] font-bold">
                <CheckCircle2 size={14} /> Password updated successfully.
              </div>
            )}
            <button type="submit" className="w-full py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm transition-colors">
              Update Password
            </button>
          </form>
        </div>

        {/* ── Site Settings ── */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <ShieldCheck size={16} className="text-[#0b4d21]" />
            <h3 className="text-sm font-bold text-gray-700">Site Settings</h3>
          </div>
          <form onSubmit={handleSaveSettings} className="p-5 space-y-4 text-xs font-bold text-gray-700">
            <div>
              <label className="block text-gray-600 mb-1.5">Site Name</label>
              <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1.5">Contact Email</label>
              <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1.5">Contact Phone</label>
              <input type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
            </div>
            {settingsSaved && (
              <div className="flex items-center gap-2 text-green-600 text-[11px] font-bold">
                <CheckCircle2 size={14} /> Settings saved successfully.
              </div>
            )}
            <button type="submit" className="w-full py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm transition-colors">
              Save Settings
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
