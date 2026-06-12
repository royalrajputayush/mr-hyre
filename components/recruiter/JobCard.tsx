"use client";
import React from "react";
import { Briefcase, ChevronRight, MapPin, DollarSign } from "lucide-react";
import GlassCard from "../dashboard/GlassCard";

interface JobCardProps {
  title: string;
  applicantsCount?: number;
  salary?: string;
  location?: string;
  onClick?: () => void;
}

export default function JobCard({
  title,
  applicantsCount = 0,
  salary = "N/A",
  location = "Remote",
  onClick,
}: JobCardProps) {
  return (
    <GlassCard className="hover:border-indigo-500/30 transition-all duration-300 cursor-pointer">
      <div onClick={onClick} className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center border border-slate-200 dark:border-white/[0.06] shrink-0">
          <Briefcase size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">{applicantsCount} shortlisted nodes</p>
          <div className="flex gap-3 mt-2 text-[10px] font-semibold text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>
            <span className="flex items-center gap-1"><DollarSign size={10} /> {salary}</span>
          </div>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all shrink-0" />
      </div>
    </GlassCard>
  );
}
