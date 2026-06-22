"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  CalendarDays,
  Newspaper,
  LogOut,
  Menu,
  X,
  MessageSquare,
  IndianRupee,
  Settings,
  Bell
} from "lucide-react";

  
import OverviewPanel from "./Panels/OverviewPanel";
import SupportersPanel from "./Panels/SupportersPanel";
import GalleryPanel from "./Panels/GalleryPanel";
import EventsPanel from "./Panels/EventsPanel";
import NewsPanel from "./Panels/NewsPanel";
import PressPanel from "./Panels/PressPanel";
import DonationsPanel from "./Panels/DonationsPanel";
import ManageAdminPanel from "./Panels/ManageAdminPanel";
import OrganisationPanel from "./Panels/OrganisationPanel";


interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview",     label: "Dashboard",       icon: LayoutDashboard },
    { id: "events",       label: "Upcoming Events",  icon: CalendarDays },
    { id: "news",         label: "News & Updates",   icon: Newspaper },
    { id: "press",        label: "Press Releases",   icon: MessageSquare },
    { id: "gallery",      label: "Gallery",          icon: ImageIcon },
    { id: "supporters",   label: "Supporters",       icon: Users },
    { id: "donations",    label: "Donations",        icon: IndianRupee },
    { id: "manage-admin", label: "Manage Admin",     icon: Settings },
    { id: "organisation", label: "Organisation",     icon: Users },
  ];


  const renderActivePanel = () => {
    switch (activeTab) {
      case "overview":    return <OverviewPanel />;
      case "events":      return <EventsPanel />;
      case "news":        return <NewsPanel />;
      case "press":       return <PressPanel />;
      case "gallery":     return <GalleryPanel />;
      case "supporters":  return <SupportersPanel />;
      case "donations":      return <DonationsPanel />;
      case "manage-admin":   return <ManageAdminPanel />;
      case "organisation":   return <OrganisationPanel />;
      default:
        // Placeholder for unimplemented tabs
        return <OverviewPanel />;

    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
      
      {/* ── GLOBAL TOP NAVBAR ── */}
      <header className="h-[60px] bg-[#0b4d21] text-white flex items-center justify-between px-4 z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-white/90 hover:text-white p-1"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center">
              <Image src="/assets/logo.png" alt="Lokdal" width={24} height={24} className="object-contain" />
            </div>
            <span className="font-black text-xl tracking-wide hidden sm:block">लोकदल</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button type="button" className="relative p-1.5 text-white/80 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0b4d21]"></span>
          </button>
          
          <div className="h-6 w-px bg-white/20"></div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/20">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── MOBILE SIDEBAR OVERLAY ── */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ── SIDEBAR Navigation ── */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1e293b] text-white flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          {/* Nav Links */}
          <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm transition-all border-l-4 ${
                    isActive
                      ? "bg-[#0f172a] text-white border-[#38bdf8] font-bold"
                      : "text-slate-300 border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? "text-[#38bdf8]" : "text-slate-400"} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />}
                </button>
              );
            })}
          </nav>

          {/* Footer Logout */}
          <div className="p-4 border-t border-slate-700 bg-[#0f172a]">
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm text-red-300 hover:bg-white/5 hover:text-red-200 transition-colors"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT WORKSPACE ── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-4 sm:p-6">
          {/* Workspace Title Bar (Breadcrumb style from screenshot) */}
          <div className="bg-white px-5 py-3.5 rounded-sm border-t-2 border-[#0b4d21] shadow-xs mb-6">
            <h1 className="text-[#0b4d21] text-sm font-semibold tracking-wide">
              {menuItems.find(m => m.id === activeTab)?.label || "Dashboard"}
            </h1>
          </div>

          {/* Render Active Panel */}
          <div className="flex-1">
            {renderActivePanel()}
          </div>
        </main>
      </div>

    </div>
  );
}
