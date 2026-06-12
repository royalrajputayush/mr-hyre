"use client";
import React from "react";
import { FileText, CheckCircle2, CloudUpload } from "lucide-react";
import GlassCard from "../dashboard/GlassCard";

interface ResumeCardProps {
  fileName?: string | null;
  onUploadClick?: () => void;
  statusText?: string;
  isUploading?: boolean;
}

export default function ResumeCard({
  fileName,
  onUploadClick,
  statusText = "Active Node Linked",
  isUploading = false,
}: ResumeCardProps) {
  return (
    <GlassCard className="hover:border-indigo-500/30 transition-all duration-500">
      <div 
        onClick={onUploadClick}
        className="relative group cursor-pointer flex flex-col items-center justify-center py-4 text-center"
      >
        {fileName ? (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-3">
              <FileText size={24} />
            </div>
            <p className="text-slate-900 dark:text-white font-bold text-sm truncate max-w-[280px] sm:max-w-full">
              {fileName}
            </p>
            <p className="text-emerald-500 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> {statusText}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-neutral-800/60 flex items-center justify-center mb-3 text-slate-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
              <CloudUpload size={22} />
            </div>
            <p className="text-slate-700 dark:text-neutral-300 font-bold text-sm mb-1">
              {isUploading ? "Uploading..." : "Upload your resume"}
            </p>
            <p className="text-slate-400 dark:text-neutral-500 text-[10px] font-medium">
              PDF, DOCX (Max 10MB)
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
