"use client";

import { useEffect, useState } from "react";
import AdminLogin from "./_components/AdminLogin";
import AdminDashboard from "./_components/AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Safely verify existing session in localStorage after mount
    const authStatus = localStorage.getItem("lokdal-admin-auth");
    const isAuth = authStatus === "true";

    setTimeout(() => {
      if (isAuth) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }, 0);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("lokdal-admin-auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("lokdal-admin-auth");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#073616] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span className="text-white text-sm font-bold tracking-wide">Loading Admin Panel...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
