"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Simulated network delay for premium feel
    setTimeout(() => {
      if (email === "admin@lokdal.org" && password === "lokdal2026") {
        onLoginSuccess();
      } else {
        setError("Invalid credentials. Please verify your email and password.");
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-radial-gradient from-[#0b4d21] to-[#041a0b] p-4 relative overflow-hidden">
      {/* Decorative Brand Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#0b4d21]/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-green-100 overflow-hidden transform transition-all duration-300">
        
        {/* Header Block */}
        <div className="bg-gradient-to-br from-[#0b4d21] to-[#073616] px-6 py-8 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative flex justify-center mb-3">
            <div className="w-20 h-20 bg-white rounded-full p-2.5 shadow-lg flex items-center justify-center">
              <Image 
                src="/assets/logo.png" 
                alt="Lokdal Logo" 
                width={70} 
                height={70} 
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h2 className="text-xl font-black text-white tracking-wide relative z-10">LOKDAL ADMIN</h2>
          <p className="text-xs text-green-200 mt-1 relative z-10">Secure portal access for organization administration</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#0b4d21]/60" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@lokdal.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b4d21] focus:border-[#0b4d21] transition-all bg-white text-gray-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#0b4d21]/60" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b4d21] focus:border-[#0b4d21] transition-all bg-white text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#0b4d21] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0b4d21] hover:bg-[#073616] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In to Admin</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
