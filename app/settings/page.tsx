"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";

export default function SettingsRedirect() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const performRedirect = async () => {
      // 1. Try immediate client-side role check
      const cachedRole = localStorage.getItem("userRole");
      if (cachedRole) {
        router.push(`/${cachedRole}/settings`);
        return;
      }

      // 2. Fallback to API check
      try {
        const token = localStorage.getItem("authToken");
        const headers: any = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/user/me", { headers });
        if (res.ok) {
          const data = await res.json();
          const role = data.user?.role || "candidate";
          localStorage.setItem("userRole", role);
          router.push(`/${role}/settings`);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Settings redirect failed:", err);
        router.push("/login");
      }
    };

    performRedirect();
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-[#FAFBFD] dark:bg-[#0A0A0F] items-center justify-center gap-4 transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full blur-xl opacity-20 dark:opacity-40 animate-pulse" />
        <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-[#111118] border border-slate-200 dark:border-white/[0.06] shadow-premium flex items-center justify-center">
          <Settings className="text-indigo-500 animate-spin" size={28} style={{ animationDuration: "3s" }} />
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 dark:text-neutral-600 uppercase tracking-widest animate-pulse">
        Optimizing settings route...
      </p>
    </div>
  );
}
