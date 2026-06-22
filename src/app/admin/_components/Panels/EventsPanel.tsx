"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, CalendarDays, MapPin, Clock, X, Globe2, AlertCircle, Edit, Loader2 } from "lucide-react";

interface SiteEvent {
  _id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  detail: string;
  level: "national" | "state";
}

export default function EventsPanel() {
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [detail, setDetail] = useState("");
  const [level, setLevel] = useState<"national" | "state">("national");

  // ── Fetch all events from DB ──────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/events");
      const json = await res.json();
      if (json.success) {
        setEvents(json.data);
      } else {
        setError(json.error || "Failed to load events.");
      }
    } catch {
      setError("Network error. Could not load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const openEditForm = (event: SiteEvent) => {
    setEditEventId(event._id);
    setTitle(event.title);
    const monthIndex = new Date(Date.parse(event.month + " 1, 2012")).getMonth() + 1;
    setDateStr(`${event.year}-${monthIndex.toString().padStart(2, "0")}-${event.day.padStart(2, "0")}`);
    setTime(event.time);
    setPlace(event.place);
    setDetail(event.detail);
    setLevel(event.level);
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditEventId(null);
    setTitle(""); setDateStr(""); setTime(""); setPlace(""); setDetail(""); setLevel("national");
  };

  // ── Save (create or update) ───────────────────────────────────────────────
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateStr || !place) return;

    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = dateObj.getFullYear().toString();

    const payload = { day, month, year, title, place, time: time || "10:00 AM Onwards", detail: detail || "Public outreach program and volunteer gathering.", level };

    setSaving(true);
    try {
      if (editEventId) {
        // UPDATE
        const res = await fetch("/api/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editEventId, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          setEvents(prev => prev.map(ev => ev._id === editEventId ? json.data : ev));
        } else {
          alert("Failed to update event: " + json.error);
        }
      } else {
        // CREATE
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setEvents(prev => [json.data, ...prev]);
        } else {
          alert("Failed to create event: " + json.error);
        }
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSaving(false);
      closeForm();
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this event?")) return;
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setEvents(prev => prev.filter(ev => ev._id !== id));
      } else {
        alert("Failed to delete event: " + json.error);
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
        <h3 className="text-sm font-bold text-gray-700">Scheduled Events ({events.length})</h3>
        <button type="button" onClick={() => { closeForm(); setShowAddForm(true); }}
          className="inline-flex items-center gap-2 bg-[#0b4d21] hover:bg-[#073616] text-white font-bold text-xs px-4 py-2 rounded-sm shadow-sm transition-colors">
          <Plus size={16} /> Create Event
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-xs font-bold">Loading events from database…</span>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full border border-gray-100 overflow-hidden shadow-2xl">
            <div className="bg-[#0b4d21] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2"><CalendarDays size={16} />{editEventId ? "Edit Event" : "Create Event"}</h3>
              <button onClick={closeForm}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 text-xs font-bold text-gray-700">
              <div>
                <label className="block text-gray-600 mb-1.5">Event Title</label>
                <input type="text" required placeholder="e.g. Kisan Samman Rally" value={title} onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Date</label>
                  <input type="date" required value={dateStr} onChange={e => setDateStr(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Time</label>
                  <input type="text" placeholder="e.g. 10:00 AM Onwards" value={time} onChange={e => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1.5">Location</label>
                  <input type="text" required placeholder="e.g. Lucknow, UP" value={place} onChange={e => setPlace(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1.5">Level</label>
                  <select value={level} onChange={e => setLevel(e.target.value as "national" | "state")}
                    className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-sm focus:outline-none focus:border-[#0b4d21] text-gray-900">
                    <option value="national">National</option>
                    <option value="state">State</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1.5">Details</label>
                <textarea rows={3} placeholder="Describe the agenda..." value={detail} onChange={e => setDetail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#0b4d21] bg-white text-gray-900" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 bg-[#0b4d21] hover:bg-[#073616] text-white rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editEventId ? "Save Changes" : "Schedule Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full bg-white border border-gray-100 rounded-sm py-16 text-center shadow-sm">
              <AlertCircle size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-bold text-xs">No scheduled events found.</p>
            </div>
          ) : events.map(event => (
            <div key={event._id} className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm flex flex-col md:flex-row gap-5 relative group transition-all hover:shadow-md">
              <div className="flex-shrink-0 w-20 h-20 bg-[#0b4d21]/5 text-[#0b4d21] rounded-sm flex flex-col items-center justify-center p-3 border border-green-50">
                <span className="text-2xl font-black leading-none">{event.day}</span>
                <span className="text-[10px] font-bold leading-tight mt-1">{event.month}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm border ${event.level === "national" ? "bg-green-50 border-green-200 text-green-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
                      {event.level === "national" ? <Globe2 size={10} /> : <MapPin size={10} />}{event.level}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0b4d21] transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-2">{event.detail}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3.5 border-t border-gray-50 text-[10px] text-gray-400 font-bold mt-4">
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-[#0b4d21]/60" fill="#0b4d21" />{event.place}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-[#0b4d21]/60" />{event.time}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => openEditForm(event)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-all"><Edit size={16} /></button>
                <button type="button" onClick={() => handleDelete(event._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
