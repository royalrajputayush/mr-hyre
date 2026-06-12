"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

export default function InterviewsRedirect() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const performRedirect = async () => {
      // 1. Try immediate client-side role check
      const cachedRole = localStorage.getItem("userRole");
      if (cachedRole) {
        if (cachedRole === "recruiter") {
          router.push("/recruiter/schedule");
        } else {
          router.push("/candidate/interviews");
        }
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
          if (role === "recruiter") {
            router.push("/recruiter/schedule");
          } else {
            router.push("/candidate/interviews");
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Interviews redirect failed:", err);
        router.push("/login");
      }
    };

    performRedirect();
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-[#FAFBFD] dark:bg-[#0A0A0F] items-center justify-center gap-4 transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-xl opacity-20 dark:opacity-40 animate-pulse" />
        <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-[#111118] border border-slate-200 dark:border-white/[0.06] shadow-premium flex items-center justify-center">
          <Calendar className="text-violet-500 animate-pulse" size={28} />
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 dark:text-neutral-600 uppercase tracking-widest animate-pulse">
        Routing interview queue...
      </p>
    </div>
  );
}
